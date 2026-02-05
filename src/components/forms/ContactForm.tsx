'use client';

import { ContactFormData } from '@/types';
import { validateEmail, validatePhone } from '@/utils/helpers';
import { Send as SendIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm = (): JSX.Element => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: '',
    preferredContact: 'email',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const subjects = [
    'Property Inquiry',
    'Schedule a Visit',
    'Investment Advice',
    'Sell My Property',
    'General Question',
    'Other',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStatus('success');
    setStatusMessage(
      'Thank you for your message! Our team will get back to you within 24 hours.'
    );
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      propertyInterest: '',
      preferredContact: 'email',
    });

    setTimeout(() => {
      setStatus('idle');
      setStatusMessage('');
    }, 5000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-card md:p-8"
    >
      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            fullWidth
            required
            disabled={status === 'loading'}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
            fullWidth
            required
            disabled={status === 'loading'}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            required
            disabled={status === 'loading'}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6}>
          <TextField
            type="tel"
            label="Phone Number"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            fullWidth
            required
            disabled={status === 'loading'}
          />
        </Grid>

        {/* Subject */}
        <Grid item xs={12}>
          <TextField
            select
            label="Subject"
            value={formData.subject}
            onChange={e => handleChange('subject', e.target.value)}
            error={Boolean(errors.subject)}
            helperText={errors.subject}
            fullWidth
            required
            disabled={status === 'loading'}
          >
            {subjects.map(subject => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Message */}
        <Grid item xs={12}>
          <TextField
            label="Your Message"
            value={formData.message}
            onChange={e => handleChange('message', e.target.value)}
            error={Boolean(errors.message)}
            helperText={errors.message}
            fullWidth
            required
            multiline
            rows={4}
            disabled={status === 'loading'}
          />
        </Grid>

        {/* Preferred Contact Method */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className="mb-2 text-secondary-700">
              Preferred Contact Method
            </FormLabel>
            <RadioGroup
              row
              value={formData.preferredContact}
              onChange={e => handleChange('preferredContact', e.target.value)}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
                disabled={status === 'loading'}
              />
              <FormControlLabel
                value="phone"
                control={<Radio />}
                label="Phone"
                disabled={status === 'loading'}
              />
              <FormControlLabel
                value="both"
                control={<Radio />}
                label="Both"
                disabled={status === 'loading'}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Status Message */}
        {statusMessage && (
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert severity={status === 'success' ? 'success' : 'error'}>
                {statusMessage}
              </Alert>
            </motion.div>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={status === 'loading'}
            endIcon={
              status === 'loading' ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            className="rounded-full bg-black py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-xl"
            sx={{ textTransform: 'none' }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
