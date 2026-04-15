"use client"

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion'
import { 
  Building2, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Zap, 
  Layers, 
  Globe, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  LayoutDashboard,
  FileText,
  Settings,
  PieChart,
  CreditCard,
  Eye,
  Server,
  Clock,
  Award,
  Briefcase,
  Plus,
  Minus,
  Sparkles,
  Target,
  Maximize2,
  Bell,
  Mail,
  Phone,
  Calendar,
  PlayCircle,
  X,
  Check,
  TrendingDown,
  AlertCircle,
  MessageSquare,
  Database,
  Home,
  MapPin,
  Crown,
  Calculator
} from 'lucide-react'

// Animation variants
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Reusable Components with NEW COLOR SYSTEM
const GlassCard = ({ children, className = "", hover = true, dark = false, elevated = false }: { 
  children: React.ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
  elevated?: boolean
}) => (
  <motion.div 
    whileHover={hover ? { 
      y: -4, 
      boxShadow: elevated 
        ? "0 25px 50px -12px rgba(37, 99, 235, 0.25)"
        : "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 } 
    } : {}}
    className={`relative overflow-hidden rounded-[var(--radius-2xl)] backdrop-blur-xl border transition-all duration-300 ${
      dark 
        ? 'bg-[var(--color-neutral-800)]/90 border-[var(--color-neutral-700)] text-white' 
        : elevated
          ? 'bg-white shadow-2xl shadow-[var(--color-primary-500)]/10 border-[var(--border-light)]'
          : 'bg-white/90 shadow-xl border-[var(--border-light)]'
    } ${className}`}
  >
    {children}
  </motion.div>
)

const GradientText = ({ children, className = "", variant = "primary" }: { 
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent"
}) => {
  const gradients = {
    primary: "from-[var(--color-primary-600)] to-[var(--color-secondary-600)]",
    secondary: "from-[var(--color-secondary-600)] to-[var(--color-primary-600)]",
    accent: "from-[var(--color-accent-500)] to-[var(--color-primary-600)]"
  }
  
  return (
    <span className={`bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

const Badge = ({ children, variant = "primary", size = "md", glow = false }: { 
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "dark" | "success"
  size?: "sm" | "md" | "lg"
  glow?: boolean
}) => {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base"
  }
  
  const variants = {
    primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border-[var(--color-primary-200)]",
    secondary: "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] border-[var(--color-secondary-200)]",
    accent: "bg-[var(--color-accent-100)] text-[var(--color-accent-700)] border-[var(--color-accent-200)]",
    dark: "bg-[var(--color-neutral-800)] text-white border-[var(--color-neutral-700)]",
    success: "bg-[var(--color-success-100)] text-[var(--color-success-700)] border-[var(--color-success-200)]"
  }
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-semibold border ${sizes[size]} ${variants[variant]} ${glow ? 'shadow-lg shadow-[var(--color-primary-500)]/20' : ''}`}>
      {children}
    </span>
  )
}

const MetricBadge = ({ value, label, trend }: { value: string; label: string; trend?: string }) => (
  <div className="flex flex-col">
    <span className="text-2xl font-bold text-[var(--text-primary)]">{value}</span>
    <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{label}</span>
    {trend && <span className="text-xs text-[var(--color-success-600)] font-medium mt-0.5">{trend}</span>}
  </div>
)

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])
  
  return { count, ref }
}

const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const { count, ref } = useAnimatedCounter(value)
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Problem Card Component
const ProblemCard = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => (
  <GlassCard className="p-6 group relative overflow-hidden" hover={true}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-error-100)] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-error-100)] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-[var(--color-error-600)]" />
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--color-error-50)] flex items-center justify-center text-[var(--color-error-600)] font-bold text-sm">
          0{index + 1}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-error-600)] transition-colors">{title}</h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
    </div>
  </GlassCard>
)

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <GlassCard className="p-6 h-full group" elevated={false}>
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center mb-4 group-hover:from-[var(--color-primary-500)] group-hover:to-[var(--color-secondary-500)] transition-all duration-300">
      <Icon className="w-6 h-6 text-[var(--color-primary-600)] group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">{title}</h3>
    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
    
    <div className="mt-4 pt-4 border-t border-[var(--border-light)] opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-sm text-[var(--color-primary-600)] font-medium flex items-center gap-1 hover:gap-2 transition-all">
        Learn more <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </GlassCard>
)

// Comparison Row Component
const ComparisonRow = ({ feature, basic, pro, highlight = false }: { feature: string; basic: string; pro: string; highlight?: boolean }) => (
  <div className={`grid grid-cols-[1.5fr,1fr,1.2fr] gap-4 p-6 items-center ${highlight ? 'bg-[var(--color-primary-50)] border-l-4 border-[var(--color-primary-500)]' : 'hover:bg-[var(--bg-secondary)]'} transition-colors rounded-r-[var(--radius-xl)]`}>
    <div className="font-semibold text-[var(--text-primary)] flex items-center gap-3">
      {feature}
    </div>
    <div className="text-center text-[var(--text-tertiary)] text-sm flex items-center justify-center gap-2">
      <X className="w-4 h-4 text-[var(--color-error-500)]" />
      {basic}
    </div>
    <div className="text-center">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-success-100)] text-[var(--color-success-700)] text-sm font-semibold">
        <Check className="w-4 h-4" />
        {pro}
      </span>
    </div>
  </div>
)

export default function AgencyPage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  // Data for sections
  const problems = [
    {
      icon: TrendingDown,
      title: "Revenue Leakage",
      description: "Without dynamic pricing, agencies lose 15-25% potential revenue. Static rates can't adapt to demand spikes, local events, or competitor moves."
    },
    {
      icon: AlertCircle,
      title: "Operational Chaos",
      description: "Managing 50+ properties across spreadsheets leads to double-bookings, missed cleanings, and guest complaints that damage your reputation."
    },
    {
      icon: MessageSquare,
      title: "Communication Gaps",
      description: "Delayed guest responses kill conversion rates. Manual messaging across platforms consumes 30+ hours weekly that should drive growth."
    },
    {
      icon: Database,
      title: "Data Silos",
      description: "Client reporting requires cobbling data from 5+ platforms. By the time reports are ready, insights are outdated and opportunities missed."
    }
  ]

  const features = [
    {
      icon: BarChart3,
      title: "Multi-Client Command Center",
      description: "Unified dashboard managing all client portfolios. Real-time occupancy, revenue, and performance metrics across properties."
    },
    {
      icon: CreditCard,
      title: "Automated Revenue Optimization",
      description: "AI-driven dynamic pricing that adjusts 4x daily. Capture demand spikes and maximize RevPAR without manual intervention."
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II certified with role-based access. Client data isolation, audit logs, and compliance reporting built-in."
    },
    {
      icon: FileText,
      title: "White-Label Reporting",
      description: "Branded client portals and automated reports. Your logo, your domain, professional PDF exports delivered automatically."
    },
    {
      icon: PieChart,
      title: "Portfolio Analytics",
      description: "Compare client performance, identify top markets, and spot underperforming properties with predictive insights."
    },
    {
      icon: Award,
      title: "Agency Growth Tools",
      description: "Commission tracking, automated invoicing, and client acquisition dashboards designed specifically for scaling agencies."
    }
  ]

  const workflowSteps = [
    { step: "01", icon: Plus, title: "Agency Onboarding", desc: "Single-day setup with dedicated migration support from your existing tools." },
    { step: "02", icon: Building2, title: "Portfolio Import", desc: "Bulk import from Airbnb, Booking.com, or spreadsheets. Zero downtime transition." },
    { step: "03", icon: Users, title: "Team & Clients", desc: "Configure roles, permissions, and isolated client workspaces with custom branding." },
    { step: "04", icon: Zap, title: "Automation Live", desc: "Activate dynamic pricing, automated messaging, and reporting. See results in 48 hours." },
    { step: "05", icon: Maximize2, title: "Scale Infinitely", desc: "Add unlimited properties and clients without operational overhead or performance degradation." }
  ]

  const metrics = [
    { value: 250, suffix: "+", label: "Active Agencies", sub: "Across India & UAE" },
    { value: 12000, suffix: "+", label: "Listings Managed", sub: "Daily operations" },
    { value: 40, suffix: "%", label: "Avg Revenue Lift", sub: "Within 90 days" },
    { value: 98, suffix: "%", label: "Client Retention", sub: "Annual renewal rate" }
  ]

  const comparisonData = [
    { feature: "Portfolio Overview", basic: "Multiple logins", pro: "Unified dashboard", highlight: true },
    { feature: "Pricing Strategy", basic: "Manual updates", pro: "AI dynamic pricing", highlight: false },
    { feature: "Guest Messaging", basic: "Manual replies", pro: "100% automated", highlight: true },
    { feature: "Client Reporting", basic: "Excel exports", pro: "Real-time portals", highlight: false },
    { feature: "Revenue Tracking", basic: "Monthly reconciliation", pro: "Live P&L by property", highlight: true },
    { feature: "Scale Limit", basic: "~30 properties", pro: "Unlimited", highlight: false },
    { feature: "Branding", basic: "Platform logos", pro: "Full white-label", highlight: true }
  ]

  const securityFeatures = [
    { icon: Server, title: "Cloud Infrastructure", desc: "AWS & Azure with 99.99% uptime SLA and automatic failover." },
    { icon: Shield, title: "Access Control", desc: "Granular RBAC with SSO, 2FA, and session management." },
    { icon: Lock, title: "Data Encryption", desc: "AES-256 at rest, TLS 1.3 in transit, and encrypted backups." },
    { icon: Clock, title: "24/7 Security Ops", desc: "Real-time threat monitoring, DDoS protection, and incident response." }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-x-hidden">
      <Head>
        <title>Agency Solutions | Scale Your Property Management Business</title>
        <meta name="description" content="Property management software built for agencies. Multi-client dashboards, automated pricing, white-label solutions, and enterprise security." />
        <meta name="keywords" content="property management agency, multi-client dashboard, vacation rental software, dynamic pricing, white-label" />
      </Head>

      {/* 1️⃣ HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--bg-primary)] to-[var(--color-secondary-50)]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[var(--color-primary-200)] to-transparent rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--color-secondary-200)] to-transparent rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-light)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.03]" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            
            {/* LEFT SIDE - Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 lg:pr-8"
            >
              <motion.div variants={fadeInLeft}>
                <Badge variant="primary" size="md" glow={true}>
                  <Briefcase className="w-4 h-4" />
                  Built for Agencies
                </Badge>
              </motion.div>

              <motion.h1 
                variants={fadeInLeft}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Scale Your Agency
                <span className="block mt-2">
                  Without the <GradientText>Chaos</GradientText>
                </span>
              </motion.h1>

              <motion.div variants={fadeInLeft} className="space-y-4 max-w-xl">
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                  Managing multiple client portfolios shouldn't mean drowning in spreadsheets and manual updates. 
                  Our unified platform gives you <strong>command center control</strong> over unlimited properties 
                  with automated pricing, white-label reporting, and enterprise security.
                </p>
                
                <div className="flex flex-wrap gap-3 text-sm">
                  {['Multi-Client Dashboard', 'Dynamic Pricing', 'Automated Reporting', 'White-Label'].map((item, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)] font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] hover:shadow-xl hover:shadow-[var(--color-primary-500)]/30 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-[var(--text-primary)] font-bold rounded-[var(--radius-xl)] border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex items-center gap-6 pt-6 border-t border-[var(--border-light)]">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      A{i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-tertiary)]">
                  Trusted by <strong className="text-[var(--color-primary-600)]">250+ Agencies</strong> managing 12,000+ listings
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - Dashboard Preview */}
            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }}
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative"
            >
              <div className="relative">
                {/* Main Dashboard Card */}
                <GlassCard elevated={true} className="p-6 relative z-10" hover={false}>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-primary-500)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    Live Demo
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-light)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-[var(--text-primary)]">Agency Command</div>
                        <div className="text-xs text-[var(--text-tertiary)]">Real-time Overview</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-success-500)] animate-pulse" />
                      <span className="text-xs text-[var(--text-tertiary)]">Live</span>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-[var(--color-primary-600)]" />
                        <span className="text-xs text-[var(--text-tertiary)] uppercase font-semibold">Active Clients</span>
                      </div>
                      <div className="text-3xl font-bold text-[var(--text-primary)]">48</div>
                      <div className="text-xs text-[var(--color-success-600)] mt-1 font-medium">+12 this month</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-[var(--color-secondary-50)] border border-[var(--color-secondary-200)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-[var(--color-secondary-600)]" />
                        <span className="text-xs text-[var(--text-tertiary)] uppercase font-semibold">Listings</span>
                      </div>
                      <div className="text-3xl font-bold text-[var(--text-primary)]">162</div>
                      <div className="text-xs text-[var(--color-success-600)] mt-1 font-medium">+28 this month</div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-secondary-50)] border border-[var(--color-primary-200)] col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[var(--color-primary-600)]" />
                          <span className="text-xs text-[var(--text-tertiary)] uppercase font-semibold">Monthly Revenue</span>
                        </div>
                        <Badge variant="success" size="sm">+24% YoY</Badge>
                      </div>
                      <div className="text-4xl font-bold text-[var(--text-primary)]">₹32.4L</div>
                      <div className="mt-3 h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-[var(--text-primary)]">Portfolio Occupancy</span>
                      <div className="flex items-center gap-2 text-[var(--color-success-600)]">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-bold">92%</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-24">
                      {[40, 65, 45, 80, 55, 90, 75, 85, 70, 92, 88, 95].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-primary-500)] to-[var(--color-secondary-400)] opacity-80 hover:opacity-100 transition-opacity"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[var(--text-tertiary)]">
                      <span>Jan</span>
                      <span>Jun</span>
                      <span>Dec</span>
                    </div>
                  </div>

                  {/* Client List Preview */}
                  <div className="space-y-2">
                    <div className="text-xs text-[var(--text-tertiary)] uppercase font-semibold mb-2">Recent Activity</div>
                    {[
                      { name: "Sunset Properties", action: "New booking confirmed", time: "2m ago", status: "active" },
                      { name: "Urban Stays Delhi", action: "Revenue report sent", time: "15m ago", status: "pending" }
                    ].map((client, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-light)] hover:border-[var(--color-primary-300)] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${client.status === 'active' ? 'bg-[var(--color-success-500)]' : 'bg-[var(--color-warning-500)]'}`} />
                          <div>
                            <div className="text-sm font-medium text-[var(--text-primary)]">{client.name}</div>
                            <div className="text-xs text-[var(--text-tertiary)]">{client.action}</div>
                          </div>
                        </div>
                        <span className="text-xs text-[var(--text-tertiary)]">{client.time}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-[var(--radius-2xl)] p-4 shadow-2xl border border-[var(--border-light)] z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-success-100)] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[var(--color-success-600)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">Auto-synced</div>
                      <div className="text-xs text-[var(--text-tertiary)]">All platforms</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-4 bg-white rounded-[var(--radius-2xl)] p-4 shadow-2xl border border-[var(--border-light)] z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[var(--color-primary-600)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">SOC 2</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Certified</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2️⃣ THE AGENCY PROBLEM SECTION */}
      <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-medium)] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" size="md">
                <Target className="w-4 h-4" />
                The Real Challenge
              </Badge>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-6 mb-4 text-[var(--text-primary)]">
              Why Agencies <span className="text-[var(--color-error-600)]">Struggle</span> to Scale
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Growth creates complexity. Without the right system, you're trading revenue for burnout.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {problems.map((problem, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <ProblemCard {...problem} index={idx} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border-2 border-[var(--color-primary-300)] shadow-lg">
              <Sparkles className="w-6 h-6 text-[var(--color-primary-600)]" />
              <span className="text-lg font-bold text-[var(--text-primary)]">
                Scaling isn't about working harder. It's about building <GradientText>smarter systems</GradientText>.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ FEATURES GRID SECTION */}
      <section className="py-24 bg-[var(--bg-primary)] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-light)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-light)_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" size="lg" glow={true}>
                <Layers className="w-4 h-4" />
                Unified Platform
              </Badge>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Everything You Need to <br />
              <GradientText variant="secondary">Scale Confidently</GradientText>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              Replace your fragmented tool stack with one integrated platform designed specifically for property management agencies.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ METRICS STRIP */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {metrics.map((metric, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-lg font-semibold text-[var(--color-primary-100)] mb-1">{metric.label}</div>
                <div className="text-sm text-[var(--color-primary-200)]">{metric.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5️⃣ WORKFLOW TIMELINE */}
      <section className="py-24 bg-[var(--bg-secondary)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--text-primary)]">
              From Setup to <GradientText>Scale</GradientText> in 5 Steps
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              A streamlined onboarding process designed to get your agency operational in days, not months.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-[var(--border-light)] hidden lg:block rounded-full" />
            <div className="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hidden lg:block rounded-full opacity-30" />
            
            <div className="grid md:grid-cols-5 gap-8 lg:gap-4">
              {workflowSteps.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative">
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[var(--color-primary-500)] z-10 items-center justify-center shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary-500)]" />
                  </div>
                  
                  <div className="pt-0 lg:pt-16 text-center lg:text-left">
                    <div className="text-5xl font-bold text-[var(--border-medium)] mb-4">{item.step}</div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center mb-4 mx-auto lg:mx-0">
                      <item.icon className="w-6 h-6 text-[var(--color-primary-600)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)]">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6️⃣ WHITE-LABEL SECTION */}
      <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary-200)] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" size="lg" glow={true}>
                  <Award className="w-4 h-4" />
                  White-Label Ready
                </Badge>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
                Your Brand. <br />
                <GradientText variant="secondary">Our Technology.</GradientText>
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                Present a seamless, professional experience to your clients. They see your name, your logo, your domain—powered by our enterprise infrastructure.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-4">
                {[
                  { icon: Globe, text: "Custom domain (portal.youragency.com)" },
                  { icon: Award, text: "Your logo on all client-facing materials" },
                  { icon: LayoutDashboard, text: "Branded dashboards in your colors" },
                  { icon: FileText, text: "White-label PDF reports and exports" }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--border-light)] hover:border-[var(--color-secondary-300)] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary-100)] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[var(--color-secondary-600)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Floating Cards Visualization */}
              <div className="relative h-[500px]">
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [-2, 0, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-80 bg-white rounded-[var(--radius-2xl)] shadow-2xl border border-[var(--border-light)] p-6 z-20"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border-light)]">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-secondary-500)] to-[var(--color-primary-500)] flex items-center justify-center text-white font-bold">
                      Y
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">Your Agency</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Client Portal</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-[var(--border-light)] rounded w-3/4" />
                    <div className="h-2 bg-[var(--border-light)] rounded w-1/2" />
                    <div className="h-2 bg-[var(--border-light)] rounded w-5/6" />
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-[var(--color-secondary-50)] border border-[var(--color-secondary-200)]">
                    <div className="text-2xl font-bold text-[var(--color-secondary-600)]">₹4.2L</div>
                    <div className="text-xs text-[var(--text-tertiary)]">This Month Revenue</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0], rotate: [2, 0, 2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 right-0 w-80 bg-white rounded-[var(--radius-2xl)] shadow-2xl border border-[var(--border-light)] p-6 z-10"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border-light)]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-500)] flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">Monthly Report</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Generated PDF</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-tertiary)]">Occupancy</span>
                      <span className="font-bold text-[var(--text-primary)]">94%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-tertiary)]">Revenue Growth</span>
                      <span className="font-bold text-[var(--color-success-600)]">+28%</span>
                    </div>
                    <div className="h-24 bg-[var(--bg-secondary)] rounded-lg flex items-end p-2 gap-1">
                      {[30, 50, 40, 70, 60, 80, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[var(--color-primary-500)] to-[var(--color-primary-300)] rounded-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center z-30 shadow-2xl">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7️⃣ COMPARISON SECTION */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--text-primary)]">
              Basic Tools vs <br />
              <GradientText>Agency Platform</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              The difference between managing properties and scaling a business.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[var(--radius-3xl)] shadow-2xl border border-[var(--border-light)] overflow-hidden"
          >
            <div className="grid grid-cols-[1.5fr,1fr,1.2fr] gap-4 p-6 bg-[var(--bg-secondary)] border-b border-[var(--border-light)] font-bold text-lg rounded-t-[var(--radius-3xl)]">
              <div className="text-[var(--text-primary)]">Feature</div>
              <div className="text-[var(--text-tertiary)] text-center">Basic Tools</div>
              <div className="text-[var(--color-primary-600)] text-center bg-[var(--color-primary-50)] rounded-lg py-2 -my-2 border border-[var(--color-primary-200)]">Our Platform</div>
            </div>
            
            <div className="divide-y divide-[var(--border-light)] p-2">
              {comparisonData.map((row, idx) => (
                <ComparisonRow key={idx} {...row} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] font-bold border border-[var(--color-success-200)]">
              <CheckCircle2 className="w-5 h-5" />
              Trusted by 250+ agencies managing ₹100Cr+ in annual bookings
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8️⃣ SECURITY SECTION */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-primary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary-500)] rounded-full blur-3xl opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="dark" size="lg">
                <Shield className="w-4 h-4" />
                Enterprise Security
              </Badge>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6">
              Bank-Grade <span className="text-[var(--color-primary-300)]">Security</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-100)]">
              Your client data deserves military-grade protection. We deliver.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {securityFeatures.map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <div className="p-6 rounded-[var(--radius-2xl)] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-[var(--color-primary-500)]/50 transition-all text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-500)]/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[var(--color-primary-400)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-primary-200)]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'PCI DSS', 'AES-256'].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-400)]" />
                <span className="text-sm font-medium">{cert}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9️⃣ FINAL CTA */}
      <section className="py-24 bg-[var(--bg-primary)] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-[var(--text-primary)]">
              Ready to <span className="text-[var(--color-primary-600)]">Scale</span> <br />
              Your Agency?
            </h2>
            
            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
              Join 250+ agencies who've transformed their operations. Stop juggling tools. Start scaling smart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] shadow-2xl shadow-[var(--color-primary-500)]/30 hover:shadow-[var(--color-primary-500)]/50 transition-all text-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Agency Demo
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white text-[var(--text-primary)] font-bold rounded-[var(--radius-xl)] border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all text-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Talk to Sales
              </motion.button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success-600)]" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success-600)]" />
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success-600)]" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}