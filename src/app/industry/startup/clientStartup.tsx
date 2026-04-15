"use client"
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  TrendingUp, 
  Rocket, 
  Target, 
  Zap, 
  Shield, 
  Check, 
  ChevronRight, 
  Star,
  ArrowRight,
  Play,
  Sparkles,
  BarChart3,
  Globe,
  Clock,
  Users,
  Home,
  Building2,
  MapPin,
  Calculator,
  X,
  Menu,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Calendar,
  MessageSquare,
  DollarSign,
  Percent,
  Award,
  Crown,
  Lightbulb,
  Settings,
  HeartHandshake
} from 'lucide-react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

// Animation hook for scroll reveals
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Reusable Components
const GlassCard = ({ children, className = "", hover = true, dark = false }: { children: React.ReactNode; className?: string; hover?: boolean; dark?: boolean }) => (
  <div className={`relative overflow-hidden rounded-[var(--radius-2xl)] backdrop-blur-xl border transition-all duration-[var(--duration-normal)] ${
    dark 
      ? 'bg-[var(--color-neutral-800)]/90 border-[var(--color-neutral-700)] text-white' 
      : 'bg-white/90 border-[var(--border-light)] shadow-lg'
  } ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:border-[var(--color-primary-300)]' : ''} ${className}`}>
    {children}
  </div>
);

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const Badge = ({ children, variant = "primary", size = "md", glow = false }: { children: React.ReactNode; variant?: "primary" | "secondary" | "success" | "warning" | "dark"; size?: "sm" | "md" | "lg"; glow?: boolean }) => {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-6 py-2 text-base"
  };
  
  const variants = {
    primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] border-[var(--color-primary-200)]",
    secondary: "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] border-[var(--color-secondary-200)]",
    success: "bg-[var(--color-success-100)] text-[var(--color-success-700)] border-[var(--color-success-200)]",
    warning: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)] border-[var(--color-warning-200)]",
    dark: "bg-[var(--color-neutral-800)] text-white border-[var(--color-neutral-700)]"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-bold border ${sizes[size]} ${variants[variant]} ${glow ? 'shadow-lg shadow-[var(--color-primary-500)]/20' : ''}`}>
      {children}
    </span>
  );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const ProblemCard = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => (
  <GlassCard className="p-6 group relative overflow-hidden" hover={true}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-error-100)] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-error-100)] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-[var(--color-error-600)]" />
        </div>
        <div className="w-8 h-8 rounded-full bg-[var(--color-error-50)] flex items-center justify-center text-[var(--color-error-600)] font-bold text-sm">
          0{index + 1}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-error-600)] transition-colors">{title}</h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
    </div>
  </GlassCard>
);

const SystemCard = ({ icon: Icon, title, description, step }: { icon: any; title: string; description: string; step: number }) => (
  <div className="relative group">
    {step < 5 && (
      <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[var(--color-primary-300)] to-[var(--color-secondary-300)] z-0" />
    )}
    <GlassCard className="p-6 h-full relative z-10" hover={true}>
      <div className=" absolute top-3 left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white flex items-center justify-center font-bold text-sm shadow-lg ">
        {step}
      </div>
      <div className="w-14 h-14 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-[var(--color-primary-600)]" />
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </GlassCard>
  </div>
);

const TestimonialCard = ({ quote, author, role, location, rating, revenue }: { quote: string; author: string; role: string; location: string; rating: number; revenue?: string }) => (
  <GlassCard className="p-6 h-full flex flex-col" hover={true}>
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'text-[var(--border-medium)]'}`} />
      ))}
    </div>
    {revenue && (
      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] text-xs font-bold mb-4 w-fit">
        <TrendingUp className="w-3 h-3" />
        {revenue}
      </div>
    )}
    <p className="text-[var(--text-secondary)] mb-6 flex-1 leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-light)]">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] flex items-center justify-center text-white font-bold">
        {author.charAt(0)}
      </div>
      <div>
        <div className="font-bold text-sm text-[var(--text-primary)]">{author}</div>
        <div className="text-xs text-[var(--text-tertiary)]">{role} • {location}</div>
      </div>
    </div>
  </GlassCard>
);

const ComparisonRow = ({ feature, diy, withUs, highlight = false }: { feature: string; diy: string; withUs: string; highlight?: boolean }) => (
  <div className={`grid grid-cols-3 gap-4 p-4 rounded-[var(--radius-xl)] items-center ${highlight ? 'bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]' : 'hover:bg-[var(--bg-secondary)]'} transition-colors`}>
    <div className="font-semibold text-[var(--text-primary)] text-sm">{feature}</div>
    <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-sm">
      <X className="w-4 h-4 text-[var(--color-error-500)]" />
      {diy}
    </div>
    <div className="flex items-center gap-2 text-[var(--color-primary-700)] font-semibold text-sm">
      <Check className="w-4 h-4 text-[var(--color-success-500)]" />
      {withUs}
    </div>
  </div>
);

const TrustBadge = ({ icon: Icon, title, value }: { icon: any; title: string; value: string }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-xl)] bg-white/50 border border-[var(--border-light)]">
    <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center">
      <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
    </div>
    <div>
      <div className="text-lg font-bold text-[var(--text-primary)] leading-none">{value}</div>
      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{title}</div>
    </div>
  </div>
);

// Revenue Calculator Component
const RevenueCalculator = () => {
  const [city, setCity] = useState('mumbai');
  const [propertyType, setPropertyType] = useState('apartment');
  const [nightlyRate, setNightlyRate] = useState(3500);
  const [showResults, setShowResults] = useState(false);

  const cities: Record<string, { occupancy: number; multiplier: number }> = {
    mumbai: { occupancy: 72, multiplier: 1.2 },
    delhi: { occupancy: 68, multiplier: 1.0 },
    bangalore: { occupancy: 75, multiplier: 1.1 },
    goa: { occupancy: 65, multiplier: 1.3 },
    hyderabad: { occupancy: 70, multiplier: 0.9 }
  };

  const propertyMultipliers: Record<string, number> = {
    apartment: 1.0,
    villa: 1.4,
    studio: 0.8,
    penthouse: 1.6
  };

  const calculateRevenue = () => {
    const cityData = cities[city];
    const propMult = propertyMultipliers[propertyType];
    const monthlyNights = 30 * (cityData.occupancy / 100);
    const baseRevenue = nightlyRate * monthlyNights * propMult * cityData.multiplier;
    const withOptimization = baseRevenue * 1.32; // +32% with our system
    
    return {
      base: Math.round(baseRevenue),
      optimized: Math.round(withOptimization),
      occupancy: cityData.occupancy,
      growth: Math.round((withOptimization - baseRevenue) / baseRevenue * 100)
    };
  };

  const results = calculateRevenue();

  return (
    <GlassCard className="p-8 max-w-4xl mx-auto" hover={false}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Select City</label>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-medium)] bg-white focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none"
            >
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi NCR</option>
              <option value="bangalore">Bangalore</option>
              <option value="goa">Goa</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Property Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'apartment', label: 'Apartment', icon: Building2 },
                { value: 'villa', label: 'Villa', icon: Home },
                { value: 'studio', label: 'Studio', icon: MapPin },
                { value: 'penthouse', label: 'Penthouse', icon: Crown }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setPropertyType(type.value)}
                  className={`flex items-center gap-2 p-3 rounded-[var(--radius-lg)] border transition-all ${
                    propertyType === type.value 
                      ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]' 
                      : 'border-[var(--border-medium)] hover:border-[var(--color-primary-300)]'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
              Expected Nightly Rate (₹)
            </label>
            <input 
              type="range" 
              min="1500" 
              max="15000" 
              step="500"
              value={nightlyRate}
              onChange={(e) => setNightlyRate(Number(e.target.value))}
              className="w-full mb-2 accent-[var(--color-primary-600)]"
            />
            <div className="flex justify-between text-sm text-[var(--text-tertiary)]">
              <span>₹1,500</span>
              <span className="text-[var(--color-primary-600)] font-bold text-lg">₹{nightlyRate.toLocaleString()}</span>
              <span>₹15,000</span>
            </div>
          </div>

          <button 
            onClick={() => setShowResults(true)}
            className="w-full py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-[var(--radius-xl)] hover:shadow-xl hover:shadow-[var(--color-primary-500)]/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Revenue Potential
          </button>
        </div>

        <div className={`transition-all duration-500 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
          <div className="bg-[var(--bg-secondary)] rounded-[var(--radius-2xl)] p-6 h-full">
            <h4 className="font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--color-primary-600)]" />
              Revenue Projection
            </h4>

            <div className="space-y-6">
              <div className="p-4 rounded-[var(--radius-xl)] bg-white border border-[var(--border-light)]">
                <div className="text-sm text-[var(--text-tertiary)] mb-1">Without Optimization</div>
                <div className="text-3xl font-bold text-[var(--text-secondary)]">₹{results.base.toLocaleString()}</div>
                <div className="text-xs text-[var(--text-tertiary)] mt-1">{results.occupancy}% avg occupancy</div>
              </div>

              <div className="p-4 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] border border-[var(--color-primary-200)] relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge variant="success" size="sm">+{results.growth}%</Badge>
                </div>
                <div className="text-sm text-[var(--color-primary-700)] font-semibold mb-1">With Our Growth System</div>
                <div className="text-4xl font-bold text-[var(--color-primary-600)]">₹{results.optimized.toLocaleString()}</div>
                <div className="text-xs text-[var(--color-primary-600)] mt-1">Projected monthly revenue</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-[var(--radius-lg)] bg-white">
                  <div className="text-lg font-bold text-[var(--color-primary-600)]">{results.occupancy + 15}%</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Target Occupancy</div>
                </div>
                <div className="text-center p-3 rounded-[var(--radius-lg)] bg-white">
                  <div className="text-lg font-bold text-[var(--color-primary-600)]">₹{(results.optimized / 30).toFixed(0)}K</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Daily Avg</div>
                </div>
                <div className="text-center p-3 rounded-[var(--radius-lg)] bg-white">
                  <div className="text-lg font-bold text-[var(--color-success-600)]">6 mo</div>
                  <div className="text-xs text-[var(--text-tertiary)]">To Full Scale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// Main Page Component
const StartupLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const problems = [
    {
      icon: TrendingDown,
      title: "Poor Pricing Strategy",
      description: "Most hosts guess their pricing, leaving 20-40% revenue on the table. Without dynamic pricing, you're either too expensive (empty calendar) or too cheap (lost profit)."
    },
    {
      icon: AlertCircle,
      title: "Low Visibility Listings",
      description: "Airbnb's algorithm favors optimized listings. New hosts start invisible. Without professional photos, SEO-optimized titles, and strategic positioning, you get buried on page 5."
    },
    {
      icon: MessageSquare,
      title: "No Guest Automation",
      description: "Manual messaging kills your response time rating. Late replies = lower search ranking = fewer bookings. You can't be available 24/7, but guests expect instant answers."
    },
    {
      icon: Calendar,
      title: "Inconsistent Occupancy",
      description: "The feast-or-famine cycle: fully booked weekends, empty weekdays. Without revenue management, you average 45% occupancy when you should hit 75%+."
    }
  ];

  const systemSteps = [
    {
      icon: Target,
      title: "Market Intelligence Analysis",
      description: "We analyze 50+ data points in your area: competitor pricing, demand patterns, seasonality, and local events to identify your revenue opportunity."
    },
    {
      icon: Lightbulb,
      title: "Revenue Projection Blueprint",
      description: "Get a custom 12-month revenue forecast with specific pricing strategies, occupancy targets, and milestone checkpoints for your property."
    },
    {
      icon: Settings,
      title: "Professional Setup & Optimization",
      description: "We craft high-converting listings: professional photography, SEO-optimized titles, strategic descriptions, and amenity highlighting that ranks you higher."
    },
    {
      icon: Zap,
      title: "Dynamic Pricing & AI Automation",
      description: "Our algorithm adjusts prices 4x daily based on demand, competition, and seasonality. Plus automated guest messaging that maintains your response rate at 100%."
    },
    {
      icon: HeartHandshake,
      title: "Guest Experience Optimization",
      description: "5-star review systems, automated check-in guides, and proactive issue resolution that pushes your rating above 4.9 and gets you Superhost status fast."
    }
  ];

  const testimonials = [
    {
      quote: "I was ready to give up after 2 months of empty bookings. Within 45 days of partnering, I hit 95% occupancy and crossed ₹1.5L monthly revenue. The system just works.",
      author: "Priya Sharma",
      role: "Property Owner",
      location: "Mumbai",
      rating: 5,
      revenue: "₹0 → ₹1.5L/mo"
    },
    {
      quote: "Started with zero hospitality experience. Their launch framework had me earning from day one. Now running 3 properties profitably without the stress.",
      author: "Rahul Mehta",
      role: "IT Professional",
      location: "Bangalore",
      rating: 5,
      revenue: "3 Properties Active"
    },
    {
      quote: "The revenue calculator was spot on. Projected ₹1.2L, actually made ₹1.35L in month 3. The dynamic pricing alone pays for their service 3x over.",
      author: "Ananya Desai",
      role: "Former Banker",
      location: "Goa",
      rating: 5,
      revenue: "+32% Above Target"
    }
  ];

  const trustIndicators = [
    { icon: Shield, title: "Zero Risk", value: "No Contract" },
    { icon: Clock, title: "Fast Launch", value: "7 Days" },
    { icon: TrendingUp, title: "Avg Growth", value: "+32%" },
    { icon: Users, title: "Owners", value: "200+" }
  ];

  return (
    <div className="min-h-screen  font-sans text-[var(--text-primary)]">
      <Head>
        <title>Grow From Day One | Launch Your Property With Professional Management</title>
        <meta name="description" content="Start earning immediately with professional Airbnb & Booking.com management. Data-driven launch system for new property owners. 32% average revenue increase in 60 days." />
        <meta name="keywords" content="airbnb management, property management startup, revenue optimization, dynamic pricing, airbnb host, rental income" />
        <meta property="og:title" content="Grow From Day One | Professional Property Management" />
        <meta property="og:description" content="Launch your property with a revenue-first strategy. Trusted by 200+ property owners." />
      </Head>

      <Header />

      {/* 1️⃣ HERO SECTION */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--bg-primary)] to-[var(--color-secondary-50)]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[var(--color-primary-200)] to-transparent rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--color-secondary-200)] to-transparent rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-primary-300)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary-300)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge variant="primary" size="md" glow={true} >
                <Sparkles className="w-4 h-4 mr-1" />
                New Property Owner Program
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Grow From <br />
                <GradientText>Day One</GradientText>
              </h1>
              
              <p className="text-2xl text-[var(--text-secondary)] mb-4 font-medium">
                Launch Your Property With a Revenue-First Strategy
              </p>
              
              <p className="text-lg text-[var(--text-tertiary)] mb-8 leading-relaxed max-w-xl">
                Most hosts struggle for 3-6 months due to poor pricing, bad listing optimization, and zero automation. We eliminate the trial-and-error phase with a proven system that starts generating revenue immediately.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  href="#calculator" 
                  className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-secondary-600)] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[var(--color-primary-500)]/30 transition-all hover:-translate-y-1 flex items-center gap-2 group"
                >
                  Get Your Revenue Blueprint
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 bg-white text-[var(--text-primary)] font-bold rounded-full border-2 border-[var(--border-medium)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Book a Free Strategy Call
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                {trustIndicators.map((badge, idx) => (
                  <TrustBadge key={idx} {...badge} />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-secondary-400)] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>Trusted by <strong className="text-[var(--color-primary-600)]">200+ Property Owners</strong> across India</span>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <GlassCard className="p-8 relative z-10" hover={false}>
                <div className="absolute top-3 right-4 bg-gradient-to-r from-[var(--color-success-500)] to-[var(--color-primary-500)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  +32% Avg Revenue
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-secondary-50)] border border-[var(--color-primary-200)]">
                    <div>
                      <div className="text-sm text-[var(--text-tertiary)]">Projected Monthly Revenue</div>
                      <div className="text-3xl font-bold text-[var(--color-primary-600)]">₹1,85,000</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[var(--color-success-600)]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--bg-secondary)] text-center">
                      <div className="text-2xl font-bold text-[var(--color-primary-600)]">78%</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Target Occupancy</div>
                    </div>
                    <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--bg-secondary)] text-center">
                      <div className="text-2xl font-bold text-[var(--color-secondary-600)]">4.9★</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Target Rating</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle2, text: "Dynamic pricing activated", color: "var(--color-success-500)" },
                      { icon: CheckCircle2, text: "Professional listing optimization", color: "var(--color-success-500)" },
                      { icon: CheckCircle2, text: "24/7 automated guest messaging", color: "var(--color-success-500)" },
                      { icon: Clock, text: "Launch ready in 7 days", color: "var(--color-primary-500)" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        <span className="text-sm font-medium text-[var(--text-secondary)]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Floating Stats */}
              <div className="absolute -bottom-9 -left-6 animate-float bg-white rounded-[var(--radius-2xl)] p-4 shadow-xl border border-[var(--border-light)] z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Home className="w-5 h-5 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">New Property</div>
                    <div className="text-xs text-[var(--color-success-600)]">Ready to Launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ THE STARTUP PROBLEM SECTION */}
      <section className="py-24  relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-medium)] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="warning" size="md">The Reality Check</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Why Most Properties <span className="text-[var(--color-error-600)]">Fail</span> in the First 90 Days
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              The hospitality industry has a brutal learning curve. Without a system, you're gambling with your investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {problems.map((problem, idx) => (
              <ProblemCard key={idx} {...problem} index={idx} />
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--color-primary-300)] shadow-lg">
              <Sparkles className="w-6 h-6 text-[var(--color-primary-600)]" />
              <span className="text-lg font-bold text-[var(--text-primary)]">
                Growth is not luck. It's a <GradientText>system</GradientText>.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ DAY ONE GROWTH SYSTEM */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" size="md" glow={true}>
              <Rocket className="w-4 h-4 mr-1" />
              The Framework
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Our 5-Step <GradientText>Launch Framework</GradientText>
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              A proven methodology that transforms new properties into revenue-generating assets in record time.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 relative">
            {systemSteps.map((step, idx) => (
              <SystemCard key={idx} {...step} step={idx + 1} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <GlassCard className="inline-block p-6 max-w-2xl" hover={false}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-[var(--text-primary)]">Timeline: 7 Days to Launch</div>
                  <p className="text-[var(--text-secondary)]">
                    Day 1-2: Analysis & Setup • Day 3-5: Optimization • Day 6-7: Launch & Automation
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4️⃣ REVENUE-FOCUSED SECTION */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-secondary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-3xl opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="dark" size="lg">Revenue Engine</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6">
                Built for <span className="text-[var(--color-primary-300)]">Revenue</span>,<br />
                Not Just Bookings
              </h2>
              <p className="text-xl text-[var(--color-primary-100)] mb-8 leading-relaxed">
                Anyone can get bookings. We engineer profit. Our AI-driven revenue management system optimizes for maximum income, not just occupancy.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: BarChart3, text: "Dynamic pricing algorithms that adjust 4x daily based on demand signals" },
                  { icon: Target, text: "Competitor tracking and positioning to capture premium rates" },
                  { icon: Calendar, text: "Smart minimum stay rules that maximize revenue per booking" },
                  { icon: TrendingUp, text: "Seasonal optimization for year-round peak performance" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-[var(--radius-xl)] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                    <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-white/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[var(--color-primary-50)]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <GlassCard dark={true} className="p-8" hover={false}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-success-500)]/20 text-[var(--color-success-400)] text-sm font-bold mb-4">
                    <TrendingUp className="w-4 h-4" />
                    Proven Results
                  </div>
                  <div className="text-7xl font-bold mb-2 bg-gradient-to-r from-[var(--color-primary-300)] to-[var(--color-secondary-300)] bg-clip-text text-transparent">
                    +32%
                  </div>
                  <div className="text-xl text-[var(--color-primary-100)]">Average Revenue Increase</div>
                  <div className="text-sm text-[var(--color-primary-200)]">within first 60 days</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-[var(--radius-lg)] bg-white/5">
                    <span className="text-sm text-[var(--color-primary-200)]">Before Our System</span>
                    <span className="font-bold">₹85,000/mo avg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--color-primary-500)]/20 to-[var(--color-secondary-500)]/20 border border-[var(--color-primary-500)]/30">
                    <span className="text-sm font-semibold">After Optimization</span>
                    <span className="font-bold text-[var(--color-primary-300)]">₹1,12,200/mo avg</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-[var(--color-primary-200)] mb-2">Based on 200+ property launches</p>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ SOCIAL PROOF / TRUST SECTION */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="success" size="md">
              <Star className="w-4 h-4 mr-1" />
              Success Stories
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Real Owners, <GradientText>Real Results</GradientText>
            </h2>
          </div>

          {/* Case Studies */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <GlassCard className="p-8 relative overflow-hidden" hover={true}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-success-200)] to-[var(--color-primary-200)] rounded-full blur-3xl opacity-30" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-success-100)] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[var(--color-success-600)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-tertiary)]">Case Study</div>
                    <div className="font-bold text-lg">Mumbai Suburban Apartment</div>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[var(--color-success-600)]">₹0 → ₹1.8L</span>
                  <span className="text-[var(--text-secondary)] ml-2">monthly revenue in 3 months</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Started with zero bookings, struggling with pricing. Our dynamic pricing and listing optimization resulted in 95% occupancy and Superhost status within 60 days.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8 relative overflow-hidden" hover={true}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-secondary-200)] rounded-full blur-3xl opacity-30" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Home className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-tertiary)]">Case Study</div>
                    <div className="font-bold text-lg">Bangalore Tech Hub Studio</div>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[var(--color-primary-600)]">95%</span>
                  <span className="text-[var(--text-secondary)] ml-2">occupancy within 45 days</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Targeted corporate travelers with automated business guest workflows. Achieved 4.95★ rating and consistent weekday bookings through B2B partnerships.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>

          {/* Platform Logos */}
          <div className="text-center">
            <p className="text-sm text-[var(--text-tertiary)] uppercase tracking-wider mb-6">Integrated With Leading Platforms</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Airbnb', 'Booking.com', 'Vrbo', 'MakeMyTrip', 'Goibibo'].map((platform) => (
                <div key={platform} className="px-6 py-3 rounded-[var(--radius-xl)] bg-[var(--bg-secondary)] border border-[var(--border-light)] font-bold text-[var(--text-tertiary)] hover:opacity-100 hover:border-[var(--color-primary-300)] transition-all cursor-default">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ COMPARISON SECTION */}
      <section className="py-24 ">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Starting Alone vs <GradientText>Starting With Us</GradientText>
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              The difference between hoping for success and engineering it.
            </p>
          </div>

          <GlassCard className="p-2 overflow-hidden" hover={false}>
            <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--bg-secondary)] rounded-[var(--radius-xl)] font-bold text-sm">
              <div className="text-[var(--text-primary)]">Aspect</div>
              <div className="text-[var(--color-error-600)] text-center">Doing It Yourself</div>
              <div className="text-[var(--color-success-600)] text-center">With Our Growth Partner</div>
            </div>
            <div className="p-2 space-y-2">
              <ComparisonRow 
                feature="Launch Strategy" 
                diy="Trial & error for 3-6 months" 
                withUs="Data-driven launch from day one"
                highlight={true}
              />
              <ComparisonRow 
                feature="Guest Communication" 
                diy="Manual messaging, delayed responses" 
                withUs="100% automated, instant replies"
              />
              <ComparisonRow 
                feature="Pricing Strategy" 
                diy="Guess pricing, leave money on table" 
                withUs="AI dynamic pricing, max revenue"
                highlight={true}
              />
              <ComparisonRow 
                feature="Listing Quality" 
                diy="Basic photos, poor SEO" 
                withUs="Professional optimization"
              />
              <ComparisonRow 
                feature="Revenue Growth" 
                diy="Slow, unpredictable growth" 
                withUs="Fast, optimized, +32% avg"
                highlight={true}
              />
              <ComparisonRow 
                feature="Time Investment" 
                diy="20+ hours/week managing" 
                withUs="2 hours/week oversight"
              />
            </div>
          </GlassCard>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-700)] font-bold">
              <CheckCircle2 className="w-5 h-5" />
              200+ properties successfully launched
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ STARTUP CALCULATOR SECTION */}
      <section id="calculator" className="py-24 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="primary" size="md" glow={true}>
              <Calculator className="w-4 h-4 mr-1" />
              Revenue Calculator
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Calculate Your <GradientText>Earning Potential</GradientText>
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              See how much revenue your property could generate with our optimization system.
            </p>
          </div>

          <RevenueCalculator />
        </div>
      </section>

      {/* 8️⃣ RISK REVERSAL SECTION */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Zero Risk. <GradientText>Maximum Growth.</GradientText>
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              We've removed every barrier to entry. Start with confidence, scale without commitment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "No Long-Term Contracts", desc: "Month-to-month flexibility. Stay because you see results, not because you're trapped." },
              { icon: BarChart3, title: "Transparent Revenue Share", desc: "Clear pricing based on performance. We win when you win. No hidden fees." },
              { icon: CheckCircle2, title: "Full Performance Reporting", desc: "Weekly insights, monthly reviews, real-time dashboards. Complete visibility." },
              { icon: X, title: "Cancel Anytime", desc: "Not satisfied? Cancel with 30 days notice. No questions asked, no penalties." }
            ].map((item, idx) => (
              <GlassCard key={idx} className="p-6 text-center" hover={true}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[var(--border-light)] shadow-sm">
              <Shield className="w-5 h-5 text-[var(--color-success-500)]" />
              <span className="font-semibold text-sm">Verified Properties Only</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[var(--border-light)] shadow-sm">
              <Award className="w-5 h-5 text-[var(--color-primary-500)]" />
              <span className="font-semibold text-sm">Superhost Guarantee</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[var(--border-light)] shadow-sm">
              <Clock className="w-5 h-5 text-[var(--color-secondary-500)]" />
              <span className="font-semibold text-sm">7-Day Launch Promise</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ FINAL POWER CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-700)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-sm mb-8">
            <Rocket className="w-4 h-4" />
            Limited Spots Available This Month
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Property Deserves to <br />
            <span className="text-[var(--color-primary-200)]">Grow From Day One</span>
          </h2>

          <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
            Join 200+ property owners who skipped the struggle phase and went straight to scalable revenue. Your competition is already optimizing—don't get left behind.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              href="#calculator" 
              className="px-10 py-5 bg-white text-[var(--color-primary-600)] font-bold rounded-full hover:shadow-xl transition-all hover:-translate-y-1 text-lg flex items-center gap-2"
            >
              Launch My Property Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-10 py-5 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 transition-all text-lg">
              Book Free Strategy Call
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--color-primary-100)]">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Free consultation
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              No obligations
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              7-day launch guarantee
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartupLanding;