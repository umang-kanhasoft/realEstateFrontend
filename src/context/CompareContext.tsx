'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CompareContextType {
  compareProperties: string[];
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareProperties, setCompareProperties] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = localStorage.getItem('compare-context-storage');
      if (favorites) {
        try {
          setCompareProperties(JSON.parse(favorites));
        } catch (e) {
          console.error('Failed to parse compare list', e);
        }
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'compare-context-storage',
        JSON.stringify(compareProperties)
      );
    }
  }, [compareProperties]);

  const addToCompare = (propertyId: string) => {
    setCompareProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else if (prev.length < 4) {
        return [...prev, propertyId];
      }
      return prev;
    });
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareProperties(prev => prev.filter(id => id !== propertyId));
  };

  const clearCompare = () => {
    setCompareProperties([]);
  };

  const isInCompare = (propertyId: string) => {
    return compareProperties.includes(propertyId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareProperties,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
