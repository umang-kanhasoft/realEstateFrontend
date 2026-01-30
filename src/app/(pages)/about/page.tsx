import CTASection from '@/components/sections/CTASection';
import Stats from '@/components/sections/Stats';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about VitalSpace - Your trusted partner in real estate with over 15 years of experience.',
};

const team = [
  {
    name: 'Rajesh Sharma',
    role: 'Founder & CEO',
    image: '/images/team/team-1.jpg',
    description: '20+ years in real estate',
  },
  {
    name: 'Priya Mehta',
    role: 'Head of Sales',
    image: '/images/team/team-2.jpg',
    description: '15+ years experience',
  },
  {
    name: 'Amit Patel',
    role: 'Chief Operations Officer',
    image: '/images/team/team-3.jpg',
    description: '12+ years in operations',
  },
  {
    name: 'Sunita Reddy',
    role: 'Head of Legal',
    image: '/images/team/team-4.jpg',
    description: '18+ years in property law',
  },
];

const values = [
  {
    title: 'Integrity',
    description:
      'We maintain the highest ethical standards in all our dealings.',
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in every service we provide.',
  },
  {
    title: 'Customer First',
    description: "Our clients' needs are at the center of everything we do.",
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies to serve you better.',
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <Box className="min-h-screen">
      {/* Hero Section */}
      <Box
        className="relative overflow-hidden py-20"
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            className="text-center font-heading font-bold text-white"
          >
            About VitalSpace
          </Typography>
          <Typography
            variant="h6"
            className="mx-auto mt-4 max-w-2xl text-center text-white/80"
          >
            Your trusted partner in finding the perfect property for over 15
            years
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-story.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              className="text-primary-600 font-semibold"
            >
              Our Story
            </Typography>
            <Typography variant="h3" className="mb-4 font-heading font-bold">
              Building Dreams Since 2009
            </Typography>
            <Typography
              variant="body1"
              className="text-secondary-600 mb-4 leading-relaxed"
            >
              VitalSpace was founded with a simple mission: to make property
              buying, selling, and renting a seamless and enjoyable experience.
              What started as a small team of passionate real estate
              professionals has grown into one of India's most trusted property
              consultancies.
            </Typography>
            <Typography
              variant="body1"
              className="text-secondary-600 mb-6 leading-relaxed"
            >
              Over the years, we've helped thousands of families find their
              dream homes, assisted businesses in securing prime commercial
              spaces, and guided investors toward profitable opportunities.
            </Typography>
            <Box className="space-y-3">
              {[
                'Over 500+ properties sold',
                '1000+ satisfied clients',
                'Pan-India presence',
                'Award-winning service',
              ].map((item, index) => (
                <Box key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="text-primary-600" />
                  <Typography variant="body1">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Stats />

      {/* Our Values */}
      <Container maxWidth="lg" className="py-16">
        <Typography
          variant="h3"
          className="mb-12 text-center font-heading font-bold"
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper className="h-full rounded-2xl p-6 text-center transition-transform hover:-translate-y-1">
                <Box className="bg-primary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Typography
                    variant="h4"
                    className="text-primary-600 font-bold"
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Typography variant="h6" className="mb-2 font-semibold">
                  {value.title}
                </Typography>
                <Typography variant="body2" className="text-secondary-600">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box className="bg-secondary-50 py-16">
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            className="mb-4 text-center font-heading font-bold"
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="body1"
            className="text-secondary-600 mx-auto mb-12 max-w-2xl text-center"
          >
            Our experienced team of professionals is dedicated to providing you
            with exceptional service and expertise.
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper className="rounded-2xl p-6 text-center transition-transform hover:-translate-y-1">
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" className="font-semibold">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" className="text-primary-600 mb-1">
                    {member.role}
                  </Typography>
                  <Typography variant="body2" className="text-secondary-500">
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <CTASection />
    </Box>
  );
}
