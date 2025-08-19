import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

// Global connection pool to reuse across requests
let pool: Pool | null = null;

/**
 * Get or create a PostgreSQL connection pool
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Connection pool configuration
      max: 10, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection cannot be established
    });

    // Handle pool errors
    pool.on("error", (err: Error) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });

    // Log successful connection in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Database pool initialized");
    }
  }

  return pool;
}

/**
 * Execute a database query with automatic client management
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  const pool = getPool();

  try {
    const start = Date.now();
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;

    // Log slow queries in development
    if (process.env.NODE_ENV === "development" && duration > 100) {
      console.log("🐌 Slow query executed:", {
        text,
        duration,
        rows: res.rowCount,
      });
    }

    return res;
  } catch (err) {
    console.error("Database query error:", { text, params, error: err });
    throw err;
  }
}

/**
 * Get a client from the pool for transaction management
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  return await pool.connect();
}

/**
 * Execute multiple queries in a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await getClient();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const result = await query("SELECT NOW() as current_time, version()");
    return {
      success: true,
      ...result.rows[0],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Get current client ID from environment
 */
export function getClientId(): number {
  const clientId = process.env.CLIENT_ID;
  if (!clientId) {
    throw new Error("CLIENT_ID environment variable is not set");
  }
  return parseInt(clientId, 10);
}

/**
 * Close the database pool (useful for testing or graceful shutdown)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("🔌 Database pool closed");
  }
}
