"use client"

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion'
import { 
  Heart,
  Users,
  TrendingUp,
  ArrowUpRight,
  Shield,
  Zap,
  MessageCircle,
  BarChart3,
  PieChart,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  Target,
  Clock,
  Award,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  LifeBuoy,
  Headphones,
  Smile,
  ThumbsUp,
  Star,
  Gift,
  Crown,
  TrendingDown,
  AlertTriangle,
  Check,
  X,
  HelpCircle,
  Rocket,
  Lightbulb,
  Megaphone,
  Handshake,
  Lock,
  Globe,
  Layers
} from 'lucide-react'

// Animation variants
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

// Reusable Components
const GlassCard = ({ children, className = "", hover = true, dark = false, elevated = false, gradient = false }: { 
  children: React.ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
  elevated?: boolean
  gradient?: boolean
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
      gradient
        ? 'bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-600)] text-white border-transparent'
        : dark 
          ? 'bg-[var(--color-neutral-800)]/90 border-[var(--color-neutral-700)] text-white' 
          : elevated
            ? 'bg-white shadow-2xl shadow-[var(--color-primary-500)]/10 border-[var(--border-light)]'
            : 'bg-white/90 shadow-xl border-[var(--border-light)] '
    } ${className}`}
  >
    {children}
  </motion.div>
)

const GradientText = ({ children, className = "", variant = "primary" }: { 
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent" | "success"
}) => {
  const gradients = {
    primary: "from-[var(--color-primary-600)] to-[var(--color-secondary-600)]",
    secondary: "from-[var(--color-secondary-600)] to-[var(--color-primary-600)]",
    accent: "from-[var(--color-accent-500)] to-[var(--color-primary-600)]",
    success: "from-[var(--color-success-500)] to-[var(--color-primary-600)]"
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

// Feature Card with Icon
const FeatureCard = ({ icon: Icon, title, description, stat, trend, color = "primary" }: { 
  icon: any; 
  title: string; 
  description: string; 
  stat?: string; 
  trend?: string;
  color?: "primary" | "secondary" | "accent" | "success"
}) => {
  const colorMap = {
    primary: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
    secondary: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
    accent: "from-[var(--color-accent-500)] to-[var(--color-accent-600)]",
    success: "from-[var(--color-success-500)] to-[var(--color-success-600)]"
  }

  const bgMap = {
    primary: "bg-[var(--color-primary-50)]",
    secondary: "bg-[var(--color-secondary-50)]",
    accent: "bg-[var(--color-accent-50)]",
    success: "bg-[var(--color-success-50)]"
  }

  return (
    <GlassCard className="p-6 h-full group" hover={true}>
      <div className={`w-14 h-14 rounded-[var(--radius-xl)] bg-gradient-to-br ${colorMap[color]} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">{description}</p>
      {stat && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${bgMap[color]} text-sm font-bold`}>
          {stat}
          {trend && <span className="text-xs opacity-80">{trend}</span>}
        </div>
      )}
    </GlassCard>
  )
}

// Testimonial Card
const TestimonialCard = ({ quote, author, role, company, metric, image }: { 
  quote: string; 
  author: string; 
  role: string; 
  company: string; 
  metric: string;
  image?: string;
}) => (
  <GlassCard className="p-8 h-full flex flex-col relative overflow-hidden" hover={true}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-secondary-200)] rounded-full blur-3xl opacity-30" />
    
    <div className="relative z-10 flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
      ))}
    </div>
    
    <div className="mb-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] text-xs font-bold w-fit">
      <TrendingUp className="w-3 h-3" />
      {metric}
    </div>
    
    <p className="text-[var(--text-secondary)] mb-6 flex-1 leading-relaxed text-lg italic">"{quote}"</p>
    
    <div className="pt-6 border-t border-[var(--border-light)] flex items-center gap-4">
      <div className="min-w-12 min-h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] flex items-center justify-center text-white font-bold text-lg">
        {author.charAt(0)}
      </div>
      <div>
        <div className="font-bold text-[var(--text-primary)]">{author}</div>
        <div className="text-sm text-[var(--text-tertiary)]">{role}, {company}</div>
      </div>
    </div>
  </GlassCard>
)

// Metric Card with Icon
const MetricCard = ({ value, label, subtext, icon: Icon, trend }: { 
  value: string; 
  label: string; 
  subtext: string; 
  icon: any;
  trend?: string;
}) => (
  <GlassCard className="p-6 text-center" hover={true}>
    <div className="w-12 h-12 mx-auto mb-4 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)]  flex items-center justify-center">
      <Icon className="w-6 h-6 text-[var(--color-primary-600)]" />
    </div>
    <div className="text-4xl font-bold text-[var(--text-primary)] mb-1">{value}</div>
    <div className="text-sm text-[var(--text-secondary)] font-medium mb-1">{label}</div>
    <div className="text-xs text-[var(--text-tertiary)]">{subtext}</div>
    {trend && (
      <div className="mt-2 text-xs text-[var(--color-success-600)] font-bold bg-[var(--color-success-100)] px-2 py-1 rounded-full inline-block">
        {trend}
      </div>
    )}
  </GlassCard>
)

// Process Step Component
const ProcessStep = ({ number, title, description, icon: Icon }: { number: string; title: string; description: string; icon: any }) => (
  <div className="relative group">
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
          {number}
        </div>
      </div>
      <div className="flex-1 pb-12">
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg">{description}</p>
      </div>
    </div>
  </div>
)

// Comparison Row
const ComparisonRow = ({ feature, before, after }: { feature: string; before: string; after: string }) => (
  <div className="grid grid-cols-[1fr,1fr,1.2fr] gap-4 p-4 items-center hover:bg-[var(--bg-secondary)] transition-colors rounded-xl">
    <div className="font-semibold text-[var(--text-primary)]">{feature}</div>
    <div className="flex items-center gap-2 text-[var(--color-error-600)] text-sm">
      <X className="w-4 h-4" />
      {before}
    </div>
    <div className="flex items-center gap-2 text-[var(--color-success-700)] font-semibold text-sm bg-[var(--color-success-50)] px-3 py-2 rounded-lg">
      <Check className="w-4 h-4" />
      {after}
    </div>
  </div>
)

export default function CustomerSuccessPage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const heroRotate = useTransform(scrollYProgress, [0, 0.5], [0, -5])

  // Data
  const features = [
    {
      icon: Heart,
      title: "Proactive Health Scoring",
      description: "AI-powered customer health scores predict churn 30 days in advance. Intervene before it's too late.",
      stat: "94%",
      trend: "accuracy",
      color: "primary" as const
    },
    {
      icon: MessageCircle,
      title: "Intelligent Automation",
      description: "Automated check-ins, onboarding sequences, and renewal reminders that feel personal, not robotic.",
      stat: "60%",
      trend: "time saved",
      color: "secondary" as const
    },
    {
      icon: BarChart3,
      title: "Revenue Expansion",
      description: "Identify upsell opportunities with usage analytics. Turn support tickets into growth conversations.",
      stat: "32%",
      trend: "LTV increase",
      color: "accent" as const
    },
    {
      icon: LifeBuoy,
      title: "360° Customer View",
      description: "Unified timeline of every interaction, ticket, and milestone. Context for every conversation.",
      stat: "100%",
      trend: "visibility",
      color: "primary" as const
    },
    {
      icon: Zap,
      title: "Smart Workflows",
      description: "Trigger-based automation for onboarding, renewals, and escalations. Never drop the ball.",
      stat: "5x",
      trend: "faster resolution",
      color: "secondary" as const
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Shared playbooks, @mentions, and handoffs between sales, success, and support teams.",
      stat: "Zero",
      trend: "silos",
      color: "success" as const
    }
  ]

  const testimonials = [
    {
      quote: "We reduced churn by 40% in the first quarter. The health scoring alerts us to at-risk accounts before they even think about leaving.",
      author: "Jennifer Walsh",
      role: "VP of Customer Success",
      company: "CloudSync",
      metric: "-40% Churn"
    },
    {
      quote: "Our CSMs used to spend 70% of their time on admin. Now they spend 80% with customers. The automation is incredible.",
      author: "David Chen",
      role: "Head of CS",
      company: "DataFlow",
      metric: "+200% Efficiency"
    },
    {
      quote: "We identified $2M in expansion revenue in 6 months. The platform literally pays for itself 10x over.",
      author: "Maria Santos",
      role: "Chief Revenue Officer",
      company: "GrowthLabs",
      metric: "$2M Expansion"
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Onboard & Activate",
      description: "Automated onboarding sequences guide customers to first value quickly. Track activation milestones and intervene when stuck.",
      icon: Rocket
    },
    {
      number: "02",
      title: "Monitor & Predict",
      description: "AI health scores combine product usage, support tickets, and engagement signals to predict churn risk 30 days early.",
      icon: Target
    },
    {
      number: "03",
      title: "Engage & Support",
      description: "Proactive outreach triggered by behavior. Automated check-ins, training offers, and support before they ask.",
      icon: MessageCircle
    },
    {
      number: "04",
      title: "Expand & Grow",
      description: "Identify power users ready for upsell. Track feature adoption gaps and suggest upgrades at the perfect moment.",
      icon: TrendingUp
    },
    {
      number: "05",
      title: "Retain & Renew",
      description: "Automated renewal campaigns, usage reports, and executive business reviews that secure multi-year commitments.",
      icon: RefreshCw
    }
  ]

  const metrics = [
    { value: "40%", label: "Churn Reduction", subtext: "Average within 90 days", icon: TrendingDown, trend: "Proven" },
    { value: "32%", label: "LTV Increase", subtext: "Through expansion revenue", icon: TrendingUp, trend: "Sustained" },
    { value: "5x", label: "Faster Response", subtext: "To at-risk accounts", icon: Zap, trend: "Immediate" },
    { value: "94%", label: "Health Accuracy", subtext: "AI prediction score", icon: Target, trend: "Reliable" }
  ]

  const comparisonData = [
    { feature: "Churn Prediction", before: "Reactive, after cancellation", after: "30-day early warning" },
    { feature: "Customer Visibility", before: "Fragmented across tools", after: "360° unified timeline" },
    { feature: "Engagement", before: "Random check-ins", after: "Behavior-triggered outreach" },
    { feature: "Expansion", before: "Missed opportunities", after: "AI-identified upsell moments" },
    { feature: "Renewals", before: "Last-minute scrambles", after: "Automated renewal campaigns" },
    { feature: "Team Efficiency", before: "70% admin, 30% customer", after: "20% admin, 80% customer" }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-x-hidden">
      <Head>
        <title>Customer Success Platform | Reduce Churn, Increase LTV</title>
        <meta name="description" content="AI-powered customer success platform that predicts churn, automates engagement, and drives expansion revenue. 40% average churn reduction." />
        <meta name="keywords" content="customer success, churn reduction, LTV, customer health score, expansion revenue, retention" />
      </Head>

      {/* 🎯 UNIQUE HERO SECTION - Circular Layout with Orbiting Elements */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--bg-primary)] to-[var(--color-secondary-50)]" />
        
        {/* Animated Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 border-2 border-[var(--color-primary-200)] rounded-full opacity-30 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-12 border-2 border-[var(--color-secondary-200)] rounded-full opacity-20 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-24 border-2 border-[var(--color-accent-200)] rounded-full opacity-10 animate-[spin_30s_linear_infinite]" />
        </div>

        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-64 h-64 bg-[var(--color-primary-300)] rounded-full blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-[var(--color-secondary-300)] rounded-full blur-3xl opacity-20"
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            
            {/* LEFT CONTENT */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInLeft}>
                <Badge variant="success" size="md" glow={true}>
                  <Heart className="w-4 h-4" />
                  Customer Success Platform
                </Badge>
              </motion.div>

              <motion.h1 
                variants={fadeInLeft}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              >
                Reduce Churn. <br />
                <GradientText variant="success">Increase LTV.</GradientText>
              </motion.h1>

              <motion.p 
                variants={fadeInLeft}
                className="text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed"
              >
                AI-powered customer success that predicts churn 30 days early, 
                automates personalized engagement at scale, and turns support 
                into your biggest growth engine.
              </motion.p>

              <motion.div variants={fadeInLeft} className="flex flex-wrap gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-primary-600)] text-white font-bold rounded-[var(--radius-xl)] hover:shadow-xl hover:shadow-[var(--color-success-500)]/30 transition-all flex items-center gap-2 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-[var(--text-primary)] font-bold rounded-[var(--radius-xl)] border-2 border-[var(--border-medium)] hover:border-[var(--color-success-400)] hover:bg-[var(--color-success-50)] transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <PlayCircle className="w-5 h-5" />
                  See It In Action
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex items-center gap-8 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-[var(--color-success-600)]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">40%</div>
                    <div className="text-xs text-[var(--text-tertiary)]">Avg Churn Reduction</div>
                  </div>
                </div>
                <div className="h-12 w-px bg-[var(--border-medium)]" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[var(--text-primary)]">32%</div>
                    <div className="text-xs text-[var(--text-tertiary)]">LTV Increase</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT CONTENT - Interactive Customer Health Dashboard */}
            <motion.div 
              style={{ y: heroY, rotate: heroRotate }}
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative"
            >
              <div className="relative">
                {/* Main Health Score Card */}
                <GlassCard elevated={true} className="p-8 relative z-10" hover={false}>
                  <div className="absolute -top-2 -right-2  bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-primary-500)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    Live Health Score
                  </div>

                  {/* Health Score Circle */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-sm text-[var(--text-tertiary)] uppercase font-semibold mb-1">Customer Health</div>
                      <div className="text-3xl font-bold text-[var(--text-primary)]">Acme Corp</div>
                    </div>
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="var(--border-light)" strokeWidth="8" fill="none" />
                        <motion.circle 
                          cx="48" cy="48" r="40" 
                          stroke="url(#gradient)" 
                          strokeWidth="8" 
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 0.87 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--color-success-500)" />
                            <stop offset="100%" stopColor="var(--color-primary-500)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-[var(--color-success-600)]">87</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Factors */}
                  <div className="space-y-4 mb-6">
                    {[
                      { label: "Product Usage", score: 92, color: "var(--color-success-500)" },
                      { label: "Support Tickets", score: 78, color: "var(--color-warning-500)" },
                      { label: "Engagement", score: 95, color: "var(--color-success-500)" },
                      { label: "NPS Score", score: 85, color: "var(--color-primary-500)" }
                    ].map((factor, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[var(--text-secondary)]">{factor.label}</span>
                          <span className="font-bold" style={{ color: factor.color }}>{factor.score}</span>
                        </div>
                        <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${factor.score}%` }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: factor.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Risk Alert */}
                  <div className="p-4 rounded-xl bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-warning-600)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[var(--color-warning-700)] text-sm">Renewal Risk Detected</div>
                      <div className="text-xs text-[var(--color-warning-600)]">Contract expires in 45 days. No recent engagement.</div>
                    </div>
                  </div>
                </GlassCard>

                {/* Orbiting Mini Cards */}
                <motion.div 
                  animate={{ 
                    rotate: [0, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-16 right-0"
                >
                  <div className="bg-white rounded-xl p-3 shadow-xl border border-[var(--border-light)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success-600)]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)]">On Track</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ 
                    rotate: [0, -360],
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4"
                >
                  <div className="bg-white rounded-xl p-3 shadow-xl border border-[var(--border-light)]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-[var(--color-primary-600)]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-primary)]">Auto-Engage</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔥 TRUST STRIP */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-primary-600)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: 500, suffix: "+", label: "CS Teams", sub: "Powered by us" },
              { value: 10, suffix: "M+", label: "Customers", sub: "Managed daily" },
              { value: 98, suffix: "%", label: "Retention", sub: "Of our customers" },
              { value: 4.9, suffix: "/5", label: "Rating", sub: "G2 Leader" }
            ].map((metric, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <div className="text-5xl font-bold mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-lg font-semibold text-[var(--color-success-100)]">{metric.label}</div>
                <div className="text-sm text-[var(--color-success-200)]">{metric.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 💔 THE CHURN PROBLEM */}
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
              <TrendingDown className="w-4 h-4" />
              The Churn Epidemic
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Why Customers <span className="text-[var(--color-error-600)]">Leave</span> Without Warning
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              The average SaaS company loses 5-10% of customers monthly. 
              By the time you notice, it's already too late.
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
                icon: AlertTriangle,
                title: "Silent Dissatisfaction",
                stat: "68%",
                desc: "of customers churn without ever contacting support. They simply fade away."
              },
              {
                icon: Clock,
                title: "Late Intervention",
                stat: "90 days",
                desc: "too late. By the time you see churn signals, the decision is already made."
              },
              {
                icon: X,
                title: "Preventable Loss",
                stat: "$1.6T",
                desc: "annual global revenue lost to churn. Most of it was completely preventable."
              }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <GlassCard className="p-8 text-center h-full border-t-4 border-t-[var(--color-error-500)]" hover={true}>
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-success-100)] rounded-full blur-3xl opacity-20 -translate-y-1/2" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="success" size="lg" glow={true}>
              <Heart className="w-4 h-4" />
              The Retention System
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              From Reactive to <GradientText variant="success">Proactive</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              Our 5-step framework transforms how you engage, retain, and grow customers.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid   md:grid-cols-5 gap-6"
          >
            {processSteps.map((step, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <GlassCard gradient={idx === 2} className={`p-6 h-full text-center ${idx === 2 ? 'text-white' : ''}`} hover={true}>
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold ${idx === 2 ? 'bg-white/20' : 'bg-gradient-to-br from-[var(--color-success-500)] to-[var(--color-primary-500)] text-white'}`}>
                    {step.number}
                  </div>
                  <step.icon className={`w-6 h-6 mx-auto mb-3 ${idx === 2 ? 'text-white' : 'text-[var(--color-primary-600)]'}`} />
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className={`text-sm ${idx === 2 ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⚡ FEATURES GRID - Bento Style */}
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
              <Zap className="w-4 h-4" />
              Platform Capabilities
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Everything to <GradientText>Retain & Grow</GradientText>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 📊 METRICS GRID */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.map((metric, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <MetricCard {...metric} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔄 BEFORE/AFTER COMPARISON */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-primary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="dark" size="lg">
              <RefreshCw className="w-4 h-4" />
              Transformation
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6">
              Before vs <span className="text-[var(--color-success-400)]">After</span> Our Platform
            </motion.h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-[var(--radius-3xl)] border border-white/20 overflow-hidden"
          >
            <div className="grid grid-cols-[1fr,1fr,1.2fr] gap-4 p-6 bg-white/5 border-b border-white/10 font-bold">
              <div>Capability</div>
              <div className="text-center text-[var(--color-error-300)]">Before</div>
              <div className="text-center text-[var(--color-success-300)]">After</div>
            </div>
            <div className="p-2 space-y-1">
              {comparisonData.map((row, idx) => (
                <div key={idx} className="grid grid-cols-[1fr,1fr,1.2fr] gap-4 p-4 items-center hover:bg-white/5 transition-colors rounded-lg">
                  <div className="font-medium">{row.feature}</div>
                  <div className="text-center text-white/60 text-sm px-2 py-1 bg-[var(--color-error-500)]/20 rounded">{row.before}</div>
                  <div className="text-center text-sm px-3 py-2 bg-[var(--color-success-500)]/20 text-[var(--color-success-300)] rounded-lg font-semibold border border-[var(--color-success-500)]/30">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌟 TESTIMONIALS */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="secondary" size="lg" glow={true}>
              <Award className="w-4 h-4" />
              Customer Love
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Teams That <GradientText>Transformed</GradientText>
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

      {/* 🎁 EXPANSION REVENUE SECTION */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-secondary-50)] to-[var(--color-primary-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <Badge variant="accent" size="lg">
                  <Gift className="w-4 h-4" />
                  Growth Engine
                </Badge>
              </motion.div>
              
              <motion.h2 variants={fadeInLeft} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
                Turn Support Into <br />
                <GradientText variant="primary">Expansion Revenue</GradientText>
              </motion.h2>
              
              <motion.p variants={fadeInLeft} className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                Every support ticket is a growth opportunity. Our AI identifies power users, 
                tracks feature adoption gaps, and suggests the perfect upsell moment—automatically.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-4">
                {[
                  { icon: Target, text: "Identify power users with usage analytics" },
                  { icon: Lightbulb, text: "Track feature adoption gaps automatically" },
                  { icon: Megaphone, text: "Trigger upsell campaigns at optimal moments" },
                  { icon: TrendingUp, text: "Measure expansion revenue attribution" }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInLeft} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--border-light)] hover:border-[var(--color-accent-300)] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-100)] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[var(--color-accent-600)]" />
                    </div>
                    <span className="font-medium text-[var(--text-primary)]">{item.text}</span>
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
              <GlassCard elevated={true} className="p-8" hover={false}>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-secondary-500)] to-[var(--color-primary-500)] flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Expansion Revenue</h3>
                  <p className="text-[var(--text-secondary)]">Identified this quarter</p>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">Upsell Opportunities</span>
                      <Badge variant="success" size="sm">12 Ready</Badge>
                    </div>
                    <div className="text-3xl font-bold text-[var(--color-accent-600)]">$485K</div>
                    <div className="text-xs text-[var(--text-tertiary)] mt-1">Across 45 accounts</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">Cross-sell Potential</span>
                      <Badge variant="primary" size="sm">8 Identified</Badge>
                    </div>
                    <div className="text-3xl font-bold text-[var(--color-primary-600)]">$320K</div>
                    <div className="text-xs text-[var(--text-tertiary)] mt-1">New product lines</div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--color-success-50)] to-[var(--color-primary-50)] border border-[var(--color-success-200)]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">Total Expansion</span>
                      <Badge variant="success" size="sm">+32% LTV</Badge>
                    </div>
                    <div className="text-4xl font-bold text-[var(--color-success-600)]">$805K</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-success-500)] to-[var(--color-primary-600)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-sm mb-8">
              <Heart className="w-4 h-4" />
              Start Retaining More Customers Today
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Ready to Reduce Churn <br />
              <span className="text-[var(--color-success-100)]">by 40%?</span>
            </h2>

            <p className="text-xl text-[var(--color-success-100)] mb-10 max-w-2xl mx-auto">
              Join 500+ customer success teams who've transformed retention into their competitive advantage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white text-[var(--color-success-600)] font-bold rounded-[var(--radius-xl)] shadow-2xl hover:shadow-white/30 transition-all text-lg flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-transparent text-white font-bold rounded-[var(--radius-xl)] border-2 border-white hover:bg-white/10 transition-all text-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Talk to CS Expert
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--color-success-100)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Dedicated onboarding
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Styles */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}