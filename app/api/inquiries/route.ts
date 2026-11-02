import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";

type Row = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "New" | "Replied";
  created_at: string;
};

const toInquiry = (r: Row) => ({
  id: r.id,
  name: r.name,
  email: r.email,
  phone: r.phone,
  service: r.service,
  message: r.message,
  date: r.created_at,
  status: r.status,
});

const notLoggedIn = () => NextResponse.json({ error: "Not logged in" }, { status: 401 });
const dbMissing = () =>
  NextResponse.json({ error: "The server is not connected to the database yet." }, { status: 503 });

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Admin only: list inquiries, newest first
export async function GET() {
  if (!(await isAuthed())) return notLoggedIn();
  const supabase = db();
  if (!supabase) return dbMissing();

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    console.error("Inquiries load error:", error);
    return NextResponse.json({ error: "Could not load inquiries" }, { status: 500 });
  }
  return NextResponse.json((data ?? []).map((r) => toInquiry(r as Row)));
}

// Public: the website contact form can also send inquiries here
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true }); // hidden spam trap field

  const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const name = clean(body.name, 100);
  const email = clean(body.email, 150);
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 100);
  const message = clean(body.message, 2000);

  if (!name || !message) {
    return NextResponse.json({ error: "Please enter your name and message" }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json({ error: "Please enter an email or phone number" }, { status: 400 });
  }

  const supabase = db();
  if (!supabase) return dbMissing();

  const { error } = await supabase
    .from("inquiries")
    .insert({ name, email, phone, service, message });

  if (error) {
    console.error("Inquiry save error:", error);
    return NextResponse.json({ error: "Could not save your request" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

// Admin only: mark New / Replied
export async function PATCH(req: Request) {
  if (!(await isAuthed())) return notLoggedIn();
  const { id, status } = await req.json().catch(() => ({}));
  if (status !== "New" && status !== "Replied") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const supabase = db();
  if (!supabase) return dbMissing();

  const { data, error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", Number(id))
    .select()
    .maybeSingle();

  if (error) {
    console.error("Inquiry update error:", error);
    return NextResponse.json({ error: "Could not update inquiry" }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  return NextResponse.json(toInquiry(data as Row));
}

// Admin only: delete
export async function DELETE(req: Request) {
  if (!(await isAuthed())) return notLoggedIn();
  const id = Number(new URL(req.url).searchParams.get("id"));
  const supabase = db();
  if (!supabase) return dbMissing();

  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) {
    console.error("Inquiry delete error:", error);
    return NextResponse.json({ error: "Could not delete inquiry" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}