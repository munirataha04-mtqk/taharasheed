import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getDb } from "@/lib/supabase";
import { getSettings } from "@/lib/content";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Database is not configured yet." }, { status: 503 });
  }

  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const s = (k: string, max = 200) => String(b[k] ?? "").trim().slice(0, max);

  const email = s("email");
  const whatsapp = s("whatsappNumber", 20).replace(/\D/g, "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (!s("phone") || !whatsapp || !s("location")) {
    return NextResponse.json(
      { error: "Phone, WhatsApp and location are required." },
      { status: 400 }
    );
  }

  for (const k of ["instagram", "instagramPersonal", "facebook"]) {
    const url = s(k);
    if (url && !/^https?:\/\//i.test(url)) {
      return NextResponse.json(
        { error: "Social links must start with https://" },
        { status: 400 }
      );
    }
  }

  const { error } = await db.from("settings").upsert({
    id: 1,
    phone: s("phone"),
    whatsapp_number: whatsapp,
    email,
    location: s("location"),
    instagram: s("instagram"), // Instagram work
    instagram_personal: s("instagramPersonal"), // Instagram personal
    facebook: s("facebook"),
    service_line: s("serviceLine", 200),
    delivery_note: s("deliveryNote", 200),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}