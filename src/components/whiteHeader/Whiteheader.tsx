"use client"
import {useState,useRef,useEffect} from 'react'
import { ChevronDown,
      Sparkles,
  Play,
  Image,
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
  Users,
  Clock,
  Zap,
  BarChart3,
  Shield,
  Star,
  HeadphonesIcon,
  ArrowRight,
  Menu,
  X
 } from 'lucide-react';

import Link from 'next/link'
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
              href: "/features/contact-management"
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Lead Scoring",
              description: "AI-powered lead qualification",
              href: "/features/lead-scoring",
              badge: "AI"
            },
            {
              icon: <LineChart className="w-5 h-5" />,
              title: "Sales Pipeline",
              description: "Visual deal tracking and forecasting",
              href: "/features/sales-pipeline"
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
              href: "/features/workflow-automation"
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Smart Scheduling",
              description: "AI meeting scheduler",
              href: "/features/smart-scheduling"
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Instant Actions",
              description: "Trigger-based automation",
              href: "/features/instant-action"
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
              href: "/industry/enterprise"
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "Startups",
              description: "Grow from day one",
              href: "/industry/startup"
            },
            {
              icon: <BarChart3 className="w-5 h-5" />,
              title: "Agencies",
              description: "Manage multiple clients",
              href: "/industry/agencies"
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
              href: "/industry/sales-team"
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Marketing",
              description: "Align sales and marketing",
              href: "/industry/marketing"
            },
            {
              icon: <Shield className="w-5 h-5" />,
              title: "Customer Success",
              description: "Reduce churn, increase LTV",
              href: "/industry/customer-sucess"
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
              href: "/pricing/starter",
              badge: "Free"
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Professional",
              description: "$49/user per month",
              href: "/pricing/professional"
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: "Enterprise",
              description: "Custom pricing",
              href: "/pricing/enterprise"
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
              href: "/pricing/plan-comparison"
            },
            {
              icon: <Database className="w-5 h-5" />,
              title: "ROI Calculator",
              description: "Calculate your return",
              href: "/pricing/roi-calculator"
            },
            {
              icon: <Cloud className="w-5 h-5" />,
              title: "Cloud vs On-prem",
              description: "Deployment options",
              href: "/pricing/cloud-vs-on-prem"
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
              href: "/resources/documentation"
            },
            {
              icon: <PlayCircle className="w-5 h-5" />,
              title: "Video Tutorials",
              description: "Step-by-step walkthroughs",
              href: "/resources/video-tutorials"
            },
            {
              icon: <GraduationCapIcon className="w-5 h-5" />,
              title: "CRM Academy",
              description: "Free certification courses",
              href: "/resources/crm-academy"
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
              href: "/resources/help-center"
            },
            {
              icon: <MessageSquareCode className="w-5 h-5" />,
              title: "Community",
              description: "Join the conversation",
              href: "/resources/community"
            },
            {
              icon: <HeadphonesIcon className="w-5 h-5" />,
              title: "Contact Support",
              description: "24/7 expert assistance",
              href: "/resources/contact-support"
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
function WhiteHeader() {
     const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
     const [isVisible, setIsVisible] = useState(false);
     const [scrolled, setScrolled] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
     const timeoutRef = useRef<NodeJS.Timeout | null>(null);
          const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
     
     const toggleMobileItem = (label: string) => {
       setOpenMobileItem(prev => (prev === label ? null : label));
     };
     
     
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
        useEffect(() => {
           const handleScroll = () => setScrolled(window.scrollY > 20);
           window.addEventListener('scroll', handleScroll);
           return () => window.removeEventListener('scroll', handleScroll);
         }, []);
  return (
   <div>
  {/* Navigation */}
  <nav
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)] ${
      scrolled
        ? "bg-gradient-to-br from-[var(--color-primary-600)] via-[var(--color-secondary-700)] to-[var(--color-secondary-600)]  backdrop-blur-xl shadow-sm"
        : "bg-transparent"
    }`}
  >
    <div className="mx-auto px-[var(--space-4)] sm:px-[var(--space-2)] lg:px-[var(--space-4)]">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-[var(--space-2)]">
          <div
            className="rounded-[var(--radius-xl)] bg-[var(--gradient-primary)] flex items-center justify-center shadow-lg"
            style={{
              boxShadow: "0 10px 15px -3px var(--color-primary-600)/25",
            }}
          >
           <Link href="/">  <img width={220} height={220} src="/assets/estateai.png" /></Link>
          </div>
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
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeDropdown === item.label
                    ? "text-[var(--color-primary-600)] bg-[var(--color-primary-50)]"
                    : "text-[var(--color-secondary-100)] hover:text-[var(--color-primary-200)] hover:bg-[var(--bg-tertiary)]"
                }`}
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
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px]
                  transition-all duration-200 ease-out
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-light)] overflow-hidden">
                    {/* Header */}
                    <div className="bg-[var(--bg-secondary)] px-6 py-4 border-b border-[var(--border-light)]">
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {item.dropdownContent.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {item.dropdownContent.description}
                      </p>
                    </div>

                    {/* Content Grid */}
                    <div className="p-6 grid grid-cols-2 gap-8">
                      {item.dropdownContent.sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                            {section.title}
                          </h4>

                          <div className="space-y-1">
                            {section.items.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                href={subItem.href}
                                className="group flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center group-hover:bg-[var(--color-primary-100)] transition-colors">
                                  {subItem.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--color-primary-600)] transition-colors">
                                      {subItem.title}
                                    </span>

                                    {subItem.badge && (
                                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-1">
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
                      <div className="bg-[var(--bg-secondary)] px-6 py-3 border-t border-[var(--border-light)] flex items-center justify-between">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {item.dropdownContent.footer.text}
                        </span>

                        <Link
                          href={item.dropdownContent.footer.href}
                          className="text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] flex items-center gap-1 group"
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
          {/* phone navigation */}
        <div className="hidden md:flex items-center gap-[var(--space-4)]">
          <Link href="https://bnb.ibigdata.in/admin" target='_blank'>
          <button className="text-[var(--color-secondary-100)] hover:text-[var(--color-primary-600)] font-medium transition-colors duration-[var(--duration-fast)]">
            Log in
          </button></Link>
          <Link href="https://bnb.ibigdata.in/register" target='_blank'>
          <button
            className="px-[var(--space-6)] py-[var(--space-2)] bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-[var(--text-inverse)] font-semibold rounded-lg transition-all duration-[var(--duration-fast)] shadow-lg hover:shadow-xl"
            style={{
              boxShadow: "0 10px 15px -3px var(--color-primary-600)/25",
            }}
          >
            Start For Free Trial
          </button></Link>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>

   {isMenuOpen && (
  <div className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--border-light)] absolute w-full max-h-[80vh] overflow-y-auto">
    <div className="px-[var(--space-4)] py-[var(--space-6)] space-y-6">

      {navItems.map((item) => (
        <div key={item.label} className="space-y-3">

          {/* Section Title (Clickable) */}
          <button
            onClick={() => toggleMobileItem(item.label)}
            className="w-full flex justify-between items-center text-sm font-semibold text-[var(--text-primary)]"
          >
            {item.label}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openMobileItem === item.label ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Content */}
          {openMobileItem === item.label && (
            <>
              {item.dropdownContent?.sections.map((section, idx) => (
                <div key={idx} className="space-y-2">

                  <div className="text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
                    {section.title}
                  </div>

                  {section.items.map((subItem, subIdx) => (
                    <Link
                      key={subIdx}
                      href={subItem.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center">
                        {subItem.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--text-primary)]">
                            {subItem.title}
                          </span>

                          {subItem.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full">
                              {subItem.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[var(--text-tertiary)]">
                          {subItem.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      ))}

      <hr className="border-[var(--border-light)]" />

      {/* Auth Buttons */}
      <Link href="https://bnb.ibigdata.in/admin" target='_blank'>
      <button className="w-full py-[var(--space-3)] text-[var(--text-secondary)] font-medium">
        Log in
      </button></Link>
      <Link href="https://bnb.ibigdata.in/register" target='_blank'>
      <button className="w-full py-[var(--space-3)] bg-[var(--color-primary-600)] text-[var(--text-inverse)] font-semibold rounded-[var(--radius-xl)]">
        Start Free Trial
      </button></Link>
    </div>
  </div>
)}

  </nav>
</div>

  )
}

export default WhiteHeader
