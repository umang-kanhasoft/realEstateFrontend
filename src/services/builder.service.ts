import { apiClient } from '@/lib/api/client';
import {
  Builder,
  BuilderDetailResponse,
  BuilderNews,
  BuilderResponse,
  NewsResponse,
} from '@/types/builder.types';

export class BuilderService {
  static async getBuilders(limit = 10, offset = 0): Promise<BuilderResponse> {
    const res = await apiClient.get<BuilderResponse>('/builders', {
      params: { limit, offset },
    });

    if (!res.data) {
      throw new Error('Failed to fetch builders');
    }

    return res.data;
  }

  static async getBuilderById(id: string): Promise<Builder> {
    const res = await apiClient.get<BuilderDetailResponse>(`/builder/${id}`);

    if (!res.data || !res.data.builder) {
      throw new Error('Builder not found');
    }

    return res.data.builder;
  }

  static async getBuilderBySlug(slug: string): Promise<Builder> {
    const res = await apiClient.get<Builder>(`/builder/slug/${slug}`);

    if (!res.data) {
      throw new Error('Builder not found');
    }

    return res.data;
  }

  static async getBuilderNews(
    source: string,
    limit = 10,
    offset = 0
  ): Promise<BuilderNews[]> {
    const res = await apiClient.get<NewsResponse>(`/news/source/${source}`, {
      params: { limit, offset },
    });

    if (!res.data) {
      return [];
    }

    return res.data.news || [];
  }

  static async syncNews(builderName: string): Promise<BuilderNews[]> {
    const res = await apiClient.post<NewsResponse>('/news/sync', {
      builderName,
    });

    if (!res.data) {
      return [];
    }

    return res.data.news || [];
  }
}
