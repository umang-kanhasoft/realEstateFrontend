'use client';

import { ProviderProps, UIAction, UIContextValue, UIState } from '@/types';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const initialState: UIState = {
  isMobileMenuOpen: false,
  isSearchModalOpen: false,
  isContactModalOpen: false,
  isFilterDrawerOpen: false,
  activeModal: null,
  scrollPosition: 0,
  isScrolled: false,
  isFooterVisible: true,
};

const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case 'OPEN_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: true };
    case 'CLOSE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: false };
    case 'TOGGLE_SEARCH_MODAL':
      return { ...state, isSearchModalOpen: !state.isSearchModalOpen };
    case 'OPEN_SEARCH_MODAL':
      return { ...state, isSearchModalOpen: true };
    case 'CLOSE_SEARCH_MODAL':
      return { ...state, isSearchModalOpen: false };
    case 'TOGGLE_CONTACT_MODAL':
      return { ...state, isContactModalOpen: !state.isContactModalOpen };
    case 'OPEN_CONTACT_MODAL':
      return { ...state, isContactModalOpen: true };
    case 'CLOSE_CONTACT_MODAL':
      return { ...state, isContactModalOpen: false };
    case 'TOGGLE_FILTER_DRAWER':
      return { ...state, isFilterDrawerOpen: !state.isFilterDrawerOpen };
    case 'OPEN_FILTER_DRAWER':
      return { ...state, isFilterDrawerOpen: true };
    case 'CLOSE_FILTER_DRAWER':
      return { ...state, isFilterDrawerOpen: false };
    case 'SET_ACTIVE_MODAL':
      return { ...state, activeModal: action.payload };
    case 'UPDATE_SCROLL_POSITION':
      return {
        ...state,
        scrollPosition: action.payload,
        isScrolled: action.payload > 50,
      };
    case 'SHOW_FOOTER':
      return { ...state, isFooterVisible: true };
    case 'HIDE_FOOTER':
      return { ...state, isFooterVisible: false };
    default:
      return state;
  }
};

export const UIContext = createContext<UIContextValue | undefined>(undefined);

export const UIProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Close mobile menu on route change
  useEffect(() => {
    if (state.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.isMobileMenuOpen]);

  const toggleMobileMenu = useCallback((): void => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  }, []);

  const openMobileMenu = useCallback((): void => {
    dispatch({ type: 'OPEN_MOBILE_MENU' });
  }, []);

  const closeMobileMenu = useCallback((): void => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
  }, []);

  const toggleSearchModal = useCallback((): void => {
    dispatch({ type: 'TOGGLE_SEARCH_MODAL' });
  }, []);

  const openSearchModal = useCallback((): void => {
    dispatch({ type: 'OPEN_SEARCH_MODAL' });
  }, []);

  const closeSearchModal = useCallback((): void => {
    dispatch({ type: 'CLOSE_SEARCH_MODAL' });
  }, []);

  const toggleContactModal = useCallback((): void => {
    dispatch({ type: 'TOGGLE_CONTACT_MODAL' });
  }, []);

  const openContactModal = useCallback((): void => {
    dispatch({ type: 'OPEN_CONTACT_MODAL' });
  }, []);

  const closeContactModal = useCallback((): void => {
    dispatch({ type: 'CLOSE_CONTACT_MODAL' });
  }, []);

  const toggleFilterDrawer = useCallback((): void => {
    dispatch({ type: 'TOGGLE_FILTER_DRAWER' });
  }, []);

  const openFilterDrawer = useCallback((): void => {
    dispatch({ type: 'OPEN_FILTER_DRAWER' });
  }, []);

  const closeFilterDrawer = useCallback((): void => {
    dispatch({ type: 'CLOSE_FILTER_DRAWER' });
  }, []);

  const setActiveModal = useCallback((modal: string | null): void => {
    dispatch({ type: 'SET_ACTIVE_MODAL', payload: modal });
  }, []);

  const updateScrollPosition = useCallback((position: number): void => {
    dispatch({ type: 'UPDATE_SCROLL_POSITION', payload: position });
  }, []);

  const showFooter = useCallback((): void => {
    dispatch({ type: 'SHOW_FOOTER' });
  }, []);

  const hideFooter = useCallback((): void => {
    dispatch({ type: 'HIDE_FOOTER' });
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({
      state,
      toggleMobileMenu,
      openMobileMenu,
      closeMobileMenu,
      toggleSearchModal,
      openSearchModal,
      closeSearchModal,
      toggleContactModal,
      openContactModal,
      closeContactModal,
      toggleFilterDrawer,
      openFilterDrawer,
      closeFilterDrawer,
      setActiveModal,
      updateScrollPosition,
      showFooter,
      hideFooter,
    }),
    [
      state,
      toggleMobileMenu,
      openMobileMenu,
      closeMobileMenu,
      toggleSearchModal,
      openSearchModal,
      closeSearchModal,
      toggleContactModal,
      openContactModal,
      closeContactModal,
      toggleFilterDrawer,
      openFilterDrawer,
      closeFilterDrawer,
      setActiveModal,
      updateScrollPosition,
      showFooter,
      hideFooter,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
