import { NextResponse } from "next/server";
import * as auth from "@/lib/auth";
import { getDb } from "@/lib/supabase";

const CATEGORIES = ["Gates", "Pergolas", "Partitions", "CNC Designs", "Custom Fabrication"];
const BUCKET = "project-images";
const isAdmin = async () => {
  const check = (auth as unknown as { isAdmin?: () => boolean | Promise<boolean> }).isAdmin;
  return typeof check === "function" ? check() : false;
};

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json({ error: "Database is not configured yet." }, { status: 503 });
  const { id } = await params;
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const title = String(b.title || "").trim();
  const category = String(b.category || "");
  if (!title || !CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Please check the title and category." }, { status: 400 });
  }
  const { error } = await db
    .from("projects")
    .update({
      title: title.slice(0, 100),
      category,
      caption: String(b.caption || "").trim().slice(0, 150),
      alt: String(b.alt || title).trim().slice(0, 200),
      featured: b.featured === true,
    })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json({ error: "Database is not configured yet." }, { status: 503 });
  const { id } = await params;

  const { data } = await db.from("projects").select("image").eq("id", id).maybeSingle();
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const marker = `/${BUCKET}/`;
  const idx = data?.image?.indexOf(marker) ?? -1;
  if (data && idx !== -1) {
    await db.storage.from(BUCKET).remove([data.image.slice(idx + marker.length)]);
  }
  return NextResponse.json({ ok: true });
}