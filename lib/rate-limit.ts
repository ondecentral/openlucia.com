import { NextApiRequest, NextApiResponse } from "next";
import { RedisCache, CacheKeys } from "./redis";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message?: string;
}

/**
 * Rate limiting middleware using Redis
 */
export function rateLimit(config: RateLimitConfig) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void,
  ) => {
    try {
      // Get client IP
      const clientIP =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
        req.socket.remoteAddress ||
        "unknown";

      const rateLimitKey = CacheKeys.apiRateLimit(clientIP);
      const windowSeconds = Math.ceil(config.windowMs / 1000);

      // Increment request count
      const requestCount = await RedisCache.incr(rateLimitKey, windowSeconds);

      // Check if limit exceeded
      if (requestCount > config.maxRequests) {
        return res.status(429).json({
          error: config.message || "Too many requests",
          retryAfter: windowSeconds,
        });
      }

      // Add rate limit headers
      res.setHeader("X-RateLimit-Limit", config.maxRequests);
      res.setHeader(
        "X-RateLimit-Remaining",
        Math.max(0, config.maxRequests - requestCount),
      );
      res.setHeader(
        "X-RateLimit-Reset",
        new Date(Date.now() + config.windowMs).toISOString(),
      );

      next();
    } catch (error) {
      console.error("Rate limiting error:", error);
      // Continue without rate limiting if Redis fails
      next();
    }
  };
}

/**
 * Common rate limit configurations
 */
export const RateLimitConfigs = {
  // Strict rate limiting for sensitive endpoints
  STRICT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 50,
    message: "Too many requests. Please try again later.",
  },

  // Moderate rate limiting for dashboard APIs
  MODERATE: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: "Too many requests to dashboard API",
  },

  // Lenient rate limiting for public endpoints
  LENIENT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 200,
    message: "Too many requests. Please try again later.",
  },

  // Very strict for auth endpoints
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
    message: "Too many authentication attempts",
  },
};
