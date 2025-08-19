import { query, getClientId } from "./database";
import { RedisCache, CacheKeys } from "./redis";
import {
  DashboardStats,
  getDashboardStats,
  getVisitors,
  getVisitorById,
} from "./dashboard-service";
import { VisitorData } from "@/components/dashboard/dashboard-seed-data";

/**
 * Get dashboard statistics with caching
 */
export async function getDashboardStatsWithCache(): Promise<DashboardStats> {
  const clientId = getClientId();
  const cacheKey = CacheKeys.dashboardStats(clientId);

  try {
    // Try to get from cache first
    const cachedStats = await RedisCache.get<DashboardStats>(cacheKey);
    if (cachedStats) {
      console.log("📊 Dashboard stats served from cache");
      return cachedStats;
    }

    // If not in cache, get from database
    console.log("🗃️ Dashboard stats fetching from database...");
    const stats = await getDashboardStats();

    // Cache the results for 5 minutes
    await RedisCache.set(cacheKey, stats, 300);

    return stats;
  } catch (error) {
    console.error("Error in getDashboardStatsWithCache:", error);

    // Fallback to database if Redis fails
    return await getDashboardStats();
  }
}

/**
 * Get visitors with caching
 */
export async function getVisitorsWithCache(
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
  const limit = Math.min(options.limit || 8, 100);
  const cacheKey = CacheKeys.visitors(clientId, page, limit, options.search);

  try {
    // Try cache first
    const cachedVisitors = await RedisCache.get<{
      visitors: VisitorData[];
      total: number;
      page: number;
      limit: number;
    }>(cacheKey);
    if (cachedVisitors) {
      console.log("👥 Visitors served from cache");
      return cachedVisitors;
    }

    // Get from database
    console.log("🗃️ Visitors fetching from database...");
    const visitors = await getVisitors(options);

    // Cache for 2 minutes (visitors change more frequently)
    await RedisCache.set(cacheKey, visitors, 120);

    return visitors;
  } catch (error) {
    console.error("Error in getVisitorsWithCache:", error);
    return await getVisitors(options);
  }
}

/**
 * Get visitor by ID with caching
 */
export async function getVisitorByIdWithCache(
  visitorId: string,
): Promise<VisitorData | null> {
  const clientId = getClientId();
  const cacheKey = CacheKeys.visitor(clientId, visitorId);

  try {
    // Try cache first
    const cachedVisitor = await RedisCache.get<VisitorData>(cacheKey);
    if (cachedVisitor) {
      console.log("👤 Visitor served from cache");
      return cachedVisitor;
    }

    // Get from database
    console.log("🗃️ Visitor fetching from database...");
    const visitor = await getVisitorById(visitorId);

    if (visitor) {
      // Cache for 10 minutes (individual visitor data is more stable)
      await RedisCache.set(cacheKey, visitor, 600);
    }

    return visitor;
  } catch (error) {
    console.error("Error in getVisitorByIdWithCache:", error);
    return await getVisitorById(visitorId);
  }
}

/**
 * Invalidate cache when data changes
 */
export async function invalidateDashboardCache(
  clientId: number,
): Promise<void> {
  try {
    // Clear dashboard stats
    await RedisCache.del(CacheKeys.dashboardStats(clientId));

    // Clear visitor cache (we could implement pattern-based deletion for visitors)
    // For now, we'll rely on TTL expiration
    console.log("🗑️ Dashboard cache invalidated");
  } catch (error) {
    console.error("Error invalidating cache:", error);
  }
}

/**
 * Cache TTL recommendations
 */
export const CacheTTL = {
  DASHBOARD_STATS: 300, // 5 minutes - relatively stable data
  VISITORS_LIST: 120, // 2 minutes - changes more frequently
  VISITOR_DETAILS: 600, // 10 minutes - individual visitor data
  PAGE_VIEWS: 60, // 1 minute - real-time data
  BUTTON_CLICKS: 60, // 1 minute - real-time data
  RATE_LIMIT: 900, // 15 minutes - rate limiting window
};

/**
 * Cache key patterns
 */
export const CachePatterns = {
  HOT_DATA: "hot:*", // Frequently accessed data
  ANALYTICS: "analytics:*", // Dashboard and analytics data
  USER_DATA: "user:*", // User-specific data
  TEMP_DATA: "temp:*", // Short-lived temporary data
};
