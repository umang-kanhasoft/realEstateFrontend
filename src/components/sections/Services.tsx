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
    icon: <HomeWorkIcon className="text-[40px]" />,
    color: '#3b82f6',
    bgColor: '#eff6ff',
    className: 'text-blue-500 bg-blue-50',
  },
  {
    id: 2,
    title: 'Sell Property',
    description:
      'Get the best value for your property with our expert market analysis and wide network.',
    icon: <AccountBalanceIcon className="text-[40px]" />,
    color: '#10b981',
    bgColor: '#ecfdf5',
    className: 'text-emerald-500 bg-emerald-50',
  },
  {
    id: 3,
    title: 'Rent Property',
    description:
      'Discover quality rental homes or find reliable tenants for your property.',
    icon: <VpnKeyIcon className="text-[40px]" />,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    className: 'text-amber-500 bg-amber-50',
  },
  {
    id: 4,
    title: 'Property Management',
    description:
      'Comprehensive property management services for hassle-free ownership experience.',
    icon: <HandshakeIcon className="text-[40px]" />,
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    className: 'text-violet-500 bg-violet-50',
  },
  {
    id: 5,
    title: 'Interior Design',
    description:
      'Transform your space with our expert interior design and renovation services.',
    icon: <DesignServicesIcon className="text-[40px]" />,
    color: '#ec4899',
    bgColor: '#fdf2f8',
    className: 'text-pink-500 bg-pink-50',
  },
  {
    id: 6,
    title: 'Legal Assistance',
    description:
      'Complete legal support for property documentation, verification, and registration.',
    icon: <GavelIcon className="text-[40px]" />,
    color: '#06b6d4',
    bgColor: '#ecfeff',
    className: 'text-cyan-500 bg-cyan-50',
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
            className="text-sm font-semibold tracking-[2px] text-blue-800"
          >
            Our Services
          </Typography>
          <Typography
            variant="h2"
            className="mt-2 font-heading text-3xl font-bold text-slate-900 md:text-[2.75rem]"
          >
            Complete Real Estate Solutions
          </Typography>
          <Typography
            variant="body1"
            className="mx-auto mt-2 max-w-[600px] text-slate-500"
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
                <Box className="group h-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl hover:shadow-black/10">
                  {/* Icon */}
                  <Box
                    className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${service.className}`}
                  >
                    {service.icon}
                  </Box>

                  {/* Content */}
                  <Typography
                    variant="h5"
                    className="mb-3 font-semibold text-slate-900 transition-colors group-hover:text-blue-700"
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="mb-4 leading-relaxed text-slate-500"
                  >
                    {service.description}
                  </Typography>

                  {/* Link */}
                  <Box
                    className="flex items-center gap-2 font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: service.color }}
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
            className="rounded-full border-2 border-primary-700 px-8 py-3 font-semibold normal-case text-primary-700 transition-all duration-300 hover:bg-primary-700 hover:text-white"
            sx={{ textTransform: 'none' }}
          >
            Explore All Services
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
