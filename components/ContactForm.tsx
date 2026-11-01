"use client";

import { useState } from "react";

const field =
  "min-h-[44px] w-full rounded-lg border border-[#D8B47A]/25 bg-[#07120F] px-3 py-2 text-sm text-[#F5F0E7] outline-none placeholder:text-[#F5F0E7]/40 focus:border-[#D8B47A]";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", phone: "", service: "Laser Cutting", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const send = async () => {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send. Please try again.");
      setStatus("sent");
      setF({ name: "", email: "", phone: "", service: "Laser Cutting", message: "", website: "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send. Please try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <p className="text-sm text-[#D8B47A]">Thank you! Your inquiry was sent. We will contact you soon.</p>;
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <input className={field} placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input className={field} placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <input className={field} placeholder="Phone" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      <select className={field} value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })}>
        <option>Laser Cutting</option>
        <option>CNC Design</option>
        <option>Custom Fabrication</option>
      </select>
      <textarea className={`${field} min-h-[120px]`} placeholder="Your message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      {/* Hidden spam trap: real visitors never see or fill this */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        value={f.website}
        onChange={(e) => setF({ ...f, website: e.target.value })}
      />
      {status === "error" && <p className="text-sm text-red-400">{error}</p>}
      <button
        onClick={send}
        disabled={status === "sending"}
        className="min-h-[44px] w-full rounded-lg bg-[#D8B47A] px-4 py-2 text-sm font-semibold text-[#07120F] disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>
    </div>
  );
}