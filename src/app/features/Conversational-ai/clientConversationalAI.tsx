// app/smart-communication/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Zap, 
  Clock, 
  Users, 
  Heart, 
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Bot,
  MessageSquare,
  PhoneCall,
  Send,
  Inbox,
  Bell,
  MoreHorizontal,
  Smile,
  Paperclip,
  Mic,
  PhoneOff,
  Volume2,
  User,
  Calendar,
  Star,
  ThumbsUp,
  AlertCircle,
  Brain
} from 'lucide-react';

// 1. Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[var(--color-primary-50)] via-white to-white">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[var(--color-primary-300)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-8">
            <MessageCircle className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Never miss a conversation</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-primary-900)] tracking-tight mb-6 leading-tight">
            Communicate Smarter,{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--color-primary-600)]">Convert Faster</span>
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-[var(--color-primary-200)] -z-0" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,4 Q100,0 200,4" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-[var(--color-primary-800)]/70 leading-relaxed max-w-2xl mx-auto mb-10">
            AI agents handle every client conversation across chat, email, and phone—instantly and personally. 
            Never let another lead go cold while you focus on closing deals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group w-full sm:w-auto px-8 py-4 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold shadow-xl shadow-[var(--color-primary-600)]/25 hover:shadow-[var(--color-primary-600)]/40 hover:bg-[var(--color-primary-700)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5" />
              Start Communicating Smarter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-xl font-semibold hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all duration-300 flex items-center justify-center gap-2 text-lg">
              <Play className="w-5 h-5 fill-current" />
              See It in Action
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-primary-600)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Reply in under 1 second</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Works across all channels</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Personalized with AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Core Features Section
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Chat Automation",
      description: "Intelligent chatbots that understand context, answer questions, and guide clients through the buying journey naturally.",
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
      badge: "24/7 Active"
    },
    {
      icon: <PhoneCall className="w-6 h-6" />,
      title: "AI Calling Agent",
      description: "Human-like voice AI that makes and receives calls, schedules viewings, and qualifies leads with natural conversation.",
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-600)]",
      badge: "Voice AI"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Smart Email Automation",
      description: "Personalized email sequences that adapt tone and content based on client behavior, preferences, and engagement.",
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-500)]",
      badge: "Adaptive"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Responses",
      description: "Sub-second response times across all channels. Every inquiry gets immediate attention, day or night.",
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-500)]",
      badge: "< 1 sec"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Messaging",
      description: "AI crafts unique messages for each client based on their history, preferences, and stage in the buying process.",
      color: "from-[var(--color-primary-600)] to-[var(--color-primary-700)]",
      badge: "Hyper-personal"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Channel Communication",
      description: "Seamlessly manage conversations across SMS, email, chat, and phone from one unified inbox.",
      color: "from-[var(--color-secondary-600)] to-[var(--color-secondary-700)]",
      badge: "Unified"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Reply instantly with AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            One Platform, Every Conversation
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            AI-powered communication tools that engage clients across every channel
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl hover:shadow-[var(--color-primary-600)]/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />
              
              <div className="flex items-start justify-between mb-4 relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <span className="text-xs font-bold text-white bg-[var(--color-primary-600)] px-3 py-1 rounded-full">
                  {feature.badge}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--color-primary-700)]/70 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Visual Showcase Section
const ShowcaseSection: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'chat' | 'call' | 'email'>('chat');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (activeChannel === 'chat') {
      const timer = setTimeout(() => setIsTyping(true), 1000);
      const stopTimer = setTimeout(() => setIsTyping(false), 3000);
      return () => {
        clearTimeout(timer);
        clearTimeout(stopTimer);
      };
    }
  }, [activeChannel]);

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-50)]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-100)] border border-[var(--color-primary-200)] mb-6">
              <Inbox className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span className="text-sm font-semibold text-[var(--color-primary-700)]">Unified Communication Hub</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-900)] mb-6 leading-tight">
              See Every Message, Respond Instantly
            </h2>
            
            <p className="text-lg text-[var(--color-primary-700)]/70 mb-8 leading-relaxed">
              Your unified inbox shows all client conversations across channels. 
              AI suggests responses, automates follow-ups, and ensures no message goes unanswered.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Real-time chat with AI-suggested replies",
                "Live call dashboard with AI transcription",
                "Email threads with smart compose",
                "Cross-channel conversation history",
                "Sentiment analysis and urgency alerts"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-600)]" />
                  </div>
                  <span className="text-[var(--color-primary-800)] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="group px-6 py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-700)] transition-colors flex items-center gap-2">
              Explore the Inbox
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Interactive Communication UI */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)] rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-[var(--color-primary-100)] overflow-hidden">
              {/* Channel Tabs */}
              <div className="flex border-b border-[var(--color-primary-100)]">
                {[
                  { id: 'chat', icon: <MessageSquare className="w-4 h-4" />, label: 'Live Chat', count: 3 },
                  { id: 'call', icon: <Phone className="w-4 h-4" />, label: 'Calls', count: 1 },
                  { id: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email', count: 5 }
                ].map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id as any)}
                    className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeChannel === channel.id ? 'text-[var(--color-primary-600)] border-b-2 border-[var(--color-primary-600)] bg-[var(--color-primary-50)]' : 'text-[var(--color-primary-500)] hover:text-[var(--color-primary-700)]'}`}
                  >
                    {channel.icon}
                    {channel.label}
                    <span className="ml-1 px-2 py-0.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-xs">
                      {channel.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Chat Interface */}
              {activeChannel === 'chat' && (
                <div className="h-[480px] flex flex-col">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-[var(--color-primary-50)]/30">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-300)] flex items-center justify-center text-[var(--color-primary-800)] font-semibold">
                          JD
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--color-primary-900)] text-sm">John Davis</p>
                        <p className="text-xs text-[var(--color-primary-500)]">Active now</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[var(--color-primary-400)] cursor-pointer hover:text-[var(--color-primary-600)]" />
                      <MoreHorizontal className="w-4 h-4 text-[var(--color-primary-400)] cursor-pointer hover:text-[var(--color-primary-600)]" />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[var(--color-primary-50)]/20">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-300)] flex-shrink-0" />
                      <div className="bg-white border border-[var(--color-primary-100)] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-sm text-[var(--color-primary-800)]">Hi, I'm interested in the property on Maple Street. Is it still available?</p>
                        <span className="text-xs text-[var(--color-primary-400)] mt-1 block">2:34 PM</span>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-[var(--color-primary-600)] text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%] shadow-md">
                        <p className="text-sm">Yes! The Maple Street property is available. It's a 3-bed, 2-bath with a pool. Would you like to schedule a viewing this weekend?</p>
                        <span className="text-xs text-white/70 mt-1 block">2:34 PM • AI Agent</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-300)] flex-shrink-0" />
                      <div className="bg-white border border-[var(--color-primary-100)] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-sm text-[var(--color-primary-800)]">Saturday morning works for me. What time?</p>
                        <span className="text-xs text-[var(--color-primary-400)] mt-1 block">2:35 PM</span>
                      </div>
                    </div>

                    {isTyping && (
                      <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white flex-shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-[var(--color-primary-100)] rounded-2xl rounded-tr-none px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-[var(--color-primary-500)] rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-[var(--color-primary-500)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-[var(--color-primary-500)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Suggestions */}
                  <div className="px-4 py-2 bg-[var(--color-primary-50)] border-t border-[var(--color-primary-100)]">
                    <p className="text-xs text-[var(--color-primary-500)] mb-2 font-medium">AI Suggested Replies:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {["10 AM works great!", "I can do 11 AM Saturday", "Let me check my calendar"].map((reply, idx) => (
                        <button key={idx} className="flex-shrink-0 px-3 py-1.5 bg-white border border-[var(--color-primary-200)] rounded-full text-xs text-[var(--color-primary-700)] hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-colors">
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-[var(--color-primary-100)] flex items-center gap-2">
                    <Paperclip className="w-5 h-5 text-[var(--color-primary-400)] cursor-pointer hover:text-[var(--color-primary-600)]" />
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-1 px-4 py-2 rounded-full border border-[var(--color-primary-200)] text-sm focus:outline-none focus:border-[var(--color-primary-400)] bg-[var(--color-primary-50)]/30"
                    />
                    <Mic className="w-5 h-5 text-[var(--color-primary-400)] cursor-pointer hover:text-[var(--color-primary-600)]" />
                    <button className="p-2 bg-[var(--color-primary-600)] text-white rounded-full hover:bg-[var(--color-primary-700)] transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Call Interface */}
              {activeChannel === 'call' && (
                <div className="h-[480px] flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-50)] to-white p-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-300)] flex items-center justify-center mb-6 relative">
                    <span className="text-2xl font-bold text-[var(--color-primary-800)]">JD</span>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                      <PhoneCall className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-primary-900)] mb-2">John Davis</h3>
                  <p className="text-[var(--color-primary-500)] mb-8">AI Agent Speaking • 2:34</p>
                  
                  <div className="w-full max-w-sm bg-white rounded-xl p-4 shadow-md border border-[var(--color-primary-100)] mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="w-4 h-4 text-[var(--color-primary-600)]" />
                      <span className="text-xs font-semibold text-[var(--color-primary-600)]">Live AI Transcription</span>
                    </div>
                    <p className="text-sm text-[var(--color-primary-800)] italic">"I'd like to schedule a viewing for Saturday morning. Do you have any openings around 10 AM?"</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] hover:bg-[var(--color-primary-200)] transition-colors">
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg">
                      <PhoneOff className="w-6 h-6" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] hover:bg-[var(--color-primary-200)] transition-colors">
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Email Interface */}
              {activeChannel === 'email' && (
                <div className="h-[480px] flex flex-col bg-white">
                  <div className="px-4 py-3 border-b border-[var(--color-primary-100)] flex items-center justify-between bg-[var(--color-primary-50)]/30">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[var(--color-primary-600)]" />
                      <span className="font-semibold text-[var(--color-primary-900)]">Smart Compose</span>
                    </div>
                    <span className="text-xs text-[var(--color-primary-500)]">Draft saved</span>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="mb-4">
                      <label className="text-xs text-[var(--color-primary-500)] uppercase font-semibold">To</label>
                      <div className="flex items-center gap-2 mt-1 p-2 bg-[var(--color-primary-50)] rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-primary-200)]" />
                        <span className="text-sm text-[var(--color-primary-800)]">john.davis@email.com</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-xs text-[var(--color-primary-500)] uppercase font-semibold">Subject</label>
                      <input 
                        type="text" 
                        value="Re: Maple Street Property - Viewing Confirmation" 
                        className="w-full mt-1 p-2 text-sm border-b border-[var(--color-primary-200)] focus:outline-none focus:border-[var(--color-primary-400)] bg-transparent"
                      />
                    </div>

                    <div className="mb-4 relative">
                      <label className="text-xs text-[var(--color-primary-500)] uppercase font-semibold">Message</label>
                      <div className="mt-2 p-4 bg-[var(--color-primary-50)] rounded-lg min-h-[200px] text-sm text-[var(--color-primary-800)] leading-relaxed">
                        Hi John,
                        <br /><br />
                        Thank you for your interest in the Maple Street property! I'd be happy to schedule a viewing for you this <span className="bg-[var(--color-primary-200)] px-1 rounded">Saturday at 10:00 AM</span>.
                        <br /><br />
                        The property features 3 bedrooms, 2 bathrooms, and a beautiful pool area. I'll meet you at the front entrance.
                        <br /><br />
                        <span className="text-[var(--color-primary-500)] italic text-xs">AI suggested this time based on your availability and the client's preference.</span>
                        <br /><br />
                        Best regards,<br />
                        EstateAI Agent
                      </div>
                      
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-[var(--color-primary-200)] rounded-lg text-xs text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Rewrite
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-[var(--color-primary-100)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-[var(--color-primary-400)]" />
                      <span className="text-xs text-[var(--color-primary-500)]">1 attachment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] rounded-lg transition-colors">Save Draft</button>
                      <button className="px-4 py-2 bg-[var(--color-primary-600)] text-white text-sm rounded-lg hover:bg-[var(--color-primary-700)] transition-colors flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Metrics Card */}
            <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-xl shadow-xl border border-[var(--color-primary-100)] max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary-900)]">Response Time</p>
                  <p className="text-2xl font-bold text-[var(--color-primary-600)] mt-1">0.8s</p>
                  <p className="text-xs text-[var(--color-primary-500)]">Average AI response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. Benefits Section
const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Respond in Under 1 Second",
      description: "Never keep clients waiting. AI agents reply instantly to every inquiry, 24/7, across all channels. Speed is the new competitive advantage.",
      stat: "0.8s",
      statLabel: "avg response",
      details: ["24/7 availability", "Instant replies", "Zero wait time"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "3x Higher Engagement",
      description: "Personalized, timely communication keeps clients engaged throughout their journey. AI remembers every detail and crafts messages that resonate.",
      stat: "3x",
      statLabel: "more engagement",
      details: ["Personalized tone", "Context-aware", "Smart follow-ups"]
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Delight Every Client",
      description: "Deliver white-glove service at scale. Every client feels heard, valued, and attended to—with zero extra effort from your team.",
      stat: "98%",
      statLabel: "satisfaction rate",
      details: ["Consistent quality", "Proactive updates", "Never miss a message"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Convert More Conversations",
      description: "Turn chats into closings. AI identifies buying signals, handles objections, and schedules next steps to move deals forward automatically.",
      stat: "47%",
      statLabel: "more conversions",
      details: ["Intent detection", "Auto-scheduling", "Deal progression"]
    }
  ];

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] mb-4">
            <ThumbsUp className="w-4 h-4 text-[var(--color-primary-600)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-700)]">Engage 24/7 without effort</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] mb-4">
            Communication That Converts
          </h2>
          <p className="text-lg text-[var(--color-primary-700)]/70">
            Real business impact from smarter client conversations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-[var(--color-primary-50)] border border-[var(--color-primary-100)] hover:border-[var(--color-primary-300)] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-100)] rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-600)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary-600)]/20 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-bold text-[var(--color-primary-600)] block">{benefit.stat}</span>
                    <span className="text-xs font-bold text-[var(--color-primary-500)] uppercase tracking-wider">{benefit.statLabel}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[var(--color-primary-900)] mb-3 group-hover:text-[var(--color-primary-600)] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-primary-700)]/70 leading-relaxed mb-4">
                  {benefit.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {benefit.details.map((detail, idx) => (
                    <span key={idx} className="text-xs font-medium text-[var(--color-primary-600)] bg-[var(--color-primary-50)] px-3 py-1 rounded-full border border-[var(--color-primary-100)]">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. How It Works Section
const WorkflowSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Capture Inquiry",
      description: "AI detects incoming messages from any channel—website chat, email, phone call, or SMS—and instantly creates a unified conversation thread.",
      icon: <Inbox className="w-6 h-6" />,
      color: "from-[var(--color-primary-400)] to-[var(--color-primary-600)]"
    },
    {
      number: "02",
      title: "Analyze Intent",
      description: "Natural language processing identifies client needs, urgency, sentiment, and buying stage to determine the optimal response strategy.",
      icon: <Brain className="w-6 h-6" />,
      color: "from-[var(--color-secondary-400)] to-[var(--color-secondary-600)]"
    },
    {
      number: "03",
      title: "Respond Instantly",
      description: "AI crafts personalized replies across channels in milliseconds. Complex queries trigger smart handoffs to human agents with full context.",
      icon: <Send className="w-6 h-6" />,
      color: "from-[var(--color-primary-500)] to-[var(--color-primary-700)]"
    },
    {
      number: "04",
      title: "Continue Engagement",
      description: "Automated follow-ups maintain momentum. AI schedules check-ins, sends property updates, and nurtures leads until they're ready to convert.",
      icon: <Heart className="w-6 h-6" />,
      color: "from-[var(--color-secondary-500)] to-[var(--color-secondary-700)]"
    }
  ];

  return (
    <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-900)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-primary-600)] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-secondary-600)] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <MessageCircle className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-200)]">Always-On Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            From First Message to Final Close
          </h2>
          <p className="text-lg text-[var(--color-primary-200)]">
            Four steps to effortless client engagement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent z-0">
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                </div>
              )}
              
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[var(--color-primary-400)] transition-all duration-300 h-full z-10 group-hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-bold text-white/20 font-mono group-hover:text-white/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--color-primary-200)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[var(--color-primary-200)]/80 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Icons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <MessageSquare className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Chat</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Mail className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Email</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Phone className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">Voice</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Bell className="w-4 h-4 text-[var(--color-primary-200)]" />
            <span className="text-sm text-[var(--color-primary-200)]">SMS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. Final CTA Section
const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-700)] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">Your AI agents are standing by</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Connect with Every Client, Instantly
        </h2>
        <p className="text-xl text-[var(--color-primary-100)] mb-10 max-w-2xl mx-auto">
          Join 4,000+ real estate professionals who never miss a conversation. 
          Start communicating smarter today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="group w-full sm:w-auto px-10 py-5 bg-white text-[var(--color-primary-700)] rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Activate Smart Communication
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule a Demo
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-sm text-white/70">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
export default function SmartCommunicationPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <BenefitsSection />
      <WorkflowSection />
      <CTASection />
    </main>
  );
}