// app/properties/page.tsx
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  ArrowBigDown,
  ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  status: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  yearBuilt: number;
  garage: number;
  lotSize: string;
  pricePerSqft: number;
}

// Mock Data
// const properties: Property[] = [
//   {
//     id: '1',
//     title: 'Modern Luxury Villa',
//     address: '123 Palm Avenue, Beverly Hills, CA 90210',
//     price: 2850000,
//     beds: 5,
//     baths: 4,
//     sqft: 4200,
//     type: 'Villa',
//     status: 'For Sale',
//     image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
//     images: [
//       'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
//       'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
//       'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
//     ],
//     description: 'Experience luxury living in this stunning modern villa featuring floor-to-ceiling windows, a gourmet kitchen, and a private infinity pool. The open-concept design seamlessly blends indoor and outdoor living.',
//     features: ['Infinity Pool', 'Smart Home System', 'Wine Cellar', 'Home Theater', 'Gym', 'Guest House'],
//     agent: {
//       name: 'Sarah Johnson',
//       phone: '+1 (555) 123-4567',
//       email: 'sarah@estateai.com',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
//     },
//     yearBuilt: 2021,
//     garage: 3,
//     lotSize: '0.5 acres',
//     pricePerSqft: 679
//   },
//   {
//     id: '2',
//     title: 'Downtown Penthouse',
//     address: '456 Skyline Drive, Los Angeles, CA 90015',
//     price: 1850000,
//     beds: 3,
//     baths: 3,
//     sqft: 2800,
//     type: 'Apartment',
//     status: 'For Sale',
//     image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
//     images: [
//       'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
//       'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
//     ],
//     description: 'Spectacular penthouse with panoramic city views. Features include a private elevator, designer finishes, and access to world-class amenities.',
//     features: ['Private Elevator', 'Rooftop Terrace', 'Concierge Service', 'Fitness Center', 'Valet Parking'],
//     agent: {
//       name: 'Michael Chen',
//       phone: '+1 (555) 234-5678',
//       email: 'michael@estateai.com',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
//     },
//     yearBuilt: 2019,
//     garage: 2,
//     lotSize: 'N/A',
//     pricePerSqft: 661
//   },
//   {
//     id: '3',
//     title: 'Cozy Family Home',
//     address: '789 Maple Street, Pasadena, CA 91105',
//     price: 1250000,
//     beds: 4,
//     baths: 3,
//     sqft: 2400,
//     type: 'House',
//     status: 'For Sale',
//     image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
//     images: [
//       'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
//       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'
//     ],
//     description: 'Charming family home in a quiet neighborhood. Recently renovated with modern amenities while maintaining its classic character.',
//     features: ['Updated Kitchen', 'Hardwood Floors', 'Fireplace', 'Large Backyard', 'Near Schools'],
//     agent: {
//       name: 'Emily Rodriguez',
//       phone: '+1 (555) 345-6789',
//       email: 'emily@estateai.com',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
//     },
//     yearBuilt: 2005,
//     garage: 2,
//     lotSize: '0.25 acres',
//     pricePerSqft: 521
//   },
//   {
//     id: '4',
//     title: 'Seaside Condo',
//     address: '321 Ocean View Blvd, Santa Monica, CA 90401',
//     price: 950000,
//     beds: 2,
//     baths: 2,
//     sqft: 1400,
//     type: 'Condo',
//     status: 'For Rent',
//     image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
//     images: [
//       'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
//       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
//     ],
//     description: 'Beautiful condo steps from the beach. Enjoy ocean breezes and stunning sunsets from your private balcony.',
//     features: ['Ocean View', 'Beach Access', 'Pool', 'Gated Community', 'Covered Parking'],
//     agent: {
//       name: 'David Kim',
//       phone: '+1 (555) 456-7890',
//       email: 'david@estateai.com',
//       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
//     },
//     yearBuilt: 2015,
//     garage: 1,
//     lotSize: 'N/A',
//     pricePerSqft: 679
//   },
//   {
//     id: '5',
//     title: 'Modern Townhouse',
//     address: '654 Urban Lane, Downtown, CA 90013',
//     price: 875000,
//     beds: 3,
//     baths: 2,
//     sqft: 1800,
//     type: 'Townhouse',
//     status: 'For Sale',
//     image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
//     images: [
//       'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
//       'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
//     ],
//     description: 'Sleek modern townhouse in the heart of downtown. Walk to restaurants, shops, and entertainment.',
//     features: ['Rooftop Deck', 'Smart Home', 'EV Charging', 'Storage Unit', 'Pet Friendly'],
//     agent: {
//       name: 'Lisa Thompson',
//       phone: '+1 (555) 567-8901',
//       email: 'lisa@estateai.com',
//       image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'
//     },
//     yearBuilt: 2020,
//     garage: 1,
//     lotSize: '0.1 acres',
//     pricePerSqft: 486
//   },
//   {
//     id: '6',
//     title: 'Historic Estate',
//     address: '987 Heritage Road, San Marino, CA 91108',
//     price: 4500000,
//     beds: 6,
//     baths: 5,
//     sqft: 5500,
//     type: 'House',
//     status: 'For Sale',
//     image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
//     images: [
//       'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
//       'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80'
//     ],
//     description: 'Magnificent historic estate on a sprawling lot. Meticulously maintained with original details and modern updates.',
//     features: ['Guest Cottage', 'Tennis Court', 'Pool', 'Library', 'Wine Room', 'Mature Gardens'],
//     agent: {
//       name: 'James Wilson',
//       phone: '+1 (555) 678-9012',
//       email: 'james@estateai.com',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
//     },
//     yearBuilt: 1925,
//     garage: 4,
//     lotSize: '2 acres',
//     pricePerSqft: 818
//   }
// ];

// Format price
const formatPrice = (price: number, status: string) => {
  if (status === 'For Rent') {
    return `$${price.toLocaleString()}/mo`;
  }
  return `$${price.toLocaleString()}`;
};

// Custom Select Component
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

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [bedsFilter, setBedsFilter] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [properties, setProperties] = useState<Property[]>([]);
const resultsRef = useRef<HTMLDivElement>(null);

const fetchProperties = async () => {
  const res = await fetch('https://appapi.estateai.in/api/property',{credentials:"include"});
  const data = await res.json();
  return data;
};


const mapApiToProperty = (item: any): Property | null => {
  try {
    // Safe JSON parsing with fallbacks
    const parseJSON = (str: string | null | undefined, fallback: any = []) => {
      if (!str) return fallback;
      try {
        return JSON.parse(str);
      } catch {
        return fallback;
      }
    };

    const agent = parseJSON(item.AgentInfo, {});
    const features = parseJSON(item.Features, []);
    const images = Array.isArray(item.PropertyImage) ? item.PropertyImage : [];

    // Validate required fields
    if (!item.id || !item.propertyName || images.length === 0) {
      console.warn('Skipping property due to missing required fields:', item.id);
      return null;
    }

    // Safe number extraction
    const extractNumber = (features: string[], keyword: string): number => {
      if (!Array.isArray(features)) return 0;
      const item = features.find((f: string) => 
        typeof f === 'string' && f.includes(keyword)
      );
      return item ? parseInt(item.match(/\d+/)?.[0] || '0') : 0;
    };

    const beds = extractNumber(features, 'Bedrooms');
    const baths = extractNumber(features, 'Bathrooms');
    const sqft = parseInt(item.Area) || 0;
    const price = parseInt(item.Price) || 0;

    // Map API type to valid Property type
    const validTypes = ['House', 'Apartment', 'Condo', 'Villa', 'Townhouse'];
    const apiType = item.PropertySubType?.trim();
    const mappedType = validTypes.includes(apiType) ? apiType : 'House'; // fallback

    // Determine status - fix this based on your actual API field
    // Option 1: If API has explicit status field
    const status = item.ListingType === 'Rent' || item.Status === 'For Rent' 
      ? 'For Rent' 
      : 'For Sale';

    return {
      id: String(item.id),
      title: item.propertyName?.trim() || 'Untitled Property',
      address: item.Adderess?.trim() || 'Address not available',
      price: price,
      beds: beds,
      baths: baths,
      sqft: sqft,
      type: mappedType as Property['type'],
      status: status as Property['status'],
      image: images[0],
      images: images,
      description: item.Description?.trim() || 'No description available',
      features: features,
      agent: {
        name: agent.name || 'EstateAI Agent',
        phone: agent.phone || '+1 (555) 000-0000',
        email: agent.email || 'contact@estateai.com',
        image: agent.image || images[0] // fallback to property image
      },
      yearBuilt: parseInt(item.PropertyYear) || new Date().getFullYear(),
      garage: 0,
      lotSize: 'N/A',
      pricePerSqft: sqft > 0 ? Math.floor(price / sqft) : 0
    };
  } catch (error) {
    console.error('Error mapping property:', error, item);
    return null;
  }
};
useEffect(() => {
  const loadData = async () => {
    try {
      const apiData = await fetchProperties();
      console.log("API Response:", apiData);
      
      // Handle different response structures
      const propertiesArray = Array.isArray(apiData) ? apiData : apiData?.data || [];
      
      const mapped = propertiesArray
        .map(mapApiToProperty)
        .filter((p:any): p is Property => p !== null); // Remove nulls
      
      console.log("Mapped Properties:", mapped);
      setProperties(mapped);
    } catch (error) {
      console.error("Failed to load properties:", error);
      setProperties([]);
    }
  };

  loadData();
}, []);
  // Filter options
  const typeOptions = [
    { value: 'All', label: 'All Types' },
    { value: 'House', label: 'House' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Condo', label: 'Condo' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Townhouse', label: 'Townhouse' }
  ];

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'For Sale', label: 'For Sale' },
    { value: 'For Rent', label: 'For Rent' }
  ];

  const priceOptions = [
    { value: 'All', label: 'Any Price' },
    { value: '0-500000', label: 'Under $500k' },
    { value: '500000-1000000', label: '$500k - $1M' },
    { value: '1000000-2000000', label: '$1M - $2M' },
    { value: '2000000-5000000', label: '$2M - $5M' },
    { value: '5000000-999999999', label: '$5M+' }
  ];

  const bedsOptions = [
    { value: 'All', label: 'Any Beds' },
    { value: '1', label: '1+ Beds' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
    { value: '5', label: '5+ Beds' }
  ];

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'All' || property.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || property.status === selectedStatus;
      const matchesBeds = bedsFilter === 'All' || property.beds >= parseInt(bedsFilter);
      
      let matchesPrice = true;
      if (priceRange !== 'All') {
        const [min, max] = priceRange.split('-').map(p => p.includes('+') ? Infinity : parseInt(p));
        if (priceRange.includes('+')) {
          matchesPrice = property.price >= min;
        } else {
          matchesPrice = property.price >= min && property.price <= max;
        }
      }
      
      return matchesSearch && matchesType && matchesStatus && matchesPrice && matchesBeds;
    });
  }, [searchQuery, selectedType, selectedStatus, priceRange, bedsFilter]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closePropertyModal = () => {
    setSelectedProperty(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      );
    }
  };
  const scrollToResults = () => {
  resultsRef.current?.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
};

  return (
    <div className="min-h-screen pt-18 bg-white">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-primary-500)]/20 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect <span className="text-[var(--color-primary-200)]">Property</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-primary-100)] mb-10">
              Discover exceptional homes, apartments, and investment opportunities tailored to your lifestyle
            </p>
            
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                <Search className="absolute left-5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-32 py-4 text-gray-800 placeholder-gray-400 focus:outline-none text-base"
                />
                <button className="absolute right-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}
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
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40"></div>

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
          <button  onClick={() => {
   
    scrollToResults();
  }} className="absolute right-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)] text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg">
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
          <p className="text-3xl font-bold text-white">2,500+</p>
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
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 text-gray-700 font-medium"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Options - Custom Styled Dropdowns */}
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

            {/* Results Count */}
            <div className="text-gray-600 font-medium">
              Showing <span className="text-[var(--color-primary-600)] font-bold">{filteredProperties.length}</span> properties
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section  ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => openPropertyModal(property)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[var(--color-primary-300)] hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    onClick={(e) => toggleFavorite(e, property.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
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
                    <MapPin className="w-4 h-4" />
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

      {/* Property Detail Modal - Fixed Layout */}
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

            {/* Modal Content - Fixed Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closePropertyModal}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Left Side - Fixed Image Gallery */}
                <div className="relative h-full bg-gray-100 lg:sticky lg:top-0 overflow-hidden">
                  <img 
                    src={selectedProperty.images[currentImageIndex]} 
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProperty.images.map((_, idx) => (
                          <button
                            key={idx}
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
                        <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
                        {selectedProperty.address}
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
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProperty.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-600">
                            <Check className="w-4 h-4 text-[var(--color-primary-600)]" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

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
                        />
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{selectedProperty.agent.name}</p>
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
                      <button className="flex-1 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[var(--color-primary-600)]/25 flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Schedule Tour
                      </button>
                      <button className="p-4 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
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