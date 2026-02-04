'use client';

import { AppProvider } from '@/context/AppContext';
import { PropertyProvider } from '@/context/PropertyContext';
import { ThemeContextProvider } from '@/context/ThemeContext';
import React, { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <AppProvider>
        <PropertyProvider>{children}</PropertyProvider>
      </AppProvider>
    </ThemeContextProvider>
  );
};
