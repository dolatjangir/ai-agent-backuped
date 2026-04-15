"use client";

import { useState, useEffect, CSSProperties, FC } from "react";

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  image: string;
  rating: number;
  agentUsed: string;
  metric: string;
  metricLabel: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

interface StatItemProps {
  value: string;
  label: string;
}

/* ─── Design tokens – light theme ────────────────────────────────────────── */
const C = {
  pageBg:          "#f0f6ff",
  surface:         "#ffffff",
  surfaceActive:   "#eaf2ff",
  border:          "rgba(0,102,204,.13)",
  borderHover:     "rgba(0,102,204,.32)",
  borderActive:    "rgba(0,102,204,.55)",
  borderTopRule:   "rgba(0,102,204,.1)",
  primary:         "#0066cc",
  primary500:      "#1a7ae6",
  primary400:      "#3399ff",
  primary200:      "#99ccff",
  primary100:      "#cce5ff",
  primary50:       "#e6f2ff",
  textHeading:     "#001e42",
  textBody:        "#1a4978",
  textMuted:       "#5580a8",
  textFaint:       "#92b3d0",
  success:         "#0a9e72",
  warnStar:        "#f59e0b",
  white:           "#ffffff",
};

/* ─── Testimonial data ────────────────────────────────────────────────────── */
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "We were missing high-intent leads because our response time was slow. After deploying EstateAI, every enquiry gets an instant reply — and our conversions jumped within days.",
    name: "Rohit Sharma",
    role: "Real Estate Consultant",
    company: "Jaipur Realty Hub",
    location: "Jaipur, India",
    image: "https://i.pravatar.cc/96?img=11",
    rating: 5,
    agentUsed: "Lead Qualification Agent",
    metric: "+42%",
    metricLabel: "Lead conversion",
  },
  {
    id: 2,
    quote:
      "Our team used to manually follow up with every lead. Now the AI handles everything — calls, WhatsApp replies, and booking site visits. It feels like having a 24/7 sales team.",
    name: "Ankit Verma",
    role: "Sales Manager",
    company: "UrbanNest Properties",
    location: "Delhi, India",
    image: "https://i.pravatar.cc/96?img=32",
    rating: 5,
    agentUsed: "Follow-up Automation",
    metric: "3x",
    metricLabel: "Faster response",
  },
  {
    id: 3,
    quote:
      "The biggest win for us was never missing a lead again. Even at midnight, prospects get instant answers and property details. That alone increased our bookings.",
    name: "Priya Mehta",
    role: "Property Advisor",
    company: "Elite Homes",
    location: "Mumbai, India",
    image: "https://i.pravatar.cc/96?img=25",
    rating: 5,
    agentUsed: "Comms Agent",
    metric: "24/7",
    metricLabel: "Lead engagement",
  },
  {
    id: 4,
    quote:
      "EstateAI helped us qualify serious buyers automatically. Now our team only talks to high-quality leads — saving time and closing deals faster.",
    name: "Vikas Singh",
    role: "Broker",
    company: "Prime Estate Solutions",
    location: "Gurgaon, India",
    image: "https://i.pravatar.cc/96?img=45",
    rating: 5,
    agentUsed: "Lead Scoring AI",
    metric: "+60%",
    metricLabel: "Qualified leads",
  },
  {
    id: 5,
    quote:
      "We reduced manual work by almost 70%. From handling enquiries to scheduling visits, everything is automated. Our team now focuses only on closing deals.",
    name: "Neha Kapoor",
    role: "Operations Head",
    company: "Skyline Developers",
    location: "Pune, India",
    image: "https://i.pravatar.cc/96?img=56",
    rating: 5,
    agentUsed: "Workflow Automation",
    metric: "−70%",
    metricLabel: "Manual effort",
  },
  {
    id: 6,
    quote:
      "Before EstateAI, we used to lose leads to faster competitors. Now we respond instantly, every time — and we've seen a clear boost in revenue.",
    name: "Aman Jain",
    role: "Founder",
    company: "NextGen Realty",
    location: "Bangalore, India",
    image: "https://i.pravatar.cc/96?img=8",
    rating: 5,
    agentUsed: "AI Sales Agent",
    metric: "+28%",
    metricLabel: "Revenue growth",
  },
];

const STATS: StatItemProps[] = [
  { value: "5k+",  label: "Leads handled daily" },
  { value: "98%",  label: "Response rate" },
  { value: "2x",   label: "Faster conversions" },
  { value: "24/7", label: "AI availability" },
];
const TICKER_LINES: string[] = [
  "Live result · Lead AI · Jaipur",
  "Live result · Follow-up AI · Delhi",
  "Live result · Comms Agent · Mumbai",
  "Live result · Sales AI · Bangalore",
];

/* ─── StarRating ──────────────────────────────────────────────────────────── */
const StarRating: FC<{ rating: number }> = ({ rating }) => (
  <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 16 16"
        fill={i < rating ? C.warnStar : "rgba(245,158,11,.2)"} aria-hidden="true">
        <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z" />
      </svg>
    ))}
  </div>
);

/* ─── AgentBadge ──────────────────────────────────────────────────────────── */
const AgentBadge: FC<{ label: string }> = ({ label }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase",
    fontWeight: 700, padding: "3px 9px", borderRadius: 20,
    color: C.primary, background: C.primary50,
    border: `1px solid ${C.border}`, fontFamily: "monospace",
  }}>
    <span style={{
      width: 5, height: 5, borderRadius: "50%",
      background: C.primary, flexShrink: 0,
      animation: "tl-pulse 1.4s ease infinite",
    }} />
    {label}
  </div>
);

/* ─── MetricChip ──────────────────────────────────────────────────────────── */
const MetricChip: FC<{ value: string; label: string }> = ({ value, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, flexShrink: 0 }}>
    <span style={{
      fontSize: 20, fontWeight: 800, color: C.primary,
      lineHeight: 1, fontFamily: "system-ui, sans-serif", letterSpacing: "-.5px",
    }}>{value}</span>
    <span style={{
      fontSize: 9, color: C.textMuted, textTransform: "uppercase",
      letterSpacing: ".08em", fontFamily: "monospace", textAlign: "right",
    }}>{label}</span>
  </div>
);

/* ─── TestimonialCard ─────────────────────────────────────────────────────── */
const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial, index, isActive, onClick }) => {
  const cardStyle: CSSProperties = {
    background: isActive ? C.surfaceActive : C.surface,
    border: `1px solid ${isActive ? C.borderActive : C.border}`,
    borderRadius: 16,
    padding: "18px 18px 16px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "border-color .25s, transform .2s, box-shadow .25s",
    transform: isActive ? "translateY(-3px)" : "translateY(0)",
    boxShadow: isActive
      ? `0 0 0 3px ${C.primary100}, 0 8px 28px rgba(0,102,204,.1)`
      : "0 1px 6px rgba(0,60,120,.06), 0 4px 16px rgba(0,60,120,.04)",
    animationDelay: `${index * 75}ms`,
    animation: "tl-fadeIn .45s ease both",
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {/* Top gradient accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: isActive
          ? `linear-gradient(90deg,${C.primary},${C.primary400})`
          : "transparent",
        borderRadius: "16px 16px 0 0",
        transition: "background .3s",
      }} />

      {/* Active inner glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isActive
          ? `radial-gradient(ellipse at top left,${C.primary50} 0%,transparent 55%)`
          : "transparent",
        transition: "background .3s", borderRadius: 16,
      }} />

      <div style={{ position: "relative" }}>
        {/* Badge + metric row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <AgentBadge label={testimonial.agentUsed} />
          <MetricChip value={testimonial.metric} label={testimonial.metricLabel} />
        </div>

        <StarRating rating={testimonial.rating} />

        {/* Quote */}
        <p style={{
          fontSize: 13.5, color: C.textBody, lineHeight: 1.72,
          marginBottom: 16, fontFamily: "system-ui, sans-serif",
          fontStyle: "italic",
          borderLeft: `2px solid ${C.primary200}`,
          paddingLeft: 12,
        }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author row */}
        <div style={{
          borderTop: `1px solid ${C.borderTopRule}`,
          paddingTop: 14, display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={testimonial.image} alt={testimonial.name}
              width={42} height={42}
              style={{
                width: 42, height: 42, borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${C.primary100}`,
                display: "block",
              }}
            />
            <div style={{
              position: "absolute", bottom: -1, right: -1,
              width: 14, height: 14, borderRadius: "50%",
              background: C.success, display: "flex",
              alignItems: "center", justifyContent: "center",
              border: `2px solid ${C.surface}`,
            }}>
              <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: C.textHeading,
              fontFamily: "system-ui, sans-serif",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{testimonial.name}</div>
            <div style={{
              fontSize: 11, color: C.textMuted,
              fontFamily: "system-ui, sans-serif",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{testimonial.role} · {testimonial.company}</div>
            <div style={{
              fontSize: 10, color: C.textFaint,
              fontFamily: "monospace", marginTop: 2,
            }}>📍 {testimonial.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── StatItem ────────────────────────────────────────────────────────────── */
const StatItem: FC<StatItemProps> = ({ value, label }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    padding: "14px 22px",
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12, flex: 1, minWidth: 96,
    boxShadow: "0 2px 8px rgba(0,60,120,.05)",
  }}>
    <span style={{
      fontSize: 22, fontWeight: 800, color: C.primary,
      lineHeight: 1, fontFamily: "system-ui, sans-serif", letterSpacing: "-.5px",
    }}>{value}</span>
    <span style={{
      fontSize: 9, color: C.textMuted,
      textTransform: "uppercase", letterSpacing: ".1em",
      fontFamily: "monospace", textAlign: "center",
    }}>{label}</span>
  </div>
);

/* ─── Section ─────────────────────────────────────────────────────────────── */
const TestimonialsSection: FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [ticker, setTicker] = useState<number>(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTicker((n) => (n + 1) % TICKER_LINES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes tl-pulse   { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes tl-fadeIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tl-dotping { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(2.2);opacity:0} }
        @keyframes tl-ticker  { 0%{opacity:0;transform:translateY(5px)} 12%{opacity:1;transform:translateY(0)} 80%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-5px)} }
      `}</style>

      <section
        id="testimonials"
        style={{ background: C.pageBg, padding: "96px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Dot grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, ${C.primary} 1px, transparent 1px)`,
          backgroundSize: "32px 32px", opacity: 0.07,
        }} />

        {/* Glow – top right */}
        <div style={{
          position: "absolute", top: -160, right: -160,
          width: 640, height: 640, borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle,rgba(0,102,204,.08) 0%,transparent 70%)",
        }} />

        {/* Glow – bottom left */}
        <div style={{
          position: "absolute", bottom: -140, left: -120,
          width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle,rgba(51,153,255,.06) 0%,transparent 70%)",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 20px" }}>

            {/* Live badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.primary50,
              border: `1px solid rgba(0,102,204,.22)`,
              color: C.primary, fontSize: 11, letterSpacing: ".12em",
              textTransform: "uppercase", padding: "5px 14px", borderRadius: 20,
              marginBottom: 20, fontFamily: "monospace", fontWeight: 700,
            }}>
              <span style={{ position: "relative", display: "inline-block", width: 8, height: 8 }}>
                <span style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: C.primary, animation: "tl-dotping 1.5s ease infinite",
                }} />
                <span style={{ position: "absolute", inset: 1, borderRadius: "50%", background: C.primary }} />
              </span>
              Verified Client Results
            </div>

            <h2 style={{
              fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: C.textHeading,
              letterSpacing: "-.5px", lineHeight: 1.15, marginBottom: 12,
              fontFamily: "system-ui, sans-serif",
            }}>
              Trusted by{" "}
              <span style={{
                background: `linear-gradient(90deg,${C.primary},${C.primary400})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Property Teams
              </span>{" "}
              Worldwide
            </h2>

            <p style={{ fontSize: 15, color: C.textBody, lineHeight: 1.65, fontFamily: "system-ui, sans-serif" }}>
              Real results from real portfolios. Every metric below was reported
              directly by clients after deploying EstateAI agents.
            </p>
          </div>

          {/* ── Stats ── */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 18 }}>
            {STATS.map((s) => <StatItem key={s.label} value={s.value} label={s.label} />)}
          </div>

          {/* ── Ticker ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginBottom: 40, height: 24, overflow: "hidden",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: C.success, boxShadow: `0 0 6px ${C.success}`,
              flexShrink: 0, animation: "tl-pulse 1.2s ease infinite",
            }} />
            <span key={ticker} style={{
              fontSize: 11, color: C.textMuted, fontFamily: "monospace",
              letterSpacing: ".08em", animation: "tl-ticker 2.8s ease forwards",
            }}>
              {TICKER_LINES[ticker]}
            </span>
          </div>

          {/* ── Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                index={i}
                isActive={activeId === t.id}
                onClick={() => setActiveId((p) => (p === t.id ? null : t.id))}
              />
            ))}
          </div>

          {/* ── Bottom strip ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 14, marginTop: 40, paddingTop: 24,
            borderTop: `1px solid ${C.borderTopRule}`,
          }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              {[
                { icon: "🔒", label: "SOC 2 Certified"  },
                { icon: "✅", label: "Verified Reviews"  },
                { icon: "🌍", label: "42 Countries"      },
              ].map((item) => (
                <span key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 12, color: C.textMuted, fontFamily: "system-ui, sans-serif",
                }}>
                  {item.icon} {item.label}
                </span>
              ))}
            </div>

            <button
              type="button"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "11px 26px", borderRadius: 100,
                background: `linear-gradient(135deg,${C.primary},${C.primary500})`,
                color: C.white, fontWeight: 700, fontSize: 13,
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,102,204,.28)",
                fontFamily: "system-ui, sans-serif",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,102,204,.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,102,204,.28)";
              }}
            >
              Read All Case Studies
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;