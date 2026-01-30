'use client';

import { PropertyContext } from '@/context/PropertyContext';
import { PropertyContextValue } from '@/types';
import { useContext } from 'react';

export const useProperty = (): PropertyContextValue => {
  const context = useContext(PropertyContext);

  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }

  return context;
};
