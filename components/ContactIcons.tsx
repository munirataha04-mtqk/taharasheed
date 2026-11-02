
import { Phone, Mail } from "lucide-react";

type Props = {
  phone?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  className?: string;
};

const base =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[#107F94]/60 text-[#107F94] transition-colors duration-300 hover:border-[#003D40] hover:bg-[#003D40] hover:text-[#FFFFFF]";

// Converts a local number such as 0765053786 to 255765053786.
function waNumber(v: string) {
  const d = v.replace(/\D/g, "");
  return d.startsWith("0") ? `255${d.slice(1)}` : d;
}

function instaUrl(v: string) {
  const value = v.trim();

  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.includes("instagram.com/")) {
    return `https://${value.replace(/^\/+/, "")}`;
  }

  return `https://instagram.com/${value.replace(/^@/, "")}`;
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
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
      <circle
        cx="17.5"
        cy="6.5"
        r="0.6"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21z" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export default function ContactIcons({
  phone,
  whatsapp,
  email,
  instagram,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {phone && (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          aria-label="Call us"
          className={base}
        >
          <Phone size={18} aria-hidden="true" />
        </a>
      )}

      {whatsapp && (
        <a
          href={`https://wa.me/${waNumber(whatsapp)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={base}
        >
          <WhatsAppIcon />
        </a>
      )}

      {email && (
        <a
          href={`mailto:${email}`}
          aria-label="Send an email"
          className={base}
        >
          <Mail size={18} aria-hidden="true" />
        </a>
      )}

      {instagram && (
        <a
          href={instaUrl(instagram)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={base}
        >
          <InstagramIcon />
        </a>
      )}
    </div>
  );
}
