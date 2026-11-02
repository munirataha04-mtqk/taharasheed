
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#107F94]/40 bg-[#2f3239]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-[60px]">
        {/* Brand */}
        <Link
          href="/#home"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label="Royal Metalworks, home"
          onClick={() => setOpen(false)}
        >
          {/* Logo */}
          <Image
            src="/images/logo.jpg"
            alt="Royal Metalworks logo"
            width={160}
            height={80}
            priority
            className="h-12 w-28 shrink-0 object-contain sm:h-14 sm:w-36"
          />
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
              className="relative py-2 text-[12px] text-[#FFFFFF]/85 transition-colors duration-300 hover:text-[#107F94]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop quote button */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#contact"
            className="inline-flex min-h-[36px] items-center justify-center border border-[#107F94] px-5 py-2 text-[11px] text-[#FFFFFF] transition-colors duration-300 hover:bg-[#107F94] hover:text-[#FFFFFF]"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[#107F94] transition-colors hover:text-[#FFFFFF] lg:hidden"
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
          className="border-t border-[#107F94]/40 bg-[#003D40] px-5 pb-5 lg:hidden"
        >
          <ul className="mx-auto flex max-w-[600px] flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#107F94]/30 py-3.5 text-[13px] text-[#FFFFFF]/90 transition-colors hover:text-[#107F94]"
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
              className="flex min-h-[40px] flex-1 items-center justify-center border border-[#107F94] px-5 py-2 text-[12px] text-[#FFFFFF] transition-colors hover:bg-[#107F94] hover:text-[#FFFFFF]"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
