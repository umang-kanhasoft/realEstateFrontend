import ContactForm from '@/components/forms/ContactForm';
import { SITE_CONFIG } from '@/utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Real Estate. We are here to help you with all your real estate needs.',
};

const contactInfo = [
  {
    icon: <LocationOnIcon className="text-3xl" />,
    title: 'Visit Us',
    content: SITE_CONFIG.address,
  },
  {
    icon: <PhoneIcon className="text-3xl" />,
    title: 'Call Us',
    content: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: <EmailIcon className="text-3xl" />,
    title: 'Email Us',
    content: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: <AccessTimeIcon className="text-3xl" />,
    title: 'Working Hours',
    content: `Mon-Fri: ${SITE_CONFIG.workingHours.weekdays}\nSat: ${SITE_CONFIG.workingHours.saturday}`,
  },
];

export default function ContactPage(): JSX.Element {
  return (
    <Box className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <Box className="bg-gradient-to-br from-primary-900 to-primary-500 py-24">
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            className="text-center font-heading text-4xl font-bold text-white md:text-5xl"
          >
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-white/90"
          >
            Have a question or need assistance? We&apos;re here to help. Reach
            out to us through any of the channels below.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" className="py-20">
        <Grid container spacing={6}>
          {/* Contact Info Cards */}
          <Grid item xs={12} lg={4}>
            <Box className="space-y-6">
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  className="rounded-2xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  elevation={0}
                >
                  <Box className="flex items-start gap-4">
                    <Box className="rounded-xl bg-primary-50 p-2 text-primary-600">
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        className="mb-1 font-bold text-gray-900"
                      >
                        {info.title}
                      </Typography>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium text-secondary-600 transition-colors hover:text-primary-600"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <Typography
                          variant="body2"
                          className="whitespace-pre-line font-medium text-secondary-600"
                        >
                          {info.content}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Paper className="rounded-3xl p-8 shadow-xl md:p-10" elevation={0}>
              <Typography
                variant="h5"
                className="mb-8 text-2xl font-bold text-gray-900"
              >
                Send Us a Message
              </Typography>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box className="mt-16">
          <Paper
            className="overflow-hidden rounded-3xl shadow-lg"
            elevation={0}
          >
            <Box className="flex h-96 w-full items-center justify-center bg-secondary-100">
              <Typography
                variant="body1"
                className="font-medium text-secondary-500"
              >
                Google Maps Integration Placeholder
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
