"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Inline SVG Illustrations ─────────────────────────────────────── */

const DashboardIllustration = () => (
  <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Card background */}
    <rect x="0" y="0" width="520" height="340" rx="20" fill="#f0f7ff" />

    {/* Top bar */}
    <rect x="0" y="0" width="520" height="48" rx="20" fill="#0066cc" />
    <rect x="16" y="16" width="80" height="16" rx="4" fill="white" fillOpacity="0.3" />
    <circle cx="484" cy="24" r="10" fill="white" fillOpacity="0.2" />
    <circle cx="456" cy="24" r="10" fill="white" fillOpacity="0.2" />

    {/* Stat cards */}
    <rect x="16" y="64" width="110" height="72" rx="10" fill="white" />
    <rect x="16" y="72" width="50" height="8" rx="3" fill="#cce5ff" />
    <rect x="16" y="88" width="70" height="20" rx="4" fill="#0066cc" />
    <rect x="16" y="114" width="40" height="8" rx="3" fill="#66b2ff" fillOpacity="0.6" />

    <rect x="140" y="64" width="110" height="72" rx="10" fill="white" />
    <rect x="140" y="72" width="50" height="8" rx="3" fill="#cce5ff" />
    <rect x="140" y="88" width="70" height="20" rx="4" fill="#1a7ae6" />
    <rect x="140" y="114" width="40" height="8" rx="3" fill="#3399ff" fillOpacity="0.6" />

    <rect x="264" y="64" width="110" height="72" rx="10" fill="white" />
    <rect x="264" y="72" width="50" height="8" rx="3" fill="#cce5ff" />
    <rect x="264" y="88" width="70" height="20" rx="4" fill="#0057ad" />
    <rect x="264" y="114" width="40" height="8" rx="3" fill="#3399ff" fillOpacity="0.6" />

    <rect x="388" y="64" width="116" height="72" rx="10" fill="white" />
    <rect x="388" y="72" width="50" height="8" rx="3" fill="#cce5ff" />
    <rect x="388" y="88" width="70" height="20" rx="4" fill="#0066cc" fillOpacity="0.7" />
    <rect x="388" y="114" width="40" height="8" rx="3" fill="#66b2ff" fillOpacity="0.6" />

    {/* Bar chart */}
    <rect x="16" y="152" width="230" height="170" rx="10" fill="white" />
    <rect x="28" y="162" width="80" height="10" rx="3" fill="#99ccff" />
    {/* Bars */}
    <rect x="36" y="248" width="22" height="56" rx="4" fill="#cce5ff" />
    <rect x="70" y="228" width="22" height="76" rx="4" fill="#66b2ff" />
    <rect x="104" y="210" width="22" height="94" rx="4" fill="#3399ff" />
    <rect x="138" y="198" width="22" height="106" rx="4" fill="#1a7ae6" />
    <rect x="172" y="218" width="22" height="86" rx="4" fill="#0066cc" />
    <rect x="206" y="195" width="22" height="109" rx="4" fill="#0057ad" />

    {/* Line chart */}
    <rect x="260" y="152" width="244" height="170" rx="10" fill="white" />
    <rect x="272" y="162" width="80" height="10" rx="3" fill="#99ccff" />
    {/* Grid lines */}
    <line x1="272" y1="248" x2="492" y2="248" stroke="#e6f2ff" strokeWidth="1" />
    <line x1="272" y1="228" x2="492" y2="228" stroke="#e6f2ff" strokeWidth="1" />
    <line x1="272" y1="208" x2="492" y2="208" stroke="#e6f2ff" strokeWidth="1" />
    {/* Line */}
    <polyline points="272,290 302,270 332,260 362,245 392,232 422,218 452,200 482,188" stroke="#0066cc" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="272,290 302,270 332,260 362,245 392,232 422,218 452,200 482,188" stroke="#0066cc" strokeWidth="0" fill="url(#lineGrad)" fillOpacity="0.15"/>
    {/* Area fill */}
    <polygon points="272,310 272,290 302,270 332,260 362,245 392,232 422,218 452,200 482,188 482,310" fill="#0066cc" fillOpacity="0.08" />
    {/* Dots */}
    {[272, 302, 332, 362, 392, 422, 452, 482].map((x, i) => {
      const ys = [290, 270, 260, 245, 232, 218, 200, 188];
      return <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="white" stroke="#0066cc" strokeWidth="2" />;
    })}

    <defs>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0066cc" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#0066cc" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Floating badge */}
    <rect x="360" y="248" width="120" height="36" rx="8" fill="#0066cc" />
    <rect x="368" y="256" width="50" height="8" rx="3" fill="white" fillOpacity="0.6" />
    <rect x="368" y="268" width="30" height="8" rx="3" fill="white" />
  </svg>
);

const ScanningIllustration = () => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="0" y="0" width="320" height="220" rx="16" fill="#f0f7ff" />
    {/* Central AI circle */}
    <circle cx="160" cy="110" r="42" fill="white" stroke="#0066cc" strokeWidth="2" />
    <circle cx="160" cy="110" r="30" fill="#e6f2ff" />
    <circle cx="160" cy="110" r="20" fill="#0066cc" fillOpacity="0.2" />
    <text x="160" y="116" textAnchor="middle" fill="#0066cc" fontSize="14" fontWeight="700">AI</text>

    {/* Orbiting source nodes */}
    {[
      { label: "Web", x: 80, y: 60 },
      { label: "SQL", x: 240, y: 60 },
      { label: "API", x: 60, y: 150 },
      { label: "Social", x: 250, y: 150 },
    ].map(({ label, x, y }) => (
      <g key={label}>
        <line x1={x + 16} y1={y + 16} x2="160" y2="110" stroke="#99ccff" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x={x} y={y} width="50" height="32" rx="8" fill="white" stroke="#cce5ff" strokeWidth="1.5" />
        <text x={x + 25} y={y + 21} textAnchor="middle" fill="#0066cc" fontSize="11" fontWeight="600">{label}</text>
      </g>
    ))}

    {/* Pulse rings */}
    <circle cx="160" cy="110" r="55" stroke="#0066cc" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 4" />
    <circle cx="160" cy="110" r="70" stroke="#0066cc" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3 6" />
  </svg>
);

const PipelineIllustration = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="0" y="0" width="320" height="180" rx="16" fill="#f0f7ff" />
    {/* Pipeline stages */}
    {[
      { x: 16, label: "Raw Data", color: "#cce5ff", text: "#0066cc" },
      { x: 90, label: "Extract", color: "#99ccff", text: "#0057ad" },
      { x: 164, label: "Clean", color: "#66b2ff", text: "#00478f" },
      { x: 238, label: "CRM", color: "#0066cc", text: "white" },
    ].map(({ x, label, color, text }) => (
      <g key={label}>
        <rect x={x} y="70" width="66" height="40" rx="8" fill={color} />
        <text x={x + 33} y="95" textAnchor="middle" fill={text} fontSize="11" fontWeight="600">{label}</text>
        {x < 238 && (
          <path d={`M${x + 66} 90 L${x + 78} 90`} stroke="#3399ff" strokeWidth="2" markerEnd="url(#arrow)" />
        )}
      </g>
    ))}

    {/* Flow arrows */}
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#3399ff" />
      </marker>
    </defs>

    {/* Data dots flowing */}
    {[30, 104, 178].map((x, i) => (
      <circle key={i} cx={x + 44} cy="130" r="5" fill="#0066cc" fillOpacity={0.6 - i * 0.1} />
    ))}

    {/* Labels */}
    <text x="160" y="22" textAnchor="middle" fill="#0066cc" fontSize="13" fontWeight="700">Data Pipeline Flow</text>
    <text x="160" y="165" textAnchor="middle" fill="#3399ff" fontSize="10">Automated · Real-time · Intelligent</text>
  </svg>
);

/* ─── Counter animation ─────────────────────────────────────────────── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Intersection observer hook ───────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Feature Icons ─────────────────────────────────────────────────── */
const icons = {
  extraction: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  realtime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  clean: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  integrate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" /><path d="M12 8v4l3 3" />
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

/* ─── Data ──────────────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    icon: "🌐",
    title: "Multi-Source Scanning",
    desc: "AI agents continuously scan websites, social platforms, databases, and APIs to identify relevant business data and lead signals.",
  },
  {
    num: "02",
    icon: "⚡",
    title: "Intelligent Extraction",
    desc: "Deep extraction of lead data, contact information, company insights, and behavioral signals with 99.2% accuracy.",
  },
  {
    num: "03",
    icon: "✨",
    title: "Clean & Structure",
    desc: "Automatically deduplicates, normalizes, and enriches raw data into structured, CRM-ready lead profiles.",
  },
  {
    num: "04",
    icon: "📤",
    title: "Deliver to Your CRM",
    desc: "Push verified, high-intent leads directly into your CRM, sales pipeline, or custom workflow — no manual work needed.",
  },
];

const features = [
  { icon: icons.extraction, title: "Smart Data Extraction", desc: "Scrapes and parses structured data from any source — HTML, JSON feeds, PDFs, and dynamic JavaScript pages." },
  { icon: icons.realtime, title: "Real-Time Lead Discovery", desc: "Continuously monitors the web for new leads matching your ideal customer profile and delivers instant alerts." },
  { icon: icons.clean, title: "Automated Data Cleaning", desc: "Deduplication, validation, and normalization pipelines ensure every lead record is accurate and actionable." },
  { icon: icons.integrate, title: "Multi-Source Integration", desc: "Connects to 50+ data sources including LinkedIn, Crunchbase, Google, industry databases, and custom APIs." },
  { icon: icons.ai, title: "AI-Powered Scoring", desc: "Machine learning ranks leads by intent signals, engagement patterns, and fit score to prioritize outreach." },
  { icon: icons.crm, title: "CRM Auto-Sync", desc: "Native integrations with Salesforce, HubSpot, Pipedrive, and more. Leads flow straight to your pipeline." },
];

const agents = [
  {
    name: "AI Data Mining Agent",
    emoji: "🤖",
    color: "from-[#e6f2ff] to-[#cce5ff]",
    accent: "#0066cc",
    badge: "Core Engine",
    role: "Autonomous data discovery",
    bullets: ["Crawls 10,000+ pages/hour", "Structured + unstructured data", "Adaptive learning from patterns", "Bypass rate-limit with smart rotation"],
  },
  {
    name: "AI Lead Capture Agent",
    emoji: "🎯",
    color: "from-[#e6f2ff] to-[#b3d5ff]",
    accent: "#0057ad",
    badge: "Lead Engine",
    role: "High-intent prospect identification",
    bullets: ["Real-time buyer intent signals", "ICP scoring & filtering", "Contact data enrichment", "Automated follow-up triggers"],
  },
  {
    name: "AI SEO Content Agent",
    emoji: "📝",
    color: "from-[#eef6ff] to-[#cce5ff]",
    accent: "#1a7ae6",
    badge: "Growth Engine",
    role: "Content-driven lead generation",
    bullets: ["Keyword-optimized content creation", "Competitor gap analysis", "Topical authority building", "Automated publishing pipeline"],
  },
];

const stats = [
  { value: 340, suffix: "%", label: "Increase in Lead Volume" },
  { value: 87, suffix: "%", label: "Reduction in Manual Work" },
  { value: 12, suffix: "x", label: "Faster Pipeline Filling" },
  { value: 99, suffix: "%", label: "Data Accuracy Rate" },
];

/* ─── Page Component ────────────────────────────────────────────────── */
export default function AIDataMiningPage() {
  const statsRef = useInView(0.3);

  const c0 = useCounter(stats[0].value, 2000, statsRef.inView);
  const c1 = useCounter(stats[1].value, 2000, statsRef.inView);
  const c2 = useCounter(stats[2].value, 2000, statsRef.inView);
  const c3 = useCounter(stats[3].value, 2000, statsRef.inView);
  const counters = [c0, c1, c2, c3];

  return (
    <div
      className="min-h-screen bg-white text-gray-900 overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Syne:wght@700;800&display=swap');

        .hero-headline { font-family: 'Syne', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scan-line {
          0% { top: 0; opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { top: 100%; opacity: 0; }
        }

        .float { animation: float 4s ease-in-out infinite; }
        .float-delayed { animation: float 4s ease-in-out 1s infinite; }
        .slide-up { animation: slide-up 0.7s ease forwards; }
        .fade-in { animation: fade-in 0.8s ease forwards; }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0, 102, 204, 0.15);
        }

        .gradient-text {
          background: linear-gradient(135deg, #0066cc 0%, #3399ff 50%, #0057ad 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-grid {
          background-image:
            linear-gradient(rgba(0, 102, 204, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 204, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .shimmer-btn {
          background: linear-gradient(110deg, #0066cc 40%, #3399ff 50%, #0066cc 60%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .step-connector::after {
          content: '';
          position: absolute;
          top: 28px;
          left: calc(100% + 8px);
          width: calc(100% - 16px);
          height: 2px;
          background: linear-gradient(90deg, #0066cc, #99ccff);
          border-radius: 1px;
        }

        .agent-glow:hover {
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2), 0 24px 64px rgba(0, 102, 204, 0.12);
        }

        .marquee-track { animation: marquee 20s linear infinite; }

        .scan-overlay::after {
          content: '';
          position: absolute;
          left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #0066cc, transparent);
          animation: scan-line 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex  flex-col justify-center overflow-hidden hero-grid pt-24 pb-20">
        {/* Background blobs */}
        <div className="absolute top-[-120px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #0066cc 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #3399ff 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full ">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-600 mb-8"
                style={{ background: "#e6f2ff", color: "#0066cc", border: "1px solid #cce5ff" }}>
                <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse inline-block" />
                Powered by Autonomous AI Agents
              </div>

              <h1 className="hero-headline text-5xl lg:text-6xl xl:text-7xl font-800 leading-[1.05] tracking-tight mb-6">
                Turn Raw Data
                <br />
                <span className="gradient-text">Into Revenue</span>
                <br />
                with AI
              </h1>

              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
                Automatically discover, extract, and organize high-quality leads using intelligent AI agents — across the entire web, at scale, around the clock.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="shimmer-btn text-white font-600 px-8 py-4 rounded-xl text-base shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-shadow">
                  Start Mining Free →
                </button>
                <button className="flex items-center gap-3 px-8 py-4 rounded-xl text-base font-600 text-gray-700 hover:bg-gray-50 transition-colors"
                  style={{ border: "1.5px solid #e2e8f0" }}>
                  <span className="w-10 h-10 rounded-full bg-[#e6f2ff] flex items-center justify-center text-[#0066cc]">▶</span>
                  Watch Demo
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 mt-10 pt-10" style={{ borderTop: "1px solid #f1f5f9" }}>
                <div className="flex -space-x-2">
                  {["#0066cc", "#1a7ae6", "#3399ff", "#66b2ff", "#99ccff"].map((c, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-700"
                      style={{ background: c, zIndex: 5 - i }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <p className="text-sm text-gray-500"><strong className="text-gray-800">2,400+</strong> teams mining leads with AI</p>
                </div>
              </div>
            </div>

            {/* Right illustration */}
            <div className="relative hidden lg:block">
              <div className="float">
                <div className="w-full aspect-[520/340] rounded-2xl overflow-hidden shadow-2xl shadow-blue-100">
                  <DashboardIllustration />
                </div>
              </div>

              {/* Floating cards */}
              <div className="float-delayed absolute -left-8 top-1/3 bg-white rounded-2xl px-5 py-4 shadow-xl"
                style={{ border: "1px solid #e6f2ff" }}>
                <div className="text-xs text-gray-400 mb-1">New Leads Today</div>
                <div className="text-2xl font-800" style={{ color: "#0066cc" }}>+847</div>
                <div className="text-xs text-green-500 font-600">↑ 23% vs yesterday</div>
              </div>

              <div className="absolute -right-4 bottom-16 bg-white rounded-2xl px-5 py-4 shadow-xl"
                style={{ border: "1px solid #e6f2ff" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-600 text-gray-600">Agents Running</span>
                </div>
                <div className="text-xl font-800 mt-1" style={{ color: "#0066cc" }}>3 / 3 Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee logo strip ── */}
      <div className="py-6 overflow-hidden border-y" style={{ borderColor: "#f0f7ff", background: "#fafcff" }}>
        <div className="flex gap-0 marquee-track whitespace-nowrap">
          {[...Array(2)].map((_, outer) => (
            <div key={outer} className="flex gap-16 px-8 items-center">
              {["Salesforce", "HubSpot", "LinkedIn", "Crunchbase", "Google", "Pipedrive", "ZoomInfo", "Clearbit"].map(s => (
                <span key={s} className="text-sm font-600" style={{ color: "#99ccff" }}>{s}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          2. HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-600 mb-4"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>How It Works</span>
          <h2 className="hero-headline text-4xl lg:text-5xl font-800 text-gray-900 mb-4">
            From Raw Web to Revenue-Ready Leads
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Four intelligent steps, fully automated. From discovery to delivery in minutes, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative group card-hover bg-white rounded-2xl p-7"
              style={{ border: "1.5px solid #e6f2ff", boxShadow: "0 4px 24px rgba(0,102,204,0.06)" }}>
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-6 h-0.5 z-10"
                  style={{ background: "linear-gradient(90deg, #99ccff, #cce5ff)" }} />
              )}

              <div className="flex items-start justify-between mb-5">
                <span className="text-4xl">{step.icon}</span>
                <span className="text-sm font-800" style={{ color: "#cce5ff" }}>{step.num}</span>
              </div>

              <h3 className="text-lg font-700 text-gray-900 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(90deg, #0066cc, #66b2ff)" }} />
            </div>
          ))}
        </div>

        {/* Pipeline Illustration */}
        <div className="mt-16 rounded-3xl overflow-hidden p-8" style={{ background: "#f8fbff", border: "1px solid #e6f2ff" }}>
          <div className="max-w-xl mx-auto">
            <PipelineIllustration />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. KEY FEATURES
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-12" style={{ background: "#f8fbff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-600 mb-4"
                style={{ background: "#e6f2ff", color: "#0066cc" }}>Platform Features</span>
              <h2 className="hero-headline text-4xl lg:text-5xl font-800 text-gray-900 mb-6">
                Everything You Need to
                <br />
                <span className="gradient-text">Mine Smarter</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10">
                An end-to-end intelligence layer that finds, filters, and delivers the right leads — automatically, with enterprise-grade reliability.
              </p>
              <div className="aspect-[320/180] rounded-2xl overflow-hidden shadow-lg">
                <ScanningIllustration />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl p-6 group cursor-default"
                  style={{ border: "1.5px solid #e6f2ff", boxShadow: "0 2px 16px rgba(0,102,204,0.05)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-[#0066cc]"
                    style={{ background: "#e6f2ff", color: "#0066cc" }}>
                    <div className="group-hover:text-white transition-colors">{f.icon}</div>
                  </div>
                  <h3 className="font-700 text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. AI AGENTS SECTION
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-600 mb-4"
            style={{ background: "#e6f2ff", color: "#0066cc" }}>Intelligent Agents</span>
          <h2 className="hero-headline text-4xl lg:text-5xl font-800 text-gray-900 mb-4">
            Three AI Agents. One Unstoppable Pipeline.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Each agent handles a specialized role, coordinating autonomously to deliver leads from source to CRM without human intervention.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <div
              key={i}
              className="agent-glow card-hover relative rounded-3xl overflow-hidden cursor-default"
              style={{ border: "1.5px solid #e6f2ff" }}
            >
              {/* Header gradient */}
              <div className={`bg-gradient-to-br ${agent.color} p-8 pb-10`}>
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl">{agent.emoji}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-700"
                    style={{ background: "rgba(255,255,255,0.7)", color: agent.accent }}>
                    {agent.badge}
                  </span>
                </div>
                <h3 className="text-xl font-800 text-gray-900 mb-1">{agent.name}</h3>
                <p className="text-sm font-500" style={{ color: agent.accent }}>{agent.role}</p>
              </div>

              {/* Body */}
              <div className="bg-white p-8 pt-6" style={{ marginTop: "-8px", borderRadius: "16px 16px 0 0" }}>
                <ul className="space-y-3">
                  {agent.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#e6f2ff" }}>
                        <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                          <polyline points="2,6 5,9 10,3" stroke={agent.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>

                <button className="mt-8 w-full py-3 rounded-xl text-sm font-700 transition-all hover:opacity-90"
                  style={{ background: "#e6f2ff", color: agent.accent }}>
                  Explore Agent →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. BENEFITS / RESULTS
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-12" style={{ background: "#f8fbff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-600 mb-4"
              style={{ background: "#e6f2ff", color: "#0066cc" }}>Proven Results</span>
            <h2 className="hero-headline text-4xl lg:text-5xl font-800 text-gray-900 mb-4">
              Numbers That Speak for Themselves
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Businesses using our AI Data Mining Platform see measurable impact from day one.
            </p>
          </div>

          {/* Stats counter */}
          <div ref={statsRef.ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center card-hover"
                style={{ border: "1.5px solid #e6f2ff", boxShadow: "0 4px 24px rgba(0,102,204,0.06)" }}>
                <div className="hero-headline text-5xl font-800 mb-2"
                  style={{ color: "#0066cc" }}>
                  {counters[i]}{s.suffix}
                </div>
                <div className="text-sm text-gray-500 font-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Outcome cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { emoji: "🚀", title: "10x Pipeline Velocity", desc: "Fill your CRM with qualified leads weeks faster than manual research. Your sales team closes while AI prospecting never stops." },
              { emoji: "🎯", title: "Zero Wasted Outreach", desc: "AI-scored leads mean your reps only contact decision-makers who match your ICP — dramatically improving reply rates." },
              { emoji: "📈", title: "Compounding Data Moat", desc: "Every scan enriches your proprietary dataset. The longer you run it, the smarter and more accurate the AI becomes." },
            ].map((card, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-8 group"
                style={{ border: "1.5px solid #e6f2ff", boxShadow: "0 4px 24px rgba(0,102,204,0.06)" }}>
                <div className="text-4xl mb-5">{card.emoji}</div>
                <h3 className="text-xl font-700 text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. FINAL CTA SECTION
      ══════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-14 text-center"
            style={{ background: "linear-gradient(135deg, #003871 0%, #0066cc 50%, #1a7ae6 100%)" }}>
            {/* BG decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(-30%, 30%)" }} />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-600 mb-8"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
                🚀 &nbsp; Start mining leads in under 5 minutes
              </div>

              <h2 className="hero-headline text-4xl lg:text-5xl font-800 text-white mb-5 leading-tight">
                Ready to Put Your
                <br />Lead Generation on Autopilot?
              </h2>

              <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
                Join 2,400+ businesses already using AI agents to extract, clean, and deliver high-quality leads — automatically, 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white font-700 px-10 py-4 rounded-xl text-base transition-all hover:scale-105 hover:shadow-xl"
                  style={{ color: "#0066cc" }}>
                  Start Free Trial →
                </button>
                <button className="font-600 px-10 py-4 rounded-xl text-base transition-all hover:bg-white hover:bg-opacity-10"
                  style={{ color: "white", border: "1.5px solid rgba(255,255,255,0.35)" }}>
                  Book a Demo
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mt-10 text-blue-200 text-sm">
                <span>✓ No credit card required</span>
                <span>✓ 14-day free trial</span>
                <span>✓ Cancel anytime</span>
                <span>✓ SOC 2 compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      {/* <div className="py-6 text-center text-sm text-gray-400" style={{ borderTop: "1px solid #f0f7ff" }}>
        © {new Date().getFullYear()} AI Data Mining Solution. All rights reserved.
      </div> */}
    </div>
  );
}