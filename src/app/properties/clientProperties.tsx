// app/properties/page.tsx
'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback, Suspense } from 'react';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  X, 
  Filter,
  Home,
  ChevronDown,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// TYPES - Strict TypeScript Definitions
// ==========================================

interface PropertyAgent {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Condo' | 'Villa' | 'Townhouse';
  status: 'For Sale' | 'For Rent';
  image: string;
  images: string[];
  description: string;
  features: string[];
  agent: PropertyAgent;
  yearBuilt: number;
  garage: number;
  lotSize: string;
  pricePerSqft: number;
  isFavorite: boolean;
}

// API Response Types for better validation
interface ApiAgentInfo {
  name?: string;
  phone?: string;
  email?: string;
  image?: string;
}

interface ApiProperty {
  id: string | number;
  propertyName?: string;
  Adderess?: string;
  Price?: string | number;
  Area?: string | number;
  PropertySubType?: string;
  ListingType?: string;
  Campaign?: string;
  Description?: string;
  PropertyYear?: string | number;
  AgentInfo?: string | ApiAgentInfo;
  Features?: string | string[];
  PropertyImage?: string | string[];
}

// ==========================================
// CONSTANTS
// ==========================================

const VALID_PROPERTY_TYPES: Property['type'][] = ['House', 'Apartment', 'Condo', 'Villa', 'Townhouse'];
const API_ENDPOINT = 'https://appapi.estateai.in/api/property';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/800x600?text=No+Image';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const formatPrice = (price: number, status: Property['status']): string => {
  if (status === 'For Rent') {
    return `$${price.toLocaleString()}/mo`;
  }
  return `$${price.toLocaleString()}`;
};

// Safe JSON parser with proper error handling
const safeJSONParse = <T,>(str: unknown, fallback: T): T => {
  if (typeof str !== 'string') return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
};

// Safe number extraction from features array
const extractNumberFromFeatures = (features: unknown[], keyword: string): number => {
  if (!Array.isArray(features)) return 0;
  const item = features.find((f: unknown) => 
    typeof f === 'string' && f.toLowerCase().includes(keyword.toLowerCase())
  );
  if (typeof item !== 'string') return 0;
  const match = item.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};




const mapApiToProperty = (item: unknown): Property | null => {
  // Type guard to ensure item is an object
  if (!item || typeof item !== 'object') {
    console.warn('Invalid API item: not an object', item);
    return null;
  }

  const apiItem = item as ApiProperty;

  try {
    // Parse JSON fields safely
    const agent = typeof apiItem.AgentInfo === 'string' 
      ? safeJSONParse<ApiAgentInfo>(apiItem.AgentInfo, {})
      : (apiItem.AgentInfo || {});
    
    const features = typeof apiItem.Features === 'string'
      ? safeJSONParse<string[]>(apiItem.Features, [])
      : (Array.isArray(apiItem.Features) ? apiItem.Features : []);

    // Handle images - ensure it's always an array of strings
    let images: string[] = [];
    if (typeof apiItem.PropertyImage === 'string') {
      images = [apiItem.PropertyImage];
    } else if (Array.isArray(apiItem.PropertyImage) && apiItem.PropertyImage.length > 0) {
      images = apiItem.PropertyImage.filter((img): img is string => typeof img === 'string');
    }
    
    if (images.length === 0) {
      images = [PLACEHOLDER_IMAGE];
    }

    // Extract numeric values safely
    const price = typeof apiItem.Price === 'string' ? parseInt(apiItem.Price, 10) : (apiItem.Price || 0);
    const sqft = typeof apiItem.Area === 'string' ? parseInt(apiItem.Area, 10) : (apiItem.Area || 0);
    const beds = extractNumberFromFeatures(features, 'bedroom');
    const baths = extractNumberFromFeatures(features, 'bathroom');
    
    // Map and validate property type
    const rawType = apiItem.PropertySubType?.trim() || 'House';
    const mappedType = VALID_PROPERTY_TYPES.includes(rawType as Property['type']) 
      ? rawType as Property['type'] 
      : 'House';

    // ==========================================
    // FIXED: Use Campaign field for status with proper mapping
    // ==========================================
    const getStatusFromCampaign = (campaign: string | undefined): Property['status'] => {
      if (!campaign) return 'For Sale'; // Default fallback
      
      const normalized = campaign.toLowerCase().trim();
      
      // Map Campaign values to Property status
      if (normalized === 'for rent' || normalized === 'rent') return 'For Rent';
      if (normalized === 'for sale' || normalized === 'sale') return 'For Sale';
      if (normalized === 'sold') return 'For Sale'; // Sold items still show as For Sale but can be filtered
      if (normalized === 'draft') return 'For Sale'; // Drafts default to For Sale in customer view
      
      // Fallback to ListingType if Campaign doesn't match
      const listingType = apiItem.ListingType?.toLowerCase();
      if (listingType === 'rent') return 'For Rent';
      
      return 'For Sale';
    };

    const status: Property['status'] = getStatusFromCampaign(apiItem.Campaign);

    // Build property object
    const property: Property = {
      id: String(apiItem.id || Math.random().toString(36).substr(2, 9)),
      title: apiItem.propertyName?.trim() || 'Untitled Property',
      address: apiItem.Adderess?.trim() || 'Address not available',
      price: Number.isFinite(price) ? price : 0,
      beds: Number.isFinite(beds) ? beds : 0,
      baths: Number.isFinite(baths) ? baths : 0,
      sqft: Number.isFinite(sqft) ? sqft : 0,
      type: mappedType,
      status: status,
      image: images[0],
      images: images,
      isFavorite: (item as any).isFaviourate === true || (item as any).isFavorite === true, 
      description: apiItem.Description?.trim() || 'No description available',
      features: features.filter((f): f is string => typeof f === 'string'),
      agent: {
        name: agent.name || 'EstateAI Agent',
        phone: agent.phone || '+1 (555) 000-0000',
        email: agent.email || 'contact@estateai.com',
        image: agent.image || images[0]
      },
      yearBuilt: typeof apiItem.PropertyYear === 'string' 
        ? parseInt(apiItem.PropertyYear, 10) 
        : (apiItem.PropertyYear || new Date().getFullYear()),
      garage: 0,
      lotSize: 'N/A',
      pricePerSqft: sqft > 0 ? Math.floor(price / sqft) : 0
    };

    // Validation: Ensure required fields have valid values
    if (!property.id || property.price < 0) {
      console.warn('Property validation failed:', property);
      return null;
    }

    return property;
  } catch (error) {
    console.error('Error mapping property:', error, item);
    return null;
  }
};

// ==========================================
// COMPONENTS
// ==========================================

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm font-medium transition-all duration-200 ${
          isOpen 
            ? 'border-[var(--color-primary-500)] ring-2 ring-[var(--color-primary-200)]' 
            : 'border-gray-200 hover:border-[var(--color-primary-400)] hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--color-primary-600)]">{icon}</span>}
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>{selectedLabel}</span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl shadow-black/10 z-50 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    value === option.value
                      ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-[var(--color-primary-600)]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Loading Skeleton Component
const PropertyCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
    <div className="h-64 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="flex gap-4">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
);

// Error Display Component
const ErrorDisplay: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="text-center py-20 px-4">
    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">Failed to load properties</h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
    >
      Try Again
    </button>
  </div>
);

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function PropertiesPage(): React.ReactElement {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [bedsFilter, setBedsFilter] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  // Data State
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // DATA FETCHING
  // ==========================================

  const fetchProperties = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(API_ENDPOINT, {
        credentials: 'include',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData: unknown = await response.json();
      console.log('API Response:', apiData);

      // Handle different response structures
      let propertiesArray: unknown[] = [];
      
      if (Array.isArray(apiData)) {
        propertiesArray = apiData;
      } else if (apiData && typeof apiData === 'object') {
        // Try common API response patterns
        const data = apiData as Record<string, unknown>;
        if (Array.isArray(data.data)) {
          propertiesArray = data.data;
        } else if (Array.isArray(data.properties)) {
          propertiesArray = data.properties;
        } else if (Array.isArray(data.results)) {
          propertiesArray = data.results;
        } else if (Array.isArray(data.items)) {
          propertiesArray = data.items;
        } else {
          // If no known array field, try to use values if it's an object map
          const values = Object.values(data).find(v => Array.isArray(v));
          if (values) propertiesArray = values;
        }
      }

      console.log('Properties Array:', propertiesArray);

      if (propertiesArray.length === 0) {
        throw new Error('No properties found in API response');
      }

      // Map and filter valid properties
      const mapped = propertiesArray
        .map(mapApiToProperty)
        .filter((p): p is Property => p !== null);

      console.log('Mapped Properties:', mapped);

      if (mapped.length === 0) {
        throw new Error('Unable to parse properties from API response');
      }

      setProperties(mapped);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Failed to load properties:', err);
      setError(errorMessage);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // ==========================================
  // FILTER OPTIONS
  // ==========================================

  const typeOptions = useMemo(() => [
    { value: 'All', label: 'All Types' },
    { value: 'House', label: 'House' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Townhouse', label: 'Townhouse' }
  ], []);

  const statusOptions = useMemo(() => [
    { value: 'All', label: 'All Status' },
    { value: 'For Sale', label: 'For Sale' },
    { value: 'For Rent', label: 'For Rent' }
  ], []);

  const priceOptions = useMemo(() => [
    { value: 'All', label: 'Any Price' },
    { value: '0-500000', label: 'Under $500k' },
    { value: '500000-1000000', label: '$500k - $1M' },
    { value: '1000000-2000000', label: '$1M - $2M' },
    { value: '2000000-5000000', label: '$2M - $5M' },
    { value: '5000000-999999999', label: '$5M+' }
  ], []);

  const bedsOptions = useMemo(() => [
    { value: 'All', label: 'Any Beds' },
    { value: '1', label: '1+ Beds' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
    { value: '5', label: '5+ Beds' }
  ], []);

  // ==========================================
  // FILTERED PROPERTIES - Fixed Dependencies
  // ==========================================

  const filteredProperties = useMemo(() => {
    if (!properties.length) return [];

    return properties.filter((property) => {
      const matchesSearch = 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'All' || property.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || property.status === selectedStatus;
      const matchesBeds = bedsFilter === 'All' || property.beds >= parseInt(bedsFilter, 10);
      
      let matchesPrice = true;
      if (priceRange !== 'All') {
        const [min, max] = priceRange.split('-').map(p => {
          if (p.includes('+')) return Infinity;
          const num = parseInt(p, 10);
          return Number.isNaN(num) ? 0 : num;
        });
        
        if (priceRange.includes('+')) {
          matchesPrice = property.price >= min;
        } else {
          matchesPrice = property.price >= min && property.price <= max;
        }
      }
       const matchesFavorite = !showOnlyFavorites || property.isFavorite || favorites.includes(property.id);


      return matchesSearch && matchesType && matchesStatus && matchesPrice && matchesBeds && matchesFavorite;
    });
  }, [properties, searchQuery, selectedType, selectedStatus, priceRange, bedsFilter,showOnlyFavorites, favorites]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  const toggleFavorite = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const openPropertyModal = useCallback((property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    // Use CSS class instead of direct style manipulation
    document.body.classList.add('overflow-hidden');
  }, []);

  const closePropertyModal = useCallback(() => {
    setSelectedProperty(null);
    document.body.classList.remove('overflow-hidden');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      if (!selectedProperty) return prev;
      return prev === selectedProperty.images.length - 1 ? 0 : prev + 1;
    });
  }, [selectedProperty]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      if (!selectedProperty) return prev;
      return prev === 0 ? selectedProperty.images.length - 1 : prev - 1;
    });
  }, [selectedProperty]);

  const scrollToResults = useCallback(() => {
    resultsRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, []);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen pt-18 bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Find Your Perfect <span className="text-[var(--color-primary-500)]">Property</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 drop-shadow-md">
              Discover exceptional homes, apartments, and investment opportunities tailored to your lifestyle
            </p>
            
            {/* Glassmorphism Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                <Search className="absolute left-5 w-5 h-5 text-white/70" />
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-32 py-4 bg-transparent text-white placeholder-white/60 focus:outline-none text-base"
                />
                <button 
                  type="button"
                  onClick={scrollToResults}
                  className="absolute right-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)] text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center gap-8 mt-12"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{isLoading ? '...' : properties.length.toLocaleString()}</p>
                <p className="text-sm text-white/70">Properties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">1,200+</p>
                <p className="text-sm text-white/70">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-sm text-white/70">Cities</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-10 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <ArrowDown className="w-6 h-6 text-white/30"/>
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-18 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Toggle (Mobile) */}
            <button 
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 text-gray-700 font-medium"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Options */}
            <div className={`${isFilterOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-3 w-full lg:w-auto`}>
              <CustomSelect
                value={selectedType}
                onChange={setSelectedType}
                options={typeOptions}
                placeholder="All Types"
                icon={<Home className="w-4 h-4" />}
              />
              
              <CustomSelect
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={statusOptions}
                placeholder="All Status"
                icon={<Check className="w-4 h-4" />}
              />
              
              <CustomSelect
                value={priceRange}
                onChange={setPriceRange}
                options={priceOptions}
                placeholder="Any Price"
                icon={<span className="text-sm font-bold">$</span>}
              />
              
              <CustomSelect
                value={bedsFilter}
                onChange={setBedsFilter}
                options={bedsOptions}
                placeholder="Any Beds"
                icon={<Bed className="w-4 h-4" />}
              />
            </div>

           <div className="flex items-center gap-4">
  {/* Favorite Button - Show before property count */}
  <button
    type="button"
    onClick={() => {
      // Toggle showing only favorites
      setShowOnlyFavorites(!showOnlyFavorites);
    }}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
      showOnlyFavorites 
        ? 'bg-red-50 text-red-600 border border-red-200' 
        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
    }`}
  >
    <Heart className={`w-5 h-5 ${showOnlyFavorites ? 'fill-red-500 text-red-500' : ''}`} />
    <span>{favorites.length > 0 ? favorites.length : properties.filter(p => p.isFavorite).length} Favorites</span>
  </button>

  {/* Results Count */}
  <div className="text-gray-600 font-medium">
    {isLoading ? (
      <span className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading...
      </span>
    ) : (
      <>
        Showing <span className="text-[var(--color-primary-600)] font-bold">{filteredProperties.length}</span> of{' '}
        <span className="text-[var(--color-primary-600)] font-bold">{properties.length}</span> properties
      </>
    )}
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error State */}
        {error && !isLoading && (
          <ErrorDisplay message={error} onRetry={fetchProperties} />
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {properties.length === 0 ? 'No properties available' : 'No properties match your filters'}
            </h3>
            <p className="text-gray-500 mb-6">
              {properties.length === 0 
                ? 'Check back later for new listings' 
                : 'Try adjusting your filters to see more results'}
            </p>
            {properties.length === 0 && (
              <button
                onClick={fetchProperties}
                className="inline-flex items-center gap-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Loader2 className="w-4 h-4" />
                Refresh
              </button>
            )}
          </div>
        )}

        {/* Properties Grid */}
        {!isLoading && !error && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openPropertyModal(property)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[var(--color-primary-300)] hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      property.status === 'For Sale' 
                        ? 'bg-[var(--color-primary-600)] text-white' 
                        : 'bg-[var(--color-secondary-500)] text-white'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => toggleFavorite(e, property.id)}
                    className="absolute top-4 right-4 p-2 cursor-pointer bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(property.id) || property.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-bold text-2xl">{formatPrice(property.price, property.status)}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary-600)] transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{property.address}</span>
                  </p>

                  {/* Features */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-[var(--color-primary-600)]" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-[var(--color-primary-600)]" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4 text-[var(--color-primary-600)]" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    <span className="text-[var(--color-primary-600)] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePropertyModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closePropertyModal}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Left Side - Image Gallery */}
                <div className="relative h-full bg-gray-100 lg:sticky lg:top-0 overflow-hidden">
                  <img 
                    src={selectedProperty.images[currentImageIndex] || PLACEHOLDER_IMAGE} 
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  
                  {/* Image Navigation */}
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button 
                        type="button"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </button>
                      <button 
                        type="button"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProperty.images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                              idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                      selectedProperty.status === 'For Sale' 
                        ? 'bg-[var(--color-primary-600)] text-white' 
                        : 'bg-[var(--color-secondary-500)] text-white'
                    }`}>
                      {selectedProperty.status}
                    </span>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-4 right-16 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {selectedProperty.images.length}
                  </div>
                </div>

                {/* Right Side - Scrollable Content */}
                <div className="h-full overflow-y-auto bg-white">
                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {selectedProperty.title}
                      </h2>
                      <p className="text-gray-500 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[var(--color-primary-600)] flex-shrink-0" />
                        <span className="line-clamp-2">{selectedProperty.address}</span>
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <p className="text-4xl font-bold text-[var(--color-primary-600)]">
                        {formatPrice(selectedProperty.price, selectedProperty.status)}
                      </p>
                      <p className="text-gray-500 mt-1">
                        ${selectedProperty.pricePerSqft.toLocaleString()}/sqft
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
                      <div className="text-center">
                        <Bed className="w-6 h-6 text-[var(--color-primary-600)] mx-auto mb-1" />
                        <p className="font-bold text-gray-900">{selectedProperty.beds}</p>
                        <p className="text-xs text-gray-500">Bedrooms</p>
                      </div>
                      <div className="text-center">
                        <Bath className="w-6 h-6 text-[var(--color-primary-600)] mx-auto mb-1" />
                        <p className="font-bold text-gray-900">{selectedProperty.baths}</p>
                        <p className="text-xs text-gray-500">Bathrooms</p>
                      </div>
                      <div className="text-center">
                        <Square className="w-6 h-6 text-[var(--color-primary-600)] mx-auto mb-1" />
                        <p className="font-bold text-gray-900">{selectedProperty.sqft.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Sq Ft</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProperty.description}
                      </p>
                    </div>

                    {/* Features */}
                    {selectedProperty.features.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProperty.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-600">
                              <Check className="w-4 h-4 text-[var(--color-primary-600)] flex-shrink-0" />
                              <span className="text-sm line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Details */}
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Property Type</span>
                          <span className="font-medium text-gray-900">{selectedProperty.type}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Year Built</span>
                          <span className="font-medium text-gray-900">{selectedProperty.yearBuilt}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Garage</span>
                          <span className="font-medium text-gray-900">{selectedProperty.garage} Cars</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Lot Size</span>
                          <span className="font-medium text-gray-900">{selectedProperty.lotSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Agent */}
                    <div className="mb-8 p-4 bg-[var(--color-primary-50)] rounded-2xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Agent</h3>
                      <div className="flex items-center gap-4">
                        <img 
                          src={selectedProperty.agent.image} 
                          alt={selectedProperty.agent.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate">{selectedProperty.agent.name}</p>
                          <p className="text-sm text-gray-500">Real Estate Agent</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <a 
                          href={`tel:${selectedProperty.agent.phone}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white py-3 rounded-xl font-medium transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                        <a 
                          href={`mailto:${selectedProperty.agent.email}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 sticky bottom-0 bg-white pt-4 pb-2">
                      <button 
                        type="button"
                        className="flex-1 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[var(--color-primary-600)]/25 flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Tour
                      </button>
                      <button 
                        type="button"
                        className="p-4 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => toggleFavorite(e, selectedProperty.id)}
                        className="p-4 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${favorites.includes(selectedProperty.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}