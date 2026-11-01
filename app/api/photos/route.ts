import { NextResponse } from "next/server";
import {
  readJson,
  writeJson,
  saveImage,
  removeImage,
  photosFile,
} from "@/lib/store";
import { isAuthed } from "@/lib/auth";

type Photo = { id: number; url: string };

export async function GET() {
  return NextResponse.json(
    await readJson<Photo[]>(photosFile, [])
  );
}

export async function POST(req: Request) {
  // Only authenticated users can upload photos.
  if (!(await isAuthed())) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  try {
    const form = await req.formData();

    const files = form
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Choose at least one image" },
        { status: 400 }
      );
    }

    const added: Photo[] = [];

    for (const [i, f] of files.entries()) {
      added.push({
        id: Date.now() + i,
        url: await saveImage(f),
      });
    }

    const list = await readJson<Photo[]>(photosFile, []);

    await writeJson(photosFile, [...added, ...list]);

    return NextResponse.json(added);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  // Only authenticated users can delete photos.
  if (!(await isAuthed())) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  try {
    const id = Number(
      new URL(req.url).searchParams.get("id")
    );

    const list = await readJson<Photo[]>(photosFile, []);
    const photo = list.find((p) => p.id === id);

    if (!photo) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      );
    }

    await removeImage(photo.url);

    await writeJson(
      photosFile,
      list.filter((p) => p.id !== id)
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Delete failed" },
      { status: 500 }
    );
  }
}