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
  Megaphone,
  Funnel,
  Handshake,
  Lightbulb,
  Rocket,
  Layers,
  Globe,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  Eye,
  Lock,
  Award,
  Star,
  Crown,
  TrendingDown,
  AlertTriangle,
  Check,
  X,
  HelpCircle,
  Share2,
  PenTool,
  Video,
  Image as ImageIcon,
  FileText,
  MousePointer,
  Clock,
  DollarSign,
  Percent,
  Activity,
  Smartphone,
  Laptop,
  Tablet,
  Calculator
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

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

const floatAnimation = {
  y: [0, -20, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
}

// Reusable Components
const GlassCard = ({ children, className = "", hover = true, dark = false, elevated = false, gradient = false, color = "primary" }: { 
  children: React.ReactNode
  className?: string
  hover?: boolean
  dark?: boolean
  elevated?: boolean
  gradient?: boolean
  color?: "primary" | "secondary" | "accent" | "success"
  style?: React.CSSProperties;
}) => {
  const gradientMap = {
    primary: "from-[var(--color-primary-500)] to-[var(--color-secondary-600)]",
    secondary: "from-[var(--color-secondary-500)] to-[var(--color-accent-600)]",
    accent: "from-[var(--color-accent-500)] to-[var(--color-primary-600)]",
    success: "from-[var(--color-success-500)] to-[var(--color-primary-600)]"
  }

  return (
    <motion.div 
      whileHover={hover ? { 
        y: -8, 
        boxShadow: elevated 
          ? "0 30px 60px -15px rgba(37, 99, 235, 0.3)"
          : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 } 
      } : {}}
      className={`relative overflow-hidden rounded-[var(--radius-2xl)] backdrop-blur-xl border transition-all duration-300 ${
        gradient
          ? `bg-gradient-to-br ${gradientMap[color]} text-white border-transparent`
          : dark 
            ? 'bg-[var(--color-neutral-800)]/95 border-[var(--color-neutral-700)] text-white' 
            : elevated
              ? 'bg-white shadow-2xl shadow-[var(--color-primary-500)]/10 border-[var(--border-light)]'
              : 'bg-white/95 shadow-xl border-[var(--border-light)]'
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}

const GradientText = ({ children, className = "", variant = "primary" }: { 
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent" | "success" | "warning"
}) => {
  const gradients = {
    primary: "from-[var(--color-primary-600)] to-[var(--color-secondary-600)]",
    secondary: "from-[var(--color-secondary-600)] to-[var(--color-accent-600)]",
    accent: "from-[var(--color-accent-600)] to-[var(--color-primary-600)]",
    success: "from-[var(--color-success-600)] to-[var(--color-primary-600)]",
    warning: "from-[var(--color-warning-600)] to-[var(--color-primary-600)]"
  }
  
  return (
    <span className={`bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

const Badge = ({ children, variant = "primary", size = "md", glow = false, icon: Icon }: { 
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "dark" | "success" | "warning"
  size?: "sm" | "md" | "lg"
  glow?: boolean
  icon?: any
}) => {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-6 py-2 text-base"
  }
  
  const variants = {
    primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border-[var(--color-primary-200)]",
    secondary: "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] border-[var(--color-secondary-200)]",
    accent: "bg-[var(--color-accent-100)] text-[var(--color-accent-700)] border-[var(--color-accent-200)]",
    dark: "bg-[var(--color-neutral-800)] text-white border-[var(--color-neutral-700)]",
    success: "bg-[var(--color-success-100)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    warning: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]"
  }
  
  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-bold border ${sizes[size]} ${variants[variant]} ${glow ? 'shadow-lg shadow-[var(--color-primary-500)]/20' : ''}`}>
      {Icon && <Icon className="w-4 h-4" />}
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
const FeatureCard = ({ icon: Icon, title, description, stat, trend, color = "primary", large = false }: { 
  icon: any; 
  title: string; 
  description: string; 
  stat?: string; 
  trend?: string;
  color?: "primary" | "secondary" | "accent" | "success"
  large?: boolean
}) => {
  const colorMap = {
    primary: { bg: "bg-[var(--color-primary-50)]", text: "text-[var(--color-primary-600)]", border: "border-[var(--color-primary-200)]" },
    secondary: { bg: "bg-[var(--color-secondary-50)]", text: "text-[var(--color-secondary-600)]", border: "border-[var(--color-secondary-200)]" },
    accent: { bg: "bg-[var(--color-accent-50)]", text: "text-[var(--color-accent-600)]", border: "border-[var(--color-accent-200)]" },
    success: { bg: "bg-[var(--color-success-50)]", text: "text-[var(--color-success-600)]", border: "border-[var(--color-success-200)]" }
  }

  const c = colorMap[color]

  return (
    <GlassCard className={`p-6 h-full group ${large ? 'p-8' : ''}`} hover={true}>
      <div className={`w-14 h-14 rounded-[var(--radius-xl)] ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${large ? 'w-16 h-16' : ''}`}>
        <Icon className={`w-7 h-7 ${c.text} ${large ? 'w-8 h-8' : ''}`} />
      </div>
      <h3 className={`font-bold mb-2 text-[var(--text-primary)] group-hover:${c.text} transition-colors ${large ? 'text-2xl' : 'text-xl'}`}>{title}</h3>
      <p className={`text-[var(--text-secondary)] mb-4 leading-relaxed ${large ? 'text-base' : 'text-sm'}`}>{description}</p>
      {stat && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${c.bg} ${c.text} text-sm font-bold border ${c.border}`}>
          {stat}
          {trend && <span className="text-xs opacity-80 font-normal">{trend}</span>}
        </div>
      )}
    </GlassCard>
  )
}

// Testimonial Card
const TestimonialCard = ({ quote, author, role, company, metric, image, large = false }: { 
  quote: string; 
  author: string; 
  role: string; 
  company: string; 
  metric: string;
  image?: string;
  large?: boolean
}) => (
  <GlassCard className={`p-8 h-full flex flex-col relative overflow-hidden ${large ? 'p-10' : ''}`} hover={true}>
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-secondary-200)] rounded-full blur-3xl opacity-30" />
    
    <div className="relative z-10 flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${large ? 'w-5 h-5' : 'w-4 h-4'} fill-[var(--color-warning-500)] text-[var(--color-warning-500)]`} />
      ))}
    </div>
    
    <div className="mb-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] text-xs font-bold w-fit">
      <TrendingUp className="w-3 h-3" />
      {metric}
    </div>
    
    <p className={`text-[var(--text-secondary)] mb-6 flex-1 leading-relaxed italic ${large ? 'text-xl' : 'text-lg'}`}>"{quote}"</p>
    
    <div className="pt-6 border-t border-[var(--border-light)] flex items-center gap-4">
      <div className={`rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] flex items-center justify-center text-white font-bold ${large ? 'w-14 h-14 text-xl' : 'w-12 h-12 text-lg'}`}>
        {author.charAt(0)}
      </div>
      <div>
        <div className={`font-bold text-[var(--text-primary)] ${large ? 'text-lg' : ''}`}>{author}</div>
        <div className={`text-[var(--text-tertiary)] ${large ? 'text-sm' : 'text-xs'}`}>{role}, {company}</div>
      </div>
    </div>
  </GlassCard>
)

// Metric Card
const MetricCard = ({ value, label, subtext, icon: Icon, trend, large = false }: { 
  value: string; 
  label: string; 
  subtext: string; 
  icon: any;
  trend?: string;
  large?: boolean
}) => (
  <GlassCard className={`text-center ${large ? 'p-8' : 'p-6'}`} hover={true}>
    <div className={`mx-auto mb-4 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center ${large ? 'w-16 h-16' : 'w-12 h-12'}`}>
      <Icon className={`text-[var(--color-primary-600)] ${large ? 'w-8 h-8' : 'w-6 h-6'}`} />
    </div>
    <div className={`font-bold text-[var(--text-primary)] mb-1 ${large ? 'text-5xl' : 'text-4xl'}`}>{value}</div>
    <div className={`text-[var(--text-secondary)] font-medium mb-1 ${large ? 'text-base' : 'text-sm'}`}>{label}</div>
    <div className={`text-[var(--text-tertiary)] ${large ? 'text-sm' : 'text-xs'}`}>{subtext}</div>
    {trend && (
      <div className={`mt-2 text-xs text-[var(--color-success-600)] font-bold bg-[var(--color-success-100)] px-3 py-1 rounded-full inline-block`}>
        {trend}
      </div>
    )}
  </GlassCard>
)

// Process Step
const ProcessStep = ({ number, title, description, icon: Icon, color = "primary" }: { number: string; title: string; description: string; icon: any; color?: "primary" | "secondary" | "accent" }) => {
  const colorMap = {
    primary: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
    secondary: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
    accent: "from-[var(--color-primary-500)] to-[var(--color-secondary-600)]"
  }

  return (
    <div className="relative group">
      <div className="flex flex-col items-center text-center">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white font-bold text-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="w-12 h-12 rounded-full bg-white border-4 border-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] font-bold text-lg -mt-14 mb-4 relative z-10 shadow-lg">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{title}</h3>
        <p className="text-[var(--text-secondary)] max-w-xs">{description}</p>
      </div>
    </div>
  )
}

// Comparison Row
const ComparisonRow = ({ feature, before, after, highlight = false }: { feature: string; before: string; after: string; highlight?: boolean }) => (
  <div className={`grid grid-cols-[1.2fr,1fr,1.2fr] gap-4 p-5 items-center rounded-xl transition-all ${highlight ? 'bg-[var(--color-primary-50)] border-2 border-[var(--color-primary-200)]' : 'hover:bg-[var(--bg-secondary)]'}`}>
    <div className="font-semibold text-[var(--text-primary)] flex items-center gap-3">
      {highlight && <div className="w-1.5 h-8 bg-[var(--color-primary-500)] rounded-full" />}
      {feature}
    </div>
    <div className="flex items-center gap-2 text-[var(--color-error-600)] text-sm bg-[var(--color-error-50)] px-3 py-2 rounded-lg">
      <X className="w-4 h-4 flex-shrink-0" />
      <span>{before}</span>
    </div>
    <div className="flex items-center gap-2 text-[var(--color-success-700)] font-semibold text-sm bg-[var(--color-success-50)] px-3 py-2 rounded-lg border border-[var(--color-success-200)]">
      <Check className="w-4 h-4 flex-shrink-0" />
      <span>{after}</span>
    </div>
  </div>
)

// Tab Component
const TabButton = ({ active, onClick, children, icon: Icon }: { active: boolean; onClick: () => void; children: React.ReactNode; icon: any }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${
      active 
        ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white shadow-lg' 
        : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-light)]'
    }`}
  >
    <Icon className="w-5 h-5" />
    {children}
  </button>
)

export default function MarketingPage() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const [activeTab, setActiveTab] = useState(0)

  // Data
  const features = [
    {
      icon: Target,
      title: "Unified Customer Data",
      description: "Single source of truth for every prospect and customer. Eliminate data silos between marketing and sales.",
      stat: "360°",
      trend: "view",
      color: "primary" as const,
      large: true
    },
    {
      icon: Funnel,
      title: "Lead Scoring & Routing",
      description: "AI-powered scoring automatically prioritizes and routes leads to the right sales rep instantly.",
      stat: "94%",
      trend: "accuracy",
      color: "secondary" as const
    },
    {
      icon: MessageSquare,
      title: "Omnichannel Engagement",
      description: "Orchestrate email, social, ads, and sales outreach from one platform with unified messaging.",
      stat: "5x",
      trend: "engagement",
      color: "accent" as const
    },
    {
      icon: BarChart3,
      title: "Revenue Attribution",
      description: "Track every touchpoint from first click to closed deal. Know which campaigns actually drive revenue.",
      stat: "100%",
      trend: "attribution",
      color: "primary" as const
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Trigger-based workflows that nurture leads, alert sales, and update records automatically.",
      stat: "60%",
      trend: "time saved",
      color: "secondary" as const
    },
    {
      icon: Handshake,
      title: "Sales-Marketing SLAs",
      description: "Built-in service level agreements ensure leads never fall through the cracks.",
      stat: "Zero",
      trend: "leads lost",
      color: "success" as const
    }
  ]

  const testimonials = [
    {
      quote: "Finally, our teams are speaking the same language. Marketing knows what sales needs, and sales trusts the leads they get. Our conversion rate doubled in 60 days.",
      author: "Sarah Chen",
      role: "Chief Marketing Officer",
      company: "TechFlow Inc.",
      metric: "+107% SQL Rate",
      large: true
    },
    {
      quote: "The lead scoring alone transformed our efficiency. Sales reps now spend time on deals that close, not chasing cold leads.",
      author: "Marcus Rodriguez",
      role: "VP of Sales",
      company: "CloudScale",
      metric: "3x Pipeline Velocity"
    },
    {
      quote: "We can finally prove marketing ROI with actual revenue numbers, not vanity metrics. The C-suite loves our reports now.",
      author: "Priya Sharma",
      role: "Director of Growth",
      company: "DataDriven",
      metric: "400% ROI Proven"
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Capture & Unify",
      description: "Aggregate data from all touchpoints into a single customer profile.",
      icon: Layers,
      color: "primary" as const
    },
    {
      number: "02",
      title: "Score & Qualify",
      description: "AI analyzes behavior and firmographics to prioritize leads.",
      icon: Target,
      color: "secondary" as const
    },
    {
      number: "03",
      title: "Nurture & Engage",
      description: "Automated, personalized campaigns keep prospects warm.",
      icon: MessageSquare,
      color: "accent" as const
    },
    {
      number: "04",
      title: "Route & Convert",
      description: "Qualified leads reach sales with full context and timing.",
      icon: Handshake,
      color: "primary" as const
    }
  ]

  const metrics = [
    { value: "47%", label: "Higher Conversion", subtext: "Aligned vs. siloed teams", icon: TrendingUp, trend: "Proven", large: true },
    { value: "3.2x", label: "Pipeline Velocity", subtext: "Faster deal cycles", icon: Zap, large: true },
    { value: "28%", label: "Lower CAC", subtext: "Efficient spend", icon: DollarSign },
    { value: "91%", label: "Team Alignment", subtext: "Shared goals", icon: Users }
  ]

  const comparisonData = [
    { feature: "Lead Management", before: "Spreadsheets & chaos", after: "Unified database", highlight: true },
    { feature: "Lead Quality", before: "Sales rejects 67%", after: "94% acceptance rate", highlight: false },
    { feature: "Communication", before: "Slack threads & emails", after: "In-platform collaboration", highlight: true },
    { feature: "Attribution", before: "Last-click guessing", after: "Multi-touch precision", highlight: false },
    { feature: "Reporting", before: "Monthly manual exports", after: "Real-time dashboards", highlight: true },
    { feature: "Handoff Process", before: "Leads go cold", after: "Instant routing & alerts", highlight: false }
  ]

  const tabContent = [
    {
      title: "Lead Generation",
      icon: Megaphone,
      content: {
        headline: "Generate Quality Leads at Scale",
        description: "Multi-channel campaigns that attract, engage, and convert your ideal customers. From SEO to paid social, all tracked in one place.",
        features: ["SEO & Content Marketing", "Paid Social & Search", "Landing Page Builder", "A/B Testing", "Form Optimization"]
      }
    },
    {
      title: "Lead Nurturing",
      icon: MessageSquare,
      content: {
        headline: "Nurture Until They're Ready",
        description: "Behavioral email sequences that adapt to prospect actions. No more generic blasts—every message feels personal and timely.",
        features: ["Behavioral Triggers", "Dynamic Content", "Drip Campaigns", "Lead Scoring", "Engagement Tracking"]
      }
    },
    {
      title: "Sales Handoff",
      icon: Handshake,
      content: {
        headline: "Seamless Sales Transitions",
        description: "Qualified leads reach sales with full context—every interaction, every page view, every email open. No more cold calls.",
        features: ["Instant Lead Routing", "Full Context Transfer", "Meeting Scheduling", "Sales Alerts", "SLA Tracking"]
      }
    },
    {
      title: "Revenue Analytics",
      icon: BarChart3,
      content: {
        headline: "Prove Marketing ROI",
        description: "Connect every campaign to revenue. Show the C-suite exactly how marketing investments drive business growth.",
        features: ["Campaign Attribution", "Revenue Reporting", "Cohort Analysis", "Forecasting", "Custom Dashboards"]
      }
    }
  ]
const Icon = tabContent[activeTab].icon;
  const tools = [
    { name: "Salesforce", category: "CRM" },
    { name: "HubSpot", category: "Marketing" },
    { name: "Marketo", category: "Automation" },
    { name: "Slack", category: "Communication" },
    { name: "LinkedIn", category: "Social" },
    { name: "Google Ads", category: "Advertising" },
    { name: "Facebook", category: "Social" },
    { name: "Zapier", category: "Integration" },
    { name: "Segment", category: "Data" },
    { name: "Zoom", category: "Meetings" }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-x-hidden">
      <Head>
        <title>Align Sales & Marketing | Unified Revenue Platform</title>
        <meta name="description" content="Unify your sales and marketing teams with AI-powered lead scoring, automated workflows, and closed-loop attribution. 47% higher conversion rates." />
        <meta name="keywords" content="sales marketing alignment, lead generation, marketing automation, revenue attribution, sales enablement" />
      </Head>

      {/* 🎯 HERO SECTION - Asymmetric Split with Floating Cards */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--bg-primary)] to-[var(--color-secondary-50)]" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--color-primary-200)] rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[var(--color-secondary-200)] rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[var(--color-primary-100)] to-[var(--color-secondary-100)] rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
            
            {/* LEFT CONTENT - 7 columns */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-8"
            >
              <motion.div variants={fadeInLeft}>
                <Badge variant="primary" size="lg" glow={true} icon={Handshake}>
                  Sales + Marketing Alignment
                </Badge>
              </motion.div>

              <motion.h1 
                variants={fadeInLeft}
                className="text-4xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
              >
                Align Your <br />
                <GradientText variant="primary">Revenue Teams</GradientText>
              </motion.h1>

              <motion.p 
                variants={fadeInLeft}
                className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
              >
                Unify sales and marketing with a single platform for lead generation, 
                scoring, nurturing, and attribution. Stop losing deals to misalignment.
              </motion.p>

              <motion.div variants={fadeInLeft} className="flex flex-wrap gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] hover:shadow-2xl hover:shadow-[var(--color-primary-500)]/30 transition-all flex items-center gap-3 text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-[var(--text-primary)] font-bold rounded-[var(--radius-xl)] border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all flex items-center gap-3 text-lg"
                >
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row items-center sm:gap-8 pt-6">
                <div className="flex items-center  gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-[var(--text-tertiary)]">
                    <strong className="text-[var(--color-primary-600)]">3,500+ teams</strong> aligned
                  </div>
                </div>
                <div className="h-8  w-px sm:bg-[var(--border-medium)]" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
                  ))}
                  <span className="ml-2 font-bold text-[var(--text-primary)]">4.9/5</span>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT CONTENT - 5 columns - Floating Card Stack */}
            <motion.div 
              style={{ y: heroY }}
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="lg:col-span-5 relative h-[600px]"
            >
              {/* Main Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-full"
              >
                <GlassCard elevated={true} className="p-6" hover={false}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold">Revenue Dashboard</div>
                        <div className="text-xs text-[var(--text-tertiary)]">Live Alignment</div>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>

                  {/* Pipeline Funnel */}
                  <div className="space-y-3 mb-6">
                    {[
                      { stage: "Visitors", count: "12,450", width: "100%", color: "var(--color-primary-500)" },
                      { stage: "Leads", count: "3,890", width: "75%", color: "var(--color-secondary-500)" },
                      { stage: "MQLs", count: "1,240", width: "45%", color: "var(--color-accent-500)" },
                      { stage: "SQLs", count: "486", width: "25%", color: "var(--color-success-500)" },
                      { stage: "Customers", count: "142", width: "12%", color: "var(--color-primary-600)" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div 
                          className="h-10 rounded-lg flex items-center px-3 text-white text-sm font-bold transition-all"
                          style={{ 
                            width: item.width, 
                            backgroundColor: item.color,
                            clipPath: idx === 0 ? 'none' : 'polygon(0 0, 100% 0, 98% 100%, 0 100%)'
                          }}
                        >
                          {item.stage}
                        </div>
                        <span className="text-sm font-bold text-[var(--text-primary)]">{item.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[var(--color-primary-50)] text-center">
                      <div className="text-lg font-bold text-[var(--color-primary-600)]">31%</div>
                      <div className="text-xs text-[var(--text-tertiary)]">MQL→SQL</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--color-secondary-50)] text-center">
                      <div className="text-lg font-bold text-[var(--color-secondary-600)]">29%</div>
                      <div className="text-xs text-[var(--text-tertiary)]">SQL→Cust</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--color-success-50)] text-center">
                      <div className="text-lg font-bold text-[var(--color-success-600)]">9.1%</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Overall</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Card 1 */}
              <motion.div 
                animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-8 w-64 hidden sm:block"
              >
                <GlassCard className="p-4" hover={false}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-success-100)] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success-600)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Lead Scored</div>
                      <div className="text-xs text-[var(--text-tertiary)]">85/100 • Auto-routed</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-40 -left-12 w-56 hidden sm:block"
              >
                <GlassCard className="p-4" hover={false}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary-100)] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[var(--color-secondary-600)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Campaign Live</div>
                      <div className="text-xs text-[var(--text-tertiary)]">2,340 engaged</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Card 3 */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-40 right-0 w-60 hidden sm:block"
              >
                <GlassCard className="p-4" hover={false}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-100)] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[var(--color-accent-600)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">$2.4M Attributed</div>
                      <div className="text-xs text-[var(--text-tertiary)]">This quarter</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔥 TRUST STRIP - Logo Cloud */}
      <section className="py-16 bg-[var(--bg-secondary)] border-y border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.p variants={fadeInUp} className="text-sm text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
              Trusted by 3,500+ revenue teams worldwide
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8 opacity-60"
          >
            {['Salesforce', 'HubSpot', 'Marketo', 'Drift', 'Clearbit', 'ZoomInfo', 'LinkedIn', 'Google', 'Meta', 'Amazon'].map((logo, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="px-6 py-3 rounded-xl bg-white border border-[var(--border-light)] font-bold text-[var(--text-tertiary)] hover:opacity-100 hover:border-[var(--color-primary-300)] transition-all cursor-default"
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⚡ THE ALIGNMENT GAP */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="warning" size="md" icon={AlertTriangle}>
              The Revenue Gap
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Why Sales & Marketing <br />
              <span className="text-[var(--color-error-600)]">Work Against Each Other</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              Misalignment costs companies 10% or more of annual revenue. Here's what breaks down:
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
                title: "The Lead Quality Dispute",
                stat: "67%",
                desc: "of sales reps say marketing leads are poor quality. Marketing says sales doesn't follow up. Both are right—and wrong.",
                color: "error"
              },
              {
                icon: MessageSquare,
                title: "Communication Breakdown",
                stat: "76%",
                desc: "of marketers say sales never provides feedback on leads. Without closed-loop reporting, both teams fly blind.",
                color: "warning"
              },
              {
                icon: DollarSign,
                title: "Attribution Blindness",
                stat: "$1.6T",
                desc: "annual global revenue lost to misalignment. Marketing can't prove ROI. Sales can't optimize outreach.",
                color: "error"
              }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <GlassCard className="p-8 h-full border-t-4" style={{ borderTopColor: `var(--color-${item.color}-500)` }} hover={true}>
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-[var(--radius-2xl)] bg-[var(--color-${item.color}-100)] flex items-center justify-center`}>
                    <item.icon className={`w-8 h-8 text-[var(--color-${item.color}-600)]`} />
                  </div>
                  <div className="text-5xl font-bold text-[var(--text-primary)] mb-2 text-center">{item.stat}</div>
                  <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] text-center">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] text-center">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🎯 THE SOLUTION - 4 Step Process */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary-200)] rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <Badge variant="success" size="lg" glow={true} icon={Rocket}>
              The Alignment Framework
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              From Friction to <GradientText variant="success">Frictionless</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              A proven 4-step methodology that transforms disjointed teams into a unified revenue engine.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {processSteps.map((step, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <ProcessStep {...step} />
              </motion.div>
            ))}
          </motion.div>

          {/* Connector Line (desktop only) */}
          <div className="hidden md:block absolute top-[380px] left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-[var(--color-primary-300)] via-[var(--color-secondary-300)] to-[var(--color-accent-300)]" />
        </div>
      </section>

      {/* 💎 FEATURES GRID - Bento Box */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="primary" size="lg" glow={true} icon={Layers}>
              Complete Platform
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Everything to <GradientText>Generate & Convert</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              From first touch to closed deal, every capability your teams need—in one platform.
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
              <motion.div key={idx} variants={fadeInUp} className={feature.large ? 'md:col-span-2 lg:col-span-1' : ''}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 📊 METRICS GRID - Large Stats */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {metrics.map((metric, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="text-center">
                <MetricCard {...metric} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🎨 INTERACTIVE TABS SECTION */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Badge variant="secondary" size="lg" icon={Lightbulb}>
              See It In Action
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              End-to-End <GradientText variant="primary">Revenue Workflow</GradientText>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Tab Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              {tabContent.map((tab, idx) => (
                <TabButton 
                  key={idx} 
                  active={activeTab === idx} 
                  onClick={() => setActiveTab(idx)}
                  icon={tab.icon}
                >
                  {tab.title}
                </TabButton>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">{tabContent[activeTab].content.headline}</h3>
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">{tabContent[activeTab].content.description}</p>
                <div className="space-y-3">
                  {tabContent[activeTab].content.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                        <Check className="w-4 h-4 text-[var(--color-success-600)]" />
                      </div>
                      <span className="text-[var(--text-primary)] font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <GlassCard elevated={true} className="p-8" hover={false}>
                <div className="aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Icon className="w-16 h-16 text-[var(--color-primary-600)] mx-auto mb-4" />
                    <p className="text-[var(--text-secondary)] font-medium">{tabContent[activeTab].title} Interface</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ⚖️ BEFORE/AFTER COMPARISON */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              The difference between working in silos and working as one.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[var(--radius-3xl)] shadow-2xl border border-[var(--border-light)] overflow-hidden"
          >
            <div className="grid grid-cols-[1.2fr,1fr,1.2fr] gap-4 p-6 bg-[var(--bg-secondary)] border-b border-[var(--border-light)] font-bold text-lg">
              <div className="text-[var(--text-primary)]">Capability</div>
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-error-100)] text-[var(--color-error-700)]">
                  <X className="w-4 h-4" />
                  Before
                </span>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)]">
                  <Check className="w-4 h-4" />
                  After
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              {comparisonData.map((row, idx) => (
                <ComparisonRow key={idx} {...row} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] font-bold border border-[var(--color-success-200)]">
              <CheckCircle2 className="w-5 h-5" />
              Average improvement: 47% higher conversion, 3.2x faster velocity
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌟 TESTIMONIALS - Masonry Style */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-primary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-3xl opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="dark" size="lg" icon={Award}>
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
              <motion.div key={idx} variants={fadeInUp} className={testimonial.large ? 'md:col-span-2 lg:col-span-1' : ''}>
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔌 INTEGRATION CLOUD */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="accent" size="lg" icon={Globe}>
              Connected Ecosystem
            </Badge>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
              Plays Nice With Your <GradientText variant="accent">Existing Stack</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--text-secondary)]">
              100+ native integrations. No rip-and-replace required.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {tools.map((tool, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="group px-6 py-4 rounded-xl bg-white border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:border-[var(--color-primary-300)] hover:-translate-y-1 transition-all cursor-default"
              >
                <div className="font-bold text-[var(--text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">{tool.name}</div>
                <div className="text-xs text-[var(--text-tertiary)]">{tool.category}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🚀 FINAL CTA - Asymmetric Layout */}
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
                <Badge variant="primary" size="lg" glow={true} icon={Rocket}>
                  Start Aligning Today
                </Badge>
              </motion.div>
              
              <motion.h2 variants={fadeInLeft} className="text-5xl sm:text-6xl font-bold mt-6 mb-6 text-[var(--text-primary)]">
                Ready to <GradientText>Close More Deals</GradientText> Together?
              </motion.h2>
              
              <motion.p variants={fadeInLeft} className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                Join 3,500+ revenue teams who've eliminated the sales-marketing divide. 
                Start your free trial—no credit card required.
              </motion.p>

              <motion.div variants={fadeInLeft} className="space-y-4 mb-8">
                {[
                  "Free 14-day trial with full features",
                  "Dedicated onboarding specialist",
                  "Migrate from your current tools free",
                  "Cancel anytime, no questions asked"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-success-100)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[var(--color-success-600)]" />
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
                    <Calculator className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Alignment ROI Calculator</h3>
                  <p className="text-[var(--text-secondary)]">See your potential revenue lift</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Monthly Marketing Spend</label>
                    <input 
                      type="range" 
                      className="w-full accent-[var(--color-primary-600)]"
                      defaultValue="50000"
                    />
                    <div className="flex justify-between text-sm text-[var(--text-tertiary)] mt-1">
                      <span>$10K</span>
                      <span className="text-[var(--color-primary-600)] font-bold">$50K</span>
                      <span>$200K</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Current Conversion Rate</label>
                    <input 
                      type="range" 
                      className="w-full accent-[var(--color-primary-600)]"
                      defaultValue="2"
                    />
                    <div className="flex justify-between text-sm text-[var(--text-tertiary)] mt-1">
                      <span>0.5%</span>
                      <span className="text-[var(--color-primary-600)] font-bold">2.0%</span>
                      <span>5%</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-[var(--color-success-50)] to-[var(--color-primary-50)] border border-[var(--color-success-200)]">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Projected Annual Revenue Lift</div>
                    <div className="text-4xl font-bold text-[var(--color-success-600)]">+$1.2M</div>
                    <div className="text-sm text-[var(--color-success-700)] mt-1">With 47% conversion improvement</div>
                  </div>

                  <button className="w-full py-4 bg-[var(--color-text)] text-[var(--color-background)] font-bold rounded-[var(--radius-xl)] hover:bg-[var(--color-text)]/90 transition-all">
                    Get Detailed Report
                  </button>
                </div>
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