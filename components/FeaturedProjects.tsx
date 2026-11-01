import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { readJson, projectsFile } from "@/lib/store";

type Project = {
  id: number;
  title: string;
  category: string;
  description?: string;
  image?: string;
};

export default async function FeaturedProjects() {
  // Newest 5 projects added from the admin dashboard
  const featured = (await readJson<Project[]>(projectsFile, [])).slice(0, 5);

  return (
    <section id="portfolio" className="bg-bg text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-10">
        {/* Section heading */}
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
            Our Portfolio
          </p>

          <h2 className="mt-2 font-serif text-[30px] leading-tight tracking-[-0.025em] sm:text-4xl">
            Featured Projects
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-10 bg-gold" />
        </div>

        {/* Project gallery */}
        {featured.length === 0 ? (
          <p className="mt-8 text-center text-sm text-cream/60">
            New projects are coming soon.
          </p>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {featured.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index * 100}
                className="group min-w-0 text-center"
              >
                {/* Project image */}
                <Link
                  href="/portfolio"
                  aria-label={`View ${project.title} project`}
                  className="relative block aspect-[4/5] overflow-hidden border border-line bg-black/20 transition-colors duration-300 group-hover:border-gold"
                >
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

                  {/* Subtle image overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </Link>

                {/* Project title */}
                <h3 className="mt-3 font-serif text-[19px] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold sm:text-xl">
                  {project.title}
                </h3>

                {/* Project category */}
                <p className="mt-1 text-[10px] leading-relaxed text-cream/65 sm:text-[11px]">
                  {project.category}
                </p>

                {/* Optional description */}
                {project.description && (
                  <p className="mt-1 line-clamp-3 text-[10px] leading-relaxed text-cream/65 sm:text-[11px]">
                    {project.description}
                  </p>
                )}
              </Reveal>
            ))}
          </ul>
        )}

        {/* View all projects */}
        <div className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="inline-flex min-h-[38px] items-center justify-center gap-3 rounded-[2px] border border-gold px-6 py-2.5 text-[11px] font-medium text-cream transition-colors duration-300 hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            View All Projects
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}