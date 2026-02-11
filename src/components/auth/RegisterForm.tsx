'use client';

import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

// Reuse the schema from the page or define it centrally
const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Please enter a valid email'),
    password: z
      .string()
      .min(8, 'Min 8 characters')
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[0-9]/, 'Must contain number'),
    confirmPassword: z.string(),
    phoneNumber: z.string().optional(),
    bio: z.string().optional(),
    specialization: z.string().optional(),
    yearsOfExperience: z.number().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const steps = ['Account Details', 'Profile Details', 'Review'];

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
  isModal?: boolean;
}

export default function RegisterForm({
  onSuccess,
  onLoginClick,
  isModal = false,
}: RegisterFormProps) {
  const router = useRouter();
  const { register } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
  });

  const stepFields: (keyof RegisterFormData)[][] = [
    ['fullName', 'email', 'password', 'confirmPassword'],
    ['phoneNumber', 'bio', 'specialization'],
    [], // Review step checks nothing specific, just submission
  ];

  const handleNext = async () => {
    const fields = stepFields[activeStep];
    const isStepValid = await trigger(fields);
    if (isStepValid) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // API call
      await register(data);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Error Alert */}
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

          {activeStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Full Name"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />
                  )}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Confirm Password"
                          type={showPassword ? 'text' : 'password'}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                          InputProps={{ sx: { borderRadius: 2 } }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone Number (Optional)"
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />
                  )}
                />
                <Controller
                  name="specialization"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Specialization (Optional)"
                      placeholder="e.g. Residential, Commercial"
                      InputProps={{ sx: { borderRadius: 2 } }}
                    />
                  )}
                />
              </div>
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="py-6 text-center"
            >
              <Typography variant="h6" gutterBottom>
                Almost there!
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please review your information and click &quot;Create
                Account&quot; to get started.
              </Typography>
              <Box
                sx={{
                  bgcolor: 'grey.50',
                  p: 3,
                  borderRadius: 2,
                  textAlign: 'left',
                  mb: 3,
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Account Details:
                </Typography>
                <Box className="flex items-center gap-2 p-2">
                  <Typography variant="subtitle2" color="text.secondary">
                    Full Name:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {control._formValues.fullName}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-2 p-2">
                  <Typography variant="subtitle2" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {control._formValues.email}
                  </Typography>
                </Box>
                {control._formValues.phoneNumber && (
                  <Box className="flex items-center gap-2 p-2">
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone Number:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {control._formValues.phoneNumber}
                    </Typography>
                  </Box>
                )}
                {control._formValues.specialization && (
                  <Box className="flex items-center gap-2 p-2">
                    <Typography variant="subtitle2" color="text.secondary">
                      Specialization:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {control._formValues.specialization}
                    </Typography>
                  </Box>
                )}
                {control._formValues.bio && (
                  <Box className="flex items-center gap-2 p-2">
                    <Typography variant="subtitle2" color="text.secondary">
                      Bio:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {control._formValues.bio}
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-0 flex gap-3">
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                borderColor: '#E5E7EB',
                color: 'text.primary',
              }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit(onSubmit)
                : handleNext
            }
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              backgroundColor: '#7C3AED',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#6D28D9' },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeStep === steps.length - 1 ? (
              'Create Account'
            ) : (
              'Continue'
            )}
          </Button>
        </div>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mt: 3 }}
        >
          Already have an account?{' '}
          {isModal ? (
            <button
              type="button"
              onClick={onLoginClick}
              className="cursor-pointer border-0 bg-transparent font-semibold text-violet-600 underline hover:text-violet-700"
            >
              Log in
            </button>
          ) : (
            <Link
              href="/login"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Log in
            </Link>
          )}
        </Typography>
      </form>
    </div>
  );
}
