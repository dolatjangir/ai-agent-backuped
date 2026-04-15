"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Tiny animation helper – adds class when element
   enters the viewport (no external dependency)
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const funnelSteps = [
  {
    step: "01",
    label: "Capture Leads",
    desc: "Smart forms & landing pages collect every prospect the moment they arrive.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 8v4l3 3" strokeLinecap="round" />
      </svg>
    ),
    bg: "#e6f2ff",
    border: "#99ccff",
    accent: "#0066cc",
    width: "w-full",
  },
  {
    step: "02",
    label: "Qualify Leads",
    desc: "AI filters serious prospects from noise — scoring intent in real time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    bg: "#dbeafe",
    border: "#66b2ff",
    accent: "#0057ad",
    width: "w-5/6",
  },
  {
    step: "03",
    label: "Match Solutions",
    desc: "AI recommends the best-fit property or service for every unique lead.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M4 6h16M4 10h10M4 14h7" strokeLinecap="round" />
        <circle cx="18" cy="16" r="3" />
        <path d="M20.5 18.5L22 20" strokeLinecap="round" />
      </svg>
    ),
    bg: "#cce5ff",
    border: "#3399ff",
    accent: "#00478f",
    width: "w-4/6",
  },
  {
    step: "04",
    label: "Convert",
    desc: "Automated follow-ups & personalised nudges turn warm leads into customers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    bg: "#b3d5ff",
    border: "#1a7ae6",
    accent: "#003871",
    width: "w-3/6",
  },
];

const features = [
  {
    title: "Smart Lead Scoring",
    desc: "Every lead is scored automatically based on behaviour, source, and intent signals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Auto Segmentation",
    desc: "Leads are sorted into the right buckets without lifting a finger.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="9" cy="7" r="4" />
        <circle cx="17" cy="17" r="4" />
        <path d="M9 11v2m0 4v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Personalised Recommendations",
    desc: "Your AI agent surfaces the right solution for every prospect's profile.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Conversion Tracking",
    desc: "Real-time dashboards show exactly where revenue comes from at every stage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" strokeLinecap="round" />
      </svg>
    ),
  },
];

const agents = [
  {
    name: "AI Lead Capture Agent",
    role: "Collects & organises every inbound lead from any channel — forms, chat, ads.",
    tag: "Capture",
    emoji: "📥",
    color: "#0066cc",
    bg: "#e6f2ff",
  },
  {
    name: "AI Lead Qualification Agent",
    role: "Scores, filters, and ranks leads by purchase intent and fit — instantly.",
    tag: "Qualify",
    emoji: "🔍",
    color: "#0057ad",
    bg: "#cce5ff",
  },
  {
    name: "AI Property Matching Agent",
    role: "Matches each qualified lead to the most relevant property or solution.",
    tag: "Match",
    emoji: "🏠",
    color: "#003871",
    bg: "#b3d5ff",
  },
];

/* ─────────────────────────────────────────────
   FadeIn wrapper
───────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AILeadFunnelPage() {
  return (
    <main
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* ── Fonts + CSS vars + animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Sora:wght@600;700;800&display=swap');

        :root {
          --color-primary-50: #e6f2ff;
          --color-primary-100: #cce5ff;
          --color-primary-200: #99ccff;
          --color-primary-300: #66b2ff;
          --color-primary-400: #3399ff;
          --color-primary-500: #1a7ae6;
          --color-primary-600: #0066cc;
          --color-primary-700: #0057ad;
          --color-primary-800: #00478f;
          --color-primary-900: #003871;
          --color-primary-920: #002b57;
          --color-secondary-50: #eef6ff;
          --color-secondary-100: #d9eaff;
          --color-secondary-200: #b3d5ff;
          --color-secondary-300: #8dc0ff;
          --color-secondary-400: #66abff;
          --color-secondary-500: #4096ff;
          --color-secondary-600: #2676d9;
          --color-secondary-700: #1d5aa6;
          --color-secondary-800: #143f73;
          --color-secondary-900: #0b2540;
        }

        .funnel-step {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .funnel-step:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,102,204,0.13);
        }
        .agent-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .agent-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,102,204,0.14);
        }
        .feature-card {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .feature-card:hover {
          background: #e6f2ff !important;
          border-color: #3399ff !important;
          transform: translateY(-2px);
        }
        .cta-btn-primary {
          transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
        }
        .cta-btn-primary:hover {
          background: #0057ad !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,102,204,0.35);
        }
        .cta-btn-outline {
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .cta-btn-outline:hover {
          background: #e6f2ff !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .float      { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: float 6s ease-in-out infinite; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(0,102,204,0.35); }
          70%  { box-shadow: 0 0 0 14px rgba(0,102,204,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,102,204,0); }
        }
        .pulse-ring { animation: pulse-ring 2.4s ease-out infinite; }
      `}</style>

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#f0f8ff 0%,#e6f2ff 45%,#d9eaff 10%)",
          paddingTop: "96px",
          paddingBottom: "112px",
        }}
      >
        {/* background blobs */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle,#0066cc,transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full opacity-10 float pointer-events-none"
          style={{ background: "radial-gradient(circle,#1a7ae6,transparent 70%)" }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#0066cc 1px,transparent 1px),linear-gradient(90deg,#0066cc 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
            style={{ background: "#fff", borderColor: "#99ccff", color: "#0066cc" }}
          >
            <span className="w-2 h-2 rounded-full pulse-ring" style={{ background: "#0066cc" }} />
            AI-Powered Lead Automation
          </div>

          <h1
            className="font-extrabold leading-tight tracking-tight mb-6"
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "clamp(2.4rem,5.5vw,4rem)",
              color: "#002b57",
            }}
          >
            Build a Fully Automated
            <br />
            <span style={{ color: "#0066cc" }}>AI Lead Funnel</span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed mb-10"
            style={{ color: "#1d5aa6" }}
          >
            From first click to conversion — your entire funnel runs on autopilot.
            Capture, qualify, and convert leads with three specialised AI agents
            working 24 / 7.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="cta-btn-primary px-8 py-4 rounded-xl text-white font-semibold text-base"
              style={{ background: "#0066cc" }}
            >
              Start Automating Free
            </button>
            <button
              className="cta-btn-outline px-8 py-4 rounded-xl font-semibold text-base border-2"
              style={{ borderColor: "#99ccff", color: "#0066cc", background: "white" }}
            >
              See How It Works →
            </button>
          </div>

          {/* stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {[
              ["3×", "faster lead response time"],
              ["87%", "qualification accuracy"],
              ["40%", "higher conversion rate"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#0066cc" }}
                >
                  {num}
                </div>
                <div className="text-sm mt-1" style={{ color: "#1d5aa6" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          FUNNEL VISUALISATION
      ═══════════════════════════════ */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}
          >
            The Funnel
          </span>
          <h2
            className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}
          >
            Step-by-Step Lead Flow
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            Four automated stages that take a stranger and turn them into a signed
            customer — without manual effort.
          </p>
        </FadeIn>

        <div className="flex flex-col items-center gap-0">
          {funnelSteps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 100} className={`${s.width} relative`}>
              {/* arrow connector */}
              {i > 0 && (
                <div className="flex justify-center">
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                    <path
                      d="M14 0 L14 14 M6 10 L14 20 L22 10"
                      stroke="#0066cc"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <div
                className="funnel-step rounded-2xl border-2 p-6 flex items-center gap-5 cursor-default"
                style={{ background: s.bg, borderColor: s.border }}
              >
                {/* step number */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg"
                  style={{ background: s.accent, color: "#fff", fontFamily: "'Sora',sans-serif" }}
                >
                  {s.step}
                </div>

                {/* icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "white", color: s.accent }}
                >
                  {s.icon}
                </div>

                {/* text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-lg leading-tight"
                    style={{ color: s.accent, fontFamily: "'Sora',sans-serif" }}
                  >
                    {s.label}
                  </p>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "#1d5aa6" }}>
                    {s.desc}
                  </p>
                </div>

                {/* right badge */}
                <div
                  className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shrink-0"
                  style={{ background: "white", color: s.accent, border: `1px solid ${s.border}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                  {i === 3 ? "Automated" : "AI-Powered"}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* bottom conversion cap */}
          <FadeIn delay={450} className="w-2/6">
            <div
              className="rounded-b-2xl py-5 text-center font-bold text-white text-lg"
              style={{
                background: "linear-gradient(135deg,#0066cc,#003871)",
                fontFamily: "'Sora',sans-serif",
              }}
            >
              🎯 Conversion Complete
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════
          AI AGENTS
      ═══════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(180deg,#f0f8ff 0%,#e6f2ff 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}
            >
              AI Agents
            </span>
            <h2
              className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}
            >
              Meet Your Automation Team
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
              Three specialised AI agents that collaborate seamlessly inside your funnel.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {agents.map((a, i) => (
              <FadeIn key={a.name} delay={i * 120}>
                <div
                  className="agent-card rounded-2xl border p-7 h-full flex flex-col"
                  style={{ background: "#fff", borderColor: "#cce5ff" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                    style={{ background: a.bg }}
                  >
                    {a.emoji}
                  </div>

                  <span
                    className="text-xs font-semibold px-3 py-0.5 rounded-full mb-4 self-start"
                    style={{ background: a.bg, color: a.color }}
                  >
                    {a.tag}
                  </span>

                  <h3
                    className="font-bold text-lg mb-3 leading-snug"
                    style={{ color: "#002b57", fontFamily: "'Sora',sans-serif" }}
                  >
                    {a.name}
                  </h3>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#1d5aa6" }}>
                    {a.role}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-medium" style={{ color: a.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                    Active 24 / 7
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CRM flow strip */}
          <FadeIn delay={200} className="mt-14">
            <div
              className="rounded-2xl border-2 p-6 overflow-x-auto"
              style={{ background: "#fff", borderColor: "#99ccff" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "#0066cc" }}
              >
                CRM Integration Flow
              </p>
              <div className="flex items-center gap-3 min-w-max">
                {[
                  "Lead Arrives",
                  "Capture Agent",
                  "CRM Entry",
                  "Qualify Agent",
                  "Score & Tag",
                  "Match Agent",
                  "Recommendation",
                  "Conversion ✓",
                ].map((node, i, arr) => (
                  <React.Fragment key={node}>
                    <div
                      className="px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap"
                      style={{
                        background: i % 2 === 0 ? "#e6f2ff" : "#0066cc",
                        color: i % 2 === 0 ? "#002b57" : "#fff",
                      }}
                    >
                      {node}
                    </div>
                    {i < arr.length - 1 && (
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                        <path
                          d="M0 6h16M12 1l6 5-6 5"
                          stroke="#66b2ff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════
          FEATURES
      ═══════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}
          >
            Features
          </span>
          <h2
            className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}
          >
            Everything Your Funnel Needs
          </h2>
          <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
            From first touch to closed deal — every tool is baked in and automated.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 90}>
              <div
                className="feature-card rounded-2xl border-2 p-6 h-full cursor-default"
                style={{ borderColor: "#cce5ff", background: "#fafeff" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#e6f2ff", color: "#0066cc" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "#002b57", fontFamily: "'Sora',sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          CONVERSION METRICS STRIP
      ═══════════════════════════════ */}
      <section className="py-16 px-6" style={{ background: "#f0f8ff" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div
              className="rounded-3xl border-2 p-10 relative overflow-hidden"
              style={{ background: "white", borderColor: "#99ccff" }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle,#0066cc,transparent 70%)",
                  transform: "translate(30%,-30%)",
                }}
              />

              <div className="relative grid sm:grid-cols-2 gap-10 items-center">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "#0066cc" }}
                  >
                    Conversion Tracking
                  </p>
                  <h3
                    className="text-2xl font-extrabold mb-4"
                    style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}
                  >
                    Real-time visibility
                    <br />at every stage
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>
                    Know exactly where leads drop off, which agent closes best, and
                    how to optimise your funnel for maximum ROI — updated live.
                  </p>
                </div>

                {/* bar chart */}
                <div className="flex items-end gap-3 h-36">
                  {[
                    { label: "Captured", pct: 100, opacity: 0.25 },
                    { label: "Qualified", pct: 72, opacity: 0.45 },
                    { label: "Matched", pct: 54, opacity: 0.65 },
                    { label: "Converted", pct: 38, opacity: 0.85 },
                  ].map((b) => (
                    <div key={b.label} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: "#0066cc" }}>
                        {b.pct}%
                      </span>
                      <div
                        className="w-full rounded-lg"
                        style={{
                          height: `${b.pct}%`,
                          background: `rgba(0,102,204,${b.opacity})`,
                        }}
                      />
                      <span
                        className="text-[10px] text-center leading-tight"
                        style={{ color: "#1d5aa6" }}
                      >
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════
          CTA SECTION
      ═══════════════════════════════ */}
      <section className="py-28 px-6">
        <FadeIn>
          <div
            className="max-w-3xl mx-auto rounded-3xl p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#002b57 0%,#0066cc 100%)" }}
          >
            <div
              className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white" }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white" }}
            />

            <div className="relative">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.15)", color: "#cce5ff" }}
              >
                Get Started Today
              </span>

              <h2
                className="text-3xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Sora',sans-serif" }}
              >
                Your funnel is leaking.
                <br />
                Let AI plug every hole.
              </h2>

              <p className="text-base mb-10" style={{ color: "#b3d5ff" }}>
                Deploy all three AI agents in minutes. No code. No complexity.
                Just more conversions — automatically.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  className="cta-btn-primary px-9 py-4 rounded-xl font-semibold text-base"
                  style={{ background: "white", color: "#0066cc" }}
                >
                  Activate Your AI Funnel
                </button>
                <button
                  className="px-9 py-4 rounded-xl font-semibold text-base border-2 transition-colors"
                  style={{
                    borderColor: "rgba(255,255,255,0.35)",
                    color: "white",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  Book a Live Demo
                </button>
              </div>

              <p className="mt-7 text-sm" style={{ color: "#66b2ff" }}>
                No credit card required · Setup in &lt; 5 minutes · Cancel anytime
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}