import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

/**
 * Get or create Redis client
 */
export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379"),
        connectTimeout: 5000,
      },
      password: process.env.REDIS_PASSWORD,
      database: 0,
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    redisClient.on("connect", () => {
      console.log("✅ Connected to Redis");
    });

    redisClient.on("disconnect", () => {
      console.log("❌ Disconnected from Redis");
    });

    await redisClient.connect();
  }

  return redisClient;
}

/**
 * Cache helper functions
 */
export class RedisCache {
  private static client: RedisClientType;

  static async init() {
    this.client = await getRedisClient();
  }

  /**
   * Get cached data
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.client) await this.init();

      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Redis GET error:", error);
      return null;
    }
  }

  /**
   * Set cached data with TTL
   */
  static async set(
    key: string,
    value: any,
    ttlSeconds: number = 300,
  ): Promise<boolean> {
    try {
      if (!this.client) await this.init();

      await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Redis SET error:", error);
      return false;
    }
  }

  /**
   * Delete cached data
   */
  static async del(key: string): Promise<boolean> {
    try {
      if (!this.client) await this.init();

      await this.client.del(key);
      return true;
    } catch (error) {
      console.error("Redis DEL error:", error);
      return false;
    }
  }

  /**
   * Check if key exists
   */
  static async exists(key: string): Promise<boolean> {
    try {
      if (!this.client) await this.init();

      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Redis EXISTS error:", error);
      return false;
    }
  }

  /**
   * Increment counter (useful for rate limiting)
   */
  static async incr(key: string, ttlSeconds?: number): Promise<number> {
    try {
      if (!this.client) await this.init();

      const count = await this.client.incr(key);

      if (ttlSeconds && count === 1) {
        await this.client.expire(key, ttlSeconds);
      }

      return count;
    } catch (error) {
      console.error("Redis INCR error:", error);
      return 0;
    }
  }
}

/**
 * Generate cache keys
 */
export const CacheKeys = {
  dashboardStats: (clientId: number) => `dashboard:stats:${clientId}`,
  visitors: (clientId: number, page: number, limit: number, search?: string) =>
    `visitors:${clientId}:${page}:${limit}${search ? `:${search}` : ""}`,
  visitor: (clientId: number, visitorId: string) =>
    `visitor:${clientId}:${visitorId}`,
  apiRateLimit: (ip: string) => `ratelimit:${ip}`,
};

/**
 * Close Redis connection (for graceful shutdown)
 */
export async function closeRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    console.log("🔌 Redis connection closed");
  }
}
