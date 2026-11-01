import { promises as fs } from "fs";
import path from "path";
import { uploadDir } from "@/lib/store";

const types: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const safe = path.basename(name); // blocks ../ tricks
  try {
    const data = await fs.readFile(path.join(uploadDir, safe));
    return new Response(data, {
      headers: {
        "Content-Type": types[path.extname(safe).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}