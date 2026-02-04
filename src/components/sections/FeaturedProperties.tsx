'use client';

import {
  ArrowBackRounded,
  ArrowForwardRounded,
  ArrowOutward,
  Bathtub,
  Bed,
  FavoriteBorder,
  SquareFoot,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
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
    location: 'Whitefield',
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
    location: 'Gurgaon',
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
    location: 'Pune',
    price: '₹4.5 Cr',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,800 sq.ft',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Sale',
  },
  {
    id: '6',
    title: 'Grand Estate',
    location: 'Hyderabad',
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
  return (
    <Container maxWidth="xl" className="my-20 md:my-32">
      <Stack className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <Box>
          <Typography
            variant="overline"
            className="font-extrabold tracking-[1.5px] text-primary-600"
          >
            PREMIUM SELECTION
          </Typography>
          <Typography
            variant="h3"
            className="mt-2 text-4xl font-extrabold md:text-5xl"
          >
            Featured Properties<span className="text-primary-600">.</span>
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          className="w-full justify-end md:w-auto md:justify-start"
        >
          <IconButton className="swiper-button-prev-custom group h-12 w-12 bg-black text-white transition-all duration-300 hover:-translate-x-1 hover:bg-primary-600 hover:text-white">
            <ArrowBackRounded />
          </IconButton>
          <IconButton className="swiper-button-next-custom group h-12 w-12 bg-black text-white transition-all duration-300 hover:translate-x-1 hover:bg-primary-600 hover:text-white">
            <ArrowForwardRounded />
          </IconButton>
        </Stack>
      </Stack>

      <Box className="relative -mx-2">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={'auto'}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          style={{ padding: '20px' }}
        >
          {featuredProperties.map(prop => (
            <SwiperSlide
              key={prop.id}
              className="!mr-8 !w-full overflow-hidden rounded-3xl last:!mr-0 sm:!w-[calc(50%-16px)] lg:!w-[calc(33.333%-21.333px)]"
            >
              <Card className="duration-400 group relative h-[500px] cursor-pointer overflow-hidden border-none bg-secondary-50 shadow-none transition-all hover:-translate-y-2 hover:shadow-2xl">
                <Box className="absolute inset-0 overflow-hidden">
                  <CardMedia
                    component="img"
                    className="prop-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    image={prop.image}
                  />
                  <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </Box>

                {/* Top Content */}
                <Box className="absolute left-6 right-6 top-6 flex justify-between">
                  <Box className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                    {prop.type}
                  </Box>
                  <IconButton
                    size="small"
                    className="h-fit bg-white text-black hover:bg-white hover:text-red-500"
                  >
                    <FavoriteBorder fontSize="small" />
                  </IconButton>
                </Box>

                {/* Bottom Content (Glass Panel) */}
                <Box className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/95 p-6 backdrop-blur-md">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={800} noWrap>
                        {prop.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="font-medium text-gray-500"
                      >
                        {prop.location}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      className="text-primary-600"
                    >
                      {prop.price}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2} className="text-gray-500">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Bed fontSize="small" />
                      <Typography variant="caption" fontWeight={600}>
                        {prop.bedrooms}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Bathtub fontSize="small" />
                      <Typography variant="caption" fontWeight={600}>
                        {prop.bathrooms}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <SquareFoot fontSize="small" />
                      <Typography variant="caption" fontWeight={600}>
                        {prop.area}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Promo Banner */}
      <Box
        className="relative mt-20 flex flex-col items-center justify-center overflow-hidden rounded-[40px] bg-cover bg-center py-20 text-center md:mt-32 md:py-32"
        sx={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        }}
      >
        <Box className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" />

        <Stack spacing={4} className="relative z-10 items-center">
          <Typography
            variant="h2"
            className="max-w-[800px] font-extrabold text-white"
          >
            Find Your Dream Home Today
            <span className="text-sky-400">.</span>
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={
              <ArrowOutward className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            }
            className="group rounded-full bg-white px-12 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-xl"
            sx={{ textTransform: 'none' }}
          >
            Browse Listings
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default FeaturedProperties;
