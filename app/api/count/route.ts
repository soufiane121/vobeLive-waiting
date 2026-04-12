import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("waitlist_stats")
      .select("total_count")
      .single();

    if (error) {
      console.error("Supabase count error:", error);
      // Fallback to direct count
      const { count, error: countError } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (countError) {
        return NextResponse.json({ count: 0 }, { status: 500 });
      }

      return NextResponse.json(
        { count: count || 0 },
        { headers: { "Cache-Control": "public, max-age=60" } }
      );
    }

    return NextResponse.json(
      { count: data?.total_count || 0 },
      { headers: { "Cache-Control": "public, max-age=60" } }
    );
  } catch {
    return NextResponse.json({ count: 0 }, { status: 502 });
  }
}
