import { unstable_noStore as noStore } from "next/cache";
import { readJson, projectsFile } from "@/lib/store";

type Project = { id: number; title: string; category: string; image?: string };

export default async function PublicProjects() {
  noStore(); // always show the latest projects
  const projects = await readJson<Project[]>(projectsFile, []);

  if (projects.length === 0) {
    return <p className="text-sm text-[#F5F0E7]/60">New projects are coming soon.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <article key={p.id} className="overflow-hidden rounded-xl border border-[#D8B47A]/20 bg-[#0B1512]">
          {p.image ? (
            <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#1d3a2f] to-[#0B1512]" />
          )}
          <div className="p-4">
            <h3 className="font-serif text-lg text-[#D8B47A]">{p.title}</h3>
            <p className="text-sm text-[#F5F0E7]/65">{p.category}</p>
          </div>
        </article>
      ))}
    </div>
  );
}