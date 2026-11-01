
import {
  Fence,
  Landmark,
  LayoutGrid,
  Cog,
  Hammer,
} from "lucide-react";

const services = [
  {
    title: "Gates",
    text: "Modern and durable gates for homes and businesses.",
    Icon: Fence,
  },
  {
    title: "Pergolas",
    text: "Stylish pergolas for outdoor living spaces.",
    Icon: Landmark,
  },
  {
    title: "Partitions",
    text: "Custom partitions for privacy and design.",
    Icon: LayoutGrid,
  },
  {
    title: "CNC Designs",
    text: "Intricate and precise laser cut designs.",
    Icon: Cog,
  },
  {
    title: "Custom Fabrication",
    text: "Unique metalwork tailored to your needs.",
    Icon: Hammer,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-beige text-ink"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-5">
        {/* Section heading */}
        <div className="text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.3em]">
            Our Services
          </p>

          <h2 className="mt-1 font-serif text-[30px] leading-tight tracking-[-0.025em] sm:text-4xl">
            What We Offer
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-10 bg-[#B89563]" />
        </div>

        {/* Services */}
        <ul className="mt-6 grid grid-cols-1 gap-y-8 min-[500px]:grid-cols-2 md:grid-cols-3 lg:mt-5 lg:grid-cols-5 lg:gap-y-0">
          {services.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="flex flex-col items-center px-4 text-center lg:min-h-[115px] lg:border-l lg:border-[#96774F]/35 lg:first:border-l-0"
            >
              <Icon
                size={43}
                strokeWidth={1.35}
                className="shrink-0 text-[#8A5A2B]"
                aria-hidden="true"
              />

              <h3 className="mt-2 font-serif text-[17px] leading-tight sm:text-lg">
                {title}
              </h3>

              <p className="mt-2 max-w-[175px] text-[11px] leading-[1.6] text-ink/85 sm:text-xs">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
