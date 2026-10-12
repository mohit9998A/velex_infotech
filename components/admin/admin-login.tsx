"use client";

import { useState } from "react";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  onSuccess: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }

      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 pt-32 sm:pt-36 pb-16">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[120px] [transform:translateZ(0)]" />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-200/90 dark:border-white/[0.08] bg-white/90 dark:bg-[#0D0A24]/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5424D6] to-[#8B4DFF] text-white shadow-lg shadow-purple-500/30">
            <ShieldCheck className="size-7" />
          </div>

          <h1 className="mt-5 font-serif text-2xl font-bold text-[#0D0A24] dark:text-white">
            Admin Authentication
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-white/60">
            Enter your credentials to access the blog management dashboard.
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-white/80 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7138FF] to-[#8B4DFF] py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition-all"
          >
            {loading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                Sign In to Admin
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-white/40">
          Velex Infotech Internal Control Panel
        </div>
      </div>
    </div>
  );
}
