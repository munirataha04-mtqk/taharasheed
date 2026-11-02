"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";

type Contact = {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
};

const iconLink =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#bd9657] text-[#bd9657] transition-colors hover:bg-[#bd9657] hover:text-[#04150f]";

// Outline icons drawn to match the Lucide phone and mail icons
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

// 0765053786 or +255 765 053 786 becomes 255765053786 for wa.me
function waNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("0") ? `255${digits.slice(1)}` : digits;
}

function instaUrl(value: string) {
  const v = value.trim();
  return v.startsWith("http") ? v : `https://instagram.com/${v.replace(/^@/, "")}`;
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
    fetch("/api/settings", { cache: "no-store" })
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
        <a href="/" className="shrink-0 font-serif text-xl tracking-widest text-[#f3ead7]">
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
            <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} aria-label="Call us" className={iconLink}>
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
              <WhatsAppIcon size={16} />
            </a>
          )}

          {c.email && (
            <a href={`mailto:${c.email}`} aria-label="Send an email" className={iconLink}>
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
              <InstagramIcon size={16} />
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
      <p className="text-center text-xs">FOOTER TEST</p>
      {/* Copyright */}
      <p className="mt-4 text-center text-xs tracking-wide text-[#f3ead7]/80">
        © 2026 Taha Rasheed Royal Metalworks. All rights reserved.
      </p>
    </footer>
  );
}