"use client";

import React from 'react';
import Head from 'next/head';
import { 
  Bot, 
  Brain, 
  Zap, 
  Shield, 
  Clock, 
  Target, 
  Sparkles, 
  Workflow, 
  Users, 
  TrendingUp,
  MessageSquare,
  Search,
  Share2,
  PenTool,
  Repeat,
  Globe,
  CheckCircle2,
  ArrowRight,
  Play
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.2 
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6 } 
  }
};

// Types
interface Agent {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
}

// Data using CSS variables for colors
const agents: Agent[] = [
  {
    icon: Users,
    title: "Lead Capture Agent",
    description: "Automatically captures and organizes leads from multiple channels into your pipeline.",
    gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-300)]"
  },
  {
    icon: Target,
    title: "Lead Qualification Agent",
    description: "Scores and qualifies leads using AI to prioritize high-value opportunities.",
    gradient: "from-[var(--color-secondary-600)] to-[var(--color-secondary-400)]"
  },
  {
    icon: Search,
    title: "Property Matching Agent",
    description: "Intelligently matches properties with buyer preferences and requirements.",
    gradient: "from-[var(--color-primary-600)] to-[var(--color-primary-400)]"
  },
  {
    icon: MessageSquare,
    title: "Calling Agent",
    description: "AI-powered voice calls that handle outreach, follow-ups, and appointment setting.",
    gradient: "from-[var(--color-secondary-500)] to-[var(--color-primary-300)]"
  },
  {
    icon: Workflow,
    title: "Campaign Automation Agent",
    description: "Orchestrates multi-channel marketing campaigns with intelligent timing.",
    gradient: "from-[var(--color-primary-700)] to-[var(--color-primary-500)]"
  },
  {
    icon: Brain,
    title: "Data Mining Agent",
    description: "Extracts valuable insights and patterns from large datasets automatically.",
    gradient: "from-[var(--color-secondary-700)] to-[var(--color-secondary-500)]"
  },
  {
    icon: Share2,
    title: "Social Media Agent",
    description: "Manages social presence, schedules posts, and engages with your audience.",
    gradient: "from-[var(--color-primary-500)] to-[var(--color-secondary-400)]"
  },
  {
    icon: PenTool,
    title: "Content Creation Agent",
    description: "Generates high-quality content, copy, and creative assets at scale.",
    gradient: "from-[var(--color-secondary-600)] to-[var(--color-primary-400)]"
  },
  {
    icon: Repeat,
    title: "Follow-Up Agent",
    description: "Never miss a follow-up with automated nurturing sequences and reminders.",
    gradient: "from-[var(--color-primary-400)] to-[var(--color-secondary-300)]"
  },
  {
    icon: Globe,
    title: "SEO Content Agent",
    description: "Optimizes content for search engines and tracks ranking improvements.",
    gradient: "from-[var(--color-secondary-500)] to-[var(--color-primary-300)]"
  }
];

const stats: Stat[] = [
  { value: "10+", label: "AI Agents", icon: Bot },
  { value: "24/7", label: "Automation", icon: Clock },
  { value: "10k+", label: "Tasks Automated", icon: Zap }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary-50)] text-[var(--color-primary-900)] overflow-x-hidden">
      <Head>
        <title>About Us | AI Agents Platform</title>
        <meta name="description" content="Building the future with AI agents that automate business workflows" />
      </Head>

      {/* Background Effects - Subtle for light mode */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-200)]/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-200)]/30 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary-100)]/20 rounded-full blur-[150px]" />
      </div>

  
      {/* Hero Section */}
      <section className="relative z-10 pt-20 lg:pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)]">
                <Sparkles className="w-4 h-4 text-[var(--color-primary-600)]" />
                <span className="text-sm font-medium text-[var(--color-primary-700)]">Next-Gen AI Automation</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold leading-tight text-[var(--color-primary-920)]"
              >
                Building the Future with{' '}
                <span className="bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-secondary-500)] to-[var(--color-primary-800)] bg-clip-text text-transparent">
                  AI Agents
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-[var(--color-primary-800)]/80 leading-relaxed max-w-xl"
              >
                We provide an ecosystem of intelligent AI agents that automate real business workflows. 
                From lead generation to content creation, our agents work 24/7 to scale your operations 
                while you focus on strategy.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-800)] text-white font-semibold hover:shadow-[0_0_40px_-10px_rgba(0,102,204,0.5)] transition-all flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full bg-white border border-[var(--color-primary-300)] text-[var(--color-primary-800)] font-semibold hover:bg-[var(--color-primary-50)] transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-400)]/20 to-[var(--color-secondary-400)]/20 rounded-3xl blur-3xl" />
                
                <div className="relative bg-white/80 backdrop-blur-xl border border-[var(--color-primary-200)] rounded-3xl p-8 shadow-2xl shadow-[var(--color-primary-200)]">
                  <div className="grid grid-cols-2 gap-4">
                    {agents.slice(0, 4).map((agent, idx) => {
                      const IconComponent = agent.icon;
                      return (
                        <div 
                          key={idx}
                          className="bg-[var(--color-primary-50)] backdrop-blur-md border border-[var(--color-primary-200)] rounded-2xl p-4 hover:border-[var(--color-primary-400)] transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-3`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div className="h-2 w-16 bg-[var(--color-primary-200)] rounded-full mb-2" />
                          <div className="h-2 w-12 bg-[var(--color-primary-100)] rounded-full" />
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                    <div className="absolute inset-0 bg-[var(--color-primary-400)]/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-full h-full bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] rounded-full flex items-center justify-center border-4 border-white">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-secondary-500)] to-[var(--color-primary-500)] rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-600)] rounded-2xl flex items-center justify-center shadow-lg animate-bounce delay-1000">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-920)]">
              Our Mission
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/80 leading-relaxed">
              To simplify work using intelligent AI agents that handle repetitive tasks, 
              enabling humans to focus on creativity, strategy, and meaningful connections.
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
                icon: Zap, 
                title: "Automation", 
                desc: "Eliminate manual repetitive tasks with intelligent workflows that run continuously.",
                gradient: "from-[var(--color-primary-500)] to-[var(--color-primary-300)]"
              },
              { 
                icon: TrendingUp, 
                title: "Productivity", 
                desc: "Multiply your team's output without adding headcount through AI augmentation.",
                gradient: "from-[var(--color-secondary-500)] to-[var(--color-secondary-300)]"
              },
              { 
                icon: Brain, 
                title: "Smart Decisions", 
                desc: "Leverage AI insights to make data-driven decisions faster and with confidence.",
                gradient: "from-[var(--color-primary-600)] to-[var(--color-primary-400)]"
              }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-200)]/50 to-[var(--color-secondary-200)]/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-all h-full shadow-lg shadow-[var(--color-primary-100)]">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[var(--color-primary-900)]">{item.title}</h3>
                    <p className="text-[var(--color-primary-800)]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* AI Ecosystem Grid */}
      <section className="relative z-10 py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary-100)] border border-[var(--color-secondary-200)] mb-6">
              <Bot className="w-4 h-4 text-[var(--color-secondary-700)]" />
              <span className="text-sm font-medium text-[var(--color-secondary-800)]">AI Ecosystem</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-920)]">
              Meet Your AI Workforce
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/70 max-w-2xl mx-auto">
              Ten specialized agents working together to automate every aspect of your business operations.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {agents.map((agent, idx) => {
              const IconComponent = agent.icon;
              return (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-300)]/30 to-[var(--color-secondary-300)]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-full p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-all overflow-hidden shadow-lg shadow-[var(--color-primary-100)]">
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
                    
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-[var(--color-primary-900)] group-hover:text-[var(--color-primary-600)] transition-colors">
                      {agent.title}
                    </h3>
                    <p className="text-sm text-[var(--color-primary-800)]/70 leading-relaxed">
                      {agent.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-primary-600)]">
                      <span>Active</span>
                      <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-500)] animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why We Built This */}
      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-920)]">
                Why We Built This
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-red-700">The Problem</h3>
                    <p className="text-[var(--color-primary-800)]/70 leading-relaxed">
                      Businesses waste 40% of their time on repetitive tasks—data entry, follow-ups, 
                      scheduling, and manual research. This slows growth and burns out teams.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-green-700">Our Solution</h3>
                    <p className="text-[var(--color-primary-800)]/70 leading-relaxed">
                      AI agents that work 24/7 without breaks, handling the mundane so your team 
                      can focus on high-value work that requires human creativity and empathy.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-gradient-to-r from-[var(--color-primary-100)] to-[var(--color-secondary-100)] border border-[var(--color-primary-200)]">
                <p className="text-lg italic text-[var(--color-primary-800)]">
                  "We didn't just want to build another tool. We wanted to create digital teammates 
                  that truly understand your business and work alongside you."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-primary-900)]">Sarah Chen</div>
                    <div className="text-sm text-[var(--color-primary-700)]">CEO & Co-Founder</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-300)]/20 to-[var(--color-secondary-300)]/20 rounded-3xl blur-3xl" />
              <div className="relative space-y-4">
                {[
                  { label: "Manual Data Entry", value: 85, color: "bg-[var(--color-primary-500)]" },
                  { label: "Email Responses", value: 70, color: "bg-[var(--color-secondary-500)]" },
                  { label: "Meeting Scheduling", value: 60, color: "bg-[var(--color-primary-400)]" },
                  { label: "Report Generation", value: 90, color: "bg-[var(--color-primary-600)]" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-md border border-[var(--color-primary-200)] rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium text-[var(--color-primary-800)]">{stat.label}</span>
                      <span className="text-[var(--color-primary-600)] font-bold">{stat.value}% Automated</span>
                    </div>
                    <div className="h-3 bg-[var(--color-primary-100)] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: idx * 0.2 }}
                        className={`h-full ${stat.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-6 mt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-green-800">Result</span>
                  </div>
                  <p className="text-[var(--color-primary-800)]">
                    Teams using our AI agents report <span className="text-green-600 font-bold">3x productivity increase</span> and 
                    <span className="text-green-600 font-bold"> 60% cost reduction</span> in operations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative z-10 py-24 px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-920)]">
              Technology Behind Our AI
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/70 max-w-2xl mx-auto">
              Built on cutting-edge infrastructure designed for scale, security, and reliability.
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
                icon: Brain,
                title: "Advanced LLM Architecture",
                desc: "Powered by state-of-the-art language models with fine-tuning for business-specific tasks and domain expertise.",
                features: ["GPT-4 & Claude Integration", "Custom Fine-tuning", "Multi-modal Processing"]
              },
              {
                icon: Workflow,
                title: "Automation Pipelines",
                desc: "Intelligent workflow orchestration that connects multiple agents and tools into seamless automated processes.",
                features: ["Visual Workflow Builder", "Conditional Logic", "Error Handling"]
              },
              {
                icon: Share2,
                title: "Enterprise Integrations",
                desc: "Native connections to 100+ business tools including CRMs, marketing platforms, and communication systems.",
                features: ["REST API & Webhooks", "OAuth 2.0 Security", "Real-time Sync"]
              }
            ].map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="group relative p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-all duration-500 shadow-lg shadow-[var(--color-primary-100)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-200)]/50 to-[var(--color-secondary-200)]/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-primary-300)]">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary-900)]">{tech.title}</h3>
                    <p className="text-[var(--color-primary-800)]/70 mb-6 leading-relaxed">{tech.desc}</p>
                    <ul className="space-y-3">
                      {tech.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-3 text-sm text-[var(--color-primary-800)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust & Reliability */}
      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-300)]/30 to-[var(--color-secondary-300)]/30 rounded-3xl blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                      <div 
                        key={idx}
                        className={`p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[var(--color-primary-200)] shadow-lg ${idx === 2 ? 'col-span-2' : ''}`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="text-4xl font-bold text-[var(--color-primary-900)] mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[var(--color-primary-700)]">{stat.label}</div>
                      </div>
                    );
                  })}
                  
                  <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Enterprise Security</span>
                    </div>
                    <p className="text-sm text-[var(--color-primary-800)]">
                      SOC 2 Type II certified • End-to-end encryption • GDPR compliant
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2 space-y-8"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-920)]">
                Trust & Reliability
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-xl text-[var(--color-primary-800)]/70 leading-relaxed">
                Your business data and operations are protected by enterprise-grade security. 
                Our AI agents are built to be reliable, consistent, and transparent.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                {[
                  { icon: Shield, title: "Bank-Level Security", desc: "256-bit encryption and secure data handling" },
                  { icon: Clock, title: "99.9% Uptime", desc: "Redundant infrastructure with automatic failover" },
                  { icon: CheckCircle2, title: "Audit Logs", desc: "Complete transparency in all AI actions" },
                  { icon: Users, title: "Human Oversight", desc: "Keep humans in the loop for critical decisions" }
                ].map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] transition-colors shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[var(--color-primary-600)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-[var(--color-primary-900)]">{item.title}</h4>
                        <p className="text-sm text-[var(--color-primary-800)]/70">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative z-10 py-32 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-100)]/50 via-transparent to-[var(--color-secondary-100)]/50" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary-100)] border border-[var(--color-secondary-200)] mb-8">
              <Sparkles className="w-4 h-4 text-[var(--color-secondary-700)]" />
              <span className="text-sm font-medium text-[var(--color-secondary-800)]">The Future</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-7xl font-bold mb-8 leading-tight text-[var(--color-primary-920)]">
              A World Where AI Agents{' '}
              <span className="bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-secondary-500)] to-[var(--color-primary-800)] bg-clip-text text-transparent">
                Collaborate with Humans
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-3xl mx-auto mb-12">
              We envision a future where every professional has an army of AI agents handling 
              the routine, while humans focus on strategy, creativity, and relationships. 
              Not replacing humans—amplifying them.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm text-[var(--color-primary-700)]">
              <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--color-primary-200)]">Autonomous Workflows</span>
              <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--color-primary-200)]">Human-AI Collaboration</span>
              <span className="px-4 py-2 rounded-full bg-white/80 border border-[var(--color-primary-200)]">Intelligent Orchestration</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 lg:px-8 mb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 lg:p-20 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary-600)]/90 via-[var(--color-primary-700)]/90 to-[var(--color-secondary-700)]/90 border border-[var(--color-primary-400)] overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--color-primary-400)]/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--color-secondary-400)]/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative text-center space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Ready to Meet Your AI Team?
              </h2>
              <p className="text-xl text-[var(--color-primary-100)] max-w-2xl mx-auto">
                Join thousands of businesses already using our AI agents to automate 
                their workflows and scale their operations.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="group px-8 py-4 rounded-full bg-white text-[var(--color-primary-800)] font-semibold hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2">
                  Explore Our AI Agents
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                  Get Started Free
                </button>
              </div>

              <p className="text-sm text-[var(--color-primary-200)] pt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}