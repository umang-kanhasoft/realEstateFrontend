'use client';

import { getFeaturedProperties, propertiesData } from '@/data/properties';
import {
  Property,
  PropertyAction,
  PropertyContextValue,
  PropertyFilter,
  PropertyState,
  ProviderProps,
} from '@/types';
import { DEFAULT_FILTER } from '@/utils/constants';
import {
  filterProperties,
  getLocalStorage,
  setLocalStorage,
  sortProperties,
} from '@/utils/helpers';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const FAVORITES_STORAGE_KEY = 'realestate-favorites';
const RECENTLY_VIEWED_KEY = 'realestate-recently-viewed';

const initialState: PropertyState = {
  properties: [],
  featuredProperties: [],
  selectedProperty: null,
  filters: DEFAULT_FILTER,
  searchResults: null,
  isLoading: false,
  error: null,
  favorites: [],
  recentlyViewed: [],
  compareList: [],
};

const propertyReducer = (
  state: PropertyState,
  action: PropertyAction
): PropertyState => {
  switch (action.type) {
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_FEATURED_PROPERTIES':
      return { ...state, featuredProperties: action.payload };
    case 'SET_SELECTED_PROPERTY':
      return { ...state, selectedProperty: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: DEFAULT_FILTER };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
      };
    case 'ADD_TO_COMPARE':
      if (state.compareList.length >= 4) return state;
      return {
        ...state,
        compareList: [...state.compareList, action.payload],
      };
    case 'REMOVE_FROM_COMPARE':
      return {
        ...state,
        compareList: state.compareList.filter(id => id !== action.payload),
      };
    case 'CLEAR_COMPARE_LIST':
      return { ...state, compareList: [] };
    case 'ADD_TO_RECENTLY_VIEWED': {
      const filteredViewed = state.recentlyViewed.filter(
        id => id !== action.payload
      );
      return {
        ...state,
        recentlyViewed: [action.payload, ...filteredViewed].slice(0, 10),
      };
    }
    default:
      return state;
  }
};

export const PropertyContext = createContext<PropertyContextValue | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  // Load saved data on mount
  useEffect(() => {
    const savedFavorites = getLocalStorage<string[]>(FAVORITES_STORAGE_KEY, []);
    const savedRecentlyViewed = getLocalStorage<string[]>(
      RECENTLY_VIEWED_KEY,
      []
    );

    savedFavorites.forEach(id => {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: id });
    });

    savedRecentlyViewed.forEach(id => {
      dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: id });
    });

    // Load initial properties
    dispatch({ type: 'SET_PROPERTIES', payload: propertiesData });
    dispatch({
      type: 'SET_FEATURED_PROPERTIES',
      payload: getFeaturedProperties(),
    });
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    setLocalStorage(FAVORITES_STORAGE_KEY, state.favorites);
  }, [state.favorites]);

  // Save recently viewed to localStorage
  useEffect(() => {
    setLocalStorage(RECENTLY_VIEWED_KEY, state.recentlyViewed);
  }, [state.recentlyViewed]);

  const fetchProperties = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'SET_PROPERTIES', payload: propertiesData });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to fetch properties',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const fetchPropertyById = useCallback(
    async (id: string): Promise<Property | null> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const property = propertiesData.find(p => p.id === id) || null;
        dispatch({ type: 'SET_SELECTED_PROPERTY', payload: property });

        if (property) {
          dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: id });
        }

        return property;
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch property' });
        return null;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    []
  );

  const setFilters = useCallback((filters: Partial<PropertyFilter>): void => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const resetFilters = useCallback((): void => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const searchProperties = useCallback(async (query: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const filtered = filterProperties(propertiesData, {
        ...DEFAULT_FILTER,
        searchQuery: query,
      });
      const sorted = sortProperties(filtered, 'newest');

      dispatch({
        type: 'SET_SEARCH_RESULTS',
        payload: {
          properties: sorted,
          totalCount: sorted.length,
          currentPage: 1,
          totalPages: Math.ceil(sorted.length / 12),
          hasNextPage: sorted.length > 12,
          hasPrevPage: false,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SET_ERROR', payload: 'Search failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const addToFavorites = useCallback((propertyId: string): void => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: propertyId });
  }, []);

  const removeFromFavorites = useCallback((propertyId: string): void => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: propertyId });
  }, []);

  const addToCompare = useCallback((propertyId: string): void => {
    dispatch({ type: 'ADD_TO_COMPARE', payload: propertyId });
  }, []);

  const removeFromCompare = useCallback((propertyId: string): void => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', payload: propertyId });
  }, []);

  const clearCompareList = useCallback((): void => {
    dispatch({ type: 'CLEAR_COMPARE_LIST' });
  }, []);

  const value = useMemo<PropertyContextValue>(
    () => ({
      state,
      fetchProperties,
      fetchPropertyById,
      setFilters,
      resetFilters,
      searchProperties,
      addToFavorites,
      removeFromFavorites,
      addToCompare,
      removeFromCompare,
      clearCompareList,
    }),
    [
      state,
      fetchProperties,
      fetchPropertyById,
      setFilters,
      resetFilters,
      searchProperties,
      addToFavorites,
      removeFromFavorites,
      addToCompare,
      removeFromCompare,
      clearCompareList,
    ]
  );

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
