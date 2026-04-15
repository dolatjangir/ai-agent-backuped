"use client";

import { useState, FormEvent } from "react";

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface TrustItem {
  icon: string;
  label: string;
}

interface StatItem {
  value: string;
  label: string;
}

/* ─── Static data ─────────────────────────────────────────────────────────── */
const TRUST_ITEMS: TrustItem[] = [
  { icon: "✦", label: "Start free — no card needed" },
  { icon: "✦", label: "Try everything for 14 days" },
  { icon: "✦", label: "Leave anytime, no questions asked" },
  { icon: "✦", label: "Simple billing with GST invoice" },
];

const STATS: StatItem[] = [
  { value: "10,000+", label: "Properties managed" },
  { value: "20+ hrs", label: "Time saved every week" },
  { value: "98.5%",   label: "Accurate AI decisions" },
  { value: "48 hrs",  label: "Up and running" },
];

/* ─── FinalCTA ────────────────────────────────────────────────────────────── */
export default function FinalCTA() {
  const [email, setEmail]     = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Replace with your actual API call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden">

      {/* ── Main gradient slab ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-920,#002b57) 0%, var(--color-primary-700,#0057ad) 50%, var(--color-primary-600,#0066cc) 100%)",
        }}
      >

        {/* Dot-grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Cube texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/cubes.png')",
          }}
        />

        {/* Rotating slow glow orb */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className="w-[140%] h-[140%] rounded-full opacity-20 animate-spin"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(51,153,255,0.6) 25%, transparent 50%, rgba(0,102,204,0.4) 75%, transparent 100%)",
              animationDuration: "18s",
            }}
          />
        </div>

        {/* Glow orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 bg-[radial-gradient(circle,rgba(51,153,255,0.8)_0%,transparent_70%)]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 bg-[radial-gradient(circle,rgba(0,87,173,0.8)_0%,transparent_70%)]" />

        {/* Bottom vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-[10px] font-mono font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#66b2ff] animate-ping opacity-75" />
              <span className="relative rounded-full bg-[#66b2ff] w-2 h-2" />
            </span>
            10 AI Agents · Ready to Deploy
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
           Let Your Agents Work
            <span className="block mt-1 bg-gradient-to-r from-[#66b2ff] via-[#99ccff] to-[#cce5ff] bg-clip-text text-transparent">
             So You Don’t Have To.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#99ccff] mb-4 max-w-2xl mx-auto leading-relaxed">
            Spend less time chasing tenants, fixing issues, and managing chaos.
  Let AI handle the busywork while you focus on growing your portfolio.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl font-black text-white leading-none tracking-tight">
                  {s.value}
                </span>
                <span className="text-[11px] text-[#6699cc] font-mono tracking-wider uppercase mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Email form ── */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto flex gap-2 flex-wrap justify-center mb-6"
            >
              <input
                type="email"
                placeholder="Enter your email to get started"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-[220px] px-6 py-3.5 rounded-full bg-black/40 border border-white/20 text-white placeholder:text-[#6699cc] outline-none focus:border-[#3399ff] focus:ring-2 focus:ring-[#3399ff]/20 transition-all text-sm font-medium backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-full font-bold text-sm bg-white text-[#0066cc] hover:bg-[#e6f2ff] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.25)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                   Setting things up…
                  </>
                ) : (
                  <>
                    Start Free Trial
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success state */
            <div className="max-w-lg mx-auto mb-6 flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 backdrop-blur-sm">
              <span className="w-6 h-6 rounded-full bg-[#0a9e72] flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-white font-semibold text-sm">
               You’re all set! Check your email — we’ll help you get started shortly.
              </span>
            </div>
          )}

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_ITEMS.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 text-[12px] text-[#7ab0d8] font-medium"
              >
                <span className="text-[#3399ff] text-[10px]">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>

          {/* Agent network live indicator */}
          <div className="mt-10 inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#22d3a8] animate-ping opacity-60" />
              <span className="relative rounded-full bg-[#22d3a8] w-2 h-2" />
            </span>
          <span className="text-[11px] font-mono text-[#5580a8] tracking-wider">
  <span className="text-white font-bold">2,500+</span> properties joined us this month
</span>
          </div>

        </div>
      </div>

      {/* ── Bottom agent showcase strip ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--color-primary-920,#002b57)" }}
      >
        {/* Thin top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3399ff]/40 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* Label */}
            <p className="text-[11px] font-mono text-[#2d5a8a] tracking-widest uppercase">
              All agents included in your free trial
            </p>

            {/* Agent pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "Lease Analyzer",
                "Tenant Screener",
                "Market Valuation",
                "Maintenance Predictor",
                "Payment Tracker",
                "Comms Agent",
              ].map((agent) => (
                <span
                  key={agent}
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wide px-3 py-1.5 rounded-full border"
                  style={{
                    background: "rgba(0,102,204,0.18)",
                    borderColor: "rgba(0,102,204,0.35)",
                    color: "#66b2ff",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3399ff] opacity-80" />
                  {agent}
                </span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wide px-3 py-1.5 rounded-full border"
                style={{
                  background: "rgba(51,153,255,0.12)",
                  borderColor: "rgba(51,153,255,0.28)",
                  color: "#99ccff",
                }}
              >
                +4 more
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}