"use client";

import React, { useState,useEffect } from "react";
import {
  Clock,
  Users,
  Layers,
  Mail,
  Database,
  Grid2X2,
  ChevronRight,
  Play,
  Calendar,
  Search,
  Plus,
  Bell,
  Settings,
  HelpCircle,
  CheckCircle2,
  UserPlus,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { useRouter } from "next/navigation"; 
import { LogOut } from 'lucide-react'; 
interface SetupStep {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  actionLabel: string;
   restrictedTo?: "ADMIN";
   route?:  string;
}

const setupSteps: SetupStep[] = [
  {
    id: "invite",
    icon: <Users className="w-5 h-5" />,
    label: "Invite your team",
    description: "Stay connected and collaborate with your team members to share sales updates from one platform.",
    actionLabel: "Invite users"
  },
  {
    id: "pipeline",
    icon: <Layers className="w-5 h-5" />,
    label: "Open Your CRM Dashboard",
    description: "Set up your sales stages and customize your pipeline to match your sales process.",
    actionLabel: "CRM Dashboard",
    route: "https://property.ibigdata.in/"
  },
  {
    id: "email",
    icon: <Mail className="w-5 h-5" />,
    label: "Connect to your email account",
    description: "Sync your emails to keep all communications in one place and track interactions automatically.",
    actionLabel: "Connect email"
  },
  {
    id: "migrate",
    icon: <Database className="w-5 h-5" />,
    label: "Open Your SEO Dashboard",
    description: "Import your contacts, deals, and data from spreadsheets or other CRMs seamlessly.",
    actionLabel: "SEO Dashboard",
    restrictedTo: "ADMIN",
    route: "/seo"
  },
  {
    id: "integration",
    icon: <Grid2X2 className="w-5 h-5" />,
    label: "Integration",
    description: "Connect your favorite tools and apps to streamline your workflow and boost productivity.",
    actionLabel: "Browse integrations"
  }
];


export default function CRMSetupPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<string>("invite");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
const [role, setRole] = useState<string | null>(null);
useEffect(() => {
  const cookies = document.cookie.split("; ");
  const roleCookie = cookies.find(c => c.startsWith("user-role="));

  if (roleCookie) {
    setRole(roleCookie.split("=")[1]);
  }
}, []); 


const handleStepClick = (stepId: string) => {
    setActiveStep(stepId);
  };

  const handleComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    const currentIndex = setupSteps.findIndex(s => s.id === stepId);
    if (currentIndex < setupSteps.length - 1) {
      setActiveStep(setupSteps[currentIndex + 1].id);
    }
  };
  const handleLogout = () => {
    // Clear cookie
    document.cookie = 'seo-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
    router.refresh();
  };
  const activeStepData = setupSteps.find(s => s.id === activeStep);
const isRestricted = activeStepData?.restrictedTo === "ADMIN" && role !== "ADMIN";
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
   

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          
          {/* Left Sidebar - Welcome Section */}
          <div className="lg:col-span-4">
            {/* Welcome Card */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-100 via-blue-50 to-pink-100 p-8 min-h-[480px]">
              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Hello
                </h1>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Free Subscriber 👋
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  We&apos;re happy to bring you
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  aboard the world&apos;s favorite
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  CRM!
                </p>
                <p className="text-gray-700 font-semibold mb-8">
                  Let&apos;s get started!
                </p>

                {/* Video Section */}
                <div className="mb-4">
                  <p className="text-gray-700 font-medium text-sm mb-1">
                    Watch a one-minute video
                  </p>
                  <p className="text-gray-500 text-xs">
                    View the key features we offer
                  </p>
                </div>

                {/* Video Thumbnail */}
                <div className="relative w-full h-32 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Illustration */}
                      <div className="w-24 h-24 relative">
                        <div className="absolute bottom-0 left-0 w-12 h-16 bg-gradient-to-t from-blue-400 to-blue-300 rounded-full"></div>
                        <div className="absolute bottom-0 right-0 w-10 h-14 bg-gradient-to-t from-purple-400 to-purple-300 rounded-full"></div>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 bg-pink-300 rounded-full"></div>
                        <div className="absolute top-4 left-0 w-4 h-4 bg-cyan-300 rounded-full"></div>
                        {/* Play Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Webinar Link */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Need a Live Webinar?</p>
                    <button className="text-blue-600 font-semibold text-sm hover:underline">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Setup Checklist */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-100 via-pink-50 to-blue-100 p-8 min-h-[580px]">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Set up your CRM
                </h2>
                <p className="text-gray-600 text-sm mb-8">
                  Make your CRM smarter and more interactive
                </p>

                {/* Steps List */}
                <div className="space-y-3">
                  {setupSteps.map((step) => {
                    const isActive = activeStep === step.id;
                    const isCompleted = completedSteps.has(step.id);
                    const isRestricted = step.restrictedTo === "ADMIN" && role !== "ADMIN";
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => !isRestricted && handleStepClick(step.id)}
                        disabled={isRestricted}
                        className={`
                          w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group text-left bg-white/80 backdrop-blur-sm
                          ${isActive 
                            ? "ring-2 ring-pink-300 shadow-lg" 
                            : "hover:bg-white shadow-sm"
                          }
                          ${isRestricted ? "opacity-50 cursor-not-allowed hidden" : "hover:bg-white"}
                        `}
                      >
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                          ${isActive 
                            ? "bg-white shadow-md text-gray-700" 
                            : isCompleted
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                        </div>
                        
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">
                            {step.label}
                          </p>
                        </div>

                        <ChevronRight className={`
                          w-5 h-5 transition-all duration-200
                          ${isActive ? "text-pink-500" : "text-gray-400"}
                        `} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Active Step Details */}
          <div className="lg:col-span-3 ">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-pink-100 via-cyan-50 to-blue-100 p-6 min-h-[480px]">
              {/* Skip Button */}
              <button onClick={handleLogout} className="absolute top-4 right-4 z-50 flex flex-row gap-2 items-center justify-center cursor-pointer px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-white transition-colors">
                <LogOut className="w-4 h-4" />
                     Sign Out
              </button>

              <div className="relative z-10 pt-12">
                {/* Illustration */}
                <div className="w-full aspect-square max-w-[200px] mx-auto mb-6">
                  <div className="relative w-full h-full">
                    {/* Background circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/40 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/60 rounded-full"></div>
                    
                    {/* Main icon container */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                      <UserPlus className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="absolute bottom-8 left-2 w-6 h-6 bg-cyan-400 rounded-full"></div>
                    <div className="absolute top-8 left-4 w-3 h-3 bg-pink-300 rounded-full"></div>
                    <div className="absolute bottom-12 right-8 w-4 h-4 bg-blue-300 rounded-full"></div>
                    <div className="absolute top-12 right-8 w-2 h-2 bg-cyan-300 rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 text-center mb-3">
                  {activeStepData?.label}
                </h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed mb-8 px-2">
                  {activeStepData?.description}
                </p>

                {/* CTA Button */}
                <button 
                disabled={isRestricted}
                 onClick={() => {
    if (!activeStepData) return;

    const isRestricted =
      activeStepData.restrictedTo === "ADMIN" && role !== "ADMIN";

    if (isRestricted) return;

    // ✅ If route exists → navigate
    if (activeStepData.route) {
      router.push(activeStepData.route);
      return;
    }

    // otherwise fallback (old behavior)
    handleComplete(activeStepData.id);
  }}
                  className={`w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2  
                    ${isRestricted
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}

                >
                  <span> {isRestricted ? "Admin Only" : activeStepData?.actionLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}