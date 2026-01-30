import { apiClient, ApiResponse } from '@/lib/api/client';

export interface BuilderListItem {
  id: string;
  name: string;
  slug: string;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  avgCompletionTime: number | null;
  successRate: number;
  avgRating: number;
  logoUrl?: string | null;
}

export interface BuilderDetail {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  website: string | null;
  description: string | null;
  mission: string | null;
  established: number | null;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  avgCompletionTime: number | null;
  successRate: number;
  avgRating: number;
  awards: string[];
  certifications: string[];
  recentNews: { title: string; date: string }[];
}

export interface BuildersListResponseData {
  builders: BuilderListItem[];
  totalCount: number;
  limit: number;
  offset: number;
}

class BuilderService {
  private readonly basePath = '/builders';

  async getBuilders(limit = 10, offset = 0): Promise<ApiResponse<BuildersListResponseData>> {
    return apiClient.get<BuildersListResponseData>(`${this.basePath}?limit=${limit}&offset=${offset}`);
  }

  async getBuilderById(id: string): Promise<ApiResponse<BuilderDetail>> {
    return apiClient.get<BuilderDetail>(`${this.basePath}/${id}`);
  }

  async getBuilderBySlug(slug: string): Promise<ApiResponse<BuilderDetail>> {
    return apiClient.get<BuilderDetail>(`${this.basePath}/slug/${slug}`);
  }
}

export const builderService = new BuilderService();
