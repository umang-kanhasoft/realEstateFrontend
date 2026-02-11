'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { formatCurrency } from '@/lib/utils/format';
import { ProjectsService } from '@/services/projects.service';
import { ApiProjectObject } from '@/types/api-project.types';
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  Bathtub,
  Bed,
  Favorite,
  FavoriteBorder,
  LocationOn,
  SquareFoot,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const FeaturedProperties = (): JSX.Element => {
  const [isReady, setIsReady] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data, isLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () =>
      ProjectsService.getProjects({
        isFeatured: true,
        limit: 10,
        sortBy: 'price',
        sortOrder: 'desc',
      }),
  });

  useEffect(() => {
    setIsReady(true);
  }, []);

  const projects = data?.projects || [];

  const mapProjectToCard = (project: ApiProjectObject) => {
    const unitTypes = project.unitTypes || [];
    const minBeds =
      unitTypes.length > 0
        ? Math.min(...unitTypes.map(u => u.bedrooms || 0))
        : 0;
    const maxBeds =
      unitTypes.length > 0
        ? Math.max(...unitTypes.map(u => u.bedrooms || 0))
        : 0;

    const minBaths =
      unitTypes.length > 0
        ? Math.min(...unitTypes.map(u => u.bathrooms || 0))
        : 0;
    const maxBaths =
      unitTypes.length > 0
        ? Math.max(...unitTypes.map(u => u.bathrooms || 0))
        : 0;

    const minArea =
      unitTypes.length > 0
        ? Math.min(...unitTypes.map(u => u.carpetAreaSqft || 0))
        : 0;
    const maxArea =
      unitTypes.length > 0
        ? Math.max(...unitTypes.map(u => u.carpetAreaSqft || 0))
        : 0;

    // Generate URL-friendly slugs for navigation
    const citySlug = (project.city || 'ahmedabad')
      .toLowerCase()
      .replace(/\s+/g, '-');
    const localitySlug = (project.locality || project.area || 'locality')
      .toLowerCase()
      .replace(/\s+/g, '-');
    const projectSlug = project.slug || project.id;

    return {
      id: project.id,
      title: project.name,
      location: [project.locality, project.city].filter(Boolean).join(', '),
      price: project.priceStartingFrom
        ? formatCurrency(project.priceStartingFrom)
        : 'Price on Request',
      bedrooms: minBeds === maxBeds ? minBeds : `${minBeds}-${maxBeds}`,
      bathrooms: minBaths === maxBaths ? minBaths : `${minBaths}-${maxBaths}`,
      area:
        minArea === maxArea
          ? `${minArea} sq.ft`
          : `${minArea}-${maxArea} sq.ft`,
      image:
        project.mainImageUrl ||
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      type: project.propertyType === 'plot' ? 'Sale' : 'Sale', // Can customize based on types
      status: project.status,
      // Navigation fields
      href: `/${citySlug}/${localitySlug}/${projectSlug}`,
    };
  };

  if (isLoading) {
    return (
      <Box className="bg-secondary-50 py-16">
        <Container maxWidth="xl">
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={400} height={60} className="mt-2" />
          <Box className="mt-8 flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={300}
                height={400}
                className="rounded-2xl"
              />
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="bg-secondary-50 py-16">
      <Container maxWidth="xl">
        {/* Section Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={3}
          className="mb-8"
        >
          <Box>
            <Typography
              variant="overline"
              className="text-xs font-bold tracking-[2px] text-primary-600"
            >
              PREMIUM SELECTION
            </Typography>
            <Typography
              variant="h3"
              className="mt-1 text-3xl font-extrabold text-secondary-900 md:text-4xl"
            >
              Featured Properties
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <IconButton className="fp-prev h-11 w-11 border border-secondary-200 bg-white text-secondary-700 shadow-sm transition-all duration-200 hover:border-primary-500 hover:bg-primary-500 hover:text-white">
              <ArrowBackRounded fontSize="small" />
            </IconButton>
            <IconButton className="fp-next h-11 w-11 border border-secondary-200 bg-white text-secondary-700 shadow-sm transition-all duration-200 hover:border-primary-500 hover:bg-primary-500 hover:text-white">
              <ArrowForwardRounded fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Swiper Carousel */}
        <Box
          className={`transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            navigation={{
              nextEl: '.fp-next',
              prevEl: '.fp-prev',
            }}
            grabCursor
            loop
            observer
            observeParents
            onInit={() => setIsReady(true)}
            className="!py-4"
          >
            {projects.map(project => {
              const prop = mapProjectToCard(project);
              return (
                <SwiperSlide key={prop.id}>
                  <Link href={prop.href} prefetch className="block">
                    <Box
                      className="group cursor-pointer rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      sx={{
                        transform: 'translateZ(0)',
                      }}
                    >
                      <Box
                        className="overflow-hidden rounded-2xl"
                        sx={{
                          WebkitMaskImage:
                            '-webkit-radial-gradient(white, black)',
                          maskImage: 'radial-gradient(white, black)',
                        }}
                      >
                        {/* Image */}
                        <Box className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={prop.image}
                            alt={prop.title}
                            fill
                            className="overflow-hidden object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          {/* Gradient */}
                          <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Badge */}
                          <Box className="absolute left-3 top-3">
                            <Box className="rounded-md bg-primary-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                              For {prop.type}
                            </Box>
                          </Box>

                          {/* Favorite */}
                          <IconButton
                            size="small"
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(prop.id);
                            }}
                            className={`absolute right-3 top-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                              isFavorite(prop.id)
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-white/90 text-secondary-600 hover:bg-white hover:text-red-500'
                            }`}
                          >
                            {isFavorite(prop.id) ? (
                              <Favorite fontSize="small" />
                            ) : (
                              <FavoriteBorder fontSize="small" />
                            )}
                          </IconButton>

                          {/* Price */}
                          <Box className="absolute bottom-3 left-3">
                            <Typography
                              variant="h6"
                              className="font-bold text-white drop-shadow-md"
                            >
                              {prop.price}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Content */}
                        <Box className="p-4">
                          <Typography
                            variant="subtitle1"
                            className="mb-1 truncate font-semibold text-secondary-900 transition-colors group-hover:text-primary-600"
                          >
                            {prop.title}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="mb-3 text-secondary-500"
                          >
                            <LocationOn sx={{ fontSize: 16 }} />
                            <Typography variant="caption" className="truncate">
                              {prop.location}
                            </Typography>
                          </Stack>

                          {/* Features */}
                          <Stack
                            direction="row"
                            spacing={2}
                            divider={
                              <Box className="h-4 w-px bg-secondary-200" />
                            }
                            className="text-secondary-600"
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                            >
                              <Bed sx={{ fontSize: 16 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {prop.bedrooms}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                            >
                              <Bathtub sx={{ fontSize: 16 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {prop.bathrooms}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                            >
                              <SquareFoot sx={{ fontSize: 16 }} />
                              <Typography variant="caption" fontWeight={500}>
                                {prop.area}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        {/* CTA */}
        <Box className="group mt-8 flex justify-center">
          <Link href="/projects" prefetch>
            <Button
              variant="outlined"
              size="large"
              endIcon={
                <ArrowForwardRounded className="transition-transform duration-300 group-hover:translate-x-1" />
              }
              className="rounded-full border-2 border-secondary-900 px-8 py-3 font-semibold text-secondary-900 transition-all duration-300 hover:bg-secondary-900 hover:text-white"
              sx={{ textTransform: 'none' }}
            >
              View All Properties
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProperties;
