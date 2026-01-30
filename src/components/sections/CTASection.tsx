'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = (): JSX.Element => {
  return (
    <Box
      component="section"
      className="relative overflow-hidden py-20"
      sx={{
        background:
          'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
      }}
    >
      {/* Background Elements */}
      <Box className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-96 w-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </Box>

      <Container maxWidth="lg" className="relative z-10">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                className="mb-4 font-heading font-bold text-white"
                sx={{
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  lineHeight: 1.2,
                }}
              >
                Ready to Find Your
                <Box component="span" sx={{ color: '#fbbf24' }}>
                  {' '}
                  Dream Property?
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.1rem',
                  maxWidth: 500,
                }}
              >
                Get in touch with our expert team today. We're here to help you
                navigate your real estate journey with confidence.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Box className="flex flex-col gap-4 sm:flex-row md:justify-end">
                <Button
                  component="a"
                  href="tel:+919876543210"
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#1e40af',
                    px: 4,
                    py: 1.75,
                    borderRadius: '14px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    '&:hover': {
                      backgroundColor: '#f8fafc',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Call Now
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.75,
                    borderRadius: '14px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderWidth: 2,
                    },
                  }}
                >
                  Get in Touch
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CTASection;
