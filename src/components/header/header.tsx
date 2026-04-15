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
    label: "Ai Agents",
    href: "#ai-agents",
    hasDropdown: true,
    dropdownContent: {
     title: "Platform Ai Agents",
      description: "Everything you need to manage Ai Agents at scale",
      sections: [
        {
          title: "Automation",
          items: [
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-1_nz99v7.png" className="max-w-16 max-h-16" />,
              title: "Ai Lead Qualification Agent",
              description: "Organize and segment your customer Qualification",
              href: "/ai-agents/lead-qualifiction-agent"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-2_l1xdll.png" className="max-w-16 max-h-16" />,
              title: "Ai Property Matching Agent",
              description: "AI-powered lead qualification",
              href: "/ai-agents/property-maching-agent",
              badge: "AI"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335520/img-3_scja92.png" className="max-w-16 max-h-16" />,
              title: "Lead Capture Agent",
              description: "Ai Lead Capture tracking and forecasting",
              href: "/ai-agents/lead-capture-agent"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-4_damgxf.png" className="max-w-16 max-h-16" />,
              title: "Ai Content Creation Agent",
              description: "Content Creation  tracking and forecasting",
              href: "/ai-agents/content-creation-agent"
            },
             {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-555_kabvyd.png" className="max-w-16 max-h-16" />,
              title: "Ai  Follow-Up Agent",
              description: "AI-powered lead qualification",
              href: "/ai-agents/follow-up-agent",
              badge: "AI"
            },
          ]
        },
        {
          title: "Automation",
          items: [
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/img-6_mky5rb.png" className="max-w-16 max-h-16" />,
              title: "Ai Calling Agent",
              description: "Automate Calling tasks",
              href: "/ai-agents/calling-agent"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335523/img-7_xjwzbl.png" className="max-w-16 max-h-16" />,
              title: "Ai Campaign Automation Agent",
              description: "AI meeting scheduler",
              href: "/ai-agents/campaign-automation"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335552/img-8_twulvb.png" className="max-w-16 max-h-16" />,
              title: "Data Mining Agent",
              description: "Data Mining  automation",
              href: "/ai-agents/data-mining-agent"
            },
             {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-9_i1wlut.png" className="max-w-16 max-h-16" />,
              title: "Social Media Agent",
              description: "Social Media automation",
              href: "/ai-agents/social-media-agent"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335553/img-10_ajsusz.png" className="max-w-16 max-h-16 rounded-xl" />,
              title: "Ai SEO Content Agent",
              description: "SEO Content scheduler",
              href: "/ai-agents/seo-content-agent"
            },
          ]
        }
      ],
      footer: {
        text: "See all features",
        link: "Explore →",
        href: "/explore-ai-agent"
      }
    }
  },
  {
    label: "Features",
    href: "#features",
    hasDropdown: true,
    dropdownContent: {
      title: "Platform Features",
      description: "Everything you need to manage customer relationships at scale",
      sections: [
        {
          title: "Automation feature",
          items: [
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335511/feature-ai-auto-robo_ze335e.png" className="max-w-10 max-h-10" />,
              title: "AI Automation",
              description: "your core (agents power)",
              href: "/features/ai-automation"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335566/lead-management-icon_v2yheh.png" className="max-w-10 max-h-10" />,
              title: "Lead Management",
              description: "AI-powered real estate main value",
              href: "/features/smart-lead",
              badge: "AI"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335575/property-icon_cyrnaf.png" className="max-w-10 max-h-10" />,
              title: "Property Intelligence",
              description: "Visual deal Property Intelligence",
              href: "/features/property-ai"
            }
          ]
        },
        {
          title: "   .",
          items: [
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335571/marketing-icon_hsbqzs.png" className="max-w-10 max-h-10" />,
              title: "Marketing Automation",
              description: "Automate growth",
              href: "/features/growth-automation"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335598/smart-icon_s79g76.png" className="max-w-10 max-h-10" />,
              title: "Smart Communication",
              description: "AI calls, chats, follow-ups",
              href: "/features/Conversational-ai"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335510/analtics-icon_pbc1mb.png" className="max-w-10 max-h-10" />,
              title: "Analytics & Insights",
              description: "data + decisions automation",
              href: "/features/Performance-analytics"
            }
          ]
        }
      ],
      footer: {
        text: "See all features",
        link: "Explore →",
        href: "/explore-feature"
      }
    }
  },
 {
  label: "Solutions",
  href: "#solutions",
  hasDropdown: true,
  dropdownContent: {
    title: "AI-Powered Solutions",
    description: "End-to-end automation systems built with intelligent AI agents",
    sections: [
      {
        title: "Core Solutions",
        items: [
          {
            icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335511/data-mining-icon_duckos.png" className="max-w-10 max-h-10" />,
            title: "Data Mining",
            description: "Extract and organize high-quality leads automatically",
            href: "/solutions/data-mining"
          },
          {
            icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335515/funnal-icon_arbhbv.png" className="max-w-10 max-h-10" />,
            title: "Lead Funnel Automation",
            description: "Capture, qualify, and convert leads on autopilot",
            href: "/solutions/lead-funnal"
          },
          {
            icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335513/campaign-auto-solution-icon_ke7mcm.png" className="max-w-10 max-h-10" />,
            title: "Campaign Automation",
            description: "Launch and optimize marketing campaigns with AI",
            href: "/solutions/campaign-running"
          }
        ]
      },
      {
        title: "Growth & Engagement",
        items: [
          {
            icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/customer-engage-icon_vafyry.png" className="max-w-10 max-h-10" />,
            title: "Customer Engagement Solutions",
            description: "Automate conversations across chat, calls, and social",
            href: "/solutions/ai-customer-engagement-solution"
          },
          {
            icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335514/follow-up-icon_gyzki7.png" className="max-w-10 max-h-10" />,
            title: "Lead Follow-Up",
            description: "Never miss a lead with smart follow-up automation",
            href: "/solutions/lead-followup"
          },
          {
            icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335601/seo-solution-icon_zx5kjy.png" className="max-w-10 max-h-10" />,
            title: "Content & SEO Automation",
            description: "Create, optimize, and distribute high-ranking content",
            href: "/solutions/ai-content-seo-solution"
          }
        ]
      }
    ],
    footer: {
      text: "Not sure which solution fits your business?",
      link: "Talk to Sales →",
      href: "/talk-to-sales"
    }
  }
},

  {
    label: "Resources",
    href: "#resources",
    hasDropdown: true,
    dropdownContent: {
      title: "Grow with Ai",
      description: "Resources to help you succeed",
      sections: [
        {
          title: "Support",
          items: [
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/how-it-works-icon_ymaoex.png" className="max-w-10 max-h-10" />,
              title: "How-It-Works",
              description: "Guides and API references",
              href: "/resources/howitworks"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/about-us-icon_rkp7wa.png" className="max-w-10 max-h-10" />,
              title: "About Us",
              description: "Step-by-step walkthroughs",
              href: "/resources/about-us"
            },
             {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/customer-engage-icon_vafyry.png" className="max-w-10 max-h-10" />,
              title: "Help Center",
              description: "FAQs and troubleshooting",
              href: "/resources/help-center"
            },
          
          ]
        },
        {
          title: ".",
          items: [
         
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335513/community-icon_r7i3kj.png" className="max-w-10 max-h-10" />,
              title: "Community",
              description: "Join the conversation",
              href: "/resources/community"
            },
            {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335515/contact-support-icon_bmjjs7.png" className="max-w-10 max-h-10" />,
              title: "Contact Us",
              description: "24/7 expert assistance",
              href: "/contact-us"
            },
              {
              icon: <img src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335509/customer-engage-icon_vafyry.png" className="max-w-10 max-h-10" />,
              title: "Pricing",
              description: "make a best position",
              href: "/resources/pricing"
            },
       
           
          ]
        }
      ],
      footer: {
        text: "Need personalized help?",
        link: "Book a Demo →",
        href: "/book-demo"
      }
    }
  },
   {
              label: "Associates",
              href: "/broker-network",
               hasDropdown: false,
            },
            {
              label: "Property",
              href: "/properties",
               hasDropdown: false,
            }
];
function Header() {
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
   <div className=''>
  {/* Navigation */}
  <nav
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)]  ${
      scrolled
        ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl shadow-sm"
        : "bg-[var(--bg-primary)]"
    }`}
  >
    <div className="mx-auto px-[var(--space-4)] sm:px-[var(--space-2)] lg:px-[var(--space-4)]">
      <div className="flex justify-between items-center h-18">
        <div className="flex items-center gap-[var(--space-2)]">
          <div
            className="rounded-[var(--radius-xl)] bg-[var(--gradient-primary)] flex items-center justify-center shadow-lg"
            style={{
              boxShadow: "0 10px 15px -3px var(--color-primary-600)/25",
            }}
          >
           <Link href="/">  <img width={250} height={200} src="/assets/estateai.png" /></Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
             onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
            >
              {item.hasDropdown ? (
  <button
    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      activeDropdown === item.label
        ? "text-[var(--color-primary-600)] bg-[var(--color-primary-50)]"
        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
    }`}
  >
    {item.label}
    <ChevronDown
      className={`w-4 h-4 transition-transform duration-200 ${
        activeDropdown === item.label ? "rotate-180" : ""
      }`}
    />
  </button>
) : (
  <Link
    href={item.href}
    className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition"
  >
    {item.label}
  </Link>
)}

              {/* Mega Menu Dropdown */}

              {activeDropdown === item.label && item.dropdownContent && (
               <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px] transition-all duration-200 ease-out 
               ${ isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none" }`} >

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
                                className="group flex items-start gap-5 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors duration-200"
                              >
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-primary-50)] text-[var(--color-primary-600)] flex items-center justify-center group-hover:bg-[var(--color-primary-100)] transition-colors">
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

        <div className="hidden md:flex items-center gap-[var(--space-4)]">
          <Link href="/login">
          <button className="text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] font-medium transition-colors duration-[var(--duration-fast)]">
            Log in
          </button></Link>
          <Link href="/add-requirement">
          <button
            className="px-[var(--space-6)] py-[var(--space-2)] bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-[var(--text-inverse)] font-semibold rounded-lg transition-all duration-[var(--duration-fast)] shadow-lg hover:shadow-xl"
            style={{
              boxShadow: "0 10px 15px -3px var(--color-primary-600)/25",
            }}
          >
          Add Requirement
          </button></Link>
        </div>

        <button
          className="md:hidden p-2 text-[var(--text-secondary)]"
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
{/* humburger */}
{/* Overlay */}
<div
  onClick={() => setIsMenuOpen(false)}
  className={`
    fixed inset-0 bg-black/50 backdrop-blur-sm z-10
    transition-opacity duration-300
    ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
/>
  
 <div
  className={`
    md:hidden
    bg-[var(--color-primary-50)]
    border-t border-[var(--border-light)]
    absolute top-0 right-0 w-full  max-h-[100vh] overflow-y-auto
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    transform z-20
    ${isMenuOpen
      ? "opacity-100 translate-x-0 pointer-events-auto"
      : "opacity-0 translate-x-full pointer-events-none"}
  `}
>
  <div className='flex justify-between items-center'>
 <Link href="/">  <img width={200} height={200} className='p-2' src="/assets/estateai.png" /></Link>
 <div onClick={() => {setIsMenuOpen(!isMenuOpen)
  setOpenMobileItem(null)}
 } className={`  w-fit absolute p-1 right-2 shadow-xl rounded-md bg-[var(--color-primary-100)] ${isMenuOpen ? 'block' : 'hidden'}`}> <X className="w-6 h-6 text-[var(--color-primary-800)]" /></div></div>
   {/* Mobile Navigation */}
<div className="px-[var(--space-4)] py-[var(--space-6)] space-y-6">
  {navItems.map((item) => (
    <div key={item.label} className="space-y-3">
      
      {/* Check if item has dropdown */}
      {item.hasDropdown ? (
        <>
          {/* Dropdown Item - Toggle on click */}
          <button
            onClick={() => toggleMobileItem(item.label)}
            className="w-full flex justify-between items-center text-sm font-semibold text-[var(--text-primary)] py-2"
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
                      className="flex items-start gap-5 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition"
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
        </>
      ) : (
        /* No Dropdown - Direct Link */
        <Link
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className="block w-full text-sm font-semibold text-[var(--text-primary)] py-2 hover:text-[var(--color-primary-600)] transition-colors"
        >
          {item.label}
        </Link>
      )}
    </div>
  ))}

  {/* Sticky Bottom Auth Buttons */}
  <div className='sticky bottom-0 bg-[var(--color-primary-50)] border-t border-neutral-50 pt-4'>
    <Link href="/login">
      <button className="w-full py-[var(--space-3)] text-[var(--text-secondary)] font-medium">
        Log in
      </button>
    </Link>
    <Link href="/add-requirement">
      <button className="w-full py-[var(--space-3)] bg-[var(--color-primary-600)] text-[var(--text-inverse)] font-semibold rounded-[var(--radius-xl)] mt-2">
        Add Requirements
      </button>
    </Link>
  </div>
</div>
  </div>



  </nav>
</div>

  )
}

export default Header
