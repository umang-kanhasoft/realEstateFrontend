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

export default function SideContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    isAgreed: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit form
    console.log('Form submitted:', formData);
  };

  return (
    <Box className="overflow-hidden rounded-xl border border-gray-100 bg-white font-sans shadow-lg">
      {/* Header */}
      <Box className="bg-gray-800 p-6 text-center text-white">
        <Typography className="text-lg text-white/90">
          Schedule your free site visit
        </Typography>
        <Typography
          variant="h5"
          className="mt-1 font-bold tracking-wide text-white"
        >
          TODAY
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box component="form" className="space-y-4 p-5" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          InputProps={{ disableUnderline: false }}
          className="bg-transparent"
        />

        <TextField
          fullWidth
          variant="standard"
          placeholder="Mobile number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          type="tel"
        />

        <TextField
          fullWidth
          variant="standard"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isAgreed}
              onChange={handleChange}
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

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          className="mt-4 rounded-md border-gray-300 py-2 normal-case text-gray-700 hover:bg-gray-50"
        >
          Submit
        </Button>

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
