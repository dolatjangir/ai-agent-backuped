"use client"
import React, { useState, useEffect,useRef} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Zap, 
  Check, 
  ChevronRight, 
  Star,
  Menu,
  X,
  ArrowRight,
  Shield,
  Clock,
  BarChart3,
  Globe,
  HeadphonesIcon,
  Sparkles,
  Play,
  Image,
  ChevronDown,
  HelpCircle,
  HelpCircleIcon,
  MessageSquareCode,
  GraduationCapIcon,
  PlayCircle,
  BookA,
  Cloud,
  Database,
  PieChart,
  Target,
  Layers,
  Workflow,
  LineChart,
  Lock,
  Brain,
  Bot,
  BotIcon
} from 'lucide-react';
import Footer from '@/components/footer/footer'
import Analytics from '@/components/analytics/analytics'
import Hero from '@/components/hero/hero'
import Header from '@/components/header/header'
import Trusted from '@/components/trusted/trusted';
import Features from '@/components/features/features';
import ChartSection from '@/components/agentchart/agentchart';
import AgentShowcase from '@/components/estateai-benefits/benefits';
import TestimonialsSection from '@/components/testimonial/testimonial';
import FaqSection from '@/components/faq/faq';
import FinalCTA from '@/components/finalcta/finalcta';


interface NavItem {
  label: string;
  href: string;
  hasDropdown: boolean;
  dropdownContent?: {
    title: string;
    description: string;
    sections: {
      title: string;
      items: {
        icon: React.ReactNode;
        title: string;
        description: string;
        href: string;
        badge?: string;
      }[];
    }[];
    footer?: {
      text: string;
      link: string;
      href: string;
    };
  };
}
const navItems: NavItem[] = [
  {
    label: "Features",
    href: "#features",
    hasDropdown: true,
    dropdownContent: {
      title: "Platform Features",
      description: "Everything you need to manage customer relationships at scale",
      sections: [
        {
          title: "Core CRM",
          items: [
            {
              icon: <Users className="w-5 h-5" />,
              title: "Contact Management",
              description: "Organize and segment your customer data",
              href: "#contacts"
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Lead Scoring",
              description: "AI-powered lead qualification",
              href: "#leads",
              badge: "AI"
            },
            {
              icon: <LineChart className="w-5 h-5" />,
              title: "Sales Pipeline",
              description: "Visual deal tracking and forecasting",
              href: "#pipeline"
            }
          ]
        },
        {
          title: "Automation",
          items: [
            {
              icon: <Workflow className="w-5 h-5" />,
              title: "Workflow Automation",
              description: "Automate repetitive tasks",
              href: "#workflows"
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Smart Scheduling",
              description: "AI meeting scheduler",
              href: "#scheduling"
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Instant Actions",
              description: "Trigger-based automation",
              href: "#actions"
            }
          ]
        }
      ],
      footer: {
        text: "See all features",
        link: "Explore →",
        href: "/features"
      }
    }
  },
  {
    label: "Solutions",
    href: "#solutions",
    hasDropdown: true,
    dropdownContent: {
      title: "Solutions by Industry",
      description: "Tailored CRM solutions for every business type",
      sections: [
        {
          title: "By Industry",
          items: [
            {
              icon: <Layers className="w-5 h-5" />,
              title: "Enterprise",
              description: "Scale with confidence",
              href: "/enterprise"
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "Startups",
              description: "Grow from day one",
              href: "/startups"
            },
            {
              icon: <BarChart3 className="w-5 h-5" />,
              title: "Agencies",
              description: "Manage multiple clients",
              href: "/agencies"
            }
          ]
        },
        {
          title: "By Team",
          items: [
            {
              icon: <Users className="w-5 h-5" />,
              title: "Sales Teams",
              description: "Close more deals faster",
              href: "/sales"
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Marketing",
              description: "Align sales and marketing",
              href: "/marketing"
            },
            {
              icon: <Shield className="w-5 h-5" />,
              title: "Customer Success",
              description: "Reduce churn, increase LTV",
              href: "/success"
            }
          ]
        }
      ],
      footer: {
        text: "Not sure where to start?",
        link: "Talk to Sales →",
        href: "/contact"
      }
    }
  },
  {
    label: "Pricing",
    href: "#pricing",
    hasDropdown: true,
    dropdownContent: {
      title: "Simple Pricing",
      description: "Choose the plan that fits your business",
      sections: [
        {
          title: "Plans",
          items: [
            {
              icon: <Star className="w-5 h-5" />,
              title: "Starter",
              description: "Free for up to 3 users",
              href: "/pricing#starter",
              badge: "Free"
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Professional",
              description: "$49/user per month",
              href: "/pricing#pro"
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "Enterprise",
              description: "Custom pricing",
              href: "/pricing#enterprise"
            }
          ]
        },
        {
          title: "Compare",
          items: [
            {
              icon: <PieChart className="w-5 h-5" />,
              title: "Plan Comparison",
              description: "See all features side by side",
              href: "/compare"
            },
            {
              icon: <Database className="w-5 h-5" />,
              title: "ROI Calculator",
              description: "Calculate your return",
              href: "/roi"
            },
            {
              icon: <Cloud className="w-5 h-5" />,
              title: "Cloud vs On-prem",
              description: "Deployment options",
              href: "/deployment"
            }
          ]
        }
      ],
      footer: {
        text: "All plans include 14-day free trial",
        link: "Start Free →",
        href: "/signup"
      }
    }
  },
  {
    label: "Resources",
    href: "#resources",
    hasDropdown: true,
    dropdownContent: {
      title: "Learn & Grow",
      description: "Resources to help you succeed",
      sections: [
        {
          title: "Learn",
          items: [
            {
              icon: <BookA className="w-5 h-5" />,
              title: "Documentation",
              description: "Guides and API references",
              href: "/docs"
            },
            {
              icon: <PlayCircle className="w-5 h-5" />,
              title: "Video Tutorials",
              description: "Step-by-step walkthroughs",
              href: "/tutorials"
            },
            {
              icon: <GraduationCapIcon className="w-5 h-5" />,
              title: "CRM Academy",
              description: "Free certification courses",
              href: "/academy"
            }
          ]
        },
        {
          title: "Support",
          items: [
            {
              icon: <HelpCircleIcon className="w-5 h-5" />,
              title: "Help Center",
              description: "FAQs and troubleshooting",
              href: "/help"
            },
            {
              icon: <MessageSquareCode className="w-5 h-5" />,
              title: "Community",
              description: "Join the conversation",
              href: "/community"
            },
            {
              icon: <HeadphonesIcon className="w-5 h-5" />,
              title: "Contact Support",
              description: "24/7 expert assistance",
              href: "/support"
            }
          ]
        }
      ],
      footer: {
        text: "Need personalized help?",
        link: "Book a Demo →",
        href: "/demo"
      }
    }
  }
];

const aiBenefits = [
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: "Autonomous Learning",
    description: "AI agents that adapt to your property patterns and improve decisions without manual input.",
    gradient: "from-blue-500 to-blue-600",
    aiFeature: "Self-Improving"
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: "Instant Response",
    description: "Guest inquiries handled in under 30 seconds, 24/7, with human-like contextual understanding.",
    gradient: "from-amber-500 to-orange-600",
    aiFeature: "Real-time NLP"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    title: "Predictive Revenue",
    description: "Machine learning forecasts demand and auto-adjusts pricing for maximum occupancy.",
    gradient: "from-emerald-500 to-teal-600",
    aiFeature: "95% Accuracy"
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Risk Intelligence",
    description: "AI-powered fraud detection and guest screening protects your properties automatically.",
    gradient: "from-purple-500 to-indigo-600",
    aiFeature: "Proactive Defense"
  }
];


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
   const [email, setEmail] = useState("");
   const [openIndex, setOpenIndex] = useState(null);
     const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
     const [isVisible, setIsVisible] = useState(false);
     const timeoutRef = useRef<NodeJS.Timeout | null>(null);
      const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setActiveDropdown(null), 200);
    }, 150);
  };

  const activeItem = navItems.find(item => item.label === activeDropdown);
   const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Thank you! We will contact ${email} shortly.`);
      setEmail("");
    };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Channel Management",
      description: "Sync calendars across Airbnb, Booking.com, VRBO, and 50+ platforms instantly. No more double bookings.",
      gradient: "var(--gradient-primary)"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Automated Bookings",
      description: "Smart reservation system that handles confirmations, payments, and cancellations automatically.",
      gradient: "linear-gradient(135deg, var(--color-secondary-500) 0%, var(--color-primary-400) 100%)"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Dynamic Pricing",
      description: "AI-powered pricing engine adjusts rates based on demand, seasonality, and local events.",
      gradient: "linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-400) 100%)"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Guest Communication",
      description: "Automated messaging for check-ins, reviews, and support. Multi-language support included.",
      gradient: "linear-gradient(135deg, var(--color-secondary-400) 0%, var(--color-primary-500) 100%)"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Revenue Analytics",
      description: "Real-time dashboards tracking occupancy, revenue per room, and growth trends.",
      gradient: "linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-500) 100%)"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Staff Management",
      description: "Coordinate cleaning schedules, maintenance tasks, and team assignments seamlessly.",
      gradient: "linear-gradient(135deg, var(--color-secondary-600) 0%, var(--color-primary-600) 100%)"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect Properties",
      description: "Import your listings from Airbnb, Booking.com, or add them manually. Setup takes under 5 minutes.",
      bg: "var(--color-primary-200)"
    },
    {
      number: "02",
      title: "Automate Operations",
      description: "Set up smart rules for pricing, messaging, and task assignments. Let the system work for you.",
      bg: "var(--color-secondary-200)"
    },
    {
      number: "03",
      title: "Scale Revenue",
      description: "Watch your occupancy rise and operational costs drop with data-driven insights.",
      bg: "var(--color-primary-200)"
    }
  ];

  const benefits = [
    { icon: <TrendingUp className="w-5 h-5" />, text: "Increase occupancy by up to 40%" },
    { icon: <Clock className="w-5 h-5" />, text: "Save 20+ hours every week" },
    { icon: <Shield className="w-5 h-5" />, text: "Eliminate double bookings" },
    { icon: <HeadphonesIcon className="w-5 h-5" />, text: "24/7 dedicated support" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Boutique Hotel Owner",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      quote: "StayPilot increased our occupancy from 65% to 89% in just three months. The automated pricing alone pays for the subscription.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Airbnb Superhost",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "Managing 12 properties used to be a nightmare. Now I spend 30 minutes a day on operations instead of 6 hours.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "BnB Chain Manager",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The staff coordination features are incredible. Our cleaning and maintenance efficiency improved by 60%.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for individual hosts",
      monthlyPrice: 29,
      yearlyPrice: 24,
      features: ["Up to 3 properties", "Basic channel sync", "Automated messaging", "Standard support", "Basic analytics"],
      popular: false
    },
    {
      name: "Professional",
      description: "For growing hospitality businesses",
      monthlyPrice: 79,
      yearlyPrice: 65,
      features: ["Up to 15 properties", "Advanced channel management", "AI dynamic pricing", "Guest screening", "Priority support", "Revenue analytics", "Staff management"],
      popular: true
    },
    {
      name: "Enterprise",
      description: "For hotel chains & large portfolios",
      monthlyPrice: 199,
      yearlyPrice: 165,
      features: ["Unlimited properties", "Custom integrations", "Dedicated account manager", "API access", "White-label options", "Advanced reporting", "SLA guarantee"],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How long does it take to set up StayPilot?",
      answer: "Most hosts are fully operational within 15 minutes. Simply connect your existing Airbnb or Booking.com accounts, and we'll automatically sync your calendars, photos, and settings."
    },
    {
      question: "Can I use StayPilot with my existing PMS?",
      answer: "Absolutely. StayPilot integrates with 40+ property management systems including Opera, Cloudbeds, and Hotelogix. Our API also supports custom integrations for enterprise clients."
    },
    {
      question: "How does the dynamic pricing work?",
      answer: "Our AI analyzes local demand, competitor rates, seasonality, events, and historical data to optimize your pricing 24/7. You set the minimum and maximum bounds, we handle the rest."
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer: "No long-term contracts required. You can cancel, upgrade, or downgrade your plan at any time. We also offer a 30-day money-back guarantee for annual plans."
    },
    {
      question: "Do you offer training for my team?",
      answer: "Yes! Professional and Enterprise plans include onboarding sessions, video tutorials, and documentation. Enterprise clients receive dedicated training for their entire staff."
    },
    {
      question: "What happens if I exceed my property limit?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade instantly without losing any data or configuration. We prorate the difference so you only pay for what you use."
    }
  ];

  return (
    <div className="min-h-screen  bg-[var(--bg-secondary)] font-sans text-[var(--text-primary)] overflow-hidden">
   

      {/* Navigation */}
    <Header/>

      {/* Hero Section */}
     <Hero/>

      {/* Trusted By Section */}
      <Trusted/>
    <div className="relative w-full h-3/4">
 
      {/* analytics */}
       <div className=" z-10">
    <Analytics/>
    </div>
    </div>
    
      {/* Features Section */}
      {/* <Features/> */}
      {/* hand image section */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* right - Image */}
      <div className="flex justify-center relative after:absolute after:-bottom-10 sm:after:-bottom-14 after:left-0 after:w-1/2 after:h-1/2 after:bg-linear-to-t  after:from-white after:via-white/100 after:to-transparent after:rotate-35 sm:after:rotate-35">
        <img 
          src="/assets/hand-phone-img.png" 
          alt="LeadBot AI Mobile" 
          width={400} 
          height={500}
          className="drop-shadow-xl "
        />
      </div>

      {/* left - Content */}
      <div className="max-w-xl">
        <h2 
    className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
    style={{ color: 'var(--color-primary-900)' }}
  >
    Your AI Sales Assistant, Always With You
  </h2>
        <p 
    className="text-lg leading-relaxed mb-6"
    style={{ color: 'var(--color-primary-800)' }}
  >
   Never miss a potential buyer again. Whether you're traveling, meeting clients, or away from your desk, your AI keeps working for you — capturing leads, responding instantly, and helping you close more deals right from your phone.
  </p>
      </div>

    </div>
  </div>
</section>
 {/* this is chart section */}
 <section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
     

      {/* left - Content */}
      <div className="max-w-xl">
         <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6 shadow-lg">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
    </span>
    
    <span className="text-sm font-medium text-blue-700">Smart AI Workflow</span>
  </div>
        <h2 
    className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
    style={{ color: 'var(--color-primary-900)' }}
  >
    Don’t Lose Leads Just Because You Respond Late
  </h2>
        <p 
    className="text-lg leading-relaxed mb-6"
    style={{ color: 'var(--color-primary-800)' }}
  >
Most buyers go with the agent who replies first. Our AI responds instantly to every inquiry — anytime, day or night — answering questions, understanding needs, and even booking meetings for you before someone else does.
   </p>
   <Link href="/resources/howitworks"><button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0066cc] to-[#3399ff] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
  <span className="relative z-10">Learn More</span>
  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
  <div className="absolute inset-0 bg-gradient-to-r from-[#0057ad] to-[#0066cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</button></Link>
      </div>
 {/*right - Image */}
      <div className="flex justify-center ">
        <img 
          src="/assets/chart.png" 
          alt="LeadBot AI Mobile" 
          width={400} 
          height={500}
          className="drop-shadow-xl "
        />
      </div>
    </div>
  </div>
</section>
    {/* AI Benefits Section - EstateAi */}
<AgentShowcase/>
      {/* Testimonials */}
    <TestimonialsSection/>

      {/* Pricing Section */}
     
      {/* FAQ Section */}
 <FaqSection/>


      {/* Final CTA */}
<FinalCTA/>

 
    </div>
  );
};



export default Home;