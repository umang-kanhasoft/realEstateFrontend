import CTASection from '@/components/sections/CTASection';
import { servicesData } from '@/data/services';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore our comprehensive real estate services including property sales, rentals, management, and more.',
};

export default function ServicesPage(): JSX.Element {
  return (
    <Box className="min-h-screen">
      {/* Hero Section */}
      <Box className="bg-gradient-to-br from-primary-900 to-primary-500 py-24">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            className="text-center font-heading text-4xl font-bold text-white md:text-5xl"
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-white/90"
          >
            Comprehensive real estate solutions tailored to meet your unique
            needs
          </Typography>
        </Container>
      </Box>

      {/* Services List */}
      <Container maxWidth="lg" className="py-20">
        <Grid container spacing={8}>
          {servicesData.map((service, index) => (
            <Grid item xs={12} key={service.id}>
              <Paper
                className="overflow-hidden rounded-3xl border border-gray-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                elevation={0}
              >
                <Grid
                  container
                  direction={index % 2 === 0 ? 'row' : 'row-reverse'}
                >
                  <Grid item xs={12} md={6}>
                    <Box className="relative h-72 min-h-[350px] md:h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className="flex h-full flex-col justify-center p-10 md:p-12">
                      <Typography
                        variant="h4"
                        className="mb-4 font-heading font-bold text-gray-900"
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="mb-8 text-lg leading-relaxed text-secondary-600"
                      >
                        {service.description}
                      </Typography>
                      <Box className="mb-8 space-y-3">
                        {service.features.map((feature, idx) => (
                          <Box key={idx} className="flex items-center gap-3">
                            <CheckCircleIcon className="text-xl text-primary-600" />
                            <Typography
                              variant="body1"
                              className="font-medium text-gray-700"
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        component={Link}
                        href={service.href}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        className="w-fit rounded-xl bg-primary-600 px-8 py-3 shadow-lg hover:bg-primary-700"
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
