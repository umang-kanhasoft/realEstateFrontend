import CTASection from '@/components/sections/CTASection';
import Stats from '@/components/sections/Stats';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Real Estate - Your trusted partner in real estate with over 15 years of experience.',
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
      <Box className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-500 py-24">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            className="text-center font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            About Real Estate
          </Typography>
          <Typography
            variant="h6"
            className="mx-auto mt-6 max-w-2xl text-center font-medium text-white/90"
          >
            Your trusted partner in finding the perfect property for over 15
            years
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" className="py-20">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="relative h-[400px] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/about-story.jpg"
                alt="Our Story"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              className="font-bold tracking-wider text-primary-600"
            >
              Our Story
            </Typography>
            <Typography
              variant="h3"
              className="mb-6 font-heading text-3xl font-bold text-gray-900 md:text-4xl"
            >
              Building Dreams Since 2009
            </Typography>
            <Typography
              variant="body1"
              className="mb-6 text-lg leading-relaxed text-secondary-600"
            >
              Real Estate was founded with a simple mission: to make property
              buying, selling, and renting a seamless and enjoyable experience.
              What started as a small team of passionate real estate
              professionals has grown into one of India&apos;s most trusted
              property consultancies.
            </Typography>
            <Typography
              variant="body1"
              className="mb-8 text-lg leading-relaxed text-secondary-600"
            >
              Over the years, we&apos;ve helped thousands of families find their
              dream homes, assisted businesses in securing prime commercial
              spaces, and guided investors toward profitable opportunities.
            </Typography>
            <Box className="space-y-4">
              {[
                'Over 500+ properties sold',
                '1000+ satisfied clients',
                'Pan-India presence',
                'Award-winning service',
              ].map((item, index) => (
                <Box key={index} className="flex items-center gap-3">
                  <CheckCircleIcon className="text-xl text-primary-600" />
                  <Typography
                    variant="body1"
                    className="font-medium text-gray-700"
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Stats />

      {/* Our Values */}
      <Container maxWidth="lg" className="py-20">
        <Typography
          variant="h3"
          className="mb-16 text-center font-heading text-3xl font-bold md:text-4xl"
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                className="h-full rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-xl"
              >
                <Box className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50">
                  <Typography
                    variant="h4"
                    className="font-bold text-primary-600"
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  className="mb-3 font-bold text-gray-900"
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="leading-relaxed text-secondary-600"
                >
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box className="bg-secondary-50 py-24">
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            className="mb-6 text-center font-heading text-3xl font-bold md:text-4xl"
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="body1"
            className="mx-auto mb-16 max-w-2xl text-center text-lg text-secondary-600"
          >
            Our experienced team of professionals is dedicated to providing you
            with exceptional service and expertise.
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  className="rounded-3xl bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    className="mx-auto mb-6 h-32 w-32 border-4 border-primary-50 shadow-inner"
                  />
                  <Typography
                    variant="h6"
                    className="mb-1 font-bold text-gray-900"
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="mb-3 font-semibold text-primary-600"
                  >
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
