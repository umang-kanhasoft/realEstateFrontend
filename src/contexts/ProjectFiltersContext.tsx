'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

export interface ProjectFiltersState {
  selectedCity: string;
  searchQuery: string;
  selectedLocalities: string[];
  selectedBHK: string[];
  minBudget: string;
  maxBudget: string;
  selectedPossession: string[];
  selectedPropType: string[];
  selectedSort: string;
}

interface ProjectFiltersContextType {
  filters: ProjectFiltersState;
  updateFilters: (updates: Partial<ProjectFiltersState>) => void;
  resetFilters: () => void;
}

const defaultFilters: ProjectFiltersState = {
  selectedCity: 'Ahmedabad',
  searchQuery: '',
  selectedLocalities: [],
  selectedBHK: [],
  minBudget: '',
  maxBudget: '',
  selectedPossession: [],
  selectedPropType: [],
  selectedSort: 'Featured',
};

const ProjectFiltersContext = createContext<
  ProjectFiltersContextType | undefined
>(undefined);

export function ProjectFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ProjectFiltersState>(defaultFilters);

  const updateFilters = (updates: Partial<ProjectFiltersState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <ProjectFiltersContext.Provider
      value={{ filters, updateFilters, resetFilters }}
    >
      {children}
    </ProjectFiltersContext.Provider>
  );
}

export function useProjectFilters() {
  const context = useContext(ProjectFiltersContext);
  if (!context) {
    throw new Error(
      'useProjectFilters must be used within ProjectFiltersProvider'
    );
  }
  return context;
}
