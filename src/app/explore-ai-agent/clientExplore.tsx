"use client"

import { useState, useRef } from 'react'
import { 
  Bot,
  Target,
  Zap,
  MessageSquare,
  Users,
  Phone,
  Workflow,
  BarChart3,
  Globe,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Cpu,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  X
} from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

// AI Agent Data
const aiAgents = [
  {
    id: 'lead-qualification',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-2_l1xdll.png",
    title: 'Lead Qualification Agent',
    description: 'AI-powered lead scoring and qualification that automatically identifies high-intent prospects and prioritizes your sales pipeline.',
    category: 'Lead Generation',
    badge: 'Popular',
    color: 'from-blue-500 to-blue-600',
    features: ['Smart Scoring', 'Behavioral Analysis', 'Priority Ranking', 'Auto-tagging'],
    stats: { accuracy: '94%', timeSaved: '12hrs/week' },
    href: '/ai-agents/lead-qualifiction-agent'
  },
  {
    id: 'property-matching',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-3_scja92.png",
    title: 'Property Matching Agent',
    description: 'Intelligent property recommendations that match buyer preferences with available listings using advanced AI algorithms.',
    category: 'Lead Generation',
    badge: 'AI Powered',
    color: 'from-indigo-500 to-indigo-600',
    features: ['Preference Learning', 'Smart Matching', 'Instant Alerts', 'Market Analysis'],
    stats: { accuracy: '91%', matches: '10K+' },
    href: '/ai-agents/property-maching-agent'
  },
  {
    id: 'lead-capture',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-4_damgxf.png",
    title: 'Lead Capture Agent',
    description: '24/7 automated lead capture across all channels. Never miss an opportunity with instant response and qualification.',
    category: 'Lead Generation',
    badge: null,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Multi-channel', 'Instant Response', 'Auto-qualify', 'CRM Sync'],
    stats: { captureRate: '+340%', responseTime: '<1min' },
    href: '/ai-agents/lead-capture-agent'
  },
  {
    id: 'content-creation',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-6_mky5rb.png",
    title: 'Content Creation Agent',
    description: 'AI-generated marketing content, property descriptions, and social posts that engage your audience and drive conversions.',
    category: 'Marketing',
    badge: 'New',
    color: 'from-violet-500 to-violet-600',
    features: ['SEO Optimized', 'Brand Voice', 'Multi-format', 'Auto-schedule'],
    stats: { contentPieces: '500+', engagement: '+180%' },
    href: '/ai-agents/content-creation-agent'
  },
  {
    id: 'follow-up',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335523/img-7_xjwzbl.png",
    title: 'Follow-Up Agent',
    description: 'Smart nurture sequences that maintain engagement with personalized follow-ups at the perfect time.',
    category: 'Engagement',
    badge: 'AI Powered',
    color: 'from-emerald-500 to-emerald-600',
    features: ['Smart Timing', 'Personalization', 'Multi-touch', 'Response Tracking'],
    stats: { responseRate: '+65%', conversions: '+42%' },
    href: '/ai-agents/follow-up-agent'
  },
  {
    id: 'calling',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-9_i1wlut.png",
    title: 'AI Calling Agent',
    description: 'Human-like voice conversations that handle inquiries, schedule appointments, and qualify leads automatically.',
    category: 'Communication',
    badge: null,
    color: 'from-rose-500 to-rose-600',
    features: ['Natural Voice', '24/7 Availability', 'Call Recording', 'Live Transfer'],
    stats: { callsHandled: '10K+/mo', satisfaction: '4.8/5' },
    href: '/ai-agents/calling-agent'
  },
  {
    id: 'campaign-automation',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335552/img-8_twulvb.png",
    title: 'Campaign Automation Agent',
    description: 'End-to-end campaign management from creation to optimization with AI-driven performance insights.',
    category: 'Marketing',
    badge: null,
    color: 'from-amber-500 to-amber-600',
    features: ['Auto-optimize', 'A/B Testing', 'Budget Management', 'ROI Tracking'],
    stats: { roi: '+280%', campaigns: 'Unlimited' },
    href: '/ai-agents/campaign-automation'
  },
  {
    id: 'data-mining',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-1_nz99v7.png",
    title: 'Data Mining Agent',
    description: 'Intelligent data extraction and analysis that uncovers hidden opportunities and market insights.',
    category: 'Analytics',
    badge: null,
    color: 'from-slate-500 to-slate-600',
    features: ['Web Scraping', 'Data Enrichment', 'Pattern Detection', 'Reports'],
    stats: { dataPoints: '1M+', accuracy: '99%' },
    href: '/ai-agents/data-mining-agent'
  },
  {
    id: 'social-media',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-10_ajsusz.png",
    title: 'Social Media Agent',
    description: 'Automated social engagement that builds your brand presence and generates leads across all platforms.',
    category: 'Marketing',
    badge: null,
    color: 'from-pink-500 to-pink-600',
    features: ['Content Calendar', 'Auto-posting', 'Engagement', 'Analytics'],
    stats: { followers: '+150%', engagement: '+200%' },
    href: '/ai-agents/social-media-agent'
  },
  {
    id: 'seo-content',
    icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-555_kabvyd.png",
    title: 'SEO Content Agent',
    description: 'Rank-optimized content creation that boosts your visibility and drives organic traffic automatically.',
    category: 'Marketing',
    badge: 'New',
    color: 'from-teal-500 to-teal-600',
    features: ['Keyword Research', 'Content Optimization', 'Rank Tracking', 'Backlinks'],
    stats: { ranking: 'Top 3', traffic: '+400%' },
    href: '/ai-agents/seo-content-agent'
  }
]

const categories = ['All', 'Lead Generation', 'Marketing', 'Engagement', 'Communication', 'Analytics']

export default function ExploreAgentsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)

  const filteredAgents = aiAgents.filter(agent => {
    const matchesCategory = activeCategory === 'All' || agent.category === activeCategory
    const matchesSearch = agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const scrollToAgents = () => {
    document.getElementById('agents-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Explore AI Agents | EstateAI</title>
        <meta name="description" content="Discover 10+ intelligent AI agents to automate your real estate business" />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-[#0066cc]" />
                <span className="text-sm font-semibold text-[#0066cc]">10+ AI Agents Available</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Meet Your{' '}
                <span className="bg-gradient-to-r from-[#0066cc] to-[#0052a3] bg-clip-text text-transparent">
                  AI Workforce
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Deploy intelligent agents that work 24/7 to capture leads, qualify prospects, 
                create content, and close deals—while you focus on what matters most.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button 
                  onClick={scrollToAgents}
                  className="group px-8 py-4 bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2"
                >
                  Explore All Agents
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

          {/* Floating Agent Cards Preview */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="relative h-64 lg:h-80 perspective-1000">
              {[
                { icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-1_nz99v7.png", color: 'bg-blue-500', delay: '0s', position: 'left-[5%] top-0' },
                { icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-4_damgxf.png", color: 'bg-indigo-500', delay: '0.1s', position: 'left-[25%] top-8' },
                { icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-6_mky5rb.png", color: 'bg-cyan-500', delay: '0.2s', position: 'left-[45%] top-0' },
                { icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-9_i1wlut.png", color: 'bg-violet-500', delay: '0.3s', position: 'left-[65%] top-8' },
                { icon: "https://res.cloudinary.com/djipgt6vc/image/upload/v1774335523/img-7_xjwzbl.png", color: 'bg-emerald-500', delay: '0.4s', position: 'left-[85%] top-0' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`absolute ${item.position} w-20 h-20 lg:w-24 lg:h-24 ${item.color} rounded-2xl shadow-2xl flex items-center justify-center animate-float`}
                  style={{ 
                    animationDelay: item.delay,
                    transform: 'rotateX(10deg) rotateY(-10deg)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                  }}
                >
                  <img src={item.icon} className="max-w-12 max-h-12 lg:max-w-20 lg:max-h-20 text-white" />
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
                { value: '10+', label: 'AI Agents' },
                { value: '1M+', label: 'Tasks Automated' },
                { value: '94%', label: 'Accuracy Rate' },
                { value: '24/7', label: 'Availability' },
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
        <section id="agents-grid" className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
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

        {/* Agents Grid */}
        <section className="py-16 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredAgents.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredAgents.map((agent) => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    viewMode={viewMode}
                    isHovered={hoveredAgent === agent.id}
                    onHover={() => setHoveredAgent(agent.id)}
                    onLeave={() => setHoveredAgent(null)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AI Agents?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how AI agents outperform traditional methods across every metric that matters
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Comparison Table */}
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
                  <div className="p-4 font-semibold text-gray-700">Metric</div>
                  <div className="p-4 font-semibold text-gray-400 text-center">Traditional</div>
                  <div className="p-4 font-semibold text-[#0066cc] text-center bg-blue-50/50">With AI Agents</div>
                </div>
                {[
                  { metric: 'Lead Response Time', traditional: 'Hours/Days', ai: '< 1 minute', improvement: '+99%' },
                  { metric: 'Lead Qualification', traditional: 'Manual scoring', ai: 'Auto 94% accuracy', improvement: '+85%' },
                  { metric: 'Follow-up Consistency', traditional: 'Inconsistent', ai: '100% automated', improvement: '+100%' },
                  { metric: 'Content Creation', traditional: 'Days per piece', ai: 'Minutes per piece', improvement: '+10x' },
                  { metric: 'Operating Hours', traditional: '9-5 limited', ai: '24/7/365', improvement: 'Always on' },
                  { metric: 'Cost per Lead', traditional: '$50-100', ai: '$5-15', improvement: '-80%' },
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-3 border-b border-gray-50 last:border-0">
                    <div className="p-4 text-sm font-medium text-gray-700">{row.metric}</div>
                    <div className="p-4 text-sm text-gray-500 text-center">{row.traditional}</div>
                    <div className="p-4 text-sm font-semibold text-[#0066cc] text-center bg-blue-50/30">
                      {row.ai}
                      <span className="block text-xs text-green-600 mt-1">{row.improvement}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits Cards */}
              <div className="space-y-4">
                {[
                  { icon: Clock, title: 'Always On', desc: 'AI agents never sleep, ensuring 24/7 lead capture and engagement' },
                  { icon: TrendingUp, title: 'Scale Infinitely', desc: 'Handle 10x more leads without adding headcount' },
                  { icon: Shield, title: 'Consistent Quality', desc: 'Every interaction follows your best practices perfectly' },
                  { icon: Cpu, title: 'Self-Improving', desc: 'Agents learn from every interaction to improve over time' },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#0066cc]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Deploy AI Agents in 3 Steps
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Get your AI workforce up and running in minutes, not months
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: '01', 
                  title: 'Choose Your Agents', 
                  desc: 'Select from 10+ pre-trained AI agents designed for real estate',
                  icon: Bot
                },
                { 
                  step: '02', 
                  title: 'Configure & Connect', 
                  desc: 'Connect your CRM, set preferences, and customize in minutes',
                  icon: Workflow
                },
                { 
                  step: '03', 
                  title: 'Watch Them Work', 
                  desc: 'Agents start immediately—capturing, qualifying, and converting',
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Loved by Real Estate Professionals
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The Lead Qualification Agent alone saved us 20 hours per week. Our conversion rate jumped 40% in the first month.",
                  author: "Sarah Chen",
                  role: "Broker, Premier Realty",
                  rating: 5
                },
                {
                  quote: "We deployed 5 AI agents and doubled our lead capacity without hiring. The ROI is incredible.",
                  author: "Michael Torres",
                  role: "Team Lead, Urban Properties",
                  rating: 5
                },
                {
                  quote: "The Content Creation Agent writes better property descriptions than I do. It's like having a marketing team on autopilot.",
                  author: "Jennifer Walsh",
                  role: "Agent, Luxury Homes",
                  rating: 5
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#0066cc] to-[#0052a3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Your AI Workforce?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Start with one agent or deploy the full suite. Scale your business with intelligent automation.
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
          0%, 100% { transform: translateY(0px) rotateX(10deg) rotateY(-10deg); }
          50% { transform: translateY(-20px) rotateX(10deg) rotateY(-10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
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

// Agent Card Component
function AgentCard({ 
  agent, 
  viewMode, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  agent: typeof aiAgents[0]
  viewMode: 'grid' | 'list'
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const Icon = agent.icon

  if (viewMode === 'list') {
    return (
      <Link 
        href={agent.href}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
      >
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <img src={Icon} className="max-w-14 max-h-14 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{agent.title}</h3>
            {agent.badge && (
              <span className="px-2 py-1 text-xs font-semibold bg-[#0066cc] text-white rounded-full">
                {agent.badge}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{agent.description}</p>
          <div className="flex items-center gap-4 mt-3">
            {Object.entries(agent.stats).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                <span className="font-semibold text-[#0066cc]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {agent.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {feature}
              </span>
            ))}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0066cc] transition-colors">
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link 
      href={agent.href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-blue-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Gradient Top Border */}
      <div className={`h-1 bg-gradient-to-r ${agent.color} transform origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg transform transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
            <img src={Icon} className="max-w-14 max-h-14 text-white" />
          </div>
          {agent.badge && (
            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white rounded-full shadow-md">
              {agent.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0066cc] transition-colors">
          {agent.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {agent.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.features.map((feature, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          {Object.entries(agent.stats).map(([key, value]) => (
            <div key={key}>
              <div className="text-lg font-bold text-[#0066cc]">{value}</div>
              <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover CTA */}
      <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white via-white to-transparent transform transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-center gap-2 text-[#0066cc] font-semibold text-sm">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}