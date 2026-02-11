'use client';

import BlogCard from '@/components/blog/BlogCard';
import { blogService } from '@/services/blog.service';
import { Blog } from '@/types/blog.types';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getBlogs(100, 0); // initial load
        if (response && response.blogs) {
          setBlogs(response.blogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load insights. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gray-50">
        <CircularProgress size={40} className="text-primary-600" />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50 pb-24 pt-32">
      <Container maxWidth="xl">
        {/* Header */}
        <Box className="mb-16 text-center">
          <Typography
            variant="overline"
            className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-primary-600"
          >
            Insights & News
          </Typography>
          <Typography
            variant="h1"
            className="mb-6 text-4xl font-black text-secondary-900 md:text-5xl lg:text-6xl"
          >
            Latest from <span className="text-primary-600">Real Estate</span>
          </Typography>
          <Typography
            variant="h5"
            className="mx-auto max-w-2xl font-normal leading-relaxed text-gray-500"
          >
            Expert analysis, market trends, and guides to help you make informed
            real estate decisions.
          </Typography>
        </Box>

        {error ? (
          <Box className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-red-200 bg-red-50 text-center">
            <Typography variant="h6" className="text-red-500">
              {error}
            </Typography>
          </Box>
        ) : blogs.length === 0 ? (
          <Box className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white text-center">
            <Typography variant="h6" className="text-gray-400">
              No articles found. Check back soon!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {blogs.map(blog => (
              <Grid item xs={12} md={6} lg={4} key={blog.id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
