"use client"

import { useState } from "react"
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  Shield,
  Star,
  ArrowRight,
  Sparkles,
  Calendar,
  MessageSquare,
  PlayCircle,
  Target,
  Zap,
  ChevronDown,
  Loader2
} from "lucide-react"
import Link from "next/link"

// Types
type Step = 1 | 2 | 3

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  role: string
  teamSize: string
  useCase: string
  selectedDate: string
  selectedTime: string
  phone: string
  message: string
}

// Constants
const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM",
  "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM",
]

const ROLES = [
  "Founder / CEO", "CTO / VP Engineering", "Product Manager",
  "Engineering Manager", "Developer", "Sales & Marketing", "Operations", "Other",
]

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"]

const USE_CASES = [
  "Customer Support Automation",
  "Internal Knowledge Base",
  "Sales & Lead Qualification",
  "Data Analysis & Reporting",
  "Workflow Orchestration",
  "Other",
]

const OUTCOMES = [
  {
    icon: Clock,
    title: "30-Min Live Session",
    desc: "A focused walkthrough with a solutions engineer — no slides, just your real questions.",
  },
  {
    icon: Target,
    title: "Custom Use-Case Demo",
    desc: "We tailor every demo to your industry, team size, and workflow — not a generic script.",
  },
  {
    icon: TrendingUp,
    title: "ROI Breakdown",
    desc: "Leave with a clear picture of time saved, cost reduced, and projected performance gains.",
  },
  {
    icon: Users,
    title: "Meet the Team",
    desc: "Connect with the people behind the product — ask questions you won't find in docs.",
  },
]

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Head of Operations · FiEstate",
    avatar: "PM",
    color: "#3B82F6",
    quote: "The demo was unlike anything I'd seen — completely tailored to our workflows. We went from pilot to full deployment in 3 weeks.",
  },
  {
    name: "James Okafor",
    role: "CTO · Relayr Health",
    avatar: "JO",
    color: "#1D4ED8",
    quote: "Within 20 minutes I knew this was the platform we needed. The team understood our technical constraints immediately.",
  },
  {
    name: "Sofia Andersson",
    role: "VP Product · Lattice AI",
    avatar: "SA",
    color: "#60A5FA",
    quote: "No sales pitch, just honest answers. That built more trust than any marketing material ever could.",
  },
]

const FAQS = [
  {
    q: "Who should attend the demo?",
    a: "Ideally bring the decision-maker plus one technical stakeholder. We calibrate depth to your audience, so there's no need to prepare in advance.",
  },
  {
    q: "Do I need to sign up or install anything?",
    a: "Nothing to install. The demo runs entirely in your browser. You'll receive a secure link 15 minutes before the session.",
  },
  {
    q: "What happens after the demo?",
    a: "You'll receive a personalised follow-up within 24 hours including a tailored proposal, pricing options, and a free 14-day trial if you're ready to move forward.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Absolutely. Use the link in your confirmation email any time up to 2 hours before the session to reschedule or cancel at no penalty.",
  },
]

// Helper: generate next 14 weekdays
function getAvailableDates() {
  const dates: { label: string; value: string; day: string }[] = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (dates.length < 14) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) {
      dates.push({
        label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        value: d.toISOString().split("T")[0],
      })
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

// Step Indicator
function StepIndicator({ step }: { step: Step }) {
  const steps = [
    { n: 1, label: "Your Details" },
    { n: 2, label: "Pick a Slot" },
    { n: 3, label: "Confirm" },
  ]
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step > s.n
                  ? "bg-[#0066cc] text-white"
                  : step === s.n
                  ? "bg-[#0066cc] text-white ring-4 ring-blue-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s.n ? <CheckCircle2 className="w-5 h-5" /> : s.n}
            </div>
            <span className={`text-xs font-medium whitespace-nowrap ${step === s.n ? "text-[#0066cc]" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-5 sm:w-16 lg:w-24 mx-2 mb-5 transition-all duration-500 ${step > s.n ? "bg-[#0066cc]" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// Input Component
function Input({
  label, name, type = "text", value, onChange, placeholder, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-[#0066cc]">*</span>}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
      />
    </div>
  )
}

// Select Component
function Select({
  label, name, value, onChange, options, placeholder, required,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-[#0066cc]">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled>{placeholder ?? "Select..."}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

// Step 1: Personal Info
function StepOne({
  data, update, onNext,
}: {
  data: FormData; update: (k: keyof FormData, v: string) => void; onNext: () => void;
}) {
  const valid = data.firstName && data.lastName && data.email && data.company && data.role && data.teamSize

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="First name" name="firstName" value={data.firstName} onChange={(v) => update("firstName", v)} placeholder="Aarav" required />
        <Input label="Last name" name="lastName" value={data.lastName} onChange={(v) => update("lastName", v)} placeholder="Shah" required />
        <Input label="Work email" name="email" type="email" value={data.email} onChange={(v) => update("email", v)} placeholder="aarav@company.com" required />
        <Input label="Phone (optional)" name="phone" type="tel" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+91 98000 00000" />
        <Input label="Company name" name="company" value={data.company} onChange={(v) => update("company", v)} placeholder="Acme Corp" required />
        <Select label="Your role" name="role" value={data.role} onChange={(v) => update("role", v)} options={ROLES} placeholder="Select your role" required />
        <Select label="Team size" name="teamSize" value={data.teamSize} onChange={(v) => update("teamSize", v)} options={TEAM_SIZES} placeholder="Select team size" required />
        <Select label="Primary use case" name="useCase" value={data.useCase} onChange={(v) => update("useCase", v)} options={USE_CASES} placeholder="What will you use it for?" />
      </div>

      <div className="mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">Anything specific you want to see?</label>
          <textarea
            id="message"
            rows={3}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="e.g. We want to automate Tier-1 support tickets across 3 languages..."
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all resize-none"
          />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!valid}
        className="mt-8 w-full py-4 rounded-xl bg-[#0066cc] text-white font-semibold text-xs sm:text-base hover:bg-[#0052a3] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        Continue to Scheduling
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  )
}

// Step 2: Pick Date & Time
function StepTwo({
  data, update, onNext, onBack,
}: {
  data: FormData; update: (k: keyof FormData, v: string) => void; onNext: () => void; onBack: () => void;
}) {
  const dates = getAvailableDates()
  const valid = data.selectedDate && data.selectedTime

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Date picker */}
      <p className="text-sm font-semibold text-gray-700 mb-3">Select a date</p>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
        {dates.map((d) => (
          <button
            key={d.value}
            onClick={() => { update("selectedDate", d.value); update("selectedTime", "") }}
            className={`flex flex-col items-center py-3 px-1 rounded-xl border text-xs font-medium transition-all duration-200 ${
              data.selectedDate === d.value
                ? "border-[#0066cc] bg-[#0066cc] text-white shadow-md shadow-blue-200"
                : "border-gray-200 bg-white text-gray-600 hover:border-[#0066cc]/50 hover:bg-blue-50"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wide opacity-70">{d.day}</span>
            <span className="text-base font-bold mt-0.5">{d.label.split(" ")[1]}</span>
            <span className="text-[10px] opacity-70">{d.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Time picker */}
      {data.selectedDate && (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-3">Select a time</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-8">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => update("selectedTime", t)}
                className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                  data.selectedTime === t
                    ? "border-[#0066cc] bg-[#0066cc] text-white shadow-md shadow-blue-200"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#0066cc]/50 hover:bg-blue-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-[2] py-4 rounded-xl bg-[#0066cc] text-white font-semibold text-base hover:bg-[#0052a3] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          Review Booking
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Step 3: Confirm
function StepThree({
  data, onBack, onSubmit, isSubmitting,
}: {
  data: FormData; onBack: () => void; onSubmit: () => void; isSubmitting: boolean;
}) {
  const dateLabel = data.selectedDate
    ? new Date(data.selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : ""

  const rows = [
    { label: "Name", value: `${data.firstName} ${data.lastName}` },
    { label: "Email", value: data.email },
    { label: "Company", value: data.company },
    { label: "Role", value: data.role },
    { label: "Team Size", value: data.teamSize },
    { label: "Use Case", value: data.useCase || "—" },
    { label: "Date", value: dateLabel },
    { label: "Time", value: `${data.selectedTime} IST` },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 mb-8">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
            <span className="text-sm text-gray-400 font-medium w-28 shrink-0">{r.label}</span>
            <span className="text-sm text-gray-800 font-semibold text-right">{r.value}</span>
          </div>
        ))}
      </div>

      {data.message && (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8">
          <p className="text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">Your note</p>
          <p className="text-sm text-gray-700">{data.message}</p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mb-6">
        By confirming, you agree to our{" "}
        <a href="#" className="text-[#0066cc] underline">Terms of Service</a> and{" "}
        <a href="#" className="text-[#0066cc] underline">Privacy Policy</a>.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-50 active:scale-[0.99] transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-[2] py-4 rounded-xl bg-[#0066cc] text-white font-semibold text-base hover:bg-[#0052a3] active:scale-[0.99] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              Confirm My Demo
              <CheckCircle2 className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Success View
function SuccessView({ data }: { data: FormData }) {
  const dateLabel = data.selectedDate
    ? new Date(data.selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : ""

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center text-center py-8">
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 ring-8 ring-blue-100">
        <CheckCircle2 className="w-10 h-10 text-[#0066cc]" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">You're confirmed!</h2>
      <p className="text-gray-500 text-base mb-6 max-w-sm">
        A calendar invite is on its way to <span className="text-[#0066cc] font-medium">{data.email}</span>. We can't wait to meet you.
      </p>
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-left w-full max-w-sm mb-8">
        <p className="text-sm font-semibold text-[#0066cc] mb-3">Session details</p>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0066cc]" />
            {dateLabel}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0066cc]" />
            {data.selectedTime} IST · 30 minutes
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#0066cc]" />
            {data.email}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Didn't receive the email? Check spam or <button className="text-[#0066cc] underline">contact support</button>.
      </p>
    </div>
  )
}

// Main Page
export default function BookDemoPage() {
  const [step, setStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", company: "", role: "",
    teamSize: "", useCase: "", selectedDate: "", selectedTime: "", phone: "", message: "",
  })

  const update = (k: keyof FormData, v: string) =>
    setFormData((prev) => ({ ...prev, [k]: v }))

  const handleSubmit = async () => {
  try {
    setIsSubmitting(true);

    // 🔥 Transform your big form data → backend format
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone || "N/A",
      description: `
Company: ${formData.company}
Role: ${formData.role}
Team Size: ${formData.teamSize}
Use Case: ${formData.useCase || "N/A"}

Selected Date: ${formData.selectedDate}
Selected Time: ${formData.selectedTime}

Message: ${formData.message || "N/A"}
      `
    };

    const res = await fetch("/api/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setIsSuccess(true);

  } catch (error: any) {
    alert(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br pt-6 from-white via-blue-50/30 to-slate-50 border-b border-gray-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-200/40 blur-2xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
            <span className="text-xs font-semibold text-[#0066cc] tracking-wide uppercase">Live Demos Available Today</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
            See Estate AI in your{" "}
            <span className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] bg-clip-text text-transparent">
              workflow
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            30 minutes with a solutions engineer. No pitch decks, no generic walkthroughs — just answers to your specific questions.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: "SOC 2 Type II" },
              { icon: Zap, text: "Setup in < 48 hrs" },
              { icon: Users, text: "Trusted by 800+ teams" },
              { icon: Star, text: "4.9 / 5 on G2" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <b.icon className="w-4 h-4 text-[#0066cc]" />
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-[#0066cc] uppercase tracking-widest mb-4">What to expect</p>
          <h2 className="text-2xl font-bold text-gray-900">Your demo experience</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {OUTCOMES.map((o) => {
            const Icon = o.icon
            return (
              <div key={o.title} className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#0066cc]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-4 mx-auto group-hover:bg-[#0066cc] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{o.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{o.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Booking Form - Centered */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-slate-200/60 px-4 py-8 sm:p-10">
            {!isSuccess ? (
              <>
                <StepIndicator step={step} />
                
                {step === 1 && <StepOne data={formData} update={update} onNext={() => setStep(2)} />}
                {step === 2 && <StepTwo data={formData} update={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && (
                  <StepThree
                    data={formData}
                    onBack={() => setStep(2)}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </>
            ) : (
              <SuccessView data={formData} />
            )}
          </div>
          
          {!isSuccess && (
            <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
              No commitment required · Cancel up to 2 hrs before ·{" "}
              <span className="text-gray-500 font-medium">100% free</span>
            </p>
          )}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#0066cc] uppercase tracking-widest mb-4">From people who've been here</p>
            <h2 className="text-2xl font-bold text-gray-900">What they say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#0066cc] uppercase tracking-widest mb-4">Common questions</p>
            <h2 className="text-2xl font-bold text-gray-900">Frequently asked</h2>
          </div>
          
          <div className="flex flex-col divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
            {FAQS.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-800 pr-4">{f.q}</span>
                  <ChevronDown className={`shrink-0 w-5 h-5 text-gray-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  )
}