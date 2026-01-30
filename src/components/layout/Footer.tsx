'use client';

import { SITE_CONFIG } from '@/utils/constants';
import {
  KeyboardArrowUp as ArrowUpIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Properties for Sale', href: '/properties?type=sale' },
    { label: 'Properties for Rent', href: '/properties?type=rent' },
    { label: 'Commercial Properties', href: '/properties?type=commercial' },
    { label: 'New Projects', href: '/properties?filter=new' },
    { label: 'Featured Listings', href: '/properties?filter=featured' },
  ];

  const services = [
    { label: 'Property Sales', href: '/services/property-sales' },
    { label: 'Property Rentals', href: '/services/property-rentals' },
    { label: 'Property Management', href: '/services/property-management' },
    { label: 'Investment Advisory', href: '/services/investment-advisory' },
    { label: 'Legal Services', href: '/services/legal-services' },
  ];

  return (
    <Box component="footer" className="bg-secondary-900 text-white">
      {/* Main Footer */}
      <Container maxWidth="xl" className="py-16">
        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="mb-6 inline-block">
                <Box className="flex items-center gap-2">
                  <Box className="bg-primary-600 flex h-12 w-12 items-center justify-center rounded-lg font-heading text-xl font-bold text-white">
                    VS
                  </Box>
                  <span className="font-heading text-2xl font-bold text-white">
                    VitalSpace
                  </span>
                </Box>
              </Link>
              <Typography className="text-secondary-400 mb-6">
                {SITE_CONFIG.description}
              </Typography>
              <Box className="space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-secondary-400 flex items-center gap-3 transition-colors hover:text-white"
                >
                  <PhoneIcon fontSize="small" className="text-primary-500" />
                  {SITE_CONFIG.phone}
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-secondary-400 flex items-center gap-3 transition-colors hover:text-white"
                >
                  <EmailIcon fontSize="small" className="text-primary-500" />
                  {SITE_CONFIG.email}
                </a>
                <div className="text-secondary-400 flex items-start gap-3">
                  <LocationIcon
                    fontSize="small"
                    className="text-primary-500 mt-0.5"
                  />
                  <span>{SITE_CONFIG.address}</span>
                </div>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Typography variant="h6" className="mb-4 font-semibold">
                Quick Links
              </Typography>
              <Box component="ul" className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-secondary-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h6" className="mb-4 font-semibold">
                Our Services
              </Typography>
              <Box component="ul" className="space-y-2">
                {services.map(service => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className="text-secondary-400 transition-colors hover:text-white"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Typography variant="h6" className="mb-4 font-semibold">
                Subscribe to Newsletter
              </Typography>
              <Typography className="text-secondary-400 mb-4">
                Get the latest property listings and real estate news delivered
                to your inbox.
              </Typography>
              <Box className="flex gap-2">
                <TextField
                  placeholder="Enter your email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 'auto',
                    px: 3,
                    borderRadius: '8px',
                  }}
                >
                  <SendIcon />
                </Button>
              </Box>

              {/* Social Links */}
              <Box className="mt-6">
                <Typography className="text-secondary-400 mb-3 text-sm">
                  Follow us on social media
                </Typography>
                <Box className="flex gap-2">
                  <IconButton
                    href={SITE_CONFIG.socialLinks.facebook}
                    target="_blank"
                    className="hover:bg-primary-600 bg-white/10 text-white"
                    size="small"
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    href={SITE_CONFIG.socialLinks.twitter}
                    target="_blank"
                    className="hover:bg-primary-600 bg-white/10 text-white"
                    size="small"
                  >
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    href={SITE_CONFIG.socialLinks.instagram}
                    target="_blank"
                    className="hover:bg-primary-600 bg-white/10 text-white"
                    size="small"
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    href={SITE_CONFIG.socialLinks.linkedin}
                    target="_blank"
                    className="hover:bg-primary-600 bg-white/10 text-white"
                    size="small"
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    href={SITE_CONFIG.socialLinks.youtube}
                    target="_blank"
                    className="hover:bg-primary-600 bg-white/10 text-white"
                    size="small"
                  >
                    <YouTubeIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box className="border-t border-white/10">
        <Container maxWidth="xl">
          <Box className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <Typography className="text-secondary-400 text-center text-sm md:text-left">
              © {currentYear} VitalSpace. All rights reserved.
            </Typography>
            <Box className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-secondary-400 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-secondary-400 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-secondary-400 transition-colors hover:text-white"
              >
                Sitemap
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="bg-primary-600 hover:bg-primary-700 fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-colors"
      >
        <ArrowUpIcon />
      </motion.button>
    </Box>
  );
};

export default Footer;
