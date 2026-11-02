
import { unstable_noStore as noStore } from "next/cache";
import { readJson, projectsFile } from "@/lib/store";

type Project = {
  id: number;
  title: string;
  category: string;
  image?: string;
};

export default async function PublicProjects() {
  noStore();

  const projects = await readJson<Project[]>(projectsFile, []);

  if (projects.length === 0) {
    return (
      <p className="text-center text-sm text-[#003D40]/60">
        New projects are coming soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <article
          key={p.id}
          className="group overflow-hidden rounded-xl border border-[#107F94]/30 bg-white transition-colors duration-300 hover:border-[#107F94]"
        >
          {p.image ? (
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="aspect-[4/3] bg-gradient-to-br from-[#107F94] to-[#003D40]" />
          )}

          <div className="p-5">
            <h3 className="font-serif text-xl text-[#003D40] transition-colors duration-300 group-hover:text-[#107F94]">
              {p.title}
            </h3>

            <p className="mt-1 text-sm text-black/60">
              {p.category}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
