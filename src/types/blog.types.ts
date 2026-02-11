export interface BlogAuthor {
  id: string;
  fullName: string;
  email?: string;
  role?: string[];
  isVerified?: boolean;
  profileImageUrl?: string;
  bio?: string;
  specialization?: string;
  yearsOfExperience?: number;
}

export interface BlogSectionItem {
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote';
  text?: string;
  level?: number; // for headings 1-6
  url?: string; // for images or links
  caption?: string; // for images
  items?: string[]; // for lists
  style?: 'ordered' | 'unordered'; // for lists
  propertyId?: string;
  buttonText?: string;
  link?: string;
}

export interface BlogContent {
  sections: BlogSectionItem[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  type: 'blog';
  content?: BlogContent; // Optional in list view, required in detail
  excerpt: string;
  isPublished: boolean;
  publishedAt: string;
  readTime: string;
  coverImageUrl: string;
  tags: string[];
  author: BlogAuthor;
}

export interface BlogsListResponse {
  blogs: Blog[];
  totalCount: number;
  limit: number;
  offset: number;
}

export interface BlogDetailResponse {
  blog: Blog;
}
