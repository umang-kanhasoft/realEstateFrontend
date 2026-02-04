import { api } from '@/utils/api';

export interface ProjectFiltersParams {
  // Index signature for compatibility with Record<string, unknown>
  [key: string]: string | number | boolean | string[] | undefined;

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

export interface Project {
  id: string;
  name: string;
  slug: string;
  city: string;
  area: string;
  description?: string;
  addressLine1: string;
  addressLine2?: string;
  propertyType: string;
  reraNumber?: string;
  launchDate?: string;
  possessionDate?: string;
  totalUnits?: number;
  availableUnits?: number;
  totalArea?: number;
  openArea?: number;
  thumbnail?: string;
  isFeatured: boolean;
  isActive: boolean;
  builders: Builder[];
  unitTypes: UnitType[];
  amenities: Amenity[];
  totalReviews: number;
  avgRating: number;
  maxPrice?: number;
  landmarks?: Landmarks[];
}

export interface ProjectsResponse {
  totalCount: number;
  limit: number;
  offset: number;
  projects: Project[];
}

export class ProjectsService {
  /**
   * Fetch projects with filters
   */
  static async getProjects(
    filters: ProjectFiltersParams = {}
  ): Promise<ProjectsResponse> {
    const response = await api.get<ProjectsResponse>('/projects', filters);

    if (!response.data) {
      throw new Error('Failed to fetch projects');
    }

    return response.data;
  }

  /**
   * Fetch a single project by ID
   */
  static async getProjectById(id: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);

    if (!response.data) {
      throw new Error('Project not found');
    }

    return response.data;
  }

  /**
   * Fetch a project by slug
   */
  static async getProjectBySlug(slug: string): Promise<Project> {
    const response = await api.get<Project>(`/projects/slug/${slug}`);

    if (!response.data) {
      throw new Error('Project not found');
    }

    return response.data;
  }
}
