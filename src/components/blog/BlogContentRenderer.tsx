'use client';

import { BlogContent, BlogSectionItem } from '@/types/blog.types';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface BlogContentRendererProps {
  content: BlogContent;
}

const BlogContentRenderer = ({ content }: BlogContentRendererProps) => {
  if (!content || !content.sections) {
    return null;
  }

  const renderSection = (section: BlogSectionItem, index: number) => {
    switch (section.type) {
      case 'heading': {
        const HeadingVariant =
          section.level === 1
            ? 'h2'
            : section.level === 2
              ? 'h3'
              : section.level === 3
                ? 'h4'
                : 'h5';

        return (
          <Typography
            key={index}
            variant={HeadingVariant}
            className="mb-4 mt-8 font-bold text-secondary-900 first:mt-0"
          >
            {section.text}
          </Typography>
        );
      }

      case 'paragraph':
        return (
          <Typography
            key={index}
            variant="body1"
            className="mb-6 leading-relaxed text-gray-700 md:text-lg"
          >
            {section.text}
          </Typography>
        );

      case 'image':
        if (!section.url) return null;
        return (
          <Box
            key={index}
            className="my-8 overflow-hidden rounded-2xl bg-gray-50"
          >
            <Box className="relative aspect-video w-full">
              <Image
                src={section.url}
                alt={section.caption || 'Blog image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1000px"
              />
            </Box>
            {section.caption && (
              <Typography
                variant="caption"
                className="block p-3 text-center italic text-gray-500"
              >
                {section.caption}
              </Typography>
            )}
          </Box>
        );

      case 'list': {
        if (!section.items || section.items.length === 0) return null;
        const ListTag = section.style === 'ordered' ? 'ol' : 'ul';
        const listStyle =
          section.style === 'ordered' ? 'list-decimal' : 'list-disc';

        return (
          <Box key={index} className="mb-6 pl-4 md:pl-6">
            <ListTag
              className={`space-y-2 ${listStyle} marker:text-primary-500`}
            >
              {section.items.map((item, idx) => (
                <li
                  key={idx}
                  className="pl-2 text-lg leading-relaxed text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ListTag>
          </Box>
        );
      }

      case 'quote':
        return (
          <Box
            key={index}
            className="my-8 rounded-r-xl border-l-4 border-primary-500 bg-primary-50 p-6 md:p-8"
          >
            <Typography
              variant="h6"
              className="font-medium italic leading-relaxed text-secondary-800"
            >
              &quot;{section.text}&quot;
            </Typography>
            {section.caption && (
              <Typography
                variant="subtitle2"
                className="mt-4 font-bold text-primary-600"
              >
                - {section.caption}
              </Typography>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box className="blog-content">{content.sections.map(renderSection)}</Box>
  );
};

export default BlogContentRenderer;
