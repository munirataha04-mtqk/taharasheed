"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

type Contact = {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
};

const iconLink =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#bd9657] text-[#bd9657] transition-colors hover:bg-[#bd9657] hover:text-[#04150f]";

// 0300 1234567 or +92 300 1234567 becomes 923001234567 for wa.me
function waNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
}

function instaUrl(value: string) {
  return value.startsWith("http")
    ? value
    : `https://instagram.com/${value.replace(/^@/, "")}`;
}

export default function Footer() {
  const [c, setC] = useState<Contact>({
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
  });

  // Contact details come from Admin > Settings
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (s) {
          setC({
            phone: s.phone ?? "",
            whatsapp: s.whatsapp ?? "",
            email: s.email ?? "",
            instagram: s.instagram ?? "",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[#04150f] px-5 py-6 text-[#f3ead7] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 lg:flex-row lg:gap-4">
        {/* Straight text logo */}
        <a
          href="/"
          className="shrink-0 font-serif text-xl tracking-widest text-[#f3ead7]"
        >
          TR
        </a>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <a href="/#services" className="transition-colors hover:text-[#bd9657]">
            Services
          </a>

          <span className="h-4 w-px bg-[#bd9657]" />

          <a href="/#about" className="transition-colors hover:text-[#bd9657]">
            About
          </a>

          <span className="h-4 w-px bg-[#bd9657]" />

          <a href="/#contact" className="transition-colors hover:text-[#bd9657]">
            Contact
          </a>

          <span className="h-4 w-px bg-[#bd9657]" />

          <a href="/admin" className="transition-colors hover:text-[#bd9657]">
            Admin
          </a>
        </nav>

        {/* Contact icons only */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {c.phone && (
            <a
              href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}
              aria-label="Call us"
              className={iconLink}
            >
              <Phone size={16} />
            </a>
          )}

          {c.whatsapp && (
            <a
              href={`https://wa.me/${waNumber(c.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={iconLink}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-base" />
            </a>
          )}

          {c.email && (
            <a
              href={`mailto:${c.email}`}
              aria-label="Send an email"
              className={iconLink}
            >
              <Mail size={16} />
            </a>
          )}

          {c.instagram && (
            <a
              href={instaUrl(c.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={iconLink}
            >
              <FontAwesomeIcon icon={faInstagram} className="text-base" />
            </a>
          )}
        </div>
      </div>

      {/* Thin gold divider */}
      <div className="mx-auto mt-5 flex max-w-7xl items-center">
        <div className="h-px flex-1 bg-[#bd9657]" />
        <span className="mx-3 text-xs text-[#bd9657]">◆</span>
        <div className="h-px flex-1 bg-[#bd9657]" />
      </div>

      {/* Copyright */}
      <p className="mt-4 text-center text-xs tracking-wide text-[#f3ead7]/80">
        © 2026 Taha Rasheed Royal Metalworks. All rights reserved.
      </p>
    </footer>
  );
}