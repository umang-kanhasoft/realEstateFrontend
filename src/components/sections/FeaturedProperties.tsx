'use client';

import {
  ArrowBackRounded,
  ArrowForwardRounded,
  Bathtub,
  Bed,
  FavoriteBorder,
  LocationOn,
  SquareFoot,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Sample featured properties with real images
const featuredProperties = [
  {
    id: '1',
    title: 'Azure Heights',
    location: 'Worli, Mumbai',
    price: '₹8.5 Cr',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,200 sq.ft',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Sale',
  },
  {
    id: '2',
    title: 'The White Villa',
    location: 'Whitefield, Bangalore',
    price: '₹12.5 Cr',
    bedrooms: 5,
    bathrooms: 6,
    area: '5,500 sq.ft',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Sale',
  },
  {
    id: '3',
    title: 'Skyline Penthouse',
    location: 'Golf Course Road, Gurgaon',
    price: '₹9.5 Cr',
    bedrooms: 4,
    bathrooms: 5,
    area: '4,200 sq.ft',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Sale',
  },
  {
    id: '4',
    title: 'Serene Gardens',
    location: 'Koregaon Park, Pune',
    price: '₹4.5 Cr',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,800 sq.ft',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Sale',
  },
  {
    id: '5',
    title: 'Grand Estate',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹18.0 Cr',
    bedrooms: 6,
    bathrooms: 7,
    area: '8,000 sq.ft',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Sale',
  },
];

const FeaturedProperties = (): JSX.Element => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <Box className="bg-secondary-50 py-16">
      <Container maxWidth="xl">
        {/* Section Header */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-end' }}
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
            {featuredProperties.map(prop => (
              <SwiperSlide key={prop.id}>
                <Box
                  className="group cursor-pointer rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  sx={{
                    transform: 'translateZ(0)',
                  }}
                >
                  <Box
                    className="overflow-hidden rounded-2xl"
                    sx={{
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
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
                        className="absolute right-3 top-3 bg-white/90 text-secondary-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500"
                      >
                        <FavoriteBorder fontSize="small" />
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
                        divider={<Box className="h-4 w-px bg-secondary-200" />}
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
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* CTA */}
        <Box className="group mt-8 flex justify-center">
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
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProperties;
