'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ListingBannerProps {
  variant: 'sapno-ka-bhk' | 'luxury-spaces';
  className?: string;
}

export default function ListingBanner({
  variant,
  className = '',
}: ListingBannerProps) {
  if (variant === 'sapno-ka-bhk') {
    return (
      <Box
        className={`group relative mb-8 flex h-[140px] w-full cursor-pointer items-center justify-between overflow-hidden rounded-2xl px-8 shadow-lg transition-all duration-500 hover:shadow-xl md:px-12 ${className}`}
        sx={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        }}
      >
        {/* Decorative Background Elements */}
        <Box className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
        <Box className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/2 rounded-full bg-purple-400/10 blur-2xl" />

        <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="relative hidden h-24 w-24 md:block">
              <Image
                src="https://img.freepik.com/free-photo/yoga-meditation-concept_23-2148768783.jpg"
                alt="Peace of Mind"
                fill
                className="rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>
            <div>
              <Typography
                variant="h5"
                className="mb-1 font-sans font-bold text-gray-800"
              >
                Apne{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-extrabold text-transparent">
                  Sapno Ka BHK
                </span>{' '}
                Book Karo
              </Typography>
              <Typography variant="body2" className="font-medium text-gray-500">
                Zero Brokerage • Verified Listings • Instant Visits
              </Typography>
            </div>
          </div>

          <div className="rounded-full border border-white/50 bg-white/80 px-6 py-2 text-sm font-bold uppercase tracking-wide text-blue-700 shadow-sm backdrop-blur-md transition-transform group-hover:scale-105">
            Explore Now →
          </div>
        </div>
      </Box>
    );
  }

  if (variant === 'luxury-spaces') {
    return (
      <Box
        className={`group relative mb-8 flex h-[140px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl px-8 shadow-lg transition-all duration-500 hover:shadow-xl md:px-12 ${className}`}
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        }}
      >
        {/* Gold Accent Glow */}
        <Box className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full w-full items-center justify-between">
          <div className="z-20 flex h-full flex-col justify-center">
            <Typography
              variant="overline"
              className="mb-0 font-bold tracking-[0.2em] text-yellow-500"
            >
              PREMIUM COLLECTION
            </Typography>
            <Typography
              variant="h4"
              className="font-serif italic leading-none text-white"
            >
              Redefining{' '}
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text font-sans font-extrabold not-italic text-transparent">
                Luxury Living
              </span>
            </Typography>
          </div>

          {/* Right side image composition */}
          <div className="relative hidden h-full w-1/3 items-end justify-end opacity-90 grayscale transition-all duration-500 group-hover:grayscale-0 md:flex">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Luxury Home"
              fill
              className="mask-image-gradient object-cover"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black)',
              }}
            />
          </div>
        </div>
      </Box>
    );
  }

  return null;
}
