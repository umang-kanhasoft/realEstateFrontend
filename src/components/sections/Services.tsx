'use client';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import GavelIcon from '@mui/icons-material/Gavel';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Buy Property',
    description:
      'Find your dream home from our extensive collection of premium properties across India.',
    icon: <HomeWorkIcon sx={{ fontSize: 40 }} />,
    color: '#3b82f6',
    bgColor: '#eff6ff',
  },
  {
    id: 2,
    title: 'Sell Property',
    description:
      'Get the best value for your property with our expert market analysis and wide network.',
    icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
    color: '#10b981',
    bgColor: '#ecfdf5',
  },
  {
    id: 3,
    title: 'Rent Property',
    description:
      'Discover quality rental homes or find reliable tenants for your property.',
    icon: <VpnKeyIcon sx={{ fontSize: 40 }} />,
    color: '#f59e0b',
    bgColor: '#fffbeb',
  },
  {
    id: 4,
    title: 'Property Management',
    description:
      'Comprehensive property management services for hassle-free ownership experience.',
    icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
  },
  {
    id: 5,
    title: 'Interior Design',
    description:
      'Transform your space with our expert interior design and renovation services.',
    icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
    color: '#ec4899',
    bgColor: '#fdf2f8',
  },
  {
    id: 6,
    title: 'Legal Assistance',
    description:
      'Complete legal support for property documentation, verification, and registration.',
    icon: <GavelIcon sx={{ fontSize: 40 }} />,
    color: '#06b6d4',
    bgColor: '#ecfeff',
  },
];

const Services = (): JSX.Element => {
  return (
    <Box component="section" className="bg-white py-20">
      <Container maxWidth="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
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
            Our Services
          </Typography>
          <Typography
            variant="h2"
            className="mt-2 font-heading font-bold"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: '#0f172a',
            }}
          >
            Complete Real Estate Solutions
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748b', mt: 2, maxWidth: 600, mx: 'auto' }}
          >
            From buying and selling to property management and legal assistance,
            we offer comprehensive services for all your real estate needs.
          </Typography>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} lg={4} key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  className="group h-full cursor-pointer rounded-2xl p-8 transition-all duration-300"
                  sx={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      transform: 'translateY(-8px)',
                      borderColor: 'transparent',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    sx={{
                      backgroundColor: service.bgColor,
                      color: service.color,
                    }}
                  >
                    {service.icon}
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    className="mb-3 font-semibold transition-colors group-hover:text-blue-700"
                    sx={{ color: '#0f172a' }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#64748b', lineHeight: 1.7, mb: 4 }}
                  >
                    {service.description}
                  </Typography>

                  {/* Link */}
                  <Box
                    className="flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3"
                    sx={{ color: service.color }}
                  >
                    Learn More
                    <ArrowForwardIcon fontSize="small" />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            component={Link}
            href="/services"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              borderWidth: 2,
              borderColor: '#1e40af',
              color: '#1e40af',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                borderWidth: 2,
                backgroundColor: '#1e40af',
                color: 'white',
              },
            }}
          >
            Explore All Services
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
