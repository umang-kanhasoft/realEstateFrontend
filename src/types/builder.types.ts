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
  id: number;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface Builder {
  id: string;
  name: string;
  slug: string;
  description: string;
  phone: string;
  contactEmail: string;
  mission: string;
  vision?: string;
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
  totalCount: number;
}

export interface BuilderDetailResponse {
  builder: Builder;
}

export interface NewsResponse {
  news: BuilderNews[];
  totalCount: number;
  limit: number;
  offset: number;
}
