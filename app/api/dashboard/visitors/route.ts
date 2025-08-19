import { NextRequest, NextResponse } from "next/server";
import { getVisitorsWithCache } from "@/lib/dashboard-service-cached";
import {
  checkRateLimit,
  AppRouterRateLimitConfigs,
} from "@/lib/rate-limit-app-router";

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await checkRateLimit(
      request,
      AppRouterRateLimitConfigs.VISITORS,
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const search = searchParams.get("search") || undefined;

    // Validate parameters
    if (page < 1) {
      return NextResponse.json(
        { error: "Page must be greater than 0" },
        { status: 400 },
      );
    }
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Limit must be between 1 and 100" },
        { status: 400 },
      );
    }

    // Get cached visitors data
    const result = await getVisitorsWithCache({ page, limit, search });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      cached: true, // Indicate this might be cached data
    });
  } catch (error) {
    console.error("Visitors API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
