import { Metadata } from 'next';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactForm from '@/components/forms/ContactForm';
import { SITE_CONFIG } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with VitalSpace. We are here to help you with all your real estate needs.',
};

const contactInfo = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
    title: 'Visit Us',
    content: SITE_CONFIG.address,
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 32 }} />,
    title: 'Call Us',
    content: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: <EmailIcon sx={{ fontSize: 32 }} />,
    title: 'Email Us',
    content: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
    title: 'Working Hours',
    content: `Mon-Fri: ${SITE_CONFIG.workingHours.weekdays}\nSat: ${SITE_CONFIG.workingHours.saturday}`,
  },
];

export default function ContactPage(): JSX.Element {
  return (
    <Box className="min-h-screen bg-secondary-50">
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
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            className="text-white/80 text-center mt-4 max-w-2xl mx-auto"
          >
            Have a question or need assistance? We're here to help. Reach out to us
            through any of the channels below.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={6}>
          {/* Contact Info Cards */}
          <Grid item xs={12} lg={4}>
            <Box className="space-y-4">
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  className="p-6 rounded-2xl transition-transform hover:-translate-y-1"
                  elevation={2}
                >
                  <Box className="flex items-start gap-4">
                    <Box className="text-primary-600">{info.icon}</Box>
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-1">
                        {info.title}
                      </Typography>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-secondary-600 hover:text-primary-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <Typography
                          variant="body2"
                          className="text-secondary-600 whitespace-pre-line"
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
            <Paper className="p-8 rounded-2xl">
              <Typography variant="h5" className="font-semibold mb-6">
                Send Us a Message
              </Typography>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box className="mt-12">
          <Paper className="rounded-2xl overflow-hidden">
            <Box className="h-96 bg-secondary-200 flex items-center justify-center">
              <Typography variant="body1" className="text-secondary-500">
                Google Maps Integration Placeholder
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}