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
  website?: string;
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

export interface ProjectDocument {
  id?: string;
  url: string;
  name?: string;
  type?: string;
}

export interface ApiProjectDetail {
  id: string;
  projectInfo: {
    name: string;
    slug?: string;
    developer: {
      id: string;
      name: string;
      logoUrl?: string;
      website?: string;
    }[];
    projectType?: string;
    status?: string;
    possessionDate?: string;
    reraId?: string;
    avgRating?: number;
    totalReviews?: number;
    description?: string;
    totalArea?: {
      value: number;
      unit: string;
    };
    launchDate?: string;
    totalTowers?: number;
    totalUnits?: number;
    totalFloors?: number;
    completionTime?: number;
    ecoFriendly?: boolean;
  };
  location: {
    areaId?: string;
    addressLine1?: string;
    addressLine2?: string;
    locality?: string;
    sector?: string;
    city?: string;
    state?: string;
    pincode?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    landmarks?: {
      id?: string;
      type?: string;
      name?: string;
      distanceKm?: number;
      travelTimeMin?: number;
    }[];
  };
  pricingAndInventory: {
    priceRange: {
      minPrice: number;
      maxPrice: number;
      currency?: string;
      displayString?: string;
    };
    avgPricePerSqft?: number;
    configurations: {
      id?: string;
      type?: string;
      label: string;
      bedrooms?: number;
      bathrooms?: number;
      balconies?: number;
      carpetAreaSqft: number;
      builtUpAreaSqft?: number;
      superBuiltUpAreaSqft?: number;
      terraceAvailable?: boolean;
      gardenAccess?: boolean;
      orientation?: string;
      price?: number;
      currency?: string;
      floorPlanUrl?: string;
      viewType?: string;
      parkingSpace?: number;
      maintenanceCharges?: number;
      totalUnits?: number;
      availableUnits?: number;
      roomDetails?: {
        kitchen?: { width: number; length: number };
        bedroom_2?: { width: number; length: number };
        bedroom_3?: { width: number; length: number };
        living_room?: { width: number; length: number };
        master_bedroom?: { width: number; length: number };
      };
    }[];
  };
  media: {
    thumbnail?: string;
    images?: {
      id?: string;
      url: string;
      order?: number;
    }[];
    videos?: { url: string }[];
    documents?: ProjectDocument[];
    brochureUrl?: string;
    virtualTourUrl?: string | null;
    masterPlanUrl?: string;
  };
  amenities: {
    leisure?: { id?: string; name: string; category?: string }[];
    safety?: { id?: string; name: string; category?: string }[];
    health?: { id?: string; name: string; category?: string }[];
    environment?: { id?: string; name: string; category?: string }[];
    convenience?: { id?: string; name: string; category?: string }[];
    sports?: { id?: string; name: string; category?: string }[];
    kids?: { id?: string; name: string; category?: string }[];
  };
  towers?: {
    id: string;
    blockName: string;
    unitsPerFloor: number;
    lift: number;
    towerLabel: string;
    storey: number;
  }[];
  specifications?: {
    constructionQuality?: string;
    architecturalStyle?: string;
    interiorCondition?: string;
    furnishingStatus?: string[];
    smartHomeFeature?: string[];
    parkingType?: string[];
    waterSupply?: string[];
    powerBackup?: string[];
    internetConnectivity?: string[];
    legalStatus?: string[];
    additionalFacilities?: string[];
    structure?: string;
    flooring?: Record<string, string>;
    kitchen?: Record<string, string>;
    toilets?: Record<string, string>;
    electrical?: string;
    doors_windows?: string;
  };
  metadata?: {
    isFeatured: boolean;
    tags?: string[];
    bankApprovals?: string[];
    createdAt?: string;
    updatedAt?: string;
    keyFeatures?: string[];
    builderIds?: string[];
  };
}

export interface ApiProjectListItem extends Omit<ApiProjectObject, 'builders'> {
  builder?: {
    id: string;
    name: string;
  };
}

export type AiSearchResponse = {
  reply: string;
  applied_filters: Record<string, unknown>;
  sql_query: string;
  data: ApiProjectObject[];
  result_count: number;
};
