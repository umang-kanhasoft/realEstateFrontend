'use client';

import BlogDetailClient from '@/components/blog/BlogDetailClient';
import { blogService } from '@/services/blog.service';
import { Blog } from '@/types/blog.types';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BlogPage() {
  const params = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params.slug) return;
      try {
        setIsLoading(true);
        const response = await blogService.getBlogBySlug(params.slug);
        if (response && response.blog) {
          setBlog(response.blog);
        } else {
          setError('Blog not found.');
        }
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params.slug]);

  if (isLoading) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gray-50">
        <CircularProgress size={40} className="text-primary-600" />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gray-50">
        <Typography variant="h6" className="text-gray-500">
          {error || 'Article not found.'}
        </Typography>
      </Box>
    );
  }

  return <BlogDetailClient blog={blog} />;
}
