import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .select("queue_position, referral_count, email")
      .eq("referral_code", code.toUpperCase().trim())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid referral code." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      queuePosition: data.queue_position,
      referralCount: data.referral_count,
    });
  } catch {
    return NextResponse.json(
      { error: "Service unavailable." },
      { status: 502 }
    );
  }
}
