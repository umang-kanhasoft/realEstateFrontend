'use client';

import {
  Collections,
  Download,
  East,
  ExpandLess,
  ExpandMore,
  FavoriteBorder,
  Info,
  LocationOn,
  Phone,
  WhatsApp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useState } from 'react';

export interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    builderName: string;
    location: string;
    priceRange: string;
    areaRange: string;
    configurations: {
      bhk: string;
      area: string;
      price: string;
      type: string;
    }[];
    usp: string[];
    reraId: string;
    badges: string[];
    image: string;
    landmarks: {
      type: string;
      name: string;
      distanceKm: number;
      travelTimeMin?: number;
    }[];
  };
}

const INITIAL_LANDMARKS_COUNT = 3;

function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [showAllLandmarks, setShowAllLandmarks] = useState(false);
  const visibleLandmarks = showAllLandmarks
    ? project.landmarks || []
    : (project.landmarks || []).slice(0, INITIAL_LANDMARKS_COUNT);

  return (
    <div
      className="group mb-6 flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl md:flex-row md:rounded-2xl hover:md:rounded-2xl"
      style={{ cursor: 'pointer' }}
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      {/* Image Section */}
      <Box className="relative h-56 w-full flex-shrink-0 overflow-hidden bg-gray-100 sm:h-64 md:h-auto md:w-72 md:rounded-l-2xl hover:md:rounded-l-2xl">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-1">
          {project.badges?.map((badge, i) => (
            <span
              key={i}
              className="w-fit rounded-md bg-blue-600/90 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm backdrop-blur-sm"
            >
              {badge.replace('_', ' ')}
            </span>
          ))}
        </div>
        <IconButton
          className="absolute right-4 top-4 z-10 bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm hover:bg-white"
          size="small"
        >
          <FavoriteBorder fontSize="small" />
        </IconButton>

        <Box className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <Collections sx={{ fontSize: 12 }} />
          12
        </Box>
      </Box>

      {/* Content Section */}
      <Box className="flex flex-1 flex-col justify-between p-4 md:p-5">
        <div>
          {/* Header */}
          <div className="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div className="w-full sm:w-auto">
              <div className="mb-1 flex items-center gap-2">
                <Typography
                  variant="h6"
                  className="cursor-pointer font-bold leading-tight text-gray-900 transition-colors hover:text-blue-600"
                >
                  {project.name}
                </Typography>
                <Tooltip title="View on Map">
                  <LocationOn className="h-4 w-4 cursor-pointer text-blue-500" />
                </Tooltip>
              </div>
              <Typography
                variant="body2"
                sx={{ mb: 0.5 }}
                className="text-xs text-gray-500"
              >
                {project.location}
              </Typography>
            </div>
            <div className="flex w-full flex-row items-baseline justify-between pr-2 sm:w-auto sm:flex-col sm:items-end sm:pr-0 sm:text-right">
              <Typography
                variant="h6"
                className="font-bold leading-none tracking-tight text-gray-900"
              >
                {project.priceRange}
              </Typography>
              {project.areaRange && (
                <Typography
                  variant="caption"
                  className="mt-0 rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 font-medium text-gray-500 sm:mt-1"
                >
                  {project.areaRange}
                </Typography>
              )}
            </div>
          </div>

          {/* Configurations Table-like Grid */}
          <div className="mb-3 mt-2 rounded-lg border border-gray-100/50 bg-gray-50 p-2">
            {project.configurations.map((conf, idx) => (
              <div
                key={idx}
                className={`flex flex-wrap items-center gap-y-2 py-2 md:grid md:grid-cols-12 md:gap-2 ${
                  idx !== project.configurations.length - 1
                    ? 'border-b border-gray-200'
                    : ''
                }`}
              >
                <div className="w-1/2 border-r border-gray-200 pr-2 md:col-span-3 md:w-auto md:text-center">
                  <Typography className="text-sm font-bold text-gray-800">
                    {conf.bhk}
                  </Typography>
                  <Typography className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                    {conf.type || 'Flat'}
                  </Typography>
                </div>

                <div className="w-1/2 border-gray-200 px-2 pl-4 md:col-span-4 md:w-auto md:border-r md:pl-2 md:text-center">
                  <Typography className="text-sm font-bold text-gray-800">
                    {conf.area}
                  </Typography>
                  <Typography className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                    Super Built-up
                  </Typography>
                </div>

                <div className="mt-1 flex w-full items-center justify-start md:col-span-5 md:mt-0 md:justify-center">
                  <Typography className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600 md:px-2 md:py-0.5">
                    {conf.price}
                    <Tooltip title="Excluding Gov. Charges">
                      <Info
                        sx={{ fontSize: 10, color: 'inherit', opacity: 0.7 }}
                      />
                    </Tooltip>
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          {/* USPs / Meta */}
          <div className="mb-4 flex flex-wrap gap-2 text-[11px] text-gray-600">
            {project.usp.map((u, i) => (
              <span
                key={i}
                className="rounded border border-green-100 bg-green-50 px-2 py-1 font-medium text-green-700"
              >
                {u}
              </span>
            ))}
            <span className="rounded border border-gray-100 bg-gray-50 px-2 py-1 font-medium text-gray-500">
              RERA: {project.reraId}
            </span>
          </div>

          {/* Landmarks Chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            {visibleLandmarks.map((item, i) => (
              <Chip
                key={i}
                label={`${item.name} (${item.distanceKm} km)`}
                size="small"
                className="h-6 max-w-[150px] border border-transparent bg-gray-100 text-xs text-gray-600 hover:border-gray-300 sm:max-w-none"
                sx={{
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
            {!showAllLandmarks &&
              project.landmarks &&
              project.landmarks.length > INITIAL_LANDMARKS_COUNT && (
                <Chip
                  label="More"
                  size="small"
                  variant="outlined"
                  className="h-6 cursor-pointer border-gray-300 text-xs text-gray-500 hover:bg-gray-50"
                  icon={<ExpandMore fontSize="small" />}
                  onClick={() => setShowAllLandmarks(true)}
                />
              )}
            {showAllLandmarks &&
              project.landmarks &&
              project.landmarks.length > INITIAL_LANDMARKS_COUNT && (
                <Chip
                  label="Less"
                  size="small"
                  variant="outlined"
                  className="h-6 cursor-pointer border-gray-300 text-xs text-gray-500 hover:bg-gray-50"
                  icon={<ExpandLess fontSize="small" />}
                  onClick={() => setShowAllLandmarks(false)}
                />
              )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-auto flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 lg:flex-row lg:items-center">
          <div className="w-full lg:w-auto">
            <Typography className="mr-2 flex flex-col items-baseline gap-1 text-xs text-gray-500 sm:flex-row">
              Builder:
              <span className="cursor-pointer text-sm font-bold text-gray-700 hover:underline">
                {project.builderName}
              </span>
            </Typography>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:justify-end lg:gap-2">
            <Tooltip title="Share on WhatsApp">
              <IconButton
                className="border border-green-500 text-green-600 hover:bg-green-50"
                size="small"
              >
                <WhatsApp fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Call Now">
              <IconButton
                className="border border-blue-500 text-blue-600 hover:bg-blue-50"
                size="small"
              >
                <Phone fontSize="small" />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              className="flex-1 whitespace-nowrap rounded-full border-secondary-900 px-4 py-1.5 text-xs font-bold normal-case text-secondary-900 hover:bg-secondary-900 hover:text-white sm:flex-none"
              startIcon={<Download fontSize="small" />}
              sx={{ textTransform: 'none' }}
            >
              Brochure
            </Button>
            <Button
              variant="contained"
              className="flex-1 whitespace-nowrap rounded-full bg-secondary-900 px-5 py-2 text-xs font-bold normal-case text-white shadow-md hover:bg-black sm:flex-none"
              endIcon={<East fontSize="small" />}
              sx={{ textTransform: 'none' }}
            >
              View Details
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default memo(ProjectCard);
