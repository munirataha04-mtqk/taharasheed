
"use client";

import { useState } from "react";

const field =
  "min-h-[44px] w-full rounded-lg border border-[#107F94]/50 bg-[#003D40] px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 focus:border-[#107F94] focus:ring-1 focus:ring-[#107F94]/30";

export default function ContactForm() {
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Laser Cutting",
    message: "",
    website: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

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

      if (!res.ok) {
        throw new Error(
          data.error || "Could not send. Please try again."
        );
      }

      setStatus("sent");

      setF({
        name: "",
        email: "",
        phone: "",
        service: "Laser Cutting",
        message: "",
        website: "",
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not send. Please try again."
      );

      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p
        role="status"
        className="text-sm font-medium text-white"
      >
        Thank you! Your inquiry was sent. We will contact you soon.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <input
        className={field}
        placeholder="Your name"
        aria-label="Your name"
        autoComplete="name"
        value={f.name}
        onChange={(e) =>
          setF({ ...f, name: e.target.value })
        }
      />

      <input
        className={field}
        type="email"
        placeholder="Email"
        aria-label="Email"
        autoComplete="email"
        value={f.email}
        onChange={(e) =>
          setF({ ...f, email: e.target.value })
        }
      />

      <input
        className={field}
        type="tel"
        placeholder="Phone"
        aria-label="Phone"
        autoComplete="tel"
        value={f.phone}
        onChange={(e) =>
          setF({ ...f, phone: e.target.value })
        }
      />

      <select
        className={field}
        aria-label="Select a service"
        value={f.service}
        onChange={(e) =>
          setF({ ...f, service: e.target.value })
        }
      >
        <option>Laser Cutting</option>
        <option>CNC Design</option>
        <option>Custom Fabrication</option>
      </select>

      <textarea
        className={`${field} min-h-[120px] resize-y`}
        placeholder="Your message"
        aria-label="Your message"
        value={f.message}
        onChange={(e) =>
          setF({ ...f, message: e.target.value })
        }
      />

      {/* Hidden spam trap */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={f.website}
        onChange={(e) =>
          setF({ ...f, website: e.target.value })
        }
      />

      {status === "error" && (
        <p
          role="alert"
          className="text-sm font-medium text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={send}
        disabled={status === "sending"}
        className="min-h-[44px] w-full rounded-lg bg-[#107F94] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#003D40] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>
    </div>
  );
}
