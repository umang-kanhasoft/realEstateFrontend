import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareStore {
  compareList: string[]; // List of property IDs
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareList: [],
      addToCompare: id =>
        set(state => {
          if (state.compareList.includes(id)) return state;
          // Limit to 4 properties for comparison
          if (state.compareList.length >= 4) return state;
          return { compareList: [...state.compareList, id] };
        }),
      removeFromCompare: id =>
        set(state => ({
          compareList: state.compareList.filter(itemId => itemId !== id),
        })),
      isInCompare: id => get().compareList.includes(id),
      clearCompare: () => set({ compareList: [] }),
    }),
    {
      name: 'property-compare-storage',
    }
  )
);
