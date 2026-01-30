import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Filters } from '@/types';

interface SearchState {
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

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      filters: initialFilters,
      
      setFilters: (filters: Partial<Filters>) => {
        set({ filters });
      },
      
      resetFilters: () => {
        set({ filters: initialFilters });
      },
      
      updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }));
      },
    }),
    {
      name: 'search-filters-storage',
    }
  )
);
