import { apiClient, ApiResponse } from '@/lib/api/client';

export interface MetadataCategories {
  blogCategories: string[];
  popularTopics: string[];
}

class MetadataService {
  private readonly basePath = '/metadata';

  async getCategories(): Promise<ApiResponse<MetadataCategories>> {
    return apiClient.get<MetadataCategories>(`${this.basePath}/categories`);
  }
}

export const metadataService = new MetadataService();
