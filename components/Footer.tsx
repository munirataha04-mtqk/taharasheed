"use client";

import EmailLink from "./EmailLink";
import { useEffect, useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

type Contact = {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
};

const iconLink =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#003D40]/50 text-[#003D40] transition-colors duration-200 hover:border-[#107F94] hover:bg-[#107F94] hover:text-white";

function waNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  return digits.startsWith("0")
    ? `255${digits.slice(1)}`
    : digits;
}

function instaUrl(value: string) {
  const v = value.trim();

  if (!v) return "";

  if (/^https?:\/\//i.test(v)) return v;

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
    let active = true;

    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (active && s) {
          setC({
            phone: s.phone ?? "",
            whatsapp: s.whatsapp ?? "",
            email: s.email ?? "",
            instagram: s.instagram ?? "",
          });
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <footer className="bg-white px-5 py-6 text-[#003D40]">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 lg:flex-row lg:gap-4">

        {/* Logo with gray background */}
        <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-md bg-gray-400 px-2 sm:h-[72px] sm:w-40">
          <Image
            src="/images/logo.jpg"
            alt="Royal Metalworks logo"
            width={160}
            height={80}
            priority
            className="h-12 w-32 object-contain sm:h-14 sm:w-36"
          />
        </div>

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

        {/* Contact icons */}
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
              <MessageCircle size={16} aria-hidden="true" />
            </a>
          )}

          {c.email && (
            <EmailLink
              email={c.email}
              ariaLabel="Send an email"
              className={iconLink}
            >
              <Mail size={16} aria-hidden="true" />
            </EmailLink>
          )}

          {c.instagram && (
            <a
              href={instaUrl(c.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={iconLink}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-base"
                aria-hidden="true"
              />
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
      <p className="mt-4 text-center text-xs tracking-wide text-[#003D40]/80">
        © 2026 Royal Metalworks. All rights reserved.
      </p>

    </footer>
  );
}