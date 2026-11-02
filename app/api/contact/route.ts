import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const services = ["Gates", "Pergolas", "Partitions", "CNC Designs", "Custom Fabrication"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { name, phone, email, service, message } = body as Record<string, string>;
  const emailOk = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name?.trim() || !phone?.trim() || !emailOk || !services.includes(service) || !message?.trim()) {
    return NextResponse.json({ error: "Please fill in all fields correctly." }, { status: 400 });
  }
  if (message.length > 3000 || name.length > 200) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "The server is not connected to the database yet." },
      { status: 503 }
    );
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("inquiries").insert({
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    service,
    message: message.trim(),
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Could not save your request. Please try again later." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}