'use client';

import { Blog } from '@/types/blog.types';
import { AccessTime, CalendarMonth } from '@mui/icons-material';
import { Avatar, Box, Card, Chip, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formattedDate = blog.publishedAt
    ? format(new Date(blog.publishedAt), 'MMM dd, yyyy')
    : 'Recently';

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full">
      <Card
        elevation={0}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        sx={{
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          maskImage: 'radial-gradient(white, black)',
          transform: 'translateZ(0)',
        }}
      >
        {/* Cover Image */}
        <Box className="relative h-64 w-full overflow-hidden">
          <Image
            src={
              blog.coverImageUrl ||
              'https://images.unsplash.com/photo-1560518883-ce09059ee971'
            }
            alt={blog.title}
            fill
            className="overflow-hidden object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Box className="absolute left-4 top-4 flex flex-wrap gap-2">
            {blog.tags?.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                className="bg-white/90 font-bold text-secondary-900 backdrop-blur-sm"
              />
            ))}
          </Box>
        </Box>

        {/* Content */}
        <Box className="flex flex-1 flex-col p-6">
          <Stack
            direction="row"
            spacing={2}
            className="mb-4 text-xs font-medium text-gray-500"
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CalendarMonth fontSize="inherit" />
              <span>{formattedDate}</span>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTime fontSize="inherit" />
              <span>{blog.readTime} read</span>
            </Stack>
          </Stack>

          <Typography
            variant="h5"
            className="mb-3 line-clamp-2 font-bold text-secondary-900 transition-colors group-hover:text-primary-600"
          >
            {blog.title}
          </Typography>

          <Typography
            variant="body2"
            className="mb-6 line-clamp-3 flex-1 leading-relaxed text-gray-600"
          >
            {blog.excerpt}
          </Typography>

          {/* Author */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            className="mt-auto border-t border-gray-100 pt-4"
          >
            <Avatar
              src={blog.author?.profileImageUrl}
              alt={blog.author?.fullName}
              sx={{ width: 32, height: 32 }}
            >
              {blog.author?.fullName?.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle2"
                className="font-bold text-secondary-900"
              >
                {blog.author?.fullName}
              </Typography>
              {blog.author?.specialization && (
                <Typography
                  variant="caption"
                  className="-mt-0.5 block text-gray-500"
                >
                  {blog.author.specialization}
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      </Card>
    </Link>
  );
};

export default BlogCard;
