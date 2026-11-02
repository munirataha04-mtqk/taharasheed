import { readJson, settingsFile } from "@/lib/store";

export type SiteSettings = {
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string; // Instagram work
  instagramPersonal: string; // Instagram personal
  location: string;
  serviceLine: string;
  deliveryNote: string;
};

export const defaultSettings: SiteSettings = {
  title: "Taha Rasheed - Royal Metalworks",
  phone: "+255765053786",
  whatsapp: "255765053786",
  email: "",
  instagram: "",
  instagramPersonal: "",
  location: "Ilala - Dar es Salaam",
  serviceLine: "Metal Cutting | CNC Custom Designs & Industrial Solutions",
  deliveryNote: "Tunasafirisha mikoa zote (We deliver to all regions)",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const saved = await readJson<Partial<SiteSettings>>(settingsFile, {});
  const merged = { ...defaultSettings, ...saved };
  return {
    ...merged,
    phone: merged.phone || defaultSettings.phone,
    whatsapp: merged.whatsapp || defaultSettings.whatsapp,
    location: merged.location || defaultSettings.location,
    serviceLine: merged.serviceLine || defaultSettings.serviceLine,
    deliveryNote: merged.deliveryNote || defaultSettings.deliveryNote,
  };
}