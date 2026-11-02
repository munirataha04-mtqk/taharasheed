
"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

type Contact = {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
};

const iconLink =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFFFFF]/70 text-[#FFFFFF] transition-colors duration-200 hover:border-[#107F94] hover:bg-[#107F94] hover:text-[#FFFFFF]";

// Instagram outline icon
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

// WhatsApp outline icon
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

// Converts a Tanzanian phone number to the format required by wa.me
function waNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("0")
    ? `255${digits.slice(1)}`
    : digits;
}

function instaUrl(value: string) {
  const v = value.trim();

  if (!v) return "";

  if (/^https?:\/\//i.test(v)) {
    return v;
  }

  if (v.includes("instagram.com")) {
    return `https://${v.replace(/^\/+/, "")}`;
  }

  return `https://instagram.com/${v.replace(/^@/, "")}`;
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
    <footer className="bg-[#003D40] px-5 py-6 text-[#FFFFFF] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 lg:flex-row lg:gap-4">
        {/* Logo */}
        <Image
          src="/images/logo.jpg"
          alt="Royal Metalworks logo"
          width={160}
          height={80}
          priority
          className="h-12 w-28 shrink-0 object-contain sm:h-14 sm:w-36"
        />

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <a
            href="/#services"
            className="transition-colors hover:text-[#107F94]"
          >
            Services
          </a>

          <span className="h-4 w-px bg-[#107F94]" />

          <a
            href="/#about"
            className="transition-colors hover:text-[#107F94]"
          >
            About
          </a>

          <span className="h-4 w-px bg-[#107F94]" />

          <a
            href="/#contact"
            className="transition-colors hover:text-[#107F94]"
          >
            Contact
          </a>

          <span className="h-4 w-px bg-[#107F94]" />

          <a
            href="/admin"
            className="transition-colors hover:text-[#107F94]"
          >
            Admin
          </a>
        </nav>

        {/* White contact icons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {c.phone && (
            <a
              href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}
              aria-label="Call us"
              className={iconLink}
            >
              <Phone size={16} aria-hidden="true" />
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
            <a
              href={`mailto:${c.email}`}
              aria-label="Send an email"
              className={iconLink}
            >
              <Mail size={16} aria-hidden="true" />
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

      {/* Teal divider */}
      <div className="mx-auto mt-5 flex max-w-7xl items-center">
        <div className="h-px flex-1 bg-[#107F94]" />
        <span className="mx-3 text-xs text-[#107F94]">◆</span>
        <div className="h-px flex-1 bg-[#107F94]" />
      </div>

      {/* Copyright */}
      <p className="mt-4 text-center text-xs tracking-wide text-[#FFFFFF]/80">
        © 2026 Royal Metalworks. All rights reserved.
      </p>
    </footer>
  );
}
