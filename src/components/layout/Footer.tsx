'use client';

import { useUI } from '@/hooks/useUI';
import { Facebook, Instagram, LinkedIn, X, YouTube } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

const Footer = (): JSX.Element | null => {
  const { state } = useUI();

  if (!state.isFooterVisible) return null;

  return (
    <Box
      component="footer"
      className="border-t border-gray-200 bg-white pb-8 pt-16"
    >
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              className="mb-4 font-black text-primary-600"
            >
              Real Estate
            </Typography>
            <Typography
              variant="body2"
              className="max-w-[300px] leading-relaxed text-gray-500"
            >
              A trustworthy one stop solution for all your property needs. We
              ensure you buy / rent property that meets all your requirements.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Quick Links
            </Typography>
            {['Home', 'About Us', 'Career', 'Blogs', 'FAQs'].map(l => (
              <Typography
                key={l}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
              >
                {l}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Trending Projects
            </Typography>
            {['The Regal', 'Satatya Syrii-2', 'The Gold By Samor'].map(l => (
              <Typography
                key={l}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
              >
                {l}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography className="mb-4 font-bold text-gray-900">
              Connect with Us
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-600">
              +91 99984 70000
            </Typography>
            <Typography variant="body2" className="mb-4 text-gray-600">
              info@realestate.in
            </Typography>
            <Stack direction="row" spacing={1}>
              {[Facebook, Instagram, LinkedIn, X, YouTube].map(
                (Icon, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    className="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-primary-600"
                  >
                    <Icon />
                  </IconButton>
                )
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
