'use client';

import { validateEmail } from '@/utils/helpers';
import {
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Newsletter = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    setMessage(
      'Thank you for subscribing! You will receive our latest updates.'
    );
    setEmail('');

    // Reset after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <Box component="section" className="bg-secondary-100 py-16">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Typography
            variant="h4"
            className="text-secondary-900 mb-4 font-heading font-bold"
          >
            Stay Updated with Latest Listings
          </Typography>
          <Typography className="text-secondary-600 mb-8">
            Subscribe to our newsletter and get the latest property listings,
            market insights, and real estate news delivered to your inbox.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <TextField
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              disabled={status === 'loading' || status === 'success'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-secondary-400" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: '12px',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={status === 'loading' || status === 'success'}
              endIcon={
                status === 'success' ? <CheckCircleIcon /> : <SendIcon />
              }
              sx={{
                minWidth: '160px',
                borderRadius: '12px',
                px: 4,
                background:
                  status === 'success'
                    ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                    : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                '&:hover': {
                  background:
                    status === 'success'
                      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                      : 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                },
              }}
            >
              {status === 'loading'
                ? 'Subscribing...'
                : status === 'success'
                  ? 'Subscribed!'
                  : 'Subscribe'}
            </Button>
          </Box>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Alert
                severity={status === 'success' ? 'success' : 'error'}
                className="mx-auto max-w-lg"
              >
                {message}
              </Alert>
            </motion.div>
          )}

          <Typography variant="body2" className="text-secondary-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Newsletter;
