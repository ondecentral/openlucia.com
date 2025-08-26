import { NextRequest, NextResponse } from "next/server";
import { getDashboardStatsWithCache } from "@/lib/dashboard-service-cached";
import { testConnection } from "@/lib/database";
import {
  checkRateLimit,
  AppRouterRateLimitConfigs,
} from "@/lib/rate-limit-app-router";

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await checkRateLimit(
      request,
      AppRouterRateLimitConfigs.DASHBOARD,
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Test database connection first
    const connectionTest = await testConnection();
    if (!connectionTest.success) {
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: connectionTest.error,
        },
        { status: 500 },
      );
    }

    // Get cached dashboard statistics
    const stats = await getDashboardStatsWithCache();

    const response = NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
      cached: true, // Indicate this might be cached data
    });

    return response;
  } catch (error) {
    console.error("Dashboard stats API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
