import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const dataDir = path.join(process.cwd(), "data");
export const uploadDir = path.join(process.cwd(), "uploads");
export const projectsFile = path.join(dataDir, "projects.json");
export const photosFile = path.join(dataDir, "photos.json");
export const inquiriesFile = path.join(dataDir, "inquiries.json");
export const settingsFile = path.join(dataDir, "settings.json");

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(file: string, data: unknown) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// Checks the file, saves it in /uploads, returns the public URL
export async function saveImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
  if (file.size > 5 * 1024 * 1024) throw new Error("Each image must be under 5 MB");
  const ext = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, "") || ".jpg";
  const name = `${crypto.randomUUID()}${ext}`;
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, name), Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}

export async function removeImage(url?: string) {
  if (!url) return;
  await fs.unlink(path.join(uploadDir, path.basename(url))).catch(() => {});
}