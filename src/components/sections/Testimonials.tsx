'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Business Owner',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content:
      'VitalSpace helped us find our dream home in Mumbai. Their professional approach and deep market knowledge made the entire process smooth and stress-free. Highly recommended!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'IT Professional',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content:
      'The team at VitalSpace went above and beyond to help us secure our first property. Their attention to detail and customer service is exceptional. Thank you for making our dreams come true!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Real Estate Investor',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content:
      'As a property investor, I have worked with many agencies, but VitalSpace stands out for their market expertise and transparency. They have helped me build a profitable portfolio.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sunita Reddy',
    role: 'Doctor',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    content:
      'Found the perfect villa through VitalSpace. The team was incredibly patient, showing us multiple options until we found exactly what we were looking for. Five-star service!',
    rating: 5,
  },
];

const Testimonials = (): JSX.Element => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  return (
    <Box
      component="section"
      className="relative overflow-hidden py-20"
      sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      {/* Background Pattern */}
      <Box
        className="absolute inset-0 opacity-5"
        sx={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="lg" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <Typography
            variant="overline"
            sx={{
              color: '#60a5fa',
              fontWeight: 600,
              letterSpacing: 2,
              fontSize: '0.875rem',
            }}
          >
            Testimonials
          </Typography>
          <Typography
            variant="h2"
            className="mt-2 font-heading font-bold text-white"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
          >
            What Our Clients Say
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#94a3b8', mt: 2, maxWidth: 600, mx: 'auto' }}
          >
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience with VitalSpace.
          </Typography>
        </motion.div>

        {/* Testimonials Slider */}
        <Box className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/50',
              bulletActiveClass: '!bg-blue-500 !opacity-100',
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="!pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
                    sx={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  >
                    {/* Quote Icon */}
                    <Box className="mb-6">
                      <FormatQuoteIcon
                        sx={{ fontSize: 48, color: '#3b82f6' }}
                      />
                    </Box>

                    {/* Content */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#e2e8f0',
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                        mb: 4,
                      }}
                    >
                      "{testimonial.content}"
                    </Typography>

                    {/* Rating */}
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{
                        mb: 4,
                        '& .MuiRating-iconFilled': { color: '#fbbf24' },
                      }}
                    />

                    {/* Author */}
                    <Box className="flex items-center gap-4">
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: 56,
                          height: 56,
                          border: '2px solid #3b82f6',
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          className="font-semibold text-white"
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <Box className="mt-8 flex justify-center gap-4">
            <IconButton
              onClick={() => swiperRef?.slidePrev()}
              sx={{
                border: '2px solid rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  borderColor: '#3b82f6',
                  backgroundColor: '#3b82f6',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={() => swiperRef?.slideNext()}
              sx={{
                border: '2px solid rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': {
                  borderColor: '#3b82f6',
                  backgroundColor: '#3b82f6',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
