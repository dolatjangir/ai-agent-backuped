// app/brokers/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  MapPin, 
  Building2, 
  Phone, 
  Mail, 
  Loader2,
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Broker {
  id: string;
  name: string;
  image?: File | string;
  company: string;
  role: string;
  city: string;
  // description: string;
  email: string;
  phone: string;
  experience: string;
  specialization: string[] | any;
    AddressLine1?: string;  
  AddressLine2?: string;
  createdAt: string;
  updatedAt: string;
}

interface BrokerFormData {
  name: string;
  image?:  File |string;
  company: string;
  role: string;
  city: string;
  // description: string;
  email: string;
  phone: string;
  experience: string;
  specialization: string;
   AddressLine1?: string;  
  AddressLine2?: string;
  removedAdminImages?: string[];
}
interface BrokerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BrokerFormData & { removedAdminImages?: string[] }) => void;
  initialData?: Broker | null;
  isEditing: boolean;
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
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-16 bg-gray-200 rounded" />
    </div>
  </div>
);

// Broker Card Component
const BrokerCard = ({ 
  broker, 
  onView, 
  onEdit, 
  onDelete,
  isAdmin = true 
}: { 
  broker: Broker; 
  onView: (broker: Broker) => void;
  onEdit: (broker: Broker) => void;
  onDelete: (id: string) => void;
  isAdmin?: boolean;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -4 }}
    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
    onClick={() => onView(broker)}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={broker.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
        alt={broker.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(broker); }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-[var(--color-primary-50)] text-[var(--color-primary-600)] transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(broker.id); }}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
    
    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{broker.name}</h3>
      <p className="text-[var(--color-primary-600)] font-medium text-sm mb-2">{broker.role}</p>
      
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
        <Building2 className="w-4 h-4" />
        <span>{broker.company}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <MapPin className="w-4 h-4" />
        <span>{broker.city}</span>
      </div>
      
      {/* <p className="text-gray-600 text-sm line-clamp-2">{broker.description}</p> */}
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {broker.specialization.slice(0, 3).map((spec:any, idx:any) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs rounded-full font-medium"
            >
              {spec}
            </span>
          ))}
          {broker.specialization.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{broker.specialization.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
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
  if (!broker) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="relative h-64 md:h-72 shrink-0">
              <img 
                src={broker.image || 'https://via.placeholder.com/800x400?text=No+Image'} 
                alt={broker.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-3xl font-bold mb-1">{broker.name}</h2>
                <p className="text-lg text-white/90">{broker.role} at {broker.company}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                  {/* <p className="text-gray-700 leading-relaxed mb-6">{broker.description}</p> */}
                  
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Specialization</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {broker.specialization.map((spec:any, idx:any) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Info</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`mailto:${broker.email}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                          {broker.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <a href={`tel:${broker.phone}`} className="hover:text-[var(--color-primary-600)] transition-colors">
                          {broker.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span>{broker.city}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <Building2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                        <span>{broker.company}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--color-primary-50)] rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-[var(--color-primary-800)] uppercase tracking-wider mb-2">Experience</h3>
                    <p className="text-[var(--color-primary-700)] font-medium">{broker.experience}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[var(--color-primary-600)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors"
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Broker Form Modal
const BrokerFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BrokerFormData) => void;
  initialData?: Broker | null;
  isEditing: boolean;
}) => {
  const [formData, setFormData] = useState<BrokerFormData>({
    name: '',
    image: '',
    company: '',
    role: '',
    city: '',
    // description: '',
    email: '',
    phone: '',
    experience: '',
    specialization: '',
    AddressLine1: '',        // Added
  AddressLine2: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BrokerFormData, string>>>({});
   const [removedImages, setRemovedImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
      image: initialData.image || '',
      company: initialData.company,
      role: 'client_admin',
      city: initialData.city,
      email: initialData.email,
      phone: initialData.phone || '',
      experience: initialData.experience || '',
      specialization: Array.isArray(initialData.specialization) 
        ? initialData.specialization.join(', ') 
        : initialData.specialization || '',
      AddressLine1: initialData.AddressLine1 || '',
      AddressLine2: initialData.AddressLine2 || ''
      });
    } else {
      setFormData({
        name: '',
        image: '',
        company: '',
        role: 'client_admin',
        city: '',
        // description: '',
        email: '',
        phone: '',
        experience: '',
        specialization: '',
          AddressLine1: '',
      AddressLine2: ''
    
      });
    }
    setErrors({});
     setRemovedImages([]);
  }, [initialData, isOpen,isEditing]);

const validate = (): boolean => {
  const newErrors: Partial<Record<keyof BrokerFormData, string>> = {};
  
  if (!formData.name.trim()) newErrors.name = 'Name is required';
  if (!formData.email.trim()) newErrors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
  if (!formData.company.trim()) newErrors.company = 'Company is required';
  // Remove role validation (hardcoded)
  // Remove description validation
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, removedAdminImages: removedImages });
    }
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, type } = e.target;
  
  if (type === 'file' && 'files' in e.target) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [name]: file }));
    }
  } else {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  
  if (errors[name as keyof BrokerFormData]) {
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Broker' : 'Add New Broker'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
             onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                 {formData.image && typeof formData.image === 'string' && (
    <div className="relative inline-block mb-3">
      <img 
        src={formData.image} 
        alt="Current" 
        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
      />
      <button
        type="button"
        onClick={() => {
          setRemovedImages(prev => [...prev, formData.image as string]);
          setFormData(prev => ({ ...prev, image: '' }));
        }}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-sm"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )}
 
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.company ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Real Estate Co."
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="Senior Broker"
                  />
                  {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="New York, NY"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="10+ years"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization (comma-separated)</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
                    placeholder="Residential, Commercial, Luxury Homes"
                  />
                </div>
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
  <input
    type="text"
    name="AddressLine1"
    value={formData.AddressLine1 || ""}
    onChange={handleChange}
    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
    placeholder="123 Main Street"
  />
</div>

{/* Add Address Line 2 */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
  <input
    type="text"
    name="AddressLine2"
    value={formData.AddressLine2 || ""}
    onChange={handleChange}
    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
    placeholder="Apt 4B"
  />
</div>

                
                {/* <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all resize-none"
                    placeholder="Brief description about the broker..."
                  />
                </div> */}
              </div>
            </form>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-[var(--color-primary-600)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors"
              >
                {isEditing ? 'Update Broker' : 'Add Broker'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  brokerName
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  brokerName: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Broker?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{brokerName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Main Page Component
export default function BrokersPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBroker, setEditingBroker] = useState<Broker | null>(null);
  const [deletingBroker, setDeletingBroker] = useState<Broker | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  // Fetch brokers
  const fetchBrokers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://appapi.estateai.in/api/admin/all',{credentials:"include"});
      if (!response.ok) throw new Error('Failed to fetch brokers');
      const result = await response.json();
         console.log('API Response:', result);
      const admins = result.admins || [];
      const mappedBrokers = admins.map((admin: any) => ({
      id: admin._id || admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      city: admin.city || '',
      company: admin.company || '',
      phone: admin.phone || '',
      experience: admin.experience || '',
      specialization: admin.specialization 
        ? (typeof admin.specialization === 'string' 
            ? admin.specialization.split(',').map((s: string) => s.trim()).filter(Boolean)
            : admin.specialization)
        : [],
      AddressLine1: admin.AddressLine1 || admin.AddresssLine1 || '',
      AddressLine2: admin.AddressLine2 || admin.AddresssLine2 || '',
       image: admin.AdminImage 
    ? JSON.parse(admin.AdminImage)[0] 
    : '',
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    }));
    
    setBrokers(mappedBrokers);
    } catch (error) {
    showToast('Failed to load brokers', 'error');
    setBrokers([]);
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

  // CRUD Operations
const handleAddBroker = async (formData: BrokerFormData) => {
  try {
    // MUST use FormData for file uploads, NOT JSON
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', 'defaultPassword123');
    formDataToSend.append('role', 'client_admin');
    formDataToSend.append('company', formData.company);
    formDataToSend.append('city', formData.city || '');
    formDataToSend.append('phone', formData.phone || '');
    formDataToSend.append('experience', formData.experience || '');
    formDataToSend.append('specialization', formData.specialization || '');
    formDataToSend.append('AddressLine1', formData.AddressLine1 || '');
    formDataToSend.append('AddressLine2', formData.AddressLine2 || '');
    formDataToSend.append('status', 'active');

    // Append image FILE (not URL string)
    if (formData.image && typeof formData.image !== 'string') {
      formDataToSend.append('AdminImage', formData.image); // or 'AgentImage' - check your backend
    }

    const response = await fetch('https://appapi.estateai.in/api/admin/create', {
      method: 'POST',
      credentials: 'include',
      // DO NOT set Content-Type header - browser sets it automatically with boundary
      body: formDataToSend
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to add broker');
    }
    
    const result = await response.json();
    console.log('Create response:', result); // DEBUG
    
    const newBroker: Broker = {
      id: result.adminData?._id || result.adminData?.id || result.data?._id,
      name: result.adminData?.name || formData.name,
      email: result.adminData?.email || formData.email,
      role: result.adminData?.role || 'client_admin',
      city: result.adminData?.city || formData.city || '',
      company: result.adminData?.company || formData.company || '',
      phone: result.adminData?.phone || formData.phone || '',
      experience: result.adminData?.experience || formData.experience || '',
      specialization: result.adminData?.specialization 
        ? (typeof result.adminData.specialization === 'string' 
            ? result.adminData.specialization.split(',').map((s: string) => s.trim()).filter(Boolean)
            : result.adminData.specialization)
        : [],
      AddressLine1: result.adminData?.AddresssLine1 || result.adminData?.AddressLine1 || '',
      AddressLine2: result.adminData?.AddresssLine2 || result.adminData?.AddressLine2 || '',
      // Try multiple possible field names
      image: result.adminData?.AdminImage 
        || result.adminData?.AgentImage 
        || result.adminData?.image 
        || (formData.image && typeof formData.image === 'string' ? formData.image : ''),
      createdAt: result.adminData?.createdAt || new Date().toISOString(),
      updatedAt: result.adminData?.updatedAt || new Date().toISOString()
    };
    
    setBrokers(prev => [newBroker, ...prev]);
    setIsFormModalOpen(false);
    showToast(result.message || 'Broker added successfully', 'success');
    
    // Refresh the list to get the correct image URL from server
    fetchBrokers();
  } catch (error: any) {
    showToast(error.message || 'Failed to add broker', 'error');
  }
};

 const handleEditBroker = async (formData: BrokerFormData & { removedAdminImages?: string[] }) => {
  if (!editingBroker) return;
  
  try {
    const formDataToSend = new FormData();
    
    // Append all text fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('city', formData.city || '');
    formDataToSend.append('phone', formData.phone || '');
    formDataToSend.append('experience', formData.experience || '');
    formDataToSend.append('specialization', formData.specialization || '');
    formDataToSend.append('AddressLine1', formData.AddressLine1 || '');
    formDataToSend.append('AddressLine2', formData.AddressLine2 || '');
    
    // Append removed images if any
    if (formData.removedAdminImages && formData.removedAdminImages.length > 0) {
      formData.removedAdminImages.forEach((url) => {
        formDataToSend.append('removedAdminImages', url);
      });
    }
    
    // Append new image file if uploaded
    if (formData.image && typeof formData.image !== 'string') {
      formDataToSend.append('AdminImage', formData.image);
    }

    const response = await fetch(`https://appapi.estateai.in/api/admin/${editingBroker.id}/details`, {
      method: 'PUT', // or POST - check your API
      credentials: 'include',
      body: formDataToSend
    });
    
    if (!response.ok) throw new Error('Failed to update broker');
    
    const result = await response.json();
    
    // Refresh list to get updated data from server
    fetchBrokers();
    
    setIsFormModalOpen(false);
    setEditingBroker(null);
    showToast('Broker updated successfully', 'success');
  } catch (error: any) {
    showToast(error.message || 'Failed to update broker', 'error');
  }
};

const handleDeleteBroker = async () => {
  if (!deletingBroker) return;
  
  try {
    const response = await fetch(`https://appapi.estateai.in/api/admin/${deletingBroker.id}`, {
      method: 'DELETE',
      credentials: 'include'  // Important for cookies/auth
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete broker');
    }
    
    // Remove from local state immediately for fast UI
    setBrokers(prev => prev.filter(b => b.id !== deletingBroker.id));
    setIsDeleteModalOpen(false);
    setDeletingBroker(null);
    showToast('Broker deleted successfully', 'success');
  } catch (error: any) {
    showToast(error.message || 'Failed to delete broker', 'error');
  }
};
  const openAddModal = () => {
    setEditingBroker(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (broker: Broker) => {
    setEditingBroker(broker);
    setIsFormModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    const broker = brokers.find(b => b.id === id);
    if (broker) {
      setDeletingBroker(broker);
      setIsDeleteModalOpen(true);
    }
  };

  const openDetailModal = (broker: Broker) => {
    setSelectedBroker(broker);
    setIsDetailModalOpen(true);
  };

  const filteredBrokers = brokers.filter(broker => 
    broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    broker.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    broker.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Explore Brokers</h1>
              <p className="text-gray-600 mt-1">Find and connect with top real estate professionals</p>
            </div>
            
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary-600)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-700)] transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Broker
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brokers by name, company, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-200)] outline-none transition-all"
              />
            </div>
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <BrokerCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredBrokers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No brokers found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first broker to get started'}
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredBrokers.map((broker) => (
                <BrokerCard
                  key={broker.id}
                  broker={broker}
                  onView={openDetailModal}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <BrokerDetailModal
        broker={selectedBroker}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <BrokerFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingBroker(null);
        }}
        onSubmit={editingBroker ? handleEditBroker : handleAddBroker}
        initialData={editingBroker}
        isEditing={!!editingBroker}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingBroker(null);
        }}
        onConfirm={handleDeleteBroker}
        brokerName={deletingBroker?.name || ''}
      />
    </div>
  );
}
