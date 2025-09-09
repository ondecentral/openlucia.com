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
  totalMobileViews: number;
  totalTabletViews: number;
  totalComputerViews: number;
}

/**
 * Get dashboard statistics for a client
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const clientId = getClientId();

  try {
    // Get statistics based on unique lucia users (visitors = unique lucia users)
    const visitsQuery = await query(
      `
      SELECT 
        COUNT(DISTINCT f.lucia_user_id) as total_visits,
        COUNT(DISTINCT f.ip) as unique_ips,
        COUNT(DISTINCT CONCAT(f.country, ', ', f.city)) as unique_locations,
        COUNT(DISTINCT f.lucia_user_id) as unique_visitors,
        COUNT(*) as total_page_views
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id  
      WHERE pv.client_id = $1 AND f.lucia_user_id IS NOT NULL
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

    // Get device type statistics based on screen size and touch capabilities
    const deviceStatsQuery = await query(
      `
      SELECT 
        COUNT(CASE 
          WHEN (f.device_data->>'touch' = 'true') 
          OR (f.screen_data->'width')::int < 768 
          THEN 1 
        END) as mobile_views,
        COUNT(CASE 
          WHEN (f.device_data->>'touch' != 'true' OR f.device_data->>'touch' IS NULL)
          AND (f.screen_data->'width')::int >= 768 
          AND (f.screen_data->'width')::int < 1024 
          THEN 1 
        END) as tablet_views,
        COUNT(CASE 
          WHEN (f.device_data->>'touch' != 'true' OR f.device_data->>'touch' IS NULL)
          AND (f.screen_data->'width')::int >= 1024 
          THEN 1 
        END) as computer_views
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id  
      WHERE pv.client_id = $1
    `,
      [clientId],
    );

    const deviceStats = deviceStatsQuery.rows[0] || {
      mobile_views: 0,
      tablet_views: 0,
      computer_views: 0,
    };

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
      totalMobileViews: parseInt(deviceStats.mobile_views) || 0,
      totalTabletViews: parseInt(deviceStats.tablet_views) || 0,
      totalComputerViews: parseInt(deviceStats.computer_views) || 0,
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
      totalMobileViews: 0,
      totalTabletViews: 0,
      totalComputerViews: 0,
    };
  }
}

/**
 * Get paginated list of visitors for a client
 * Flow: Get last 8 fingerprints → Get their lucia_users → Get all fingerprints for those users
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
    // Build search conditions
    let searchCondition = "";
    const searchParams: (string | number)[] = [clientId];

    if (options.search) {
      searchCondition = `
        AND EXISTS (
          SELECT 1 FROM fingerprints f2 
          WHERE f2.lucia_user_id = f.lucia_user_id 
          AND (
            f2."profileHash" ILIKE $${searchParams.length + 1}
            OR f2.ip ILIKE $${searchParams.length + 1}
            OR f2.wallet_data::text ILIKE $${searchParams.length + 1}
          )
        )
      `;
      searchParams.push(`%${options.search}%`);
    }

    // Step 1: Get recent lucia_user_ids for this client with search
    const recentFingerprintsQuery = await query(
      `
      SELECT f.lucia_user_id, MAX(f."createdAt") as latest_activity
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id
      WHERE pv.client_id = $1 AND f.lucia_user_id IS NOT NULL ${searchCondition}
      GROUP BY f.lucia_user_id
      ORDER BY latest_activity DESC
      LIMIT $${searchParams.length + 1} OFFSET $${searchParams.length + 2}
    `,
      [...searchParams, limit, offset],
    );

    if (recentFingerprintsQuery.rows.length === 0) {
      return { visitors: [], total: 0, page, limit };
    }

    const luciaUserIds = recentFingerprintsQuery.rows.map(
      (row) => row.lucia_user_id,
    );

    // Get total count for pagination (count unique lucia_user_ids with search)
    const countQuery = await query(
      `
      SELECT COUNT(DISTINCT f.lucia_user_id) as total
      FROM fingerprints f
      INNER JOIN page_view pv ON f.id = pv.fingerprint_id
      WHERE pv.client_id = $1 AND f.lucia_user_id IS NOT NULL ${searchCondition}
    `,
      searchParams,
    );

    const total = parseInt(countQuery.rows[0]?.total) || 0;

    // Step 2: Get ALL fingerprints for these lucia users (not just client-specific ones)
    const fingerprintsQuery = await query<FingerprintRow>(
      `
      SELECT f.*
      FROM fingerprints f
      WHERE f.lucia_user_id = ANY($1)
      ORDER BY f.lucia_user_id, f."createdAt" DESC
    `,
      [luciaUserIds],
    );

    // Get all fingerprint IDs for these users
    const allFingerprintIds = fingerprintsQuery.rows.map((f) => f.id);

    if (allFingerprintIds.length === 0) {
      return { visitors: [], total: 0, page, limit };
    }

    // Step 3: Get Lucia user data for these users
    const luciaUsersQuery = await query<LuciaUserRow>(
      `
      SELECT * FROM lucia_user 
      WHERE id = ANY($1)
    `,
      [luciaUserIds],
    );

    // Step 4: Get page views for ALL their fingerprints (across all clients they've visited)
    const pageViewsQuery = await query<PageViewRow>(
      `
      SELECT * FROM page_view 
      WHERE fingerprint_id = ANY($1)
      ORDER BY created_at DESC
    `,
      [allFingerprintIds],
    );

    // Step 5: Get button clicks for ALL their fingerprints
    const buttonClicksQuery = await query<ButtonClickRow>(
      `
      SELECT * FROM button_click 
      WHERE fingerprint_id = ANY($1)
      ORDER BY created_at DESC
    `,
      [allFingerprintIds],
    );

    // Step 6: Group fingerprints by lucia_user_id and create one visitor per user
    const visitorMap = new Map<number, VisitorAggregateRow>();

    // Group all fingerprints by lucia_user_id
    const fingerprintsByUser = new Map<number, FingerprintRow[]>();
    fingerprintsQuery.rows.forEach((fingerprint) => {
      const luciaUserId = fingerprint.lucia_user_id!;
      if (!fingerprintsByUser.has(luciaUserId)) {
        fingerprintsByUser.set(luciaUserId, []);
      }
      fingerprintsByUser.get(luciaUserId)!.push(fingerprint);
    });

    // Create visitor aggregates with all fingerprints
    fingerprintsByUser.forEach((userFingerprints, luciaUserId) => {
      const lucia_user = luciaUsersQuery.rows.find(
        (lu) => lu.id === luciaUserId,
      );
      const mostRecentFingerprint = userFingerprints[0]; // Already ordered by createdAt DESC

      visitorMap.set(luciaUserId, {
        fingerprint: mostRecentFingerprint, // Primary fingerprint
        fingerprints: userFingerprints, // All fingerprints for this user
        lucia_user,
        page_views: [],
        button_clicks: [],
        wallets: [],
      });
    });

    // Add page views and button clicks for each visitor
    pageViewsQuery.rows.forEach((pageView) => {
      const fingerprint = fingerprintsQuery.rows.find(
        (f) => f.id === pageView.fingerprint_id,
      );
      if (fingerprint && visitorMap.has(fingerprint.lucia_user_id!)) {
        visitorMap.get(fingerprint.lucia_user_id!)!.page_views.push(pageView);
      }
    });

    buttonClicksQuery.rows.forEach((buttonClick) => {
      const fingerprint = fingerprintsQuery.rows.find(
        (f) => f.id === buttonClick.fingerprint_id,
      );
      if (fingerprint && visitorMap.has(fingerprint.lucia_user_id!)) {
        visitorMap
          .get(fingerprint.lucia_user_id!)!
          .button_clicks.push(buttonClick);
      }
    });

    const aggregates = Array.from(visitorMap.values());
    const visitors = transformToVisitorDataArray(aggregates);

    return { visitors, total, page, limit };
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return { visitors: [], total: 0, page, limit };
  }
}

/**
 * Get detailed information for a specific visitor (lucia_user)
 * Flow: Find fingerprint by hash → Get lucia_user → Get ALL fingerprints for that user
 */
export async function getVisitorById(
  visitorId: string,
): Promise<VisitorData | null> {
  try {
    // Step 1: Find any fingerprint with this profileHash to identify the lucia_user
    const fingerprintQuery = await query<FingerprintRow>(
      `
      SELECT f.*
      FROM fingerprints f
      WHERE f."profileHash" LIKE $1 AND f.lucia_user_id IS NOT NULL
      LIMIT 1
    `,
      [`${visitorId}%`],
    );

    if (fingerprintQuery.rows.length === 0) {
      return null;
    }

    const initialFingerprint = fingerprintQuery.rows[0];
    const luciaUserId = initialFingerprint.lucia_user_id!;

    // Step 2: Get ALL fingerprints for this lucia_user
    const allFingerprintsQuery = await query<FingerprintRow>(
      `
      SELECT * FROM fingerprints 
      WHERE lucia_user_id = $1
      ORDER BY "createdAt" DESC
    `,
      [luciaUserId],
    );

    const allFingerprints = allFingerprintsQuery.rows;
    const allFingerprintIds = allFingerprints.map((f) => f.id);

    // Step 3: Get associated data for ALL fingerprints of this user
    const [luciaUserQuery, pageViewsQuery, buttonClicksQuery] =
      await Promise.all([
        query<LuciaUserRow>(
          `
          SELECT * FROM lucia_user WHERE id = $1
        `,
          [luciaUserId],
        ),

        query<PageViewRow>(
          `
          SELECT * FROM page_view 
          WHERE fingerprint_id = ANY($1)
          ORDER BY created_at DESC
        `,
          [allFingerprintIds],
        ),

        query<ButtonClickRow>(
          `
          SELECT * FROM button_click 
          WHERE fingerprint_id = ANY($1)
          ORDER BY created_at DESC
        `,
          [allFingerprintIds],
        ),
      ]);

    const aggregate: VisitorAggregateRow = {
      fingerprint: allFingerprints[0], // Use most recent fingerprint as primary
      fingerprints: allFingerprints, // All fingerprints for this user
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
