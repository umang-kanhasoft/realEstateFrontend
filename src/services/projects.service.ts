import { Specifications } from '@/components/sections/Faq';
import { apiClient } from '@/lib/api/client';
import { ApiProjectObject } from '@/types/api-project.types';

export interface ProjectFiltersParams {
  // Index signature for compatibility with Record<string, unknown>
  [key: string]: string | number | boolean | string[] | number[] | undefined;

  // Pagination
  limit?: number;
  offset?: number;

  // Sorting
  sortBy?:
    | 'price'
    | 'rating'
    | 'size'
    | 'featured'
    | 'possession'
    | 'newest'
    | 'featured';
  sortOrder?: 'asc' | 'desc';

  // Text Search
  search?: string;

  // Location
  city?: string;
  state?: string;
  pincode?: string;
  area?: string;
  location?: string;

  // Property Types & Configuration
  propertyType?: string | string[];

  // Budget
  priceMin?: number;
  priceMax?: number;

  // Status & Timeline
  status?: string | string[];
  possessionBefore?: string;
  possessionAfter?: string;

  // Builder
  builder?: string | string[];

  // Area Filters
  carpetAreaMin?: number;
  carpetAreaMax?: number;
  builtUpAreaMin?: number;
  builtUpAreaMax?: number;

  // Features
  ecoFriendly?: boolean;
  nearPublicTransport?: boolean;
  nearSchool?: boolean;
  nearHospital?: boolean;
  nearPark?: boolean;

  // Floor Details
  bedrooms?: number[];
  floorNumber?: number;
  totalFloors?: number;

  // Specifications
  constructionQuality?: string | string[];
  architecturalStyle?: string | string[];
  facing?: string | string[];
  furnishingStatus?: string | string[];
  interiorCondition?: string | string[];
  smartHomeFeatures?: string | string[];
  parkingType?: string | string[];
  parkingSpaces?: number;

  // Amenities
  balconyCount?: number;
  terrace?: boolean;
  garden?: boolean;
  viewType?: string | string[];
  liftAvailable?: boolean;
  wheelchairAccessible?: boolean;

  // Safety
  fireSafety?: boolean;
  earthquakeResistant?: boolean;

  // Utilities
  waterSupply?: string | string[];
  powerBackup?: string | string[];
  internetConnectivity?: string | string[];

  // Legal
  legalStatus?: string | string[];
  occupancyStatus?: string | string[];
  additionalFacilities?: string | string[];

  // Special
  isFeatured?: boolean;
}

export interface UnitType {
  id: string;
  label: string;
  carpetAreaSqft: number;
  builtUpAreaSqft?: number;
  bedrooms: number;
  bathrooms: number;
  price?: number;
  orientation?: string;
  viewType?: string;
  totalUnits?: number;
  availableUnits?: number;
}

export interface Builder {
  id: string;
  name: string;
  logoUrl?: string;
  ProjectBuilder?: {
    isPrimary: boolean;
  };
}

export interface Area {
  name: string;
  city: string;
  state: string;
  pincode?: string;
  slug: string;
}

export interface Amenity {
  name: string;
  code: string;
  category: string;
}

export interface Landmarks {
  type: string;
  name: string;
  distanceKm: string;
  travelTimeMin: string;
}

export type Project = ApiProjectObject;

export interface ProjectsResponse {
  totalCount: number;
  limit: number;
  offset: number;
  projects: Project[];
}

// -----
export interface ProjectApiResponse {
  project: ProjectData;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: AmenityCategory;
}

export type AmenityCategory =
  | 'leisure'
  | 'safety'
  | 'health'
  | 'environment'
  | 'convenience'
  | 'sports'
  | 'kids';

export interface Amenities {
  leisure?: AmenityItem[];
  safety?: AmenityItem[];
  health?: AmenityItem[];
  environment?: AmenityItem[];
  convenience?: AmenityItem[];
  sports?: AmenityItem[];
  kids?: AmenityItem[];
}

export interface ProjectData {
  projectInfo?: ProjectInfo;
  location?: Location;
  pricingAndInventory?: PricingAndInventory;
  amenities?: Amenities;
  media?: Media;
  metadata?: Metadata;
  towers?: Tower[];
  id?: string;
  specifications?: Specifications;
}

export interface ProjectInfo {
  name?: string;
  developer?: {
    name?: string;
    id?: string;
  };
  possessionDate?: string;
  reraId?: string;
  description?: string;
}

export interface NearbyTransport {
  id?: string;
  type?: string;
  name?: string;
  distanceKm?: number;
  travelTimeMin?: number;
}

export interface Location {
  city?: string;
  addressLine1?: string;
  locality?: string;
  latitude?: number;
  longitude?: number;
  landmarks?: NearbyTransport[];
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

export interface PricingAndInventory {
  configurations: Configuration[];
  priceRange?: {
    minPrice?: string;
    maxPrice?: string;
    displayString?: string;
  };
}

export interface Configuration {
  bedrooms: number;
  label?: string;
  viewType?: string;
  price?: string;
  superBuiltUpAreaSqft?: number;
  floorPlanUrl?: string;
  bathrooms?: number;
  balconies?: number;
  roomDetails?: {
    kitchen?: {
      width?: number;
      length?: number;
    };
    bedroom_2?: {
      width?: number;
      length?: number;
    };
    bedroom_3?: {
      width?: number;
      length?: number;
    };
    living_room?: {
      width?: number;
      length?: number;
    };
    master_bedroom?: {
      width?: number;
      length?: number;
    };
  };
  totalUnits?: number;
  availableUnits?: number;
  parkingSpace?: number;
}

export interface Media {
  videos?: Array<{
    url?: string;
  }>;
}

export interface Metadata {
  keyFeatures?: string[];
}

export interface Tower {
  id?: string;
  blockName?: string;
  towerLabel?: string;
  storey?: number;
  unitsPerFloor?: number;
  lift?: number;
}

export class ProjectsService {
  /**
   * Fetch projects with filters
   */
  static async getProjects(
    filters: ProjectFiltersParams = {}
  ): Promise<ProjectsResponse> {
    const response = await apiClient.get<ProjectsResponse>('/projects', {
      params: filters,
    });

    if (!response.data) {
      throw new Error('Failed to fetch projects');
    }

    return response.data;
  }

  /**
   * Fetch a single project by ID
   */
  static async getProjectById(id: string): Promise<ProjectApiResponse> {
    const response = await apiClient.get<ProjectApiResponse>(`/project/${id}`);

    if (!response.data) {
      throw new Error('Project not found');
    }

    return response.data;
  }

  /**
   * Fetch a project by slug
   */
  static async getProjectBySlug(slug: string): Promise<Project> {
    const response = await apiClient.get<Project>(`/project/slug/${slug}`);

    if (!response.data) {
      throw new Error('Project not found');
    }

    return response.data;
  }
}
