'use client';

import { propertyService } from '@/services/property.service';
import {
  ApiProjectObject,
  Property,
  PropertyAction,
  PropertyContextValue,
  PropertyFilter,
  PropertyState,
  ProviderProps,
} from '@/types';
import { DEFAULT_FILTER } from '@/utils/constants';
import { getLocalStorage, setLocalStorage } from '@/utils/helpers';
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
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
  },
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
    case 'SET_AI_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: {
          properties: action.payload,
          totalCount: action.payload.length,
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    case 'ADD_TO_RECENTLY_VIEWED': {
      const filteredViewed = state.recentlyViewed.filter(
        id => id !== action.payload
      );
      return {
        ...state,
        recentlyViewed: [action.payload, ...filteredViewed].slice(0, 10),
      };
    }
    case 'SET_PAGINATION':
      return { ...state, pagination: action.payload };
    case 'APPEND_PROPERTIES': {
      // Deduplicate items just in case
      const existingIds = new Set(state.properties.map(p => p.id));
      const newProps = action.payload.filter(p => !existingIds.has(p.id));
      return {
        ...state,
        properties: [...state.properties, ...newProps],
      };
    }
    default:
      return state;
  }
};

export const mapApiProjectToProperty = (
  project: ApiProjectObject
): Property => {
  let status: Property['status'] = 'for-sale';
  switch (project.status) {
    case 'new_launch':
      status = 'New Launch';
      break;
    case 'under_construction':
    case 'nearing_completion':
      status = 'Under Construction';
      break;
    case 'ready_to_move':
      status = 'Ready to Move';
      break;
    case 'sold_out':
      status = 'sold';
      break;
  }

  // Calculate ranges from unitTypes
  const unitTypes = project.unitTypes || [];
  const bedValues = unitTypes
    .map(u => u.bedrooms)
    .filter((b): b is number => !!b);
  const bathValues = unitTypes
    .map(u => u.bathrooms)
    .filter((b): b is number => !!b);
  const areaValues = unitTypes
    .map(u => u.carpetAreaSqft)
    .filter((a): a is number => !!a);
  const priceValues = unitTypes
    .map(u => u.price)
    .filter((p): p is number => !!p && p > 0);

  const minBeds = bedValues.length ? Math.min(...bedValues) : 0;
  const maxBeds = bedValues.length ? Math.max(...bedValues) : 0;
  const bedrooms =
    minBeds === maxBeds && minBeds !== 0
      ? minBeds
      : minBeds !== 0
        ? `${minBeds}-${maxBeds}`
        : undefined;

  const minBaths = bathValues.length ? Math.min(...bathValues) : 0;
  const maxBaths = bathValues.length ? Math.max(...bathValues) : 0;
  const bathrooms =
    minBaths === maxBaths && minBaths !== 0
      ? minBaths
      : minBaths !== 0
        ? `${minBaths}-${maxBaths}`
        : undefined;

  const minArea = areaValues.length ? Math.min(...areaValues) : 0;
  const maxArea = areaValues.length ? Math.max(...areaValues) : 0;
  const area =
    minArea === maxArea && minArea !== 0
      ? `${minArea.toLocaleString()} sqft`
      : minArea !== 0
        ? `${minArea.toLocaleString()}-${maxArea.toLocaleString()} sqft`
        : '';

  const minPrice = priceValues.length
    ? Math.min(...priceValues)
    : project.priceStartingFrom || 0;
  const maxPrice = priceValues.length ? Math.max(...priceValues) : undefined;

  return {
    id: project.id,
    title: project.name,
    slug: project.slug,
    description: '', // Not in list object
    price: minPrice,
    maxPrice: maxPrice && maxPrice > minPrice ? maxPrice : undefined,
    status,
    location: `${project.area}, ${project.city}`,
    images: project.mainImageUrl ? [project.mainImageUrl] : [],
    amenities: project.amenities || [],
    type: project.propertyType,
    bedrooms,
    bathrooms,
    area,
    size: minArea, // Keep numeric size for sorting if needed, using min
    isFeatured: project.isFeatured,
    ecoFriendly: project.ecoFriendly,
    possessionDate: project.possessionDate || undefined,
    completionTime: project.completionTime || undefined,
    reraId: project.reraNumber || undefined,
    rating: project.avgRating,
    reviews: project.totalReviews,
    builders: project.builders || [],
    unitTypes: project.unitTypes || [],
  };
};

interface ApiFilterParams {
  city?: string;
  propertyType?: string;
  priceMin?: string;
  priceMax?: string;
  builtUpAreaMin?: string;
  builtUpAreaMax?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

const mapFilters = (filters: PropertyFilter): ApiFilterParams => {
  const apiFilters: ApiFilterParams = {};

  if (filters.city) apiFilters.city = filters.city;
  if (filters.propertyType !== 'all')
    apiFilters.propertyType = filters.propertyType;

  if (filters.minPrice > 0) apiFilters.priceMin = filters.minPrice.toString();
  if (filters.maxPrice < 1000000000)
    apiFilters.priceMax = filters.maxPrice.toString();

  if (filters.minArea > 0)
    apiFilters.builtUpAreaMin = filters.minArea.toString();
  if (filters.maxArea < 100000)
    apiFilters.builtUpAreaMax = filters.maxArea.toString();

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        apiFilters.sortBy = 'newest';
        apiFilters.sortOrder = 'desc';
        break;
      case 'oldest':
        apiFilters.sortBy = 'newest';
        apiFilters.sortOrder = 'asc';
        break;
      case 'price-low-high':
        apiFilters.sortBy = 'priceStartingFrom';
        apiFilters.sortOrder = 'asc';
        break;
      case 'price-high-low':
        apiFilters.sortBy = 'priceStartingFrom';
        apiFilters.sortOrder = 'desc';
        break;
      case 'area-low-high':
        apiFilters.sortBy = 'size';
        apiFilters.sortOrder = 'asc';
        break;
      case 'area-high-low':
        apiFilters.sortBy = 'size';
        apiFilters.sortOrder = 'desc';
        break;
    }
  }

  return apiFilters;
};

export const PropertyContext = createContext<PropertyContextValue | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  // Load favorites data on mount
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
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    setLocalStorage(FAVORITES_STORAGE_KEY, state.favorites);
  }, [state.favorites]);

  // Save recently viewed to localStorage
  useEffect(() => {
    setLocalStorage(RECENTLY_VIEWED_KEY, state.recentlyViewed);
  }, [state.recentlyViewed]);

  const fetchProperties = useCallback(
    async (page = 1, append = false): Promise<void> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const limit = 12;
        const offset = page - 1;
        const apiFilters = { ...mapFilters(state.filters), limit, offset };

        const response = await propertyService.getProperties(apiFilters);

        if (response.status === 'success' && response.data) {
          const mappedProperties = response.data.projects.map(
            mapApiProjectToProperty
          );

          if (append) {
            dispatch({ type: 'APPEND_PROPERTIES', payload: mappedProperties });
          } else {
            dispatch({ type: 'SET_PROPERTIES', payload: mappedProperties });
          }

          const { totalCount } = response.data;
          const totalPages = Math.ceil(totalCount / limit);

          dispatch({
            type: 'SET_PAGINATION',
            payload: {
              currentPage: page,
              totalPages,
              totalCount,
              hasNextPage: page < totalPages,
            },
          });

          dispatch({ type: 'SET_ERROR', payload: null });
        } else {
          console.error('API Error:', response);
          dispatch({
            type: 'SET_ERROR',
            payload: response.message || 'Failed to fetch properties',
          });
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to fetch properties',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.filters]
  );

  const fetchPropertyById = useCallback(
    async (id: string): Promise<Property | null> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // First try to find in current list
        let property = state.properties.find(p => p.id === id) || null;

        if (!property) {
          const response = await propertyService.getPropertyById(id);
          if (response.status === 'success' && response.data) {
            // Map detail to property - explicit mapping for detail view might be needed if structure differs significantly
            // For now, using what we have, but ideally we'd have a separate mapper for details
            // Re-using list object mapping might lack details, but ApiProjectDetail has different structure
            // Let's create a temporary object or map it manually here
            const { project: detail } = response.data;
            const totalArea = detail.projectInfo?.totalArea;
            const mediaImages = detail.media?.images ?? [];

            property = {
              id: detail.id,
              title: detail.projectInfo.name,
              description: detail.projectInfo?.description ?? '',
              price: detail.pricingAndInventory.priceRange.minPrice,
              status: 'for-sale',
              location: detail.location?.city ?? '',
              images: mediaImages.map((img: { url: string }) => img.url),
              amenities: [],
              area: totalArea ? `${totalArea.value} ${totalArea.unit}` : '',
            } as Property;
          }
        }

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
    [state.properties]
  );

  const setFilters = useCallback((filters: Partial<PropertyFilter>): void => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const resetFilters = useCallback((): void => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const searchProperties = useCallback(
    async (_query: string): Promise<void> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const sorted: Property[] = [];

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
    },
    []
  );

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

  const setSearchResultsFromAI = useCallback((properties: Property[]): void => {
    dispatch({ type: 'SET_AI_SEARCH_RESULTS', payload: properties });
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
      setSearchResultsFromAI,
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
      setSearchResultsFromAI,
    ]
  );

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
