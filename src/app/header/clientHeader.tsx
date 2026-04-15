"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  Zap, 
  Workflow, 
  BarChart3, 
  Shield, 
  Users, 
  Layers,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  LineChart,
  PieChart,
  Settings,
  Database,
  Cloud,
  Lock,
  Star,
  HelpCircleIcon,
  MessageSquareCode,
  HeadphonesIcon,
  GraduationCapIcon,
  PlayCircle,
  BookA
} from "lucide-react";

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

// Additional icons needed
const Book = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GraduationCap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const HelpCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const Headphones = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

export default function Header() {
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">i</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ibigdata
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`
                    flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeDropdown === item.label 
                      ? "text-blue-600 bg-blue-50/50" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`} 
                    />
                  )}
                </button>

                {/* Mega Menu Dropdown */}
                {activeDropdown === item.label && item.dropdownContent && (
                  <div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px]
                      transition-all duration-200 ease-out
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                    `}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.dropdownContent.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.dropdownContent.description}
                        </p>
                      </div>

                      {/* Content Grid */}
                      <div className="p-6 grid grid-cols-2 gap-8">
                        {item.dropdownContent.sections.map((section, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              {section.title}
                            </h4>
                            <div className="space-y-1">
                              {section.items.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={subItem.href}
                                  className="group flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    {subItem.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {subItem.title}
                                      </span>
                                      {subItem.badge && (
                                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-full">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      {item.dropdownContent.footer && (
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {item.dropdownContent.footer.text}
                          </span>
                          <Link
                            href={item.dropdownContent.footer.href}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                          >
                            {item.dropdownContent.footer.link}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay for mobile or when dropdown is active */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-sm -z-10 transition-opacity duration-200"
          onClick={() => {
            setIsVisible(false);
            setActiveDropdown(null);
          }}
        />
      )}
    </header>
  );
}