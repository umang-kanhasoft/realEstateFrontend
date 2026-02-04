import { apiClient, ApiResponse } from '@/lib/api/client';

export interface AreaStats {
  id: string;
  name: string;
  city: string;
  avgPricePerSqFt: number;
  appreciationRate: number;
  demandLevel: 'High' | 'Medium' | 'Low';
  propertiesCount: number;
  priceHistory: { year: number; month: number; price: number }[];
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

class AreaService {
  private readonly basePath = '/areas';

  async getAreas({
    limit = 10,
    offset = 0,
  }): Promise<ApiResponse<AreaStatsListResponseData>> {
    const data = await apiClient.get<AreaStatsListResponseData>(
      `${this.basePath}?limit=${limit}&offset=${offset}`
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
