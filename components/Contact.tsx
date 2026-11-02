import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, Truck, Wrench } from "lucide-react";
import ContactForm from "./ContactForm";
import { getSettings } from "@/lib/content";

export default async function Contact() {
  const s = await getSettings();

  const telUrl = `tel:${s.phone.replace(/[^\d+]/g, "")}`;
  const mailUrl = `mailto:${s.email}`;

  // Tanzania country code is 255
  const digits = s.whatsappNumber.replace(/\D/g, "");
  const wa = digits.startsWith("0") ? `255${digits.slice(1)}` : digits;

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#04120D] text-[#F3ECD9]"
    >
      {/* Subtle background texture */}
      <Image
        src="/images/cnc-1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.035]"
      />

      {/* Main contact layout */}
      <div className="flex w-full flex-col gap-9 px-6 py-10 sm:px-8 md:px-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-0 lg:px-14 lg:py-8 xl:px-16">
        {/* Contact information (stays on the left) */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#D9B47A]">
            Get in Touch
          </p>

          <h2 className="mt-1.5 font-serif text-[27px] leading-[1.12] tracking-tight sm:text-3xl">
            Let&apos;s Build Something
            <br className="hidden sm:block" /> Great Together
          </h2>

          <p className="mt-2.5 max-w-[310px] text-[11px] leading-[1.8] text-[#F3ECD9]/85 sm:text-xs">
            For inquiries, quotations or to discuss your project,
            feel free to contact us. We&apos;re here to help!
          </p>

          <ul className="mt-4 space-y-2.5 text-[11px] sm:text-xs">
            {/* Product / service */}
            {s.serviceLine && (
              <li className="flex items-start gap-3">
                <Wrench size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#D9B47A]" aria-hidden="true" />
                <span className="max-w-[300px]">{s.serviceLine}</span>
              </li>
            )}

            {/* Location */}
            {s.location && (
              <li className="flex items-center gap-3">
                <MapPin size={15} strokeWidth={1.8} className="shrink-0 text-[#D9B47A]" aria-hidden="true" />
                <span>{s.location}</span>
              </li>
            )}

            {/* Delivery */}
            {s.deliveryNote && (
              <li className="flex items-center gap-3">
                <Truck size={15} strokeWidth={1.8} className="shrink-0 text-[#D9B47A]" aria-hidden="true" />
                <span>{s.deliveryNote}</span>
              </li>
            )}

            {/* Phone */}
            {s.phone && (
              <li className="flex items-center gap-3">
                <Phone size={14} strokeWidth={1.8} className="shrink-0 text-[#D9B47A]" aria-hidden="true" />
                <a href={telUrl} className="transition-colors duration-200 hover:text-[#D9B47A]">
                  {s.phone}
                </a>
              </li>
            )}

            {/* WhatsApp */}
            {wa && (
              <li className="flex items-center gap-3">
                <MessageCircle size={14} strokeWidth={1.8} className="shrink-0 text-[#D9B47A]" aria-hidden="true" />
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-[#D9B47A]"
                >
                  wa.me/{wa}
                </a>
              </li>
            )}

            {/* Email */}
            {s.email && (
              <li className="flex items-center gap-3">
                <Mail size={14} strokeWidth={1.8} className="shrink-0 text-[#D9B47A]" aria-hidden="true" />
                <a href={mailUrl} className="break-all transition-colors duration-200 hover:text-[#D9B47A]">
                  {s.email}
                </a>
              </li>
            )}
          </ul>

         
        </div>

        {/* Contact form (far right) */}
        <div className="w-full lg:w-[700px] lg:border-l lg:border-[#F3ECD9]/15 lg:pl-8 [&>*]:!max-w-none [&>*]:w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}