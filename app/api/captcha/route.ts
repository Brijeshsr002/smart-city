import { NextRequest, NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/security/captcha";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const ok = await verifyCaptcha(body.token ?? "");

  return NextResponse.json({ ok });
}
