// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Target, 
  Users, 
  Zap, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  ChevronRight,
  Star,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Bell,
  Settings,
  Menu,
  X
} from 'lucide-react';

// Navigation Component


// 1. Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[var(--color-primary-50)] via-white to-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-8 animate-fade-in">
            <Brain className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">AI-Powered Property Matching</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-primary-900)] tracking-tight mb-6 leading-tight">
            Make Smarter Property Decisions with{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--color-primary-600)]">AI</span>
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-primary-200)] -z-0" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0,4 Q50,0 100,4" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Leverage AI-powered insights to match buyers with the perfect properties faster and more accurately.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold shadow-xl shadow-[var(--color-primary-600)]/25 hover:shadow-[var(--color-primary-600)]/40 hover:bg-[var(--color-primary-700)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-xl font-semibold hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Play className="w-5 h-5 fill-current" />
              View Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-primary-600)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Core Capabilities (Features Grid)
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI Property Matching",
      description: "Neural networks analyze thousands of data points to find perfect property fits instantly.",
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Buyer Preference Analysis",
      description: "Deep learning algorithms understand buyer behavior, priorities, and hidden preferences.",
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Smart Recommendations",
      description: "Personalized property suggestions that improve with every interaction and feedback.",
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-500)]"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Market Insights",
      description: "Real-time market analysis, pricing trends, and investment potential scores for every listing.",
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-500)]"
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Advanced Filtering",
      description: "Intelligent filters that learn from searches and suggest relevant criteria automatically.",
      color: "from-[var(--color-primary-600)] to-[var(--color-primary-700)]"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Updates",
      description: "Instant notifications when matching properties hit the market or prices change.",
      color: "from-[var(--color-secondary-600)] to-[var(--color-secondary-700)]"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Core Capabilities
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Everything you need to match buyers with their dream properties using advanced AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl hover:shadow-[var(--color-primary-600)]/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--color-primary-700)]/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Visual Showcase (UI Section)
const ShowcaseSection: React.FC = () => {
  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-50)]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-6">
              <Search className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span className="text-sm font-semibold text-[var(--color-primary-700)]">See AI in Action</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-900)] mb-6 leading-tight">
              Watch how EstateAI analyzes user behavior and instantly recommends the most relevant properties
            </h2>
            
            <p className="text-lg text-[var(--color-primary-700)]/70 mb-8 leading-relaxed">
              Our AI engine processes buyer interactions, search patterns, and preference signals to deliver hyper-personalized property recommendations in real-time.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Real-time behavioral analysis",
                "Dynamic preference learning",
                "Instant property ranking",
                "Multi-factor matching algorithm"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-[var(--color-primary-800)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-600)]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="group px-6 py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-700)] transition-colors flex items-center gap-2">
              Explore the Platform
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: UI Mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)] rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--color-primary-100)] overflow-hidden">
              {/* Mock Header */}
              <div className="px-6 py-4 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-gradient-to-r from-[var(--color-primary-50)] to-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white text-xs font-bold">EA</div>
                  <span className="font-semibold text-[var(--color-primary-900)]">EstateAI Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[var(--color-primary-400)]" />
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-200)]" />
                </div>
              </div>

              {/* Mock Content */}
              <div className="p-6">
                {/* Search Bar */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-primary-400)]" />
                    <div className="w-full h-10 bg-[var(--color-primary-50)] rounded-lg border border-[var(--color-primary-200)] flex items-center px-10 text-sm text-[var(--color-primary-600)]">
                      Modern home, 3+ beds, Pool...
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[var(--color-primary-600)] text-white rounded-lg text-sm font-medium">Search</button>
                </div>

                {/* AI Insight Banner */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] rounded-xl text-white flex items-center gap-3">
                  <Brain className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium">AI found 12 properties matching Sarah's preferences</span>
                  <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">98% match</span>
                </div>

                {/* Property Cards */}
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex gap-4 p-4 rounded-xl border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] transition-colors bg-white">
                      <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-300)] flex-shrink-0 flex items-center justify-center text-[var(--color-primary-600)]">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-[var(--color-primary-900)]">Modern Villa #{item}</h4>
                            <p className="text-sm text-[var(--color-primary-600)] flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> Beverly Hills, CA
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-5 h-5 text-[var(--color-primary-300)] hover:text-red-500 transition-colors cursor-pointer" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[var(--color-primary-700)] mb-2">
                          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> 4</span>
                          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> 3</span>
                          <span className="flex items-center gap-1"><Square className="w-4 h-4" /> 2,400 sqft</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-[var(--color-primary-600)]">$1,250,000</span>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            <Star className="w-3 h-3 fill-current" />
                            96% Match
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
      title: "Faster Decisions",
      description: "Reduce time spent searching and analyzing properties. AI delivers instant, ranked recommendations based on buyer preferences.",
      stat: "75%",
      statLabel: "faster search"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Higher Conversions",
      description: "Match buyers with the right property instantly. AI-driven matching increases showing-to-offer ratios significantly.",
      stat: "3x",
      statLabel: "more conversions"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Experience",
      description: "Deliver tailored recommendations to every client. Each buyer receives a unique, curated property feed that evolves with their preferences.",
      stat: "100%",
      statLabel: "personalized"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Data-Driven Insights",
      description: "Make smarter decisions backed by AI. Access market trends, pricing analysis, and buyer behavior predictions in real-time.",
      stat: "94%",
      statLabel: "accuracy"
    }
  ];

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Why EstateAI Matters
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Transform your real estate business with intelligent automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-[var(--color-primary-50)] border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[var(--color-primary-600)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary-600)]/20 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--color-primary-900)] mb-3 group-hover:text-[var(--color-primary-600)] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--color-primary-700)]/70 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[var(--color-primary-600)]">{benefit.stat}</span>
                    <span className="text-sm font-medium text-[var(--color-primary-500)] uppercase tracking-wider">{benefit.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Workflow / How it Works
const WorkflowSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Capture Preferences",
      description: "Buyers share their requirements through intuitive forms, chat, or voice. AI extracts key criteria and hidden preferences.",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Analyze Behavior",
      description: "Machine learning algorithms process search patterns, dwell time, and interactions to understand true buyer intent.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Match Properties",
      description: "Neural networks compare buyer profiles against inventory using 50+ matching factors including lifestyle and investment potential.",
      icon: <Target className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Deliver Recommendations",
      description: "AI generates ranked property lists with match scores, personalized insights, and automated viewing scheduling.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-900)] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[var(--color-primary-200)]">
            Four simple steps to AI-powered property matching
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[var(--color-primary-400)] to-transparent" />
              )}
              
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[var(--color-primary-400)] transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-[var(--color-primary-400)]/30 group-hover:text-[var(--color-primary-400)]/50 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-600)] flex items-center justify-center text-white shadow-lg">
                    {step.icon}
                  </div>
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
      </div>
    </section>
  );
};

// 6. CTA Section
const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-700)] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Let AI Find the Perfect Property for Every Client
        </h2>
        <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
          Join thousands of real estate professionals using EstateAI to close more deals with less effort.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group w-full sm:w-auto px-10 py-5 bg-white text-[var(--color-primary-700)] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300">
            Talk to Sales
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};



// Main Page Component
export default function PropertyAi() {
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