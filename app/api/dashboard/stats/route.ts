import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/dashboard-service";
import { testConnection } from "@/lib/database";

export async function GET() {
  try {
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

    // Get dashboard statistics
    const stats = await getDashboardStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
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
