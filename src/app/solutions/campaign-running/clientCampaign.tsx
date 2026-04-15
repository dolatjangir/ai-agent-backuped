"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Intersection-observer fade-in hook
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const howItWorks = [
  {
    num: "01",
    title: "AI Builds the Strategy",
    desc: "Defines goals, audience segments, messaging, and channel mix — before a single word is written.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Content is Generated",
    desc: "Ad copy, visuals, captions, and email sequences — crafted by AI and ready to publish instantly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Launches Across Platforms",
    desc: "One click deploys your campaign simultaneously to Google, Meta, Instagram, LinkedIn, and email.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Auto-Optimises Performance",
    desc: "Real-time AI monitors results and continuously reallocates budget to the highest-converting creatives.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M3 3v18h18" strokeLinecap="round"/>
        <path d="M18 9l-5 5-4-4-3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const features = [
  {
    title: "AI Ad Copy Generation",
    desc: "High-converting headlines, descriptions, and CTAs written in seconds — A/B variants included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#0066cc", bg: "#e6f2ff",
  },
  {
    title: "Multi-Platform Posting",
    desc: "Publish once — AI formats and distributes content perfectly across every channel simultaneously.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeLinecap="round"/>
      </svg>
    ),
    color: "#0057ad", bg: "#cce5ff",
  },
  {
    title: "Performance Tracking",
    desc: "Live dashboards show CTR, ROAS, CPA, impressions, and conversions — all in one place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#00478f", bg: "#b3d5ff",
  },
  {
    title: "Auto Optimisation",
    desc: "Budget shifts automatically toward winning creatives — your ROAS improves while you sleep.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round"/>
      </svg>
    ),
    color: "#003871", bg: "#8dc0ff",
  },
];

const agents = [
  {
    name: "AI Campaign Automation Agent",
    role: "Owns the full campaign lifecycle — strategy, scheduling, budget allocation, and performance loops.",
    tag: "Automation",
    emoji: "⚡",
    color: "#0066cc",
    bg: "#e6f2ff",
    border: "#99ccff",
  },
  {
    name: "AI Content Creation Agent",
    role: "Generates ad copy, email sequences, landing page text, and social captions tailored to each audience.",
    tag: "Content",
    emoji: "✍️",
    color: "#0057ad",
    bg: "#cce5ff",
    border: "#66b2ff",
  },
  {
    name: "AI Social Media Agent",
    role: "Schedules and publishes across all platforms, monitors engagement, and adjusts posting times in real time.",
    tag: "Social",
    emoji: "📢",
    color: "#003871",
    bg: "#b3d5ff",
    border: "#3399ff",
  },
];

const analyticsData = [
  { label: "Mon", value: 42, clicks: 310 },
  { label: "Tue", value: 58, clicks: 420 },
  { label: "Wed", value: 51, clicks: 380 },
  { label: "Thu", value: 74, clicks: 560 },
  { label: "Fri", value: 88, clicks: 670 },
  { label: "Sat", value: 65, clicks: 490 },
  { label: "Sun", value: 95, clicks: 720 },
];

const platforms = [
  { name: "Google Ads", icon: "🔍", reach: "2.4M", ctr: "4.8%", roas: "6.2×", up: true },
  { name: "Meta Ads", icon: "📘", reach: "1.8M", ctr: "3.6%", roas: "4.9×", up: true },
  { name: "Instagram", icon: "📸", reach: "980K", ctr: "5.2%", roas: "5.7×", up: true },
  { name: "LinkedIn", icon: "💼", reach: "420K", ctr: "2.9%", roas: "3.8×", up: false },
];

const campaignStats = [
  { value: "12×", label: "Faster campaign launch" },
  { value: "340%", label: "Average ROAS improvement" },
  { value: "68%", label: "Reduction in ad spend waste" },
  { value: "24/7", label: "Continuous optimisation" },
];

const workflowSteps = [
  { title: "Brief Input", desc: "Enter goal, budget & audience", icon: "📋", done: true },
  { title: "Strategy Draft", desc: "AI builds full campaign plan", icon: "🧠", done: true },
  { title: "Content Created", desc: "Copy, visuals & variants ready", icon: "✍️", done: true },
  { title: "Review & Approve", desc: "One-click approval flow", icon: "✅", done: false },
  { title: "Multi-Platform Launch", desc: "Deployed across all channels", icon: "🚀", done: false },
  { title: "Live Optimisation", desc: "AI monitors & auto-adjusts", icon: "📈", done: false },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AICampaignPage() {
  return (
    <main
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Sora:wght@600;700;800&display=swap');

        :root {
          --color-primary-50:#e6f2ff; --color-primary-100:#cce5ff; --color-primary-200:#99ccff;
          --color-primary-300:#66b2ff; --color-primary-400:#3399ff; --color-primary-500:#1a7ae6;
          --color-primary-600:#0066cc; --color-primary-700:#0057ad; --color-primary-800:#00478f;
          --color-primary-900:#003871; --color-primary-920:#002b57;
          --color-secondary-50:#eef6ff; --color-secondary-100:#d9eaff; --color-secondary-200:#b3d5ff;
          --color-secondary-300:#8dc0ff; --color-secondary-400:#66abff; --color-secondary-500:#4096ff;
          --color-secondary-600:#2676d9; --color-secondary-700:#1d5aa6; --color-secondary-800:#143f73;
          --color-secondary-900:#0b2540;
        }

        .card-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,102,204,.15); }

        .feature-card { transition: background .2s, border-color .2s, transform .2s; }
        .feature-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,102,204,.1); border-color: #3399ff !important; }

        .platform-row { transition: background .2s, transform .15s; }
        .platform-row:hover { background: #e6f2ff !important; transform: translateX(4px); }

        .btn-primary { transition: background .2s, transform .18s, box-shadow .2s; }
        .btn-primary:hover { background:#0057ad!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,102,204,.35); }
        .btn-outline { transition: background .2s; }
        .btn-outline:hover { background:#e6f2ff!important; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float      { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: float 6.5s ease-in-out infinite; }

        @keyframes ping-dot {
          0%   { box-shadow: 0 0 0 0 rgba(0,102,204,.4); }
          70%  { box-shadow: 0 0 0 12px rgba(0,102,204,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,102,204,0); }
        }
        .ping-dot { animation: ping-dot 2.2s ease-out infinite; }

        @keyframes bar-rise {
          from { transform: scaleY(0); transform-origin: bottom; }
          to   { transform: scaleY(1); transform-origin: bottom; }
        }
        .bar-rise { animation: bar-rise .9s cubic-bezier(.22,1,.36,1) both; }

        @keyframes dash-in {
          from { stroke-dashoffset: 500; }
          to   { stroke-dashoffset: 0; }
        }
        .sparkline { stroke-dasharray: 500; animation: dash-in 1.6s ease .4s both; }

        @keyframes count-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .count-up { animation: count-up .6s ease both; }

        .workflow-connector { background: linear-gradient(90deg,#0066cc,#cce5ff); }

        @keyframes slide-up {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .post-card-1 { animation: slide-up .5s ease .1s both; }
        .post-card-2 { animation: slide-up .5s ease .35s both; }
        .post-card-3 { animation: slide-up .5s ease .6s both; }
        .post-card-4 { animation: slide-up .5s ease .85s both; }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#f0f8ff 0%,#e6f2ff 45%,#d9eaff 100%)",
          paddingTop: "88px",
          paddingBottom: "108px",
        }}
      >
        {/* decorative blobs */}
        <div className="absolute -top-24 -right-20 w-[480px] h-[480px] rounded-full opacity-20 float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle,#0066cc,transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 float pointer-events-none"
          style={{ background: "radial-gradient(circle,#1a7ae6,transparent 70%)" }} />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#0066cc 1px,transparent 1px),linear-gradient(90deg,#0066cc 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── left copy ── */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-7"
                style={{ background: "#fff", borderColor: "#99ccff", color: "#0066cc" }}>
                <span className="w-2 h-2 rounded-full ping-dot" style={{ background: "#0066cc" }} />
                AI Campaign Automation
              </div>

              <h1
                className="font-extrabold leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(2.2rem,5vw,3.7rem)", color: "#002b57" }}
              >
                Run High-Converting
                <br />
                <span style={{ color: "#0066cc" }}>Campaigns on Autopilot</span>
              </h1>

              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#1d5aa6" }}>
                From strategy and content creation to multi-platform execution and real-time
                optimisation — your entire campaign runs itself, without lifting a finger.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-base"
                  style={{ background: "#0066cc" }}>
                  Launch Your First AI Campaign
                </button>
                <button className="btn-outline px-8 py-4 rounded-xl font-semibold text-base border-2"
                  style={{ borderColor: "#99ccff", color: "#0066cc", background: "white" }}>
                  See Live Demo →
                </button>
              </div>

              {/* platform pills */}
              <div className="mt-9 flex flex-wrap gap-2">
                {["Google Ads", "Meta", "Instagram", "LinkedIn", "Email", "WhatsApp"].map((p) => (
                  <span key={p} className="text-xs font-medium px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "#cce5ff", color: "#0057ad", background: "#fff" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* ── right — mini campaign dashboard ── */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center,#cce5ff 0%,transparent 68%)", opacity: .5 }} />

              <div className="relative rounded-3xl border-2 overflow-hidden shadow-2xl"
                style={{ background: "#fff", borderColor: "#99ccff" }}>

                {/* dashboard top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ borderColor: "#e6f2ff", background: "#f8fcff" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff6b6b" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ffd93d" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#6bcb77" }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "#0066cc" }}>Campaign Dashboard</span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#e6f2ff", color: "#0066cc" }}>● Live</span>
                </div>

                <div className="p-5 space-y-4">
                  {/* kpi row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Impressions", val: "1.2M", delta: "+18%", up: true },
                      { label: "Conversions", val: "3,840", delta: "+34%", up: true },
                      { label: "ROAS", val: "6.2×", delta: "+22%", up: true },
                    ].map((k) => (
                      <div key={k.label} className="rounded-xl p-3"
                        style={{ background: "#f0f8ff" }}>
                        <p className="text-[10px] font-semibold mb-1" style={{ color: "#1d5aa6" }}>{k.label}</p>
                        <p className="text-lg font-extrabold leading-none"
                          style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{k.val}</p>
                        <span className="text-[10px] font-semibold" style={{ color: "#0066cc" }}>{k.delta} ↑</span>
                      </div>
                    ))}
                  </div>

                  {/* sparkline chart */}
                  <div className="rounded-xl p-4 border" style={{ background: "#f8fcff", borderColor: "#e6f2ff" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold" style={{ color: "#002b57" }}>Conversion Trend — 7 days</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "#e6f2ff", color: "#0066cc" }}>This Week</span>
                    </div>
                    <svg viewBox="0 0 280 80" className="w-full" style={{ overflow: "visible" }}>
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0066cc" stopOpacity=".18"/>
                          <stop offset="100%" stopColor="#0066cc" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M0,60 L40,48 L80,54 L120,32 L160,18 L200,30 L240,8 L280,2"
                        fill="none" stroke="#0066cc" strokeWidth="2.5" strokeLinecap="round"
                        className="sparkline" />
                      <path d="M0,60 L40,48 L80,54 L120,32 L160,18 L200,30 L240,8 L280,2 L280,80 L0,80 Z"
                        fill="url(#grad)" opacity=".6" />
                      {[0,40,80,120,160,200,240,280].map((x, i) => {
                        const ys = [60,48,54,32,18,30,8,2];
                        return <circle key={x} cx={x} cy={ys[i]} r="3.5" fill="white" stroke="#0066cc" strokeWidth="2" />;
                      })}
                    </svg>
                  </div>

                  {/* social posts mini grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { platform: "Instagram", status: "Published", icon: "📸", color: "#0066cc", bg: "#e6f2ff" },
                      { platform: "LinkedIn", status: "Scheduled", icon: "💼", color: "#0057ad", bg: "#cce5ff" },
                      { platform: "Google Ads", status: "Optimising", icon: "🔍", color: "#00478f", bg: "#b3d5ff" },
                      { platform: "Meta Ads", status: "Running", icon: "📘", color: "#003871", bg: "#8dc0ff" },
                    ].map((post) => (
                      <div key={post.platform}
                        className="rounded-xl px-3 py-2.5 flex items-center gap-2"
                        style={{ background: post.bg }}>
                        <span className="text-base">{post.icon}</span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold truncate" style={{ color: post.color }}>{post.platform}</p>
                          <p className="text-[10px] font-medium" style={{ color: "#1d5aa6" }}>{post.status}</p>
                        </div>
                        <div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ background: post.color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <section style={{ background: "#002b57" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {campaignStats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 80} className="text-center">
              <div className="text-3xl font-extrabold mb-1"
                style={{ fontFamily: "'Sora',sans-serif", color: "#66b2ff" }}>
                {s.value}
              </div>
              <div className="text-sm leading-snug" style={{ color: "#8dc0ff" }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            From Brief to Results — Fully Automated
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            Four intelligent stages that handle everything from campaign planning to live performance tuning.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-0 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: "linear-gradient(90deg,#99ccff,#0066cc 50%,#003871)" }} />

          {howItWorks.map((s, i) => (
            <FadeIn key={s.num} delay={i * 110} className="flex flex-col items-center text-center px-4">
              <div className="relative z-10 w-[52px] h-[52px] rounded-full border-4 flex items-center justify-center mb-5"
                style={{
                  background: i < 2 ? "#0066cc" : "#fff",
                  borderColor: "#0066cc",
                  color: i < 2 ? "#fff" : "#0066cc",
                }}>
                {s.icon}
              </div>
              <div className="text-xs font-bold mb-1" style={{ color: "#99ccff" }}>{s.num}</div>
              <h3 className="font-bold text-base mb-2 leading-snug"
                style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>{s.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          AUTOMATION WORKFLOW
      ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f0f8ff,#e6f2ff)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              Automation Workflow
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              One Brief. Full Campaign.
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
              A single input triggers an end-to-end campaign pipeline — strategy, content, launch, and live tuning.
            </p>
          </FadeIn>

          {/* workflow grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {workflowSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 80}>
                <div className="card-lift rounded-2xl border-2 p-6 flex flex-col gap-3"
                  style={{
                    background: step.done ? "#fff" : "#fafeff",
                    borderColor: step.done ? "#66b2ff" : "#cce5ff",
                  }}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: step.done ? "#e6f2ff" : "#f0f8ff" }}>
                      {step.icon}
                    </div>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: step.done ? "#e6f2ff" : "#f0f8ff",
                        color: step.done ? "#0066cc" : "#99ccff",
                        border: `1px solid ${step.done ? "#99ccff" : "#cce5ff"}`,
                      }}>
                      {step.done ? "✓ Complete" : "Pending"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1"
                      style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#1d5aa6" }}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AI AGENTS
      ══════════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            AI Agents
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            The Team Behind Your Campaigns
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            Three specialised agents that collaborate — from strategy to content to distribution.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {agents.map((a, i) => (
            <FadeIn key={a.name} delay={i * 110}>
              <div className="card-lift rounded-2xl border-2 p-7 flex flex-col h-full"
                style={{ background: "#fff", borderColor: a.border }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: a.bg }}>{a.emoji}</div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: a.bg, color: a.color }}>{a.tag}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 leading-snug"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{a.name}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#1d5aa6" }}>{a.role}</p>
                <div className="mt-6 pt-5 border-t flex items-center gap-2 text-xs font-medium"
                  style={{ borderColor: "#e6f2ff", color: a.color }}>
                  <span className="w-2 h-2 rounded-full ping-dot" style={{ background: a.color }} />
                  Always running
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#f0f8ff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              Features
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              Everything a Campaign Needs — Built In
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 90}>
                <div className="feature-card rounded-2xl border-2 p-6 h-full cursor-default"
                  style={{ borderColor: "#cce5ff", background: "#fff" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: f.bg, color: f.color }}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-base mb-2"
                    style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PERFORMANCE ANALYTICS
      ══════════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Performance Analytics
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            Every Metric. One Dashboard.
          </h2>
          <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
            Live data across every platform — so you always know what's working, what isn't, and why.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">

          {/* bar chart */}
          <FadeIn>
            <div className="rounded-3xl border-2 p-8" style={{ background: "#fff", borderColor: "#cce5ff" }}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-base"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                  Daily Conversions
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#e6f2ff", color: "#0066cc" }}>This Week</span>
              </div>

              <div className="flex items-end justify-between gap-2 h-40">
                {analyticsData.map((d, i) => (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold" style={{ color: "#0066cc" }}>{d.value}</span>
                    <div className="w-full relative" style={{ height: "120px" }}>
                      <div
                        className="bar-rise absolute bottom-0 w-full rounded-t-lg"
                        style={{
                          height: `${(d.value / 95) * 100}%`,
                          background: `linear-gradient(180deg, ${i >= 4 ? "#0066cc" : "#66b2ff"}, ${i >= 4 ? "#003871" : "#99ccff"})`,
                          animationDelay: `${i * 80}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[10px]" style={{ color: "#1d5aa6" }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* platform breakdown */}
          <FadeIn delay={120}>
            <div className="rounded-3xl border-2 p-8" style={{ background: "#fff", borderColor: "#cce5ff" }}>
              <h3 className="font-bold text-base mb-6"
                style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                Platform Performance
              </h3>

              <div className="space-y-3">
                {/* header */}
                <div className="grid grid-cols-4 text-[10px] font-semibold uppercase tracking-wide px-3"
                  style={{ color: "#99ccff" }}>
                  <span>Platform</span><span className="text-center">Reach</span>
                  <span className="text-center">CTR</span><span className="text-center">ROAS</span>
                </div>

                {platforms.map((p) => (
                  <div key={p.name}
                    className="platform-row grid grid-cols-4 items-center px-3 py-3 rounded-xl cursor-default"
                    style={{ background: "#f8fcff" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{p.icon}</span>
                      <span className="text-xs font-semibold truncate" style={{ color: "#002b57" }}>{p.name}</span>
                    </div>
                    <span className="text-xs font-medium text-center" style={{ color: "#1d5aa6" }}>{p.reach}</span>
                    <span className="text-xs font-bold text-center" style={{ color: "#0066cc" }}>{p.ctr}</span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs font-extrabold" style={{ color: p.up ? "#0066cc" : "#99ccff" }}>
                        {p.roas}
                      </span>
                      <span className="text-[10px]" style={{ color: p.up ? "#0066cc" : "#99ccff" }}>
                        {p.up ? "↑" : "→"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* total strip */}
              <div className="mt-5 flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: "#e6f2ff" }}>
                <span className="text-xs font-bold" style={{ color: "#002b57" }}>Combined Reach</span>
                <span className="text-sm font-extrabold" style={{ fontFamily: "'Sora',sans-serif", color: "#0066cc" }}>
                  5.6M
                </span>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* live activity feed */}
        <FadeIn delay={150} className="mt-8">
          <div className="rounded-3xl border-2 p-8" style={{ background: "#fff", borderColor: "#cce5ff" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base"
                style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                Live Optimisation Log
              </h3>
              <span className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: "#0066cc" }}>
                <span className="w-2 h-2 rounded-full ping-dot" style={{ background: "#0066cc" }} />
                Auto-updating
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "⚡", msg: "Budget reallocated to Instagram — +28% CTR", time: "2 min ago", color: "#0066cc", bg: "#e6f2ff" },
                { icon: "🎯", msg: "New A/B variant outperforming control by 41%", time: "5 min ago", color: "#0057ad", bg: "#cce5ff" },
                { icon: "📊", msg: "Google Ads bid adjusted — CPL dropped ₹84", time: "11 min ago", color: "#00478f", bg: "#b3d5ff" },
                { icon: "🔔", msg: "Campaign milestone: 1,000 conversions hit", time: "18 min ago", color: "#003871", bg: "#8dc0ff" },
              ].map((ev) => (
                <div key={ev.msg} className="rounded-2xl p-4 flex flex-col gap-2"
                  style={{ background: ev.bg }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{ev.icon}</span>
                    <span className="text-[10px]" style={{ color: ev.color }}>{ev.time}</span>
                  </div>
                  <p className="text-xs leading-snug font-medium" style={{ color: "#002b57" }}>{ev.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-28 px-6">
        <FadeIn>
          <div
            className="max-w-3xl mx-auto rounded-3xl p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#002b57 0%,#0066cc 100%)" }}
          >
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white" }} />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white" }} />

            <div className="relative">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.15)", color: "#cce5ff" }}>
                Start Today
              </span>

              <h2 className="text-3xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Sora',sans-serif" }}>
                Your competitors are already
                <br />running AI campaigns.
              </h2>

              <p className="text-base mb-10" style={{ color: "#b3d5ff" }}>
                Launch your first fully automated campaign in under 10 minutes —
                no agency, no manual effort, just results on autopilot.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary px-9 py-4 rounded-xl font-semibold text-base"
                  style={{ background: "white", color: "#0066cc" }}>
                  Launch AI Campaign Now
                </button>
                <button className="px-9 py-4 rounded-xl font-semibold text-base border-2 transition-colors"
                  style={{
                    borderColor: "rgba(255,255,255,0.35)",
                    color: "white",
                    background: "rgba(255,255,255,0.08)",
                  }}>
                  Book a Strategy Call
                </button>
              </div>

              <p className="mt-7 text-sm" style={{ color: "#66b2ff" }}>
                No credit card required · Live in &lt; 10 minutes · Cancel anytime
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}