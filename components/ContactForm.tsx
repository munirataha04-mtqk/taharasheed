"use client";

import { useState } from "react";

const services = [
  "Gates",
  "Pergolas",
  "Partitions",
  "CNC Designs",
  "Custom Fabrication",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMsg("Could not reach the server. Please try again.");
      setStatus("error");
    }
  }

  const field =
    "w-full min-h-[48px] rounded-sm border border-white/20 bg-[#252A30] px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[#107F94] focus:ring-1 focus:ring-[#107F94]/30";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-sm bg-[#2F3239] text-white"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#107F94]">
        Request a Quote
      </p>

      <input name="name" required placeholder="Your name" className={field} />

      <input
        name="phone"
        required
        placeholder="Phone / WhatsApp"
        className={field}
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className={field}
      />

      <select
        name="service"
        required
        defaultValue=""
        className={`${field} cursor-pointer`}
      >
        <option value="" disabled className="bg-white text-black">
          Select a service
        </option>

        {services.map((s) => (
          <option key={s} value={s} className="bg-white text-black">
            {s}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about your project"
        className="w-full min-h-[130px] resize-y rounded-sm border border-white/20 bg-[#252A30] px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[#107F94] focus:ring-1 focus:ring-[#107F94]/30"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full min-h-[48px] rounded-sm bg-[#107F94] px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#0D6B7D] disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Request"}
      </button>

      {status === "sent" && (
        <p className="text-xs text-[#45B8A9]">
          Thank you! We received your request and will contact you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}
    </form>
  );
}
