'use client';

import { Builder } from '@/types/builder.types';
import {
  Apartment,
  ArrowOutward,
  Business,
  Star,
  TrackChanges,
  TrendingUp,
  Verified,
} from '@mui/icons-material';
import {
  Button,
  Container,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BuilderProfileProps {
  builder: Builder;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BuilderProfile({ builder }: BuilderProfileProps) {
  return (
    <Container maxWidth="xl" className="relative z-10 -mt-24 mb-12 md:-mt-32">
      {/* 2. Main Profile Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="rounded-3xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex flex-col items-start gap-8 p-6 md:flex-row md:p-10">
          {/* Logo Section */}
          <div className="relative mx-auto flex-shrink-0 md:mx-0">
            <div className="relative -mt-16 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-lg md:-mt-0 md:h-40 md:w-40">
              {builder.logoUrl ? (
                <Image
                  src={builder.logoUrl}
                  alt={builder.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-slate-300">
                  {builder.name.charAt(0)}
                </span>
              )}
            </div>
            <Tooltip title="Verified Builder" arrow>
              <Verified className="absolute -bottom-3 -right-3 z-10 h-8 w-8 rounded-full bg-blue-600 p-1 text-white shadow-sm" />
            </Tooltip>
          </div>

          {/* Identity Info */}
          <div className="w-full flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <Typography
                  variant="h2"
                  className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl"
                >
                  {builder.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  className="mt-2 font-medium text-slate-500"
                >
                  <div className="flex items-center gap-1">
                    <Business fontSize="small" className="text-slate-400" />
                    <span>Est. {builder.establishedYear}</span>
                  </div>
                </Stack>
              </div>

              {/* Contact Actions */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  endIcon={<ArrowOutward />}
                  href={'/contact'}
                  className="rounded-full bg-slate-900 px-6 py-2.5 font-bold normal-case text-white shadow-lg hover:bg-slate-800"
                  sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
                >
                  Contact
                </Button>
              </Stack>
            </div>

            <Divider className="my-4" />

            {/* Description Snippet */}
            <Typography className="max-w-4xl text-lg leading-relaxed text-slate-600">
              {builder.description}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-100 p-4 md:flex-row md:p-3">
          {/* 1. Modern Stats Bar */}
          <div className="grid w-full grid-cols-2 items-center gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-4">
            <div className="w-fit text-center sm:text-left">
              <div className="mb-1 text-sm font-medium text-slate-500">
                Experience
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="text-xl font-bold text-slate-900">
                  {new Date().getFullYear() - builder.establishedYear}+ Years
                </span>
              </div>
            </div>

            <div className="w-fit border-l border-slate-200 text-center sm:text-left">
              <div className="mb-1 text-sm font-medium text-slate-500">
                Total Projects
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Apartment fontSize="small" className="text-blue-500" />
                <span className="text-xl font-bold text-slate-900">
                  {builder.totalProjects}
                </span>
              </div>
            </div>

            <div className="w-fit border-l border-slate-200 text-center sm:text-left">
              <div className="mb-1 text-sm font-medium text-slate-500">
                Rating
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Star fontSize="small" className="text-amber-500" />
                <span className="text-xl font-bold text-slate-900">
                  {builder.avgRating || 'N/A'}
                </span>
              </div>
            </div>

            <div className="w-fit border-l border-slate-200 text-center sm:text-left">
              <div className="mb-1 text-sm font-medium text-slate-500">
                Success Rate
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <TrendingUp fontSize="small" className="text-emerald-500" />
                <span className="text-xl font-bold text-slate-900">
                  {Math.round(builder.successRate * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* 2. Mission & Vision - Modern Minimalist */}
          {builder.mission && (
            <div className="grid gap-8">
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-200" />
                <div className="mb-2 flex items-center gap-2">
                  <TrackChanges fontSize="small" className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">Our Mission</h3>
                </div>
                <p className="leading-relaxed text-slate-600">
                  {builder.mission}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Container>
  );
}
