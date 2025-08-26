// Client-side API functions for dashboard data
import React from "react";
import { VisitorData } from "@/components/dashboard/dashboard-seed-data";
import { DashboardStats } from "./dashboard-service";

// API response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

interface ApiErrorResponse {
  error: string;
  message?: string;
}

interface PaginatedResponse<T> {
  visitors: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await fetch("/api/dashboard/stats");

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(
        errorData.message || errorData.error || "Failed to fetch stats",
      );
    }

    const data: ApiResponse<DashboardStats> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

/**
 * Fetch paginated visitors
 */
export async function fetchVisitors(
  options: {
    page?: number;
    limit?: number;
    search?: string;
  } = {},
): Promise<PaginatedResponse<VisitorData>> {
  try {
    const searchParams = new URLSearchParams();
    if (options.page) searchParams.set("page", options.page.toString());
    if (options.limit) searchParams.set("limit", options.limit.toString());
    if (options.search) searchParams.set("search", options.search);

    const response = await fetch(
      `/api/dashboard/visitors?${searchParams.toString()}`,
    );

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(
        errorData.message || errorData.error || "Failed to fetch visitors",
      );
    }

    const data: ApiResponse<PaginatedResponse<VisitorData>> =
      await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching visitors:", error);
    throw error;
  }
}

/**
 * Fetch specific visitor by ID
 */
export async function fetchVisitor(visitorId: string): Promise<VisitorData> {
  try {
    const response = await fetch(`/api/dashboard/visitor/${visitorId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Visitor not found");
      }
      const errorData: ApiErrorResponse = await response.json();
      throw new Error(
        errorData.message || errorData.error || "Failed to fetch visitor",
      );
    }

    const data: ApiResponse<VisitorData> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching visitor:", error);
    throw error;
  }
}

/**
 * Hook for using dashboard data with loading states
 */
export function useDashboardStats() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadStats();
  }, []);

  return { stats, loading, error, reload: loadStats };
}

/**
 * Hook for using visitors data with pagination
 */
export function useVisitors(
  options: {
    page?: number;
    limit?: number;
    search?: string;
  } = {},
) {
  const [visitors, setVisitors] = React.useState<VisitorData[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { page, limit, search } = options;

  const loadVisitors = React.useCallback(
    async (newOptions?: typeof options) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchVisitors(newOptions || { page, limit, search });
        setVisitors(data.visitors);
        setTotal(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [page, limit, search],
  );

  React.useEffect(() => {
    loadVisitors();
  }, [loadVisitors]);

  return {
    visitors,
    total,
    loading,
    error,
    reload: () => loadVisitors({ page, limit, search }),
  };
}
