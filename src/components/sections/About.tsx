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
                    alt="About Real Estate"
                    width={600}
                    height={500}
                    className="object-cover"
                  />
                  {/* Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-xl transition-all duration-300 hover:bg-primary-700 hover:text-white">
                      <PlayArrowIcon
                        className="ml-1 text-4xl text-primary-700"
                        sx={{ color: 'inherit' }}
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
                  <Box className="min-w-[200px] rounded-2xl bg-white p-6 shadow-xl">
                    <Box className="flex items-center gap-4">
                      <Box className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-500">
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
                <Box className="absolute -left-6 -top-6 -z-10 h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-500" />
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
                className="mb-6 bg-primary-50 text-sm font-semibold text-primary-700"
              />

              <Typography
                variant="h2"
                className="mb-6 font-heading text-4xl font-bold leading-[1.2] text-slate-900 md:text-[2.75rem]"
              >
                Your Trusted Partner in
                <span className="text-primary-700"> Real Estate</span>
              </Typography>

              <Typography
                variant="body1"
                className="mb-6 text-lg leading-relaxed text-slate-500"
              >
                For over 15 years, Real Estate has been helping families and
                investors find their perfect properties across India. We believe
                in building lasting relationships through transparency,
                expertise, and exceptional service.
              </Typography>

              <Typography
                variant="body1"
                className="mb-12 text-lg leading-relaxed text-slate-500"
              >
                Our team of experienced professionals understands that every
                property decision is significant. That&apos;s why we provide
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
                        <CheckCircleIcon className="text-xl text-emerald-500" />
                        <Typography
                          variant="body2"
                          className="font-medium text-slate-600"
                        >
                          {highlight}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              <Box className="flex flex-wrap gap-4">
                <Button
                  component={Link}
                  href="/about"
                  variant="contained"
                  size="large"
                  endIcon={
                    <ArrowForwardIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  }
                  className="group rounded-full bg-secondary-900 px-8 py-3 text-base font-bold text-white shadow-lg shadow-secondary-900/20 transition-all duration-300 hover:-translate-y-px hover:bg-black hover:shadow-secondary-900/30"
                  sx={{ textTransform: 'none' }}
                >
                  Learn More
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  className="group rounded-full border-2 border-secondary-900 px-8 py-3 text-base font-bold text-secondary-900 transition-all duration-300 hover:-translate-y-px hover:bg-secondary-900 hover:text-white"
                  sx={{ textTransform: 'none' }}
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
