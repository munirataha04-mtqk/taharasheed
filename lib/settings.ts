import { readJson, settingsFile } from "@/lib/store";

export type SiteSettings = {
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  location: string;
};

export const defaultSettings: SiteSettings = {
  title: "Taha Rasheed - Royal Metalworks",
  phone: "",
  whatsapp: "",
  email: "",
  instagram: "",
  location: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const saved = await readJson<Partial<SiteSettings>>(settingsFile, {});
  return { ...defaultSettings, ...saved };
}