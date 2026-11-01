"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";

const iconBtn =
  "flex h-[36px] w-[36px] shrink-0 items-center justify-center border border-gold/60 text-gold transition-colors duration-300 hover:bg-gold hover:text-ink";

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function instaUrl(value: string) {
  return value.startsWith("http")
    ? value
    : `https://instagram.com/${value.replace(/^@/, "")}`;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [instagram, setInstagram] = useState("");

  // Instagram link comes from Admin > Settings
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (s?.instagram) setInstagram(s.instagram);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-[60px]">
        {/* Brand */}
        <Link
          href="/#home"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label="Taha Rasheed Royal Metalworks, home"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-[34px] leading-none text-gold sm:text-[38px]">
            TR
          </span>

          <span className="flex flex-col leading-tight">
            <span className="font-serif text-[17px] uppercase tracking-[0.07em] sm:text-xl">
              Taha Rasheed
            </span>

            <span className="mt-1 text-[8px] uppercase tracking-[0.24em] text-cream/75 sm:text-[9px] sm:tracking-[0.3em]">
              Royal Metalworks
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 xl:gap-9 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 text-[12px] text-cream/85 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Instagram icon + quote button */}
        <div className="hidden items-center gap-3 lg:flex">
          {instagram && (
            <a
              href={instaUrl(instagram)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={iconBtn}
            >
              <InstagramIcon />
            </a>
          )}

          <Link
            href="/#contact"
            className="inline-flex min-h-[36px] items-center justify-center border border-gold px-5 py-2 text-[11px] text-cream transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-gold transition-colors hover:text-cream lg:hidden"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-line bg-bg2 px-5 pb-5 lg:hidden"
        >
          <ul className="mx-auto flex max-w-[600px] flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/40 py-3.5 text-[13px] text-cream/90 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-5 flex max-w-[600px] items-center gap-3">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex min-h-[40px] flex-1 items-center justify-center border border-gold px-5 py-2 text-[12px] text-cream transition-colors hover:bg-gold hover:text-ink"
            >
              Get a Quote
            </Link>

            {instagram && (
              <a
                href={instaUrl(instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${iconBtn} h-[40px] w-[40px]`}
              >
                <InstagramIcon />
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}