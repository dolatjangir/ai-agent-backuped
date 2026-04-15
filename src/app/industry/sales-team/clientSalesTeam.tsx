"use client"

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Zap, 
  MessageSquare, 
  BarChart3, 
  PieChart,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  Lock,
  Globe,
  Award,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  Funnel,
  Megaphone,
  Handshake,
  Lightbulb,
  Rocket,
  Target as TargetIcon,
  Layers,
  Settings,
  Clock,
  Star,
  Shield
} from 'lucide-react'

// Animation variants
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

// Reusable Components
const GlassCard = ({ children, className = "", hover = true, dark = false, elevated = false }: { 
  children: React.ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
  elevated?: boolean
}) => (
  <motion.div 
    whileHover={hover ? { 
      y: -6, 
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
    <span className={`inline-flex items-center gap-2 rounded-full font-bold border ${sizes[size]} ${variants[variant]} ${glow ? 'shadow-lg shadow-[var(--color-primary-500)]/20' : ''}`}>
      {children}
    </span>
  )
}

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

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color = "primary" }: { icon: any; title: string; description: string; color?: "primary" | "secondary" | "accent" }) => {
  const colorMap = {
    primary: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
    secondary: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
    accent: "from-[var(--color-accent-500)] to-[var(--color-accent-600)]"
  }
  
  return (
    <GlassCard className="p-6 h-full group" elevated={false}>
      <div className={`w-14 h-14 rounded-[var(--radius-xl)] bg-gradient-to-br ${colorMap[color]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </GlassCard>
  )
}

// Process Step Component
const ProcessStep = ({ number, title, description, icon: Icon, isLast = false }: { number: string; title: string; description: string; icon: any; isLast?: boolean }) => (
  <div className="relative flex gap-6">
    {!isLast && (
      <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary-300)] to-[var(--color-secondary-300)] hidden lg:block" />
    )}
    <div className="flex-shrink-0">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center text-white font-bold text-lg shadow-lg z-10 relative">
        {number}
      </div>
    </div>
    <div className="flex-1 pb-12">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
        <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
      </div>
      <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg">{description}</p>
    </div>
  </div>
)

// Metric Card Component
const MetricCard = ({ value, label, trend, icon: Icon }: { value: string; label: string; trend: string; icon: any }) => (
  <GlassCard className="p-6 text-center" hover={true}>
    <div className="w-12 h-12 mx-auto mb-4 rounded-[var(--radius-xl)] bg-[var(--color-primary-100)] flex items-center justify-center">
      <Icon className="w-6 h-6 text-[var(--color-primary-600)]" />
    </div>
    <div className="text-4xl font-bold text-[var(--text-primary)] mb-1">{value}</div>
    <div className="text-sm text-[var(--text-secondary)] font-medium mb-2">{label}</div>
    <div className="text-xs text-[var(--color-success-600)] font-bold bg-[var(--color-success-100)] px-3 py-1 rounded-full inline-block">
      {trend}
    </div>
  </GlassCard>
)

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, company, metric }: { quote: string; author: string; role: string; company: string; metric: string }) => (
  <GlassCard className="p-8 h-full flex flex-col" hover={true}>
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
      ))}
    </div>
    <div className="mb-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] text-xs font-bold w-fit">
      <TrendingUp className="w-3 h-3" />
      {metric}
    </div>
    <p className="text-[var(--text-secondary)] mb-6 flex-1 leading-relaxed text-lg">"{quote}"</p>
    <div className="pt-4 border-t border-[var(--border-light)]">
      <div className="font-bold text-[var(--text-primary)]">{author}</div>
      <div className="text-sm text-[var(--text-tertiary)]">{role}, {company}</div>
    </div>
  </GlassCard>
)

export default function SalesMarketingPage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  // Data
  const features = [
    {
      icon: Target,
      title: "Lead Scoring & Qualification",
      description: "AI-powered lead scoring that automatically prioritizes high-intent prospects and routes them to the right sales rep.",
      color: "primary" as const
    },
    {
      icon: MessageSquare,
      title: "Unified Communication Hub",
      description: "Centralize all prospect interactions across email, chat, and calls. Never miss a follow-up with smart reminders.",
      color: "secondary" as const
    },
    {
      icon: BarChart3,
      title: "Revenue Attribution",
      description: "Track every touchpoint from first click to closed deal. Know exactly which marketing efforts drive revenue.",
      color: "accent" as const
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Trigger-based automation that nurtures leads, schedules meetings, and updates CRM without manual work.",
      color: "primary" as const
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Shared pipelines, @mentions, and real-time updates keep sales and marketing aligned on every opportunity.",
      color: "secondary" as const
    },
    {
      icon: PieChart,
      title: "Forecasting & Analytics",
      description: "Predictive analytics that forecast revenue, identify bottlenecks, and suggest actions to hit quota.",
      color: "accent" as const
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Capture & Unify",
      description: "Aggregate leads from all channels—website, ads, events, referrals—into a single, deduplicated database with enriched profiles.",
      icon: Funnel
    },
    {
      number: "02",
      title: "Score & Prioritize",
      description: "AI analyzes behavioral signals and firmographic data to score leads. Hot prospects get instant alerts; cold leads enter nurture sequences.",
      icon: TargetIcon
    },
    {
      number: "03",
      title: "Nurture & Engage",
      description: "Automated, personalized email sequences keep prospects warm. Marketing delivers content; sales monitors engagement in real-time.",
      icon: MessageSquare
    },
    {
      number: "04",
      title: "Convert & Close",
      description: "Sales receives qualified, educated leads with full context. Meeting scheduling, proposal generation, and follow-ups are automated.",
      icon: Handshake
    },
    {
      number: "05",
      title: "Analyze & Optimize",
      description: "Closed-loop reporting shows what worked. Revenue attribution identifies top-performing channels for budget reallocation.",
      icon: BarChart3
    }
  ]

  const metrics = [
    { value: "47%", label: "Higher Conversion", trend: "vs. siloed teams", icon: TrendingUp },
    { value: "3.2x", label: "Pipeline Velocity", trend: "Faster deal cycles", icon: Zap },
    { value: "28%", label: "Lower CAC", trend: "Efficient spend", icon: PieChart },
    { value: "91%", label: "Team Alignment", trend: "Shared goals", icon: Users }
  ]

  const testimonials = [
    {
      quote: "Finally, our sales and marketing teams speak the same language. We went from 12% to 34% conversion in one quarter.",
      author: "Sarah Chen",
      role: "VP of Revenue",
      company: "TechFlow Inc.",
      metric: "+183% SQL Conversion"
    },
    {
      quote: "The automated lead scoring alone saved our sales team 15 hours per week. They now focus only on deals that close.",
      author: "Marcus Rodriguez",
      role: "Head of Sales",
      company: "CloudScale",
      metric: "15 hrs/week saved"
    },
    {
      quote: "We can now trace every dollar of revenue back to the marketing campaign that generated it. Game changer for budgeting.",
      author: "Priya Sharma",
      role: "CMO",
      company: "GrowthLabs",
      metric: "Full Attribution"
    }
  ]

  const comparisonData = [
    { feature: "Lead Management", before: "Spreadsheets & silos", after: "Unified database with enrichment" },
    { feature: "Lead Scoring", before: "Gut feeling", after: "AI-powered behavioral scoring" },
    { feature: "Handoff Process", before: "Email forwards, lost context", after: "Seamless with full history" },
    { feature: "Communication", before: "Slack threads, missed messages", after: "In-platform collaboration" },
    { feature: "Reporting", before: "Monthly Excel exports", after: "Real-time dashboards" },
    { feature: "Revenue Attribution", before: "Last-click guessing", after: "Multi-touch attribution" }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-x-hidden">
      <Head>
        <title>Close Sales & Marketing Gap | Unified Revenue Platform</title>
        <meta name="description" content="Unify your sales and marketing teams with AI-powered lead scoring, automated workflows, and closed-loop attribution. 47% higher conversion rates." />
        <meta name="keywords" content="sales marketing alignment, lead scoring, revenue attribution, sales automation, marketing automation, CRM" />
      </Head>

      {/* 🎯 UNIQUE HERO SECTION - Diagonal Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--bg-primary)] to-[var(--color-secondary-50)]" />
        
        {/* Animated Shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--color-primary-200)] rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
        
        {/* Diagonal Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_50%,var(--color-primary-50)_50%,var(--color-primary-50)_100%)] opacity-50" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
            
            {/* LEFT CONTENT - 7 columns */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-8"
            >
              <motion.div variants={fadeInLeft}>
                <Badge variant="primary" size="md" glow={true}>
                  <Handshake className="w-4 h-4" />
                  Sales + Marketing Alignment
                </Badge>
              </motion.div>

              <motion.h1 
                variants={fadeInLeft}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Close the Gap Between <br />
                <GradientText>Sales & Marketing</GradientText>
              </motion.h1>

              <motion.p 
                variants={fadeInLeft}
                className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
              >
                Unify your revenue teams with a single platform for lead scoring, 
                automated nurturing, and closed-loop attribution. Stop losing deals 
                to misalignment—start closing 47% more opportunities.
              </motion.p>

              <motion.div variants={fadeInLeft} className="flex flex-wrap gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] hover:shadow-xl hover:shadow-[var(--color-primary-500)]/30 transition-all flex items-center gap-2 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-[var(--text-primary)] font-bold rounded-[var(--radius-xl)] border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all flex items-center gap-2 text-lg"
                >
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
                    ))}
                    <span className="text-sm font-bold text-[var(--text-primary)] ml-2">4.9/5</span>
                  </div>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Trusted by <strong className="text-[var(--color-primary-600)]">2,500+ revenue teams</strong>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT CONTENT - Interactive Dashboard Preview - 5 columns */}
            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }}
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="lg:col-span-5 relative"
            >
              <div className="relative">
                {/* Main Dashboard Card */}
                <GlassCard elevated={true} className="p-6 relative z-10" hover={false}>
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-primary-500)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    Live Sync
                  </div>

                  {/* Header Tabs */}
                  <div className="flex gap-2 mb-6 pb-4 border-b border-[var(--border-light)]">
                    <button className="px-4 py-2 rounded-lg bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-semibold text-sm">
                      Marketing
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] font-semibold text-sm">
                      Sales
                    </button>
                    <button className="px-4 py-2 rounded-lg text-[var(--text-tertiary)] text-sm hover:bg-[var(--bg-secondary)]">
                      Revenue
                    </button>
                  </div>

                  {/* Pipeline Visualization */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm text-[var(--text-tertiary)] mb-2">
                      <span>Lead Pipeline</span>
                      <span className="text-[var(--color-success-600)] font-bold">+24% this week</span>
                    </div>
                    
                    {/* Pipeline Stages */}
                    {[
                      { stage: "New Leads", count: 234, color: "var(--color-primary-500)", width: "100%" },
                      { stage: "Marketing Qualified", count: 156, color: "var(--color-secondary-500)", width: "67%" },
                      { stage: "Sales Accepted", count: 89, color: "var(--color-accent-500)", width: "38%" },
                      { stage: "Opportunity", count: 45, color: "var(--color-success-500)", width: "19%" }
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[var(--text-primary)]">{item.stage}</span>
                          <span className="text-sm font-bold text-[var(--text-primary)]">{item.count}</span>
                        </div>
                        <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: item.width }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Activity Feed */}
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <div className="text-xs text-[var(--text-tertiary)] uppercase font-semibold mb-3">Recent Activity</div>
                    <div className="space-y-3">
                      {[
                        { action: "Lead scored 85/100", user: "Marketing Bot", time: "2m ago", type: "score" },
                        { action: "Meeting booked", user: "Sales Rep", time: "5m ago", type: "meeting" },
                        { action: "Email opened", user: "Prospect", time: "12m ago", type: "engage" }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'score' ? 'bg-[var(--color-primary-500)]' :
                            activity.type === 'meeting' ? 'bg-[var(--color-success-500)]' :
                            'bg-[var(--color-secondary-500)]'
                          }`} />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[var(--text-primary)]">{activity.action}</div>
                            <div className="text-xs text-[var(--text-tertiary)]">{activity.user} • {activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                {/* Floating Metric Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-[var(--radius-2xl)] p-4 shadow-2xl border border-[var(--border-light)] z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-success-100)] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[var(--color-success-600)]" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[var(--text-primary)]">47%</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Higher Conversion</div>
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
                      <RefreshCw className="w-5 h-5 text-[var(--color-primary-600)] animate-spin" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">Real-time</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Sync Active</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔥 METRICS STRIP - Bold Numbers */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {metrics.map((metric, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg font-semibold text-[var(--color-primary-100)] mb-1">{metric.label}</div>
                <div className="text-sm text-[var(--color-primary-200)]">{metric.trend}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⚡ THE ALIGNMENT PROBLEM */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="secondary" size="md">
              <Target className="w-4 h-4" />
              The Alignment Gap
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Why Sales & Marketing <span className="text-[var(--color-error-600)]">Drift Apart</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              67% of sales reps say marketing leads are poor quality. 
              76% of marketers say sales doesn't follow up. The cost? Lost revenue.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Funnel,
                title: "Lead Quality Dispute",
                stat: "67%",
                desc: "of sales reps reject marketing leads as 'poor quality' due to lack of scoring and qualification"
              },
              {
                icon: MessageSquare,
                title: "Communication Breakdown",
                stat: "76%",
                desc: "of marketers say sales doesn't provide feedback on leads, creating a feedback vacuum"
              },
              {
                icon: BarChart3,
                title: "Attribution Blindness",
                stat: "$2.1M",
                desc: "average annual revenue lost by mid-market companies due to misaligned teams"
              }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <GlassCard className="p-8 text-center h-full" hover={true}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-[var(--radius-2xl)] bg-[var(--color-error-100)] flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[var(--color-error-600)]" />
                  </div>
                  <div className="text-4xl font-bold text-[var(--color-error-600)] mb-2">{item.stat}</div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-[var(--text-secondary)]">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🎯 THE SOLUTION - 5 STEP PROCESS */}
      <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary-100)] rounded-full blur-3xl opacity-30 -translate-y-1/2" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="secondary" size="lg" glow={true}>
              <Rocket className="w-4 h-4" />
              The Solution
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              The <GradientText variant="secondary">Revenue Alignment</GradientText> Framework
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              A proven 5-step methodology that transforms disjointed teams into a unified revenue engine.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-0"
          >
            {processSteps.map((step, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <ProcessStep {...step} isLast={idx === processSteps.length - 1} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 💎 FEATURES GRID - Bento Box Layout */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="primary" size="lg" glow={true}>
              <Layers className="w-4 h-4" />
              Platform Capabilities
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Everything to <GradientText>Unify & Scale</GradientText>
            </motion.h2>
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

      {/* 📊 BEFORE/AFTER COMPARISON */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--text-primary)]">
              Before vs <GradientText>After</GradientText> Alignment
            </motion.h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[var(--radius-3xl)] shadow-2xl border border-[var(--border-light)] overflow-hidden"
          >
            <div className="grid grid-cols-[1.2fr,1fr,1fr] gap-4 p-6 bg-[var(--bg-secondary)] border-b border-[var(--border-light)]">
              <div className="font-bold text-[var(--text-primary)]">Capability</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-error-100)] text-[var(--color-error-700)] font-bold text-sm">
                  <Minus className="w-4 h-4" />
                  Before
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] font-bold text-sm">
                  <Plus className="w-4 h-4" />
                  After
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-[var(--border-light)] p-2">
              {comparisonData.map((row, idx) => (
                <div key={idx} className="grid grid-cols-[1.2fr,1fr,1fr] gap-4 p-6 items-center hover:bg-[var(--bg-secondary)] transition-colors rounded-lg">
                  <div className="font-semibold text-[var(--text-primary)]">{row.feature}</div>
                  <div className="text-center text-[var(--text-tertiary)] text-sm px-4">{row.before}</div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-semibold text-sm border border-[var(--color-primary-200)]">
                      <CheckCircle2 className="w-4 h-4" />
                      {row.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌟 TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-secondary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="dark" size="lg">
              <Award className="w-4 h-4" />
              Customer Success
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6">
              Teams That <span className="text-[var(--color-primary-300)]">Transformed</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🚀 INTEGRATION ECOSYSTEM */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="accent" size="lg">
              <Globe className="w-4 h-4" />
              Connected Ecosystem
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Plays Nice With Your <GradientText variant="accent">Existing Stack</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              Native integrations with 100+ tools. No rip-and-replace required.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {['Salesforce', 'HubSpot', 'Marketo', 'Slack', 'Zoom', 'LinkedIn', 'Google Ads', 'Facebook', 'Zapier', 'Segment'].map((tool, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="px-6 py-4 rounded-xl bg-white border border-[var(--border-light)] shadow-sm hover:shadow-md hover:border-[var(--color-primary-300)] transition-all"
              >
                <span className="font-bold text-[var(--text-primary)]">{tool}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🎯 FINAL CTA - Asymmetric Layout */}
      <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <Badge variant="primary" size="lg" glow={true}>
                  <Sparkles className="w-4 h-4" />
                  Start Aligning Today
                </Badge>
              </motion.div>
              
              <motion.h2 variants={fadeInLeft} className="text-5xl sm:text-6xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
                Ready to Close More <GradientText>Deals Together</GradientText>?
              </motion.h2>
              
              <motion.p variants={fadeInLeft} className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                Join 2,500+ revenue teams who've eliminated the sales-marketing divide. 
                Start your free trial—no credit card required.
              </motion.p>

              <motion.div variants={fadeInLeft} className="space-y-4 mb-8">
                {[
                  "Free 14-day trial with full features",
                  "Dedicated onboarding specialist",
                  "Migrate from your current CRM free",
                  "Cancel anytime, no questions asked"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-success-100)] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-success-600)]" />
                    </div>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] shadow-2xl shadow-[var(--color-primary-500)]/30 hover:shadow-[var(--color-primary-500)]/50 transition-all text-lg flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-[var(--text-primary)] font-bold rounded-[var(--radius-xl)] border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all text-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Talk to Sales
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <GlassCard elevated={true} className="p-8" hover={false}>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Quick Start Assessment</h3>
                  <p className="text-[var(--text-secondary)]">See your alignment score in 2 minutes</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">Lead Response Time</span>
                      <span className="text-sm font-bold text-[var(--color-error-600)]">4.2 hrs</span>
                    </div>
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-[var(--color-error-500)] rounded-full" />
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Industry best: &lt; 5 minutes</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">MQL to SQL Conversion</span>
                      <span className="text-sm font-bold text-[var(--color-warning-600)]">12%</span>
                    </div>
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-[var(--color-warning-500)] rounded-full" />
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Top performers: 35%+</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">Revenue Attribution</span>
                      <span className="text-sm font-bold text-[var(--color-error-600)]">Partial</span>
                    </div>
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <div className="h-full w-[25%] bg-[var(--color-error-500)] rounded-full" />
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Full multi-touch needed</p>
                  </div>
                </div>

                <button className="w-full mt-6 py-4 bg-[var(--color-text)] text-[var(--color-background)] font-bold rounded-[var(--radius-xl)] hover:bg-[var(--color-text)]/90 transition-all">
                  Get Full Assessment
                </button>
              </GlassCard>
            </motion.div>
          </div>
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