import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readJson, writeJson, inquiriesFile } from "@/lib/store";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: "New" | "Replied";
};

const notLoggedIn = () => NextResponse.json({ error: "Not logged in" }, { status: 401 });

// Admin only: list inquiries
export async function GET() {
  if (!(await isAuthed())) return notLoggedIn();
  return NextResponse.json(await readJson<Inquiry[]>(inquiriesFile, []));
}

// Public: the website contact form sends inquiries here
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

  const inquiry: Inquiry = {
    id: Date.now(),
    name,
    email,
    phone,
    service,
    message,
    date: new Date().toISOString(),
    status: "New",
  };
  const list = await readJson<Inquiry[]>(inquiriesFile, []);
  await writeJson(inquiriesFile, [inquiry, ...list].slice(0, 1000));
  return NextResponse.json({ ok: true });
}

// Admin only: mark New / Replied
export async function PATCH(req: Request) {
  if (!(await isAuthed())) return notLoggedIn();
  const { id, status } = await req.json().catch(() => ({}));
  if (status !== "New" && status !== "Replied") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const list = await readJson<Inquiry[]>(inquiriesFile, []);
  const found = list.find((q) => q.id === Number(id));
  if (!found) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  found.status = status;
  await writeJson(inquiriesFile, list);
  return NextResponse.json(found);
}

// Admin only: delete
export async function DELETE(req: Request) {
  if (!(await isAuthed())) return notLoggedIn();
  const id = Number(new URL(req.url).searchParams.get("id"));
  const list = await readJson<Inquiry[]>(inquiriesFile, []);
  await writeJson(inquiriesFile, list.filter((q) => q.id !== id));
  return NextResponse.json({ ok: true });
}