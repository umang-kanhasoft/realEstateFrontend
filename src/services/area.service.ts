import { apiClient, ApiResponse } from '@/lib/api/client';

export interface AreaImage {
  id: string;
  mediaType: 'image' | 'video' | 'document';
  mediaUrl: string;
  sortOrder: number;
}

export interface FeaturedProject {
  id: string;
  name: string;
  images: AreaImage[];
}

export interface AreaStats {
  id: string;
  name: string;
  slug: string;
  city: string;
  state?: string | null;
  pincode?: string | null;
  avgPricePerSqFt: number;
  appreciationRate: number;
  demandLevel: 'High' | 'Medium' | 'Low';
  livabilityScore?: number | null;
  propertiesCount: number;
  priceHistory?: { year: number; month: number; price: number }[];
  featuredProjects?: FeaturedProject[];
}

export interface AreaStatsListResponseData {
  areas: AreaStats[];
  totalCount: number;
  limit: number;
  offset: number;
}

export interface DashboardStats {
  avgAppreciation: number;
  totalProperties: number;
  hottestLocation: string;
  avgPricePerSqFt: number;
  appreciationTrend: number;
  totalAreas: number;
}

export interface PropertyTypeDistribution {
  name: string;
  value: number;
  color: string;
}

export type AreaSortBy =
  | 'price_history'
  | 'rating'
  | 'property_count'
  | 'demand_level';
export type SortOrder = 'asc' | 'desc';

export interface GetAreasParams {
  limit?: number;
  offset?: number;
  sortBy?: AreaSortBy;
  sortOrder?: SortOrder;
}

class AreaService {
  private readonly basePath = '/areas';

  async getAreas({
    limit = 10,
    offset = 0,
    sortBy = 'property_count',
    sortOrder = 'desc',
  }: GetAreasParams = {}): Promise<ApiResponse<AreaStatsListResponseData>> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      sortBy,
      sortOrder,
    });
    const data = await apiClient.get<AreaStatsListResponseData>(
      `${this.basePath}?${params.toString()}`
    );
    return data;
  }

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>(`${this.basePath}/dashboard`);
  }

  async getPropertyTypeDistribution(): Promise<
    ApiResponse<PropertyTypeDistribution[]>
  > {
    return apiClient.get<PropertyTypeDistribution[]>(
      `${this.basePath}/distribution`
    );
  }
}

export const areaService = new AreaService();
