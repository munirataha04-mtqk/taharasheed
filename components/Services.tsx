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
      className="bg-[#003D40] text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">

        {/* Section heading */}
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#107F94]">
            Our Services
          </p>

          <h2 className="mt-2 font-serif text-[30px] leading-tight tracking-[-0.025em] text-white sm:text-4xl">
            What We Offer
          </h2>

          <div className="mx-auto mt-4 h-[2px] w-12 bg-[#107F94]" />
        </div>

        {/* Services */}
        <ul className="mt-9 grid grid-cols-1 gap-y-9 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">

          {services.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="group flex flex-col items-center px-4 text-center lg:min-h-[150px] lg:border-l lg:border-white/20 lg:first:border-l-0"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-[#107F94]/25">
                <Icon
                  size={29}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#107F94] transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-3 font-serif text-[18px] leading-tight text-white">
                {title}
              </h3>

              <p className="mt-2 max-w-[190px] text-xs leading-[1.7] text-white/70">
                {text}
              </p>
            </li>
          ))}

        </ul>
      </div>
    </section>
  );
}