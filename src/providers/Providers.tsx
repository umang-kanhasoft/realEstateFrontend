'use client';

import { PropertyProvider } from '@/context/PropertyContext';
import { ThemeContextProvider } from '@/context/ThemeContext';
import React, { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <PropertyProvider>{children}</PropertyProvider>
    </ThemeContextProvider>
  );
};
