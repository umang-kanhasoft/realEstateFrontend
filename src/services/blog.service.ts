import { BlogDetailResponse, BlogsListResponse } from '@/types/blog.types';
import { api } from '@/utils/api';

class BlogService {
  private readonly basePath = '/blogs';

  /**
   * Get paginated list of blogs
   */
  async getBlogs(limit = 10, offset = 0): Promise<BlogsListResponse> {
    const response = await api.get<BlogsListResponse>(this.basePath, {
      limit,
      offset,
    });

    if (!response.data) {
      throw new Error('Failed to fetch blogs');
    }

    return response.data;
  }

  /**
   * Get blog details by slug
   */
  async getBlogBySlug(slug: string): Promise<BlogDetailResponse> {
    const response = await api.get<BlogDetailResponse>(`/blog/slug/${slug}`);

    if (!response.data) {
      throw new Error('Failed to fetch blog details');
    }

    return response.data;
  }

  // Method to get by ID if needed
  async getBlogById(id: string): Promise<BlogDetailResponse> {
    const response = await api.get<BlogDetailResponse>(`/blog/${id}`);

    if (!response.data) {
      throw new Error('Failed to fetch blog details');
    }

    return response.data;
  }
}

export const blogService = new BlogService();
