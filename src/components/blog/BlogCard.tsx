'use client';

import { Blog } from '@/types/blog.types';
import { AccessTime, CalendarMonth } from '@mui/icons-material';
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
      <div
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        style={{
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          maskImage: 'radial-gradient(white, black)',
          transform: 'translateZ(0)',
        }}
      >
        {/* Cover Image */}
        <div className="relative h-64 w-full overflow-hidden">
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
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {blog.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-secondary-900 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-0.5">
              <CalendarMonth fontSize="inherit" />
              <span>{formattedDate}</span>
            </div>
            {blog.readTime && (
              <div className="flex items-center gap-0.5">
                <AccessTime fontSize="inherit" />
                <span>{blog.readTime} read</span>
              </div>
            )}
          </div>

          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-secondary-900 transition-colors group-hover:text-primary-600">
            {blog.title}
          </h3>

          <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
            {blog.excerpt}
          </p>

          {/* Author */}
          <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-4">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              {blog.author?.profileImageUrl ? (
                <Image
                  src={blog.author.profileImageUrl}
                  alt={blog.author?.fullName || 'Author'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-500">
                  {blog.author?.fullName?.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-secondary-900">
                {blog.author?.fullName}
              </div>
              {blog.author?.specialization && (
                <div className="-mt-0.5 text-xs text-gray-500">
                  {blog.author.specialization}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
