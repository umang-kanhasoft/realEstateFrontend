import { apiClient, ApiResponse } from '@/lib/api/client';
import { ApiProjectDetail, ProjectsListResponseData } from '@/types';

export interface PropertyFilters {
  limit?: number;
  offset?: number;
  city?: string;
  area?: string;
  propertyType?: string;
  status?: string;
  builder?: string;
  priceMin?: string;
  priceMax?: string;
  builtUpAreaMin?: string;
  builtUpAreaMax?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  carpetAreaMin?: string;
  carpetAreaMax?: string;
  floorMin?: string;
  floorMax?: string;
  occupancyStatus?: string;
  constructionQuality?: string;
  architecturalStyle?: string;
  facing?: string;
  furnishingStatus?: string;
  interiorCondition?: string;
  viewType?: string;
  parkingType?: string;
  waterSupply?: string;
  powerBackup?: string;
  legalStatus?: string;
  internetConnectivity?: string;
  additionalFacilities?: string;
  smartHomeFeatures?: string;
  totalFloors?: string;
  parkingSpaces?: string;
  balconyCount?: string;
  terrace?: boolean;
  garden?: boolean;
  liftAvailable?: boolean;
  wheelchairAccessible?: boolean;
  fireSafety?: boolean;
  earthquakeResistant?: boolean;
  fiberReady?: boolean;
  cableReady?: boolean;
  cornerProperty?: boolean;
  evCharging?: boolean;
  petFriendly?: boolean;
  vaastuCompliant?: boolean;
  gatedCommunity?: boolean;
  seniorFriendly?: boolean;
  solarPanels?: boolean;
  rainwaterHarvesting?: boolean;
  wasteManagement?: boolean;
  ecoFriendly?: boolean;
  nearTransport?: boolean;
  nearSchools?: boolean;
  nearHospitals?: boolean;
  nearParks?: boolean;
}

class PropertyService {
  private readonly projectsPath = '/projects';
  private readonly basePath = '/project';

  async getProperties(
    filters?: PropertyFilters
  ): Promise<ApiResponse<ProjectsListResponseData>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString();
    const url = queryString
      ? `${this.projectsPath}?${queryString}`
      : this.projectsPath;

    return apiClient.get<ProjectsListResponseData>(url);
  }

  async getPropertyById(
    id: string
  ): Promise<ApiResponse<{ project: ApiProjectDetail }>> {
    return apiClient.get<{ project: ApiProjectDetail }>(
      `${this.basePath}/${id}`
    );
  }

  async getPropertyBySlug(
    slug: string
  ): Promise<ApiResponse<ApiProjectDetail>> {
    return apiClient.get<ApiProjectDetail>(`${this.basePath}/slug/${slug}`);
  }

  async getFeaturedProperties(
    limit = 10
  ): Promise<ApiResponse<ProjectsListResponseData>> {
    return this.getProperties({ limit, city: 'Ahmedabad' });
  }

  async searchProperties(
    query: string
  ): Promise<ApiResponse<ProjectsListResponseData>> {
    return apiClient.get<ProjectsListResponseData>(
      `${this.basePath}/search?q=${encodeURIComponent(query)}`
    );
  }
}

export const propertyService = new PropertyService();
