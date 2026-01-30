'use client';

import { SITE_CONFIG } from '@/utils/constants';
import {
  KeyboardArrowUp as ArrowUpIcon,
  Email as EmailIcon,
  Facebook,
  Facebook as FacebookIcon,
  Instagram,
  Instagram as InstagramIcon,
  LinkedIn,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  Twitter as TwitterIcon,
  X,
  YouTube,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
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
    <Box sx={{ borderTop: "1px solid #eee", pt: 8, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: "#007bb5", mb: 2 }}
            >
              {" "}
              VITAL space{" "}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: "300px" }}
            >
              A trustworthy one stop solution for all your property needs.We
              ensure you buy / rent property that meets all your requirements.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={2}>
              {" "}
              Quick Link{" "}
            </Typography>
            {["Home", "About Us", "Career", "Blogs", "FAQs"].map((l) => (
              <Typography
                key={l}
                variant="body2"
                sx={{ mb: 1, color: "#555" }}
              >
                {" "}
                {l}{" "}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={2}>
              {" "}
              Trending Projects{" "}
            </Typography>
            {["The Regal", "Satatya Syrii-2", "The Gold By Samor"].map(
              (l) => (
                <Typography
                  key={l}
                  variant="body2"
                  sx={{ mb: 1, color: "#555" }}
                >
                  {" "}
                  {l}{" "}
                </Typography>
              )
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={700} mb={2}>
              {" "}
              Connect with Us{" "}
            </Typography>
            <Typography variant="body2"> +91 99984 70000 </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {" "}
              info@vitalspace.in
            </Typography>
            <Stack direction="row" spacing={2}>
              <Facebook /> <Instagram /> <LinkedIn /> <X /> <YouTube />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
};

export default Footer;
