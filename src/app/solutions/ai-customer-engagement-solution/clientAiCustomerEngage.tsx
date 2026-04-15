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

const channels = [
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "#0066cc", bg: "#e6f2ff", border: "#99ccff",
    stat: "94% open rate", tag: "Messaging",
  },
  {
    name: "AI Voice Call",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.15 12 19.79 19.79 0 011.08 3.4 2 2 0 013.06 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121 16z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#0057ad", bg: "#cce5ff", border: "#66b2ff",
    stat: "87% connect rate", tag: "Voice",
  },
  {
    name: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: "#00478f", bg: "#b3d5ff", border: "#3399ff",
    stat: "68% open rate", tag: "Email",
  },
  {
    name: "Instagram DM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    color: "#003871", bg: "#8dc0ff", border: "#1a7ae6",
    stat: "5.2% engagement", tag: "Social",
  },
];

const features = [
  {
    title: "Multi-Channel Messaging",
    desc: "Send perfectly timed, personalised messages on WhatsApp, email, SMS, and social — all from one system.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    color: "#0066cc", bg: "#e6f2ff",
  },
  {
    title: "AI Call Automation",
    desc: "Natural-sounding AI calls customers, handles FAQs, qualifies intent, and books appointments — hands-free.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.15 12 19.79 19.79 0 011.08 3.4 2 2 0 013.06 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121 16z" strokeLinecap="round"/>
      </svg>
    ),
    color: "#0057ad", bg: "#cce5ff",
  },
  {
    title: "Smart Reply System",
    desc: "AI reads context and responds intelligently — personalised to each customer's history and intent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>
      </svg>
    ),
    color: "#00478f", bg: "#b3d5ff",
  },
  {
    title: "Real-Time Engagement Tracking",
    desc: "Every open, reply, call, and click is captured — giving you a live view of every customer relationship.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#003871", bg: "#8dc0ff",
  },
];

const agents = [
  {
    name: "AI Follow-Up Agent",
    role: "Maintains every customer relationship autonomously — sending the right message at the perfect moment across every channel.",
    tag: "Follow-Up",
    emoji: "🤖",
    color: "#0066cc",
    bg: "#e6f2ff",
    border: "#99ccff",
    capabilities: ["WhatsApp sequences", "Email follow-ups", "Smart timing", "Drip campaigns"],
  },
  {
    name: "AI Calling Agent",
    role: "Calls leads and customers with a natural AI voice — qualifies intent, answers queries, and confirms appointments without human involvement.",
    tag: "Voice AI",
    emoji: "📞",
    color: "#0057ad",
    bg: "#cce5ff",
    border: "#66b2ff",
    capabilities: ["Outbound dialling", "FAQ handling", "Appointment booking", "Call transcription"],
  },
  {
    name: "AI Social Media Agent",
    role: "Manages DMs, comments, and mentions across Instagram, LinkedIn, and Facebook — keeping your brand engaged at scale.",
    tag: "Social",
    emoji: "💬",
    color: "#003871",
    bg: "#b3d5ff",
    border: "#3399ff",
    capabilities: ["DM automation", "Comment replies", "Sentiment tracking", "Content scheduling"],
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Customer Touches Your Brand",
    desc: "A visitor fills a form, clicks an ad, or messages on any channel — instantly entering the engagement engine.",
    icon: "👤",
    color: "#0066cc", bg: "#e6f2ff",
  },
  {
    step: "02",
    title: "AI Identifies Intent",
    desc: "The system reads the signal — new lead, support request, re-engagement — and picks the right agent to respond.",
    icon: "🧠",
    color: "#0057ad", bg: "#cce5ff",
  },
  {
    step: "03",
    title: "Personalised Response Sent",
    desc: "A personalised message, call, or DM goes out within seconds — tailored to the customer's history and context.",
    icon: "⚡",
    color: "#00478f", bg: "#b3d5ff",
  },
  {
    step: "04",
    title: "Engagement Loop Runs",
    desc: "If there's no reply, the system follows up at optimal intervals — across every channel — until engagement is secured.",
    icon: "🔄",
    color: "#003871", bg: "#8dc0ff",
  },
];

const engagementStats = [
  { value: "5 sec", label: "Avg. first response time" },
  { value: "3.8×", label: "More engagement vs manual" },
  { value: "91%", label: "Customer satisfaction score" },
  { value: "24/7", label: "Active across all channels" },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AIEngagementPage() {
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

        .card-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .card-lift:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,102,204,.14); }

        .feature-card { transition: border-color .2s, transform .2s, box-shadow .2s; }
        .feature-card:hover { border-color:#3399ff!important; transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,102,204,.1); }

        .channel-card { transition: transform .2s, box-shadow .2s, border-color .2s; }
        .channel-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,102,204,.15); border-color:#66b2ff!important; }

        .btn-primary { transition:background .2s,transform .18s,box-shadow .2s; }
        .btn-primary:hover { background:#0057ad!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,102,204,.35); }
        .btn-outline { transition:background .2s; }
        .btn-outline:hover { background:#e6f2ff!important; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float      { animation:float 4s ease-in-out infinite; }
        .float-slow { animation:float 6.5s ease-in-out infinite; }

        @keyframes ping-dot {
          0%   { box-shadow:0 0 0 0 rgba(0,102,204,.45); }
          70%  { box-shadow:0 0 0 12px rgba(0,102,204,0); }
          100% { box-shadow:0 0 0 0 rgba(0,102,204,0); }
        }
        .ping-dot { animation:ping-dot 2.2s ease-out infinite; }

        @keyframes slide-in {
          from { opacity:0; transform:translateX(18px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .msg-1 { animation:slide-in .45s ease .1s both; }
        .msg-2 { animation:slide-in .45s ease .5s both; }
        .msg-3 { animation:slide-in .45s ease .9s both; }
        .msg-4 { animation:slide-in .45s ease 1.3s both; }
        .msg-5 { animation:slide-in .45s ease 1.7s both; }

        @keyframes ring {
          0%   { transform:rotate(0deg); }
          10%  { transform:rotate(14deg); }
          20%  { transform:rotate(-8deg); }
          30%  { transform:rotate(14deg); }
          40%  { transform:rotate(-4deg); }
          50%  { transform:rotate(10deg); }
          60%  { transform:rotate(0deg); }
          100% { transform:rotate(0deg); }
        }
        .bell { animation:ring 3s ease-in-out 2s infinite; transform-origin:top center; }

        @keyframes pulse-bg {
          0%,100% { opacity:.7; }
          50%     { opacity:1; }
        }
        .pulse-bg { animation:pulse-bg 2s ease-in-out infinite; }

        @keyframes wave {
          0%,100% { transform:scaleY(0.5); }
          50%     { transform:scaleY(1); }
        }
        .wave-bar { animation:wave 1.2s ease-in-out infinite; transform-origin:bottom; }
        .wave-bar:nth-child(2) { animation-delay:.15s; }
        .wave-bar:nth-child(3) { animation-delay:.3s; }
        .wave-bar:nth-child(4) { animation-delay:.45s; }
        .wave-bar:nth-child(5) { animation-delay:.3s; }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#f0f8ff 0%,#e6f2ff 45%,#d9eaff 100%)",
          paddingTop: "92px",
          paddingBottom: "112px",
        }}
      >
        {/* blobs */}
        <div className="absolute -top-28 -right-24 w-[500px] h-[500px] rounded-full opacity-[.18] float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle,#0066cc,transparent 68%)" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[.09] float pointer-events-none"
          style={{ background: "radial-gradient(circle,#1a7ae6,transparent 70%)" }} />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[.045] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0066cc 1.2px,transparent 1.2px)",
            backgroundSize: "36px 36px",
          }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
                style={{ background: "#fff", borderColor: "#99ccff", color: "#0066cc" }}>
                <span className="w-2 h-2 rounded-full ping-dot" style={{ background: "#0066cc" }} />
                AI Customer Engagement
              </div>

              <h1 className="font-extrabold leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(2.2rem,5vw,3.75rem)", color: "#002b57" }}>
                Engage Every Customer,
                <br />
                <span style={{ color: "#0066cc" }}>Automatically</span>
              </h1>

              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#1d5aa6" }}>
                AI handles conversations across calls, chat, and social — so you never miss
                an opportunity to connect, convert, or retain a customer.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-base"
                  style={{ background: "#0066cc" }}>
                  Start Free — No Setup
                </button>
                <button className="btn-outline px-8 py-4 rounded-xl font-semibold text-base border-2"
                  style={{ borderColor: "#99ccff", color: "#0066cc", background: "white" }}>
                  Watch It Work →
                </button>
              </div>

              {/* trust badges */}
              <div className="mt-10 flex flex-wrap gap-5">
                {[
                  { icon: "⚡", text: "5-second response time" },
                  { icon: "🔒", text: "Enterprise-grade privacy" },
                  { icon: "🌐", text: "6+ channels connected" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2 text-sm"
                    style={{ color: "#1d5aa6" }}>
                    <span>{b.icon}</span>
                    <span className="font-medium">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── hero visual — chat + call + notifications ── */}
            <div className="hidden lg:flex flex-col gap-4 relative">
              <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at center,#cce5ff 0%,transparent 65%)", opacity: .55 }} />

              {/* chat UI */}
              <div className="relative rounded-3xl border-2 overflow-hidden shadow-xl"
                style={{ background: "#fff", borderColor: "#99ccff" }}>

                {/* chat header */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b"
                  style={{ borderColor: "#e6f2ff", background: "#f8fcff" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                    style={{ background: "#e6f2ff" }}>🤖</div>
                  <div>
                    <p className="text-sm font-bold leading-none" style={{ color: "#002b57" }}>AI Engagement Agent</p>
                    <p className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: "#0066cc" }}>
                      <span className="w-1.5 h-1.5 rounded-full ping-dot inline-block" style={{ background: "#0066cc" }} />
                      Online now
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: "#e6f2ff", color: "#0066cc" }}>WhatsApp</span>
                  </div>
                </div>

                {/* messages */}
                <div className="p-4 space-y-3">
                  <div className="msg-1 flex justify-end">
                    <div className="rounded-2xl rounded-br-sm px-4 py-2.5 text-sm max-w-[220px]"
                      style={{ background: "#0066cc", color: "#fff" }}>
                      Hi, I'm interested in the 2BHK listing I saw. Can you share details?
                    </div>
                  </div>
                  <div className="msg-2 flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                      style={{ background: "#e6f2ff" }}>🤖</div>
                    <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm max-w-[220px]"
                      style={{ background: "#f0f8ff", color: "#002b57", border: "1px solid #cce5ff" }}>
                      Of course! Here's the full brochure + floor plan for the 2BHK on MG Road. Shall I schedule a visit?
                    </div>
                  </div>
                  <div className="msg-3 flex justify-end">
                    <div className="rounded-2xl rounded-br-sm px-4 py-2.5 text-sm max-w-[200px]"
                      style={{ background: "#0066cc", color: "#fff" }}>
                      Yes please — Saturday morning works.
                    </div>
                  </div>
                  <div className="msg-4 flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                      style={{ background: "#e6f2ff" }}>🤖</div>
                    <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm max-w-[220px]"
                      style={{ background: "#f0f8ff", color: "#002b57", border: "1px solid #cce5ff" }}>
                      Confirmed! Saturday 10 AM. Our team will meet you at the property. ✅
                    </div>
                  </div>
                </div>
              </div>

              {/* call + notification row */}
              <div className="grid grid-cols-2 gap-4">

                {/* AI call card */}
                <div className="msg-4 rounded-2xl border-2 p-4"
                  style={{ background: "#fff", borderColor: "#cce5ff" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "#cce5ff" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0057ad" strokeWidth={2} className="w-5 h-5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.15 12 19.79 19.79 0 011.08 3.4 2 2 0 013.06 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121 16z" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "#002b57" }}>AI Voice Call</p>
                      <p className="text-[10px]" style={{ color: "#0057ad" }}>In progress…</p>
                    </div>
                  </div>
                  {/* soundwave */}
                  <div className="flex items-center justify-center gap-1 h-8">
                    {[12,20,28,36,28,20,12,18,26,18].map((h, i) => (
                      <div key={i} className="wave-bar rounded-full"
                        style={{ width: "3px", height: `${h}px`, background: "#0057ad", opacity: .75 }} />
                    ))}
                  </div>
                  <p className="text-[10px] text-center mt-2 font-medium" style={{ color: "#1d5aa6" }}>
                    Rahul Kumar · 01:42
                  </p>
                </div>

                {/* notification card */}
                <div className="msg-5 rounded-2xl border-2 p-4 flex flex-col gap-2.5"
                  style={{ background: "#fff", borderColor: "#cce5ff" }}>
                  <p className="text-xs font-bold" style={{ color: "#002b57" }}>Live Notifications</p>
                  {[
                    { icon: "💬", text: "Priya replied on WhatsApp", time: "now" },
                    { icon: "📧", text: "Email opened — Amit S.", time: "1m" },
                    { icon: "📲", text: "Instagram DM sent", time: "3m" },
                  ].map((n) => (
                    <div key={n.text} className="flex items-center gap-2">
                      <span className="text-sm">{n.icon}</span>
                      <p className="text-[10px] flex-1 truncate font-medium" style={{ color: "#1d5aa6" }}>{n.text}</p>
                      <span className="text-[10px] shrink-0" style={{ color: "#99ccff" }}>{n.time}</span>
                    </div>
                  ))}
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
          {engagementStats.map((s, i) => (
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
          MULTI-CHANNEL SECTION
      ══════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Multi-Channel
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            One AI. Every Channel. Zero Gaps.
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
            Your customers are everywhere — WhatsApp, email, social, and phone.
            Your AI is already there waiting for them.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((ch, i) => (
            <FadeIn key={ch.name} delay={i * 100}>
              <div className="channel-card rounded-2xl border-2 p-6 flex flex-col gap-4 h-full cursor-default"
                style={{ background: "#fff", borderColor: ch.border }}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: ch.bg, color: ch.color }}>
                    {ch.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: ch.bg, color: ch.color }}>{ch.tag}</span>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1"
                    style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{ch.name}</h3>
                  <p className="text-xs font-semibold" style={{ color: ch.color }}>{ch.stat}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: ch.color }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                  AI-managed
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* connection visual strip */}
        <FadeIn delay={200} className="mt-10">
          <div className="rounded-2xl border-2 px-6 py-5 overflow-x-auto"
            style={{ background: "#f8fcff", borderColor: "#cce5ff" }}>
            <div className="flex items-center gap-3 min-w-max justify-center">
              {["Customer Signal", "AI Intent Engine", "Channel Router", "Personalised Message", "Engagement Logged"].map((node, i, arr) => (
                <React.Fragment key={node}>
                  <div className="px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap"
                    style={{
                      background: i % 2 === 0 ? "#e6f2ff" : "#0066cc",
                      color: i % 2 === 0 ? "#002b57" : "#fff",
                    }}>
                    {node}
                  </div>
                  {i < arr.length - 1 && (
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M0 6h16M12 1l6 5-6 5" stroke="#66b2ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════
          ENGAGEMENT WORKFLOW
      ══════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f0f8ff,#e6f2ff)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              Engagement Workflow
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              How Every Interaction is Handled
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
              From the first signal to a confirmed conversion — the entire customer journey runs automatically.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {workflowSteps.map((s, i) => (
              <FadeIn key={s.step} delay={i * 100}>
                <div className="card-lift rounded-2xl border-2 p-6 flex gap-4 items-start h-full"
                  style={{ background: "#fff", borderColor: s.bg === "#e6f2ff" ? "#99ccff" : s.bg }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: s.bg }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.step}</span>
                      <h3 className="font-bold text-base leading-snug"
                        style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>{s.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════ */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>
            Features
          </span>
          <h2 className="mt-4 text-3xl font-extrabold"
            style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
            Built for Seamless Customer Engagement
          </h2>
          <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: "#1d5aa6" }}>
            Every tool your team needs — automated, personalised, and running without intervention.
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

        {/* engagement tracker visual */}
        <FadeIn delay={150} className="mt-10">
          <div className="rounded-3xl border-2 p-8 relative overflow-hidden"
            style={{ background: "#fff", borderColor: "#cce5ff" }}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[.07] pointer-events-none"
              style={{ background: "radial-gradient(circle,#0066cc,transparent 70%)", transform: "translate(30%,-30%)" }} />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#0066cc" }}>
                  Real-Time Engagement Tracking
                </p>
                <h3 className="text-2xl font-extrabold mb-4"
                  style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
                  Know exactly where
                  <br />every customer stands
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#1d5aa6" }}>
                  Every message sent, call made, and link clicked is captured live —
                  so your team always has perfect context before any interaction.
                </p>
              </div>

              {/* engagement feed */}
              <div className="space-y-3">
                {[
                  { channel: "WhatsApp", name: "Priya Sharma", event: "Message opened + replied", score: 92, color: "#0066cc", bg: "#e6f2ff" },
                  { channel: "Voice", name: "Rahul Kumar", event: "Call answered · 3m 12s", score: 78, color: "#0057ad", bg: "#cce5ff" },
                  { channel: "Email", name: "Neha Patel", event: "Email opened · link clicked", score: 65, color: "#00478f", bg: "#b3d5ff" },
                  { channel: "Instagram", name: "Karan Mehta", event: "DM reply received", score: 55, color: "#003871", bg: "#8dc0ff" },
                ].map((row) => (
                  <div key={row.name} className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: "#f8fcff" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: row.bg, color: row.color }}>{row.channel[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: "#002b57" }}>{row.name}</p>
                      <p className="text-[10px] truncate" style={{ color: "#1d5aa6" }}>{row.event}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-extrabold" style={{ color: row.color }}>{row.score}</p>
                      <p className="text-[10px]" style={{ color: "#99ccff" }}>score</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: row.color }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════
          AI AGENTS
      ══════════════════════════════════ */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#f0f8ff,#e6f2ff)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#cce5ff", color: "#0057ad" }}>
              AI Agents
            </span>
            <h2 className="mt-4 text-3xl font-extrabold"
              style={{ fontFamily: "'Sora',sans-serif", color: "#002b57" }}>
              Three Agents. Complete Coverage.
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#1d5aa6" }}>
              Each agent is a specialist — together, they handle every customer touchpoint without human input.
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

                  {/* capability chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {a.capabilities.map((cap) => (
                      <span key={cap} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{ background: a.bg, color: a.color }}>
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-5 border-t flex items-center gap-2 text-xs font-medium"
                    style={{ borderColor: "#e6f2ff", color: a.color }}>
                    <span className="w-2 h-2 rounded-full ping-dot" style={{ background: a.color }} />
                    Active 24 / 7
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
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
                Start Engaging Smarter
              </span>

              <h2 className="text-3xl font-extrabold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Sora',sans-serif" }}>
                Every missed message
                <br />is a missed customer.
              </h2>

              <p className="text-base mb-10" style={{ color: "#b3d5ff" }}>
                Deploy your AI engagement team across all channels in minutes.
                No code, no complexity — just faster, smarter customer connections at scale.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary px-9 py-4 rounded-xl font-semibold text-base"
                  style={{ background: "white", color: "#0066cc" }}>
                  Activate AI Engagement
                </button>
                <button className="px-9 py-4 rounded-xl font-semibold text-base border-2 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "white", background: "rgba(255,255,255,0.08)" }}>
                  Book a Live Demo
                </button>
              </div>

              <p className="mt-7 text-sm" style={{ color: "#66b2ff" }}>
                No credit card required · Go live in &lt; 10 minutes · Cancel anytime
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}