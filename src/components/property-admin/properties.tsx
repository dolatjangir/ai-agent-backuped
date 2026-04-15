// app/admin/properties/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Upload,
  Bed,
  Bath,
  Square,
  MapPin,
  DollarSign,
  Home,
  ChevronDown,
  Check,
  Image as ImageIcon,
  Eye,
  Filter,
  MoreVertical,
  Save,
  Key,
  TrendingUp,
  Loader2
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
  type: 'House' | 'Apartment' | 'Condo' | 'Villa' | 'Townhouse';
  status: 'For Sale' | 'For Rent' | 'Draft' | 'Sold';
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
  createdAt: string;
  views: number;
}

// API Types
interface ApiProperty {
  id: string;
  propertyName: string;
  Adderess: string;
  Price: number;
  Area: string;
  PropertySubType: string;
  Verified: string;
  PropertyImage: string[];
  Description: string;
  Features: string;
  AgentInfo: string;
  AgentImage: string[];
  PropertyYear: string;
  ListingType?: string;
  Status?: string;
  views?: number;
  createdAt?: string;
}

// Constants for valid values
const VALID_PROPERTY_TYPES = ['House', 'Apartment', 'Condo', 'Villa', 'Townhouse'] as const;
const VALID_STATUSES = ['For Sale', 'For Rent', 'Draft', 'Sold'] as const;

type PropertyType = typeof VALID_PROPERTY_TYPES[number];
type PropertyStatus = typeof VALID_STATUSES[number];

// Validation helpers
const validateType = (type: string): PropertyType => {
  const trimmed = type?.trim();
  return VALID_PROPERTY_TYPES.includes(trimmed as PropertyType) 
    ? (trimmed as PropertyType) 
    : 'House';
};

const validateStatus = (status: string): PropertyStatus => {
  return VALID_STATUSES.includes(status as PropertyStatus)
    ? (status as PropertyStatus)
    : 'For Sale';
};

// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, label, icon }) => {
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
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border rounded-xl text-sm transition-all duration-200 ${
          isOpen 
            ? 'border-[var(--color-primary-500)] ring-2 ring-[var(--color-primary-200)]' 
            : 'border-gray-200 hover:border-[var(--color-primary-400)]'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--color-primary-600)]">{icon}</span>}
          <span className="text-gray-900">{options.find(o => o.value === value)?.label || 'Select...'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                  value === option.value ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium' : 'text-gray-700'
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

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'draft'>('all');
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    address: '',
    price: 0,
    beds: 1,
    baths: 1,
    sqft: 0,
    type: 'House',
    status: 'For Sale',
    description: '',
    features: [],
    yearBuilt: new Date().getFullYear(),
    garage: 0,
    lotSize: '',
    images: [],
    agent: { name: '', phone: '', email: '', image: '' }
  });

  const [featureInput, setFeatureInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Functions
  const fetchProperties = async (): Promise<ApiProperty[]> => {
    const res = await fetch('https://appapi.estateai.in/api/property', { credentials: "include" });
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  };

const createProperty = async (formData: FormData): Promise<ApiProperty> => {
  try {
    const res = await fetch('https://appapi.estateai.in/api/property',{
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

 const updateProperty = async (id: string, formData: FormData): Promise<ApiProperty> => {
  const res = await fetch(`https://appapi.estateai.in/api/property/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to update property');
  return res.json();
};

const deletePropertyApi = async (id: string): Promise<void> => {
  const res = await fetch(`https://appapi.estateai.in/api/property/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Failed to delete property');
};

  // Data Mapping
  const extractNumber = (features: string[], keyword: string): number => {
    if (!Array.isArray(features)) return 0;
    const item = features.find((f: string) => typeof f === 'string' && f.includes(keyword));
    return item ? parseInt(item.match(/\d+/)?.[0] || '0') : 0;
  };

  const parseJSON = (str: string | null | undefined, fallback: any = []) => {
    if (!str) return fallback;
    try {
      return JSON.parse(str);
    } catch {
      return fallback;
    }
  };

  const mapApiToProperty = (item: ApiProperty): Property | null => {
    try {
      const agent = parseJSON(item.AgentInfo, {});
      const features = parseJSON(item.Features, []);
      const images = Array.isArray(item.PropertyImage) ? item.PropertyImage : [];

      if (!item.id || !item.propertyName) {
        console.warn('Skipping property - missing required fields:', item.id);
        return null;
      }

      const beds = extractNumber(features, 'Bedrooms');
      const baths = extractNumber(features, 'Bathrooms');
      const sqft = parseInt(item.Area) || 0;
      const price = parseInt(item.Price as any) || 0;
      
      const apiStatus = item.ListingType === 'Rent' || item.Status === 'For Rent' 
        ? 'For Rent' 
        : item.Verified === 'Yes' ? 'For Sale' : 'Draft';

      return {
        id: String(item.id),
        title: item.propertyName?.trim() || 'Untitled Property',
        address: item.Adderess?.trim() || 'Address not available',
        price: price,
        beds: beds,
        baths: baths,
        sqft: sqft,
        type: validateType(item.PropertySubType),
        status: validateStatus(apiStatus),
        image: images[0] || 'https://via.placeholder.com/800x600',
        images: images,
        description: item.Description?.trim() || 'No description available',
        features: features,
        agent: {
          name: agent.name || 'EstateAI Agent',
          phone: agent.phone || '+1 (555) 000-0000',
          email: agent.email || 'contact@estateai.com',
          image: agent.image || images[0]
        },
        yearBuilt: parseInt(item.PropertyYear) || new Date().getFullYear(),
        garage: 0,
        lotSize: 'N/A',
        pricePerSqft: sqft > 0 ? Math.round(price / sqft) : 0,
        createdAt: item.createdAt || new Date().toISOString().split('T')[0],
        views: item.views || 0
      };
    } catch (error) {
      console.error('Error mapping property:', error, item);
      return null;
    }
  };

const mapPropertyToApiFormData = (data: Partial<Property>, files: File[] = []): FormData => {
  const formData = new FormData();
  
  // Add text fields - match your backend API expected fields
  formData.append('propertyName', data.title || '');
  formData.append('Adderess', data.address || '');
  formData.append('Price', String(data.price || 0));
  formData.append('Area', String(data.sqft || 0));
  formData.append('PropertySubType', data.type || 'House');
  formData.append('Description', data.description || '');
  formData.append('PropertyYear', String(data.yearBuilt || new Date().getFullYear()));
  formData.append('Verified', data.status === 'For Sale' ? 'Yes' : 'No');

  const campaignValue = data.status === 'Draft' ? 'draft' : 
                        data.status === 'For Sale' ? 'for sale' : 
                        data.status === 'For Rent' ? 'for rent' : 'draft';
  formData.append('Campaign', campaignValue);
  formData.append('ContactNumber', data.agent?.phone || '+1 (555) 000-0000');
  
  // Add features as JSON string
  const features = data.features || [];
  if (data.beds && !features.some((f: string) => f.includes('Bedrooms'))) {
    features.push(`${data.beds} Bedrooms`);
  }
  if (data.baths && !features.some((f: string) => f.includes('Bathrooms'))) {
    features.push(`${data.baths} Bathrooms`);
  }
  formData.append('Features', JSON.stringify(features));
  
  // Add agent info as JSON string
  const agentInfo = {
    name: data.agent?.name || '',
    phone: data.agent?.phone || '',
    email: data.agent?.email || '',
    image: data.agent?.image || ''
  };
  formData.append('AgentInfo', JSON.stringify(agentInfo));
  
  // Handle images - existing URLs vs new file uploads
  const existingImages = data.images?.filter(img => !img.startsWith('blob:')) || [];
  
  // If there are existing images, send them as JSON
  if (existingImages.length > 0) {
    formData.append('PropertyImage', JSON.stringify(existingImages));
  }
  
  // If there are new file uploads, send them with the field name backend expects
  // Try 'PropertyImage' as the field name (same as your API type suggests)
  files.forEach((file, index) => {
    // Option 1: If backend expects 'PropertyImage' for files
    formData.append('PropertyImage', file);
    
    // Option 2: If backend expects 'images' (uncomment if Option 1 fails)
    // formData.append('images', file);
    
    // Option 3: If backend expects array notation (uncomment if above fails)
    // formData.append(`PropertyImage[${index}]`, file);
  });
  
  return formData;
};
  // Load Data
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const apiData = await fetchProperties();
      const propertiesArray = Array.isArray(apiData) ? apiData : [];
      const mapped = propertiesArray
        .map(mapApiToProperty)
        .filter((p): p is Property => p !== null);
      setProperties(mapped);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter properties
  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'sale' && p.status === 'For Sale') ||
                      (activeTab === 'rent' && p.status === 'For Rent') ||
                      (activeTab === 'draft' && p.status === 'Draft');
    return matchesSearch && matchesStatus && matchesType && matchesTab;
  });

  // Stats
  const stats = {
    total: properties.length,
    forSale: properties.filter(p => p.status === 'For Sale').length,
    forRent: properties.filter(p => p.status === 'For Rent').length,
    draft: properties.filter(p => p.status === 'Draft').length,
    sold: properties.filter(p => p.status === 'Sold').length,
    totalViews: properties.reduce((acc, p) => acc + p.views, 0)
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      address: '',
      price: 0,
      beds: 1,
      baths: 1,
      sqft: 0,
      type: 'House',
      status: 'Draft',
      description: '',
      features: [],
      yearBuilt: new Date().getFullYear(),
      garage: 0,
      lotSize: '',
      images: [],
      agent: { name: '', phone: '', email: '', image: '' }
    });
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setEditingProperty(property);
    setFormData({ ...property });
    setIsModalOpen(true);
  };

const handleSave = async () => {
  if (!formData.title || !formData.address) return;

  try {
    setSaving(true);
    
    // Get files from file input if any
    const files = fileInputRef.current?.files ? Array.from(fileInputRef.current.files) : [];
    
    // Convert to FormData
    const apiFormData = mapPropertyToApiFormData(formData, files);
    
    if (editingProperty) {
      // Update existing
      await updateProperty(editingProperty.id, apiFormData);
    } else {
      // Add new
      await createProperty(apiFormData);
    }
    
    // Reload properties
    await loadProperties();
    setIsModalOpen(false);
  } catch (error) {
    console.error('Failed to save property:', error);
    alert('Failed to save property. Please try again.');
  } finally {
    setSaving(false);
  }
};

  const handleDelete = async (id: string) => {
    try {
      await deletePropertyApi(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features?.includes(featureInput.trim())) {
      setFormData(prev => ({ ...prev, features: [...(prev.features || []), featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({ ...prev, features: prev.features?.filter(f => f !== feature) || [] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...newImages] }));
    }
  };

  const formatPrice = (price: number, status: string) => {
    if (status === 'For Rent') return `$${price.toLocaleString()}/mo`;
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'For Sale': return 'bg-green-100 text-green-700 border-green-200';
      case 'For Rent': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Sold': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary-600)]" />
          <span className="text-gray-600 font-medium">Loading properties...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary-600)] rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Property Admin</h1>
                <p className="text-xs text-gray-500">Manage your listings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-[var(--color-primary-700)]">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Total Properties */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] p-6 rounded-2xl shadow-lg shadow-[var(--color-primary-600)]/20"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[var(--color-primary-100)] text-sm font-medium mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
                <p className="text-[var(--color-primary-200)] text-xs mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full bg-white/40 w-3/4 rounded-r-full"></div>
            </div>
          </motion.div>

          {/* For Sale */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">For Sale</p>
                <p className="text-3xl font-bold text-gray-900">{stats.forSale}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                    {stats.total > 0 ? Math.round((stats.forSale / stats.total) * 100) : 0}%
                  </span>
                  <span className="text-gray-400 text-xs">of total</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: i < 3 ? '100%' : '60%' }}
                  ></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* For Rent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">For Rent</p>
                <p className="text-3xl font-bold text-gray-900">{stats.forRent}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[var(--color-primary-600)] text-xs font-medium bg-[var(--color-primary-50)] px-2 py-0.5 rounded-full">
                    {stats.total > 0 ? Math.round((stats.forRent / stats.total) * 100) : 0}%
                  </span>
                  <span className="text-gray-400 text-xs">of total</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[var(--color-primary-100)] rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-[var(--color-primary-600)]" />
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 bg-[var(--color-primary-100)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-primary-600)] rounded-full"
                    style={{ width: i < 2 ? '100%' : '40%' }}
                  ></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Total Views */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="text-purple-600 text-xs font-medium">+24.5%</span>
                  <span className="text-gray-400 text-xs">this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-end gap-1 h-8">
              {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-purple-200 rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs & Actions */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'sale', label: 'For Sale', count: stats.forSale },
              { id: 'rent', label: 'For Rent', count: stats.forRent },
              { id: 'draft', label: 'Drafts', count: stats.draft }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[var(--color-primary-600)] shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] w-64"
              />
            </div>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-[var(--color-primary-600)]/20"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <CustomSelect
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'All', label: 'All Status' },
              { value: 'For Sale', label: 'For Sale' },
              { value: 'For Rent', label: 'For Rent' },
              { value: 'Draft', label: 'Draft' },
              { value: 'Sold', label: 'Sold' }
            ]}
          />
          <CustomSelect
            label="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'All', label: 'All Types' },
              { value: 'House', label: 'House' },
              { value: 'Apartment', label: 'Apartment' },
              { value: 'Condo', label: 'Condo' },
              { value: 'Villa', label: 'Villa' },
              { value: 'Townhouse', label: 'Townhouse' }
            ]}
          />
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 w-24 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4  text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{property.title}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{property.address}</span>
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Bed className="w-3 h-3" /> {property.beds}</span>
                            <span className="flex items-center gap-1"><Bath className="w-3 h-3" /> {property.baths}</span>
                            <span className="flex items-center gap-1"><Square className="w-3 h-3" /> {property.sqft.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{formatPrice(property.price, property.status)}</p>
                      <p className="text-xs text-gray-500">${property.pricePerSqft.toLocaleString()}/sqft</p>
                    </td>
                    <td className="px-6 py-4 ">
                      <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap  font-medium border ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        {property.views.toLocaleString()}
                      </div>
                      {/* <p className="text-xs text-gray-400 mt-1">Added {property.createdAt}</p> */}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(property)}
                          className="p-2 text-gray-500 hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(property.id)}
                          className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                      <div className="flex gap-2 flex-wrap mb-3">
                        {formData.images?.map((img, idx) => (
                          <div key={idx} className="relative w-20 h-20">
                            <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                            <button 
                              onClick={() => setFormData(prev => ({ ...prev, images: prev.images?.filter((_, i) => i !== idx) || [] }))}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] transition-colors"
                        >
                          <Upload className="w-6 h-6 mb-1" />
                          <span className="text-xs">Upload</span>
                        </button>
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        placeholder="e.g., Modern Luxury Villa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        placeholder="Full address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <CustomSelect
                        label="Property Type"
                        value={formData.type || 'House'}
                        onChange={v => setFormData(prev => ({ ...prev, type: v as any }))}
                        options={[
                          { value: 'House', label: 'House' },
                          { value: 'Apartment', label: 'Apartment' },
                          { value: 'Condo', label: 'Condo' },
                          { value: 'Villa', label: 'Villa' },
                          { value: 'Townhouse', label: 'Townhouse' }
                        ]}
                        icon={<Home className="w-4 h-4" />}
                      />
                      <CustomSelect
                        label="Status"
                        value={formData.status || 'Draft'}
                        onChange={v => setFormData(prev => ({ ...prev, status: v as any }))}
                        options={[
                          { value: 'Draft', label: 'Draft' },
                          { value: 'For Sale', label: 'For Sale' },
                          { value: 'For Rent', label: 'For Rent' },
                          { value: 'Sold', label: 'Sold' }
                        ]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
                        placeholder="Describe the property..."
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Price & Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={formData.price || ''}
                            onChange={e => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Square Feet</label>
                        <div className="relative">
                          <Square className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={formData.sqft || ''}
                            onChange={e => setFormData(prev => ({ ...prev, sqft: parseInt(e.target.value) || 0 }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
                        <div className="relative">
                          <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={formData.beds || ''}
                            onChange={e => setFormData(prev => ({ ...prev, beds: parseInt(e.target.value) || 0 }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms</label>
                        <div className="relative">
                          <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={formData.baths || ''}
                            onChange={e => setFormData(prev => ({ ...prev, baths: parseInt(e.target.value) || 0 }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Garage</label>
                        <input
                          type="number"
                          value={formData.garage || ''}
                          onChange={e => setFormData(prev => ({ ...prev, garage: parseInt(e.target.value) || 0 }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Year Built</label>
                        <input
                          type="number"
                          value={formData.yearBuilt || ''}
                          onChange={e => setFormData(prev => ({ ...prev, yearBuilt: parseInt(e.target.value) || new Date().getFullYear() }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Lot Size</label>
                        <input
                          type="text"
                          value={formData.lotSize}
                          onChange={e => setFormData(prev => ({ ...prev, lotSize: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          placeholder="e.g., 0.5 acres"
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={featureInput}
                          onChange={e => setFeatureInput(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          placeholder="Add feature (e.g., Pool, Gym)"
                        />
                        <button 
                          onClick={addFeature}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.features?.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm"
                          >
                            {feature}
                            <button onClick={() => removeFeature(feature)} className="hover:text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Agent Info */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Agent Information</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={formData.agent?.name}
                          onChange={e => setFormData(prev => ({ ...prev, agent: { ...prev.agent!, name: e.target.value } }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                          placeholder="Agent Name"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="tel"
                            value={formData.agent?.phone}
                            onChange={e => setFormData(prev => ({ ...prev, agent: { ...prev.agent!, phone: e.target.value } }))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                            placeholder="Phone"
                          />
                          <input
                            type="email"
                            value={formData.agent?.email}
                            onChange={e => setFormData(prev => ({ ...prev, agent: { ...prev.agent!, email: e.target.value } }))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-200 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-medium transition-colors shadow-lg disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingProperty ? 'Save Changes' : 'Create Property'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Property?</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}