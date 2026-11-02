import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getDb } from "@/lib/supabase";
import { getSettings } from "@/lib/content";
import { defaultSettings } from "@/lib/settings";

export async function GET() {
  const s = await getSettings();
  let title = defaultSettings.title;

  const db = getDb();
  if (db) {
    const { data } = await db.from("settings").select("title").eq("id", 1).maybeSingle();
    if (data?.title) title = data.title;
  }

  return NextResponse.json({
    title,
    phone: s.phone,
    whatsapp: s.whatsappNumber,
    email: s.email,
    instagram: s.instagram,
    instagramPersonal: s.instagramPersonal,
    location: s.location,
    serviceLine: s.serviceLine,
    deliveryNote: s.deliveryNote,
  });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "The server is not connected to the database yet." }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

  const site = {
    title: clean(body.title, 120) || defaultSettings.title,
    phone: clean(body.phone, 40),
    whatsapp: clean(body.whatsapp, 40),
    email: clean(body.email, 150),
    instagram: clean(body.instagram, 200),
    instagramPersonal: clean(body.instagramPersonal, 200),
    location: clean(body.location, 200),
    serviceLine: clean(body.serviceLine, 200),
    deliveryNote: clean(body.deliveryNote, 200),
  };

  const { error } = await db.from("settings").upsert({
    id: 1,
    title: site.title,
    phone: site.phone,
    whatsapp_number: site.whatsapp,
    email: site.email,
    instagram: site.instagram,
    instagram_personal: site.instagramPersonal,
    location: site.location,
    service_line: site.serviceLine,
    delivery_note: site.deliveryNote,
  });

  if (error) {
    console.error("Settings save error:", error);
    return NextResponse.json({ error: "Could not save settings" }, { status: 500 });
  }
  return NextResponse.json(site);
}