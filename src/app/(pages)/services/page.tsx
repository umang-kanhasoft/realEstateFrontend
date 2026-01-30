import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { servicesData } from '@/data/services';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive real estate services including property sales, rentals, management, and more.',
};

export default function ServicesPage(): JSX.Element {
  return (
    <Box className="min-h-screen">
      {/* Hero Section */}
      <Box
        className="py-20"
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            className="font-heading font-bold text-white text-center"
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            className="text-white/80 text-center mt-4 max-w-2xl mx-auto"
          >
            Comprehensive real estate solutions tailored to meet your unique needs
          </Typography>
        </Container>
      </Box>

      {/* Services List */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={8}>
          {servicesData.map((service, index) => (
            <Grid item xs={12} key={service.id}>
              <Paper className="rounded-2xl overflow-hidden">
                <Grid
                  container
                  direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                >
                  <Grid item xs={12} md={6}>
                    <Box className="relative h-64 md:h-full min-h-[300px]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className="p-8">
                      <Typography variant="h4" className="font-heading font-bold mb-4">
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-secondary-600 mb-6 leading-relaxed"
                      >
                        {service.description}
                      </Typography>
                      <Box className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <Box key={idx} className="flex items-center gap-2">
                            <CheckCircleIcon className="text-primary-600" fontSize="small" />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        component={Link}
                        href={service.href}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <CTASection />
    </Box>
  );
}