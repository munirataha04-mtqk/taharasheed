import { getDb } from "@/lib/supabase";
import { projects as fallback, type Project, type Category } from "@/data/projects";
import { siteConfig } from "@/config/site";

export async function getProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return fallback;
  const { data, error } = await db
    .from("projects")
    .select("*")
    .order("sort", { ascending: true })
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return fallback;
  return data.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category as Category,
    caption: r.caption,
    image: r.image,
    alt: r.alt || r.title,
    featured: r.featured,
  }));
}

export type SiteSettings = {
  phone: string;
  whatsappNumber: string;
  email: string;
  location: string;
  instagram: string; // Instagram work
  instagramPersonal: string; // Instagram personal
  facebook: string;
  serviceLine: string;
  deliveryNote: string;
};

const defaults: SiteSettings = {
  phone: "+255765053786",
  whatsappNumber: "255765053786",
  email: siteConfig.email,
  location: "Ilala - Dar es Salaam",
  instagram: siteConfig.socials.instagram,
  instagramPersonal: "",
  facebook: siteConfig.socials.facebook,
  serviceLine: "Metal Cutting | CNC Custom Designs & Industrial Solutions",
  deliveryNote: "Tunasafirisha mikoa zote (We deliver to all regions)",
};

export async function getSettings(): Promise<SiteSettings> {
  const db = getDb();
  if (!db) return defaults;
  const { data } = await db.from("settings").select("*").eq("id", 1).maybeSingle();
  if (!data) return defaults;
  return {
    phone: data.phone || defaults.phone,
    whatsappNumber: data.whatsapp_number || defaults.whatsappNumber,
    email: data.email || defaults.email,
    location: data.location || defaults.location,
    instagram: data.instagram || defaults.instagram,
    instagramPersonal: data.instagram_personal || "",
    facebook: data.facebook || defaults.facebook,
    serviceLine: data.service_line || defaults.serviceLine,
    deliveryNote: data.delivery_note || defaults.deliveryNote,
  };
}