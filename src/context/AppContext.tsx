'use client';

import {
  AppAction,
  AppContextValue,
  AppState,
  NotificationState,
  ProviderProps,
} from '@/types';
import { generateUniqueId } from '@/utils/helpers';
import { createContext, useCallback, useMemo, useReducer } from 'react';

const initialState: AppState = {
  isLoading: false,
  isInitialized: false,
  error: null,
  notification: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_INITIALIZED':
      return { ...state, isInitialized: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = useCallback((loading: boolean): void => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null): void => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const showNotification = useCallback(
    (notification: Omit<NotificationState, 'id'>): void => {
      const id = generateUniqueId();
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { ...notification, id },
      });

      // Auto-hide notification after duration
      const duration = notification.duration || 5000;
      setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION', payload: null });
      }, duration);
    },
    []
  );

  const hideNotification = useCallback((): void => {
    dispatch({ type: 'SET_NOTIFICATION', payload: null });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      setLoading,
      setError,
      showNotification,
      hideNotification,
    }),
    [state, setLoading, setError, showNotification, hideNotification]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
