"use client"

import { useState } from 'react'
import { 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Building2,
  Send,
  ChevronDown,
  X,
  Bot,
  Target,
  Zap,
  Globe,
  Layers,
  BarChart3,
  Calendar,
  Star,
  Quote,
  Loader2,
  Play
} from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

// Solutions Data
const solutions = [
  {
    id: 'data-mining',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335511/data-mining-icon_duckos.png',
    title: 'Data Mining',
    description: 'Extract and organize high-quality leads automatically',
    category: 'Core Solutions',
    color: 'from-blue-500 to-blue-600',
    benefits: ['Automated Lead Discovery', 'Data Enrichment', 'Quality Scoring', 'CRM Integration'],
    stat: '10K+ leads/mo'
  },
  {
    id: 'lead-funnel',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335515/funnal-icon_arbhbv.png',
    title: 'Lead Funnel Automation',
    description: 'Capture, qualify, and convert leads on autopilot',
    category: 'Core Solutions',
    color: 'from-indigo-500 to-indigo-600',
    benefits: ['Smart Qualification', 'Auto-Routing', 'Nurture Sequences', 'Conversion Tracking'],
    stat: '+340% conversion'
  },
  {
    id: 'campaign-automation',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335513/campaign-auto-solution-icon_ke7mcm.png',
    title: 'Campaign Automation',
    description: 'Launch and optimize marketing campaigns with AI',
    category: 'Core Solutions',
    color: 'from-violet-500 to-violet-600',
    benefits: ['Multi-channel Campaigns', 'Auto-optimization', 'A/B Testing', 'ROI Analytics'],
    stat: '5x ROI increase'
  },
  {
    id: 'customer-engagement',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/customer-engage-icon_vafyry.png',
    title: 'Customer Engagement',
    description: 'Automate conversations across chat, calls, and social',
    category: 'Growth & Engagement',
    color: 'from-emerald-500 to-emerald-600',
    benefits: ['Omnichannel Chat', 'AI Calling', 'Social Automation', '24/7 Availability'],
    stat: '99.9% uptime'
  },
  {
    id: 'lead-followup',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335514/follow-up-icon_gyzki7.png',
    title: 'Lead Follow-Up',
    description: 'Never miss a lead with smart follow-up automation',
    category: 'Growth & Engagement',
    color: 'from-amber-500 to-amber-600',
    benefits: ['Smart Timing', 'Personalization', 'Multi-touch', 'Response Tracking'],
    stat: '+85% response rate'
  },
  {
    id: 'content-seo',
    icon: 'https://res.cloudinary.com/djipgt6vc/image/upload/v1774335601/seo-solution-icon_zx5kjy.png',
    title: 'Content & SEO Automation',
    description: 'Create, optimize, and distribute high-ranking content',
    category: 'Growth & Engagement',
    color: 'from-rose-500 to-rose-600',
    benefits: ['AI Content Creation', 'SEO Optimization', 'Auto-publishing', 'Rank Tracking'],
    stat: 'Top 3 rankings'
  }
]

const inquiryTypes = [
  {
    id: 'product-demo',
    icon: Play,
    title: 'Product Demo',
    description: 'See our solutions in action',
    responseTime: 'Within 24 hours'
  },
  {
    id: 'custom-solution',
    icon: Target,
    title: 'Custom Solution',
    description: 'Discuss your specific needs',
    responseTime: 'Within 4 hours'
  },
  {
    id: 'pricing',
    icon: BarChart3,
    title: 'Pricing & Plans',
    description: 'Get detailed pricing information',
    responseTime: 'Within 2 hours'
  },
  {
    id: 'partnership',
    icon: Users,
    title: 'Partnership',
    description: 'Explore partnership opportunities',
    responseTime: 'Within 24 hours'
  }
]

const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+']

export default function TalkToSalesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<string>('product-demo')
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    jobTitle: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleSolution = (solutionId: string) => {
    setSelectedSolutions(prev => 
      prev.includes(solutionId) 
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Our sales team will review your inquiry and get back to you shortly.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-[#0066cc] font-semibold mb-2">
              <Clock className="w-5 h-5" />
              Expected Response Time
            </div>
            <p className="text-sm text-gray-600">
              {inquiryTypes.find(t => t.id === selectedInquiry)?.responseTime}
            </p>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066cc] text-white font-semibold rounded-full hover:bg-[#0052a3] transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Talk to Sales | EstateAI</title>
        <meta name="description" content="Connect with our sales team to explore AI-powered solutions for your business" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0066cc] to-[#0052a3] pt-24 pb-16">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Let's Build Something Great Together
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Talk to Our Sales Team
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get personalized guidance on AI-powered solutions tailored to your business needs
            </p>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-slate-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Avg. response time: 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>500+ businesses served</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>95% customer satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              
              {/* Left: Info & Solutions */}
              <div className="lg:col-span-2 space-y-8">
                {/* Solutions Overview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#0066cc]" />
                    Solutions You're Interested In
                  </h3>
                  <div className="space-y-3">
                    {solutions.map((solution) => (
                      <button
                        key={solution.id}
                        onClick={() => toggleSolution(solution.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                          selectedSolutions.includes(solution.id)
                            ? 'border-[#0066cc] bg-blue-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${solution.color} flex items-center justify-center p-2`}>
                          <img 
                            src={solution.icon} 
                            alt={solution.title}
                            className="w-full h-full object-contain filter brightness-0 invert"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900 text-sm">{solution.title}</div>
                          <div className="text-xs text-gray-500">{solution.category}</div>
                        </div>
                        {selectedSolutions.includes(solution.id) && (
                          <CheckCircle2 className="w-5 h-5 text-[#0066cc]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Select the solutions you'd like to discuss with our team
                  </p>
                </div>

                {/* Why Talk to Sales */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Why Talk to Our Team?</h3>
                  <ul className="space-y-3">
                    {[
                      'Get a personalized demo tailored to your use case',
                      'Receive custom pricing based on your requirements',
                      'Learn about implementation and onboarding',
                      'Discuss integration with your existing tools',
                      'Explore enterprise features and SLAs'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <Quote className="w-8 h-8 text-[#0066cc]/20 mb-4" />
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "The sales team understood our challenges immediately and proposed a custom solution that increased our lead conversion by 280% in just 3 months."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center text-white font-semibold">
                      RK
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Robert Kim</div>
                      <div className="text-sm text-gray-500">CEO, Metro Properties</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Inquiry Type Selector */}
                  <div className="border-b border-gray-100">
                    <div className="p-6 pb-2">
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">
                        What would you like to discuss?
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-6 pt-0">
                      {inquiryTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.id}
                            onClick={() => setSelectedInquiry(type.id)}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                              selectedInquiry === type.id
                                ? 'border-[#0066cc] bg-blue-50'
                                : 'border-gray-100 hover:border-gray-200'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              selectedInquiry === type.id ? 'bg-[#0066cc] text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm">{type.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size
                        </label>
                        <div className="relative">
                          <select
                            value={formData.companySize}
                            onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all appearance-none"
                          >
                            <option value="">Select size...</option>
                            {companySizes.map(size => (
                              <option key={size} value={size}>{size} employees</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                        placeholder="Sales Director"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your needs *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all resize-none"
                        placeholder="I'm looking to automate our lead qualification process and improve our conversion rates..."
                      />
                    </div>

                    {/* Selected Solutions Summary */}
                    {selectedSolutions.length > 0 && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-sm font-semibold text-[#0066cc] mb-2">
                          Selected Solutions ({selectedSolutions.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedSolutions.map(id => {
                            const solution = solutions.find(s => s.id === id)
                            return solution ? (
                              <span key={id} className="inline-flex items-center gap-1 px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-blue-200">
                                {solution.title}
                                <button 
                                  onClick={() => toggleSolution(id)}
                                  className="hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our{' '}
                      <Link href="/privacy" className="text-[#0066cc] hover:underline">Privacy Policy</Link>
                      {' '}and{' '}
                      <Link href="/terms" className="text-[#0066cc] hover:underline">Terms of Service</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Ways to Connect</h2>
              <p className="text-gray-600">Prefer a different contact method? We've got you covered</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  info: '+1 (555) 123-4567',
                  subInfo: 'Mon-Fri 9am-6pm EST',
                  action: 'Call Now',
                  href: 'tel:+15551234567'
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  info: 'sales@estateai.com',
                  subInfo: 'We reply within 2 hours',
                  action: 'Send Email',
                  href: 'mailto:sales@estateai.com'
                },
                {
                  icon: Calendar,
                  title: 'Schedule a Call',
                  info: 'Book a 30-min meeting',
                  subInfo: 'Pick a time that works for you',
                  action: 'Book Now',
                  href: '/book-call'
                }
              ].map((method, idx) => {
                const Icon = method.icon
                return (
                  <a
                    key={idx}
                    href={method.href}
                    className="group flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#0066cc]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <p className="text-[#0066cc] font-medium">{method.info}</p>
                      <p className="text-sm text-gray-500">{method.subInfo}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0066cc] group-hover:translate-x-1 transition-all" />
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'How quickly will someone respond to my inquiry?',
                  a: 'Our sales team typically responds within 2 hours during business hours (9am-6pm EST). For custom solution inquiries, we prioritize these and aim to respond within 4 hours.'
                },
                {
                  q: 'Do I need to prepare anything before the call?',
                  a: 'Just come with your challenges and goals in mind. Our team will ask about your current process, pain points, and what success looks like for you. If you have specific data or requirements, feel free to share them.'
                },
                {
                  q: 'Is there a cost for the initial consultation?',
                  a: 'No, the initial consultation is completely free. We believe in understanding your needs first before discussing any pricing. You\'ll receive a personalized demo and custom proposal based on your requirements.'
                },
                {
                  q: 'Can I see a demo of the solutions?',
                  a: 'Absolutely! Every sales call includes a personalized demo tailored to your use case. We\'ll show you exactly how our solutions address your specific challenges and answer any technical questions you have.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}