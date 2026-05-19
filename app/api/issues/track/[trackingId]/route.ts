import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(_: Request, { params }: { params: Promise<{ trackingId: string }> }) {
  const { trackingId } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("issues")
    .select("tracking_id, title, status, updated_at, fixed_date")
    .eq("tracking_id", trackingId)
    .single();

  if (error) {
    return NextResponse.json({ error: "Tracking ID not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
