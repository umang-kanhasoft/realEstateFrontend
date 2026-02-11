'use client';
import { ArrowForwardRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AreaStats, areaService } from '@/services/area.service';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Grid size pattern for visual variety
const GRID_SIZES = [6, 3, 3, 4, 8];

// Default placeholder image
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

// Get all images from featured projects
function getAreaImages(area: AreaStats): string[] {
  const images: string[] = [];

  area.featuredProjects?.forEach(project => {
    project.images
      ?.filter(img => img.mediaType === 'image')
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .forEach(img => {
        if (img.mediaUrl) {
          images.push(img.mediaUrl);
        }
      });
  });

  return images.length > 0 ? images : [PLACEHOLDER_IMAGE];
}

// Generate random delay between min and max (ms)
function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface AreaCardProps {
  area: AreaStats;
  gridSize: number;
  index: number;
}

function AreaCard({ area, gridSize, index }: AreaCardProps) {
  const images = getAreaImages(area);
  const hasMultipleImages = images.length > 1;

  // Random delay between 5-10 seconds for each card
  const autoplayDelay = useMemo(
    () => getRandomDelay(5000, 10000) + index * 1500,
    [index]
  );

  return (
    <Grid item xs={12} md={gridSize}>
      <Link
        href={`/projects?area=${encodeURIComponent(area.name)}`}
        prefetch
        className="block h-full"
      >
        <Box className="group relative h-[320px] cursor-pointer overflow-hidden rounded-[20px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl md:rounded-[32px]">
          {/* Image Slider - Fade Effect */}
          {hasMultipleImages ? (
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={1000}
              autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
              }}
              loop
              allowTouchMove={false}
              className="absolute inset-0 h-full w-full"
            >
              {images.map((imageUrl, idx) => (
                <SwiperSlide key={idx}>
                  <Box
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                    sx={{ backgroundImage: `url(${imageUrl})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Box
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
              sx={{ backgroundImage: `url(${images[0]})` }}
            />
          )}

          {/* Gradient Overlay */}
          <Box className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />

          {/* Content */}
          <Box className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-8">
            <Typography
              variant="h5"
              className="mb-2 font-bold text-white drop-shadow-md"
            >
              {area.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <Typography
                variant="subtitle2"
                className="font-medium text-white/90 drop-shadow-sm"
              >
                {area.propertiesCount}+ Projects
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
}

function LoadingSkeleton() {
  return (
    <Grid container spacing={3}>
      {GRID_SIZES.map((size, index) => (
        <Grid item xs={12} md={size} key={index}>
          <Skeleton
            variant="rounded"
            height={320}
            sx={{ borderRadius: { xs: '20px', md: '32px' } }}
            animation="wave"
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default function NewProjects() {
  const [areas, setAreas] = useState<AreaStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        const response = await areaService.getAreas({
          limit: 5,
          offset: 0,
          sortBy: 'property_count',
          sortOrder: 'desc',
        });

        if (response.status === 'success' && response.data?.areas) {
          setAreas(response.data.areas);
        }
      } catch (err) {
        console.error('Failed to fetch areas:', err);
        setError('Failed to load neighborhoods');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <Container maxWidth="xl" className="my-16">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'start', md: 'end' }}
        className="mb-8 md:mb-12"
      >
        <Box>
          <Typography
            variant="overline"
            className="font-extrabold tracking-[1.5px] text-primary-600"
          >
            CURATED LOCATIONS
          </Typography>
          <Typography
            variant="h3"
            className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl"
          >
            Explore Prime Neighborhoods<span className="text-sky-500">.</span>
          </Typography>
        </Box>
        <Link href="/projects" prefetch>
          <Button
            variant="outlined"
            size="large"
            endIcon={
              <ArrowForwardRounded className="transition-transform duration-300 group-hover:translate-x-1" />
            }
            className="group rounded-full border-2 border-secondary-900 px-6 py-2 font-semibold text-secondary-900 transition-all duration-300 hover:bg-secondary-900 hover:text-white"
            sx={{ textTransform: 'none' }}
          >
            View map
          </Button>
        </Link>
      </Stack>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <Box className="flex h-[320px] items-center justify-center rounded-[32px] bg-gray-100">
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {areas.map((area, index) => (
            <AreaCard
              key={area.id}
              area={area}
              gridSize={GRID_SIZES[index % GRID_SIZES.length]}
              index={index}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
}
