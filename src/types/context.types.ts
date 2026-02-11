import { ReactNode } from 'react';
import {
  Property,
  PropertyFilter,
  PropertySearchResult,
  ThemeMode,
} from './index';

// App Context Types
export interface AppState {
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  notification: NotificationState | null;
}

export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface AppContextValue {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  showNotification: (notification: Omit<NotificationState, 'id'>) => void;
  hideNotification: () => void;
}

// Theme Context Types
export interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface ThemeContextValue {
  state: ThemeState;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

// Property Context Types
export interface PropertyState {
  properties: Property[];
  featuredProperties: Property[];
  selectedProperty: Property | null;
  filters: PropertyFilter;
  searchResults: PropertySearchResult | null;
  isLoading: boolean;
  error: string | null;
  favorites: string[];
  recentlyViewed: string[];
  compareList: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

export interface PropertyContextValue {
  state: PropertyState;
  fetchProperties: (page?: number, append?: boolean) => Promise<void>;
  fetchPropertyById: (id: string) => Promise<Property | null>;
  setFilters: (filters: Partial<PropertyFilter>) => void;
  resetFilters: () => void;
  searchProperties: (query: string) => Promise<void>;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompareList: () => void;
}

// UI Context Types
export interface UIState {
  isMobileMenuOpen: boolean;
  isSearchModalOpen: boolean;
  isContactModalOpen: boolean;
  isFilterDrawerOpen: boolean;
  activeModal: string | null;
  scrollPosition: number;
  isScrolled: boolean;
  isFooterVisible: boolean;
}

export interface UIContextValue {
  state: UIState;
  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearchModal: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleContactModal: () => void;
  openContactModal: () => void;
  closeContactModal: () => void;
  toggleFilterDrawer: () => void;
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
  setActiveModal: (modal: string | null) => void;
  updateScrollPosition: (position: number) => void;
  showFooter: () => void;
  hideFooter: () => void;
}

// Provider Props
export interface ProviderProps {
  children: ReactNode;
}

// Action Types
export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_NOTIFICATION'; payload: NotificationState | null };

export type ThemeAction =
  | { type: 'SET_MODE'; payload: ThemeMode }
  | { type: 'SET_PRIMARY_COLOR'; payload: string }
  | { type: 'SET_FONT_SIZE'; payload: 'small' | 'medium' | 'large' };

export type PropertyAction =
  | { type: 'SET_PROPERTIES'; payload: Property[] }
  | { type: 'SET_FEATURED_PROPERTIES'; payload: Property[] }
  | { type: 'SET_SELECTED_PROPERTY'; payload: Property | null }
  | { type: 'SET_FILTERS'; payload: Partial<PropertyFilter> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SEARCH_RESULTS'; payload: PropertySearchResult | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'ADD_TO_COMPARE'; payload: string }
  | { type: 'REMOVE_FROM_COMPARE'; payload: string }
  | { type: 'CLEAR_COMPARE_LIST' }
  | { type: 'CLEAR_COMPARE_LIST' }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: string }
  | {
      type: 'SET_PAGINATION';
      payload: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
      };
    }
  | { type: 'APPEND_PROPERTIES'; payload: Property[] };

export type UIAction =
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'OPEN_MOBILE_MENU' }
  | { type: 'CLOSE_MOBILE_MENU' }
  | { type: 'TOGGLE_SEARCH_MODAL' }
  | { type: 'OPEN_SEARCH_MODAL' }
  | { type: 'CLOSE_SEARCH_MODAL' }
  | { type: 'TOGGLE_CONTACT_MODAL' }
  | { type: 'OPEN_CONTACT_MODAL' }
  | { type: 'CLOSE_CONTACT_MODAL' }
  | { type: 'TOGGLE_FILTER_DRAWER' }
  | { type: 'OPEN_FILTER_DRAWER' }
  | { type: 'CLOSE_FILTER_DRAWER' }
  | { type: 'SET_ACTIVE_MODAL'; payload: string | null }
  | { type: 'UPDATE_SCROLL_POSITION'; payload: number }
  | { type: 'SHOW_FOOTER' }
  | { type: 'HIDE_FOOTER' };
