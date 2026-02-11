import BlogDetailClient from '@/components/blog/BlogDetailClient';
import { blogService } from '@/services/blog.service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  try {
    const response = await blogService.getBlogBySlug(params.slug);
    const blog = response.blog;

    if (!blog) {
      return {
        title: 'Article Not Found',
      };
    }

    return {
      title: `${blog.title} | Real Estate Insights`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: blog.coverImageUrl ? [blog.coverImageUrl] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        images: blog.coverImageUrl ? [blog.coverImageUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Blog Article',
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    const response = await blogService.getBlogBySlug(params.slug);
    const blog = response.blog;

    if (!blog) {
      notFound();
    }

    return <BlogDetailClient blog={blog} />;
  } catch {
    notFound();
  }
}
