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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "The contact form is not connected to an email service yet." },
      { status: 503 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Royal Metalworks Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New inquiry: ${service} from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}