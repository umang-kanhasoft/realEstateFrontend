'use client';

import { apiClient, ApiError } from '@/lib/api/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBack } from '@mui/icons-material';
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await apiClient.post('/forgot-password', data.email);
      setSuccessMessage(
        response.message || 'Reset password request sent successfully'
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error || (error as ApiError)?.message
          ? (error as ApiError).message
          : 'An error occurred while processing your request';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (successMessage) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-full bg-green-100 p-3"
        >
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Check your email
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {successMessage}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
          If an account exists with this email, you will receive password reset
          instructions shortly.
        </Typography>
        <Button
          onClick={onBackToLogin}
          variant="outlined"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 2,
            borderColor: '#E5E7EB',
            color: 'text.primary',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#D1D5DB',
              backgroundColor: 'rgba(0,0,0,0.02)',
            },
          }}
        >
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center">
        <IconButton onClick={onBackToLogin} size="small" sx={{ mr: 1, ml: -1 }}>
          <ArrowBack fontSize="small" />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Forgot Password
        </Typography>
      </div>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Enter your email address and we&apos;ll send you instructions to reset
        your password.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
              placeholder="you@example.com"
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            backgroundColor: '#7C3AED',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#6D28D9',
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>
    </div>
  );
}
