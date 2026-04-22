// app/explore-brokers/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Phone, 
  Mail, 
  X,
  Star,
  Award,
  Briefcase,
  ArrowRight,
  Loader2,
  Filter,
  ChevronDown,
  MessageCircle,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrokerPropertiesModal from '@/components/popups/brokerproperty';

// Types
interface Broker {
  id: string;
  name: string;
  image: string | null;
  company: string;
  role: string;
  city: string;
  description: string;
  email: string;
  phone: string;
  experience: string;
  specialization: string[] | any;
  rating?: number;
  dealsClosed?: number;
  createdAt: string;
  updatedAt: string;
  properties?: any[];
}

// Toast Notification Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className={`fixed top-4 left-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Skeleton Loader Component
const BrokerCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-56 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-20 bg-gray-200 rounded" />
    </div>
  </div>
);

// Broker Detail Modal
const BrokerDetailModal = ({ 
  broker, 
  isOpen, 
  onClose 
}: { 
  broker: Broker | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!broker) return null;

  const specializationArray = Array.isArray(broker.specialization) 
    ? broker.specialization 
    : JSON.parse(broker.specialization || '[]');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header Image Section */}
            <div className="relative h-64 md:h-80 shrink-0">
              <img 
                src={broker.image || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} 
                alt={broker.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Rating Badge */}
              {broker.rating && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">{broker.rating}</span>
                  <span className="text-xs text-gray-500">(48 reviews)</span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{broker.name}</h2>
                  <p className="text-lg text-white/90 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    {broker.role} at {broker.company}
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="md:col-span-2 space-y-6">
                  {/* About Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[var(--color-primary-600)]" />
                      About
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{broker.description}</p>
                  </div>
                  
                  {/* Specialization Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {specializationArray.map((spec: string, idx: number) => (
                        <motion.span 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-4 py-2 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-medium border border-[var(--color-primary-100)]"
                        >
                          {spec}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[var(--color-primary-600)]">
                        {broker.experience || '5+ years'}
                      </div>
                      <div className="text-sm text-gray-500">Experience</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[var(--color-primary-600)]">
                        {broker.dealsClosed || '150+'}
                      </div>
                      <div className="text-sm text-gray-500">Deals Closed</div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Contact Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                    
                    {/* Email */}
                    <div className="group">
                      <div className="flex items-center gap-3 text-gray-600 mb-1">
                        <Mail className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(broker.email, 'email')}
                        className="text-[var(--color-primary-600)] font-medium hover:underline text-left w-full flex items-center justify-between group-hover:bg-white group-hover:shadow-sm p-2 rounded-lg transition-all"
                      >
                        <span className="truncate">{broker.email}</span>
                        {copiedField === 'email' && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Copied!</span>
                        )}
                      </button>
                    </div>
                    
                    {/* Phone */}
                    <div className="group">
                      <div className="flex items-center gap-3 text-gray-600 mb-1">
                        <Phone className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span className="text-sm font-medium">Phone</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(broker.phone, 'phone')}
                        className="text-[var(--color-primary-600)] font-medium hover:underline text-left w-full flex items-center justify-between group-hover:bg-white group-hover:shadow-sm p-2 rounded-lg transition-all"
                      >
                        <span>{broker.phone || '+1 (555) 123-4567'}</span>
                        {copiedField === 'phone' && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Copied!</span>
                        )}
                      </button>
                    </div>
                    
                    {/* Location */}
                    <div>
                      <div className="flex items-center gap-3 text-gray-600 mb-1">
                        <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span className="text-sm font-medium">Location</span>
                      </div>
                      <p className="text-gray-900 font-medium pl-8">{broker.city}</p>
                    </div>
                    
                    {/* Company */}
                    <div>
                      <div className="flex items-center gap-3 text-gray-600 mb-1">
                        <Building2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span className="text-sm font-medium">Company</span>
                      </div>
                      <p className="text-gray-900 font-medium pl-8">{broker.company}</p>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <a
                      href={`mailto:${broker.email}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors shadow-lg shadow-[var(--color-primary-200)]"
                    >
                      <Mail className="w-5 h-5" />
                      Send Email
                    </a>
                    <a
                      href={`tel:${broker.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] rounded-xl font-medium hover:bg-[var(--color-primary-50)] transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Broker Card Component (Public View - No Admin Controls)
const BrokerCard = ({ 
  broker, 
  onView,
  onViewProperties
}: { 
  broker: Broker; 
  onView: (broker: Broker) => void;
  onViewProperties: (broker: Broker) => void;
}) => {
  const specializationArray = Array.isArray(broker.specialization) 
    ? broker.specialization 
    : JSON.parse(broker.specialization || '[]');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onView(broker)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={broker.image || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} 
          alt={broker.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Experience Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-[var(--color-primary-700)] shadow-sm">
            {broker.experience || '5+ years'} exp
          </span>
        </div>
        
        {/* Rating */}
        {broker.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold text-gray-900">{broker.rating}</span>
          </div>
        )}
        
        {/* Hover Overlay with CTA */}
       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
  <div className="flex flex-col gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onView(broker);
      }}
      className="px-6 py-3 bg-white text-[var(--color-primary-600)] rounded-full font-semibold shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
    >
      View Profile
      <ArrowRight className="w-4 h-4" />
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onViewProperties(broker);
      }}
      className="px-6 py-3 bg-[var(--color-primary-600)] text-white rounded-full font-semibold shadow-lg flex items-center gap-2 hover:bg-[var(--color-primary-700)] transition-colors"
    >
      <Home className="w-4 h-4" />
      View Properties
    </button>
  </div>
</div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary-600)] transition-colors">
              {broker.name}
            </h3>
            <p className="text-[var(--color-primary-600)] font-medium text-sm">
              {broker.role}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Building2 className="w-4 h-4" />
          <span className="truncate">{broker.company}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{broker.city}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {broker.description}
        </p>
        
        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-2">
          {specializationArray.slice(0, 3).map((spec: string, idx: number) => (
            <span 
              key={idx}
              className="px-2.5 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs rounded-full font-medium"
            >
              {spec}
            </span>
          ))}
          {specializationArray.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{specializationArray.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({ 
  label, 
  options, 
  value, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  value: string; 
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-[var(--color-primary-400)] transition-colors text-sm font-medium text-gray-700"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <button
                onClick={() => { onChange(''); setIsOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${!value ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium' : 'text-gray-700'}`}
              >
                All {label}s
              </button>
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => { onChange(option); setIsOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${value === option ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium' : 'text-gray-700'}`}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Explore Page Component
export default function ExploreBrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedPropertiesBroker, setSelectedPropertiesBroker] = useState<Broker | null>(null);
const [isPropertiesModalOpen, setIsPropertiesModalOpen] = useState(false);
  // Filter states
  const [locationFilter, setLocationFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

  // Fetch brokers
const fetchBrokers = useCallback(async () => {
  try {
    setLoading(true);
    const response = await fetch('https://appapi.estateai.in/api/admin/all',{credentials:"include"});
    if (!response.ok) throw new Error('Failed to fetch brokers');
    
    const result = await response.json();
    const admins = result.admins || []; // API returns { success, count, admins }
    
    // Map API response (Admin model) to Broker interface
    const mappedBrokers = admins.map((admin: any) => ({
      id: admin._id || admin.id, // API uses _id
      name: admin.name,
      image: admin.AdminImage ? JSON.parse(admin.AdminImage)[0] : '', // No image field in API, keep null for placeholder
      company: admin.company || 'Independent',
      role: admin.role === 'client_admin' ? 'Real Estate Broker' : admin.role,
      location: admin.city || admin.AddressLine1 || 'Not specified',
      description: admin.company 
        ? `Experienced real estate professional at ${admin.company}${admin.city ? `, based in ${admin.city}` : ''}.`
        : 'Experienced real estate professional ready to help you find your perfect property.',
      email: admin.email,
      phone: admin.phone || '',
      experience: admin.experience || '5+ years',
      specialization: admin.specialization 
        ? (typeof admin.specialization === 'string' 
            ? admin.specialization.split(',').map((s: string) => s.trim()).filter(Boolean)
            : admin.specialization)
        : ['Residential', 'Commercial'], // Default fallback
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      dealsClosed: Math.floor(50 + Math.random() * 200),
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      // Store properties for the modal
      properties: admin.createdPropertys || []
    }));
    
    setBrokers(mappedBrokers);
  } catch (error) {
    showToast('Failed to load brokers', 'error');
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchBrokers();
  }, [fetchBrokers]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const openDetailModal = (broker: Broker) => {
    setSelectedBroker(broker);
    setIsDetailModalOpen(true);
  };

const openPropertiesModal = (broker: Broker) => {
  setSelectedPropertiesBroker(broker);
  setIsPropertiesModalOpen(true);
};

  // Extract unique locations and specializations for filters
  const locations = [...new Set(brokers.map(b => b.city))].filter(Boolean);
  const allSpecializations = brokers.flatMap(b => 
    Array.isArray(b.specialization) ? b.specialization : JSON.parse(b.specialization || '[]')
  );
  const specializations = [...new Set(allSpecializations)].filter(Boolean);

  // Filter brokers
  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = 
      broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broker.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broker.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !locationFilter || broker.city === locationFilter;
    
    const brokerSpecs = Array.isArray(broker.specialization) 
      ? broker.specialization 
      : JSON.parse(broker.specialization || '[]');
    const matchesSpecialization = !specializationFilter || brokerSpecs.includes(specializationFilter);
    
    return matchesSearch && matchesLocation && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pt-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-white to-[var(--color-secondary-50)] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Find Your Perfect <span className="text-[var(--color-primary-600)]">Real Estate Broker</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              Connect with top-rated brokers who specialize in your area. Browse profiles, read reviews, and find the perfect match for your property needs.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, company, or role..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-4 focus:ring-[var(--color-primary-100)] outline-none transition-all text-lg shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-gray-500 mr-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <FilterDropdown
            label="Location"
            options={locations}
            value={locationFilter}
            onChange={setLocationFilter}
          />
          
          <FilterDropdown
            label="Specialization"
            options={specializations}
            value={specializationFilter}
            onChange={setSpecializationFilter}
          />
          
          {(locationFilter || specializationFilter) && (
            <button
              onClick={() => {
                setLocationFilter('');
                setSpecializationFilter('');
              }}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear filters
            </button>
          )}
          
          <div className="ml-auto text-sm text-gray-500">
            Showing {filteredBrokers.length} of {brokers.length} brokers
          </div>
        </div>

        {/* Brokers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <BrokerCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredBrokers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No brokers found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || locationFilter || specializationFilter
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'No brokers available at the moment. Please check back later.'}
            </p>
            {(searchQuery || locationFilter || specializationFilter) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('');
                  setSpecializationFilter('');
                }}
                className="mt-6 px-6 py-2.5 bg-[var(--color-primary-600)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredBrokers.map((broker, index) => (
                <motion.div
                  key={broker.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BrokerCard
  broker={broker}
  onView={openDetailModal}
  onViewProperties={openPropertiesModal}
/>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      {!loading && filteredBrokers.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Find the Right Agent?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let us help you connect with the perfect broker for your specific needs. Our team will match you with qualified professionals.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-primary-600)] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              <MessageCircle className="w-5 h-5" />
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <BrokerDetailModal
        broker={selectedBroker}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
      {/* Properties Modal */}
<BrokerPropertiesModal
  brokerId={selectedPropertiesBroker?.id || ''}
  brokerName={selectedPropertiesBroker?.name || ''}
  properties={selectedPropertiesBroker?.properties || []}
  isOpen={isPropertiesModalOpen}
  onClose={() => setIsPropertiesModalOpen(false)}
/>
    </div>
  );
}