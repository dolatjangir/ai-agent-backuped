// app/marketing-automation/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Rocket, 
  Target, 
  Zap, 
  BarChart3, 
  Share2, 
  Mail, 
  FileText, 
  Calendar,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  Globe,
  Image,
  Video,
  Hash,
  Send,
  MoreHorizontal,
  Plus,
  Settings,
  Bell,
  Check,
  Loader2
} from 'lucide-react';

// 1. Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[var(--color-primary-50)] via-white to-white">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[var(--color-primary-300)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-8">
            <Rocket className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Grow faster with AI-powered marketing</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-primary-900)] tracking-tight mb-6 leading-tight">
            Scale Your Marketing with{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--color-primary-600)]">AI-Powered</span>
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-primary-200)] -z-0" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,4 Q100,0 200,4" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
            {' '}Automation
          </h1>
          
          <p className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Launch campaigns across email, social, and ads in seconds—not hours. 
            AI generates content, optimizes targeting, and drives growth while you focus on closing deals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold shadow-xl shadow-[var(--color-primary-600)]/25 hover:shadow-[var(--color-primary-600)]/40 hover:bg-[var(--color-primary-700)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Zap className="w-5 h-5" />
              Start Automating Campaigns
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-xl font-semibold hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Play className="w-5 h-5 fill-current" />
              See Growth in Action
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-primary-600)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Launch in 60 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>AI generates all content</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>10x faster than manual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Core Features Section
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Campaign Automation",
      description: "Launch complete marketing campaigns across multiple channels with one click. AI handles targeting, scheduling, and deployment automatically.",
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
      badge: "One-Click"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media Automation",
      description: "Auto-post to Facebook, Instagram, LinkedIn, and Twitter. AI optimizes timing, hashtags, and content for maximum engagement on each platform.",
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
      badge: "Multi-Platform"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Marketing Automation",
      description: "Smart email sequences that nurture leads from first contact to closing. AI personalizes content, subject lines, and send times for best results.",
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-500)]",
      badge: "Smart Sequences"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI Content Generation",
      description: "Generate listing descriptions, blog posts, social captions, and ad copy in seconds. AI creates engaging, SEO-optimized content tailored to your brand.",
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-500)]",
      badge: "Instant"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Ad Optimization",
      description: "AI manages your Facebook and Google Ads budgets, targeting, and creative. Automatically A/B tests and scales winning campaigns for maximum ROI.",
      color: "from-[var(--color-primary-600)] to-[var(--color-primary-700)]",
      badge: "Auto-Optimize"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Channel Marketing",
      description: "Orchestrate seamless campaigns across email, social, SMS, and ads from one dashboard. Consistent messaging, unified analytics, zero complexity.",
      color: "from-[var(--color-secondary-600)] to-[var(--color-secondary-700)]",
      badge: "Unified"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Launch campaigns in seconds</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Everything You Need to Scale Your Marketing
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            AI-powered tools that attract, engage, and convert leads automatically
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
  const [activeTab, setActiveTab] = useState<'campaigns' | 'content' | 'analytics'>('campaigns');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (activeTab === 'content') {
      setIsGenerating(true);
      const timer = setTimeout(() => setIsGenerating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-50)]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-6">
              <BarChart3 className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span className="text-sm font-semibold text-[var(--color-primary-700)]">AI-Driven Growth Engine</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-900)] mb-6 leading-tight">
              Manage All Your Marketing from One Powerful Dashboard
            </h2>
            
            <p className="text-lg text-[var(--color-primary-700)]/70 mb-8 leading-relaxed">
              Plan, execute, and optimize campaigns across every channel. 
              AI generates content, schedules posts, and tracks performance—so you see what works and scale it instantly.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Visual campaign calendar with drag-and-drop scheduling",
                "AI content generator for listings, posts, and emails",
                "Real-time analytics and performance tracking",
                "Automated A/B testing and budget optimization",
                "Unified inbox for all lead responses"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-600)]" />
                  </div>
                  <span className="text-[var(--color-primary-800)] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="group px-6 py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-700)] transition-colors flex items-center gap-2">
              Explore the Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Interactive Marketing Dashboard */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)] rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--color-primary-100)] overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-gradient-to-r from-[var(--color-primary-50)] to-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-[var(--color-primary-900)]">Marketing Command Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    4 Active
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[var(--color-primary-100)]">
                {[
                  { id: 'campaigns', icon: <Rocket className="w-4 h-4" />, label: 'Campaigns' },
                  { id: 'content', icon: <FileText className="w-4 h-4" />, label: 'AI Content' },
                  { id: 'analytics', icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === tab.id ? 'text-[var(--color-primary-600)] border-b-2 border-[var(--color-primary-600)] bg-[var(--color-primary-50)]' : 'text-[var(--color-primary-500)] hover:text-[var(--color-primary-700)]'}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Campaigns View */}
              {activeTab === 'campaigns' && (
                <div className="p-6 h-[480px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[var(--color-primary-900)]">Active Campaigns</h3>
                    <button className="px-3 py-1.5 bg-[var(--color-primary-600)] text-white rounded-lg text-sm flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      New Campaign
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Spring Listings Blast', status: 'Running', reach: '12.4K', engagement: '8.2%', channels: ['Email', 'Social', 'Ads'] },
                      { name: 'Buyer Nurture Sequence', status: 'Active', reach: '3.2K', engagement: '24%', channels: ['Email'] },
                      { name: 'New Agent Announcement', status: 'Scheduled', reach: '8.1K', engagement: '-', channels: ['Social', 'Ads'] }
                    ].map((campaign, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] transition-colors bg-white shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-[var(--color-primary-900)] text-sm">{campaign.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.status === 'Running' ? 'bg-green-100 text-green-700' : campaign.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {campaign.status}
                              </span>
                              <span className="text-xs text-[var(--color-primary-400)]">•</span>
                              <span className="text-xs text-[var(--color-primary-500)]">{campaign.channels.join(', ')}</span>
                            </div>
                          </div>
                          <MoreHorizontal className="w-4 h-4 text-[var(--color-primary-400)] cursor-pointer" />
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-[var(--color-primary-400)] text-xs">Reach</span>
                            <p className="font-semibold text-[var(--color-primary-700)]">{campaign.reach}</p>
                          </div>
                          <div>
                            <span className="text-[var(--color-primary-400)] text-xs">Engagement</span>
                            <p className="font-semibold text-[var(--color-primary-700)]">{campaign.engagement}</p>
                          </div>
                          <div className="ml-auto">
                            <button className="text-xs text-[var(--color-primary-600)] font-medium hover:underline">View Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Preview */}
                  <div className="mt-6 p-4 bg-[var(--color-primary-50)] rounded-xl">
                    <h4 className="font-semibold text-[var(--color-primary-900)] text-sm mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Upcoming Posts
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary-500)]" />
                        <span className="text-[var(--color-primary-600)] w-16">Today</span>
                        <span className="text-[var(--color-primary-800)]">3:00 PM - Instagram Story</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-500)]" />
                        <span className="text-[var(--color-primary-600)] w-16">Tomorrow</span>
                        <span className="text-[var(--color-primary-800)]">9:00 AM - Email Newsletter</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Content View */}
              {activeTab === 'content' && (
                <div className="p-6 h-[480px] overflow-y-auto">
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-[var(--color-primary-500)] uppercase">Content Type</label>
                    <div className="flex gap-2 mt-2">
                      {['Listing Description', 'Social Post', 'Email', 'Ad Copy'].map((type, idx) => (
                        <button key={idx} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${idx === 0 ? 'bg-[var(--color-primary-600)] text-white' : 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] border border-[var(--color-primary-100)]'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs font-semibold text-[var(--color-primary-500)] uppercase">Prompt</label>
                    <div className="mt-2 p-3 bg-[var(--color-primary-50)] rounded-lg text-sm text-[var(--color-primary-800)] border border-[var(--color-primary-100)]">
                      "Luxury 4-bedroom home with pool in Beverly Hills, modern design, mountain views"
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-[var(--color-primary-500)] uppercase">AI-Generated Content</label>
                      {isGenerating && (
                        <span className="text-xs text-[var(--color-primary-600)] flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Generating...
                        </span>
                      )}
                    </div>
                    <div className={`p-4 bg-white rounded-lg border border-[var(--color-primary-200)] text-sm text-[var(--color-primary-800)] leading-relaxed min-h-[120px] ${isGenerating ? 'opacity-50' : ''}`}>
                      {!isGenerating && (
                        <>
                          <span className="text-[var(--color-primary-600)] font-semibold">🏡 Just Listed: Modern Oasis in Beverly Hills</span>
                          <br /><br />
                          Escape to luxury in this stunning 4-bedroom estate featuring breathtaking mountain views, a resort-style pool, and sleek contemporary design. 
                          <br /><br />
                          <span className="text-[var(--color-primary-500)]">#BeverlyHills #LuxuryRealEstate #DreamHome #PoolLife #ModernDesign</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[var(--color-primary-600)] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                      <Send className="w-4 h-4" />
                      Use This
                    </button>
                    <button className="flex-1 py-2 bg-white border border-[var(--color-primary-200)] text-[var(--color-primary-700)] rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}

              {/* Analytics View */}
              {activeTab === 'analytics' && (
                <div className="p-6 h-[480px] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Reach', value: '45.2K', change: '+12%', up: true },
                      { label: 'Engagement', value: '18.4%', change: '+3.2%', up: true },
                      { label: 'Leads Generated', value: '127', change: '+28%', up: true }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-3 bg-[var(--color-primary-50)] rounded-xl text-center">
                        <p className="text-xs text-[var(--color-primary-500)] mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-[var(--color-primary-900)]">{stat.value}</p>
                        <p className={`text-xs ${stat.up ? 'text-green-600' : 'text-red-600'} flex items-center justify-center gap-1`}>
                          <TrendingUp className="w-3 h-3" />
                          {stat.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart Placeholder */}
                  <div className="mb-6 p-4 bg-white rounded-xl border border-[var(--color-primary-100)]">
                    <h4 className="font-semibold text-[var(--color-primary-900)] text-sm mb-4">Campaign Performance</h4>
                    <div className="h-32 flex items-end gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, idx) => (
                        <div key={idx} className="flex-1 bg-gradient-to-t from-[var(--color-primary-600)] to-[var(--color-primary-300)] rounded-t-sm" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[var(--color-primary-400)]">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>Jun</span>
                      <span>Sep</span>
                      <span>Dec</span>
                    </div>
                  </div>

                  {/* Top Performing */}
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-900 text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Top Performing Campaign
                    </h4>
                    <p className="text-sm text-green-800 mb-1">"Summer Listings Showcase"</p>
                    <p className="text-xs text-green-600">Generated 34 leads with 22% engagement rate</p>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Metric Card */}
            <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-xl shadow-xl border border-[var(--color-primary-100)] max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white flex-shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary-900)]">Campaign ROI</p>
                  <p className="text-2xl font-bold text-[var(--color-primary-600)] mt-1">4.2x</p>
                  <p className="text-xs text-[var(--color-primary-500)]">Average return on ad spend</p>
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
      icon: <Eye className="w-8 h-8" />,
      title: "10x Your Reach",
      description: "AI optimizes targeting and timing to put your listings in front of the right buyers at the right moment. Expand your audience without expanding your budget.",
      stat: "10x",
      statLabel: "more visibility",
      details: ["Smart targeting", "Optimal timing", "Cross-channel reach"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Generate 3x More Leads",
      description: "Automated campaigns capture and nurture leads 24/7. AI identifies high-intent prospects and routes them to you instantly, ready to convert.",
      stat: "3x",
      statLabel: "more leads",
      details: ["24/7 capture", "Auto-nurture", "Instant routing"]
    },
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "Double Your Engagement",
      description: "AI-generated content resonates with your audience. Personalized messaging, perfect timing, and A/B testing drive higher click and response rates.",
      stat: "2x",
      statLabel: "higher engagement",
      details: ["AI content", "Personalization", "Auto A/B testing"]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save 25+ Hours Weekly",
      description: "Eliminate manual posting, copywriting, and campaign management. AI handles everything from content creation to performance optimization.",
      stat: "25h",
      statLabel: "saved weekly",
      details: ["Auto-content", "Self-optimizing", "Hands-free"]
    }
  ];

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <TrendingUp className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Reach more clients effortlessly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Marketing That Drives Real Growth
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Measurable results that scale your real estate business
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
      title: "Define Your Goals",
      description: "Set campaign objectives, target audience, and budget. AI analyzes your market and recommends optimal strategies for maximum impact.",
      icon: <Target className="w-6 h-6" />,
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-600)]"
    },
    {
      number: "02",
      title: "AI Generates Content",
      description: "AI creates compelling copy, designs visuals, and builds campaign assets tailored to each channel—email, social, ads, and more.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-600)]"
    },
    {
      number: "03",
      title: "Auto-Distribute",
      description: "Campaigns deploy across all selected channels at optimal times. AI manages scheduling, posting, and ad placement automatically.",
      icon: <Send className="w-6 h-6" />,
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description: "Real-time analytics track performance. AI A/B tests creatives, adjusts budgets, and scales winning campaigns for best ROI.",
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
            <Zap className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-200)]">Set up in 5 minutes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            From Strategy to Scale in Four Steps
          </h2>
          <p className="text-lg text-[var(--color-primary-200)]">
            AI handles the heavy lifting while you watch your business grow
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

        {/* Channel Icons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Mail className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Email</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Share2 className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Social</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Megaphone className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Ads</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <FileText className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Content</span>
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
          <Rocket className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">Your growth engine is ready</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Let AI Power Your Marketing Growth
        </h2>
        <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
          Join 3,500+ real estate businesses scaling their marketing with AI. 
          Start generating more leads, engagement, and closings today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="group w-full sm:w-auto px-10 py-5 bg-white text-[var(--color-primary-700)] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <Rocket className="w-5 h-5" />
            Launch Your First Campaign
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Book Strategy Call
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

// Main Page Component
export default function MarketingAutomationPage() {
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
