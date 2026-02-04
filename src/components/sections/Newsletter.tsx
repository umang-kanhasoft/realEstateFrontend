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
            className="mb-4 font-heading text-2xl font-bold text-secondary-900 md:text-3xl"
          >
            Stay Updated with Latest Listings
          </Typography>
          <Typography className="mb-8 text-secondary-600">
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
              className="rounded-xl bg-white"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-secondary-400" />
                  </InputAdornment>
                ),
                className: 'rounded-xl', // Ensures internal input radius matches
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' }, // Optional: remove default MUI border if desired, or relying on custom styling
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
              className={`min-w-[160px] rounded-xl px-4 py-3 font-semibold normal-case transition-all duration-300 ${
                status === 'success'
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500'
                  : 'bg-gradient-to-br from-blue-800 to-blue-600 hover:from-blue-900 hover:to-blue-700'
              }`}
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
                className="mx-auto max-w-lg rounded-xl shadow-sm"
              >
                {message}
              </Alert>
            </motion.div>
          )}

          <Typography variant="body2" className="mt-4 text-secondary-500">
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Newsletter;
