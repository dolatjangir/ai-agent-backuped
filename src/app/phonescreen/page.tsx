"use client";

import React, { useState, useEffect } from "react";
import {
  Bot,
  Search,
  Code2,
  Megaphone,
  PenTool,
  BarChart3,
  MessageSquare,
  Sparkles,
  Settings,
  Home,
  ChevronRight,
  Zap,
  Brain,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// TYPES
// ============================================
interface Agent {
  id: number;
  name: string;
  description: string;
  status: "online" | "busy" | "offline";
  icon: React.ElementType;
  color: string;
  gradient: string;
  tags: string[];
}

// ============================================
// DATA
// ============================================
const agents: Agent[] = [
  {
    id: 1,
    name: "SEO Expert",
    description: "Optimize your website ranking",
    status: "online",
    icon: Search,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/20",
    tags: ["Marketing", "Growth"],
  },
  {
    id: 2,
    name: "Code Assistant",
    description: "Write and debug code faster",
    status: "online",
    icon: Code2,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-cyan-500/20",
    tags: ["Dev", "AI"],
  },
  {
    id: 3,
    name: "Marketing AI",
    description: "Create campaigns that convert",
    status: "busy",
    icon: Megaphone,
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/20",
    tags: ["Ads", "Social"],
  },
  {
    id: 4,
    name: "Content Writer",
    description: "Generate engaging content",
    status: "online",
    icon: PenTool,
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-amber-500/20",
    tags: ["Blog", "Copy"],
  },
  {
    id: 5,
    name: "Data Analyst",
    description: "Turn data into insights",
    status: "offline",
    icon: BarChart3,
    color: "text-indigo-400",
    gradient: "from-indigo-500/20 to-violet-500/20",
    tags: ["Analytics", "BI"],
  },
  {
    id: 6,
    name: "Chat Support",
    description: "24/7 customer assistance",
    status: "online",
    icon: MessageSquare,
    color: "text-rose-400",
    gradient: "from-rose-500/20 to-pink-500/20",
    tags: ["Support", "CRM"],
  },
  {
    id: 7,
    name: "Creative AI",
    description: "Design and creative ideas",
    status: "busy",
    icon: Sparkles,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/20",
    tags: ["Design", "Art"],
  },
  {
    id: 8,
    name: "Research Bot",
    description: "Deep research and summaries",
    status: "online",
    icon: Brain,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-blue-500/20",
    tags: ["Research", "NLP"],
  },
  {
    id: 9,
    name: "Sales Assistant",
    description: "Close deals with AI power",
    status: "offline",
    icon: Zap,
    color: "text-green-400",
    gradient: "from-green-500/20 to-emerald-500/20",
    tags: ["Sales", "CRM"],
  },
  {
    id: 10,
    name: "Strategy AI",
    description: "Business growth planning",
    status: "online",
    icon: Globe,
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-purple-500/20",
    tags: ["Strategy", "Biz"],
  },
];

// ============================================
// COMPONENTS
// ============================================

const StatusBadge = ({ status }: { status: Agent["status"] }) => {
  const config = {
    online: { color: "bg-emerald-500", shadow: "shadow-emerald-500/50", label: "Online" },
    busy: { color: "bg-amber-500", shadow: "shadow-amber-500/50", label: "Busy" },
    offline: { color: "bg-slate-500", shadow: "shadow-slate-500/50", label: "Offline" },
  }[status];

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${config.color} ${config.shadow} shadow-lg`} />
      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
        {config.label}
      </span>
    </div>
  );
};

const AgentCard = ({ agent, index }: { agent: Agent; index: number }) => {
  const Icon = agent.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative p-4 flex items-center gap-4">
          {/* Avatar */}
          <div className={`relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center ${agent.color} shadow-lg`}>
            <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm" />
            <Icon className="w-5 h-5 relative z-10" />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
              agent.status === "online" ? "bg-emerald-500" : agent.status === "busy" ? "bg-amber-500" : "bg-slate-500"
            }`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
              {agent.name}
            </h3>
            <p className="text-xs text-slate-400 truncate mt-0.5">{agent.description}</p>
            <div className="mt-2">
              <StatusBadge status={agent.status} />
            </div>
          </div>
          
          {/* Action */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log(`Chat with ${agent.name}`)}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5"
  >
    <div className="px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
            AI Agents
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Your smart assistants</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
        </motion.button>
      </div>
    </div>
  </motion.header>
);

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("agents");
  
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "agents", icon: Bot, label: "Agents" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky bottom-0 z-50 bg-slate-900/90 backdrop-blur-xl border-t border-white/5"
    >
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.9 }}
              className={`relative flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 ${
                isActive ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-500/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-5 h-5 relative z-10 ${isActive ? "text-blue-400" : ""}`} />
              <span className="text-[10px] font-medium relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

const SkeletonCard = () => (
  <div className="p-4 flex items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-slate-800 animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
      <div className="h-3 w-32 bg-slate-800 rounded animate-pulse" />
    </div>
    <div className="w-10 h-10 rounded-xl bg-slate-800 animate-pulse" />
  </div>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function AIAgentsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 sm:p-8">
      {/* Phone Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-[375px] h-[812px] bg-slate-900 rounded-[40px] shadow-2xl shadow-black/50 overflow-hidden border-8 border-slate-800"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-50" />
        
        {/* Screen Content */}
        <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-950">
          <Header />
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="px-4 py-6 space-y-3">
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between px-1 mb-4"
              >
                <h2 className="text-sm font-semibold text-slate-300">Available Agents</h2>
                <span className="text-xs text-slate-500">{agents.length} total</span>
              </motion.div>
              
              {/* Agents List */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="rounded-2xl bg-slate-800/30 border border-white/5">
                        <SkeletonCard />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3 pb-20"
                  >
                    {agents.map((agent, index) => (
                      <AgentCard key={agent.id} agent={agent} index={index} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <BottomNav />
        </div>
        
        {/* Screen Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[32px]" />
      </motion.div>
      
      {/* Background Glow Effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />
    </div>
  );
}