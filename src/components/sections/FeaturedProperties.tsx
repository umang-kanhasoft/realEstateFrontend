'use client';

import { formatPrice } from '@/utils/helpers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

// Sample featured properties with real images
const featuredProperties = [
  {
    id: '1',
    title: 'Luxury Sea View Apartment',
    location: 'Worli, Mumbai',
    price: 85000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Modern Villa with Pool',
    location: 'Whitefield, Bangalore',
    price: 125000000,
    bedrooms: 5,
    bathrooms: 6,
    area: 5500,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Premium Penthouse',
    location: 'Gurgaon, Delhi NCR',
    price: 95000000,
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Elegant Family Home',
    location: 'Koregaon Park, Pune',
    price: 45000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Contemporary Apartment',
    location: 'Banjara Hills, Hyderabad',
    price: 65000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'rent',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Spacious Garden Villa',
    location: 'Jubilee Hills, Hyderabad',
    price: 180000000,
    bedrooms: 6,
    bathrooms: 7,
    area: 8000,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: false,
    isFeatured: true,
  },
];

const FeaturedProperties = (): JSX.Element => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  return (
    <Box
      component="section"
      className="bg-gradient-to-b from-white to-slate-50 py-20"
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#1e40af',
                fontWeight: 600,
                letterSpacing: 2,
                fontSize: '0.875rem',
              }}
            >
              Featured Properties
            </Typography>
            <Typography
              variant="h2"
              className="mt-2 font-heading font-bold"
              sx={{
                fontSize: { xs: '2rem', md: '2.75rem' },
                color: '#0f172a',
              }}
            >
              Handpicked Premium Listings
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#64748b', mt: 2, maxWidth: 500 }}
            >
              Explore our curated selection of the finest properties across
              India's prime locations.
            </Typography>
          </motion.div>

          <Box className="mt-6 flex items-center gap-3 md:mt-0">
            <IconButton
              onClick={() => swiperRef?.slidePrev()}
              sx={{
                border: '2px solid #e2e8f0',
                color: '#64748b',
                '&:hover': {
                  borderColor: '#1e40af',
                  color: '#1e40af',
                  backgroundColor: '#eff6ff',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={() => swiperRef?.slideNext()}
              sx={{
                border: '2px solid #e2e8f0',
                color: '#64748b',
                '&:hover': {
                  borderColor: '#1e40af',
                  color: '#1e40af',
                  backgroundColor: '#eff6ff',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
            <Button
              component={Link}
              href="/properties"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                ml: 2,
                px: 3,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              }}
            >
              View All
            </Button>
          </Box>
        </Box>

        {/* Properties Slider */}
        <Swiper
          onSwiper={setSwiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
        >
          {featuredProperties.map((property, index) => (
            <SwiperSlide key={property.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/properties/${property.id}`}>
                  <Box
                    className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                    sx={{
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    {/* Image */}
                    <Box className="relative h-64 overflow-hidden">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay */}
                      <Box className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Badges */}
                      <Box className="absolute left-4 top-4 flex gap-2">
                        <Chip
                          label={
                            property.type === 'sale' ? 'For Sale' : 'For Rent'
                          }
                          size="small"
                          sx={{
                            backgroundColor:
                              property.type === 'sale' ? '#10b981' : '#3b82f6',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                        {property.isNew && (
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              backgroundColor: '#f59e0b',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        )}
                      </Box>

                      {/* Favorite Button */}
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: 'white',
                          boxShadow: 2,
                          '&:hover': {
                            backgroundColor: 'white',
                            color: '#ef4444',
                          },
                        }}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <FavoriteBorderIcon fontSize="small" />
                      </IconButton>

                      {/* Price */}
                      <Box className="absolute bottom-4 left-4">
                        <Typography
                          variant="h5"
                          className="font-bold text-white"
                          sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                        >
                          {formatPrice(property.price)}
                          {property.type === 'rent' && (
                            <Typography
                              component="span"
                              variant="body2"
                              className="font-normal"
                            >
                              /month
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box className="p-5">
                      <Typography
                        variant="h6"
                        className="mb-1 line-clamp-1 font-semibold text-slate-900 transition-colors group-hover:text-blue-700"
                      >
                        {property.title}
                      </Typography>
                      <Box className="mb-4 flex items-center text-slate-500">
                        <LocationOnIcon fontSize="small" className="mr-1" />
                        <Typography variant="body2">
                          {property.location}
                        </Typography>
                      </Box>

                      {/* Features */}
                      <Box className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <Box className="flex items-center text-slate-600">
                          <BedIcon
                            fontSize="small"
                            className="mr-1 text-blue-600"
                          />
                          <Typography variant="body2">
                            {property.bedrooms}
                          </Typography>
                        </Box>
                        <Box className="flex items-center text-slate-600">
                          <BathtubIcon
                            fontSize="small"
                            className="mr-1 text-blue-600"
                          />
                          <Typography variant="body2">
                            {property.bathrooms}
                          </Typography>
                        </Box>
                        <Box className="flex items-center text-slate-600">
                          <SquareFootIcon
                            fontSize="small"
                            className="mr-1 text-blue-600"
                          />
                          <Typography variant="body2">
                            {property.area} sqft
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default FeaturedProperties;
