import { NextRequest, NextResponse } from "next/server";
import { RedisCache, CacheKeys } from "./redis";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message?: string;
}

/**
 * Rate limiting utility for Next.js App Router
 */
export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
): Promise<NextResponse | null> {
  try {
    // Get client IP
    const clientIP =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitKey = CacheKeys.apiRateLimit(clientIP);
    const windowSeconds = Math.ceil(config.windowMs / 1000);

    // Increment request count
    const requestCount = await RedisCache.incr(rateLimitKey, windowSeconds);

    // Check if limit exceeded
    if (requestCount > config.maxRequests) {
      return NextResponse.json(
        {
          error: config.message || "Too many requests",
          retryAfter: windowSeconds,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": config.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(
              Date.now() + config.windowMs,
            ).toISOString(),
            "Retry-After": windowSeconds.toString(),
          },
        },
      );
    }

    // Rate limit passed - return null to continue
    return null;
  } catch (error) {
    console.error("Rate limiting error:", error);
    // Continue without rate limiting if Redis fails
    return null;
  }
}

/**
 * Add rate limit headers to successful responses
 */
export function addRateLimitHeaders(
  response: NextResponse,
  config: RateLimitConfig,
  requestCount: number,
): NextResponse {
  response.headers.set("X-RateLimit-Limit", config.maxRequests.toString());
  response.headers.set(
    "X-RateLimit-Remaining",
    Math.max(0, config.maxRequests - requestCount).toString(),
  );
  response.headers.set(
    "X-RateLimit-Reset",
    new Date(Date.now() + config.windowMs).toISOString(),
  );

  return response;
}

/**
 * Common rate limit configurations for App Router
 */
export const AppRouterRateLimitConfigs = {
  // Dashboard API endpoints
  DASHBOARD: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: "Too many requests to dashboard API",
  },

  // Visitor API endpoints
  VISITORS: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 150,
    message: "Too many visitor requests",
  },

  // Individual visitor lookups
  VISITOR_DETAILS: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 200,
    message: "Too many visitor detail requests",
  },

  // Strict rate limiting for sensitive endpoints
  STRICT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 50,
    message: "Too many requests. Please try again later.",
  },
};
