"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, HelpCircle, MessageSquare, Phone, Mail, Video, FileText,
  ChevronDown, ChevronRight, ChevronUp, CheckCircle2, AlertCircle,
  Clock, Zap, Shield, Database, Globe, Settings, Users, BarChart3,
  Smartphone, Laptop, Tablet, Monitor, Wifi, Cloud, Lock, Key,
  RefreshCw, Download, ExternalLink, ArrowRight, ArrowLeft,
  ThumbsUp, ThumbsDown, Copy, Check, X, Menu, Bell, User,
  Home, LayoutGrid, BookOpen, Code2, Terminal, Bug, Wrench,
  Lightbulb, AlertTriangle, Info, PlayCircle, Headphones,
  MessageCircle, Send, Star, Bookmark, History, TrendingUp,
  Activity, PieChart, LineChart, BarChart, Gauge, Layers,
  Box, Package, Truck, CreditCard, Receipt, Calculator,
  Calendar, Clock3, MapPin, Navigation, Compass, Target,
  Crosshair, Focus, Scan, SearchIcon, Filter, SortAsc,
  MoreHorizontal, Share2, Flag, Heart, Eye, EyeOff,
  Sliders, ToggleLeft, ToggleRight, Radio, CheckSquare,
  Square, Circle, Triangle, Hexagon, Octagon, StarIcon,
  ZapIcon, Flame, Snowflake, Sun, Moon, CloudRain,
  Wind, Droplets, Thermometer, GaugeIcon, Scale,
  Ruler, CompassIcon, Map, NavigationIcon, Locate,
  LocateFixed, MapPinIcon, Navigation2,
  Play
} from 'lucide-react';

// --- Types ---

type Category = 'getting-started' | 'account' | 'billing' | 'technical' | 'integrations' | 'security' | 'api' | 'mobile';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: Category;
  helpful: number;
  notHelpful: number;
  relatedArticles: string[];
  lastUpdated: string;
}

interface TroubleshootingGuide {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  solutions: Solution[];
  category: Category;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  tools: string[];
}

interface Solution {
  step: number;
  title: string;
  instructions: string[];
  code?: string;
  screenshot?: string;
  warning?: string;
  tip?: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
  popular: boolean;
}

interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: Category;
}

// --- Mock Data (Overloaded) ---

const categories = [
  { id: 'all', name: 'All Topics', count: 156, icon: LayoutGrid },
  { id: 'getting-started', name: 'Getting Started', count: 24, icon: PlayCircle },
  { id: 'account', name: 'Account & Profile', count: 18, icon: User },
  { id: 'billing', name: 'Billing & Plans', count: 22, icon: CreditCard },
  { id: 'technical', name: 'Technical Issues', count: 35, icon: Bug },
  { id: 'integrations', name: 'Integrations', count: 28, icon: Layers },
  { id: 'security', name: 'Security & Privacy', count: 15, icon: Shield },
  { id: 'api', name: 'API & Developers', count: 19, icon: Code2 },
  { id: 'mobile', name: 'Mobile Apps', count: 12, icon: Smartphone },
];

const quickActions: QuickAction[] = [
  { id: 'reset-password', title: 'Reset Password', description: 'Recover account access', icon: Key, action: '/reset-password', popular: true },
  { id: 'contact-support', title: 'Contact Support', description: 'Get personalized help', icon: Headphones, action: '/contact', popular: true },
  { id: 'system-status', title: 'System Status', description: 'Check service health', icon: Activity, action: '/status', popular: false },
  { id: 'api-docs', title: 'API Documentation', description: 'Developer resources', icon: Terminal, action: '/api-docs', popular: false },
  { id: 'video-tutorials', title: 'Video Tutorials', description: 'Step-by-step guides', icon: Video, action: '/tutorials', popular: true },
  { id: 'community', title: 'Community Forum', description: 'Ask other users', icon: MessageSquare, action: '/community', popular: false },
  { id: 'feature-request', title: 'Feature Request', description: 'Suggest improvements', icon: Lightbulb, action: '/feedback', popular: false },
  { id: 'report-bug', title: 'Report a Bug', description: 'Submit an issue', icon: Bug, action: '/bug-report', popular: false },
];

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I reset my password if I forgot my email address?',
    answer: 'If you\'ve forgotten both your password and the email address associated with your account, please contact our support team with the following information: your full name, company name, phone number, and any invoice numbers you may have. We\'ll verify your identity and help you regain access. This process typically takes 24-48 hours for security purposes.',
    category: 'account',
    helpful: 342,
    notHelpful: 12,
    relatedArticles: ['account-recovery', 'two-factor-authentication', 'security-best-practices'],
    lastUpdated: '2 days ago'
  },
  {
    id: 'faq-2',
    question: 'What payment methods are accepted for enterprise plans?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, bank transfers (ACH/wire), and checks for annual enterprise plans. For invoices over $10,000, we also support purchase orders with net-30 terms. Cryptocurrency payments (Bitcoin, Ethereum) are available upon request for annual subscriptions.',
    category: 'billing',
    helpful: 567,
    notHelpful: 23,
    relatedArticles: ['enterprise-billing', 'invoice-management', 'tax-documents'],
    lastUpdated: '1 week ago'
  },
  {
    id: 'faq-3',
    question: 'How can I export my data if I decide to cancel?',
    answer: 'You can export all your data at any time from Settings > Data Management > Export. We provide exports in CSV, JSON, and SQL formats. Your data remains accessible for 30 days after cancellation. For enterprise customers, we offer dedicated data migration assistance and can provide custom export formats including direct database dumps.',
    category: 'account',
    helpful: 892,
    notHelpful: 45,
    relatedArticles: ['data-export', 'gdpr-compliance', 'data-retention'],
    lastUpdated: '3 days ago'
  },
  {
    id: 'faq-4',
    question: 'Why is my dashboard loading slowly?',
    answer: 'Slow dashboard performance can be caused by several factors: browser cache (try Ctrl+Shift+R), too many active widgets (limit to 6-8), large date ranges in reports, or network issues. Check our status page for known incidents. For persistent issues, try disabling browser extensions or use our desktop app which offers 3x better performance.',
    category: 'technical',
    helpful: 1234,
    notHelpful: 89,
    relatedArticles: ['performance-optimization', 'browser-requirements', 'desktop-app'],
    lastUpdated: '5 days ago'
  },
  {
    id: 'faq-5',
    question: 'How do I set up two-factor authentication (2FA)?',
    answer: 'Go to Settings > Security > Two-Factor Authentication. You can enable 2FA via authenticator app (Google Authenticator, Authy, Microsoft Authenticator) or SMS. We strongly recommend using an authenticator app as it\'s more secure. After setup, you\'ll receive backup codes—store these safely as they\'re the only way to recover your account if you lose your device.',
    category: 'security',
    helpful: 2156,
    notHelpful: 34,
    relatedArticles: ['2fa-setup', 'backup-codes', 'security-keys'],
    lastUpdated: '1 day ago'
  },
  {
    id: 'faq-6',
    question: 'Can I integrate with my existing Salesforce instance?',
    answer: 'Yes, we offer a native Salesforce integration with bidirectional sync. Go to Integrations > Salesforce to connect. The integration supports: Contact/Account sync, Opportunity mapping, Custom field mapping, and Real-time webhooks. Enterprise plans include dedicated integration support and custom mapping assistance.',
    category: 'integrations',
    helpful: 678,
    notHelpful: 56,
    relatedArticles: ['salesforce-setup', 'field-mapping', 'webhook-configuration'],
    lastUpdated: '2 weeks ago'
  },
  {
    id: 'faq-7',
    question: 'What are the API rate limits?',
    answer: 'Rate limits vary by plan: Starter (100 requests/min), Professional (500/min), Enterprise (2000/min), and Unlimited (5000/min). Rate limits are enforced per API key with a sliding window. You\'ll receive 429 status codes when exceeded. Enterprise customers can request custom limits. We recommend implementing exponential backoff in your applications.',
    category: 'api',
    helpful: 445,
    notHelpful: 23,
    relatedArticles: ['api-rate-limits', 'error-handling', 'best-practices'],
    lastUpdated: '4 days ago'
  },
  {
    id: 'faq-8',
    question: 'How do I migrate from HubSpot?',
    answer: 'We offer a guided migration tool for HubSpot users. Access it at Settings > Data Import > HubSpot Migration. The tool migrates: Contacts, Companies, Deals, Tickets, Emails, and Notes. Custom properties are mapped automatically. The process typically takes 2-4 hours depending on data size. Our migration team is available for complex enterprise migrations.',
    category: 'getting-started',
    helpful: 334,
    notHelpful: 18,
    relatedArticles: ['hubspot-migration', 'data-mapping', 'validation'],
    lastUpdated: '1 week ago'
  },
  {
    id: 'faq-9',
    question: 'Is my data encrypted at rest and in transit?',
    answer: 'Yes, security is our top priority. All data is encrypted in transit using TLS 1.3 and at rest using AES-256. We use HSMs (Hardware Security Modules) for key management. Enterprise plans offer customer-managed encryption keys (CMEK). Our infrastructure is SOC 2 Type II, ISO 27001, and GDPR compliant. Regular penetration testing is performed by third-party security firms.',
    category: 'security',
    helpful: 1567,
    notHelpful: 12,
    relatedArticles: ['security-whitepaper', 'compliance', 'encryption'],
    lastUpdated: '3 weeks ago'
  },
  {
    id: 'faq-10',
    question: 'How do I troubleshoot mobile app sync issues?',
    answer: 'For sync issues on mobile: 1) Check internet connection, 2) Force close and reopen app, 3) Clear app cache (Settings > Storage), 4) Ensure you\'re on latest app version, 5) Try logging out and back in. For persistent issues, enable debug logging in Settings > Advanced > Diagnostics and send logs to support. iOS and Android specific guides available.',
    category: 'mobile',
    helpful: 892,
    notHelpful: 67,
    relatedArticles: ['mobile-troubleshooting', 'sync-issues', 'offline-mode'],
    lastUpdated: '5 days ago'
  },
  {
    id: 'faq-11',
    question: 'Can I create custom reports and dashboards?',
    answer: 'Absolutely! Our report builder supports drag-and-drop customization with 50+ visualization types. Create custom metrics using our formula engine, schedule automated report delivery, and build real-time dashboards. Enterprise users get access to SQL query builder for advanced analytics. All reports can be exported to PDF, Excel, or via API.',
    category: 'getting-started',
    helpful: 723,
    notHelpful: 29,
    relatedArticles: ['report-builder', 'custom-metrics', 'dashboard-sharing'],
    lastUpdated: '1 week ago'
  },
  {
    id: 'faq-12',
    question: 'What happens when I exceed my plan limits?',
    answer: 'We never hard-stop your service. When approaching limits, you\'ll receive email notifications at 80%, 90%, and 100% usage. At 100%, you have a 7-day grace period to upgrade or optimize usage. During grace period, all features remain active. After 7 days, non-essential features are paused but core CRM functions continue working.',
    category: 'billing',
    helpful: 445,
    notHelpful: 34,
    relatedArticles: ['plan-limits', 'usage-monitoring', 'upgrade-process'],
    lastUpdated: '2 weeks ago'
  }
];

const troubleshootingGuides: TroubleshootingGuide[] = [
  {
    id: 'guide-1',
    title: 'Email Integration Not Syncing',
    description: 'Resolve issues with Gmail/Outlook integration, missing emails, or sync delays',
    symptoms: [
      'Emails not appearing in CRM',
      'Sync stuck or showing "in progress"',
      'Duplicate emails being created',
      'Attachments not syncing',
      'Calendar events not updating'
    ],
    category: 'integrations',
    difficulty: 'medium',
    estimatedTime: '15-20 minutes',
    tools: ['Admin access', 'Browser console', 'Email client access'],
    solutions: [
      {
        step: 1,
        title: 'Verify Connection Status',
        instructions: [
          'Navigate to Settings > Integrations > Email',
          'Check if status shows "Connected" with green indicator',
          'If disconnected, click "Reconnect" and re-authorize',
          'Ensure you\'re logged into correct email account'
        ],
        tip: 'Use incognito mode to avoid cookie conflicts during re-authorization'
      },
      {
        step: 2,
        title: 'Check API Permissions',
        instructions: [
          'Go to your Google/Microsoft account security settings',
          'Review third-party app permissions',
          'Ensure "ibigdata CRM" has email, calendar, and contacts access',
          'Remove and re-add permissions if necessary'
        ],
        warning: 'Revoking permissions will pause sync until re-authorized'
      },
      {
        step: 3,
        title: 'Clear Sync Cache',
        instructions: [
          'In CRM, go to Settings > Advanced > Cache Management',
          'Click "Clear Email Sync Cache"',
          'Wait 2-3 minutes for cache rebuild',
          'Check recent emails section for updates'
        ],
        code: 'curl -X POST https://api.ibigdata.com/v1/sync/clear-cache \\\n  -H "Authorization: Bearer YOUR_TOKEN" \\\n  -d \'{"type": "email"}\''
      },
      {
        step: 4,
        title: 'Check Filters and Rules',
        instructions: [
          'Review email sync filters in Settings',
          'Ensure no filters are blocking desired emails',
          'Check "Excluded domains" list',
          'Verify date range settings (default: last 90 days)'
        ]
      }
    ]
  },
  {
    id: 'guide-2',
    title: 'API 429 Rate Limit Errors',
    description: 'Diagnose and resolve API throttling issues, optimize request patterns',
    symptoms: [
      'Receiving HTTP 429 errors',
      'Requests timing out',
      'Webhook delays',
      'Integration sync failures',
      'Batch operations failing'
    ],
    category: 'api',
    difficulty: 'hard',
    estimatedTime: '30-45 minutes',
    tools: ['API logs', 'Postman/curl', 'Server access', 'Monitoring tools'],
    solutions: [
      {
        step: 1,
        title: 'Identify Rate Limit Type',
        instructions: [
          'Check response headers: X-RateLimit-Limit, X-RateLimit-Remaining',
          'Determine if hitting per-minute, per-hour, or per-day limits',
          'Review API dashboard for usage patterns',
          'Identify which endpoints are most frequently called'
        ],
        code: 'const headers = response.headers;\nconsole.log("Limit:", headers.get("X-RateLimit-Limit"));\nconsole.log("Remaining:", headers.get("X-RateLimit-Remaining"));\nconsole.log("Reset:", headers.get("X-RateLimit-Reset"));'
      },
      {
        step: 2,
        title: 'Implement Exponential Backoff',
        instructions: [
          'Add retry logic with increasing delays',
          'Start with 1 second delay, double each retry',
          'Maximum retry count: 5',
          'Log all retry attempts for monitoring'
        ],
        code: 'async function apiCallWithRetry(url, options, maxRetries = 5) {\n  for (let i = 0; i < maxRetries; i++) {\n    try {\n      const response = await fetch(url, options);\n      if (response.status !== 429) return response;\n      const delay = Math.pow(2, i) * 1000;\n      await new Promise(r => setTimeout(r, delay));\n    } catch (err) {\n      if (i === maxRetries - 1) throw err;\n    }\n  }\n}'
      },
      {
        step: 3,
        title: 'Optimize Request Patterns',
        instructions: [
          'Batch multiple operations into single requests',
          'Use bulk endpoints: POST /v1/bulk/contacts',
          'Implement request queuing',
          'Cache frequently accessed data locally',
          'Use webhooks instead of polling'
        ],
        tip: 'Bulk endpoints support up to 500 records per request, reducing API calls by 99%'
      },
      {
        step: 4,
        title: 'Upgrade or Request Limit Increase',
        instructions: [
          'Review current plan limits in Billing > Usage',
          'Calculate required rate limit based on usage patterns',
          'Contact support for temporary limit increase',
          'Consider upgrading to Enterprise for 10x higher limits'
        ]
      }
    ]
  },
  {
    id: 'guide-3',
    title: 'Mobile App Crashing on Startup',
    description: 'Fix iOS and Android app crashes, white screens, and startup failures',
    symptoms: [
      'App closes immediately after opening',
      'Stuck on splash screen',
      'White/blank screen after login',
      'Crash when opening specific features',
      'App freezing during sync'
    ],
    category: 'mobile',
    difficulty: 'easy',
    estimatedTime: '10-15 minutes',
    tools: ['Mobile device', 'App store access', 'WiFi connection'],
    solutions: [
      {
        step: 1,
        title: 'Force Close and Restart',
        instructions: [
          'iOS: Double-tap home button, swipe up on app',
          'Android: Open app switcher, swipe away app',
          'Wait 10 seconds before reopening',
          'Test on both WiFi and cellular data'
        ]
      },
      {
        step: 2,
        title: 'Clear App Cache and Data',
        instructions: [
          'iOS: Settings > General > iPhone Storage > [App] > Offload App',
          'Android: Settings > Apps > [App] > Storage > Clear Cache',
          'Do NOT clear data unless cache clear fails',
          'Reinstall app if issues persist'
        ],
        warning: 'Clearing data will remove offline content and require re-login'
      },
      {
        step: 3,
        title: 'Check for Updates',
        instructions: [
          'Open App Store (iOS) or Play Store (Android)',
          'Search for "ibigdata CRM"',
          'Tap "Update" if available',
          'Enable auto-updates for future'
        ],
        tip: 'Critical fixes are often released in minor updates (x.x.1)'
      },
      {
        step: 4,
        title: 'Enable Debug Mode and Report',
        instructions: [
          'Open app and immediately tap logo 5 times',
          'Debug menu will appear',
          'Tap "Send Logs to Support"',
          'Include device model and OS version in description'
        ]
      }
    ]
  },
  {
    id: 'guide-4',
    title: 'Report Generation Timeout',
    description: 'Resolve slow or failing reports, optimize large dataset queries',
    symptoms: [
      'Report spinning indefinitely',
      '504 Gateway Timeout errors',
      'Browser crash when exporting',
      'Partial data in exported files',
      'Dashboard widgets showing "Loading..."'
    ],
    category: 'technical',
    difficulty: 'medium',
    estimatedTime: '20-30 minutes',
    tools: ['Admin access', 'Browser dev tools', 'Report builder access'],
    solutions: [
      {
        step: 1,
        title: 'Reduce Date Range and Filters',
        instructions: [
          'Change date range from "All time" to specific period',
          'Limit to 90 days maximum for large datasets',
          'Apply specific filters instead of "All"',
          'Remove unnecessary columns from report'
        ],
        tip: 'Reports with >100k records should use scheduled exports instead of real-time'
      },
      {
        step: 2,
        title: 'Use Scheduled Reports',
        instructions: [
          'Convert real-time report to scheduled',
          'Set frequency: Daily, Weekly, or Monthly',
          'Choose off-peak hours (2-6 AM)',
          'Reports will be pre-generated and emailed'
        ]
      },
      {
        step: 3,
        title: 'Optimize Report Structure',
        instructions: [
          'Break complex reports into multiple simpler ones',
          'Use summary reports instead of detail reports',
          'Limit grouping to 2-3 levels maximum',
          'Avoid cross-object formulas on large datasets'
        ]
      },
      {
        step: 4,
        title: 'Check Database Performance',
        instructions: [
          'Go to Settings > System > Performance',
          'Review "Slow Query Log"',
          'Identify reports taking >30 seconds',
          'Contact support for query optimization'
        ],
        code: '-- Contact support with these details:\nReport ID: [ID from URL]\nExecution Time: [from performance log]\nRecord Count: [approximate]\nFilters Applied: [list]'
      }
    ]
  },
  {
    id: 'guide-5',
    title: 'Webhook Delivery Failures',
    description: 'Debug webhook endpoint issues, fix signature verification errors',
    symptoms: [
      'Webhooks not firing',
      'Endpoint returning 400/500 errors',
      'Signature verification failing',
      'Duplicate webhook deliveries',
      'Missing webhook payloads'
    ],
    category: 'api',
    difficulty: 'hard',
    estimatedTime: '45-60 minutes',
    tools: ['Webhook logs', 'Endpoint server access', 'SSL certificate', 'ngrok for testing'],
    solutions: [
      {
        step: 1,
        title: 'Verify Endpoint Configuration',
        instructions: [
          'Check webhook URL is publicly accessible',
          'Ensure HTTPS with valid SSL certificate',
          'Verify endpoint returns 200 OK quickly (<5s)',
          'Test with webhook.site or similar tool'
        ],
        code: 'curl -X POST https://your-endpoint.com/webhook \\\n  -H "Content-Type: application/json" \\\n  -d \'{"test": true}\' \\\n  -w "HTTP Status: %{http_code}\\n"'
      },
      {
        step: 2,
        title: 'Check Signature Verification',
        instructions: [
          'Retrieve webhook secret from dashboard',
          'Verify HMAC-SHA256 signature calculation',
          'Ensure raw body is used, not parsed JSON',
          'Check timestamp is within 5 minutes'
        ],
        code: 'const crypto = require("crypto");\n\nfunction verifySignature(payload, signature, secret) {\n  const expected = crypto\n    .createHmac("sha256", secret)\n    .update(payload, "utf8")\n    .digest("hex");\n  return crypto.timingSafeEqual(\n    Buffer.from(signature),\n    Buffer.from(expected)\n  );\n}'
      },
      {
        step: 3,
        title: 'Review Retry Logic',
        instructions: [
          'Check webhook logs for failed deliveries',
          'Review retry schedule: 1m, 5m, 25m, 2h, 6h',
          'Ensure endpoint handles idempotency',
          'Check for IP blocking or rate limiting'
        ],
        warning: 'After 5 failed retries, webhook will be auto-disabled. Re-enable manually.'
      },
      {
        step: 4,
        title: 'Implement Proper Error Handling',
        instructions: [
          'Return 200 OK immediately upon receipt',
          'Process payload asynchronously',
          'Log all webhook events for debugging',
          'Set up monitoring and alerting'
        ],
        code: 'app.post("/webhook", (req, res) => {\n  // Acknowledge immediately\n  res.status(200).send("OK");\n  \n  // Process asynchronously\n  processWebhook(req.body)\n    .catch(err => logger.error("Webhook failed", err));\n});'
      }
    ]
  }
];

const videoTutorials: VideoTutorial[] = [
  { id: 'v1', title: 'Getting Started in 5 Minutes', duration: '5:23', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop', category: 'getting-started' },
  { id: 'v2', title: 'Advanced Search Techniques', duration: '8:45', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop', category: 'getting-started' },
  { id: 'v3', title: 'Building Custom Dashboards', duration: '12:30', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop', category: 'technical' },
  { id: 'v4', title: 'API Authentication Guide', duration: '15:20', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop', category: 'api' },
];

// --- Components ---

const CategoryBadge = ({ category }: { category: Category }) => {
  const colors: Record<Category, string> = {
    'getting-started': 'bg-emerald-100 text-emerald-700',
    'account': 'bg-blue-100 text-blue-700',
    'billing': 'bg-amber-100 text-amber-700',
    'technical': 'bg-rose-100 text-rose-700',
    'integrations': 'bg-purple-100 text-purple-700',
    'security': 'bg-cyan-100 text-cyan-700',
    'api': 'bg-indigo-100 text-indigo-700',
    'mobile': 'bg-pink-100 text-pink-700'
  };
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[category]}`}>
      {category.replace('-', ' ')}
    </span>
  );
};

const DifficultyBadge = ({ level }: { level: TroubleshootingGuide['difficulty'] }) => {
  const colors = {
    easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    hard: 'bg-rose-100 text-rose-700 border-rose-200'
  };
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${colors[level]}`}>
      {level}
    </span>
  );
};

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>('faq-1');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'faqs' | 'troubleshooting' | 'videos'>('faqs');
  const [showContactModal, setShowContactModal] = useState(false);

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGuides = troubleshootingGuides.filter(guide => {
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen text-[var(--text-primary)]">
      <Head>
        <title>Help Center | ibigdata Support</title>
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-secondary-600)] pt-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-primary-50)]">How can we help you?</h1>
            <p className="text-lg text-white/80 mb-8">Search our knowledge base, browse FAQs, or troubleshoot technical issues</p>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
              <input
                type="text"
                placeholder="Search for answers, guides, or error messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all text-lg"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/20 rounded-lg text-sm hidden md:block">
                ⌘K
              </kbd>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <span className="text-sm text-white/60">Popular:</span>
              {['Password reset', 'API limits', 'Email sync', 'Billing'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-sm text-white/80 hover:text-white underline underline-offset-4 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.slice(0, 4).map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ y: -4 }}
              className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <action.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">{action.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Navigation Tabs */}
              <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] p-2">
                {[
                  { id: 'faqs', label: 'FAQs', icon: HelpCircle, count: faqs.length },
                  { id: 'troubleshooting', label: 'Troubleshooting', icon: Wrench, count: troubleshootingGuides.length },
                  { id: 'videos', label: 'Video Guides', icon: Video, count: videoTutorials.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </div>
                    <span className={`text-xs ${activeTab === tab.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-3 px-2">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        activeCategory === cat.id
                          ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`} />
                        {cat.name}
                      </div>
                      <span className={`text-xs ${activeCategory === cat.id ? 'text-[var(--color-primary-600)]' : 'text-[var(--text-tertiary)]'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-4 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] rounded-xl border border-[var(--color-primary-200)]">
                <h4 className="font-bold text-[var(--text-primary)] mb-2">Still need help?</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-3">Our support team is available 24/7</p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Frequently Asked Questions
                    {activeCategory !== 'all' && (
                      <span className="ml-2 text-sm font-normal text-[var(--text-secondary)]">
                        in {categories.find(c => c.id === activeCategory)?.name}
                      </span>
                    )}
                  </h2>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {filteredFAQs.length} results
                  </span>
                </div>

                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full flex items-start gap-4 p-5 text-left hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-[var(--color-primary-600)]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-medium text-[var(--text-primary)] pr-4">{faq.question}</h3>
                          <CategoryBadge category={faq.category} />
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pl-14">
                            <div className="prose prose-slate max-w-none text-[var(--text-secondary)] leading-relaxed">
                              {faq.answer}
                            </div>

                            <div className="mt-6 pt-4 border-t border-[var(--border-light)]">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-[var(--text-tertiary)]">Was this helpful?</span>
                                  <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-emerald-600 transition-colors">
                                    <ThumbsUp className="w-4 h-4" /> {faq.helpful}
                                  </button>
                                  <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-rose-600 transition-colors">
                                    <ThumbsDown className="w-4 h-4" /> {faq.notHelpful}
                                  </button>
                                </div>
                                <span className="text-xs text-[var(--text-tertiary)]">
                                  Updated {faq.lastUpdated}
                                </span>
                              </div>

                              {faq.relatedArticles.length > 0 && (
                                <div className="mt-4">
                                  <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2">Related Articles</p>
                                  <div className="flex flex-wrap gap-2">
                                    {faq.relatedArticles.map((article) => (
                                      <a
                                        key={article}
                                        href={`#${article}`}
                                        className="text-sm text-[var(--color-primary-600)] hover:underline flex items-center gap-1"
                                      >
                                        <FileText className="w-3 h-3" />
                                        {article.replace('-', ' ')}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Troubleshooting Tab */}
            {activeTab === 'troubleshooting' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Troubleshooting Guides
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-secondary)]">Sort by:</span>
                    <select className="text-sm border border-[var(--border-medium)] rounded-lg px-3 py-1.5 bg-[var(--bg-primary)] text-[var(--text-primary)]">
                      <option>Most Popular</option>
                      <option>Recently Updated</option>
                      <option>Difficulty: Easy First</option>
                    </select>
                  </div>
                </div>

                {filteredGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CategoryBadge category={guide.category} />
                            <DifficultyBadge level={guide.difficulty} />
                          </div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{guide.title}</h3>
                          <p className="text-[var(--text-secondary)]">{guide.description}</p>
                        </div>
                        <button
                          onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                          className="flex-shrink-0 px-4 py-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          {expandedGuide === guide.id ? 'Close Guide' : 'Start Troubleshooting'}
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {guide.estimatedTime}</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {guide.solutions.length} steps</span>
                        <span className="flex items-center gap-1"><Wrench className="w-4 h-4" /> {guide.tools.join(', ')}</span>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2">Symptoms:</p>
                        <div className="flex flex-wrap gap-2">
                          {guide.symptoms.map((symptom, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full text-xs"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedGuide === guide.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-[var(--border-light)]"
                        >
                          <div className="p-6 bg-[var(--bg-secondary)]">
                            <div className="space-y-6">
                              {guide.solutions.map((solution) => (
                                <div key={solution.step} className="relative pl-8 pb-6 last:pb-0">
                                  {/* Step connector line */}
                                  {solution.step < guide.solutions.length && (
                                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-[var(--border-medium)]" />
                                  )}
                                  
                                  {/* Step number */}
                                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[var(--color-primary-600)] text-white flex items-center justify-center text-xs font-bold">
                                    {solution.step}
                                  </div>

                                  <div className="bg-[var(--bg-primary)] rounded-xl p-5 border border-[var(--border-light)]">
                                    <h4 className="font-bold text-[var(--text-primary)] mb-3">{solution.title}</h4>
                                    
                                    <ul className="space-y-2 mb-4">
                                      {solution.instructions.map((instruction, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-400)] mt-2 flex-shrink-0" />
                                          {instruction}
                                        </li>
                                      ))}
                                    </ul>

                                    {solution.warning && (
                                      <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                        <p className="text-sm text-amber-800">{solution.warning}</p>
                                      </div>
                                    )}

                                    {solution.tip && (
                                      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                                        <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <p className="text-sm text-blue-800">{solution.tip}</p>
                                      </div>
                                    )}

                                    {solution.code && (
                                      <div className="relative">
                                        <pre className="bg-slate-900 text-blue-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                                          <code>{solution.code}</code>
                                        </pre>
                                        <button 
                                          className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white transition-colors"
                                          onClick={() => navigator.clipboard.writeText(solution.code || '')}
                                        >
                                          <Copy className="w-4 h-4" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-[var(--border-medium)] text-center">
                              <p className="text-[var(--text-secondary)] mb-4">Did this solve your issue?</p>
                              <div className="flex items-center justify-center gap-3">
                                <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4" /> Yes, problem solved!
                                </button>
                                <button className="px-6 py-2 border border-[var(--border-medium)] hover:bg-[var(--bg-primary)] rounded-lg font-medium text-[var(--text-secondary)] transition-colors">
                                  No, contact support
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="grid md:grid-cols-2 gap-6">
                {videoTutorials.map((video) => (
                  <div
                    key={video.id}
                    className="group bg-[var(--bg-primary)] rounded-xl border border-[var(--border-light)] overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative aspect-video">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-[var(--color-primary-600)] fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <CategoryBadge category={video.category} />
                      <h3 className="font-semibold text-[var(--text-primary)] mt-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[var(--bg-primary)] rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Contact Support</h3>
                <button onClick={() => setShowContactModal(false)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg">
                  <X className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: MessageSquare, label: 'Live Chat', desc: 'Avg. 2 min response' },
                    { icon: Mail, label: 'Email', desc: '24 hour response' },
                    { icon: Phone, label: 'Phone', desc: 'Enterprise only' }
                  ].map((option) => (
                    <button
                      key={option.label}
                      className="p-4 border border-[var(--border-medium)] rounded-xl hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-50)] transition-all text-center"
                    >
                      <option.icon className="w-6 h-6 text-[var(--color-primary-600)] mx-auto mb-2" />
                      <div className="font-medium text-sm text-[var(--text-primary)]">{option.label}</div>
                      <div className="text-xs text-[var(--text-tertiary)]">{option.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-[var(--border-medium)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)]"
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-[var(--border-medium)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary-400)] resize-none"
                      placeholder="Describe your issue in detail..."
                    />
                  </div>
                  <button className="w-full py-3 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-semibold transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
