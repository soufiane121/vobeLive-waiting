import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required." },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${BACKEND_API_URL}/api/waitlist/position?code=${encodeURIComponent(code)}`
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Service unavailable." },
      { status: 502 }
    );
  }
}
