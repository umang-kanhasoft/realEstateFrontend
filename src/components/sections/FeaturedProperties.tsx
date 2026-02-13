'use client';

import PropertyCard from '@/components/property/PropertyCard';
import { ProjectsService } from '@/services/projects.service';
import { ApiProjectObject } from '@/types/api-project.types';
import { Property, PropertyStatus } from '@/types/property.types';
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const FeaturedProperties = (): JSX.Element => {
  const [isReady, setIsReady] = useState(false);

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

  const mapStatus = (status: string): PropertyStatus => {
    switch (status) {
      case 'new_launch':
        return 'New Launch';
      case 'under_construction':
      case 'nearing_completion':
        return 'Under Construction';
      case 'ready_to_move':
        return 'Ready to Move';
      case 'sold_out':
        return 'sold';
      default:
        return 'for-sale';
    }
  };

  const mapProjectToProperty = (project: ApiProjectObject): Property => {
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

    return {
      id: project.id,
      title: project.name,
      slug: project.slug,
      location: [project.locality, project.city].filter(Boolean).join(', '),
      price: project.priceStartingFrom || 0,
      bedrooms: minBeds === maxBeds ? minBeds : `${minBeds}-${maxBeds}`,
      bathrooms: minBaths === maxBaths ? minBaths : `${minBaths}-${maxBaths}`,
      area:
        minArea === maxArea
          ? `${minArea} sq.ft`
          : `${minArea}-${maxArea} sq.ft`,
      images: [
        project.mainImageUrl ||
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      status: mapStatus(project.status),
      listingType: 'sale',
      isFeatured: project.isFeatured,
      ecoFriendly: project.ecoFriendly,
      builders: project.builders || [],
      address: {
        city: project.city,
        state: project.state || '',
        street: project.addressLine1,
        zipCode: '',
        country: 'India',
        fullAddress: [project.addressLine1, project.locality, project.city]
          .filter(Boolean)
          .join(', '),
        coordinates: { lat: 0, lng: 0 },
      },
      amenities: project.amenities || [],
      type: project.propertyType,
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
              const property = mapProjectToProperty(project);
              return (
                <SwiperSlide key={property.id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

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
