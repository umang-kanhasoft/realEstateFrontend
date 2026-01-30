import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  compareProperties: string[];
  addToCompare: (propertyId: string) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareProperties: [],
      
      addToCompare: (propertyId: string) => {
        const { compareProperties } = get();
        if (compareProperties.includes(propertyId)) {
          set({ compareProperties: compareProperties.filter((id) => id !== propertyId) });
        } else if (compareProperties.length < 4) {
          set({ compareProperties: [...compareProperties, propertyId] });
        }
      },
      
      removeFromCompare: (propertyId: string) => {
        set((state) => ({
          compareProperties: state.compareProperties.filter((id) => id !== propertyId),
        }));
      },
      
      clearCompare: () => {
        set({ compareProperties: [] });
      },
      
      isInCompare: (propertyId: string) => {
        return get().compareProperties.includes(propertyId);
      },
    }),
    {
      name: 'compare-storage',
    }
  )
);
