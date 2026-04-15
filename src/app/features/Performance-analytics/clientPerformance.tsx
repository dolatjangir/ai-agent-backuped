// app/analytics-insights/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  Target, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Zap,
  Brain,
  Database,
  Filter,
  Download,
  Share2,
  Clock,
  Users,
  MousePointer,
  DollarSign,
  Calendar,
  MoreHorizontal,
  RefreshCw,
  Check,
  AlertCircle,
  Lightbulb,
  Search,
  Settings,
  Bell,
  Mail
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
            <BarChart3 className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Turn data into decisions</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-primary-900)] tracking-tight mb-6 leading-tight">
            See What Works.{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--color-primary-600)]">Optimize</span>
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-primary-200)] -z-0" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,4 Q100,0 200,4" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
            {' '}Everything.
          </h1>
          
          <p className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-2xl mx-auto mb-10">
            AI-powered analytics that reveal exactly how your marketing, leads, and deals perform. 
            Make smarter decisions with real-time insights that drive growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold shadow-xl shadow-[var(--color-primary-600)]/25 hover:shadow-[var(--color-primary-600)]/40 hover:bg-[var(--color-primary-700)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Eye className="w-5 h-5" />
              View Insights
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-xl font-semibold hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Play className="w-5 h-5 fill-current" />
              See Demo Dashboard
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-primary-600)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>AI-powered insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Custom reports</span>
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
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Performance Tracking",
      description: "Monitor every metric as it happens. Live dashboards show lead flow, engagement rates, and conversion activity with instant refresh.",
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
      badge: "Live"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Lead & Conversion Analytics",
      description: "Track the complete buyer journey from first touch to closing. Understand which channels, campaigns, and agents drive the most conversions.",
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
      badge: "End-to-End"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Driven Insights",
      description: "Machine learning models analyze patterns and predict outcomes. Get automated recommendations on what's working and what needs attention.",
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-500)]",
      badge: "Predictive"
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Custom Dashboards",
      description: "Build personalized views for every role. Agents see their pipeline, managers see team performance, executives see ROI—all in one place.",
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-500)]",
      badge: "Flexible"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Automated Reporting",
      description: "Schedule and share beautiful reports automatically. Weekly summaries, monthly deep-dives, or instant alerts—delivered to any inbox.",
      color: "from-[var(--color-primary-600)] to-[var(--color-primary-700)]",
      badge: "Auto-Delivered"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "ROI Tracking",
      description: "Connect marketing spend to revenue. Track cost per lead, cost per deal, and channel ROI to optimize your budget allocation.",
      color: "from-[var(--color-secondary-600)] to-[var(--color-secondary-700)]",
      badge: "Revenue-Focused"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">See what's working instantly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Analytics That Actually Drive Action
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Everything you need to track, understand, and optimize your real estate business
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
  const [activeTab, setActiveTab] = useState<'overview' | 'funnel' | 'insights'>('overview');
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-50)]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-6">
              <LayoutDashboard className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span className="text-sm font-semibold text-[var(--color-primary-700)]">Track every interaction</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-900)] mb-6 leading-tight">
              Your Entire Business, Visualized in Real Time
            </h2>
            
            <p className="text-lg text-[var(--color-primary-700)]/70 mb-8 leading-relaxed">
              Beautiful, intuitive dashboards that transform complex data into clear action items. 
              See trends, spot opportunities, and make confident decisions with AI-powered insights at your fingertips.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Real-time KPI tracking with instant refresh",
                "Interactive charts, graphs, and heatmaps",
                "AI anomaly detection and trend alerts",
                "Drill-down from high-level to individual leads",
                "Automated insight cards with recommendations"
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
              Explore Dashboards
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Interactive Analytics Dashboard */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)] rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--color-primary-100)] overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-gradient-to-r from-[var(--color-primary-50)] to-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-[var(--color-primary-900)]">Analytics Command Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Data
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[var(--color-primary-100)]">
                {[
                  { id: 'overview', icon: <Activity className="w-4 h-4" />, label: 'Overview' },
                  { id: 'funnel', icon: <Filter className="w-4 h-4" />, label: 'Funnel' },
                  { id: 'insights', icon: <Lightbulb className="w-4 h-4" />, label: 'AI Insights' }
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

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-6 h-[480px] overflow-y-auto">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Total Leads', value: '1,247', change: '+12%', up: true, icon: Users },
                      { label: 'Conversion Rate', value: '8.4%', change: '+2.1%', up: true, icon: Target },
                      { label: 'Avg. Deal Value', value: '$485K', change: '+5%', up: true, icon: DollarSign },
                      { label: 'Marketing ROI', value: '4.2x', change: '-0.3x', up: false, icon: TrendingUp }
                    ].map((metric, idx) => (
                      <div 
                        key={idx}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${hoveredMetric === idx ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)] shadow-md' : 'border-[var(--color-primary-100)] bg-white'}`}
                        onMouseEnter={() => setHoveredMetric(idx)}
                        onMouseLeave={() => setHoveredMetric(null)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[var(--color-primary-500)]">{metric.label}</span>
                          <metric.icon className="w-4 h-4 text-[var(--color-primary-400)]" />
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-2xl font-bold text-[var(--color-primary-900)]">{metric.value}</span>
                          <span className={`text-xs font-medium flex items-center gap-1 ${metric.up ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Chart */}
                  <div className="p-4 bg-white rounded-xl border border-[var(--color-primary-100)] mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-[var(--color-primary-900)] text-sm">Lead Flow & Conversions</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--color-primary-500)]">Last 30 days</span>
                        <RefreshCw className="w-4 h-4 text-[var(--color-primary-400)] animate-spin" />
                      </div>
                    </div>
                    <div className="h-40 flex items-end gap-2">
                      {[35, 45, 40, 55, 48, 62, 58, 75, 68, 82, 77, 95, 88, 102, 98, 115, 108, 125, 118, 135, 128, 142, 138, 155, 148, 162, 158, 175, 168, 182].map((height, idx) => (
                        <div key={idx} className="flex-1 flex flex-col gap-1">
                          <div 
                            className="w-full bg-[var(--color-primary-300)] rounded-t-sm transition-all duration-300 hover:bg-[var(--color-primary-500)]" 
                            style={{ height: `${height * 0.6}%` }} 
                          />
                          <div 
                            className="w-full bg-[var(--color-secondary-400)] rounded-t-sm transition-all duration-300 hover:bg-[var(--color-secondary-600)]" 
                            style={{ height: `${height * 0.3}%` }} 
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-[var(--color-primary-400)]">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Week 4</span>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[var(--color-primary-300)] rounded-sm" />
                        <span className="text-xs text-[var(--color-primary-600)]">Leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[var(--color-secondary-400)] rounded-sm" />
                        <span className="text-xs text-[var(--color-primary-600)]">Conversions</span>
                      </div>
                    </div>
                  </div>

                  {/* Channel Performance */}
                  <div className="p-4 bg-[var(--color-primary-50)] rounded-xl">
                    <h4 className="font-semibold text-[var(--color-primary-900)] text-sm mb-3">Top Performing Channels</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Organic Search', value: 35, leads: '436 leads' },
                        { name: 'Paid Social', value: 28, leads: '349 leads' },
                        { name: 'Email Campaigns', value: 22, leads: '274 leads' },
                        { name: 'Referrals', value: 15, leads: '188 leads' }
                      ].map((channel, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-xs text-[var(--color-primary-600)] w-24">{channel.name}</span>
                          <div className="flex-1 h-2 bg-[var(--color-primary-100)] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-full"
                              style={{ width: `${channel.value}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-[var(--color-primary-700)]">{channel.leads}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Funnel Tab */}
              {activeTab === 'funnel' && (
                <div className="p-6 h-[480px] overflow-y-auto">
                  <h4 className="font-semibold text-[var(--color-primary-900)] text-sm mb-6">Conversion Funnel</h4>
                  
                  <div className="space-y-4">
                    {[
                      { stage: 'Website Visitors', count: '12,450', rate: '100%', color: 'bg-[var(--color-primary-400)]', width: '100%' },
                      { stage: 'Leads Captured', count: '1,247', rate: '10.0%', color: 'bg-[var(--color-primary-500)]', width: '80%' },
                      { stage: 'Qualified Leads', count: '485', rate: '38.9%', color: 'bg-[var(--color-primary-600)]', width: '60%' },
                      { stage: 'Property Viewings', count: '156', rate: '32.2%', color: 'bg-[var(--color-secondary-500)]', width: '45%' },
                      { stage: 'Offers Made', count: '42', rate: '26.9%', color: 'bg-[var(--color-secondary-600)]', width: '30%' },
                      { stage: 'Deals Closed', count: '28', rate: '66.7%', color: 'bg-green-500', width: '20%' }
                    ].map((stage, idx) => (
                      <div key={idx} className="relative">
                        <div 
                          className={`${stage.color} text-white rounded-lg p-3 transition-all duration-300 hover:scale-105 cursor-pointer`}
                          style={{ width: stage.width, margin: '0 auto' }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{stage.stage}</span>
                            <div className="text-right">
                              <span className="font-bold block">{stage.count}</span>
                              <span className="text-xs opacity-80">{stage.rate} conversion</span>
                            </div>
                          </div>
                        </div>
                        {idx < 5 && (
                          <div className="flex justify-center my-2">
                            <ArrowRight className="w-4 h-4 text-[var(--color-primary-300)] rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-800">Funnel Insight</p>
                        <p className="text-xs text-yellow-700 mt-1">Viewing-to-offer rate dropped 5% this week. AI suggests scheduling more weekend open houses.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Insights Tab */}
              {activeTab === 'insights' && (
                <div className="p-6 h-[480px] overflow-y-auto">
                  <h4 className="font-semibold text-[var(--color-primary-900)] text-sm mb-4">AI-Generated Insights</h4>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        type: 'Opportunity', 
                        icon: TrendingUp, 
                        color: 'green', 
                        title: 'Scale Facebook Ads', 
                        desc: 'Campaign "Spring Listings" performing 40% above benchmark. Increase budget by 20% to capture 45 more leads.',
                        action: 'Optimize Now'
                      },
                      { 
                        type: 'Alert', 
                        icon: AlertCircle, 
                        color: 'red', 
                        title: 'Email Engagement Dropping', 
                        desc: 'Open rates for "New Listings" newsletter down 12%. AI recommends A/B testing subject lines.',
                        action: 'View Details'
                      },
                      { 
                        type: 'Trend', 
                        icon: Eye, 
                        color: 'blue', 
                        title: 'Weekend Traffic Surge', 
                        desc: 'Saturday website visits up 35%. Schedule more chat agent coverage on weekends.',
                        action: 'Adjust Schedule'
                      },
                      { 
                        type: 'Prediction', 
                        icon: Brain, 
                        color: 'purple', 
                        title: 'Q3 Revenue Forecast', 
                        desc: 'Based on current pipeline velocity, projected closings up 22% vs Q2. Prepare for increased volume.',
                        action: 'View Forecast'
                      }
                    ].map((insight, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-xl border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] transition-colors shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${insight.color === 'green' ? 'bg-green-100 text-green-600' : insight.color === 'red' ? 'bg-red-100 text-red-600' : insight.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            <insight.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold uppercase ${insight.color === 'green' ? 'text-green-600' : insight.color === 'red' ? 'text-red-600' : insight.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`}>
                                {insight.type}
                              </span>
                            </div>
                            <h5 className="font-semibold text-[var(--color-primary-900)] text-sm mb-1">{insight.title}</h5>
                            <p className="text-xs text-[var(--color-primary-600)] mb-3 leading-relaxed">{insight.desc}</p>
                            <button className="text-xs font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] flex items-center gap-1">
                              {insight.action}
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Floating Insight Card */}
            <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-xl shadow-xl border border-[var(--color-primary-100)] max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white flex-shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary-900)]">AI Alert</p>
                  <p className="text-xs text-[var(--color-primary-600)] mt-1">"Organic traffic up 28% this week. 3 listings getting unusual attention."</p>
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
      icon: <Brain className="w-8 h-8" />,
      title: "Make Smarter Decisions",
      description: "Stop guessing. AI analyzes thousands of data points to show exactly what's working, what's not, and what to do next. Every decision backed by real data.",
      stat: "94%",
      statLabel: "decision accuracy",
      details: ["AI recommendations", "Trend prediction", "Risk alerts"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Increase Conversions by 40%",
      description: "Identify bottlenecks in your funnel and fix them fast. Agents using our analytics close 40% more deals by focusing on high-impact activities.",
      stat: "40%",
      statLabel: "more conversions",
      details: ["Funnel optimization", "Activity scoring", "Priority alerts"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimize in Real Time",
      description: "No more waiting for monthly reports. Spot trends as they happen, adjust campaigns instantly, and stay ahead of market shifts.",
      stat: "Real-time",
      statLabel: "optimization",
      details: ["Live dashboards", "Instant alerts", "Auto-adjustments"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Complete Business Visibility",
      description: "See every metric that matters—from lead source to closing revenue. One dashboard for your entire operation, accessible anywhere.",
      stat: "360°",
      statLabel: "visibility",
      details: ["Unified view", "Mobile access", "Custom reports"]
    }
  ];

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <Target className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Optimize with confidence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Clarity That Drives Growth
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Transform data into your competitive advantage
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
      title: "Collect Data",
      description: "AI automatically gathers data from every touchpoint—website, ads, emails, calls, and CRM. No manual logging, no missed interactions.",
      icon: <Database className="w-6 h-6" />,
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-600)]"
    },
    {
      number: "02",
      title: "Analyze Patterns",
      description: "Machine learning models process millions of data points to identify trends, anomalies, and correlations invisible to the human eye.",
      icon: <Brain className="w-6 h-6" />,
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-600)]"
    },
    {
      number: "03",
      title: "Generate Insights",
      description: "AI transforms complex data into clear, actionable recommendations. Know exactly which leads to prioritize and which campaigns to scale.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      number: "04",
      title: "Optimize Strategy",
      description: "Apply data-driven improvements instantly. Adjust budgets, refine targeting, and automate winning workflows—continuously improving results.",
      icon: <Target className="w-6 h-6" />,
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
            <BarChart3 className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-200)]">From data to decisions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Analytics That Work for You
          </h2>
          <p className="text-lg text-[var(--color-primary-200)]">
            Four steps to data-driven growth
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

        {/* Integration Icons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <MousePointer className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Website</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Mail className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Email</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Phone className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Calls</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Share2 className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Ads</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Users className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">CRM</span>
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
          <BarChart3 className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">Your data is waiting</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Make Every Decision Data-Driven
        </h2>
        <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
          Join 2,800+ real estate professionals using AI-powered analytics to grow smarter and faster.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="group w-full sm:w-auto px-10 py-5 bg-white text-[var(--color-primary-700)] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <Eye className="w-5 h-5" />
            Start Tracking Performance
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Sample Report
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
            <span>Expert setup help</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Additional icon component needed
const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Main Page Component
export default function AnalyticsInsightsPage() {
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
