"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Sparkles,
  Clock,
  CheckCheck,
  ChevronRight,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Calendar
} from 'lucide-react'

type Message = {
  id: string;
  type: string;
  text: string;
  time: string;
  quickReplies?: boolean;
  status?: string;
  showForm?: boolean; // Add this to track which message has the form
};

// Predefined quick replies
const QUICK_REPLIES = [
  { icon: Calendar, text: "Book a demo", color: "bg-blue-500" },
  { icon: Zap, text: "Pricing info", color: "bg-amber-500" },
  { icon: MessageCircle, text: "Talk to sales", color: "bg-emerald-500" },
  { icon: Sparkles, text: "Product features", color: "bg-violet-500" },
  { icon: Shield, text: "Support help", color: "bg-rose-500" },
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  type: 'bot',
  text: "👋 Welcome to EstateAI!\n\nI'm your AI assistant, here to help you discover how our intelligent agents can transform your real estate business.\n\nWhat brings you here today?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  quickReplies: true,
  showForm: false
}

// Feature highlights for the sidebar
const FEATURES = [
  { icon: Bot, title: "10+ AI Agents", desc: "Automate every workflow" },
  { icon: TrendingUp, title: "300% Efficiency", desc: "Average improvement" },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant" },
  { icon: Clock, title: "24/7 Support", desc: "Always available" },
]

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Form state - only show when AI triggers it
  const [activeFormMessageId, setActiveFormMessageId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [formFields, setFormFields] = useState<string[]>([]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleOpen = () => {
    setShowButton(false)
    setIsAnimating(true)
    setTimeout(() => {
      setIsOpen(true)
      setIsAnimating(false)
    }, 300)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setShowButton(true)
    }, 400)
  }

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    // USER MESSAGE (UI FORMAT)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      showForm: false
    };

    // Convert existing messages to API format
    const apiMessages = [
      ...messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: text },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);
    
    // Hide any previous form when user sends a new message
    setActiveFormMessageId(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      
      // console.log("API Response:", data);

      // Create bot message
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        type: "bot",
        text: data.aiMessage || "I apologize, I couldn't process that request.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        quickReplies: true,
        showForm: data.isDemo || false
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // If demo is requested, show form for this specific message
      if (data.isDemo) {
        setActiveFormMessageId(botMessageId);
        setFormFields(data.formFields || ["name", "email", "phone", "message"]);
      }

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "Something went wrong ❌. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          quickReplies: true,
          showForm: false
        },
      ]);
    }

    setIsTyping(false);
  };

const handleDemoSubmit = async () => {
  if (!name || !email || !phone) {
    alert("Please fill all required fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  try {
    const res = await fetch("/api/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        description,
      }),
    });

    const data = await res.json();

    // Check if request failed
    if (!data.success) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          text: `❌ ${data.error || "Failed to submit demo request. Please try again."}`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          quickReplies: true,
          showForm: false
        },
      ]);
      return;
    }

    // Success - show confirmation in chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "bot",
        text: "✅ Your demo request has been submitted!\n\n📧 Check your email for confirmation.\n\n⏰ Our team will contact you within 24 hours.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        quickReplies: true,
        showForm: false
      },
    ]);

    // Hide the form
    setActiveFormMessageId(null);
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setFormFields([]);

  } catch (err) {
    console.error(err);
    
    // Show error in chat instead of alert
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "bot",
        text: "❌ Something went wrong. Please try again or contact us directly at sales@estateai.com",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        quickReplies: true,
        showForm: false
      },
    ]);
  }
};

  const openWhatsApp = () => {
    const phone = "15551234567"
    const message = encodeURIComponent("Hi! I chatted with your AI assistant and have some questions.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  // Button visible state
  if (showButton && !isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Pulse Effect Behind Button */}
        <div className="absolute inset-0 rounded-full bg-[#0066cc] animate-ping opacity-20" />
        <div className="absolute inset-0 rounded-full bg-[#0066cc] animate-pulse opacity-10" />
        
        {/* Main Button */}
        <button
          onClick={handleOpen}
          className="relative group flex items-center gap-3 pr-4 pl-4 sm:pr-6 sm:pl-4 py-4 bg-gradient-to-r from-[#0066cc]/60 to-[#0052a3]/60 rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0066cc] animate-pulse" />
          </div>
          <span className="hidden sm:block text-white font-semibold text-sm whitespace-nowrap">
            Chat with us
          </span>
          
          {/* Hover Expand */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
              Start conversation
              <ArrowRight className="inline w-3 h-3 ml-1" />
            </div>
          </div>
        </button>

        {/* Notification Badge */}
        <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce border-2 border-white">
          1
        </div>
      </div>
    )
  }

  // Full Screen Chatbot
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 transition-all duration-500 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500"
        onClick={handleClose}
      />

      {/* Main Chat Container */}
      <div className={`relative w-full max-w-6xl h-[100vh] sm:h-[90vh] bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex transition-all duration-500 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
      }`}>
        
        {/* Left Sidebar - Info Panel */}
        <div className="hidden lg:flex w-80 bg-gradient-to-br from-slate-900 to-slate-800 flex-col text-white p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">EstateAI</h2>
              <p className="text-slate-400 text-xs">AI-Powered Real Estate</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Why EstateAI?</p>
            <div className="space-y-4">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#0066cc] transition-colors">
                    <feature.icon className="w-5 h-5 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                    <p className="text-slate-400 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              "The demo was incredible. We deployed in 3 weeks and saw 300% improvement."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0066cc] rounded-full flex items-center justify-center text-xs font-bold">
                PM
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Priya Mehta</p>
                <p className="text-slate-400">Head of Operations</p>
              </div>
            </div>
          </div>

          {/* Close Button Mobile (hidden on desktop) */}
          <button 
            onClick={handleClose}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-100 px-3 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-3 border-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">EstateAI Assistant</h3>
                <p className="text-green-600 text-xs sm:text-sm flex items-center gap-1.5">
                  <span className="min-w-2 min-h-2 bg-green-500 rounded-full animate-pulse" />
                  Online now · Typically replies instantly
                </p>
              </div>
            </div>
  
            <div className="flex items-center gap-3">
              <button 
                onClick={openWhatsApp}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto sm:p-6 space-y-4 sm:space-y-6">
            {/* Date Divider */}
            <div className="flex items-center justify-center">
              <div className="bg-gray-200 h-px flex-1" />
              <span className="px-4 text-xs text-gray-400 font-medium">Today</span>
              <div className="bg-gray-200 h-px flex-1" />
            </div>

            {messages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[90%] sm:max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  {msg.type === 'bot' ? (
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}

                  {/* Message Bubble + Form Container */}
                  <div className="flex flex-col gap-3">
                    {/* Message Bubble */}
                    <div className={`relative px-3 sm:px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-[#0066cc] text-white rounded-br-md' 
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                    }`}>
                      <div className="whitespace-pre-line">{msg.text}</div>
                      
                      {/* Time & Status */}
                      <div className={`flex items-center gap-1 mt-2 text-[11px] ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        <span>{msg.time}</span>
                        {msg.type === 'user' && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>

                    {/* Demo Form - Only show if this specific message triggered it */}
                    {msg.type === 'bot' && activeFormMessageId === msg.id && (
                      <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 w-full sm:w-[350px]">
                        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#0066cc]" />
                          Book a Demo
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">Fill in your details and we'll contact you shortly.</p>

                        <div className="space-y-3">
                          {formFields.includes("name") && (
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Name *</label>
                              <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                              />
                            </div>
                          )}

                          {formFields.includes("email") && (
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Email *</label>
                              <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                              />
                            </div>
                          )}

                          {formFields.includes("phone") && (
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Phone *</label>
                              <input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                              />
                            </div>
                          )}

                          {formFields.includes("message") && (
                            <div>
                              <label className="text-xs font-medium text-gray-700 block mb-1">Message (Optional)</label>
                              <textarea
                                placeholder="Tell us about your requirements..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all"
                              />
                            </div>
                          )}

                          <button
                            onClick={handleDemoSubmit}
                            className="w-full bg-[#0066cc] hover:bg-[#0052a3] text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Submit Request
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0066cc] to-[#0052a3] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-5 py-4 border border-gray-100 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages[messages.length - 1]?.quickReplies && !isTyping && !activeFormMessageId && (
              <div className="flex flex-wrap gap-2 pl-14">
                {QUICK_REPLIES.map((reply) => {
                  const Icon = reply.icon
                  return (
                    <button
                      key={reply.text}
                      onClick={() => handleSendMessage(reply.text)}
                      className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#0066cc] hover:text-[#0066cc] transition-all shadow-sm hover:shadow-md"
                    >
                      <div className={`w-6 h-6 ${reply.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium">{reply.text}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </button>
                  )
                })}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-100 p-3 sm:p-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={activeFormMessageId ? "Type your message or fill the form above..." : "Type your message..."}
                  className="w-full pl-5 pr-12 py-4 bg-gray-100 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:bg-white transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0066cc] text-white rounded-full flex items-center justify-center hover:bg-[#0052a3] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="hidden sm:flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">Prefer WhatsApp?</span>
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Continue on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}