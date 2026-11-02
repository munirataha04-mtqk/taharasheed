import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { writeJson, settingsFile } from "@/lib/store";
import { getSiteSettings, defaultSettings, type SiteSettings } from "@/lib/settings";

export async function GET() {
  return NextResponse.json(await getSiteSettings());
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const site: SiteSettings = {
    title: clean(body.title, 120) || defaultSettings.title,
    phone: clean(body.phone, 40),
    whatsapp: clean(body.whatsapp, 40),
    email: clean(body.email, 150),
    instagram: clean(body.instagram, 200), // Instagram work
    instagramPersonal: clean(body.instagramPersonal, 200), // Instagram personal
    location: clean(body.location, 200),
    serviceLine: clean(body.serviceLine, 200),
    deliveryNote: clean(body.deliveryNote, 200),
  };
  await writeJson(settingsFile, site);
  return NextResponse.json(site);
}