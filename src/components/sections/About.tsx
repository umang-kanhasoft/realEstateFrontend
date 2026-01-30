'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const highlights = [
  'Premium property portfolio',
  'Transparent dealings',
  'Expert market analysis',
  'End-to-end support',
  'Legal assistance',
  'Post-sale services',
];

const About = (): JSX.Element => {
  return (
    <Box component="section" className="bg-slate-50 py-20">
      <Container maxWidth="xl">
        <Grid container spacing={8} alignItems="center">
          {/* Image Section */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box className="relative">
                {/* Main Image */}
                <Box className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="About VitalSpace"
                    width={600}
                    height={500}
                    className="object-cover"
                  />
                  {/* Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box
                      className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-xl"
                      sx={{
                        '&:hover': {
                          backgroundColor: '#1e40af',
                          '& svg': { color: 'white' },
                        },
                      }}
                    >
                      <PlayArrowIcon
                        sx={{ fontSize: 40, color: '#1e40af', ml: 0.5 }}
                      />
                    </Box>
                  </motion.div>
                </Box>

                {/* Experience Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-8 -right-8 hidden md:block"
                >
                  <Box
                    className="rounded-2xl bg-white p-6 shadow-xl"
                    sx={{ minWidth: 200 }}
                  >
                    <Box className="flex items-center gap-4">
                      <Box
                        className="flex h-16 w-16 items-center justify-center rounded-xl"
                        sx={{
                          background:
                            'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                        }}
                      >
                        <Typography
                          variant="h4"
                          className="font-bold text-white"
                        >
                          15+
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          className="font-bold text-slate-900"
                        >
                          Years
                        </Typography>
                        <Typography variant="body2" className="text-slate-500">
                          of Excellence
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>

                {/* Decorative Element */}
                <Box
                  className="absolute -left-6 -top-6 -z-10 h-24 w-24 rounded-2xl"
                  sx={{
                    background:
                      'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Chip
                label="About Us"
                sx={{
                  backgroundColor: '#eff6ff',
                  color: '#1e40af',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  mb: 3,
                }}
              />

              <Typography
                variant="h2"
                className="mb-6 font-heading font-bold"
                sx={{
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  color: '#0f172a',
                  lineHeight: 1.2,
                }}
              >
                Your Trusted Partner in
                <Box component="span" sx={{ color: '#1e40af' }}>
                  {' '}
                  Real Estate
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                For over 15 years, VitalSpace has been helping families and
                investors find their perfect properties across India. We believe
                in building lasting relationships through transparency,
                expertise, and exceptional service.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  mb: 6,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                Our team of experienced professionals understands that every
                property decision is significant. That's why we provide
                personalized guidance at every step of your journey.
              </Typography>

              {/* Highlights Grid */}
              <Grid container spacing={2} className="mb-8">
                {highlights.map((highlight, index) => (
                  <Grid item xs={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box className="flex items-center gap-2">
                        <CheckCircleIcon
                          sx={{ color: '#10b981', fontSize: 20 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: '#475569', fontWeight: 500 }}
                        >
                          {highlight}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* CTA Buttons */}
              <Box className="flex flex-wrap gap-4">
                <Button
                  component={Link}
                  href="/about"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    background:
                      'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    boxShadow: '0 10px 30px rgba(30, 64, 175, 0.3)',
                    '&:hover': {
                      boxShadow: '0 15px 40px rgba(30, 64, 175, 0.4)',
                    },
                  }}
                >
                  Learn More
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderWidth: 2,
                    borderColor: '#1e40af',
                    color: '#1e40af',
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: '#eff6ff',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
