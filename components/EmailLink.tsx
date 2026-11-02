"use client";

import type { ReactNode } from "react";

export default function EmailLink({
  email,
  className,
  ariaLabel,
  children,
}: {
  email: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) return; // phones: let the normal mailto: link open the mail app
    e.preventDefault();
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}