import {
  ConstructionStatus,
  LandmarkType,
  PropertyType,
  ViewType,
} from './enums';

export interface ApiBuilder {
  id?: string;
  name: string;
  logoUrl?: string | null;
  isPrimary?: boolean;
  contactEmail?: string;
  phone?: string;
}

export interface ApiLandmark {
  id: string;
  type: LandmarkType;
  name: string;
  distanceKm: number | null;
  travelTimeMin: number | null;
}

export interface ApiUnitType {
  id: string;
  label: string;
  carpetAreaSqft: number;
  builtUpAreaSqft: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  totalUnits: number | null;
  availableUnits: number | null;
  viewType: ViewType | null;
}

export interface ApiProjectObject {
  id: string;
  name: string;
  slug: string;
  propertyType: PropertyType;
  status: ConstructionStatus;
  addressLine1: string;
  addressLine2: string;
  area: string;
  city: string;
  state: string | null;
  priceStartingFrom: number | null;
  pricePerSqFt: number | null;
  size: number | null;
  totalArea: number | null;
  purchaseType?: string | null;
  residentialType?: string | null;
  keyFeatures?: string[] | null;
  ecoFriendly: boolean;
  isFeatured: boolean;
  possessionDate: string | null;
  brochureUrl?: string;
  currency: string;
  completionTime: number | null;
  totalUnits: number | null;
  totalTowers: number | null;
  reraNumber: string | null;
  locality: string | null;
  totalProjectArea: number | null;
  areaUnit: string | null;
  avgRating: number;
  totalReviews: number;
  mainImageUrl: string | null;
  unitTypes: ApiUnitType[] | null;
  landmarks: ApiLandmark[] | null;
  amenities: string[];
  builders: ApiBuilder[] | null;
  description?: string;
  launchDate?: string;
  availableUnits?: number;
  openArea?: number;
  thumbnail?: string;
  isActive: boolean;
  maxPrice?: number;
}

export interface ProjectsListResponseData {
  projects: ApiProjectObject[];
  totalCount: number;
  limit: number;
  offset: number;
}

export interface ApiProjectDetail {
  id: string;
  projectInfo: {
    name: string;
    developer: {
      id: string;
      name: string;
    };
    totalArea: {
      value: number;
      unit: string;
    };
    status: string;
    possessionDate: string;
    reraId: string;
    avgRating: number;
    totalReviews: number;
    description: string;
  };
  location: {
    sector: string;
    addressLine2: string;
    city: string;
    landmarks: {
      type: string;
      name: string;
    }[];
  };
  pricingAndInventory: {
    priceRange: {
      minPrice: number;
      maxPrice: number;
    };
    avgPricePerSqft: number;
    configurations: {
      label: string;
      carpetAreaSqft: number;
      floorPlanUrl: string;
    }[];
  };
  media: {
    thumbnail: string;
    images: {
      url: string;
    }[];
  };
  amenities: {
    leisure: string[];
    safety: string[];
    health: string[];
    environment: string[];
    convenience: string[];
    sports: string[];
    kids: string[];
  };
}

export interface ApiProjectListItem extends Omit<ApiProjectObject, 'builders'> {
  builder?: {
    id: string;
    name: string;
  };
}
