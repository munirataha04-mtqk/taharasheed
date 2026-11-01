"use client";

import { Eye, EyeOff } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-[#07120F] p-4 text-[#F5F0E7]">
      <div className="w-full max-w-sm rounded-xl border border-[#D8B47A]/25 bg-[#0B1512] p-6">
        <h1 className="font-serif text-2xl text-[#D8B47A]">
          Admin Login
        </h1>

        <p className="mt-1 text-sm text-[#F5F0E7]/65">
          Royal Metalworks
        </p>

        {/* Password input with Show/Hide button */}
        <div className="relative mt-5">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
            placeholder="Password"
            autoComplete="current-password"
            disabled={busy}
            className="min-h-[44px] w-full rounded-lg border border-[#D8B47A]/25 bg-[#07120F] px-3 py-2 pr-12 text-sm outline-none transition focus:border-[#D8B47A] disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-[#D8B47A] transition hover:bg-[#D8B47A]/10 hover:text-[#F5F0E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B47A]"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={login}
          disabled={busy || !password}
          className="mt-4 min-h-[44px] w-full rounded-lg bg-[#D8B47A] px-4 py-2 text-sm font-semibold text-[#07120F] transition hover:bg-[#E6C995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Logging in..." : "Log in"}
        </button>
      </div>
    </div>
  );
}