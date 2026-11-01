
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { filterOptions, type Project } from "@/data/projects";

export default function PortfolioGallery({
  projects,
}: {
  projects: Project[];
}) {
  const [filter, setFilter] =
    useState<(typeof filterOptions)[number]>("All Projects");

  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    filter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (!selected) return;

    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSelected(null);

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="flex flex-wrap justify-center gap-3"
      >
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`min-h-11 rounded-full border px-5 py-2 text-sm transition-colors ${
              filter === f
                ? "border-gold bg-gold text-ink"
                : "border-line hover:border-gold hover:text-gold"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => setSelected(p)}
              className="group block w-full text-left"
              aria-label={`Open larger image: ${p.title}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-line">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mt-3 font-serif text-xl">{p.title}</p>
              <p className="text-xs text-cream/70">{p.caption}</p>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            aria-label="Close image"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-cream hover:text-gold"
          >
            <X size={30} />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.image}
              alt={selected.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
