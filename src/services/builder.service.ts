import {
  Builder,
  BuilderDetailResponse,
  BuilderNews,
  NewsResponse,
} from '@/types/builder.types';
import { api } from '@/utils/api';

export class BuilderService {
  static async getBuilders(limit = 10, offset = 0): Promise<Builder> {
    const res = await api.get<Builder>('/builders', { limit, offset });

    if (!res.data) {
      throw new Error('Failed to fetch builders');
    }

    return res.data;
  }

  static async getBuilderById(id: string): Promise<Builder> {
    const res = await api.get<BuilderDetailResponse>(`/builder/${id}`);

    if (!res.data?.builder) {
      throw new Error('Builder not found');
    }

    return res.data.builder;
  }

  static async getBuilderBySlug(slug: string): Promise<Builder> {
    const res = await api.get<Builder>(`/builder/slug/${slug}`);

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
    const res = await api.get<NewsResponse>(`/news/source/${source}`, {
      limit,
      offset,
    });
    return res.data.news || [];
  }

  static async syncNews(builderName: string): Promise<BuilderNews[]> {
    const res = await api.post<NewsResponse>('/news/sync', { builderName });
    return res.data.news || [];
  }
}
