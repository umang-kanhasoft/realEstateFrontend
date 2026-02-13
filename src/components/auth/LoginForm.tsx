'use client';

import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// Validation Schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
  isModal?: boolean;
}

export default function LoginForm({
  onSuccess,
  onRegisterClick,
  isModal = false,
}: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const { openForgotPassword } = useAuthModal();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              sx: { borderRadius: 2 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  sx={{
                    color: '#D1D5DB',
                    '&.Mui-checked': { color: '#7C3AED' },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Remember me
                </Typography>
              }
            />
          )}
        />
        <Link
          href="#"
          className="text-sm font-medium text-violet-600 hover:text-violet-700"
          onClick={e => {
            e.preventDefault();
            openForgotPassword();
          }}
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
      </Button>

      {/* Sign Up Link */}
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mt: 3 }}
      >
        Don&apos;t have an account?{' '}
        {isModal ? (
          <button
            type="button"
            onClick={onRegisterClick}
            className="cursor-pointer border-0 bg-transparent font-semibold text-violet-600 underline hover:text-violet-700"
          >
            Sign up for free
          </button>
        ) : (
          <Link
            href="/register"
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Sign up for free
          </Link>
        )}
      </Typography>
    </form>
  );
}
