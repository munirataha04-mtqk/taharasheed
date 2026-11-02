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

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const all = await readJson<Project[]>(projectsFile, []);

  const active = categories.includes(category ?? "")
    ? category
    : undefined;

  const projects = active
    ? all.filter((p) => p.category === active)
    : all;

  const chip = (selected: boolean) =>
    `inline-flex min-h-[40px] items-center rounded-full border px-5 py-2 text-[11px] font-medium transition-all duration-300 ${
      selected
        ? "border-[#003D40] bg-[#003D40] text-white"
        : "border-[#003D40]/30 bg-transparent text-[#003D40] hover:border-[#107F94] hover:bg-[#107F94]/10"
    }`;

  return (
    <section className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">

        {/* Section heading */}
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#107F94]">
            Royal Metalworks
          </p>

          <h1 className="mt-2 font-serif text-[30px] leading-tight tracking-[-0.025em] text-[#003D40] sm:text-4xl">
            All Projects
          </h1>

          <div className="mx-auto mt-3 h-[2px] w-10 bg-[#107F94]" />
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link
            href="/portfolio"
            className={chip(!active)}
          >
            All Projects
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
          <p className="mt-10 text-center text-sm text-black/60">
            {active
              ? "No projects in this category yet."
              : "New projects are coming soon."}
          </p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">

            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={(index % 5) * 100}
                className="group min-w-0 text-center"
              >
                {/* Project image */}
                <div className="relative block aspect-[4/5] overflow-hidden border border-[#003D40]/15 bg-[#003D40]/5 transition-colors duration-300 group-hover:border-[#107F94]">

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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#107F94] to-[#003D40]" />
                  )}

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>

                {/* Project details */}
                <h3 className="mt-3 font-serif text-[19px] leading-tight tracking-[-0.02em] text-[#003D40] transition-colors duration-300 group-hover:text-[#107F94] sm:text-xl">
                  {project.title}
                </h3>

                <p className="mt-1 text-[10px] leading-relaxed text-black/65 sm:text-[11px]">
                  {project.category}
                </p>

                {project.description && (
                  <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-black/60 sm:text-[11px]">
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