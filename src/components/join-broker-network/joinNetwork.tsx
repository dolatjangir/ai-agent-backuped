// app/admin/broker-applications/page.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Briefcase,
  Award,
  Phone,
  Mail,
  User,
  Calendar,
  FileText,
  Star,
  MoreHorizontal,
  Download,
  Check,
  X,
  TrendingUp,
  Users,
  Clock,
  Shield,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchApplications, fetchStats, updateApplicationStatus } from '../../../lib/api';

// Types
interface BrokerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  role: string;
  experience: string;
  dealsClosed: string;
  location: string;
  specializations: string[];
  description: string;
  profileImage: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

// Mock Data
const mockApplications: BrokerApplication[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.j@luxuryestates.com',
    phone: '+1 (555) 123-4567',
    companyName: 'Luxury Estates International',
    role: 'Broker Owner',
    experience: '10+',
    dealsClosed: '450',
    location: 'Beverly Hills, CA',
    specializations: ['Luxury', 'Residential', 'Investment'],
    description: 'Top-performing broker with 15 years of experience in luxury real estate. Closed over $500M in transactions. Specializing in high-end residential properties and celebrity clients.',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    status: 'pending',
    submittedAt: '2026-04-13T10:30:00Z'
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'michael.chen@realestatepro.com',
    phone: '+1 (555) 234-5678',
    companyName: 'Real Estate Pro Group',
    role: 'Team Lead',
    experience: '6-10',
    dealsClosed: '180',
    location: 'San Francisco, CA',
    specializations: ['Commercial', 'Investment', 'Property Management'],
    description: 'Experienced commercial real estate specialist with focus on tech sector relocations and investment properties.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    status: 'approved',
    submittedAt: '2026-04-12T14:20:00Z',
    reviewedAt: '2026-04-12T16:45:00Z',
    reviewedBy: 'Admin User'
  },
  {
    id: '3',
    fullName: 'Emily Rodriguez',
    email: 'emily.r@homesweethome.com',
    phone: '+1 (555) 345-6789',
    companyName: 'Home Sweet Home Realty',
    role: 'Real Estate Agent',
    experience: '3-5',
    dealsClosed: '85',
    location: 'Miami, FL',
    specializations: ['First-time Buyers', 'Residential', 'Relocation'],
    description: 'Passionate about helping first-time buyers find their dream homes. Fluent in Spanish and English.',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    status: 'pending',
    submittedAt: '2026-04-13T08:15:00Z'
  },
  {
    id: '4',
    fullName: 'David Kim',
    email: 'david.kim@investmentprop.com',
    phone: '+1 (555) 456-7890',
    companyName: 'Investment Properties LLC',
    role: 'Real Estate Broker',
    experience: '10+',
    dealsClosed: '320',
    location: 'New York, NY',
    specializations: ['Investment', 'Commercial', 'Development'],
    description: 'Specialized in investment properties and commercial real estate. Strong track record with international investors.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    status: 'rejected',
    submittedAt: '2026-04-11T09:00:00Z',
    reviewedAt: '2026-04-11T11:30:00Z',
    reviewedBy: 'Admin User',
    rejectionReason: 'Incomplete documentation - missing broker license verification'
  },
  {
    id: '5',
    fullName: 'Lisa Thompson',
    email: 'lisa.t@premierbrokers.com',
    phone: '+1 (555) 567-8901',
    companyName: 'Premier Brokers',
    role: 'Broker Owner',
    experience: '6-10',
    dealsClosed: '200',
    location: 'Austin, TX',
    specializations: ['Luxury', 'Residential', 'Vacation Homes'],
    description: 'Luxury market specialist with extensive network in Austin and surrounding areas.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    status: 'pending',
    submittedAt: '2026-04-13T11:00:00Z'
  },
  {
    id: '6',
    fullName: 'James Wilson',
    email: 'james.w@wilsonrealty.com',
    phone: '+1 (555) 678-9012',
    companyName: 'Wilson Realty Group',
    role: 'Real Estate Agent',
    experience: '0-2',
    dealsClosed: '12',
    location: 'Seattle, WA',
    specializations: ['Residential', 'First-time Buyers'],
    description: 'New agent with fresh perspective and strong digital marketing skills. Former tech professional.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    status: 'approved',
    submittedAt: '2026-04-10T13:45:00Z',
    reviewedAt: '2026-04-10T15:20:00Z',
    reviewedBy: 'Admin User'
  }
];

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
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
            : 'border-gray-200 hover:border-[var(--color-primary-400)]'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-[var(--color-primary-600)]">{icon}</span>}
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>{selectedLabel}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
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

export default function JoinBrokerApplicationsAdmin() {
  // const [applications, setApplications] = useState<BrokerApplication[]>(mockApplications);
  const [applications, setApplications] = useState<BrokerApplication[]>([]);
const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<BrokerApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Stats
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      today: applications.filter(a => {
        const today = new Date().toISOString().split('T')[0];
        return a.submittedAt.startsWith(today);
      }).length
    };
  }, [applications]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
  loadApplications();
}, []);
const loadApplications = async () => {
  try {
    setLoading(true);
    const response = await fetch('https://appapi.estateai.in/api/user/newusers', {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const result = await response.json();
    
    // Map API data to your BrokerApplication interface
    const mappedApps = (result.data || []).map((user: any) => ({
      id: user.id,
      fullName: user.name,
      email: user.email,
      phone: user.phone || '',
      companyName: user.company || '',
      role: user.role || 'N/A',
      experience: user.experience || '',
      dealsClosed: '', // API doesn't have this
      location: user.city || '',
      specializations: user.specialization 
        ? (typeof user.specialization === 'string' 
            ? JSON.parse(user.specialization) 
            : user.specialization)
        : [],
      description: '', // API doesn't have this
      profileImage: user.image 
        ? (typeof user.image === 'string' 
            ? JSON.parse(user.image)[0] 
            : user.image)
        : null,
      status: 'pending', // API doesn't have status - default to pending or filter by role
      submittedAt: new Date().toISOString() // API doesn't have this
    }));
    
    setApplications(mappedApps);
  } catch (error) {
    console.error('Error loading applications:', error);
    setApplications([]); // Don't leave stale data
  } finally {
    setLoading(false);
  }
};
// useEffect(() => {
//   loadStats();
// }, []);

// const loadStats = async () => {
//   try {
//     const data = await fetchStats();
//     // Use API stats instead of computed stats
//   } catch (error) {
//     console.error('Error loading stats:', error);
//   }
// };
const handleApprove = async (id: string) => {
  try {
    const response = await fetch(`https://appapi.estateai.in/api/user/newusers/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'approved',
        role: 'client_admin' // if you want to assign role on approve
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to approve application');
    }
    
    // Update local state
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'approved' as const } : app
    ));
    
    if (selectedApplication?.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, status: 'approved' as const } : null);
    }
    
    // Close modal if open
    setIsModalOpen(false);
    
  } catch (error: any) {
    console.error('Error approving:', error);
    alert(error.message || 'Failed to approve application');
  }
};
// Handle reject with API
const handleReject = async (id: string) => {
  if (!rejectionReason.trim()) {
    setShowRejectionInput(true);
    return;
  }
  
  try {
    const response = await fetch(`https://appapi.estateai.in/api/user/newusers/${id}`, {
      method: 'DELETE', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'rejected',
        rejectionReason: rejectionReason
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to reject application');
    }
    
    // If DELETE removes user, filter out from list
    setApplications(prev => prev.filter(app => app.id !== id));
    
    // If PUT updates status instead, use this:
    // setApplications(prev => prev.map(app => 
    //   app.id === id ? { ...app, status: 'rejected' as const, rejectionReason } : app
    // ));
    
    // Reset states
    setRejectionReason('');
    setShowRejectionInput(false);
    setIsModalOpen(false);
    setSelectedApplication(null);
    
  } catch (error: any) {
    console.error('Error rejecting:', error);
    alert(error.message || 'Failed to reject application');
  }
};
 

  const openApplicationDetails = (app: BrokerApplication) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
    setShowRejectionInput(false);
    setRejectionReason('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
    setShowRejectionInput(false);
    setRejectionReason('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary-600)] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Broker Applications</h1>
                <p className="text-xs text-gray-500">Review and manage broker applications</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-50)] rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[var(--color-primary-700)]">{stats.pending} pending</span>
              </div>
              <div className="w-8 h-8 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-[var(--color-primary-700)]">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Total</p>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Pending</p>
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Approved</p>
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Rejected</p>
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Today</p>
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.today}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex p-1 bg-white rounded-xl border border-gray-200 shadow-sm">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'pending', label: 'Pending', count: stats.pending },
              { id: 'approved', label: 'Approved', count: stats.approved },
              { id: 'rejected', label: 'Rejected', count: stats.rejected }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setStatusFilter(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === tab.id 
                    ? 'bg-[var(--color-primary-600)] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

     {/* Applications Table */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {paginatedApplications.map((app) => (
          <tr key={app.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <img 
                  src={app.profileImage || 'https://via.placeholder.com/100'} 
                  alt={app.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-900">{app.fullName}</p>
                  <p className="text-sm text-gray-500">{app.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                {getStatusIcon(app.status)}
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(app.submittedAt)}
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <button 
                  onClick={() => openApplicationDetails(app)}
                  className="p-2 text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                {app.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApprove(app.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => openApplicationDetails(app)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {paginatedApplications.length === 0 && (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-500 font-medium">No applications found</p>
      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
    </div>
  )}

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length} results
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-[var(--color-primary-600)] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )}
</div>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedApplication.profileImage || 'https://via.placeholder.com/100'} 
                    alt={selectedApplication.fullName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.fullName}</h2>
                    <p className="text-gray-500">{selectedApplication.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                  <button 
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4 text-[var(--color-primary-600)]" />
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{selectedApplication.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{selectedApplication.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{selectedApplication.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[var(--color-primary-600)]" />
                        Professional Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">Role</p>
                          <p className="font-medium text-gray-900">{selectedApplication.role}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">Experience</p>
                          <p className="font-medium text-gray-900">{selectedApplication.experience} years</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">Deals Closed</p>
                          <p className="font-medium text-[var(--color-primary-600)]">{selectedApplication.dealsClosed}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-500 mb-1">Applied On</p>
                          <p className="font-medium text-gray-900">{formatDate(selectedApplication.submittedAt)}</p>
                        </div>
                      </div>
                    </div>

                    {selectedApplication.reviewedAt && (
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Reviewed</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedApplication.reviewedAt)}</p>
                        <p className="text-xs text-gray-500 mt-1">By {selectedApplication.reviewedBy}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4 text-[var(--color-primary-600)]" />
                        Specializations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.specializations.map((spec, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[var(--color-primary-600)]" />
                        Professional Description
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed">
                        {selectedApplication.description}
                      </div>
                    </div>

                    {selectedApplication.rejectionReason && (
                      <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <p className="font-medium text-red-900">Rejection Reason</p>
                        </div>
                        <p className="text-sm text-red-700">{selectedApplication.rejectionReason}</p>
                      </div>
                    )}

                    {/* Rejection Input */}
                    {showRejectionInput && selectedApplication.status === 'pending' && (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Reason for Rejection *
                        </label>
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                          placeholder="Provide a reason for rejection..."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              {selectedApplication.status === 'pending' && (
                <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-gray-200 bg-gray-50/50">
                  {!showRejectionInput ? (
                    <>
                      <button 
                        onClick={() => setShowRejectionInput(true)}
                        className="flex items-center gap-2 px-6 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white rounded-xl font-medium transition-colors shadow-lg"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Approve Application
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setShowRejectionInput(false);
                          setRejectionReason('');
                        }}
                        className="px-6 py-3 text-gray-600 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleReject(selectedApplication.id)}
                        disabled={!rejectionReason.trim()}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Confirm Rejection
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}