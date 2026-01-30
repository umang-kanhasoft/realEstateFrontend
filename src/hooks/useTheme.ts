'use client';

import { ThemeContext } from '@/context/ThemeContext';
import { ThemeContextValue } from '@/types';
import { useContext } from 'react';

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    );
  }

  return context;
};
