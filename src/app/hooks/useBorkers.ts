// app/hooks/useBrokers.ts
'use client';

import { useState, useCallback, useEffect } from 'react';

interface Broker {
  id: string;
  name: string;
  image: string;
  company: string;
  role: string;
  location: string;
  description: string;
  email: string;
  phone: string;
  experience: string;
  specialization: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseBrokersReturn {
  brokers: Broker[];
  loading: boolean;
  error: string | null;
  fetchBrokers: () => Promise<void>;
  addBroker: (data: Omit<Broker, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Broker | null>;
  updateBroker: (id: string, data: Partial<Broker>) => Promise<Broker | null>;
  deleteBroker: (id: string) => Promise<boolean>;
}

export function useBrokers(): UseBrokersReturn {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrokers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/brokers');
      if (!response.ok) throw new Error('Failed to fetch brokers');
      const data = await response.json();
      setBrokers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBroker = async (data: Omit<Broker, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/brokers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to add broker');
      const newBroker = await response.json();
      setBrokers(prev => [newBroker, ...prev]);
      return newBroker;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    }
  };

  const updateBroker = async (id: string, data: Partial<Broker>) => {
    try {
      const response = await fetch(`/api/brokers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update broker');
      const updatedBroker = await response.json();
      setBrokers(prev => prev.map(b => b.id === id ? updatedBroker : b));
      return updatedBroker;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    }
  };

  const deleteBroker = async (id: string) => {
    try {
      const response = await fetch(`/api/brokers/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete broker');
      setBrokers(prev => prev.filter(b => b.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    }
  };

  return {
    brokers,
    loading,
    error,
    fetchBrokers,
    addBroker,
    updateBroker,
    deleteBroker
  };
}