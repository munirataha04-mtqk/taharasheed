
"use client";

import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async () => {
    if (!password || busy) return;

    setBusy(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `Login failed (${res.status})`);
      }

      window.location.href = "/admin";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#2F3239] px-4 py-12 text-white">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#107F94]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-[#107F94]/15"
      />

      {/* Login card */}
      <section className="relative w-full max-w-md">
        <div className="rounded-2xl border border-[#107F94]/30 bg-[#252A30] p-6 shadow-2xl shadow-black/25 sm:p-9">

          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#107F94]/50 bg-[#107F94]/10">
              <ShieldCheck
                size={25}
                strokeWidth={1.4}
                className="text-[#107F94]"
              />
            </div>

            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#107F94]">
              Taha Rasheed
            </p>

            <h1 className="font-serif text-3xl font-medium tracking-wide text-white sm:text-4xl">
              Admin Login
            </h1>

            <div className="mx-auto my-4 h-px w-12 bg-[#107F94]/70" />

            <p className="text-sm tracking-wide text-white/65">
              Royal Metalworks
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-xs font-medium tracking-wide text-white/80"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  autoComplete="current-password"
                  disabled={busy}
                  placeholder="Enter your password"
                  className="min-h-[48px] w-full rounded-lg border border-white/15 bg-[#2F3239] px-4 py-3 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 hover:border-[#107F94]/60 focus:border-[#107F94] focus:ring-2 focus:ring-[#107F94]/15 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[#107F94] transition hover:bg-[#107F94]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#107F94]"
                >
                  {showPassword ? (
                    <EyeOff size={19} strokeWidth={1.7} />
                  ) : (
                    <Eye size={19} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !password}
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#107F94] px-4 py-3 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-[#0D6B7D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#107F94] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252A30] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Secure Administration
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Royal Metalworks
        </p>
      </section>
    </main>
  );
}
