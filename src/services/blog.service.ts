import { apiClient, ApiResponse } from '@/lib/api/client';

export interface BlogListItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  excerpt: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  readTime: string | null;
  coverImageUrl: string | null;
  tags: string[] | null;
  author: {
    id: string;
    fullName: string;
  };
}

export interface BlogDetail {
  id: string;
  title: string;
  slug: string;
  type: string;
  content: string;
  excerpt: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  readTime: string | null;
  coverImageUrl: string | null;
  tags: string[] | null;
  author: {
    id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogsListResponseData {
  blogs: BlogListItem[];
  totalCount: number;
  limit: number;
  offset: number;
}

class BlogService {
  private readonly basePath = '/blogs';

  async getBlogs(
    limit = 10,
    offset = 0
  ): Promise<ApiResponse<BlogsListResponseData>> {
    return apiClient.get<BlogsListResponseData>(
      `${this.basePath}?limit=${limit}&offset=${offset}`
    );
  }

  async getBlogById(id: string): Promise<ApiResponse<BlogDetail>> {
    return apiClient.get<BlogDetail>(`${this.basePath}/${id}`);
  }

  async getBlogBySlug(slug: string): Promise<ApiResponse<BlogDetail>> {
    return apiClient.get<BlogDetail>(`${this.basePath}/slug/${slug}`);
  }
}

export const blogService = new BlogService();
