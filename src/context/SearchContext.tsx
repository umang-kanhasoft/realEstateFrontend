'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Filters {
  location: string;
  type: string;
  priceMin: string;
  priceMax: string;
  sizeMin: string;
  sizeMax: string;
  status: string;
  ecoFriendly: boolean;
  nearTransport: boolean;
  nearSchools: boolean;
  nearHospitals: boolean;
  nearParks: boolean;
  builder: string;
  sortBy: string;
}

interface SearchContextType {
  filters: Partial<Filters>;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
}

const initialFilters: Partial<Filters> = {
  location: '',
  type: '',
  priceMin: '',
  priceMax: '',
  sizeMin: '',
  sizeMax: '',
  status: '',
  ecoFriendly: false,
  nearTransport: false,
  nearSchools: false,
  nearHospitals: false,
  nearParks: false,
  builder: '',
  sortBy: 'featured',
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available, otherwise use initialFilters
  const [filters, setFiltersState] = useState<Partial<Filters>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('search-filters-storage');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Zustand persist saves data in { state: { filters: ... }, version: ... }
          // We need to handle migration or just plain storage structure
          return parsed.state?.filters || initialFilters;
        } catch (e) {
          console.error('Failed to parse filters from local storage', e);
        }
      }
    }
    return initialFilters;
  });

  // Persist to localStorage whenever filters change
  useEffect(() => {
    // Mimicking zustand's persist structure for compatibility if needed,
    // or just saving raw filters. Let's save raw filters for cleaner context usage,
    // but if we want to read what zustand left, we might need to be careful.
    // For now, let's just save the filters object directly or wraps it to match similar structure if we want.
    // But since we are migrating, let's use a simpler key or override the old one properly.
    // Let's stick to the same key to keep user's data if possible, but the structure might differ.
    // Zustand: { state: ..., version: 0 }
    // Let's just save as { state: { filters } } to be compatible if we want to "upgrade" in place
    // OR just start fresh. Let's start fresh with a new key to avoid conflicts: 'search-context-filters'
    localStorage.setItem('search-context-filters', JSON.stringify(filters));
  }, [filters]);

  // Re-read from new key on mount if exists, else fallback to old key logic above (which I put in useState initializer)
  // Actually, let's simplify: read from 'search-context-filters' first.

  const setFilters = (newFilters: Partial<Filters>) => {
    setFiltersState(newFilters);
  };

  const resetFilters = () => {
    setFiltersState(initialFilters);
  };

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFiltersState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SearchContext.Provider
      value={{ filters, setFilters, resetFilters, updateFilter }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
