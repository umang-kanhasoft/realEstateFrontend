/**
 * Constants for Project features
 */

export const BHK_OPTIONS = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  '5 BHK',
  'Duplex',
  'Penthouse',
] as const;

// Synced with backend PropertyType enum
export const PROPERTY_TYPES_MAP: Record<string, string> = {
  Apartment: 'apartment',
  Bungalow: 'bungalow',
  Villa: 'villa',
  Plot: 'plot',
  Commercial: 'commercial',
  'Mixed Use': 'mixed_use',
  Penthouse: 'penthouse',
};

export const PROPERTY_TYPES = Object.keys(PROPERTY_TYPES_MAP);

export const POSSESSION_OPTIONS = [
  'Ready to Move',
  'Upto 1 Year',
  'Upto 2 Years',
  '2+ Years',
];

// Budget options as numeric values (Source of Truth)
export const BUDGET_OPTIONS_VALUES = [
  2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000, 6000000,
  7000000, 8000000, 9000000, 10000000, 15000000, 20000000, 50000000,
];

export const SORT_OPTIONS = [
  'Featured',
  'New Launch',
  'Price: low to high',
  'Price: high to low',
  'Near possession',
] as const;

export const SORT_MAPPING: Record<
  string,
  {
    sortBy:
      | 'price'
      | 'rating'
      | 'size'
      | 'featured'
      | 'newest'
      | 'possession'
      | 'featured';
    sortOrder: 'asc' | 'desc';
  }
> = {
  Featured: { sortBy: 'featured', sortOrder: 'desc' },
  'New Launch': { sortBy: 'newest', sortOrder: 'desc' },
  'Price: low to high': { sortBy: 'price', sortOrder: 'asc' },
  'Price: high to low': { sortBy: 'price', sortOrder: 'desc' },
  'Near possession': { sortBy: 'possession', sortOrder: 'asc' },
};
