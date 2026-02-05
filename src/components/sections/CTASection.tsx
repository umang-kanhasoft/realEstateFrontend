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
      className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 py-20"
    >
      {/* Background Elements */}
      <Box className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]"
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
                className="mb-4 font-heading text-[2rem] font-bold leading-tight text-white md:text-[2.75rem]"
              >
                Ready to Find Your
                <span className="text-amber-400"> Dream Property?</span>
              </Typography>
              <Typography
                variant="body1"
                className="max-w-[500px] text-lg text-white/80"
              >
                Get in touch with our expert team today. We&apos;re here to help
                you navigate your real estate journey with confidence.
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
                  className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-blue-900 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-2xl"
                  sx={{ textTransform: 'none' }}
                >
                  Call Now
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  className="rounded-full border-2 border-white/50 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  sx={{ textTransform: 'none' }}
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
