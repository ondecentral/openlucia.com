import { NextRequest, NextResponse } from "next/server";
import { getVisitorById } from "@/lib/dashboard-service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: visitorId } = await params;

    // Validate visitor ID
    if (!visitorId) {
      return NextResponse.json(
        { error: "Valid visitor ID is required" },
        { status: 400 },
      );
    }

    // Get visitor data
    const visitor = await getVisitorById(visitorId);

    if (!visitor) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: visitor,
      timestamp: new Date().toISOString(),
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
