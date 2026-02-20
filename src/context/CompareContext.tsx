'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const [isHydrated, setIsHydrated] = useState(false);

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
      setIsHydrated(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      localStorage.setItem(
        'compare-context-storage',
        JSON.stringify(compareProperties)
      );
    }
  }, [compareProperties, isHydrated]);

  const addToCompare = useCallback((propertyId: string) => {
    setCompareProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else if (prev.length < 4) {
        return [...prev, propertyId];
      }
      return prev;
    });
  }, []);

  const removeFromCompare = useCallback((propertyId: string) => {
    setCompareProperties(prev => prev.filter(id => id !== propertyId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareProperties([]);
  }, []);

  const isInCompare = useCallback(
    (propertyId: string) => {
      return compareProperties.includes(propertyId);
    },
    [compareProperties]
  );

  const value = useMemo(
    () => ({
      compareProperties,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
    }),
    [
      addToCompare,
      clearCompare,
      compareProperties,
      isInCompare,
      removeFromCompare,
    ]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
