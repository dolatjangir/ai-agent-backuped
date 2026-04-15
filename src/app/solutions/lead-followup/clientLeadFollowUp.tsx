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
      transform: visible ? "translateY(0)" : "translateY(30px)",
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
    title: "Lead Enters System",
    desc: "Every new lead — from any source — is instantly captured and added to your follow-up pipeline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI Schedules Follow-Ups",
    desc: "Smart timing engine picks the optimal moment to reach each lead — day, time, and channel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Sends Messages & Calls",
    desc: "AI fires personalised WhatsApp messages, emails, and voice calls across every channel simultaneously.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Tracks Engagement",
    desc: "Every open, reply, and call outcome is logged — so your pipeline always reflects real intent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const features = [
  {
    title: "Auto WhatsApp & Email",
    desc: "Send personalised follow-ups on WhatsApp and email — triggered automatically, at the right time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#0066cc",
    bg: "#e6f2ff",
  },
  {
    title: "AI Voice Calling",
    desc: "Human-sounding AI calls your leads, qualifies them, and books appointments — all without your team.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    color: "#0057ad",
    bg: "#cce5ff",
  },
  {
    title: "Smart Timing Optimisation",
    desc: "Machine learning picks the highest-engagement window for every lead based on past behaviour.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    color: "#00478f",
    bg: "#b3d5ff",
  },
  {
    title: "Lead Engagement Tracking",
    desc: "See every interaction in real time — opens, replies, call outcomes, and conversion signals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M3 3v18h18" strokeLinecap="round" />
        <path d="M18 9l-5 5-4-4-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#003871",
    bg: "#8dc0ff",
  },
];

const agents = [
  {
    name: "AI Follow-Up Agent",
    role: "Orchestrates the entire follow-up sequence — timing, channel selection, and message personalisation.",
    tag: "Follow-Up",
    emoji: "🤖",
    color: "#0066cc",
    bg: "#e6f2ff",
    border: "#99ccff",
  },
  {
    name: "AI Calling Agent",
    role: "Dials leads with a natural AI voice, qualifies their intent, and logs every call outcome automatically.",
    tag: "Calling",
    emoji: "📞",
    color: "#0057ad",
    bg: "#cce5ff",
    border: "#66b2ff",
  },
  {
    name: "AI Social Media Agent",
    role: "Engages leads on WhatsApp, Instagram DMs, and LinkedIn — keeping your brand top of mind.",
    tag: "Social",
    emoji: "💬",
    color: "#003871",
    bg: "#b3d5ff",
    border: "#3399ff",
  },
];

const timeline = [
  { time: "Day 0", label: "Lead captured", channel: "System", icon: "📥", done: true },
  { time: "Day 1", label: "Welcome WhatsApp message", channel: "WhatsApp", icon: "💬", done: true },
  { time: "Day 2", label: "Introductory email sent", channel: "Email", icon: "📧", done: true },
  { time: "Day 3", label: "AI voice call attempted", channel: "Call", icon: "📞", done: false },
  { time: "Day 5", label: "Social DM follow-up", channel: "Social", icon: "📲", done: false },
  { time: "Day 7", label: "Final re-engagement message", channel: "WhatsApp", icon: "🔔", done: false },
];

const stats = [
  { value: "4.2×", label: "More replies vs manual follow-up" },
  { value: "68%", label: "Open rate on AI messages" },
  { value: "3 min", label: "Average first response time" },
  { value: "91%", label: "Follow-up completion rate" },
];

const channels = [
  { name: "WhatsApp", color: "#0066cc", bg: "#e6f2ff", pct: 38 },
  { name: "Email", color: "#0057ad", bg: "#cce5ff", pct: 29 },
  { name: "Voice Call", color: "#00478f", bg: "#b3d5ff", pct: 21 },
  { name: "Social DM", color: "#003871", bg: "#8dc0ff", pct: 12 },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AIFollowUpPage() {
  return (
    <main
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Sora:wght@600;700;800&display=swap');

        :root {
          --color-primary-50:#e6f2ff;--color-primary-100:#cce5ff;--color-primary-200:#99ccff;
          --color-primary-300:#66b2ff;--color-primary-400:#3399ff;--color-primary-500:#1a7ae6;
          --color-primary-600:#0066cc;--color-primary-700:#0057ad;--color-primary-800:#00478f;
          --color-primary-900:#003871;--color-primary-920:#002b57;
          --color-secondary-50:#eef6ff;--color-secondary-100:#d9eaff;--color-secondary-200:#b3d5ff;
          --color-secondary-300:#8dc0ff;--color-secondary-400:#66abff;--color-secondary-500:#4096ff;
          --color-secondary-600:#2676d9;--color-secondary-700:#1d5aa6;--color-secondary-800:#143f73;
          --color-secondary-900:#0b2540;
        }

        .card-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,102,204,.14); }

        .feature-card { transition: background .2s, border-color .2s, transform .2s; }
        .feature-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,102,204,.1); }

        .btn-primary { transition: background .2s, transform .18s, box-shadow .2s; }
        .btn-primary:hover { background:#0057ad!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,102,204,.35); }

        .btn-outline { transition: background .2s; }
        .btn-outline:hover { background:#e6f2ff!important; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float      { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: float 6s ease-in-out infinite; }

        @keyframes ping-dot {
          0%   { box-shadow: 0 0 0 0 rgba(0,102,204,.4); }
          70%  { box-shadow: 0 0 0 12px rgba(0,102,204,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,102,204,0); }
        }
        .ping-dot { animation: ping-dot 2.2s ease-out infinite; }

        @keyframes slide-in-right {
          from { opacity:0; transform:translateX(18px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .chat-bubble-1 { animation: slide-in-right .5s ease .2s both; }
        .chat-bubble-2 { animation: slide-in-right .5s ease .6s both; }
        .chat-bubble-3 { animation: slide-in-right .5s ease 1s both; }
        .chat-bubble-4 { animation: slide-in-right .5s ease 1.4s both; }

        @keyframes bar-grow { from { height: 0; } }
        .bar-grow { animation: bar-grow .8s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#f0f8ff 0%,#e6f2ff 45%,#d9eaff 100%)",
          paddingTop: "88px",
          paddingBottom: "108px",
        }}
      >
        {/* blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle,#0066cc,transparent 70%)" }} />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-10 float pointer-events-none"
          style={{ background: "radial-gradient(circle,#1a7ae6,transparent 70%)" }} />
        {/* dot-grid */}
        <div className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0066cc 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* left copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-7"
                style={{ background: "#fff", borderColor: "#99ccff", color: "#0066cc" }}>
                <span className="w-2 h-2 rounded-full ping-dot" style={{ background: "#0066cc" }} />
                Multi-Channel Follow-Up Automation
              </div>

              <h1
                className="font-extrabold leading-tight tracking-tight mb-6"
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontSize: "clamp(2.2rem,5vw,3.6rem)",
                  color: "#002b57",
                }}
              >
                Never Miss a
                <br />
                <span style={{ color: "#0066cc" }}>Lead Again</span>
              </h1>

              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#1d5aa6" }}>
                AI automatically follows up with your leads via calls, WhatsApp messages, emails,
                and social DMs — so no opportunity ever goes cold.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-base"
                  style={{ background: "#0066cc" }}>
                  Activate Follow-Up AI
                </button>
                <button className="btn-outline px-8 py-4 rounded-xl font-semibold text-base border-2"
                  style={{ borderColor: "#99ccff", color: "#0066cc", background: "white" }}>
                  Watch Demo →
                </button>
              </div>

              {/* mini channel pills */}
              <div className="mt-9 flex flex-wrap gap-2">
                {["WhatsApp", "Email", "Voice Call", "Instagram DM", "LinkedIn"].map((ch) => (
                  <span key={ch}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "#cce5ff", color: "#0057ad", background: "#fff" }}>
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            {/* right — chat bubbles visual */}
            <div className="relative hidden lg:flex flex-col gap-3 items-end">
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: "radial-gradient(ellipse at center,#cce5ff 0%,transparent 70%)", opacity: .45 }} />

              {/* bubbles */}
              <div className="relative w-full max-w-sm ml-auto space-y-3 py-6 px-2">

                {/* AI → lead */}
                <div className="chat-bubble-1 flex items-end gap-2 justify-end">
                  <div className="rounded-2xl rounded-br-sm px-5 py-3.5 text-sm font-medium max-w-xs text-right shadow-sm"
                    style={{ background: "#0066cc", color: "#fff" }}>
                    <p className="text-xs mb-1 opacity-70">AI Follow-Up Agent · WhatsApp</p>
                    Hi Rahul! Just following up on your enquiry about the 3BHK in Jaipur. Shall we schedule a visit? 🏠
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-lg"
                    style={{ background: "#e6f2ff" }}>🤖</div>
                </div>

                {/* lead → AI */}
                <div className="chat-bubble-2 flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-lg"
                    style={{ background: "#cce5ff" }}>👤</div>
                  <div className="rounded-2xl rounded-bl-sm px-5 py-3.5 text-sm font-medium max-w-xs shadow-sm"
                    style={{ background: "#fff", color: "#002b57", border: "1px solid #cce5ff" }}>
                    Yes, I'm interested! Can we do Saturday?
                  </div>
                </div>

                {/* AI calling */}
                <div className="chat-bubble-3 flex items-end gap-2 justify-end">
                  <div className="rounded-2xl rounded-br-sm px-5 py-3.5 text-sm font-medium max-w-xs shadow-sm"
                    style={{ background: "#0057ad", color: "#fff" }}>
                    <p className="text-xs mb-1 opacity-70">AI Calling Agent · Voice</p>
                    📞 Calling Rahul to confirm Saturday 11 AM slot…
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-lg"
                    style={{ background: "#cce5ff" }}>🤖</div>
                </div>

                {/* notification */}
                <div className="chat-bubble-4 flex items-center gap-3 rounded-2xl border px-5 py-3.5"
                  style={{ background: "#fff", borderColor: "#99ccff" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "#e6f2ff" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth={2} className="w-4 h-4">
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#002b57" }}>Visit Confirmed</p>
                    <p className="text-xs" style={{ color: "#1d5aa6" }}>Saturday 11:00 AM — Rahul Kumar</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#e6f2ff", color: "#0066cc" }}>✓ Done</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          STATS STRIP
      ══════════════════════════════════ */}
      <section style={{ background: "#002b57" }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
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

      {/* ══════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            From Lead to Conversion — Automatically
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            Four seamless steps that run on their own — from the first entry to the final booking.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-0 relative">
          {/* connecting line */}
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: "linear-gradient(90deg,#99ccff,#0066cc,#003871)" }} />

          {howItWorks.map((s, i) => (
            <FadeIn key={s.num} delay={i * 110} className="flex flex-col items-center text-center px-4">
              {/* circle */}
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

      {/* ══════════════════════════════════
          FOLLOW-UP TIMELINE
      ══════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f0f8ff,#e6f2ff)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              Follow-Up Timeline
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              7-Day Automated Sequence
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
              Every lead follows a precision-timed sequence until they respond — no gaps, no forgetting.
            </p>
          </FadeIn>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ background: "linear-gradient(180deg,#0066cc 0%,#cce5ff 100%)" }} />

            <div className="space-y-8">
              {timeline.map((t, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <FadeIn key={t.time} delay={i * 100}>
                    <div className={`relative flex items-center gap-4 md:gap-0 ${isRight ? "md:flex-row-reverse" : ""}`}>

                      {/* dot */}
                      <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2
                                      w-[56px] h-[56px] rounded-2xl border-4 flex items-center justify-center text-2xl"
                        style={{
                          background: t.done ? "#0066cc" : "#fff",
                          borderColor: t.done ? "#0066cc" : "#99ccff",
                        }}>
                        {/* {t.emoji} */}emojii
                      </div>

                      {/* card */}
                      <div className={`card-lift flex-1 rounded-2xl border-2 p-5
                                       md:w-5/12 md:flex-none
                                       ${isRight ? "md:mr-auto md:ml-[52%]" : "md:ml-auto md:mr-[52%]"}`}
                        style={{
                          background: "#fff",
                          borderColor: t.done ? "#66b2ff" : "#cce5ff",
                        }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wide"
                            style={{ color: "#0066cc" }}>{t.time}</span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: t.done ? "#e6f2ff" : "#f0f8ff",
                              color: t.done ? "#0066cc" : "#99ccff",
                              border: `1px solid ${t.done ? "#99ccff" : "#cce5ff"}`,
                            }}>
                            {t.channel}
                          </span>
                        </div>
                        <p className="font-semibold text-sm" style={{ color: "#002b57" }}>{t.label}</p>
                        {t.done && (
                          <div className="mt-2 flex items-center gap-1 text-xs font-medium"
                            style={{ color: "#0066cc" }}>
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                              <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Sent & delivered
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          AI AGENTS
      ══════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            AI Agents
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            Your 24 / 7 Follow-Up Team
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            Three specialised agents work in concert — so every lead is touched on every channel.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {agents.map((a, i) => (
            <FadeIn key={a.name} delay={i * 110}>
              <div className="card-lift rounded-2xl border-2 p-7 flex flex-col h-full"
                style={{ background: "#fff", borderColor: a.border }}>

                {/* top row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: a.bg }}>
                    {a.emoji}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: a.bg, color: a.color }}>
                    {a.tag}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-3 leading-snug"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                  {a.name}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#1d5aa6" }}>
                  {a.role}
                </p>

                <div className="mt-6 pt-5 border-t flex items-center gap-2 text-xs font-medium"
                  style={{ borderColor: "#e6f2ff", color: a.color }}>
                  <span className="w-2 h-2 rounded-full ping-dot" style={{ background: a.color }} />
                  Always active
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES
      ══════════════════════════════════ */}
      <section className="py-24" style={{ background: "#f0f8ff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              Features
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              Built for Relentless Follow-Up
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
                    style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ENGAGEMENT STATS
      ══════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Engagement Stats
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            Where Your Leads Engage Most
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">

          {/* channel breakdown */}
          <FadeIn>
            <div className="rounded-3xl border-2 p-8"
              style={{ background: "#fff", borderColor: "#cce5ff" }}>
              <h3 className="font-bold text-base mb-6" style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                Engagement by Channel
              </h3>
              <div className="space-y-4">
                {channels.map((c) => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium" style={{ color: "#002b57" }}>{c.name}</span>
                      <span className="font-bold" style={{ color: c.color }}>{c.pct}%</span>
                    </div>
                    <div className="h-3 rounded-full" style={{ background: "#f0f8ff" }}>
                      <div
                        className="h-3 rounded-full bar-grow"
                        style={{ width: `${c.pct}%`, background: c.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* notification flow */}
          <FadeIn delay={120}>
            <div className="rounded-3xl border-2 p-8 flex flex-col gap-4"
              style={{ background: "#fff", borderColor: "#cce5ff" }}>
              <h3 className="font-bold text-base mb-2"
                style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                Live Notification Feed
              </h3>

              {[
                { icon: "💬", title: "WhatsApp Delivered", name: "Priya Sharma", time: "Just now", ok: true },
                { icon: "📞", title: "Call Connected", name: "Amit Verma", time: "2 min ago", ok: true },
                { icon: "📧", title: "Email Opened", name: "Riya Patel", time: "5 min ago", ok: true },
                { icon: "📲", title: "DM Replied", name: "Karan Mehra", time: "8 min ago", ok: true },
              ].map((n) => (
                <div key={n.name} className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: "#f0f8ff" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: "#e6f2ff" }}>
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: "#002b57" }}>{n.title}</p>
                    <p className="text-xs truncate" style={{ color: "#1d5aa6" }}>{n.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px]" style={{ color: "#99ccff" }}>{n.time}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "#e6f2ff", color: "#0066cc" }}>✓</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
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
                Stop Losing Leads
              </span>

              <h2 className="text-3xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Sora',sans-serif" }}>
                Every unanswered lead
                <br />is revenue walking away.
              </h2>

              <p className="text-base mb-10" style={{ color: "#b3d5ff" }}>
                Deploy your AI Follow-Up team in minutes. No coding. No hiring.
                Just consistent, personalised outreach — on autopilot.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary px-9 py-4 rounded-xl font-semibold text-base"
                  style={{ background: "white", color: "#0066cc" }}>
                  Start Following Up Now
                </button>
                <button className="px-9 py-4 rounded-xl font-semibold text-base border-2 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>
                  Book a Live Demo
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