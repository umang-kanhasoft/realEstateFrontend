'use client';

import BuilderProjectCard from '@/components/builders/BuilderProjectCard';
import { BuilderProject } from '@/types/builder.types';
import {
  Apartment,
  ArrowBackRounded,
  ArrowForwardRounded,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BuilderProjectsProps {
  projects: BuilderProject[];
}

export default function BuilderProjects({ projects }: BuilderProjectsProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Apartment sx={{ fontSize: 64, color: '#e2e8f0', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#64748b' }}>
            No projects listed yet.
          </Typography>
        </Box>
      </Container>
    );
  }

  const showCarousel = projects.length > 4;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Header with Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ mb: 4 }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: '#0f172a',
              mb: 1,
              letterSpacing: '-0.5px',
            }}
          >
            Featured Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748b', fontSize: '1rem' }}
          >
            Our portfolio of excellence in real estate development
          </Typography>
        </Box>

        {showCarousel && (
          <Stack direction="row" spacing={1.5}>
            <IconButton
              className="bp-prev"
              sx={{
                border: '1px solid #e2e8f0',
                bgcolor: 'white',
                color: '#334155',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#0f172a',
                  bgcolor: '#0f172a',
                  color: 'white',
                },
                '&.swiper-button-disabled': {
                  opacity: 0.5,
                  pointerEvents: 'none',
                },
              }}
            >
              <ArrowBackRounded fontSize="small" />
            </IconButton>
            <IconButton
              className="bp-next"
              sx={{
                border: '1px solid #e2e8f0',
                bgcolor: 'white',
                color: '#334155',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#0f172a',
                  bgcolor: '#0f172a',
                  color: 'white',
                },
                '&.swiper-button-disabled': {
                  opacity: 0.5,
                  pointerEvents: 'none',
                },
              }}
            >
              <ArrowForwardRounded fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>

      {/* Content */}
      <Box
        sx={{
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          minHeight: 400,
        }}
      >
        {showCarousel ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.bp-next',
              prevEl: '.bp-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="!pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id || index} style={{ height: 'auto' }}>
                <BuilderProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={project.id || index}>
                <BuilderProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
