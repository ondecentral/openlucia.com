import { NextRequest, NextResponse } from "next/server";
import { getVisitorByIdWithCache } from "@/lib/dashboard-service-cached";
import {
  checkRateLimit,
  AppRouterRateLimitConfigs,
} from "@/lib/rate-limit-app-router";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await checkRateLimit(
      request,
      AppRouterRateLimitConfigs.VISITOR_DETAILS,
    );
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const { id: visitorId } = await params;

    // Validate visitor ID
    if (!visitorId) {
      return NextResponse.json(
        { error: "Valid visitor ID is required" },
        { status: 400 },
      );
    }

    // Get cached visitor data
    const visitor = await getVisitorByIdWithCache(visitorId);

    if (!visitor) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: visitor,
      timestamp: new Date().toISOString(),
      cached: true, // Indicate this might be cached data
    });
  } catch (error) {
    console.error("Visitor API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
