'use client';

import {
  Builder,
  BuilderAward,
  BuilderProject,
  BuilderService,
} from '@/services/builder.service';
import {
  Apartment,
  ArrowOutward,
  Business,
  CalendarToday,
  CheckCircle,
  Construction,
  Email,
  EmojiEvents,
  Language,
  LocationOn,
  Phone,
  Star,
  TrendingUp,
  Verified,
  Villa,
} from '@mui/icons-material';
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardProps,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface BuilderPageProps {
  params: { id: string };
}

// Glass Card Component
const GlassCard = ({ children, sx = {}, ...props }: CardProps) => (
  <Card
    sx={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      borderRadius: 3,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-4px)',
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Card>
);

export default function BuilderPage({ params }: BuilderPageProps) {
  const [builder, setBuilder] = useState<Builder | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchBuilderData = async () => {
      try {
        const builder = await BuilderService.getBuilderById(params.id);
        setBuilder(builder);
      } catch (error) {
        console.error('Error fetching builder data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilderData();
  }, [params.id]);

  const statusColorMap: Record<string, string> = {
    ready_to_move: 'bg-green-500',
    new_launch: 'bg-yellow-500',
    under_construction: 'bg-blue-500',
    default: 'bg-gray-500',
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready_to_move':
        return 'Ready to Move';
      case 'new_launch':
        return 'New Launch';
      case 'under_construction':
        return 'Under Construction';
      default:
        return status;
    }
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'villa':
        return <Villa fontSize="small" />;
      case 'apartment':
        return <Apartment fontSize="small" />;
      case 'plot':
        return <LocationOn fontSize="small" />;
      case 'commercial':
        return <Business fontSize="small" />;
      default:
        return <Apartment fontSize="small" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box textAlign="center">
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: 'white', mb: 3 }}
            />
            <Typography variant="h6" color="white">
              Loading Builder Details...
            </Typography>
          </Box>
        </motion.div>
      </Box>
    );
  }

  if (!builder) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Builder not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.light, 0.1)} 0%, 
            ${alpha(theme.palette.secondary.light, 0.1)} 50%, 
            ${alpha(theme.palette.success.light, 0.1)} 100%)`,
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Shapes */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(
                [
                  theme.palette.primary.main,
                  theme.palette.secondary.main,
                  theme.palette.success.main,
                ][i % 3],
                0.1
              )} 0%, transparent 70%)`,
              filter: 'blur(40px)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${20 + Math.random() * 20}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </Box>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-40px) rotate(180deg) scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hover-3d {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-3d:hover {
          transform: translateY(-12px) perspective(1000px) rotateX(2deg)
            rotateY(-2deg);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.primary.main} 40%, 
            ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Stack spacing={4}>
                  {/* Company Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Verified
                          sx={{
                            backgroundColor: 'white',
                            color: theme.palette.success.main,
                            borderRadius: '50%',
                            p: 0.5,
                            fontSize: '1.2rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          }}
                        />
                      }
                    >
                      <Avatar
                        src={builder.logoUrl}
                        alt={builder.name}
                        sx={{
                          width: 120,
                          height: 120,
                          border: '4px solid white',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }}
                      >
                        {builder.name.charAt(0)}
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography
                        variant="h1"
                        component="h1"
                        fontWeight="bold"
                        sx={{
                          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                          background:
                            'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: { xs: '2.5rem', md: '3.5rem' },
                          mb: 1,
                        }}
                      >
                        {builder.name}
                      </Typography>
                      <Typography
                        variant="h5"
                        className="mx-auto max-w-[800px] text-base font-normal leading-relaxed text-white/90 drop-shadow-lg md:text-xl"
                      >
                        {builder.description}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                {/* Quick Stats Bar */}
                <Stack direction="row" spacing={3} flexWrap="wrap" gap={2}>
                  <Chip
                    icon={<Business sx={{ fontSize: 18 }} />}
                    label={`Est. ${builder.establishedYear}`}
                    className="rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                    sx={{
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />
                  <Chip
                    icon={<Star sx={{ fontSize: 18 }} />}
                    label={`${builder.avgRating || 'N/A'} ★ Rating`}
                    className="rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                    sx={{
                      '& .MuiChip-icon': {
                        color: '#FFD700',
                      },
                    }}
                  />
                  <Chip
                    icon={<CheckCircle sx={{ fontSize: 18 }} />}
                    label={`${builder.successRate * 100}% Success Rate`}
                    className="rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                    sx={{
                      '& .MuiChip-icon': {
                        color: '#4CAF50',
                      },
                    }}
                  />
                  <Chip
                    icon={<Construction sx={{ fontSize: 18 }} />}
                    label={`${builder.totalProjects} Projects`}
                    className="rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                    sx={{
                      '& .MuiChip-icon': {
                        color: '#2196F3',
                      },
                    }}
                  />
                  <Chip
                    icon={<TrendingUp sx={{ fontSize: 18 }} />}
                    label={`${new Date().getFullYear() - builder.establishedYear} Years Experience`}
                    className="rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                    sx={{
                      '& .MuiChip-icon': {
                        color: '#9C27B0',
                      },
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      gutterBottom
                      color="primary"
                      sx={{ mb: 3 }}
                    >
                      Connect With Us
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        className="rounded-full bg-secondary-900 px-5 py-2 text-xs font-bold normal-case text-white shadow-md hover:bg-black"
                        endIcon={<Phone fontSize="small" />}
                        sx={{ textTransform: 'none' }}
                      >
                        Call: {builder.phone}
                      </Button>
                      <Button
                        startIcon={<Email fontSize="small" />}
                        href={`mailto:${builder.contactEmail}`}
                        variant="outlined"
                        size="small"
                        className="rounded-full px-4 py-1.5 text-xs font-bold normal-case"
                        sx={{
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.05
                            ),
                          },
                        }}
                      >
                        Email Us
                      </Button>
                      <Button
                        href={builder.websiteUrl}
                        variant="outlined"
                        className="rounded-full border-secondary-900 px-4 py-1.5 text-xs font-bold normal-case text-secondary-900 hover:bg-secondary-900 hover:text-white"
                        startIcon={<Language fontSize="small" />}
                        endIcon={<ArrowOutward />}
                        sx={{ textTransform: 'none' }}
                      >
                        Visit Website
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content - All Sections in Continuous Layout */}
      <Container maxWidth="xl" sx={{ py: 8, position: 'relative' }}>
        <Stack spacing={8}>
          {/* Projects Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                gutterBottom
                variant="h3"
                className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl"
              >
                Featured Projects
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Our portfolio of excellence in real estate development
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {builder?.projects?.map(
                (project: BuilderProject, _index: number) => (
                  <Grid item xs={12} sm={6} md={3} key={project.id}>
                    <Box
                      className="group rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                          position: 'relative',
                        }}
                      >
                        {/* Image */}
                        <Box className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={
                              project.mainImageUrl || '/api/placeholder/400/280'
                            }
                            alt={project.name}
                            fill
                            className="overflow-hidden object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          {/* Gradient */}
                          <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Badge */}
                          <Box className="absolute right-3 top-3">
                            <Box
                              className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow ${statusColorMap[project.status] ?? statusColorMap.default} `}
                            >
                              {getStatusLabel(project.status)}
                            </Box>
                          </Box>

                          {/* Property Type */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 16,
                              left: 16,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              color: 'white',
                            }}
                          >
                            {getPropertyTypeIcon(project.propertyType)}
                            <Typography
                              variant="subtitle1"
                              className="mb-1 truncate font-semibold text-secondary-900 transition-colors"
                            >
                              {project.propertyType.replace('_', ' ')}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Content */}
                        <Box className="p-4">
                          <Typography
                            variant="subtitle1"
                            className="mb-1 truncate font-semibold text-secondary-900 transition-colors group-hover:text-primary-600"
                          >
                            {project.name}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="mb-3 text-secondary-500"
                          >
                            <LocationOn sx={{ fontSize: 16 }} />
                            <Typography variant="caption" className="truncate">
                              {project.area}, {project.city}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="mb-3 text-secondary-500"
                          >
                            <CalendarToday sx={{ fontSize: 16 }} />
                            <Typography variant="caption" className="truncate">
                              Possession: {formatDate(project.possessionDate)}
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                )
              )}
            </Grid>
          </motion.div>

          {/* Section 3: Awards & Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                gutterBottom
                variant="h3"
                className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl"
              >
                Awards & Recognition
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Celebrating excellence and industry recognition
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {builder?.awards?.map((award: BuilderAward, _index: number) => (
                <Grid item xs={12} md={6} key={award.id}>
                  <GlassCard>
                    <Box sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        spacing={3}
                        alignItems="flex-start"
                      >
                        <Box>
                          <Box
                            sx={{
                              p: 1,
                              background:
                                'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 20px rgba(255, 165, 0, 0.3)',
                            }}
                          >
                            <EmojiEvents sx={{ color: 'white' }} />
                          </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h5"
                            className="text-base font-semibold leading-relaxed md:text-xl"
                          >
                            {award.title}
                          </Typography>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Business sx={{ fontSize: 16 }} />
                              <Typography
                                variant="caption"
                                className="truncate"
                              >
                                {award.awardOrg}
                              </Typography>
                              <Box>
                                <Box className="rounded-md bg-primary-500 px-2.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                                  {award.awardYear}
                                </Box>
                              </Box>
                            </Box>
                            <Typography
                              variant="caption"
                              className="mt-0 truncate"
                            >
                              {award.description}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Section 4: Company Profile & Values */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  {/* Mission & Vision */}
                  <GlassCard>
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 40,
                            backgroundColor: '#111827',
                            borderRadius: 3,
                            mr: 3,
                          }}
                        />
                        <Typography
                          variant="h3"
                          className="mb-0 font-extrabold text-gray-900"
                        >
                          Our Mission & Vision
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        className="mb-8 pl-3 font-normal text-gray-500"
                      >
                        {builder.mission}
                      </Typography>
                    </CardContent>
                  </GlassCard>
                </Stack>
              </Grid>
            </Grid>
          </motion.div>

          {/* Section 5:  Performance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                gutterBottom
                variant="h3"
                className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl"
              >
                Performance Overview
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Stack spacing={4}>
                  {/* Performance Overview */}
                  <GlassCard>
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={4}>
                        {/* Project Success Rate */}
                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body1" fontWeight="medium">
                              Project Success Rate
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="success.main"
                            >
                              {builder.successRate * 100}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={builder.successRate * 100}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: alpha(
                                theme.palette.success.main,
                                0.1
                              ),
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                                borderRadius: 5,
                              },
                            }}
                          />
                        </Box>

                        {/* Customer Satisfaction */}
                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="h6" fontWeight="medium">
                              Customer Satisfaction
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="warning.main"
                            >
                              {builder.avgRating || 'N/A'} / 5.0
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <Rating
                              value={builder.avgRating || 0}
                              readOnly
                              precision={0.5}
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: theme.palette.warning.main,
                                },
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({builder.totalProjects} reviews)
                            </Typography>
                          </Box>
                        </Box>

                        <Divider />

                        {/* Property Types */}
                        <Box>
                          <Typography variant="h6" fontWeight="medium">
                            Property Specialization
                          </Typography>
                          <Box className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15">
                            {[
                              'Apartments',
                              'Villas',
                              'Plots',
                              'Commercial',
                            ].map((type, index) => (
                              <Chip
                                size="small"
                                key={index}
                                icon={getPropertyTypeIcon(type.toLowerCase())}
                                label={type}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </GlassCard>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Years of Experience */}
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Years of Excellence
                  </Typography>
                  <Typography
                    variant="h1"
                    fontWeight="bold"
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1,
                    }}
                  >
                    {new Date().getFullYear() - builder.establishedYear}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Since {builder.establishedYear}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 4,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography
                variant="h3"
                className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl"
                gutterBottom
              >
                Ready to Build Your Dream?
              </Typography>
              <Typography
                variant="h6"
                className="mx-auto mb-4 max-w-[800px] font-normal text-gray-500"
              >
                Partner with {builder.name} for exceptional quality, timely
                delivery, and unparalleled expertise in real estate development.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  className="rounded-full bg-secondary-900 px-5 py-2 text-xs font-bold normal-case text-white shadow-md hover:bg-black"
                  startIcon={<Phone fontSize="small" />}
                  sx={{ textTransform: 'none' }}
                  href={`tel:${builder.phone}`}
                >
                  Schedule a Call
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  href={`mailto:${builder.contactEmail}`}
                  className="rounded-full border-secondary-900 px-4 py-1.5 text-xs font-bold normal-case text-secondary-900 hover:bg-secondary-900 hover:text-white"
                >
                  Request Consultation
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
