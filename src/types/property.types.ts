export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  fullAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PropertyFeature {
  id: string;
  name: string;
  value: string | number;
  icon: string;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
  category: AmenityCategory;
}

export type AmenityCategory =
  | 'interior'
  | 'exterior'
  | 'security'
  | 'recreation';

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'villa'
  | 'penthouse'
  | 'plot'
  | 'commercial'
  | 'office'
  | 'shop'
  | 'warehouse';

export type PropertyStatus = 'for-sale' | 'for-rent' | 'sold' | 'rented';

export type PropertyListingType = 'sale' | 'rent';

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  pricePerSqFt: number;
  currency: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  listingType: PropertyListingType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: 'sqft' | 'sqm';
  yearBuilt: number;
  parkingSpaces: number;
  images: PropertyImage[];
  address: PropertyAddress;
  features: PropertyFeature[];
  amenities: PropertyAmenity[];
  isFeatured: boolean;
  isNew: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  agent: Agent;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  experience: number;
  propertiesSold: number;
  rating: number;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  url: string;
}

export interface PropertyFilter {
  searchQuery: string;
  propertyType: PropertyType | 'all';
  listingType: PropertyListingType | 'all';
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  minArea: number;
  maxArea: number;
  city: string;
  amenities: string[];
  sortBy: PropertySortOption;
}

export type PropertySortOption =
  | 'newest'
  | 'oldest'
  | 'price-low-high'
  | 'price-high-low'
  | 'area-low-high'
  | 'area-high-low';

export interface PropertySearchResult {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type ListingType = 'buy' | 'rent' | 'pg' | 'commercial';

export type BHKType = '1bhk' | '2bhk' | '3bhk' | '4bhk' | '5bhk' | 'studio';

export interface Location {
  city: string;
  state: string;
  locality?: string;
  pincode?: string;
}

export interface SearchFilters {
  listingType: ListingType;
  locations?: Location[];
  propertyTypes?: PropertyType[];
  bhkTypes?: BHKType[];
  priceRange: {
    min: number;
    max?: number;
  };
  areaRange: {
    min: number;
    max?: number;
  };
  keywords?: string;
  furnishing?: string;
  facing?: string;
  ageOfProperty?: string;
  availability?: string;
}
