'use client';

import {
  budgetToNumber,
  mapApiToSort,
  mapSortToApi,
  numberToBudget,
  URL_KEYS,
} from '@/utils/filterUtils';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface ProjectFiltersState {
  selectedCity: string;
  searchQuery: string;
  selectedLocalities: string[];
  selectedBHK: string[];
  minBudget: string;
  maxBudget: string;
  selectedPossession: string[];
  selectedPropType: string[];
  selectedSort: string;
}

interface ProjectFiltersContextType {
  filters: ProjectFiltersState;
  updateFilters: (updates: Partial<ProjectFiltersState>) => void;
  resetFilters: () => void;
}

const defaultFilters: ProjectFiltersState = {
  selectedCity: 'Ahmedabad',
  searchQuery: '',
  selectedLocalities: [],
  selectedBHK: [],
  minBudget: '',
  maxBudget: '',
  selectedPossession: [],
  selectedPropType: [],
  selectedSort: 'Featured',
};

const ProjectFiltersContext = createContext<
  ProjectFiltersContextType | undefined
>(undefined);

export function ProjectFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ProjectFiltersState>(defaultFilters);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize and sync filters from URL
  useEffect(() => {
    if (!searchParams) return;

    const city = searchParams.get(URL_KEYS.CITY);
    const area = searchParams.get(URL_KEYS.AREA);
    const search = searchParams.get(URL_KEYS.SEARCH);
    const minPrice = searchParams.get(URL_KEYS.MIN_PRICE);
    const maxPrice = searchParams.get(URL_KEYS.MAX_PRICE);
    const bhk = searchParams.get(URL_KEYS.BHK);
    const propertyType = searchParams.get(URL_KEYS.PROPERTY_TYPE);
    const status = searchParams.get(URL_KEYS.POSSESSION);
    const sortBy = searchParams.get(URL_KEYS.SORT_BY);
    const sortOrder = searchParams.get(URL_KEYS.SORT_ORDER);

    setFilters(prev => {
      const newState = { ...prev };
      let hasChanges = false;

      if (city && city !== prev.selectedCity) {
        newState.selectedCity = city;
        hasChanges = true;
      }

      if (search && search !== prev.searchQuery) {
        newState.searchQuery = search;
        hasChanges = true;
      } else if (!search && prev.searchQuery) {
        newState.searchQuery = '';
        hasChanges = true;
      }

      if (area) {
        const areas = area.split(',').filter(Boolean);
        if (areas.join(',') !== prev.selectedLocalities.join(',')) {
          newState.selectedLocalities = areas;
          hasChanges = true;
        }
      } else if (prev.selectedLocalities.length > 0) {
        newState.selectedLocalities = [];
        hasChanges = true;
      }

      if (bhk) {
        const bhks = bhk.split(',').filter(Boolean);
        if (bhks.join(',') !== prev.selectedBHK.join(',')) {
          newState.selectedBHK = bhks;
          hasChanges = true;
        }
      } else if (prev.selectedBHK.length > 0) {
        newState.selectedBHK = [];
        hasChanges = true;
      }

      const minBudgetString = minPrice ? numberToBudget(Number(minPrice)) : '';
      if (minBudgetString !== prev.minBudget) {
        newState.minBudget = minBudgetString;
        hasChanges = true;
      }

      const maxBudgetString = maxPrice ? numberToBudget(Number(maxPrice)) : '';
      if (maxBudgetString !== prev.maxBudget) {
        newState.maxBudget = maxBudgetString;
        hasChanges = true;
      }

      if (propertyType) {
        const types = propertyType.split(',').filter(Boolean);
        if (types.join(',') !== prev.selectedPropType.join(',')) {
          newState.selectedPropType = types;
          hasChanges = true;
        }
      } else if (prev.selectedPropType.length > 0) {
        newState.selectedPropType = [];
        hasChanges = true;
      }

      if (status) {
        const stats = status.split(',').filter(Boolean);
        if (stats.join(',') !== prev.selectedPossession.join(',')) {
          newState.selectedPossession = stats;
          hasChanges = true;
        }
      } else if (prev.selectedPossession.length > 0) {
        newState.selectedPossession = [];
        hasChanges = true;
      }

      if (sortBy && sortOrder) {
        const sortLabel = mapApiToSort(sortBy, sortOrder);
        if (sortLabel !== prev.selectedSort) {
          newState.selectedSort = sortLabel;
          hasChanges = true;
        }
      }

      return hasChanges ? newState : prev;
    });
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: Partial<ProjectFiltersState>) => {
      setFilters(prev => {
        const next = { ...prev, ...updates };

        const params = new URLSearchParams();

        if (next.selectedCity) params.set(URL_KEYS.CITY, next.selectedCity);
        if (next.searchQuery) params.set(URL_KEYS.SEARCH, next.searchQuery);
        if (next.selectedLocalities.length > 0) {
          params.set(URL_KEYS.AREA, next.selectedLocalities.join(','));
        }
        if (next.selectedBHK.length > 0) {
          params.set(URL_KEYS.BHK, next.selectedBHK.join(','));
        }

        if (next.minBudget) {
          const minVal = budgetToNumber(next.minBudget);
          if (minVal) params.set(URL_KEYS.MIN_PRICE, minVal.toString());
        }

        if (next.maxBudget) {
          const maxVal = budgetToNumber(next.maxBudget);
          if (maxVal) params.set(URL_KEYS.MAX_PRICE, maxVal.toString());
        }

        if (next.selectedPropType.length > 0) {
          params.set(URL_KEYS.PROPERTY_TYPE, next.selectedPropType.join(','));
        }

        if (next.selectedPossession.length > 0) {
          params.set(URL_KEYS.POSSESSION, next.selectedPossession.join(','));
        }

        if (next.selectedSort) {
          const { sortBy, sortOrder } = mapSortToApi(next.selectedSort);
          params.set(URL_KEYS.SORT_BY, sortBy);
          params.set(URL_KEYS.SORT_ORDER, sortOrder);
        }

        router.replace(`/projects?${params.toString()}`, { scroll: false });

        return next;
      });
    },
    [router]
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    router.replace('/projects', { scroll: false });
  }, [router]);

  const contextValue = useMemo(
    () => ({
      filters,
      updateFilters,
      resetFilters,
    }),
    [filters, updateFilters, resetFilters]
  );

  return (
    <ProjectFiltersContext.Provider value={contextValue}>
      {children}
    </ProjectFiltersContext.Provider>
  );
}

export function useProjectFilters() {
  const context = useContext(ProjectFiltersContext);
  if (!context) {
    throw new Error(
      'useProjectFilters must be used within ProjectFiltersProvider'
    );
  }
  return context;
}
