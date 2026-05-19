import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { issueSchema } from "@/lib/validation/schemas";
import { verifyCaptcha } from "@/lib/security/captcha";
import { enforceRateLimit } from "@/lib/security/rate-limit";
import { generateTrackingId } from "@/lib/utils";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("issues").select("*").order("created_at", { ascending: false }).limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = enforceRateLimit(`issue-create:${ip}`, 15, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = issueSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const captchaOk = await verifyCaptcha(parsed.data.captchaToken ?? "");
  if (!captchaOk) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const trackingId = generateTrackingId();

  const payload = {
    tracking_id: trackingId,
    title: parsed.data.title,
    description: parsed.data.description,
    category: parsed.data.category,
    priority: parsed.data.priority,
    status: "new",
    image_url: parsed.data.mediaUrl ?? null,
    latitude: parsed.data.latitude,
    longitude: parsed.data.longitude,
    department: parsed.data.department
  };

  const { error } = await supabase.from("issues").insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, trackingId }, { status: 201 });
}
