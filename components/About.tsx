import Image from "next/image";
import {
  ShieldCheck,
  Settings,
  Star,
  Handshake,
} from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

const points = [
  { label: "High-Quality Materials", Icon: ShieldCheck },
  { label: "Precision Laser Cutting", Icon: Settings },
  { label: "On-Time Delivery", Icon: Star },
  { label: "Customer Satisfaction", Icon: Handshake },
];

function instaUrl(value: string) {
  const v = value.trim();

  if (!v) return "";

  if (/^https?:\/\//i.test(v)) return v;

  if (v.includes("instagram.com")) {
    return `https://${v.replace(/^\/+/, "")}`;
  }

  return `https://instagram.com/${v.replace(/^@/, "")}`;
}

export default async function About() {
  const s = await getSiteSettings();
  const personalInstagram = s.instagramPersonal?.trim();

  return (
    <section
      id="about"
      className="bg-[#003D40] text-white"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.95fr_1.65fr] lg:gap-10 lg:px-12 lg:py-10">

        {/* Metalwork image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
          <Image
            src="/images/laser-machine.png"
            alt="Precision laser cutting machine working on a decorative metal sheet"
            fill
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* About content */}
        <div className="grid gap-8 md:grid-cols-[1.35fr_0.85fr] md:gap-0">

          {/* Introduction */}
          <div className="md:pr-7">
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#107F94]">
              About Me
            </p>

            <h2 className="mt-2 font-serif text-[30px] leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl">
              Quality Metalwork,
              <br />
              Crafted with Precision
            </h2>

            <div className="mt-3 h-[2px] w-10 bg-[#107F94]" />

            <p className="mt-4 text-[12px] leading-[1.85] text-white/75 sm:text-[13px]">
              At Royal Metalworks, I bring your ideas to life with high-quality
              materials, advanced laser cutting technology and skilled
              craftsmanship. Whether it&apos;s a modern gate, a custom pergola
              or a unique CNC design, I deliver work that&apos;s built to last
              and made to impress.
            </p>

            {/* Personal Instagram link */}
            {personalInstagram && (
              <p className="mt-3 text-[12px] sm:text-[13px]">
                <a
                  href={instaUrl(personalInstagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline underline-offset-4 transition-colors hover:text-[#107F94]"
                >
                  Instagram
                </a>
              </p>
            )}
          </div>

          {/* Company benefits */}
          <ul className="flex flex-col gap-5 border-t border-white/20 pt-5 md:ml-5 md:gap-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            {points.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-3"
              >
                <Icon
                  size={25}
                  strokeWidth={1.35}
                  className="shrink-0 text-[#107F94]"
                  aria-hidden="true"
                />

                <span className="text-[11px] leading-relaxed text-white sm:text-xs">
                  {label}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}