import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import {
  readJson,
  writeJson,
  saveImage,
  removeImage,
  projectsFile,
} from "@/lib/store";

type Project = {
  id: number;
  title: string;
  category: string;
  image?: string;
};

export async function GET() {
  return NextResponse.json(await readJson<Project[]>(projectsFile, []));
}

export async function POST(req: Request) {
  // Only authenticated users can add projects.
  if (!(await isAuthed())) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  try {
    const form = await req.formData();

    const title = String(form.get("title") ?? "").trim();
    const category = String(form.get("category") ?? "Laser Cutting");

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const file = form.get("image");
    const image =
      file instanceof File && file.size > 0
        ? await saveImage(file)
        : undefined;

    const project: Project = {
      id: Date.now(),
      title,
      category,
      image,
    };

    const list = await readJson<Project[]>(projectsFile, []);

    await writeJson(projectsFile, [project, ...list]);

    return NextResponse.json(project);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  // Only authenticated users can delete projects.
  if (!(await isAuthed())) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  try {
    const id = Number(new URL(req.url).searchParams.get("id"));

    const list = await readJson<Project[]>(projectsFile, []);
    const project = list.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await removeImage(project.image);

    await writeJson(
      projectsFile,
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