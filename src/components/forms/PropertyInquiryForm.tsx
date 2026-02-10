'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  isAgreed: boolean;
}

export default function PropertyInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    isAgreed: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      // Clear error when user starts typing
      if (errors[name as keyof FormData]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isAgreed: e.target.checked,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.isAgreed) {
      newErrors.isAgreed = 'Please agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStatus('success');

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        mobile: '',
        email: '',
        isAgreed: true,
      });
      setStatus('idle');
    }, 3000);
  };

  return (
    <Box className="overflow-hidden rounded-xl border border-gray-100 bg-white font-sans shadow-lg">
      {/* Header */}
      <Box className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center text-white">
        <Typography className="text-lg text-white/90">
          Get Expert Property Advice
        </Typography>
        <Typography
          variant="h5"
          className="mt-1 font-bold tracking-wide text-white"
        >
          FREE CONSULTATION
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box component="form" className="space-y-4 p-5" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Your Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{ disableUnderline: false }}
          className="bg-transparent"
        />

        <TextField
          fullWidth
          variant="standard"
          placeholder="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          type="tel"
          error={!!errors.mobile}
          helperText={errors.mobile}
        />

        <TextField
          fullWidth
          variant="standard"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          error={!!errors.email}
          helperText={errors.email}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isAgreed}
              onChange={handleCheckboxChange}
              name="isAgreed"
              size="small"
              className="text-blue-600"
            />
          }
          label={
            <Typography
              variant="caption"
              className="block leading-tight text-gray-500"
            >
              I agree to be contacted by Real Estate via WhatsApp, SMS, Phone,
              Email, etc.
            </Typography>
          }
          className="-ml-2.5 mt-2 items-start"
        />
        {errors.isAgreed && (
          <Typography variant="caption" color="error" className="mt-1 block">
            {errors.isAgreed}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={status === 'loading'}
          className="mt-4 rounded-full bg-black py-3 font-bold normal-case text-white shadow-md hover:bg-gray-800"
        >
          {status === 'loading'
            ? 'Submitting...'
            : status === 'success'
              ? 'Submitted!'
              : 'Submit'}
        </Button>

        {status === 'success' && (
          <Typography
            variant="caption"
            className="mt-2 block cursor-pointer text-center text-green-600"
          >
            Our expert will contact you soon!
          </Typography>
        )}

        <Typography
          variant="caption"
          className="mt-2 block cursor-pointer text-center text-blue-500 hover:underline"
        >
          Read Disclaimer
        </Typography>
      </Box>
    </Box>
  );
}
