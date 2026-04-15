"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Intersection-observer fade-in hook
───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
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
      transform: visible ? "translateY(0)" : "translateY(26px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const workflowSteps = [
  {
    step: "01",
    title: "Keyword Research",
    desc: "AI finds high-volume, low-competition keywords your audience is actively searching for — in seconds.",
    icon: "🔍",
    color: "#0066cc", bg: "#e6f2ff", border: "#99ccff",
  },
  {
    step: "02",
    title: "Content Generation",
    desc: "Full blog posts, landing pages, and product descriptions written with natural language — SEO-optimised from draft one.",
    icon: "✍️",
    color: "#0057ad", bg: "#cce5ff", border: "#66b2ff",
  },
  {
    step: "03",
    title: "On-Page SEO",
    desc: "Meta titles, descriptions, heading structure, internal links, and schema markup applied automatically before publish.",
    icon: "⚙️",
    color: "#00478f", bg: "#b3d5ff", border: "#3399ff",
  },
  {
    step: "04",
    title: "Auto Publishing",
    desc: "Content is scheduled and published to your CMS, then instantly distributed across social channels.",
    icon: "🚀",
    color: "#003871", bg: "#8dc0ff", border: "#1a7ae6",
  },
];

const features = [
  {
    title: "AI Blog Generation",
    desc: "Long-form, well-structured articles written in your brand's voice — complete with H1s, FAQs, and CTAs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#0066cc", bg: "#e6f2ff",
  },
  {
    title: "SEO Keyword Optimisation",
    desc: "Every piece of content is built around keywords that drive traffic — with semantic coverage for topical authority.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
      </svg>
    ),
    color: "#0057ad", bg: "#cce5ff",
  },
  {
    title: "Auto Publishing",
    desc: "Push content directly to WordPress, Webflow, or any CMS — formatted, tagged, and ready to rank.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#00478f", bg: "#b3d5ff",
  },
  {
    title: "Social Distribution",
    desc: "Each blog post is repurposed into LinkedIn articles, Instagram captions, and tweet threads — automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeLinecap="round"/>
      </svg>
    ),
    color: "#003871", bg: "#8dc0ff",
  },
];

const agents = [
  {
    name: "AI Content Creation Agent",
    role: "Produces long-form blogs, landing pages, email sequences, and ad copy — trained on your brand tone and niche.",
    tag: "Content",
    emoji: "✍️",
    color: "#0066cc",
    bg: "#e6f2ff",
    border: "#99ccff",
    chips: ["Blog writing", "Landing pages", "Email copy", "Ad headlines"],
  },
  {
    name: "AI SEO Content Agent",
    role: "Researches keywords, builds content briefs, audits existing pages, and tracks ranking improvements over time.",
    tag: "SEO",
    emoji: "📈",
    color: "#0057ad",
    bg: "#cce5ff",
    border: "#66b2ff",
    chips: ["Keyword research", "On-page SEO", "Meta optimisation", "Rank tracking"],
  },
  {
    name: "AI Social Media Agent",
    role: "Repurposes every piece of content into platform-native posts, schedules them at peak engagement windows.",
    tag: "Social",
    emoji: "📢",
    color: "#003871",
    bg: "#b3d5ff",
    border: "#3399ff",
    chips: ["LinkedIn posts", "Instagram captions", "Tweet threads", "Content calendar"],
  },
];

const results = [
  { value: "8×", label: "More content published per month", icon: "📝" },
  { value: "310%", label: "Average organic traffic growth", icon: "📈" },
  { value: "Top 3", label: "Google ranking within 90 days", icon: "🥇" },
  { value: "68%", label: "Reduction in content production cost", icon: "💰" },
];

const rankingData = [
  { month: "Jan", pos: 48 }, { month: "Feb", pos: 35 }, { month: "Mar", pos: 24 },
  { month: "Apr", pos: 16 }, { month: "May", pos: 9 }, { month: "Jun", pos: 4 },
  { month: "Jul", pos: 2 },
];

const contentCalendar = [
  { day: "Mon", title: "10 AI Tools for Real Estate Teams", status: "Published", tag: "Blog" },
  { day: "Tue", title: "How to Automate Lead Follow-Up", status: "Scheduled", tag: "Blog" },
  { day: "Wed", title: "LinkedIn: AI Calling Stats Thread", status: "Posted", tag: "Social" },
  { day: "Thu", title: "Best CRM for Property Agents 2025", status: "In Draft", tag: "Blog" },
  { day: "Fri", title: "Instagram Carousel: Funnel Guide", status: "Scheduled", tag: "Social" },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  Published: { bg: "#e6f2ff", color: "#0066cc" },
  Scheduled: { bg: "#cce5ff", color: "#0057ad" },
  Posted: { bg: "#b3d5ff", color: "#00478f" },
  "In Draft": { bg: "#f0f8ff", color: "#99ccff" },
};

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AISEOContentPage() {
  return (
    <main
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Sora:wght@600;700;800&display=swap');

        :root {
          --p50:#e6f2ff;--p100:#cce5ff;--p200:#99ccff;--p300:#66b2ff;--p400:#3399ff;
          --p500:#1a7ae6;--p600:#0066cc;--p700:#0057ad;--p800:#00478f;--p900:#003871;--p920:#002b57;
          --s200:#b3d5ff;--s300:#8dc0ff;--s400:#66abff;--s600:#2676d9;--s700:#1d5aa6;
        }

        .card-lift { transition:transform .25s ease,box-shadow .25s ease; }
        .card-lift:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,102,204,.14); }

        .feature-card { transition:border-color .2s,transform .2s,box-shadow .2s; }
        .feature-card:hover { border-color:#3399ff!important; transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,102,204,.1); }

        .btn-primary { transition:background .2s,transform .18s,box-shadow .2s; }
        .btn-primary:hover { background:#0057ad!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,102,204,.35); }
        .btn-outline { transition:background .2s; }
        .btn-outline:hover { background:#e6f2ff!important; }

        .cal-row { transition:background .15s,transform .15s; }
        .cal-row:hover { background:#e6f2ff!important; transform:translateX(3px); }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float      { animation:float 4s ease-in-out infinite; }
        .float-slow { animation:float 6.5s ease-in-out infinite; }

        @keyframes ping-dot {
          0%   { box-shadow:0 0 0 0 rgba(0,102,204,.45); }
          70%  { box-shadow:0 0 0 12px rgba(0,102,204,0); }
          100% { box-shadow:0 0 0 0 rgba(0,102,204,0); }
        }
        .ping-dot { animation:ping-dot 2.2s ease-out infinite; }

        @keyframes bar-rise {
          from { transform:scaleY(0); transform-origin:bottom; }
          to   { transform:scaleY(1); transform-origin:bottom; }
        }
        .bar-rise { animation:bar-rise .9s cubic-bezier(.22,1,.36,1) both; }

        @keyframes rank-drop {
          from { opacity:0; transform:translateY(-10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .rank-drop { animation:rank-drop .6s ease both; }

        @keyframes type-cursor {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        .cursor { animation:type-cursor 1s step-end infinite; }

        @keyframes slide-up {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .line-1 { animation:slide-up .4s ease .2s both; }
        .line-2 { animation:slide-up .4s ease .55s both; }
        .line-3 { animation:slide-up .4s ease .9s both; }
        .line-4 { animation:slide-up .4s ease 1.25s both; }
        .line-5 { animation:slide-up .4s ease 1.6s both; }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#f0f8ff 0%,#e6f2ff 45%,#d9eaff 100%)",
          paddingTop: "88px",
          paddingBottom: "112px",
        }}
      >
        {/* blobs */}
        <div className="absolute -top-28 -right-20 w-[500px] h-[500px] rounded-full opacity-[.18] float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle,#0066cc,transparent 68%)" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[.09] float pointer-events-none"
          style={{ background: "radial-gradient(circle,#1a7ae6,transparent 70%)" }} />
        {/* grid */}
        <div className="absolute inset-0 opacity-[.038] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#0066cc 1px,transparent 1px),linear-gradient(90deg,#0066cc 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
                style={{ background: "#fff", borderColor: "#99ccff", color: "#0066cc" }}>
                <span className="w-2 h-2 rounded-full ping-dot" style={{ background: "#0066cc" }} />
                AI Content & SEO Automation
              </div>

              <h1 className="font-extrabold leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(2.2rem,5vw,3.75rem)", color: "#002b57" }}>
                Create Content That
                <br />
                <span style={{ color: "#0066cc" }}>Ranks & Converts</span>
              </h1>

              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#1d5aa6" }}>
                AI writes, optimises, and distributes your content — building organic traffic
                and topical authority while your team focuses on what matters most.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-base"
                  style={{ background: "#0066cc" }}>
                  Generate Your First Article
                </button>
                <button className="btn-outline px-8 py-4 rounded-xl font-semibold text-base border-2"
                  style={{ borderColor: "#99ccff", color: "#0066cc", background: "white" }}>
                  See Live Examples →
                </button>
              </div>

              {/* proof pills */}
              <div className="mt-10 flex flex-wrap gap-5">
                {[
                  { icon: "🥇", text: "Top 3 rankings in 90 days" },
                  { icon: "📝", text: "8× more content output" },
                  { icon: "📈", text: "310% organic traffic growth" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: "#1d5aa6" }}>
                    <span>{b.icon}</span><span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── hero visual — blog editor ── */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at center,#cce5ff 0%,transparent 65%)", opacity: .55 }} />

              <div className="relative rounded-3xl border-2 overflow-hidden shadow-2xl"
                style={{ background: "#fff", borderColor: "#99ccff" }}>

                {/* editor top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ borderColor: "#e6f2ff", background: "#f8fcff" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff6b6b" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ffd93d" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#6bcb77" }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "#0066cc" }}>AI Blog Editor</span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#e6f2ff", color: "#0066cc" }}>✓ SEO Score 94</span>
                </div>

                <div className="p-6 space-y-4">
                  {/* article being written */}
                  <div className="rounded-2xl border p-5" style={{ borderColor: "#e6f2ff", background: "#f8fcff" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "#e6f2ff", color: "#0066cc" }}>H1</span>
                      <p className="text-sm font-bold line-1" style={{ color: "#002b57" }}>
                        10 AI Tools Every Real Estate Agent Needs in 2025
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="line-2 h-3 rounded-full" style={{ background: "#e6f2ff", width: "100%" }} />
                      <div className="line-3 h-3 rounded-full" style={{ background: "#e6f2ff", width: "88%" }} />
                      <div className="line-4 h-3 rounded-full" style={{ background: "#e6f2ff", width: "74%" }} />
                      <div className="line-5 flex items-center gap-1">
                        <div className="h-3 rounded-full" style={{ background: "#e6f2ff", width: "45%" }} />
                        <span className="cursor text-sm font-bold" style={{ color: "#0066cc" }}>|</span>
                      </div>
                    </div>
                  </div>

                  {/* SEO sidebar */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "SEO Score", val: "94", unit: "/100", color: "#0066cc", bg: "#e6f2ff" },
                      { label: "Word Count", val: "1,840", unit: "words", color: "#0057ad", bg: "#cce5ff" },
                      { label: "Readability", val: "A+", unit: "grade", color: "#00478f", bg: "#b3d5ff" },
                    ].map((k) => (
                      <div key={k.label} className="rounded-xl p-3 text-center"
                        style={{ background: k.bg }}>
                        <p className="text-[10px] font-semibold mb-1" style={{ color: k.color }}>{k.label}</p>
                        <p className="text-lg font-extrabold leading-none"
                          style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{k.val}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: k.color }}>{k.unit}</p>
                      </div>
                    ))}
                  </div>

                  {/* keyword chips */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-2"
                      style={{ color: "#0066cc" }}>Target Keywords</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["AI real estate tools", "property agent software", "CRM automation", "lead follow-up AI", "real estate tech 2025"].map((kw) => (
                        <span key={kw} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{ background: "#e6f2ff", color: "#0066cc" }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* publish row */}
                  <div className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ background: "#002b57" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🚀</span>
                      <p className="text-xs font-semibold text-white">Ready to publish + distribute</p>
                    </div>
                    <div className="flex gap-1">
                      {["WP", "LI", "IG", "TW"].map((p) => (
                        <span key={p} className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ background: "rgba(255,255,255,0.15)", color: "#cce5ff" }}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RESULTS STRIP
      ══════════════════════════════════════ */}
      <section style={{ background: "#002b57" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((s, i) => (
            <FadeIn key={s.label} delay={i * 80} className="text-center">
              <div className="text-2xl mb-2">{s.icon}</div>
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
          CONTENT WORKFLOW
      ══════════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Content Workflow
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            From Keyword to Page One — Automatically
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            A four-step pipeline that takes a topic and turns it into published, ranking content without manual effort.
          </p>
        </FadeIn>

        {/* horizontal flow */}
        <div className="grid md:grid-cols-4 gap-0 relative">
          <div className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: "linear-gradient(90deg,#99ccff,#0066cc 50%,#003871)" }} />
          {workflowSteps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 110} className="flex flex-col items-center text-center px-4">
              <div className="relative z-10 w-[52px] h-[52px] rounded-full border-4 flex items-center justify-center text-xl mb-5"
                style={{
                  background: i < 2 ? "#0066cc" : "#fff",
                  borderColor: "#0066cc",
                }}>
                {s.icon}
              </div>
              <div className="text-xs font-bold mb-1" style={{ color: "#99ccff" }}>{s.step}</div>
              <h3 className="font-bold text-base mb-2 leading-snug"
                style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>{s.desc}</p>
            </FadeIn>
          ))}
        </div>

        {/* publish pipeline strip */}
        <FadeIn delay={200} className="mt-14">
          <div className="rounded-2xl border-2 px-6 py-5 overflow-x-auto"
            style={{ background: "#f8fcff", borderColor: "#cce5ff" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#0066cc" }}>
              Distribution Pipeline
            </p>
            <div className="flex items-center gap-3 min-w-max">
              {["Brief Input", "AI Writes Draft", "SEO Audit", "One-Click Approve", "WordPress", "LinkedIn", "Instagram", "Twitter/X"].map((node, i, arr) => (
                <React.Fragment key={node}>
                  <div className="px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap"
                    style={{
                      background: i < 4 ? (i % 2 === 0 ? "#e6f2ff" : "#0066cc") : "#002b57",
                      color: i < 4 ? (i % 2 === 0 ? "#002b57" : "#fff") : "#cce5ff",
                    }}>
                    {node}
                  </div>
                  {i < arr.length - 1 && (
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                      <path d="M0 6h14M10 1l6 5-6 5" stroke="#66b2ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════
          SEO OPTIMISATION SECTION
      ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f0f8ff,#e6f2ff)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              SEO Optimisation
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              Watch Your Rankings Climb
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
              AI-generated content is engineered to rank — keyword-rich, semantically deep, and technically perfect from day one.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* ranking chart */}
            <FadeIn>
              <div className="rounded-3xl border-2 p-8"
                style={{ background: "#fff", borderColor: "#cce5ff" }}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-base"
                      style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                      Google Ranking Position
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "#1d5aa6" }}>
                      "AI tools for real estate" — 7 months
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "#e6f2ff", color: "#0066cc" }}>
                    Pos. 2 ↑
                  </span>
                </div>

                {/* inverted bar chart — lower = better rank */}
                <div className="relative">
                  {/* y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between pr-3">
                    {[1, 10, 20, 30, 50].map((v) => (
                      <span key={v} className="text-[10px]" style={{ color: "#99ccff" }}>{v}</span>
                    ))}
                  </div>

                  {/* bars — inverted, lower pos = taller bar  */}
                  <div className="ml-6 flex items-end justify-between gap-2" style={{ height: "160px" }}>
                    {rankingData.map((d, i) => {
                      const normalized = Math.max(0, (50 - d.pos) / 50);
                      return (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold" style={{ color: "#0066cc" }}>{d.pos}</span>
                          <div className="w-full relative" style={{ height: "130px" }}>
                            <div
                              className="bar-rise absolute bottom-0 w-full rounded-t-lg"
                              style={{
                                height: `${normalized * 100}%`,
                                background: i >= 4
                                  ? "linear-gradient(180deg,#0066cc,#003871)"
                                  : "linear-gradient(180deg,#66b2ff,#99ccff)",
                                animationDelay: `${i * 80}ms`,
                              }}
                            />
                          </div>
                          <span className="text-[10px]" style={{ color: "#1d5aa6" }}>{d.month}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-center mt-4" style={{ color: "#99ccff" }}>
                    Lower position number = higher on Google ↑
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* SEO checklist + keyword table */}
            <div className="flex flex-col gap-5">
              <FadeIn delay={100}>
                <div className="rounded-3xl border-2 p-6"
                  style={{ background: "#fff", borderColor: "#cce5ff" }}>
                  <h3 className="font-bold text-sm mb-4"
                    style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                    On-Page SEO Checklist — Auto-Applied
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      "Primary keyword in H1 & first 100 words",
                      "Meta title optimised (under 60 chars)",
                      "Meta description with CTA (under 155 chars)",
                      "Internal links to 3 relevant pages",
                      "Schema markup (Article + FAQ)",
                      "Image alt tags with target keyword",
                      "Content length 1,500+ words",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "#e6f2ff" }}>
                          <svg viewBox="0 0 16 16" fill="none" stroke="#0066cc" strokeWidth={2.2} className="w-3 h-3">
                            <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-xs" style={{ color: "#1d5aa6" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div className="rounded-3xl border-2 p-6"
                  style={{ background: "#fff", borderColor: "#cce5ff" }}>
                  <h3 className="font-bold text-sm mb-4"
                    style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                    Keyword Opportunities Found
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 text-[10px] font-semibold uppercase tracking-wide px-2"
                      style={{ color: "#99ccff" }}>
                      <span>Keyword</span><span className="text-center">Volume</span><span className="text-center">Difficulty</span>
                    </div>
                    {[
                      { kw: "AI real estate CRM", vol: "8,100", diff: "Low", easy: true },
                      { kw: "property lead automation", vol: "5,400", diff: "Low", easy: true },
                      { kw: "AI calling agent 2025", vol: "3,600", diff: "Medium", easy: false },
                      { kw: "real estate chatbot", vol: "12,000", diff: "Medium", easy: false },
                    ].map((row) => (
                      <div key={row.kw} className="grid grid-cols-3 items-center px-2 py-2 rounded-lg"
                        style={{ background: "#f8fcff" }}>
                        <span className="text-xs font-medium truncate" style={{ color: "#002b57" }}>{row.kw}</span>
                        <span className="text-xs font-bold text-center" style={{ color: "#0066cc" }}>{row.vol}</span>
                        <span className="text-xs font-semibold text-center"
                          style={{ color: row.easy ? "#0066cc" : "#99ccff" }}>
                          {row.diff}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Features
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            Everything You Need to Dominate Search
          </h2>
          <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
            From ideation to ranking — every step is automated, optimised, and measurable.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 90}>
              <div className="feature-card rounded-2xl border-2 p-6 h-full cursor-default"
                style={{ borderColor: "#cce5ff", background: "#fafeff" }}>
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
      </section>

      {/* ══════════════════════════════════════
          AI AGENTS
      ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f0f8ff,#e6f2ff)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              AI Agents
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              Your Always-On Content Team
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
              Three agents that write, rank, and distribute — at a pace no human team can match.
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
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#1d5aa6" }}>{a.role}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.chips.map((chip) => (
                      <span key={chip} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: a.bg, color: a.color }}>{chip}</span>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t flex items-center gap-2 text-xs font-medium"
                    style={{ borderColor: "#e6f2ff", color: a.color }}>
                    <span className="w-2 h-2 rounded-full ping-dot" style={{ background: a.color }} />
                    Always producing
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RESULTS / CONTENT CALENDAR
      ══════════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Results & Output
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            Content That Compounds Over Time
          </h2>
          <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
            Every article published today builds traffic for the next 12 months — AI creates the flywheel, you collect the leads.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">

          {/* content calendar */}
          <FadeIn>
            <div className="rounded-3xl border-2 p-7"
              style={{ background: "#fff", borderColor: "#cce5ff" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-base"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                  Content Calendar — This Week
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#e6f2ff", color: "#0066cc" }}>AI-Managed</span>
              </div>

              <div className="space-y-2">
                {contentCalendar.map((item) => {
                  const sc = statusColors[item.status] ?? { bg: "#f0f8ff", color: "#99ccff" };
                  return (
                    <div key={item.title}
                      className="cal-row flex items-center gap-3 rounded-xl px-4 py-3 cursor-default"
                      style={{ background: "#f8fcff" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: "#e6f2ff", color: "#0066cc" }}>{item.day}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: "#002b57" }}>{item.title}</p>
                        <p className="text-[10px]" style={{ color: "#1d5aa6" }}>{item.tag}</p>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                        style={{ background: sc.bg, color: sc.color }}>
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* traffic growth visual */}
          <FadeIn delay={120}>
            <div className="rounded-3xl border-2 p-7 flex flex-col gap-5"
              style={{ background: "#fff", borderColor: "#cce5ff" }}>
              <h3 className="font-bold text-base"
                style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                Organic Traffic Growth
              </h3>

              {/* stacked horizontal bars */}
              {[
                { label: "Month 1", val: 8, total: 100 },
                { label: "Month 2", val: 22, total: 100 },
                { label: "Month 3", val: 41, total: 100 },
                { label: "Month 4", val: 63, total: 100 },
                { label: "Month 5", val: 82, total: 100 },
                { label: "Month 6", val: 100, total: 100 },
              ].map((row, i) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-16 shrink-0" style={{ color: "#1d5aa6" }}>{row.label}</span>
                  <div className="flex-1 h-5 rounded-full" style={{ background: "#f0f8ff" }}>
                    <div
                      className="bar-rise h-5 rounded-full flex items-center justify-end pr-2"
                      style={{
                        width: `${row.val}%`,
                        background: `linear-gradient(90deg,${i >= 3 ? "#0066cc" : "#66b2ff"},${i >= 3 ? "#003871" : "#99ccff"})`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold w-10 text-right shrink-0"
                    style={{ color: i >= 3 ? "#0066cc" : "#1d5aa6" }}>
                    {row.val === 100 ? "310%" : `+${row.val * 3}%`}
                  </span>
                </div>
              ))}

              <div className="rounded-xl px-4 py-3 flex items-center justify-between mt-1"
                style={{ background: "#e6f2ff" }}>
                <span className="text-xs font-bold" style={{ color: "#002b57" }}>Total organic growth</span>
                <span className="text-lg font-extrabold"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#0066cc" }}>310% ↑</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-28 px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto rounded-3xl p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#002b57 0%,#0066cc 100%)" }}>
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white" }} />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10 pointer-events-none"
              style={{ background: "white" }} />

            <div className="relative">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.15)", color: "#cce5ff" }}>
                Start Growing Organically
              </span>

              <h2 className="text-3xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Sora',sans-serif" }}>
                Every day without content
                <br />is a day your competitor ranks higher.
              </h2>

              <p className="text-base mb-10" style={{ color: "#b3d5ff" }}>
                Start publishing AI-generated, SEO-optimised content today.
                No writers needed. No agency fees. Just compounding organic growth.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary px-9 py-4 rounded-xl font-semibold text-base"
                  style={{ background: "white", color: "#0066cc" }}>
                  Generate My First Article Free
                </button>
                <button className="px-9 py-4 rounded-xl font-semibold text-base border-2 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>
                  View Sample Content
                </button>
              </div>

              <p className="mt-7 text-sm" style={{ color: "#66b2ff" }}>
                No credit card required · First article in &lt; 2 minutes · Cancel anytime
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}