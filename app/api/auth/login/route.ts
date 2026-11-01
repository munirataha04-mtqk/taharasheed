import { NextResponse } from "next/server";
import { checkPassword, makeToken, cookieName, passwordConfigured } from "@/lib/auth";

export async function POST(req: Request) {
  if (!passwordConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD and SESSION_SECRET are not set in .env.local" },
      { status: 500 }
    );
  }
  const body = await req.json().catch(() => ({}));
  if (!checkPassword(String(body.password ?? ""))) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}