'use client';

import { UIContext } from '@/context/UIContext';
import { UIContextValue } from '@/types';
import { useContext } from 'react';

export const useUI = (): UIContextValue => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
