// components/BrokerPropertiesModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Bed, Bath, Square, ArrowRight, Loader2, Home } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  type: string;
  status: 'available' | 'sold' | 'pending';
}

interface BrokerPropertiesModalProps {
  brokerId: string;
  brokerName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BrokerPropertiesModal({ 
  brokerId, 
  brokerName, 
  isOpen, 
  onClose 
}: BrokerPropertiesModalProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !brokerId) return;
    
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/brokers/${brokerId}/properties`);
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [isOpen, brokerId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {brokerName}'s Properties
                </h2>
                <p className="text-gray-500 mt-1">
                  {properties.length} properties listed
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-[var(--color-primary-600)] animate-spin" />
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-20">
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Listed</h3>
                  <p className="text-gray-500">This broker hasn't listed any properties yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Property Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={property.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            property.status === 'available' ? 'bg-green-500 text-white' :
                            property.status === 'pending' ? 'bg-yellow-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                            {property.type}
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                        <p className="text-[var(--color-primary-600)] font-bold text-lg mb-2">{property.price}</p>
                        
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{property.location}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span>{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}