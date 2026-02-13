'use client';

import { formatCurrency } from '@/lib/utils/format';
import { Amenity } from '@/services/projects.service';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SimilarProject {
  id?: string;
  name?: string;
  mainImageUrl?: string;
  area?: string;
  priceStartingFrom?: number;
  propertyType?: string;
  location?: {
    addressLine1?: string;
    locality?: string;
  };
  pricingAndInventory?: {
    configurations?: Array<{
      bedrooms?: number;
      superBuiltUpAreaSqft?: number;
    }>;
  };
  amenities?: Amenity[];
  rating?: number;
  possessionDate?: string;
  developer?: {
    name?: string;
  };
}

interface SimilarProjectsProps {
  projects: SimilarProject[];
  title?: string;
}

export default function SimilarProjects({
  projects,
  title = 'Similar Projects',
}: SimilarProjectsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (projectId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const getBedroomCount = (project: SimilarProject) => {
    const configs = project?.pricingAndInventory?.configurations;
    if (!configs || configs.length === 0) return 'N/A';

    const bedroomCounts = configs
      .map(config => config.bedrooms)
      .filter((bedroom): bedroom is number => bedroom !== undefined);
    if (bedroomCounts.length === 0) return 'N/A';

    const uniqueBedrooms = [...new Set(bedroomCounts)];
    if (uniqueBedrooms.length === 1) {
      return `${uniqueBedrooms[0]} BHK`;
    }
    return `${Math.min(...uniqueBedrooms)}-${Math.max(...uniqueBedrooms)} BHK`;
  };

  const getArea = (project: SimilarProject) => {
    const configs = project?.pricingAndInventory?.configurations;
    if (!configs || configs.length === 0) return project?.area || 'N/A';

    const areas = configs
      .map(config => config.superBuiltUpAreaSqft)
      .filter((area): area is number => area !== undefined);
    if (areas.length === 0) return project?.area || 'N/A';

    const minArea = Math.min(...areas);
    const maxArea = Math.max(...areas);

    if (minArea === maxArea) {
      return `${minArea} sqft`;
    }
    return `${minArea}-${maxArea} sqft`;
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Box mb={6}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
        <Chip
          label={`${projects.length} Projects`}
          size="small"
          sx={{
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            fontWeight: 600,
          }}
        />
      </Box>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
          1440: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{ paddingBottom: '50px' }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project?.id || index}>
            <Card
              sx={{
                borderRadius: '16px',
                height: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {/* Project Image */}
                <Box
                  sx={{ height: 220, overflow: 'hidden', position: 'relative' }}
                >
                  <Image
                    src={project?.mainImageUrl || '/placeholder-property.jpg'}
                    alt={project?.name || 'Project'}
                    className="!static w-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay with favorite button */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
                    }}
                  />

                  {/* Favorite Button */}
                  <IconButton
                    className="absolute right-2 top-2 z-10 bg-white/80 p-1 text-gray-700 backdrop-blur-[2px] hover:bg-white hover:text-red-500"
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(project?.id || index.toString());
                    }}
                  >
                    {favorites.has(project?.id || index.toString()) ? (
                      <FavoriteIcon sx={{ color: 'error.main' }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: 'text.secondary' }} />
                    )}
                  </IconButton>

                  {/* Status Badge */}
                  {project?.possessionDate && (
                    <Chip
                      label={`Ready by ${project.possessionDate}`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        bgcolor: 'success.main',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  )}
                </Box>
              </Box>

              <CardContent sx={{ pb: 3 }}>
                {/* Project Name and Rating */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={1}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ lineHeight: 1.2 }}
                  >
                    {project?.name}
                  </Typography>
                  {project?.rating && (
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Rating
                        value={project.rating}
                        precision={0.1}
                        size="small"
                        readOnly
                        sx={{ fontSize: '1rem' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        ({project.rating})
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Location */}
                <Box display="flex" alignItems="center" gap={0.5} mb={2}>
                  <LocationOnIcon
                    sx={{ fontSize: 16, color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {project?.location?.locality ||
                      project?.location?.addressLine1}
                  </Typography>
                </Box>

                {/* Developer */}
                {project?.developer?.name && (
                  <Typography
                    variant="caption"
                    color="primary.main"
                    fontWeight={600}
                    mb={2}
                    display="block"
                  >
                    By {project.developer.name}
                  </Typography>
                )}

                {/* Property Details Grid */}
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={4}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <BedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                      <Typography variant="caption" fontWeight={600}>
                        {getBedroomCount(project)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <SquareFootIcon
                        sx={{ fontSize: 16, color: 'primary.main' }}
                      />
                      <Typography variant="caption" fontWeight={600}>
                        {getArea(project)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <BathtubIcon
                        sx={{ fontSize: 16, color: 'primary.main' }}
                      />
                      <Typography variant="caption" fontWeight={600}>
                        {project?.propertyType || 'Residential'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Price */}
                <Box
                  sx={{
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    Starting from
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight={700}
                  >
                    {project?.priceStartingFrom
                      ? formatCurrency(project.priceStartingFrom)
                      : 'Price on Request'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
