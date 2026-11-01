import { MessageCircle } from "lucide-react";

type P = { size?: number; className?: string };

export function InstagramIcon({ size = 22, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 22, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M13.5 21.5v-8h2.5l.5-3h-3v-1.5c0-.9.4-1.5 1.5-1.5h1.6V5.8c-.4-.1-1.2-.2-2.100-.2-2.200 0-3.500 1.300-3.500 3.600v1.300H8.500v3h2.500v8" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 22, className }: P) {
  return <MessageCircle size={size} strokeWidth={1.7} className={className} aria-hidden="true" />;
}