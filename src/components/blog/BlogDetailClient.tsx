'use client';

import BlogContentRenderer from '@/components/blog/BlogContentRenderer';
import { Blog } from '@/types/blog.types';
import {
  AccessTime,
  ArrowBackRounded,
  CalendarMonth,
  Facebook,
  LinkedIn,
  Share,
  Twitter,
  Verified,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface BlogDetailClientProps {
  blog: Blog;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const formattedDate = blog.publishedAt
    ? format(new Date(blog.publishedAt), 'MMMM dd, yyyy')
    : 'Recently';

  return (
    <Box className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      {/* ========== HERO SECTION ========== */}
      <Box className="relative h-[70vh] min-h-[550px] w-full overflow-hidden">
        {/* Background Image with Blur Effect */}
        <Image
          src={
            blog.coverImageUrl ||
            'https://images.unsplash.com/photo-1560518883-ce09059ee971?w=1920&q=80'
          }
          alt={blog.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Modern Gradient Overlay */}
        <Box className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

        {/* Back to All Blogs Link */}
        <Link href="/blogs" prefetch>
          <Button
            variant="outlined"
            size="large"
            startIcon={
              <ArrowBackRounded className="transition-transform duration-300 group-hover:-translate-x-1" />
            }
            className="group absolute left-10 top-10 z-20 rounded-full border-2 border-secondary-900 bg-white px-8 py-3 font-semibold text-secondary-900 transition-all duration-300 hover:bg-secondary-900 hover:text-white"
            sx={{ textTransform: 'none' }}
          >
            Back to All Blogs
          </Button>
        </Link>

        {/* Hero Content */}
        <Container
          maxWidth="lg"
          className="relative z-10 flex h-full flex-col justify-end pb-20 pt-32"
        >
          {/* Tags */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Stack
              direction="row"
              spacing={1.5}
              className="my-2.5 flex-wrap gap-2"
            >
              {blog.tags?.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  className="rounded-full bg-primary-600 px-1 text-xs font-bold text-white shadow-md"
                />
              ))}
            </Stack>
          </motion.div>

          {/* Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <Typography
              variant="h1"
              component="h1"
              className="mb-6 max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
            >
              {blog.title}
            </Typography>
          </motion.div>

          {/* Meta Bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              className="text-white/90"
            >
              {/* Author */}
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  src={blog.author?.profileImageUrl}
                  alt={blog.author?.fullName}
                  sx={{ width: 44, height: 44 }}
                  className="border-2 border-white/30 shadow-md"
                >
                  {blog.author?.fullName?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    className="font-bold leading-tight text-white"
                  >
                    {blog.author?.fullName}
                  </Typography>
                  {blog.author?.role && (
                    <Typography variant="caption" className="text-white/60">
                      {blog.author.role[0]}
                    </Typography>
                  )}
                </Box>
              </Stack>

              {/* Date & Read Time */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={3}
                className="text-white"
              >
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CalendarMonth
                    sx={{ fontSize: 18 }}
                    className="text-white/80"
                  />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    className="text-white"
                  >
                    {formattedDate}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <AccessTime sx={{ fontSize: 18 }} className="text-white/80" />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    className="text-white"
                  >
                    {blog.readTime} read
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ========== MAIN CONTENT GRID ========== */}
      <Container maxWidth="xl" className="relative z-20 -mt-16 pb-24">
        <Box className="flex flex-col gap-10 lg:flex-row">
          {/* Article Content Column */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10 lg:p-12"
          >
            {/* Excerpt / Lead Paragraph */}
            <Typography
              variant="h5"
              component="p"
              className="mb-10 border-l-4 border-primary-500 pl-6 text-xl font-light italic leading-relaxed text-gray-500 sm:text-2xl"
            >
              {blog.excerpt}
            </Typography>

            {/* Main Content */}
            <Box className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-600 max-w-none">
              <BlogContentRenderer content={blog.content || { sections: [] }} />
            </Box>

            {/* Share Footer */}
            <Box className="mt-16 border-t border-gray-100 pt-8">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Share fontSize="small" className="text-gray-400" />
                  <Typography className="font-bold text-gray-900">
                    Share this article
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    className="bg-gray-100 transition-all hover:scale-110 hover:bg-[#1877F2] hover:text-white"
                  >
                    <Facebook fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="bg-gray-100 transition-all hover:scale-110 hover:bg-[#1DA1F2] hover:text-white"
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="bg-gray-100 transition-all hover:scale-110 hover:bg-[#0A66C2] hover:text-white"
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </motion.article>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-80 xl:w-96">
            <Box className="sticky top-24 space-y-6">
              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Box className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
                  {/* Author Header Gradient */}
                  <Box className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-center">
                    <Avatar
                      src={blog.author?.profileImageUrl}
                      alt={blog.author?.fullName}
                      sx={{ width: 80, height: 80 }}
                      className="mx-auto mb-3 border-4 border-white/30 shadow-lg"
                    >
                      {blog.author?.fullName?.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" className="font-bold text-white">
                      {blog.author?.fullName}
                    </Typography>
                    {blog.author?.isVerified && (
                      <Chip
                        icon={<Verified className="!text-xs !text-green-600" />}
                        label="Verified Expert"
                        size="small"
                        className="mt-2 h-6 bg-white/90 text-xs font-bold text-green-700"
                      />
                    )}
                  </Box>

                  {/* Author Details */}
                  <Box className="p-6">
                    {blog.author?.bio && (
                      <Typography
                        variant="body2"
                        className="mb-5 text-center leading-relaxed text-gray-600"
                      >
                        {blog.author.bio}
                      </Typography>
                    )}

                    <Divider className="my-4" />

                    <Stack spacing={3}>
                      <Box className="text-center">
                        <Typography
                          variant="caption"
                          className="font-bold uppercase tracking-widest text-gray-400"
                        >
                          Specialization
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mt-1 font-semibold text-gray-800"
                        >
                          {blog.author?.specialization ||
                            'Real Estate Insights'}
                        </Typography>
                      </Box>
                      <Box className="text-center">
                        <Typography
                          variant="caption"
                          className="font-bold uppercase tracking-widest text-gray-400"
                        >
                          Experience
                        </Typography>
                        <Typography
                          variant="body2"
                          className="mt-1 font-semibold text-gray-800"
                        >
                          {blog.author?.yearsOfExperience
                            ? `${blog.author.yearsOfExperience}+ Years`
                            : 'Senior Expert'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </motion.div>

              {/* Newsletter CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Box className="rounded-3xl bg-gradient-to-br from-secondary-900 via-gray-900 to-secondary-800 p-8 text-center text-white shadow-xl">
                  <Typography variant="h6" className="mb-2 font-bold">
                    Stay Updated
                  </Typography>
                  <Typography variant="body2" className="mb-6 text-white/70">
                    Get weekly real estate insights and market trends.
                  </Typography>
                  <MuiLink href="/contact" underline="none">
                    <Box className="w-full cursor-pointer rounded-xl bg-white py-3 font-bold text-secondary-900 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                      Subscribe Now
                    </Box>
                  </MuiLink>
                </Box>
              </motion.div>
            </Box>
          </aside>
        </Box>
      </Container>
    </Box>
  );
}
