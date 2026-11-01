import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { readJson, projectsFile } from "@/lib/store";
import { categories } from "@/lib/categories";

export const dynamic = "force-dynamic";

type Project = {
  id: number;
  title: string;
  category: string;
  description?: string;
  image?: string;
};

// Keep these the same as the category list in the admin "Add New Project" dropdown
export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = await readJson<Project[]>(projectsFile, []);
  const active = categories.includes(category ?? "") ? category : undefined;
  const projects = active ? all.filter((p) => p.category === active) : all;

  const chip = (selected: boolean) =>
    `inline-flex min-h-[38px] items-center rounded-[2px] border px-4 py-2 text-[11px] font-medium transition-colors duration-300 ${
      selected
        ? "border-gold bg-gold text-ink"
        : "border-line text-cream/75 hover:border-gold hover:text-cream"
    }`;

  return (
    <section className="bg-bg text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        {/* Section heading */}
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
           
          </p>
          <h1 className="mt-2 font-serif text-[30px] leading-tight tracking-[-0.025em] sm:text-4xl">
            All Projects
          </h1>
          <div className="mx-auto mt-3 h-[2px] w-10 bg-gold" />
        </div>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link href="/portfolio" className={chip(!active)}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/portfolio?category=${encodeURIComponent(c)}`}
              className={chip(active === c)}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Project gallery */}
        {projects.length === 0 ? (
          <p className="mt-10 text-center text-sm text-cream/60">
            {active ? "No projects in this category yet." : "New projects are coming soon."}
          </p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={(index % 5) * 100}
                className="group min-w-0 text-center"
              >
                <div className="relative block aspect-[4/5] overflow-hidden border border-line bg-black/20 transition-colors duration-300 group-hover:border-gold">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, (min-width: 400px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1d3a2f] to-[#0B1512]" />
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>

                <h3 className="mt-3 font-serif text-[19px] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-[10px] leading-relaxed text-cream/65 sm:text-[11px]">
                  {project.category}
                </p>
                {project.description && (
                  <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-cream/65 sm:text-[11px]">
                    {project.description}
                  </p>
                )}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}