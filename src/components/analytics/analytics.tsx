import { ChevronRight } from 'lucide-react';
import {useEffect,useRef} from 'react'
interface Card {
  title: string
  desc: string
  img: string
}
interface AutomationItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  variant: 'assistant' | 'support' | 'meeting';
}
const cards: Card[] = [
  {
    title: "AI Property Matching",
    desc: "Our AI automatically finds the best property for every client.",
    img: "/assets/img-4.png",
  },
  {
    title: "Lead Generation",
    desc: "Capture and qualify leads using intelligent AI workflows.",
    img: "/assets/img-1.png",
  },
  {
    title: "Marketing Automation",
    desc: "Automate campaigns and reach buyers across platforms.",
    img: "/assets/img-2.png",
  },
  {
    title: "Broker Dashboard",
    desc: "Real-time analytics and performance insights for brokers.",
    img: "/assets/img-3.png",
  },
    {
    title: "AI Client Relation",
    desc: "Our AI automatically ,make the best client for every client.",
    img: "/assets/img-5.png",
  },
];
const automations: AutomationItem[] = [
  {
    id: 'agent-assistant',
    title: 'AI Assistant for your daily work',
    description:
      'Handles your daily tasks, reminders, and routine work automatically, so you can focus on closing deals.',
    imageSrc: '/assets/crmph-robo.png',
    imageAlt: 'AI Assistant Agent',
    variant: 'assistant',
  },
  {
    id: 'customer-support',
    title: 'Customer Support Assistant',
    description:
      'Replies to your customer queries instantly and manages conversations 24/7 without delay.',
    imageSrc: '/assets/crmdash-robo.png',
    imageAlt: 'Customer Support AI Agent',
    variant: 'support',
  },
  {
    id: 'meeting-agent',
    title: 'Smart Meeting Scheduler',
    description:
      'Organizes your meetings, reminders, and schedules so you never miss an important discussion.',
    imageSrc: '/assets/half-robo.png',
    imageAlt: 'Meeting Preparation AI Agent',
    variant: 'meeting',
  },
];
const getVariantStyles = (variant: string): string => {
  const styles: Record<string, string> = {
    assistant: 'bg-gradient-to-br from-blue-200 to-blue-100 border-blue-200 shadow-xl',
    support: 'bg-gradient-to-br from-blue-300 to-cyan-100 border-blue-300 shadow-xl',
    meeting: 'bg-gradient-to-br  from-blue-300 to-cyan-100 border-blue-300 shadow-xl',
  };
  return styles[variant] || styles.soshie;
};
function HomeAutomationsPage(): React.JSX.Element {
  const firstAutomation = automations[0];
  const otherAutomations = automations.slice(1);

  return (
   <main className="min-h-screen ">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-6 lg:gap-8">
      {/* First Box - Full Width with Content Left, Image Right */}
    <div
  className={`relative overflow-hidden rounded-2xl border ${getVariantStyles(firstAutomation.variant)} shadow-sm flex flex-col lg:flex-row h-full lg:h-[400px]`}
>
  {/* Content - Left Side - Centered */}
  <div className="py-8 px-6 lg:px-8 flex-1 flex flex-col justify-center items-center text-center lg:w-1/2">
    <div className="mb-4">
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
        {firstAutomation.title}
      </h3>
    </div>
    <p className="text-lg text-gray-500 leading-relaxed max-w-md">
      {firstAutomation.description}
    </p>
  </div>

  {/* Image - Right Side - Centered */}
  <div className="relative w-full lg:w-1/2 h-64 lg:h-full overflow-hidden flex items-center justify-center ">
    <img
      src={firstAutomation.imageSrc}
      alt={firstAutomation.imageAlt}
      className="max-w-full max-h-full object-contain"
    />
  </div>
</div>

      {/* Other Two Boxes - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {otherAutomations.map((automation) => (
          <div
            key={automation.id}
            className={`relative overflow-hidden rounded-2xl border ${getVariantStyles(automation.variant)} shadow-sm flex flex-col h-full min-h-[400px]`}
          >
            <div className="p-6 lg:p-8 flex-1">
              <div className="mb-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {automation.title}
                </h3>
              </div>
              <p className="text-lg text-gray-500 leading-relaxed">
                {automation.description}
              </p>
            </div>

            <div className="relative w-full h-48 lg:h-68 overflow-hidden mt-auto">
              <img
                src={automation.imageSrc}
                alt={automation.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</main>
  );
}
const Analytics = () => {
   const scrollRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const scrollAmount = 320

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  // Animation logic hook
  useEffect(() => {
    // Animate Bars
    const bars = document.querySelectorAll('.bar-anim');
    bars.forEach((bar: any) => {
      const finalHeight = bar.style.height;
      bar.style.height = '0%';
      setTimeout(() => {
        bar.style.height = finalHeight;
      }, 300);
    });

    // Animate Donut
    const donut = document.querySelector('.donut-chart-anim');
    if (donut) {
      (donut as HTMLElement).style.transform = 'rotate(-90deg) scale(0.8)';
      (donut as HTMLElement).style.opacity = '0';
      setTimeout(() => {
        (donut as HTMLElement).style.transition = 'transform 1s ease-out, opacity 1s ease';
        (donut as HTMLElement).style.transform = 'rotate(-90deg) scale(1)';
        (donut as HTMLElement).style.opacity = '1';
      }, 500);
    }
  }, []);
 const steps = [
  {
    number: "01",
    title: "Add Your Properties",
    description: "Upload your property listings or add them manually. It’s quick and easy to get started.",
    bg: "var(--color-primary-100)"
  },
  {
    number: "02",
    title: "Set Your Preferences",
    description: "Choose how you want to manage leads, messages, and tasks. The system will handle the rest.",
    bg: "var(--color-secondary-100)"
  },
  {
    number: "03",
    title: "Grow Your Business",
    description: "Get more leads, respond faster, and close more deals with the help of AI.",
    bg: "var(--color-primary-50)"
  }
];
  const TrendUpIcon = ({ className }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
  
  return (
    <>
    <section id="analytics" className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="font-['var(--font-head)]  text-[var(--color-primary-600)]  text-3xl md:text-5xl text-center mb-4">
         Everything You Need in One Platform
        </h2>
        <p className="text-center text-[var(--color-text-muted)] max-w-2xl mx-auto mb-16 text-lg">
         Manage leads, track clients, automate marketing, close deals faster
        </p>

       <div className="relative w-full flex justify-center">
  <div className="w-full">
    <img
      src="https://res.cloudinary.com/djipgt6vc/image/upload/v1775625175/ai-dash-mobile_heogas.png"
      className="w-full h-auto object-cover rounded-2xl block sm:hidden"
      alt="CRM Collaboration"
    />
    <img
      src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774526986/ai-dashboard-sec_ngpvcl.png"
      className="w-full h-auto object-cover rounded-2xl hidden sm:block"
      alt="CRM Collaboration"
    />
  </div>
</div>
  <div className="relative w-full mt-10">

      <HomeAutomationsPage/>

    </div>
      </div>
    </section>
     {/* How It Works */}
        <section id="how-it-works" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
  {/* Background AI Grid Pattern */}
  <div className="absolute inset-0 opacity-[0.03]">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }} />
  </div>
  
  {/* Floating Robot Elements */}
  <div className="absolute top-20 left-10 opacity-20 animate-pulse">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-blue-500">
      <rect x="35" y="30" width="50" height="40" rx="8" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="45" cy="50" r="6" fill="currentColor"/>
      <circle cx="75" cy="50" r="6" fill="currentColor"/>
      <rect x="50" y="65" width="20" height="3" rx="1.5" fill="currentColor"/>
      <rect x="30" y="70" width="10" height="25" rx="5" fill="currentColor" fillOpacity="0.3"/>
      <rect x="80" y="70" width="10" height="25" rx="5" fill="currentColor" fillOpacity="0.3"/>
      <path d="M60 20 L60 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="60" cy="8" r="4" fill="currentColor"/>
    </svg>
  </div>
  
  <div className="absolute bottom-20 right-10 opacity-20 animate-bounce" style={{animationDuration: '3s'}}>
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-indigo-500">
      <rect x="25" y="25" width="50" height="35" rx="6" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="40" cy="42" r="5" fill="currentColor"/>
      <circle cx="60" cy="42" r="5" fill="currentColor"/>
      <rect x="42" y="52" width="16" height="2" rx="1" fill="currentColor"/>
      <rect x="20" y="55" width="8" height="20" rx="4" fill="currentColor" fillOpacity="0.3"/>
      <rect x="72" y="55" width="8" height="20" rx="4" fill="currentColor" fillOpacity="0.3"/>
    </svg>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Section Header with AI Badge */}
   <div className="text-center max-w-3xl mx-auto mb-20">
  {/* Robot positioned behind with negative margin */}
  <div className="relative flex justify-center -mb-[55px] -ml-[282px] z-10">
    <img 
      width={100} 
      height={100} 
      src="/assets/stand-robo.png" 
      alt="AI Robot"
      className="drop-shadow-2xl transform translate-y-4"
    />
  </div>

  {/* Badge in front of robot */}
  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6 shadow-lg">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
    </span>
    
    <span className="text-sm font-medium text-blue-700">AI-Powered Onboarding</span>
  </div>
  
  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
   Your AI Handles the Setup for You
  </h2>
  <p className="text-xl text-slate-600 leading-relaxed">
   No complicated setup needed. Our AI understands your business and gets everything ready for you within minutes.
  </p>
</div>

    {/* AI Steps Grid */}
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {/* Connection Lines - Desktop */}
      <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 -translate-y-1/2 z-0" />
      
      {steps.map((step, idx) => (
        <div key={idx} className="relative group z-10">
          {/* Card Container */}
          <div className="relative bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 
                          hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 
                          transition-all duration-500 ease-out hover:-translate-y-2">
            
            {/* AI Robot Icon - Top */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 
                              flex items-center justify-center shadow-lg shadow-blue-500/30
                              group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                {idx === 0 && (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Step Number Badge */}
            <div className="flex justify-center mb-6 mt-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center
                              group-hover:bg-blue-50 transition-colors duration-300">
                <span className="text-lg font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  0{idx + 1}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>

            {/* AI Feature Tags */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {idx === 0 && (
                <>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">Smart Analysis</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium">Auto-Detect</span>
                </>
              )}
              {idx === 1 && (
                <>
                  <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">AI Configuration</span>
                  <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-medium">Instant Setup</span>
                </>
              )}
              {idx === 2 && (
                <>
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">Live Dashboard</span>
                  <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-medium">24/7 AI</span>
                </>
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 
                            group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 
                            transition-all duration-500 pointer-events-none" />
          </div>

          {/* Arrow Connector - Desktop */}
          {idx < 2 && (
            <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
              <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center
                              border border-slate-100 group-hover:border-blue-200 group-hover:shadow-blue-500/20
                              transition-all duration-300">
                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Bottom AI Assistant CTA */}
    <div className="mt-20 text-center">
      <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 
                      shadow-2xl shadow-slate-900/20 hover:shadow-slate-900/30 transition-all duration-300
                      group cursor-pointer">
        {/* Small Robot Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center
                          group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="6" y="4" width="12" height="12" rx="2" strokeWidth="2"/>
              <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
              <path d="M9 13h6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 16v3" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 19h8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800 
                           animate-pulse" />
        </div>
        
        <div className="text-left">
          <p className="text-white font-semibold text-lg">Need help getting started?</p>
          <p className="text-slate-400 text-sm">Our AI assistant is here to guide you step by step</p>
        </div>
        
        <div className="ml-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                        group-hover:bg-white/20 transition-colors">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  );
};

export default Analytics
