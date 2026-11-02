
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-bg"
    >
      {/* Background image and overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-gate.jpg"
          alt="Custom black metal entrance gate with decorative laser-cut panels"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />

        {/* Gradient keeps the text readable while showing the gate */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/10 sm:via-bg/65" />

        {/* Subtle overall darkening */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Additional contrast on small screens */}
        <div className="absolute inset-0 bg-bg/25 sm:hidden" />
      </div>

      {/* Hero content */}
      <div className="mx-auto flex min-h-[355px] max-w-[1440px] items-center px-6 py-12 sm:min-h-[400px] sm:px-8 lg:min-h-[355px] lg:px-[60px] lg:py-10">
        <div className="w-full max-w-[470px]">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#107F94] sm:text-[11px]">
            Royal Metalworks
          </p>

          <h1 className="mt-3 font-serif text-[32px] leading-[1.12] tracking-[-0.035em] text-white sm:text-[40px] lg:text-[42px]">
            Custom Metal Designs
            <br />
            Built for{" "}
            <em className="font-normal not-italic text-[#107F94]">
              Your Space
            </em>
          </h1>

          <p className="mt-4 max-w-[370px] text-[13px] leading-[1.7] text-white sm:text-sm">
            We specialize in laser cutting and custom metal fabrication,
            creating durable, stylish and unique designs for homes,
            businesses and outdoor spaces.
          </p>

          <Link
            href="/#portfolio"
            className="mt-5 inline-flex min-h-[39px] items-center justify-center gap-3 rounded-[3px] bg-[#107F94] px-6 py-2.5 text-[12px] font-medium !text-black transition-colors duration-300 hover:bg-[#003D40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#107F94]"
          >
            View Our Work
            <ChevronRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}
