"use client"
import React, { useState } from "react"
import Link from "next/link"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Send,
  Zap,
  CheckCircle2,
} from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = {
  Platform: [
    { label: "Ai Automation", href: "/features/ai-automation" },
    { label: "Lead Management",   href: "/features/lead-management" },
    { label: "Property Intelligence", href: "/features/property-ai" },
    { label: "Smart communication",   href: "/features/conversational-ai" },
  ],
  Solutions: [
    { label: "Data Mining", href: "/solutions/data-mining" },
    { label: "Lead Funnal",   href: "/solutions/lead-funnal" },
    { label: "campaign Automation",   href: "/solutions/campaign-running" },
    { label: "Lead Follow-Up",href: "/solutions/lead-followup" },
  ],
  Resources: [
    { label: "Contact Support", href: "/resources/contact-support" },
    { label: "How it Works",  href: "/resources/howitworks" },
    { label: "Help Center",   href: "/resources/help-center" },
    { label: "About Us",      href: "/resources/about-us" },
  ],
}

const SOCIALS = [
  { Icon: Twitter,   label: "Twitter",   href: "#", color: "hover:bg-sky-500"    },
  { Icon: Linkedin,  label: "LinkedIn",  href: "#", color: "hover:bg-blue-600"   },
  { Icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-500"   },
  { Icon: Facebook,  label: "Facebook",  href: "#", color: "hover:bg-blue-700"   },
]

const STATS = [
  { value: "12K+", label: "Properties managed" },
  { value: "98%",  label: "Uptime SLA"         },
  { value: "4.9★", label: "G2 rating"          },
  { value: "3 min",label: "Avg. setup time"    },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
const [loading, setLoading] = useState(false);
  const handleSubscribe = async(e: React.FormEvent) => {
    e.preventDefault()
      if (!email) {
    alert("Enter email");
    return;
  }
  setLoading(true);
  try{
const res = await fetch("/api/subscribe",{
  method:"POST",
  headers:{
    "Contact-Type":"application/json",

  },
  body:JSON.stringify({email}),
});
const data =await res.json();
if(res.ok){
  setSubscribed(true)
    setEmail("")
}else{
  alert(data.message);
}
  }catch {
    alert("Something went wrong");
  } finally {
    setLoading(false);
  };
    
  };

  return (
    <footer className="relative overflow-hidden bg-blue-50 text-slate-400">

      {/* ── Background atmosphere ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue glow — top left */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        {/* Blue glow — bottom right */}
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px]" />
        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        {/* Top border glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Newsletter strip ────────────────────────────────── */}
        <div className="border-b border-slate-300/80 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3.5 py-1 mb-3">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400 tracking-wide uppercase">Product updates</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary-700)] mb-1 tracking-tight">
                Stay ahead of the curve.
              </h3>
              <p className="text-sm text-slate-500">
                Tips, product news, and early-access features — straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto sm:min-w-[340px]">
              {subscribed ? (
                <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/25 w-full justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">You're subscribed!</span>
                </div>
              ) : (
                <div className="flex w-full rounded-xl overflow-hidden border border-blue-700/80 bg-blue-200/60 focus-within:border-blue-500/60 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all duration-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@company.com"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-[var(--color-primary-700)] placeholder-blue-700 outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200 shrink-0"
                  >
                    <Send className="w-5 h-5 sm:w-3.5 sm:h-3.5" /><span className="hidden sm:block">
                   {loading ? "Subscribing..." : "Subscribe"}</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ── Main grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <img
                src="/assets/estateai.png"
                width={200}
                height={60}
                alt="Estate-Ai"
                className=""
              />
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
              The modern platform for hotel owners, Airbnb hosts, and property managers.
              Automate operations, increase bookings, and grow revenue — on autopilot.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mb-8">
              {SOCIALS.map(({ Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group w-9 h-9 rounded-lg bg-blue-200/80 border border-blue-700/60 flex items-center justify-center text-blue-900 ${color} hover:text-white hover:border-transparent transition-all duration-200`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-200 border border-blue-800 text-xs font-medium text-blue-900">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              All systems operational
            </div>
          </div>

          {/* Nav link columns */}
          {Object.entries(NAV_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">
                {title}
              </h4>
              <ul className="space-y-3.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-[var(--color-primary-700)] transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <ArrowRight className="w-3 h-3 text-blue-500 shrink-0" />
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        {/* ── Bottom bar ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-slate-300/80 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span>© 2026 Estate Management. All rights reserved.</span>
            <span className="hidden md:inline text-slate-800">·</span>
            <span className="hidden md:inline">Made with ♥ for property managers</span>
          </div>

          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy"  },
              { label: "Terms of Service", href: "/terms"  },
              { label: "Cookies",          href: "/cookies"},
              { label: "Sitemap",          href: "/sitemap"},
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-slate-300 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}