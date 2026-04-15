import { BarChart3, Calendar, Globe, MessageSquare, TrendingUp, Users, Bot, Sparkles, Zap, Brain, Shield, Clock } from 'lucide-react';

// AI Agent Features - Transformed for AI Landing Page
const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Autonomous Decision Making",
    description: "AI agents analyze market trends, guest preferences, and pricing data to make real-time optimization decisions without human intervention.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    aiBadge: "Self-Learning"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Intelligent Automation",
    description: "Deploy AI agents that handle bookings, guest communications, and staff coordination 24/7 with human-like contextual understanding.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    aiBadge: "24/7 Active"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Predictive Analytics",
    description: "Machine learning models forecast occupancy, revenue trends, and maintenance needs weeks in advance with 95%+ accuracy.",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    aiBadge: "95% Accuracy"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Conversational AI",
    description: "Natural language processing enables human-like guest interactions across 50+ languages with sentiment analysis and smart escalation.",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
    aiBadge: "50+ Languages"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Intelligence",
    description: "AI-powered fraud detection and risk assessment protect your properties from suspicious bookings and payment anomalies.",
    gradient: "from-slate-600 via-gray-600 to-zinc-600",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    aiBadge: "Real-time"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Dynamic Optimization",
    description: "Reinforcement learning algorithms continuously optimize pricing, availability, and marketing spend for maximum ROI.",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    aiBadge: "Auto-Optimizing"
  }
];

// Hero Robot Images (Replace these URLs with your actual robot images)
const robotImages = {
  hero: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop",
  floating1: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=200&h=200&fit=crop",
  floating2: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop"
};

function Features() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      {/* Background AI Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Floating Robot Decorations */}
      <div className="absolute top-20 left-10 opacity-10 animate-pulse hidden lg:block">
        <img 
          src={robotImages.floating1} 
          alt="AI Robot"
          className="w-32 h-32 object-cover rounded-2xl rotate-12 blur-sm"
        />
      </div>
      
      <div className="absolute bottom-40 right-10 opacity-10 animate-bounce hidden lg:block" style={{ animationDuration: '4s' }}>
        <img 
          src={robotImages.floating2} 
          alt="AI Assistant"
          className="w-28 h-28 object-cover rounded-2xl -rotate-12 blur-sm"
        />
      </div>

      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* AI Agent Header with Robot */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {/* Robot Standing on Badge */}
            <div className="relative flex flex-col items-center mb-6">
              <div className="relative z-10 mb-[-20px]">
                <div className="relative">
                  {/* <img 
                    src={robotImages.hero}
                    alt="AI Agent"
                    width={120}
                    height={120}
                    className="w-28 h-28 object-cover rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                  /> */}
                  {/* Glow Effect */}
                  {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-blue-500/20 to-transparent" /> */}
                  {/* Live Indicator */}
                  {/* <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse" /> */}
                </div>
              </div>
              
              {/* AI Badge - Acts as Platform */}
              <div className="relative z-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border border-blue-200 shadow-lg">
                {/* Platform line connecting to robot */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full" />
                
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                <span className="text-sm font-semibold text-blue-800">Next-Gen AI Agents</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              AI Agents That Manage
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Everything For You
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Deploy intelligent AI agents that learn your business, automate complex decisions, and operate your property management 24/7 with superhuman efficiency.
            </p>
          </div>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Feature Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-60 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* AI Badge on Image */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-800 shadow-lg">
                      {feature.aiBadge}
                    </span>
                  </div>

                  {/* Icon Floating on Image */}
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  
                  {/* AI Capability Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {idx === 0 && (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium">Neural Networks</span>
                        <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium">Deep Learning</span>
                      </>
                    )}
                    {idx === 1 && (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-medium">NLP Engine</span>
                        <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-600 text-xs font-medium">Zero Downtime</span>
                      </>
                    )}
                    {idx === 2 && (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 text-xs font-medium">Forecasting</span>
                        <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 text-xs font-medium">Pattern Recognition</span>
                      </>
                    )}
                    {idx === 3 && (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-pink-50 text-pink-600 text-xs font-medium">GPT-4 Powered</span>
                        <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 text-xs font-medium">Sentiment AI</span>
                      </>
                    )}
                    {idx === 4 && (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">Fraud Detection</span>
                        <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">Risk Scoring</span>
                      </>
                    )}
                    {idx === 5 && (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-violet-50 text-violet-600 text-xs font-medium">Reinforcement Learning</span>
                        <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 text-xs font-medium">Auto-ML</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Hover Glow Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              </div>
            ))}
          </div>

          {/* Bottom AI CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-lg">Deploy Your AI Agent Today</p>
                <p className="text-slate-400 text-sm">Setup takes less than 5 minutes</p>
              </div>
              <div className="ml-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;