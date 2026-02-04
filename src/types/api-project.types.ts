import {
  AmenityCategory,
  LandmarkType,
  ProjectMediaType,
  ViewType,
} from './enums';

export interface ApiBuilder {
  id: string;
  name: string;
  logo?: string;
}

export interface ApiLandmark {
  type: LandmarkType; // Using Enum
  name: string;
  distance?: string;
}

export interface ApiProjectLocation {
  city: string;
  area?: string;
  locality?: string;
  sector?: string;
  addressLine2?: string;
  landmarks: ApiLandmark[];
}

export interface ApiUnitType {
  id?: string;
  label: string;
  carpetAreaSqft: number;
  builtUpAreaSqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  price?: number;
  totalUnits?: number;
  availableUnits?: number;
  viewType?: ViewType | null;
}

export interface ApiProjectMedia {
  thumbnail?: string;
  images: { url: string; type?: ProjectMediaType }[];
}

export interface ApiPricingAndInventory {
  priceRange: {
    minPrice?: number;
    maxPrice?: number;
  };
  avgPricePerSqft?: number;
  configurations?: {
    label: string;
    carpetAreaSqft: number;
    floorPlanUrl?: string;
  }[];
}

export interface ApiProjectInfo {
  name: string;
  developer?: ApiBuilder;
  status: string; // Backend string, mapped to ConstructionStatus
  possessionDate?: string;
  totalArea: { value?: number; unit?: string };
  reraId?: string;
  avgRating?: number;
  totalReviews?: number;
  description?: string;
}

export interface ApiProjectListItem {
  id: string;
  name: string;
  builder?: ApiBuilder;
  locality?: string;
  area?: string;
  city: string;
  priceStartingFrom?: number;
  pricePerSqFt?: number;
  unitTypes?: ApiUnitType[];
  mainImageUrl?: string;
  size?: number;
  status: string; // Backend string
  possessionDate?: string;
  amenities?: string[]; // Arrays of strings in list item?
  ecoFriendly?: boolean;
  reraNumber?: string;
  avgRating?: number;
  totalReviews?: number;
  completionTime?: number;
}

export interface ProjectsListResponseData {
  projects: ApiProjectListItem[];
  totalCount: number;
  limit: number;
  offset: number;
}

export interface ApiProjectDetail {
  id: string;
  projectInfo: ApiProjectInfo;
  location: ApiProjectLocation;
  pricingAndInventory: ApiPricingAndInventory;
  media: ApiProjectMedia;
  amenities: {
    [key in AmenityCategory]?: string[]; // Using Enum keys
  };
}
