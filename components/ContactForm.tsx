
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  Wrench,
} from "lucide-react";
import ContactForm from "./ContactForm";
import { getSettings } from "@/lib/content";

export default async function Contact() {
  const s = await getSettings();

  const telUrl = `tel:${s.phone.replace(/[^\d+]/g, "")}`;
  const mailUrl = `mailto:${s.email}`;

  const digits = s.whatsappNumber.replace(/\D/g, "");
  const wa = digits.startsWith("0")
    ? `255${digits.slice(1)}`
    : digits;

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#003D40] text-white"
    >
      <Image
        src="/images/cnc-1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.035]"
      />

      <div className="flex w-full flex-col lg:flex-row">

        {/* LEFT SIDE - 50% */}
        <div className="w-full bg-[#003D40] px-6 py-10 sm:px-8 md:px-10 lg:w-1/2 lg:flex-none lg:px-14 lg:py-12 xl:px-16">

          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#107F94]">
            Get in Touch
          </p>

          <h2 className="mt-1.5 font-serif text-[27px] leading-[1.12] tracking-tight text-white sm:text-3xl">
            Let&apos;s Build Something
            <br className="hidden sm:block" /> Great Together
          </h2>

          <p className="mt-2.5 max-w-[310px] text-[11px] leading-[1.8] text-white/75 sm:text-xs">
            For inquiries, quotations or to discuss your project,
            feel free to contact us. We&apos;re here to help!
          </p>

          <ul className="mt-4 space-y-2.5 text-[11px] text-white sm:text-xs">

            {s.serviceLine && (
              <li className="flex items-start gap-3">
                <Wrench size={14} className="mt-0.5 shrink-0 text-[#107F94]" />
                <span className="max-w-[300px]">{s.serviceLine}</span>
              </li>
            )}

            {s.location && (
              <li className="flex items-center gap-3">
                <MapPin size={15} className="shrink-0 text-[#107F94]" />
                <span>{s.location}</span>
              </li>
            )}

            {s.deliveryNote && (
              <li className="flex items-center gap-3">
                <Truck size={15} className="shrink-0 text-[#107F94]" />
                <span>{s.deliveryNote}</span>
              </li>
            )}

            {s.phone && (
              <li className="flex items-center gap-3">
                <Phone size={14} className="shrink-0 text-[#107F94]" />
                <a href={telUrl}>{s.phone}</a>
              </li>
            )}

            {wa && (
              <li className="flex items-center gap-3">
                <MessageCircle size={14} className="shrink-0 text-[#107F94]" />
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
                  wa.me/{wa}
                </a>
              </li>
            )}

            {s.email && (
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-[#107F94]" />
                <a href={mailUrl} className="break-all">{s.email}</a>
              </li>
            )}

          </ul>
        </div>

        {/* RIGHT SIDE - 50% */}
        <div className="w-full bg-[#003D40] px-6 py-10 sm:px-8 md:px-10 lg:w-1/2 lg:flex-none lg:px-12 lg:py-12">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}
