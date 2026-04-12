import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3000";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/api/waitlist/count`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 502 });
  }
}
