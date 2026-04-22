// app/broker-network/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Users, 
  Zap, 
  TrendingUp, 
  Shield, 
  ArrowRight, 
  Upload, 
  X,
  Building2,
  MapPin,
  Briefcase,
  Award,
  Phone,
  Mail,
  User,
  FileText,
  Star,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Select Component
interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white border rounded-xl text-left transition-all duration-200 ${
          isOpen 
            ? 'border-[var(--color-primary-500)] ring-2 ring-[var(--color-primary-200)]' 
            : 'border-gray-200 hover:border-[var(--color-primary-400)]'
        }`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-[var(--color-primary-600)]">{icon}</span>}
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value ? options.find(o => o.value === value)?.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  value === option.value
                    ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="w-4 h-4 text-[var(--color-primary-600)]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Multi-select Tags Component
interface TagSelectProps {
  label: string;
  tags: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const TagSelect: React.FC<TagSelectProps> = ({ label, tags, selected, onChange }) => {
  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selected.includes(tag)
                ? 'bg-[var(--color-primary-600)] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {selected.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function JoinNetworkPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    experience: '',
   password:'',
    city: '',
    specialization: [] as string[],
    description: '',
    AdminImage: null as string | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const specializationOptions = [
    'Residential', 'Commercial', 'Luxury', 'Investment', 
    'First-time Buyers', 'Relocation', 'Property Management',
    'Land/Development', 'Foreclosures', 'Vacation Homes'
  ];

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, AdminImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }
};




// Add onBlur handler to email input
const checkEmailExists = async (email: string) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
  
  try {
    // Option 1: If your backend has a dedicated check endpoint
    // const response = await fetch(
    //   `https://appapi.estateai.in/api/user/check-email?email=${encodeURIComponent(email)}`,
    //   { credentials: 'include' }
    // );
    
    // Option 2: If you must check against existing admins list
    const response = await fetch(
      `https://appapi.estateai.in/api/admin/all`,
      { credentials: 'include' }
    );
    
    if (!response.ok) throw new Error('Failed to check email');
    
    const data = await response.json();
    
    // Adjust based on your actual API response structure
    const exists = data.exists || data.data?.some((user: any) => 
      user.email?.toLowerCase() === email.toLowerCase()
    );
    
    if (exists) {
      setEmailError('This email is already registered');
    } else {
      setEmailError('');
    }
  } catch (error) {
    console.error('Error checking email:', error);
    setEmailError(''); // Don't block user on check failure
  }
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validation
  if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.role || !formData.experience || !formData.city ) {
    alert('Please fill in all required fields');
    return;
  }

  setIsSubmitting(true);

  try {
    // Create FormData object for multipart/form-data (supports file upload)
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('company', formData.company);
    submitData.append('role', formData.role);
    submitData.append('experience', formData.experience);
    // submitData.append('dealsClosed', formData.dealsClosed);
    submitData.append('city', formData.city);
    submitData.append('specialization', JSON.stringify(formData.specialization));
    submitData.append('password', formData.password);

    // Handle profile image - convert base64 to file if exists
    if (formData.AdminImage) {
      // If it's a base64 string from FileReader, convert to blob
      const response = await fetch(formData.AdminImage);
      const blob = await response.blob();
      const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
      submitData.append('AdminImage', file);
    }

    // Submit to API
    const response = await fetch('https://appapi.estateai.in/api/user/newusersignup', {
  method: 'POST',
  credentials: 'include',  // add this
  body: submitData,
});

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit application');
    }

    setIsSuccess(true);
    
  } catch (error) {
    console.error('Submission error:', error);
    alert(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
if (isSuccess) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-50)] to-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-2">
          Thank you for applying to join the EstateAI Broker Network.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Our team will review your application and get back to you within 24-48 hours.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Submit Another
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--color-primary-50)] to-[var(--color-primary-100)]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-primary-200)]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary-300)]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-8"
            >
              <Star className="w-4 h-4 fill-current" />
              Trusted by 100+ Top Brokers
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Join EstateAI <br />
              <span className="text-[var(--color-primary-600)]">Broker Network</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get verified leads, manage clients, and grow your real estate business with AI-powered tools designed for top-performing brokers.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-[var(--color-primary-600)]/25 flex items-center gap-3 mx-auto"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Join Our Network?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get exclusive access to tools and opportunities that will transform your real estate business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Users className="w-8 h-8" />, 
                title: "High-Quality Leads", 
                desc: "Receive pre-verified, AI-matched leads that convert 3x better than traditional sources.",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                icon: <Zap className="w-8 h-8" />, 
                title: "AI-Powered CRM", 
                desc: "Automated follow-ups, smart scheduling, and predictive analytics to close deals faster.",
                color: "bg-purple-50 text-purple-600"
              },
              { 
                icon: <TrendingUp className="w-8 h-8" />, 
                title: "Close More Deals", 
                desc: "Our brokers close 40% more transactions on average using our intelligent platform.",
                color: "bg-green-50 text-green-600"
              },
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: "Build Your Profile", 
                desc: "Showcase your expertise with a verified profile that attracts premium clients.",
                color: "bg-orange-50 text-orange-600"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-[var(--color-primary-300)] hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[var(--color-primary-50)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to start receiving premium leads</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[var(--color-primary-300)] via-[var(--color-primary-500)] to-[var(--color-primary-300)] -translate-y-1/2"></div>
            
            {[
              { step: "01", title: "Submit Application", desc: "Fill out our simple application form with your professional details and experience." },
              { step: "02", title: "Get Verified", desc: "Our team reviews your credentials and verifies your broker license within 24-48 hours." },
              { step: "03", title: "Start Receiving Leads", desc: "Once approved, you'll immediately start receiving AI-matched, high-quality leads." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 relative z-10 border-2 border-[var(--color-primary-200)]">
                  <span className="text-2xl font-bold text-[var(--color-primary-600)]">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply to Join</h2>
            <p className="text-gray-600 text-lg">Complete the form below to start your application process</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] px-8 py-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Broker Application
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              <div className="space-y-8">
                {/* Profile Image Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-all overflow-hidden border-4 ${
                        formData.AdminImage
                          ? 'border-[var(--color-primary-300)]' 
                          : 'border-gray-200 hover:border-[var(--color-primary-400)] bg-gray-50'
                      }`}
                    >
                      {formData.AdminImage ? (
                        <img src={formData.AdminImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-500">Upload Photo</span>
                        </div>
                      )}
                    </div>
                    {formData.AdminImage && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, AdminImage: null }))}
                        className="absolute -top-1 -right-1 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                 <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
  <div className="relative">
    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      required
      type="email"
      value={formData.email}
      onChange={e => {
        setFormData(prev => ({ ...prev, email: e.target.value }));
        setEmailError('');
      }}
      onBlur={e => checkEmailExists(e.target.value)}
      className={`w-full pl-12 pr-4 py-3.5 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all ${
        emailError ? 'border-red-500' : 'border-gray-200'
      }`}
      placeholder="john@example.com"
    />
  </div>
  {emailError && (
    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
      <AlertCircle className="w-4 h-4" />
      {emailError}
    </p>
  )}
</div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                        placeholder="create a strong password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                        placeholder="Your Brokerage"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="grid md:grid-cols-3 gap-6">
                  <CustomSelect
                    label="Role *"
                    value={formData.role}
                    onChange={v => setFormData(prev => ({ ...prev, role: v }))}
                    options={[
                      { value: 'client_admin', label: 'Real Estate Broker' },
                      { value: 'Agent', label: 'Real Estate Agent' },
                      { value: 'Team Lead', label: 'Team Lead' },
                      { value: 'Broker Owner', label: 'Broker Owner' }
                    ]}
                    placeholder="Select your role"
                    icon={<Briefcase className="w-5 h-5" />}
                  />

                  <CustomSelect
                    label="Experience *"
                    value={formData.experience}
                    onChange={v => setFormData(prev => ({ ...prev, experience: v }))}
                    options={[
                      { value: '0-2', label: '0-2 years' },
                      { value: '3-5', label: '3-5 years' },
                      { value: '6-10', label: '6-10 years' },
                      { value: '10+', label: '10+ years' }
                    ]}
                    placeholder="Select experience"
                    icon={<Award className="w-5 h-5" />}
                  />

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deals Closed (Optional)</label>
                    <input
                      type="number"
                      value={formData.dealsClosed}
                      onChange={e => setFormData(prev => ({ ...prev, dealsClosed: e.target.value }))}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                      placeholder="e.g., 50"
                    />
                  </div> */}
                </div>

                {/* Location & Specializations */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location (City) *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
                        placeholder="e.g., Los Angeles, CA"
                      />
                    </div>
                  </div>

                  <TagSelect
                    label="Specializations (Select all that apply)"
                    tags={specializationOptions}
                    selected={formData.specialization}
                    onChange={selected => setFormData(prev => ({ ...prev, specialization: selected }))}
                  />
                </div>

                {/* Description */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Description *</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your experience, achievements, and what makes you a great broker..."
                    />
                  </div>
                </div> */}

                {/* Submit Button */}
                <div className="pt-4">
                <button
  type="submit"
  disabled={isSubmitting || !!emailError}
  className="w-full bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-[var(--color-primary-600)]/25 flex items-center justify-center gap-2"
>
  {isSubmitting ? (
    <>
      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      Submitting...
    </>
  ) : (
    <>
      Apply for Approval
      <ArrowRight className="w-5 h-5" />
    </>
  )}
</button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[var(--color-primary-50)]/30 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-medium text-gray-600">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100+</p>
                <p className="text-sm text-gray-600">Brokers Already Joined</p>
              </div>
            </div>

            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-[var(--color-primary-600)]" />
                <span className="font-medium">Verified & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                <span className="font-medium">24-48h Approval</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5 text-[var(--color-primary-600)]" />
                <span className="font-medium">Top Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}