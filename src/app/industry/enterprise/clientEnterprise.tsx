"use client"
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Building2, 
  Shield, 
  Globe, 
  Users, 
  TrendingUp, 
  Check, 
  ChevronRight, 
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  Layers,
  Lock,
  Server,
  Cpu,
  BarChart3,
  Zap,
  Clock,
  Database,

  Award,
  Briefcase,
  ChevronDown,
  Plus,
  Minus,
  Rocket,
  Settings,
  Phone,
  Mail,
  MapPin,
  Loader2
} from 'lucide-react';

// Reusable Components (matching your design system)
const GlassCard = ({ children, className = "", hover = true, dark = false }: { children: React.ReactNode; className?: string; hover?: boolean; dark?: boolean }) => (
  <div className={`relative overflow-hidden rounded-[var(--radius-3xl)] backdrop-blur-xl border transition-all duration-[var(--duration-normal)] ${
    dark 
      ? 'bg-[var(--color-neutral-800)]/80 border-[var(--color-neutral-700)] text-white' 
      : 'bg-white/80 border-[var(--border-light)] shadow-xl'
  } ${hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''} ${className}`}>
    {children}
  </div>
);

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const Badge = ({ children, variant = "primary", size = "md" }: { children: React.ReactNode; variant?: "primary" | "secondary" | "success" | "warning" | "dark"; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };
  
  const variants = {
    primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border-[var(--color-primary-200)]",
    secondary: "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] border-[var(--color-secondary-200)]",
    success: "bg-[var(--color-success-100)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    warning: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
    dark: "bg-[var(--color-neutral-800)] text-white border-[var(--color-neutral-700)]"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-semibold border ${sizes[size]} ${variants[variant]}`}>
      {children}
    </span>
  );
};

const FeatureIcon = ({ icon: Icon, gradient = false, size = "lg" }: { icon: any; gradient?: boolean; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  
  return (
    <div className={`${sizes[size]} rounded-[var(--radius-2xl)] flex items-center justify-center ${gradient ? 'bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white shadow-lg' : 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'}`}>
      <Icon className={size === "lg" ? "w-8 h-8" : size === "md" ? "w-6 h-6" : "w-5 h-5"} />
    </div>
  );
};

const StatCard = ({ number, label, suffix = "", trend }: { number: string; label: string; suffix?: string; trend?: string }) => (
  <div className="text-center p-6 rounded-[var(--radius-2xl)] bg-white/50 border border-[var(--border-light)] hover:bg-white hover:shadow-lg transition-all">
    <div className="text-4xl lg:text-5xl font-bold text-[var(--color-primary-600)] mb-2">{number}<span className="text-2xl lg:text-3xl">{suffix}</span></div>
    <div className="text-sm text-[var(--text-secondary)] font-medium mb-1">{label}</div>
    {trend && <div className="text-xs text-[var(--color-success-600)] font-semibold">{trend}</div>}
  </div>
);

const EnterpriseFeatureCard = ({ icon: Icon, title, description, features, index }: { icon: any; title: string; description: string; features: string[]; index: number }) => (
  <GlassCard className="p-8 group h-full" hover={true}>
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-secondary-200)] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <FeatureIcon icon={Icon} gradient={true} />
        <span className="text-6xl font-bold text-[var(--color-primary-100)]">0{index + 1}</span>
      </div>
      
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--color-primary-600)] transition-colors">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{description}</p>
      
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[var(--color-success-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[var(--color-success-600)]" />
            </div>
            <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </GlassCard>
);

const LogoMarquee = ({ logos, direction = "left" }: { logos: string[]; direction?: "left" | "right" }) => (
  <div className="relative overflow-hidden py-8">
    <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10`} />
    <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10`} />
    
    <div className={`flex gap-16 ${direction === "left" ? 'animate-scroll' : 'animate-scroll-reverse'}`}>
      {[...Array(2)].map((_, setIdx) => (
        <div key={setIdx} className="flex gap-16 flex-shrink-0 items-center">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center h-12 px-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <span className="text-2xl font-bold text-[var(--text-tertiary)]">{logo}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const TrustBadge = ({ icon: Icon, title, value }: { icon: any; title: string; value: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-[var(--radius-xl)] bg-white/50 border border-[var(--border-light)]">
    <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center">
      <Icon className="w-6 h-6 text-[var(--color-primary-600)]" />
    </div>
    <div>
      <div className="text-2xl font-bold text-[var(--text-primary)]">{value}</div>
      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{title}</div>
    </div>
  </div>
);

const ComparisonRow = ({ feature, competitors, us }: { feature: string; competitors: string; us: string }) => (
  <div className="grid grid-cols-3 gap-4 p-4 rounded-[var(--radius-lg)] hover:bg-[var(--bg-secondary)] transition-colors items-center">
    <div className="font-medium text-[var(--text-primary)]">{feature}</div>
    <div className="text-[var(--text-tertiary)] text-sm">{competitors}</div>
    <div className="flex items-center gap-2 text-[var(--color-primary-600)] font-semibold">
      <Check className="w-5 h-5" />
      {us}
    </div>
  </div>
);

const SecurityFeature = ({ icon: Icon, title, certification, description }: { icon: any; title: string; certification: string; description: string }) => (
  <div className="p-6 rounded-[var(--radius-2xl)] bg-white border border-[var(--border-light)] hover:border-[var(--color-primary-300)] hover:shadow-lg transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-primary-50)] flex items-center justify-center group-hover:bg-[var(--color-primary-600)] transition-colors">
        <Icon className="w-6 h-6 text-[var(--color-primary-600)] group-hover:text-white transition-colors" />
      </div>
      <Badge variant="success" size="sm">{certification}</Badge>
    </div>
    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h4>
    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-[var(--color-success-100)] flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-[var(--color-success-600)]" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Thank You!</h3>
        <p className="text-[var(--text-secondary)]">Our enterprise team will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">First Name *</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Last Name *</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Work Email *</label>
          <input 
            type="email" 
            required
            className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Company *</label>
          <input 
            type="text" 
            required
            className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number</label>
          <input 
            type="tel" 
            className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Company Size *</label>
          <select 
            required
            className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all"
            value={formData.employees}
            onChange={(e) => setFormData({...formData, employees: e.target.value})}
          >
            <option value="">Select...</option>
            <option value="1-50">1-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1,000 employees</option>
            <option value="1001-5000">1,001-5,000 employees</option>
            <option value="5000+">5,000+ employees</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">How can we help?</label>
        <textarea 
          rows={4}
          className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none transition-all resize-none"
          placeholder="Tell us about your requirements..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] hover:shadow-xl hover:shadow-[var(--color-primary-500)]/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-xs text-[var(--text-tertiary)] text-center">
        By submitting, you agree to our Privacy Policy and Terms of Service.
      </p>
    </form>
  );
};

const EnterpriseLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const enterpriseFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 Type II, ISO 27001, and GDPR compliance. Advanced encryption, SSO, and granular permissions.",
      features: ["SOC 2 Type II Certified", "ISO 27001 Compliant", "GDPR Ready", "SSO & SAML 2.0", "Audit Logs", "Data Residency"]
    },
    {
      icon: Server,
      title: "Dedicated Infrastructure",
      description: "Single-tenant deployment options with dedicated resources, custom SLAs, and priority support channels.",
      features: ["Single-Tenant Options", "99.99% Uptime SLA", "Dedicated Support", "Custom Deployment", "Private Cloud", "Edge Computing"]
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Multi-region deployment with automatic failover, CDN integration, and compliance with local data regulations.",
      features: ["Multi-Region", "Auto Failover", "Global CDN", "Local Compliance", "Edge Locations", "Load Balancing"]
    },
    {
      icon: Cpu,
      title: "Advanced Integrations",
      description: "Connect with your existing enterprise stack. Custom API development, webhooks, and legacy system integration.",
      features: ["Custom APIs", "Legacy Integration", "ERP Connectors", "Webhook Management", "Data Sync", "Middleware"]
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Advanced analytics, custom reporting, and predictive insights powered by machine learning.",
      features: ["Custom Dashboards", "Predictive Analytics", "ML Insights", "Data Warehousing", "Real-time Reports", "Export Tools"]
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Advanced user management, role-based access control, and organizational hierarchy support.",
      features: ["RBAC", "Org Hierarchy", "Team Analytics", "Approval Workflows", "Department Views", "Custom Roles"]
    }
  ];

  const stats = [
    { number: "99.99", label: "Uptime SLA", suffix: "%", trend: "Guaranteed" },
    { number: "50", label: "Global Regions", suffix: "+", trend: "Edge Network" },
    { number: "10", label: "Enterprise Clients", suffix: "K+", trend: "Trusted" },
    { number: "24/7", label: "Dedicated Support", suffix: "", trend: "Always On" }
  ];

  const trustBadges = [
    { icon: Shield, title: "Security", value: "SOC 2" },
    { icon: Lock, title: "Encryption", value: "AES-256" },
    { icon: Globe, title: "Compliance", value: "GDPR" },
    { icon: Award, title: "Certified", value: "ISO 27001" }
  ];

  const comparisonFeatures = [
    { feature: "Deployment", competitors: "Shared Cloud Only", us: "Dedicated & Private Cloud" },
    { feature: "Support", competitors: "Business Hours", us: "24/7 Dedicated Team" },
    { feature: "SLA", competitors: "99.9%", us: "99.99% with Credits" },
    { feature: "Customization", competitors: "Limited", us: "Fully Customizable" },
    { feature: "Integration", competitors: "Standard APIs", us: "Custom Development" },
    { feature: "Data Residency", competitors: "US Only", us: "Global Regions" }
  ];

  const securityFeatures = [
    { icon: Lock, title: "End-to-End Encryption", certification: "AES-256", description: "All data encrypted in transit and at rest with industry-leading standards." },
    { icon: Shield, title: "Access Control", certification: "SSO", description: "Enterprise-grade identity management with SAML 2.0, OIDC, and MFA." },
    { icon: Database, title: "Data Privacy", certification: "GDPR", description: "Full compliance with global privacy regulations including GDPR and CCPA." },
    { icon: Server, title: "Infrastructure", certification: "SOC 2", description: "Regular third-party audits and continuous security monitoring." }
  ];

  const tabs = [
    { title: "Financial Services", content: "Banking-grade security and compliance for financial institutions. Real-time fraud detection and regulatory reporting." },
    { title: "Healthcare", content: "HIPAA-compliant infrastructure with patient data protection. Integration with EHR systems and secure messaging." },
    { title: "Manufacturing", content: "Supply chain optimization and IoT integration. Predictive maintenance and quality control automation." },
    { title: "Retail", content: "Omnichannel customer experience management. Inventory synchronization and personalized marketing at scale." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)]">
      <Head>
        <title>Enterprise CRM Solutions | Scale with Confidence | YourCRM</title>
        <meta name="description" content="Enterprise-grade CRM solutions with dedicated infrastructure, advanced security, and 24/7 support. Scale your business with confidence. SOC 2 Type II certified." />
        <meta name="keywords" content="enterprise crm, scalable crm, dedicated infrastructure, SOC 2, enterprise security, custom integration" />
        <meta property="og:title" content="Enterprise CRM Solutions | Scale with Confidence" />
        <meta property="og:description" content="Enterprise-grade CRM with dedicated infrastructure and 99.99% SLA." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-secondary-50)]" />
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[var(--color-primary-200)] to-transparent rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[var(--color-secondary-200)] to-transparent rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/4" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-semibold text-sm mb-6 border border-[var(--color-primary-200)]">
                <Sparkles className="w-4 h-4" />
                Enterprise-Grade Solutions
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold   leading-[1.1] mb-6">
                Scale With <br />
                <GradientText>Confidence</GradientText>
              </h1>
              
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl">
                Enterprise CRM infrastructure built for global scale. Dedicated resources, advanced security, and 24/7 white-glove support for organizations that demand excellence.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="#contact" className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[var(--color-primary-500)]/30 transition-all hover:-translate-y-1 flex items-center gap-2">
                  Talk to Sales
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 bg-white text-[var(--text-primary)] font-bold rounded-full border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)] transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                {trustBadges.map((badge, idx) => (
                  <TrustBadge key={idx} {...badge} />
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <GlassCard className="p-8 relative z-10" hover={false}>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Enterprise Suite
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] bg-[var(--bg-secondary)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Enterprise Plan</div>
                        <div className="text-sm text-[var(--text-tertiary)]">Dedicated Infrastructure</div>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
                      <div className="text-2xl font-bold text-[var(--color-primary-600)]">99.99%</div>
                      <div className="text-xs text-[var(--text-secondary)]">Uptime SLA</div>
                    </div>
                    <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-secondary-50)] border border-[var(--color-secondary-200)]">
                      <div className="text-2xl font-bold text-[var(--color-secondary-600)]">24/7</div>
                      <div className="text-xs text-[var(--text-secondary)]">Support</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {["Unlimited Users", "Custom Integration", "Dedicated Manager", "Priority Support"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-[var(--color-success-500)]" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 rounded-[var(--radius-xl)] bg-[var(--bg-dark)] text-white font-semibold hover:bg-[var(--color-neutral-800)] transition-colors">
                    View Full Features
                  </button>
                </div>
              </GlassCard>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-[var(--radius-2xl)] p-4 shadow-xl border border-[var(--border-light)] z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[var(--color-success-600)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">SOC 2 Certified</div>
                    <div className="text-xs text-[var(--text-tertiary)]">Type II Compliant</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-[var(--radius-2xl)] p-4 shadow-xl border border-[var(--border-light)] z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Global CDN</div>
                    <div className="text-xs text-[var(--text-tertiary)]">50+ Regions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--bg-secondary)] border-y border-[var(--border-light)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="py-12 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-center text-[var(--text-tertiary)] font-medium uppercase tracking-wider text-sm">Trusted by Industry Leaders</p>
        </div>
        <LogoMarquee logos={["Fortune 500", "TechCorp", "GlobalBank", "HealthPlus", "RetailMax", "ManufacturePro", "CloudNine", "DataFlow"]} />
      </section>

      {/* Enterprise Features Grid */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary">Enterprise Capabilities</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--color-primary-700)]">
              Built for Scale, <br /><span className="text-[var(--color-primary-600)]">Designed for Security</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              Comprehensive enterprise features that empower your organization to operate at peak efficiency while maintaining the highest security standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, idx) => (
              <EnterpriseFeatureCard key={idx} {...feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-primary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-secondary-500)] rounded-full blur-3xl opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="dark" size="lg">Security First</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 ">
                Enterprise-Grade <br />
                <span className="text-[var(--color-primary-300)]">Security & Compliance</span>
              </h2>
              <p className="text-xl text-[var(--color-primary-100)] mb-8 leading-relaxed">
                Your data security is our top priority. We maintain the highest standards of compliance and employ defense-in-depth security strategies.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "SOC 2 Type II", desc: "Certified" },
                  { label: "ISO 27001", desc: "Compliant" },
                  { label: "GDPR", desc: "Ready" },
                  { label: "HIPAA", desc: "Available" }
                ].map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-[var(--radius-xl)] bg-white/10 backdrop-blur-sm border border-white/20">
                    <Check className="w-5 h-5 text-[var(--color-success-400)]" />
                    <div>
                      <div className="font-semibold">{cert.label}</div>
                      <div className="text-xs text-[var(--color-primary-200)]">{cert.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, idx) => (
                <SecurityFeature key={idx} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Tabs */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-700)]">Industry Solutions</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              Tailored enterprise solutions designed for the unique challenges of your industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-2">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-[var(--radius-2xl)] transition-all ${
                    activeTab === idx 
                      ? 'bg-white shadow-lg border-l-4 border-[var(--color-primary-600)]' 
                      : 'hover:bg-white/50'
                  }`}
                >
                  <div className="font-bold text-lg mb-1">{tab.title}</div>
                  <div className={`text-sm ${activeTab === idx ? 'text-[var(--text-secondary)]' : 'text-[var(--text-tertiary)]'}`}>
                    Click to explore solutions
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8">
              <GlassCard className="p-8 h-full" hover={false}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{tabs[activeTab].title}</h3>
                    <p className="text-[var(--text-secondary)]">Enterprise Solution</p>
                  </div>
                </div>
                
                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  {tabs[activeTab].content}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {["Custom Implementation", "Dedicated Support", "Compliance Ready", "Scalable Architecture"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-[var(--radius-xl)] bg-[var(--bg-secondary)]">
                      <Check className="w-5 h-5 text-[var(--color-primary-600)]" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 px-6 py-3 bg-[var(--color-primary-600)] text-white font-semibold rounded-[var(--radius-xl)] hover:bg-[var(--color-primary-700)] transition-colors">
                  Learn More
                </button>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-700)]">Why Enterprises Choose Us</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              See how our enterprise offering compares to standard solutions.
            </p>
          </div>

          <div className="bg-white rounded-[var(--radius-3xl)] shadow-xl border border-[var(--border-light)] overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 bg-[var(--bg-secondary)] border-b border-[var(--border-light)] font-bold">
              <div>Feature</div>
              <div className="text-[var(--text-tertiary)]">Others</div>
              <div className="text-[var(--color-primary-600)]">YourCRM Enterprise</div>
            </div>
            <div className="p-2">
              {comparisonFeatures.map((item, idx) => (
                <ComparisonRow key={idx} {...item} />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--text-secondary)] mb-4">Ready to experience the difference?</p>
            <Link href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-full hover:shadow-xl transition-all hover:-translate-y-1">
              Schedule a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-primary-700)]">Implementation Process</h2>
            <p className="text-xl text-[var(--text-secondary)]">
              White-glove onboarding and implementation tailored to your enterprise needs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Requirements gathering and solution design", icon: Target },
              { step: "02", title: "Setup", desc: "Infrastructure provisioning and configuration", icon: Settings },
              { step: "03", title: "Integration", desc: "System connections and data migration", icon: Layers },
              { step: "04", title: "Launch", desc: "Go-live support and team training", icon: Rocket }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <GlassCard className="p-6 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </GlassCard>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-8 h-8 text-[var(--color-primary-300)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Badge variant="primary">Contact Sales</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Let's Discuss Your <br />
                <GradientText>Enterprise Needs</GradientText>
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8">
                Speak with our enterprise team to design a custom solution for your organization.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-[var(--text-secondary)]">+1 (800) 555-ENTERPRISE</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-[var(--text-secondary)]">enterprise@yourcrm.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-primary-100)] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="font-semibold">Visit Us</div>
                    <div className="text-[var(--text-secondary)]">Global offices in 15+ countries</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[var(--radius-2xl)] bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Dedicated Enterprise Team</div>
                    <div className="text-sm text-[var(--text-secondary)]">Average response time: 15 minutes</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <GlassCard className="p-8" hover={false}>
                <h3 className="text-2xl font-bold mb-6">Request Consultation</h3>
                <ContactForm />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-700)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 ">
            Ready to Scale?
          </h2>
          <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
            Join thousands of enterprise organizations that trust YourCRM for their mission-critical operations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#contact" className="px-8 py-4 bg-white text-[var(--color-primary-600)] font-bold rounded-full hover:shadow-xl transition-all hover:-translate-y-1">
              Contact Sales
            </Link>
            <button className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 transition-all">
              View Documentation
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[var(--color-primary-100)]">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Free consultation
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Custom quote
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              No commitment
            </div>
          </div>
        </div>
      </section>

      {/* Additional CSS for animations */}
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EnterpriseLanding;