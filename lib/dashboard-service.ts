import { query, getClientId } from "./database";
import {
  FingerprintRow,
  PageViewRow,
  ButtonClickRow,
  LuciaUserRow,
  VisitorAggregateRow,
  transformToVisitorData,
  transformToVisitorDataArray,
} from "./transforms";
import { VisitorData } from "@/components/dashboard/dashboard-seed-data";

/**
 * Dashboard statistics interface
 */
export interface DashboardStats {
  totalVisits: number;
  totalIncognitoVisits: number;
  totalUniqueIPs: number;
  totalUniqueGeolocations: number;
  totalWalletsDetected: number;
  totalUSDTRewards: string;
  totalSOLRewards: string;
  totalETHRewards: string;
  totalAdsClicked: number;
  totalClickIds: number;
}

/**
 * Get dashboard statistics for a client
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const clientId = getClientId();

  try {
    // Get basic visit statistics (CORRECT: Sessions + fingerprints without sessions)
    const visitsQuery = await query(
      `
      SELECT 
        COUNT(DISTINCT f.session_id) + COUNT(CASE WHEN f.session_id IS NULL THEN 1 END) as total_visits,
        COUNT(DISTINCT f.ip) as unique_ips,
        COUNT(DISTINCT CONCAT(f.country, ', ', f.city)) as unique_locations,
        COUNT(DISTINCT f.id) as unique_visitors,
        COUNT(*) as total_page_views
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id  
      WHERE pv.client_id = $1
    `,
      [clientId],
    );

    const stats = visitsQuery.rows[0] || {
      total_visits: 0,
      unique_ips: 0,
      unique_locations: 0,
      unique_visitors: 0,
    };

    // Get incognito sessions count (check both data->browser->incognito and browser_data->incognito)
    const incognitoQuery = await query(
      `
      SELECT COUNT(*) as incognito_visits
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id
      WHERE pv.client_id = $1 
      AND (
        f.browser_data->>'incognito' = 'true' 
        OR f.data->'browser'->>'incognito' = 'true'
      )
    `,
      [clientId],
    );

    // Get wallet count (check for non-null wallet_data)
    const walletQuery = await query(
      `
      SELECT COUNT(*) as wallet_count
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id
      WHERE pv.client_id = $1 
      AND f.wallet_data IS NOT NULL 
      AND f.wallet_data::text != 'null'
      AND (
        f.wallet_data->>'walletAddress' IS NOT NULL
        OR f.wallet_data->>'solanaAddress' IS NOT NULL
      )
    `,
      [clientId],
    );

    // Get button clicks (ads clicked and total click IDs)
    const clicksQuery = await query(
      `
      SELECT 
        COUNT(*) as total_clicks,
        COUNT(CASE WHEN button ILIKE '%ad%' THEN 1 END) as ad_clicks
      FROM button_click
      WHERE client_id = $1
    `,
      [clientId],
    );

    const clickStats = clicksQuery.rows[0] || { total_clicks: 0, ad_clicks: 0 };

    return {
      totalVisits: parseInt(stats.total_visits) || 0,
      totalIncognitoVisits:
        parseInt(incognitoQuery.rows[0]?.incognito_visits) || 0,
      totalUniqueIPs: parseInt(stats.unique_ips) || 0,
      totalUniqueGeolocations: parseInt(stats.unique_locations) || 0,
      totalWalletsDetected: parseInt(walletQuery.rows[0]?.wallet_count) || 0,
      totalUSDTRewards: "0", // Mock for now - would need rewards system
      totalSOLRewards: "0", // Mock for now - would need rewards system
      totalETHRewards: "0", // Mock for now - would need rewards system
      totalAdsClicked: parseInt(clickStats.ad_clicks) || 0,
      totalClickIds: parseInt(clickStats.total_clicks) || 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);

    // Return zero stats if database query fails
    return {
      totalVisits: 0,
      totalIncognitoVisits: 0,
      totalUniqueIPs: 0,
      totalUniqueGeolocations: 0,
      totalWalletsDetected: 0,
      totalUSDTRewards: "0",
      totalSOLRewards: "0",
      totalETHRewards: "0",
      totalAdsClicked: 0,
      totalClickIds: 0,
    };
  }
}

/**
 * Get paginated list of visitors for a client
 */
export async function getVisitors(
  options: {
    page?: number;
    limit?: number;
    search?: string;
  } = {},
): Promise<{
  visitors: VisitorData[];
  total: number;
  page: number;
  limit: number;
}> {
  const clientId = getClientId();
  const page = options.page || 1;
  const limit = Math.min(options.limit || 8, 100); // Default to last 8 visitors
  const offset = (page - 1) * limit;

  try {
    // Build search condition
    let searchCondition = "";
    const searchParams: (string | number)[] = [clientId];

    if (options.search) {
      searchCondition = `
        AND (
          f."profileHash" ILIKE $${searchParams.length + 1}
          OR f.ip ILIKE $${searchParams.length + 1}
          OR f.wallet_data::text ILIKE $${searchParams.length + 1}
        )
      `;
      searchParams.push(`%${options.search}%`);
    }

    // Get total count for pagination
    const countQuery = await query(
      `
      SELECT COUNT(DISTINCT f.id) as total
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id
      WHERE pv.client_id = $1 ${searchCondition}
    `,
      searchParams,
    );

    const total = parseInt(countQuery.rows[0]?.total) || 0;

    if (total === 0) {
      return { visitors: [], total: 0, page, limit };
    }

    // Get fingerprint data with associated information
    const fingerprintsQuery = await query<FingerprintRow>(
      `
      SELECT DISTINCT ON (f.id)
        f.*
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id  
      WHERE pv.client_id = $1 ${searchCondition}
      ORDER BY f.id DESC, f."createdAt" DESC
      LIMIT $${searchParams.length + 1} OFFSET $${searchParams.length + 2}
    `,
      [...searchParams, limit, offset],
    );

    // Get associated data for each fingerprint
    const fingerprintIds = fingerprintsQuery.rows.map((f) => f.id);

    if (fingerprintIds.length === 0) {
      return { visitors: [], total: 0, page, limit };
    }

    // Get Lucia user data
    const luciaUsersQuery = await query<LuciaUserRow>(
      `
      SELECT lu.* 
      FROM lucia_user lu
      INNER JOIN fingerprints f ON f.lucia_user_id = lu.id
      WHERE f.id = ANY($1)
    `,
      [fingerprintIds],
    );

    // Get page views
    const pageViewsQuery = await query<PageViewRow>(
      `
      SELECT * FROM page_view 
      WHERE fingerprint_id = ANY($1) AND client_id = $2
      ORDER BY created_at DESC
    `,
      [fingerprintIds, clientId],
    );

    // Get button clicks
    const buttonClicksQuery = await query<ButtonClickRow>(
      `
      SELECT * FROM button_click 
      WHERE fingerprint_id = ANY($1) AND client_id = $2
      ORDER BY created_at DESC
    `,
      [fingerprintIds, clientId],
    );

    // Build aggregated data
    const aggregates: VisitorAggregateRow[] = fingerprintsQuery.rows.map(
      (fingerprint) => {
        const lucia_user = luciaUsersQuery.rows.find(
          (lu) => lu.id === fingerprint.lucia_user_id,
        );
        const page_views = pageViewsQuery.rows.filter(
          (pv) => pv.fingerprint_id === fingerprint.id,
        );
        const button_clicks = buttonClicksQuery.rows.filter(
          (bc) => bc.fingerprint_id === fingerprint.id,
        );

        return {
          fingerprint,
          lucia_user,
          page_views,
          button_clicks,
          wallets: [], // Could fetch from wallet table if needed
        };
      },
    );

    const visitors = transformToVisitorDataArray(aggregates);

    return { visitors, total, page, limit };
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return { visitors: [], total: 0, page, limit };
  }
}

/**
 * Get detailed information for a specific visitor
 */
export async function getVisitorById(
  visitorId: string,
): Promise<VisitorData | null> {
  const clientId = getClientId();

  try {
    // Get fingerprint data (search by 16-character hash prefix)
    const fingerprintQuery = await query<FingerprintRow>(
      `
      SELECT f.*
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id
      WHERE f."profileHash" LIKE $1 AND pv.client_id = $2
      LIMIT 1
    `,
      [`${visitorId}%`, clientId],
    );

    if (fingerprintQuery.rows.length === 0) {
      return null;
    }

    const fingerprint = fingerprintQuery.rows[0];

    // Get associated data
    const [luciaUserQuery, pageViewsQuery, buttonClicksQuery] =
      await Promise.all([
        fingerprint.lucia_user_id
          ? query<LuciaUserRow>(
              `
        SELECT * FROM lucia_user WHERE id = $1
      `,
              [fingerprint.lucia_user_id],
            )
          : Promise.resolve({ rows: [] }),

        query<PageViewRow>(
          `
        SELECT * FROM page_view 
        WHERE fingerprint_id = $1 AND client_id = $2
        ORDER BY created_at DESC
      `,
          [fingerprint.id, clientId],
        ),

        query<ButtonClickRow>(
          `
        SELECT * FROM button_click 
        WHERE fingerprint_id = $1 AND client_id = $2
        ORDER BY created_at DESC
      `,
          [fingerprint.id, clientId],
        ),
      ]);

    const aggregate: VisitorAggregateRow = {
      fingerprint,
      lucia_user: luciaUserQuery.rows[0],
      page_views: pageViewsQuery.rows,
      button_clicks: buttonClicksQuery.rows,
      wallets: [], // Could fetch from wallet table if needed
    };

    return transformToVisitorData(aggregate, 0);
  } catch (error) {
    console.error("Error fetching visitor:", error);
    return null;
  }
}
