'use client';

import { AppContext } from '@/context/AppContext';
import { AppContextValue } from '@/types';
import { useContext } from 'react';

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};
