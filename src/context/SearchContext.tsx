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
const SEARCH_FILTERS_STORAGE_KEY = 'search-context-filters';
const LEGACY_SEARCH_FILTERS_STORAGE_KEY = 'search-filters-storage';

export function SearchProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available, otherwise use initialFilters
  const [filters, setFiltersState] = useState<Partial<Filters>>(() => {
    if (typeof window !== 'undefined') {
      const storedFilters = localStorage.getItem(SEARCH_FILTERS_STORAGE_KEY);
      if (storedFilters) {
        try {
          return JSON.parse(storedFilters);
        } catch (e) {
          console.error('Failed to parse search filters from local storage', e);
        }
      }

      const legacyFilters = localStorage.getItem(
        LEGACY_SEARCH_FILTERS_STORAGE_KEY
      );
      if (legacyFilters) {
        try {
          const parsed = JSON.parse(legacyFilters);
          return parsed.state?.filters || parsed || initialFilters;
        } catch (e) {
          console.error('Failed to parse legacy search filters', e);
        }
      }
    }
    return initialFilters;
  });

  // Persist to localStorage whenever filters change
  useEffect(() => {
    localStorage.setItem(SEARCH_FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const setFilters = useCallback((newFilters: Partial<Filters>) => {
    setFiltersState(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(initialFilters);
  }, []);

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFiltersState(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const value = useMemo(
    () => ({ filters, setFilters, resetFilters, updateFilter }),
    [filters, resetFilters, setFilters, updateFilter]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
