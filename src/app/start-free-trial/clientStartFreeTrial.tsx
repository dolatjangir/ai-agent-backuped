"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthMethod = "email" | "google" | "github";

interface TrialForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
  role: string;
  agreeTerms: boolean;
  agreeMarketing: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = [
  "Founder / CEO",
  "CTO / VP Engineering",
  "Product Manager",
  "Engineering Manager",
  "Developer",
  "Sales & Marketing",
  "Operations",
  "Other",
];

const PLAN_FEATURES = [
  { icon: "✦", text: "Unlimited AI agent runs for 14 days" },
  { icon: "✦", text: "Up to 5 team members included" },
  { icon: "✦", text: "All Pro integrations unlocked" },
  { icon: "✦", text: "Priority onboarding & live chat support" },
  { icon: "✦", text: "Full analytics & reporting suite" },
  { icon: "✦", text: "No credit card required" },
];

const LOGOS = ["Stripe", "Notion", "Vercel", "Linear", "Figma", "Loom"];

const STATS = [
  { value: "800+", label: "Teams onboarded" },
  { value: "4.9★", label: "Average rating on G2" },
  { value: "< 5 min", label: "Median setup time" },
  { value: "98%", label: "Trial-to-paid conversion" },
];

const TESTIMONIAL = {
  quote:
    "I signed up at 11 PM on a Tuesday expecting nothing. By midnight our first agent was live. We cancelled three tools we no longer needed the next morning.",
  name: "Tanvir Rao",
  role: "Co-founder · Stacklane",
  avatar: "TR",
};

// ─── Password strength ─────────────────────────────────────────────────────────

function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map: [string, string][] = [
    ["", ""],
    ["Weak", "#EF4444"],
    ["Fair", "#F97316"],
    ["Good", "#3B82F6"],
    ["Strong", "#22C55E"],
  ];
  return { score: s, label: map[s][0], color: map[s][1] };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function FloatingInput({
  label, name, type = "text", value, onChange, placeholder, required, autoComplete,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ""}
        required={required}
        autoComplete={autoComplete}
        className="peer w-full px-4 pt-6 pb-2 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none transition-all duration-200 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      <label
        htmlFor={name}
        className={`absolute left-4 pointer-events-none transition-all duration-200 text-slate-400 font-medium ${
          active ? "top-2 text-[10px] uppercase tracking-widest text-blue-500" : "top-4 text-sm"
        }`}
      >
        {label}
        {required && <span className="text-blue-400 ml-0.5">*</span>}
      </label>
    </div>
  );
}

function PasswordInput({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const str = getStrength(value);

  return (
    <div>
      <div className="relative">
        <input
          id="password"
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          autoComplete="new-password"
          className="w-full px-4 pt-6 pb-2 pr-12 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none transition-all duration-200 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <label
          htmlFor="password"
          className={`absolute left-4 pointer-events-none transition-all duration-200 text-slate-400 font-medium ${
            active ? "top-2 text-[10px] uppercase tracking-widest text-blue-500" : "top-4 text-sm"
          }`}
        >
          Password<span className="text-blue-400 ml-0.5">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {value && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex gap-1 flex-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{ backgroundColor: n <= str.score ? str.color : "#E2E8F0" }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold" style={{ color: str.color }}>{str.label}</span>
        </div>
      )}
    </div>
  );
}

// ─── Confirmation / Success ────────────────────────────────────────────────────

function SuccessScreen({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Animated checkmark */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full bg-blue-50 animate-ping opacity-30" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl shadow-blue-200">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 mb-5">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-semibold text-green-700 tracking-wide">Trial activated · 14 days free</span>
      </div>

      <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome aboard! 🎉</h2>
      <p className="text-slate-500 text-base mb-8 max-w-xs leading-relaxed">
        We've sent a confirmation link to{" "}
        <span className="font-semibold text-blue-600">{email}</span>. Click it to activate your workspace.
      </p>

      {/* Next steps */}
      <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your next 3 steps</p>
        <div className="flex flex-col gap-4">
          {[
            { n: "01", title: "Verify your email", sub: "Check your inbox — it takes under 30 seconds." },
            { n: "02", title: "Connect your first integration", sub: "Slack, Notion, HubSpot — pick what matters." },
            { n: "03", title: "After Email Approval Show All Agents", sub: "Use a template or build from scratch." },
          ].map((s) => (
            <div key={s.n} className="flex items-start gap-4">
              <span className="text-sm font-black text-blue-200 shrink-0 w-7">{s.n}</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="/"
        className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
      >
        Open my workspace
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function FreeTrialPage() {
  const [method, setMethod] = useState<AuthMethod>("email");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<TrialForm>({
    firstName: "", lastName: "", email: "", password: "",
    company: "", role: "", agreeTerms: false, agreeMarketing: false,
  });

  const update = (k: keyof TrialForm, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const valid =
    form.firstName && form.lastName && form.email &&
    form.password.length >= 8 && form.agreeTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800)); // simulate API
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-10 bg-white font-[family-name:var(--font-geist-sans,system-ui)]">

   

      {/* ── Two-column layout ──────────────────────────── */}
      <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left panel ─────────────────────────────────── */}
        <div className="relative hidden lg:flex flex-col justify-between bg-blue-900 p-14 overflow-hidden">

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-blue-900/40 blur-2xl" />
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Logo */}
          {/* <div className="relative flex items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Estate AI</span>
          </div> */}

          {/* Main copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 mb-7 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/90 tracking-wide">No credit card · No commitment</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              14 days.<br />
              Full access.<br />
              <span className="text-blue-200">Zero friction.</span>
            </h2>
            <p className="text-blue-100 text-base leading-relaxed max-w-sm mb-10">
              Every feature unlocked from day one. No watered-down trial. Cancel anytime — no forms, no calls.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3.5 mb-12">
              {PLAN_FEATURES.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm text-blue-50 font-medium">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6">
              <p className="text-sm text-blue-50 leading-relaxed italic mb-5">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                  {TESTIMONIAL.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{TESTIMONIAL.name}</p>
                  <p className="text-xs text-blue-200">{TESTIMONIAL.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="relative z-10 grid grid-cols-4 gap-4 pt-8 border-t border-white/15">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-xl font-black text-white">{s.value}</span>
                <span className="text-[10px] text-blue-200 font-medium leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel (form) ──────────────────────────── */}
        <div className="flex items-center justify-center px-6 py-12 bg-blue-50">
          <div className="w-full max-w-md">

            {submitted ? (
              <SuccessScreen email={form.email} />
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                    Start your free trial
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</a>
                  </p>
                </div>

                {/* OAuth buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setMethod("google")}
                    className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-sm font-semibold text-slate-700 transition-all duration-200 active:scale-[0.98]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => setMethod("github")}
                    className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-sm font-semibold text-slate-700 transition-all duration-200 active:scale-[0.98]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1B1F23">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs font-medium text-slate-400">or continue with email</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FloatingInput label="First name" name="firstName" value={form.firstName} onChange={(v) => update("firstName", v)} placeholder="Aarav" required autoComplete="given-name" />
                    <FloatingInput label="Last name" name="lastName" value={form.lastName} onChange={(v) => update("lastName", v)} placeholder="Shah" required autoComplete="family-name" />
                  </div>

                  <FloatingInput label="Work email" name="email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="aarav@company.com" required autoComplete="email" />

                  <PasswordInput value={form.password} onChange={(v) => update("password", v)} />

                  <FloatingInput label="Company name" name="company" value={form.company} onChange={(v) => update("company", v)} placeholder="Acme Corp" autoComplete="organization" />

                  {/* Role select */}
                  <div className="relative">
                    <select
                      id="role"
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      className="w-full px-4 pt-6 pb-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled />
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <label htmlFor="role" className={`absolute left-4 pointer-events-none transition-all duration-200 font-medium ${form.role ? "top-2 text-[10px] uppercase tracking-widest text-blue-500" : "top-4 text-sm text-slate-400"}`}>
                      Your role
                    </label>
                    <div className="absolute right-4 top-4 pointer-events-none text-slate-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-col gap-3 mt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          checked={form.agreeTerms}
                          onChange={(e) => update("agreeTerms", e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${form.agreeTerms ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white group-hover:border-blue-400"}`}>
                          {form.agreeTerms && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
                        <span className="text-blue-500 ml-0.5">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          checked={form.agreeMarketing}
                          onChange={(e) => update("agreeMarketing", e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${form.agreeMarketing ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white group-hover:border-blue-400"}`}>
                          {form.agreeMarketing && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Send me product updates, tips, and early access to new features.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!valid || loading}
                    className="mt-2 w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    {loading ? (
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" /><path d="M21 12a9 9 0 00-9-9" />
                      </svg>
                    ) : (
                      <>
                        <span>Start free trial — 14 days</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Trust strip */}
                <div className="flex items-center justify-center gap-5 mt-7">
                  {[
                    { icon: "🔒", text: "SOC 2 Type II" },
                    { icon: "💳", text: "No card needed" },
                    { icon: "✕", text: "Cancel anytime" },
                  ].map((b) => (
                    <div key={b.text} className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <span>{b.icon}</span>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Used by strip */}
                <div className="mt-8 pt-7 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest mb-4">
                    Trusted by teams from
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {LOGOS.map((l) => (
                      <span key={l} className="text-sm font-bold text-slate-300 tracking-tight">{l}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only left panel content (below form) */}
      <div className="lg:hidden bg-gradient-to-br from-blue-700 to-blue-800 px-6 py-10">
        <div className="flex flex-col gap-3 mb-8">
          {PLAN_FEATURES.map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-blue-50 font-medium">{f.text}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="text-2xl font-black text-white block">{s.value}</span>
              <span className="text-xs text-blue-200 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}