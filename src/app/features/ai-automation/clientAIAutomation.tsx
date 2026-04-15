
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Zap, 
  Workflow, 
  Clock, 
  Target, 
  MessageSquare, 
  BarChart3,
  Settings,
  Play,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Brain,
  Cpu,
  Layers,
  Bell,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Users,
  Search,
  Plus,
  Menu,
  X,
  RefreshCw,
  Check
} from 'lucide-react';

// Navigation Component
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--color-primary-100)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-sm">
              EA
            </div>
            <span className="font-bold text-xl text-[var(--color-primary-900)]">EstateAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)] transition-colors">Features</a>
            <a href="#showcase" className="text-sm font-medium text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)] transition-colors">Platform</a>
            <a href="#benefits" className="text-sm font-medium text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)] transition-colors">Benefits</a>
            <a href="#workflow" className="text-sm font-medium text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)] transition-colors">How it Works</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)] transition-colors">Sign In</button>
            <button className="px-4 py-2 bg-[var(--color-primary-600)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-700)] transition-colors shadow-lg shadow-[var(--color-primary-600)]/20">
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-[var(--color-primary-700)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[var(--color-primary-100)] px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm font-medium text-[var(--color-primary-700)]">Features</a>
          <a href="#showcase" className="block text-sm font-medium text-[var(--color-primary-700)]">Platform</a>
          <a href="#benefits" className="block text-sm font-medium text-[var(--color-primary-700)]">Benefits</a>
          <a href="#workflow" className="block text-sm font-medium text-[var(--color-primary-700)]">How it Works</a>
          <div className="pt-3 border-t border-[var(--color-primary-100)] flex flex-col gap-3">
            <button className="text-sm font-medium text-[var(--color-primary-700)]">Sign In</button>
            <button className="w-full px-4 py-2 bg-[var(--color-primary-600)] text-white rounded-lg text-sm font-semibold">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// 1. Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[var(--color-primary-50)] via-white to-white">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[var(--color-primary-300)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Automate everything. Scale effortlessly.</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-primary-900)] tracking-tight mb-6 leading-tight">
            Run Your Real Estate Business on{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--color-primary-600)]">Autopilot</span>
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-primary-200)] -z-0" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,4 Q100,0 200,4" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Deploy AI agents that handle lead qualification, follow-ups, property matching, and client communication—24/7. 
            Eliminate manual work and scale your operations without adding headcount.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold shadow-xl shadow-[var(--color-primary-600)]/25 hover:shadow-[var(--color-primary-600)]/40 hover:bg-[var(--color-primary-700)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Bot className="w-5 h-5" />
              Start Automating Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-xl font-semibold hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Play className="w-5 h-5 fill-current" />
              See Automation in Action
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-primary-600)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Setup in 10 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>No coding required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>24/7 AI agents included</span>
            </div>
          </div>

          {/* Trust Logos */}
          <div className="mt-16 pt-8 border-t border-[var(--color-primary-100)]">
            <p className="text-sm font-medium text-[var(--color-primary-500)] uppercase tracking-wider mb-6">Trusted by leading brokerages</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="h-8 w-32 bg-[var(--color-primary-800)] rounded opacity-20" />
              <div className="h-8 w-28 bg-[var(--color-primary-800)] rounded opacity-20" />
              <div className="h-8 w-36 bg-[var(--color-primary-800)] rounded opacity-20" />
              <div className="h-8 w-30 bg-[var(--color-primary-800)] rounded opacity-20" />
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
};

// 2. Core Capabilities Section
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Smart Workflow Automation",
      description: "Build complex, multi-step workflows that trigger based on lead behavior, time delays, or custom conditions—no code needed.",
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
      badge: "Visual Builder"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI-Powered Follow-Ups",
      description: "Intelligent email, SMS, and voice sequences that adapt messaging based on lead responses and engagement patterns.",
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
      badge: "Adaptive"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Automated Lead Qualification",
      description: "AI agents ask qualifying questions, score leads in real-time, and route hot prospects to your team instantly.",
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-500)]",
      badge: "Real-time"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Task Automation",
      description: "Auto-create tasks, schedule appointments, update CRM records, and notify team members based on deal progression.",
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-500)]",
      badge: "Zero-touch"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Trigger-Based Actions",
      description: "Set up intelligent triggers that execute actions when leads visit properties, open emails, or hit specific milestones.",
      color: "from-[var(--color-primary-600)] to-[var(--color-primary-700)]",
      badge: "Event-driven"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 AI Agents",
      description: "Always-on virtual agents handle inquiries, book showings, and nurture leads while you sleep, vacation, or close deals.",
      color: "from-[var(--color-secondary-600)] to-[var(--color-secondary-700)]",
      badge: "Always-on"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <Cpu className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Intelligent Automation for Every Workflow
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            From first contact to closed deal, our AI agents handle the repetitive work so you can focus on relationships
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl hover:shadow-[var(--color-primary-600)]/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />
              
              <div className="flex items-start justify-between mb-4 relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <span className="text-xs font-bold text-white bg-[var(--color-primary-600)] px-3 py-1 rounded-full">
                  {feature.badge}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--color-primary-700)]/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Visual Showcase Section
const ShowcaseSection: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  
  const workflows = [
    { name: 'Lead Qualification', status: 'Active', runs: '2,847/mo' },
    { name: 'Follow-Up Sequence', status: 'Active', runs: '5,203/mo' },
    { name: 'Property Alerts', status: 'Active', runs: '1,892/mo' }
  ];

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-50)]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-6">
              <Layers className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span className="text-sm font-semibold text-[var(--color-primary-700)]">Visual Workflow Builder</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-900)] mb-6 leading-tight">
              Build Complex Automations in Minutes, Not Months
            </h2>
            
            <p className="text-lg text-[var(--color-primary-700)]/70 mb-8 leading-relaxed">
              Our visual workflow builder lets you create sophisticated, multi-step automations with drag-and-drop simplicity. 
              Watch your AI agents execute tasks in real-time with complete visibility.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Drag-and-drop workflow builder—no code required",
                "Real-time execution monitoring and activity timeline",
                "Conditional logic, delays, and branching paths",
                "Pre-built templates for common real estate workflows",
                "Integration with 50+ tools and platforms"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[var(--color-primary-600)]" />
                  </div>
                  <span className="text-[var(--color-primary-800)] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="group px-6 py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-700)] transition-colors flex items-center gap-2">
              Explore the Builder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Interactive Workflow UI */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)] rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--color-primary-100)] overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-gradient-to-r from-[var(--color-primary-50)] to-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white text-xs font-bold">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-[var(--color-primary-900)]">Automation Studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </div>
                </div>
              </div>

              {/* Workflow List */}
              <div className="p-4 border-b border-[var(--color-primary-100)]">
                <div className="flex gap-2 mb-4">
                  {workflows.map((wf, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveWorkflow(idx)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeWorkflow === idx ? 'bg-[var(--color-primary-600)] text-white' : 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)]'}`}
                    >
                      {wf.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Workflow Canvas */}
              <div className="p-6 bg-[var(--color-primary-50)]/30 min-h-[400px]">
                {/* Trigger Node */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white border-2 border-[var(--color-primary-400)] rounded-xl p-4 shadow-md w-64 relative">
                    <div className="absolute -top-3 left-4 px-2 bg-[var(--color-primary-400)] text-white text-xs font-bold rounded">
                      TRIGGER
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--color-primary-900)] text-sm">New Lead Submitted</p>
                        <p className="text-xs text-[var(--color-primary-500)]">From website form</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center mb-8">
                  <div className="h-8 w-0.5 bg-[var(--color-primary-300)] relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-primary-400)] rounded-full" />
                  </div>
                </div>

                {/* Action Nodes */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white border border-[var(--color-primary-200)] rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary-100)] flex items-center justify-center text-[var(--color-secondary-600)]">
                        <Brain className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-secondary-600)] uppercase">AI Action</span>
                    </div>
                    <p className="font-medium text-[var(--color-primary-900)] text-sm">Qualify Lead</p>
                    <p className="text-xs text-[var(--color-primary-500)]">Score: 85/100</p>
                  </div>

                  <div className="bg-white border border-[var(--color-primary-200)] rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)]">
                        <Bell className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-primary-600)] uppercase">Notify</span>
                    </div>
                    <p className="font-medium text-[var(--color-primary-900)] text-sm">Alert Agent</p>
                    <p className="text-xs text-[var(--color-primary-500)]">Hot lead assigned</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center mb-8">
                  <div className="h-8 w-0.5 bg-[var(--color-primary-300)] relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--color-primary-400)] rounded-full" />
                  </div>
                </div>

                {/* Final Action */}
                <div className="flex justify-center">
                  <div className="bg-white border border-[var(--color-primary-200)] rounded-xl p-4 shadow-sm w-64">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary-100)] flex items-center justify-center text-[var(--color-secondary-600)]">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-secondary-600)] uppercase">Auto-Send</span>
                    </div>
                    <p className="font-medium text-[var(--color-primary-900)] text-sm">Welcome Email</p>
                    <p className="text-xs text-[var(--color-primary-500)]">Personalized with AI</p>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="px-4 py-3 bg-[var(--color-primary-50)] border-t border-[var(--color-primary-100)]">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-[var(--color-primary-700)]">Recent Activity</span>
                  <RefreshCw className="w-4 h-4 text-[var(--color-primary-400)] animate-spin" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[var(--color-primary-600)]">2:34 PM</span>
                    <span className="text-[var(--color-primary-800)]">Workflow executed for Sarah M.</span>
                    <span className="ml-auto text-green-600 font-medium">Success</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[var(--color-primary-600)]">2:31 PM</span>
                    <span className="text-[var(--color-primary-800)]">Lead qualified: Score 92/100</span>
                    <span className="ml-auto text-green-600 font-medium">Success</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-xl shadow-xl border border-[var(--color-primary-100)] max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white flex-shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary-900)]">Automation Impact</p>
                  <p className="text-2xl font-bold text-[var(--color-primary-600)] mt-1">2,847</p>
                  <p className="text-xs text-[var(--color-primary-500)]">Tasks automated this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Benefits Section
const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save 20+ Hours Weekly",
      description: "Eliminate repetitive tasks like data entry, follow-ups, and lead routing. Your AI agents handle the busywork while you focus on high-value activities.",
      stat: "20h",
      statLabel: "saved per week",
      details: ["Auto-data entry", "Smart scheduling", "Instant responses"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "3x Higher Conversion Rates",
      description: "AI-powered follow-ups and instant qualification ensure no lead falls through the cracks. Convert more inquiries into signed contracts.",
      stat: "3x",
      statLabel: "more conversions",
      details: ["Instant response", "Perfect timing", "Personalized outreach"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Scale Without Hiring",
      description: "Handle 10x more leads without adding headcount. AI agents work 24/7, never call in sick, and maintain consistent quality at any volume.",
      stat: "10x",
      statLabel: "lead capacity",
      details: ["24/7 coverage", "Zero overhead", "Consistent quality"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Zero Manual Errors",
      description: "Automated data capture and workflow execution eliminate human error. Every lead is tracked, scored, and nurtured perfectly every time.",
      stat: "99.9%",
      statLabel: "accuracy",
      details: ["Perfect tracking", "Auto-scoring", "Error-free execution"]
    }
  ];

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <TrendingUp className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Business Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Work Smarter, Not Harder
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Real results that transform your real estate business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-[var(--color-primary-50)] border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-100)] rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-600)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary-600)]/20 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold text-[var(--color-primary-600)] block">{benefit.stat}</span>
                    <span className="text-xs font-bold text-[var(--color-primary-500)] uppercase tracking-wider">{benefit.statLabel}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[var(--color-primary-900)] mb-3 group-hover:text-[var(--color-primary-600)] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-primary-700)]/70 leading-relaxed mb-4">
                  {benefit.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {benefit.details.map((detail, idx) => (
                    <span key={idx} className="text-xs font-medium text-[var(--color-primary-600)] bg-[var(--color-primary-50)] px-3 py-1 rounded-full border border-[var(--color-primary-100)]">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. How It Works Section
const WorkflowSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Capture Data",
      description: "AI agents automatically collect lead information from every channel—forms, calls, emails, ads, and partner sites—in real-time.",
      icon: <Target className="w-6 h-6" />,
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-600)]"
    },
    {
      number: "02",
      title: "Trigger Workflows",
      description: "Intelligent rules detect lead behavior, scores, and milestones to automatically trigger the right sequence of actions.",
      icon: <Zap className="w-6 h-6" />,
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-600)]"
    },
    {
      number: "03",
      title: "Execute Actions",
      description: "AI agents perform tasks instantly: send emails, update CRMs, schedule meetings, notify agents, and qualify leads.",
      icon: <Bot className="w-6 h-6" />,
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      number: "04",
      title: "Deliver Results",
      description: "Track performance in real-time. Watch conversion rates climb as your AI handles the heavy lifting 24/7.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-700)]"
    }
  ];

  return (
    <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-900)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-primary-600)] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-secondary-600)] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <Settings className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-200)]">Simple Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            From Setup to Scale in Minutes
          </h2>
          <p className="text-lg text-[var(--color-primary-200)]">
            Four steps to complete workflow automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent z-0">
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                </div>
              )}
              
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[var(--color-primary-400)] transition-all duration-300 h-full z-10 group-hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-white/20 font-mono group-hover:text-white/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-primary-200)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[var(--color-primary-200)]/80 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Setup Time Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20">
            <Clock className="w-5 h-5 text-[var(--color-primary-200)]" />
            <span className="text-[var(--color-primary-100)]">Average setup time: <strong className="text-white">10 minutes</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. Final CTA Section
const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-700)] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
          <Bot className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">Your AI agents are ready</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Let AI Handle the Work While You Close More Deals
        </h2>
        <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
          Join 3,000+ real estate professionals who have transformed their business with intelligent automation. 
          Start your free trial today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="group w-full sm:w-auto px-10 py-5 bg-white text-[var(--color-primary-700)] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Start Automating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Book a Demo
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-sm text-white/70">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-900)] border-t border-[var(--color-primary-800)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-sm">
            EA
          </div>
          <span className="font-bold text-xl text-white">EstateAI</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-[var(--color-primary-300)]">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Help Center</a>
        </div>
        
        <p className="text-sm text-[var(--color-primary-400)]">
          © 2026 EstateAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Main Page Component
export default function AIAutomationPage() {
  return (
    <main className="min-h-screen bg-white">
     
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <BenefitsSection />
      <WorkflowSection />
      <CTASection />
      
    </main>
  );
}
