'use client';

import { getTheme } from '@/theme/muiTheme';
import {
  ProviderProps,
  ThemeAction,
  ThemeContextValue,
  ThemeMode,
  ThemeState,
} from '@/types';
import { getLocalStorage, setLocalStorage } from '@/utils/helpers';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const THEME_STORAGE_KEY = 'realestate-theme';

const initialState: ThemeState = {
  mode: 'light',
  primaryColor: '#0d9488', // Matching var(--color-primary-600) default
  fontSize: 'medium',
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_PRIMARY_COLOR':
      return { ...state, primaryColor: action.payload };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export const ThemeContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = getLocalStorage<Partial<ThemeState>>(
      THEME_STORAGE_KEY,
      {}
    );
    if (savedTheme.mode) {
      dispatch({ type: 'SET_MODE', payload: savedTheme.mode });
    }
    if (savedTheme.fontSize) {
      dispatch({ type: 'SET_FONT_SIZE', payload: savedTheme.fontSize });
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    setLocalStorage(THEME_STORAGE_KEY, {
      mode: state.mode,
      fontSize: state.fontSize,
    });
  }, [state.mode, state.fontSize]);

  const toggleTheme = useCallback((): void => {
    const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_MODE', payload: newMode });
  }, [state.mode]);

  const setThemeMode = useCallback((mode: ThemeMode): void => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);

  const setPrimaryColor = useCallback((color: string): void => {
    dispatch({ type: 'SET_PRIMARY_COLOR', payload: color });
  }, []);

  const setFontSize = useCallback(
    (size: 'small' | 'medium' | 'large'): void => {
      dispatch({ type: 'SET_FONT_SIZE', payload: size });
    },
    []
  );

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      state,
      toggleTheme,
      setThemeMode,
      setPrimaryColor,
      setFontSize,
    }),
    [state, toggleTheme, setThemeMode, setPrimaryColor, setFontSize]
  );

  const theme = useMemo(() => {
    const mode = state.mode === 'system' ? 'light' : state.mode;
    return getTheme(mode);
  }, [state.mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
