"use client"

import { useState } from 'react'
import { 
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  BarChart3,
  Users,
  Target,
  MessageSquare,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Bot,
  Workflow,
  PieChart,
  LineChart,
  Lightbulb,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

// Feature Data from your header
const features = [
  {
    id: 'ai-automation',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335511/feature-ai-auto-robo_ze335e.png',
    title: 'AI Automation',
    description: 'Your core agents power - intelligent automation that drives your entire real estate workflow',
    category: 'Core AI',
    badge: 'Core',
    color: 'from-blue-500 to-blue-600',
    features: ['Workflow Automation', 'Task Scheduling', 'Smart Triggers', 'Agent Orchestration'],
    stats: { efficiency: '+300%', tasks: '10K+/day' },
    href: '/features/ai-automation',
    longDescription: 'The heart of EstateAI platform. Our AI Automation engine powers all agents, orchestrating complex workflows, scheduling tasks, and triggering intelligent actions based on real-time data and user behavior.'
  },
  {
    id: 'lead-management',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335566/lead-management-icon_v2yheh.png',
    title: 'Lead Management',
    description: 'AI-powered real estate main value - capture, qualify, and convert leads automatically',
    category: 'Core AI',
    badge: 'AI Powered',
    color: 'from-indigo-500 to-indigo-600',
    features: ['Lead Scoring', 'Auto-assignment', 'Pipeline Tracking', 'Conversion Analytics'],
    stats: { conversion: '+150%', leads: '50K+' },
    href: '/features/smart-lead',
    longDescription: 'Transform how you handle leads with AI-powered scoring, automatic assignment to the right agents, real-time pipeline tracking, and predictive conversion analytics that help you close more deals.'
  },
  {
    id: 'property-intelligence',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335575/property-icon_cyrnaf.png',
    title: 'Property Intelligence',
    description: 'Visual deal Property Intelligence - data-driven insights for smarter property decisions',
    category: 'Core AI',
    badge: null,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Market Analysis', 'Price Prediction', 'Comparables', 'Trend Forecasting'],
    stats: { accuracy: '95%', properties: '1M+' },
    href: '/features/property-ai',
    longDescription: 'Make informed property decisions with comprehensive market analysis, AI-powered price predictions, instant comparable property lookups, and trend forecasting that keeps you ahead of the market.'
  },
  {
    id: 'marketing-automation',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335571/marketing-icon_hsbqzs.png',
    title: 'Marketing Automation',
    description: 'Automate growth - scale your marketing efforts with intelligent campaign management',
    category: 'Growth',
    badge: null,
    color: 'from-violet-500 to-violet-600',
    features: ['Campaign Builder', 'Auto-segmentation', 'A/B Testing', 'ROI Tracking'],
    stats: { roi: '+400%', campaigns: 'Unlimited' },
    href: '/features/growth-automation',
    longDescription: 'Scale your marketing without scaling your team. Build sophisticated campaigns, automatically segment audiences, run continuous A/B tests, and track ROI in real-time with our intelligent marketing engine.'
  },
  {
    id: 'smart-communication',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335598/smart-icon_s79g76.png',
    title: 'Smart Communication',
    description: 'AI calls, chats, follow-ups - omnichannel communication that never misses a beat',
    category: 'Growth',
    badge: null,
    color: 'from-emerald-500 to-emerald-600',
    features: ['AI Calling', 'Chatbots', 'Email Sequences', 'SMS Campaigns'],
    stats: { response: '+85%', channels: '5+' },
    href: '/features/Conversational-ai',
    longDescription: 'Engage prospects across every channel with AI-powered calling, intelligent chatbots, automated email sequences, and targeted SMS campaigns that maintain consistent, personalized communication.'
  },
  {
    id: 'analytics-insights',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335510/analtics-icon_pbc1mb.png',
    title: 'Analytics & Insights',
    description: 'Data + decisions automation - transform raw data into actionable business intelligence',
    category: 'Growth',
    badge: null,
    color: 'from-amber-500 to-amber-600',
    features: ['Custom Dashboards', 'Predictive Analytics', 'Report Builder', 'KPI Tracking'],
    stats: { insights: 'Real-time', reports: '100+' },
    href: '/features/Performance-analytics',
    longDescription: 'Turn data into your competitive advantage. Build custom dashboards, leverage predictive analytics, create automated reports, and track the KPIs that matter most to your business growth.'
  }
]

const categories = ['All', 'Core AI', 'Growth']

export default function ExploreFeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = activeCategory === 'All' || feature.category === activeCategory
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const scrollToFeatures = () => {
    document.getElementById('features-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Explore Platform Features | EstateAI</title>
        <meta name="description" content="Discover powerful AI-driven features to manage customer relationships at scale" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-32 pb-20 lg:pt-40 lg:pb-32">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-30" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,204,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-[#0066cc]" />
                <span className="text-sm font-semibold text-[#0066cc]">6 Powerful Features</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] bg-clip-text text-transparent">
                  Scale
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                A complete platform to manage customer relationships at scale. 
                From AI automation to advanced analytics, we've got you covered.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button 
                  onClick={scrollToFeatures}
                  className="group px-8 py-4 bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2"
                >
                  Explore Features
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link 
                  href="/demo"
                  className="group px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full transition-all duration-300 border border-gray-200 hover:border-gray-300 flex items-center gap-2"
                >
                  <Play className="w-5 h-5 text-[#0066cc]" />
                  Watch Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Feature Icons Preview */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="relative h-48 lg:h-64 flex items-center justify-center gap-8 lg:gap-16">
              {features.slice(0, 4).map((feature, idx) => (
                <div 
                  key={idx}
                  className="relative w-20 h-20 lg:w-28 lg:h-28 bg-white rounded-2xl shadow-2xl shadow-blue-900/10 flex items-center justify-center border border-gray-100 animate-float"
                  style={{ 
                    animationDelay: `${idx * 0.2}s`,
                    animationDuration: '4s',
                    transform: `translateY(${idx % 2 === 0 ? '-20px' : '20px'})`
                  }}
                >
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                      {feature.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#0066cc] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '6', label: 'Core Features' },
                { value: '10+', label: 'AI Agents' },
                { value: '95%', label: 'Accuracy Rate' },
                { value: '24/7', label: 'Platform Uptime' },
              ].map((stat, idx) => (
                <div key={idx} className="text-white">
                  <div className="text-3xl lg:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section id="features-grid" className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === category
                        ? 'bg-[#0066cc] text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="hidden lg:flex items-center gap-2 border-l border-gray-200 pl-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-[#0066cc]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-[#0066cc]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFeatures.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No features found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredFeatures.map((feature) => (
                  <FeatureCard 
                    key={feature.id} 
                    feature={feature} 
                    viewMode={viewMode}
                    isHovered={hoveredFeature === feature.id}
                    onHover={() => setHoveredFeature(feature.id)}
                    onLeave={() => setHoveredFeature(null)}
                    onSelect={() => setSelectedFeature(feature.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Feature Spotlight Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why These Features Matter
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Each feature is designed to solve real problems and deliver measurable results
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Feature Highlights */}
              <div className="space-y-6">
                {[
                  { 
                    icon: Bot, 
                    title: 'AI-First Architecture', 
                    desc: 'Every feature is powered by artificial intelligence, not just enhanced by it. This means smarter automation, better predictions, and continuous improvement.',
                    color: 'bg-blue-100 text-blue-600'
                  },
                  { 
                    icon: Workflow, 
                    title: 'Seamless Integration', 
                    desc: 'All 6 features work together as a unified platform. Data flows automatically between Lead Management, Property Intelligence, and Analytics without manual intervention.',
                    color: 'bg-indigo-100 text-indigo-600'
                  },
                  { 
                    icon: Zap, 
                    title: 'Real-Time Processing', 
                    desc: 'No delays, no batch processing. Our platform operates in real-time, ensuring you never miss an opportunity and always have the latest insights.',
                    color: 'bg-amber-100 text-amber-600'
                  },
                  { 
                    icon: Shield, 
                    title: 'Enterprise-Grade Security', 
                    desc: 'Bank-level encryption, SOC 2 compliance, and role-based access controls keep your data and your clients\' information safe.',
                    color: 'bg-emerald-100 text-emerald-600'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                    <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Visual Representation */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform rotate-3" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0066cc] rounded-lg flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-gray-900">Platform Overview</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Live</span>
                  </div>

                  <div className="space-y-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <img src={feature.icon} alt={feature.title} className="w-10 h-10 object-contain" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900">{feature.title}</span>
                            <span className="text-xs text-green-600 font-medium">Active</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${85 + idx * 3}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">System Status</span>
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        All Systems Operational
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Our platform is designed for quick setup and immediate value
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: '01', 
                  title: 'Connect Your Data', 
                  desc: 'Import your existing leads, properties, and contacts. Our AI automatically organizes and enriches your data.',
                  icon: Target
                },
                { 
                  step: '02', 
                  title: 'Activate Features', 
                  desc: 'Choose which features to enable. Start with one or activate all six - you have complete control.',
                  icon: Zap
                },
                { 
                  step: '03', 
                  title: 'Watch Results', 
                  desc: 'See immediate improvements in lead response times, conversion rates, and team productivity.',
                  icon: TrendingUp
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-14 h-14 bg-[#0066cc] rounded-xl flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-white/20 mb-4">{item.step}</div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-slate-300">{item.desc}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-white/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Real Estate Professionals
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The AI Automation feature transformed our workflow. What used to take 3 hours now happens automatically in minutes.",
                  author: "David Chen",
                  role: "Broker, Metro Realty",
                  rating: 5,
                  feature: "AI Automation"
                },
                {
                  quote: "Lead Management with AI scoring helped us focus on the right prospects. Our conversion rate increased by 200%.",
                  author: "Maria Rodriguez",
                  role: "Sales Manager, Coastal Properties",
                  rating: 5,
                  feature: "Lead Management"
                },
                {
                  quote: "Property Intelligence gives us insights we never had before. We price listings more accurately and sell faster.",
                  author: "James Wilson",
                  role: "Agent, Premier Estates",
                  rating: 5,
                  feature: "Property Intelligence"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-[#0066cc] text-xs font-semibold rounded-full">
                      {testimonial.feature}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Ecosystem */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Works With Your Favorite Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Seamlessly integrate with 50+ apps and services you already use
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[
                'Salesforce', 'HubSpot', 'Zillow', 'Realtor.com', 'Mailchimp', 
                'Slack', 'Google Workspace', 'Microsoft 365', 'Dropbox', 'DocuSign',
                'Calendly', 'Zoom', 'Stripe', 'QuickBooks', 'Zendesk'
              ].map((tool, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-gray-600">{tool}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/integrations"
                className="inline-flex items-center gap-2 text-[#0066cc] font-semibold hover:gap-3 transition-all"
              >
                View All Integrations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0066cc] to-[#0052a3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of real estate professionals using our platform to scale their operations and close more deals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="https://bnb.ibigdata.in/register"
                target="_blank"
                className="group px-8 py-4 bg-white text-[#0066cc] font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Schedule Demo
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              No credit card required • 14-day free trial • Setup in 5 minutes
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

// Feature Card Component
function FeatureCard({ 
  feature, 
  viewMode, 
  isHovered, 
  onHover, 
  onLeave,
  onSelect
}: { 
  feature: typeof features[0]
  viewMode: 'grid' | 'list'
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onSelect: () => void
}) {
  if (viewMode === 'list') {
    return (
      <div 
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
      >
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg p-4`}>
          <img 
            src={feature.icon} 
            alt={feature.title}
            className="w-full h-full object-contain filter brightness-0 invert"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
            {feature.badge && (
              <span className="px-3 py-1 text-xs font-semibold bg-[#0066cc] text-white rounded-full">
                {feature.badge}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">{feature.description}</p>
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{feature.longDescription}</p>
          <div className="flex items-center gap-4">
            {Object.entries(feature.stats).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                <span className="font-semibold text-[#0066cc]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {feature.features.slice(0, 3).map((f, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {f}
              </span>
            ))}
          </div>
          <Link 
            href={feature.href}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0066cc] transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onSelect}
      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-blue-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Gradient Top Border */}
      <div className={`h-1.5 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg p-3 transform transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
            <img 
              src={feature.icon} 
              alt={feature.title}
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
          {feature.badge && (
            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white rounded-full shadow-md">
              {feature.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0066cc] transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {feature.description}
        </p>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">
          {feature.longDescription}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {feature.features.map((f, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          {Object.entries(feature.stats).map(([key, value]) => (
            <div key={key}>
              <div className="text-lg font-bold text-[#0066cc]">{value}</div>
              <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover CTA */}
      <Link 
        href={feature.href}
        className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white via-white to-transparent transform transition-transform duration-300 flex items-center justify-center gap-2 text-[#0066cc] font-semibold text-sm ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}
      >
        Explore Feature
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
