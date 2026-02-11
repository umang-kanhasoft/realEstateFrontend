import { api } from '@/utils/api';

export interface BuilderProject {
  id: string;
  name: string;
  slug: string;
  area: string;
  city: string;
  status: 'ready_to_move' | 'new_launch' | 'under_construction';
  propertyType: 'villa' | 'apartment' | 'plot';
  mainImageUrl: string;
  completionTime: number;
  possessionDate: string;
}

export interface BuilderAward {
  id: string;
  title: string;
  awardOrg: string;
  awardYear: number;
  description: string;
}

export interface BuilderCertificate {
  id: string;
  title: string;
  issuer: string;
  fileUrl: string;
  expiryDate: string;
}

export interface BuilderNews {
  title: string;
  date: string;
}

export interface Builder {
  id: string;
  name: string;
  slug: string;
  description: string;
  phone: string;
  contactEmail: string;
  mission: string;
  logoUrl: string;
  websiteUrl: string;
  establishedYear: number;

  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  avgCompletionTime: number;
  successRate: number;
  avgRating: number;

  awards: BuilderAward[];
  certificates: BuilderCertificate[];
  projects: BuilderProject[];
  recentNews: BuilderNews[];
}

export interface BuilderResponse {
  builders: Builder[];
  total: number;
}

export interface BuilderResponse {
  builder: Builder;
}

export class BuilderService {
  static async getBuilders(limit = 10, offset = 0): Promise<Builder> {
    const res = await api.get<Builder>('/builders', { limit, offset });

    if (!res.data) {
      throw new Error('Failed to fetch builders');
    }

    return res.data;
  }

  static async getBuilderById(id: string): Promise<Builder> {
    const res = await api.get<BuilderResponse>(`/builder/${id}`);

    if (!res.data?.builder) {
      throw new Error('Builder not found');
    }

    return res.data.builder;
  }

  static async getBuilderBySlug(slug: string): Promise<Builder> {
    const res = await api.get<Builder>(`/builders/slug/${slug}`);

    if (!res.data) {
      throw new Error('Builder not found');
    }

    return res.data;
  }
}
