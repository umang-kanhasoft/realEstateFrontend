'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
  clearFavorites: () => void;
  isFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'favorites-storage';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse favorites from localStorage', e);
        }
      }
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (typeof window !== 'undefined' && isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      return [...prev, propertyId];
    });
  }, []);

  const removeFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => prev.filter(id => id !== propertyId));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const isFavorite = useCallback(
    (propertyId: string) => {
      return favorites.includes(propertyId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
