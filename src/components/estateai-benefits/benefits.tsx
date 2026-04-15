"use client";

import { useState, useEffect, CSSProperties, FC, MouseEvent } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type AgentStatus = "active" | "busy" | "idle";

interface Agent {
  id: number;
  name: string;
  type: string;
  icon: string;
  status: AgentStatus;
  metric: string;
  metricLabel: string;
  task: string;
  bars: number[];
  description: string;
}

interface StatusConfig {
  label: string;
  dot: string;
  bg: string;
  border: string;
  text: string;
}

interface MiniChartProps {
  bars: number[];
  active: boolean;
}

interface AgentCardProps {
  agent: Agent;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

interface DetailPanelProps {
  agent: Agent;
  onClose: () => void;
}

interface SysStatItem {
  label: string;
  val: string;
  dot: string | null;
}

/* ─── Agent data ─────────────────────────────────────────────────────────── */
const AGENTS: Agent[] = [
  {
    id: 1,
    name: "Lease Assistant",
    type: "Document Helper",
    icon: "📋",
    status: "active",
    metric: "1.2k",
    metricLabel: "Leases handled daily",
    task: "Checking lease details...",
    bars: [4, 7, 5, 8, 9, 6, 8, 10, 7, 9, 8, 10],
    description:
      "Quickly reads and understands lease documents, highlighting important details so you don’t have to go through everything manually.",
  },
  {
    id: 2,
    name: "Maintenance Assistant",
    type: "Smart Alerts",
    icon: "🔧",
    status: "busy",
    metric: "94%",
    metricLabel: "Issue detection rate",
    task: "Checking property condition...",
    bars: [3, 5, 4, 6, 8, 5, 7, 9, 6, 8, 10, 8],
    description:
      "Identifies possible maintenance issues early so you can fix them before they become costly problems.",
  },
  {
    id: 3,
    name: "Tenant Checker",
    type: "Background Check",
    icon: "👤",
    status: "active",
    metric: "340",
    metricLabel: "Checked today",
    task: "Reviewing tenant details...",
    bars: [6, 8, 7, 9, 8, 10, 9, 8, 7, 9, 10, 9],
    description:
      "Checks tenant details quickly and gives you a simple summary to help you make better decisions.",
  },
  {
    id: 4,
    name: "Price Advisor",
    type: "Smart Pricing",
    icon: "📈",
    status: "active",
    metric: "$2.1M",
    metricLabel: "Properties valued",
    task: "Updating property prices...",
    bars: [5, 4, 7, 6, 8, 7, 9, 8, 10, 9, 8, 10],
    description:
      "Helps you set the right price for your properties based on market trends and demand.",
  },
  {
    id: 5,
    name: "Payment Manager",
    type: "Rent Tracking",
    icon: "💳",
    status: "active",
    metric: "99.1%",
    metricLabel: "Collection success",
    task: "Tracking payments...",
    bars: [10, 9, 10, 9, 8, 10, 9, 10, 9, 10, 9, 10],
    description:
      "Tracks rent payments, sends reminders, and keeps everything organized without manual work.",
  },
  {
    id: 6,
    name: "Energy Saver",
    type: "Cost Optimization",
    icon: "⚡",
    status: "busy",
    metric: "−18%",
    metricLabel: "Cost saved",
    task: "Optimizing energy usage...",
    bars: [8, 6, 4, 5, 7, 6, 8, 5, 7, 9, 6, 8],
    description:
      "Helps reduce electricity and maintenance costs by optimizing property usage smartly.",
  },
  {
    id: 7,
    name: "Document Assistant",
    type: "File Manager",
    icon: "🔍",
    status: "active",
    metric: "4.8k",
    metricLabel: "Documents processed",
    task: "Reading documents...",
    bars: [4, 6, 8, 5, 7, 9, 6, 8, 10, 7, 9, 8],
    description:
      "Organizes and extracts important details from documents so you don’t have to do it manually.",
  },
  {
    id: 8,
    name: "Occupancy Planner",
    type: "Demand Insights",
    icon: "🏠",
    status: "active",
    metric: "92%",
    metricLabel: "Accuracy",
    task: "Analyzing demand...",
    bars: [7, 8, 6, 9, 7, 8, 10, 9, 8, 7, 9, 10],
    description:
      "Predicts when properties will be vacant so you can plan ahead and avoid losses.",
  },
  {
    id: 9,
    name: "Risk Checker",
    type: "Safety Alerts",
    icon: "🛡️",
    status: "idle",
    metric: "0",
    metricLabel: "Active issues",
    task: "Monitoring risks...",
    bars: [2, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 1],
    description:
      "Keeps an eye on risks and alerts you before small issues turn into big problems.",
  },
  {
    id: 10,
    name: "Communication Assistant",
    type: "Client Messaging",
    icon: "💬",
    status: "active",
    metric: "98%",
    metricLabel: "Response rate",
    task: "Replying to messages...",
    bars: [6, 9, 7, 10, 8, 9, 7, 8, 10, 9, 8, 10],
    description:
      "Responds to client messages instantly and keeps conversations active, even when you're busy.",
  },
];

/* ─── Status config map ──────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<AgentStatus, StatusConfig> = {
  active: {
    label: "Active",
    dot: "#22d3a8",
    bg: "rgba(34,211,168,.1)",
    border: "rgba(34,211,168,.25)",
    text: "#22d3a8",
  },
  busy: {
    label: "Processing",
    dot: "#f59e0b",
    bg: "rgba(245,158,11,.1)",
    border: "rgba(245,158,11,.25)",
    text: "#f59e0b",
  },
  idle: {
    label: "Standby",
    dot: "#3a7aaa",
    bg: "rgba(58,122,170,.1)",
    border: "rgba(58,122,170,.25)",
    text: "#3a7aaa",
  },
};

/* ─── Icon background helper ─────────────────────────────────────────────── */
function iconBg(status: AgentStatus): string {
  if (status === "busy") return "rgba(245,158,11,.12)";
  if (status === "idle") return "rgba(58,122,170,.12)";
  return "rgba(0,102,204,.18)";
}

/* ─── MiniChart ──────────────────────────────────────────────────────────── */
const MiniChart: FC<MiniChartProps> = ({ bars, active }) => {
  const max = Math.max(...bars);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 3,
        height: 28,
        margin: "10px 0 8px",
      }}
    >
      {bars.map((b, i) => {
        const h = Math.max(3, Math.round((b / max) * 28));
        const isHot = i >= bars.length - 4;
        const barStyle: CSSProperties = {
          flex: 1,
          height: h,
          borderRadius: "2px 2px 0 0",
          background: isHot
            ? "linear-gradient(180deg,#3399ff,#0057ad)"
            : active
            ? "rgba(0,102,204,.35)"
            : "rgba(0,102,204,.2)",
          transition: "background .3s",
        };
        return <div key={i} style={barStyle} />;
      })}
    </div>
  );
};

/* ─── AgentCard ──────────────────────────────────────────────────────────── */
const AgentCard: FC<AgentCardProps> = ({ agent, index, isActive, onClick }) => {
  const s = STATUS_CONFIG[agent.status];

  const cardStyle: CSSProperties = {
    background: isActive ? "#001e42" : "#001428",
    border: `1px solid ${isActive ? "#3399ff" : "rgba(0,87,173,.2)"}`,
    borderRadius: 12,
    padding: 14,
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "border-color .25s, transform .2s, box-shadow .25s",
    transform: isActive ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isActive ? "0 0 24px rgba(51,153,255,.12)" : "none",
    animationDelay: `${index * 60}ms`,
  };

  const glowStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: isActive
      ? "linear-gradient(135deg,rgba(0,102,204,.1),transparent)"
      : "transparent",
    transition: "background .3s",
  };

  const pillStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 9,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 20,
    color: s.text,
    background: s.bg,
    border: `1px solid ${s.border}`,
  };

  const dotStyle: CSSProperties = {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: s.dot,
    animation:
      agent.status !== "idle" ? "estateai-pulse 1.2s ease infinite" : "none",
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={glowStyle} />

      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            background: iconBg(agent.status),
          }}
        >
          {agent.icon}
        </div>
        <div style={pillStyle}>
          <span style={dotStyle} />
          {s.label}
        </div>
      </div>

      {/* Name + type */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#cce5ff",
          lineHeight: 1.3,
          marginBottom: 2,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        {agent.name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#2d5a8a",
          letterSpacing: ".06em",
          fontFamily: "monospace",
        }}
      >
        {agent.type}
      </div>

      <MiniChart bars={agent.bars} active={isActive} />

      {/* Metric */}
      <div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#3399ff",
            lineHeight: 1,
            fontFamily: "system-ui,sans-serif",
          }}
        >
          {agent.metric}
        </div>
        <div
          style={{
            fontSize: 9,
            color: "#2d5a8a",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            marginTop: 2,
          }}
        >
          {agent.metricLabel}
        </div>
      </div>

      {/* Live task */}
      <div
        style={{
          fontSize: 10,
          color: "#1a4d7a",
          marginTop: 8,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          paddingTop: 8,
          borderTop: "1px solid rgba(0,87,173,.15)",
          fontFamily: "monospace",
        }}
      >
        {agent.task}
        <span
          style={{
            animation: "estateai-blink 1s step-end infinite",
            color: "#3399ff",
          }}
        >
          ▌
        </span>
      </div>
    </div>
  );
};

/* ─── DetailPanel ────────────────────────────────────────────────────────── */
const DetailPanel: FC<DetailPanelProps> = ({ agent, onClose }) => {
  const s = STATUS_CONFIG[agent.status];

  const pillStyle: CSSProperties = {
    fontSize: 9,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 20,
    color: s.text,
    background: s.bg,
    border: `1px solid ${s.border}`,
  };

  const handleClose = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      style={{
        gridColumn: "1 / -1",
        background: "#001428",
        border: "1px solid rgba(51,153,255,.27)",
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
        flexWrap: "wrap",
        position: "relative",
        animation: "estateai-fadeIn .3s ease both",
      }}
    >
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          background: "none",
          border: "none",
          color: "#2d5a8a",
          fontSize: 18,
          cursor: "pointer",
          lineHeight: 1,
        }}
        aria-label="Close detail panel"
      >
        ×
      </button>

      <div style={{ fontSize: 32 }}>{agent.icon}</div>

      <div style={{ flex: 1, minWidth: 200 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#cce5ff",
              fontFamily: "system-ui,sans-serif",
            }}
          >
            {agent.name}
          </span>
          <span style={pillStyle}>{s.label}</span>
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#2d5a8a",
            marginBottom: 8,
            fontFamily: "monospace",
          }}
        >
          {agent.type}
        </div>

        <p
          style={{
            fontSize: 13,
            color: "#5a87cc",
            lineHeight: 1.6,
            fontFamily: "system-ui,sans-serif",
            maxWidth: 480,
          }}
        >
          {agent.description}
        </p>
      </div>

      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#3399ff",
            fontFamily: "system-ui,sans-serif",
          }}
        >
          {agent.metric}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#2d5a8a",
            textTransform: "uppercase",
            letterSpacing: ".08em",
          }}
        >
          {agent.metricLabel}
        </div>
      </div>
    </div>
  );
};

/* ─── SysStat ────────────────────────────────────────────────────────────── */
const SysStat: FC<SysStatItem> = ({ label, val, dot }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    {dot !== null && (
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dot,
          boxShadow: `0 0 6px ${dot}`,
          flexShrink: 0,
        }}
      />
    )}
    <span
      style={{
        fontSize: 10,
        color: "#3a6090",
        textTransform: "uppercase",
        letterSpacing: ".08em",
        fontFamily: "monospace",
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: 13,
        color: "#66b2ff",
        fontWeight: 600,
        fontFamily: "monospace",
      }}
    >
      {val}
    </span>
  </div>
);

/* ─── AgentShowcase (main export) ────────────────────────────────────────── */
const AgentShowcase: FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [taskCount, setTaskCount] = useState<number>(2847);

  const activeAgent = AGENTS.find((a) => a.id === activeId) ?? null;
  const activeCount = AGENTS.filter((a) => a.status === "active").length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTaskCount((n) => n + Math.floor(Math.random() * 8) - 2);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (id: number): void => {
    setActiveId((prev) => (prev === id ? null : id));
  };

 const sysStats: SysStatItem[] = [
  { label: "System", val: "Running", dot: "#22d3a8" },
  { label: "Active Agents", val: `${activeCount}/10`, dot: "#22d3a8" },
  { label: "Tasks / hour", val: taskCount.toLocaleString(), dot: "#f59e0b" },
  { label: "Uptime", val: "99.98%", dot: "#22d3a8" },
  { label: "Version", val: "EstateAI v4", dot: null },
];

  const handleBtnEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,102,204,.5)";
  };

  const handleBtnLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,102,204,.4)";
  };

  return (
    <>
      <style>{`
        @keyframes estateai-pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes estateai-blink   { 0%,100%{opacity:1} 49%{opacity:1} 50%,99%{opacity:0} }
        @keyframes estateai-scanline{ 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes estateai-fadeIn  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes estateai-dotping { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(2.4);opacity:0} }
      `}</style>

      <section
        style={{
          background: "#03142b",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.07,
            backgroundImage:
              "linear-gradient(rgba(0,102,204,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,204,1) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow orb – top left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            pointerEvents: "none",
            background:
              "radial-gradient(circle,rgba(0,102,204,.18) 0%,transparent 70%)",
          }}
        />

        {/* Glow orb – bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            pointerEvents: "none",
            background:
              "radial-gradient(circle,rgba(51,153,255,.12) 0%,transparent 70%)",
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* ── Header ── */}
          <div style={{ marginBottom: 36 }}>
            {/* Live badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,102,204,.12)",
                border: "1px solid rgba(0,102,204,.3)",
                color: "#3399ff",
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 16,
                fontFamily: "monospace",
              }}
            >
              <span
                style={{ position: "relative", display: "inline-block", width: 8, height: 8 }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#3399ff",
                    animation: "estateai-dotping 1.5s ease infinite",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    inset: 1,
                    borderRadius: "50%",
                    background: "#3399ff",
                  }}
                />
              </span>
              Agent Network · Live
            </div>

            <h2
              style={{
                fontSize: "clamp(28px,4vw,42px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-.5px",
                lineHeight: 1.15,
                marginBottom: 10,
                fontFamily: "system-ui,sans-serif",
              }}
            >
             Your AI Team is Always Working for You{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#3399ff,#66b2ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Even when you're offline.
              </span>
            </h2>

            <p
              style={{
                fontSize: 16,
                color: "#3a6090",
                maxWidth: 540,
                lineHeight: 1.6,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              Each AI assistant handles a specific task for your business — from managing leads to tracking payments — so you can work faster, smarter, and close more deals.
            </p>
          </div>

          {/* ── System status bar ── */}
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              background: "#001d3d",
              border: "1px solid rgba(0,87,173,.2)",
              borderRadius: 10,
              padding: "10px 20px",
              marginBottom: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Scan-line sweep */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(90deg,transparent,rgba(51,153,255,.08),transparent)",
                animation: "estateai-scanline 3s linear infinite",
                pointerEvents: "none",
              }}
            />

            {sysStats.map((stat) => (
              <SysStat key={stat.label} {...stat} />
            ))}
          </div>

          {/* ── Agent grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: 12,
            }}
          >
            {AGENTS.map((agent, i) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                index={i}
                isActive={activeId === agent.id}
                onClick={() => handleCardClick(agent.id)}
              />
            ))}

            {/* Full-width detail panel */}
            {activeAgent !== null && (
              <DetailPanel
                agent={activeAgent}
                onClose={() => setActiveId(null)}
              />
            )}
          </div>

          {/* ── Bottom CTA ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid rgba(0,87,173,.2)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#3a6090",
                fontFamily: "system-ui,sans-serif",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 600 }}>2,500+</span>{" "}
              properties added this week
            </p>

            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 100,
                background:
                  "linear-gradient(135deg,var(--color-primary-600,#0066cc),var(--color-primary-500,#1a7ae6))",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,102,204,.4)",
                fontFamily: "system-ui,sans-serif",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
            >
             Start Using Your AI Team
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgentShowcase;