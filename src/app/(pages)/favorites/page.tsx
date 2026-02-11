'use client';

import PropertyCard from '@/components/property/PropertyCard';
import { useFavorites } from '@/context/FavoritesContext';
import { mapApiProjectToProperty } from '@/context/PropertyContext';
import { ProjectsService } from '@/services/projects.service';
import {
  Delete,
  Favorite,
  FavoriteBorder,
  HeartBroken,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  const { data, isLoading } = useQuery({
    queryKey: ['all-projects-for-favorites'],
    queryFn: () =>
      ProjectsService.getProjects({
        limit: 100,
      }),
  });

  const allProjects = data?.projects || [];
  const favoriteProjects = allProjects.filter(project =>
    favorites.includes(project.id)
  );

  if (isLoading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
        <Container maxWidth="xl">
          <Skeleton variant="text" width={300} height={50} className="mb-4" />
          <Skeleton variant="text" width={200} height={30} className="mb-8" />
          <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={380}
                className="rounded-2xl"
              />
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  // Empty state
  if (favorites.length === 0) {
    return (
      <Box className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Box className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
              <Box className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 opacity-50" />
              <HeartBroken
                sx={{ fontSize: 64 }}
                className="relative z-10 text-rose-400"
              />
            </Box>
            <Typography
              variant="h4"
              className="mb-3 font-bold text-secondary-900"
            >
              No Favorites Yet
            </Typography>
            <Typography variant="body1" className="mb-8 text-secondary-600">
              Start exploring properties and save your favorites by clicking the
              heart icon. They&apos;ll appear here for easy access!
            </Typography>
            <Link href="/projects" passHref>
              <Button
                variant="contained"
                size="large"
                className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/40"
                sx={{ textTransform: 'none' }}
                startIcon={<FavoriteBorder />}
              >
                Explore Properties
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 py-10">
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={3}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                className="mb-2"
              >
                <Box className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30">
                  <Favorite className="text-white" />
                </Box>
                <Typography
                  variant="h3"
                  className="text-3xl font-extrabold text-secondary-900 md:text-4xl"
                >
                  My Favorites
                </Typography>
              </Stack>
              <Typography variant="body1" className="text-secondary-600">
                {favorites.length}{' '}
                {favorites.length === 1 ? 'property' : 'properties'} saved
              </Typography>
            </Box>
            {favorites.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={clearFavorites}
                className="rounded-full border-2 px-6 py-2 font-medium transition-all duration-300 hover:bg-red-50"
                sx={{ textTransform: 'none' }}
              >
                Clear All
              </Button>
            )}
          </Stack>
        </motion.div>

        {/* Property Grid */}
        <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {favoriteProjects.map((project, index) => {
              const prop = mapApiProjectToProperty(project);
              return (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PropertyCard property={prop} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
}
