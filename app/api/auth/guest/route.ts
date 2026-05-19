import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, mode: "guest" });
  response.cookies.set("guest_access", "enabled", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24
  });

  return response;
}
