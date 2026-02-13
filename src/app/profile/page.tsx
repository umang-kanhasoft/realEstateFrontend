'use client';

import { useAuth } from '@/context/AuthContext';
import { apiClient, ApiError } from '@/lib/api/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AccessTime,
  Domain,
  Edit,
  Email,
  Person,
  Phone,
  Save,
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  specialization: z.string().optional(),
  yearsOfExperience: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => (val === '' ? undefined : Number(val))),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type ProfileFormInputs = z.input<typeof profileSchema>;

interface ProfileUpdateResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    role: string[];
    bio?: string | null;
    specialization?: string | null;
    yearsOfExperience?: number | null;
    subscriptionType?: string | null;
    subscriptionStatus?: string | null;
    profileImageUrl?: string | null;
  };
}

export default function ProfilePage() {
  const { user, updateUser, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      bio: '',
      specialization: '',
      yearsOfExperience: undefined,
    },
  });

  // Auth protection
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.bio || '',
        specialization: user.specialization || '',
        yearsOfExperience: user.yearsOfExperience || undefined,
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<ProfileFormInputs> = async data => {
    setIsUpdating(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Using PUT for updates as per REST conventions
      const payload = data as unknown as ProfileFormData;
      const response = await apiClient.put<ProfileUpdateResponse>(
        '/register',
        payload
      );

      if (response.data && response.data.user) {
        updateUser(response.data.user);
      } else {
        // Fallback if backend doesn't return user object
        const { fullName, phoneNumber, bio, specialization } = data;
        updateUser({ fullName, phoneNumber, bio, specialization });
      }
      setSuccessMessage('Profile updated successfully');
    } catch (error: unknown) {
      const message =
        error instanceof Error || (error as ApiError)?.message
          ? (error as ApiError).message
          : 'Failed to update profile. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isAuthLoading || !user) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#7C3AED' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pb: 8 }}>
      {/* Decorative Header */}
      <Box
        sx={{
          height: 280,
          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', pt: 8 }}>
          <Typography
            variant="h3"
            fontWeight="800"
            color="white"
            sx={{ mb: 1, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
          >
            My Profile
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.9)">
            Manage your personal information and preferences
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -10 }}>
        <Grid container spacing={4}>
          {/* Left Column: Profile Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: '#7C3AED',
                      fontSize: '3rem',
                      border: '4px solid white',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                    }}
                    src={user.profileImageUrl || undefined}
                  >
                    {getInitials(user.fullName)}
                  </Avatar>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      width: 20,
                      height: 20,
                      bgcolor: '#10B981',
                      borderRadius: '50%',
                      border: '3px solid white',
                    }}
                  />
                </Box>

                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {user.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  {user.role && (
                    <Chip
                      label={
                        Array.isArray(user.role)
                          ? user.role.join(', ')
                          : user.role
                      }
                      size="small"
                      color="primary"
                      sx={{
                        bgcolor: 'rgba(124, 58, 237, 0.1)',
                        color: '#7C3AED',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    />
                  )}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="text.secondary"
                    gutterBottom
                    display="block"
                  >
                    ABOUT ME
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.bio || 'Has not provided a bio yet.'}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right Column: Edit Form */}
          <Grid item xs={12} md={8} className="z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Profile Details
                  </Typography>
                  <Chip
                    icon={<Edit sx={{ fontSize: 16 }} />}
                    label="Editing"
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: '#E5E7EB' }}
                  />
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence>
                    {(errorMessage || successMessage) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert
                          severity={errorMessage ? 'error' : 'success'}
                          variant="filled"
                          sx={{ mb: 3, borderRadius: 2 }}
                        >
                          {errorMessage || successMessage}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="600"
                        color="text.secondary"
                        gutterBottom
                      >
                        Contact Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        value={user.email}
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                          sx: { borderRadius: 2, bgcolor: 'action.hover' },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Phone Number"
                            placeholder="+1 (555) 000-0000"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Phone color="action" />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="600"
                        color="text.secondary"
                        gutterBottom
                      >
                        Professional Info
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="action" />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="specialization"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Specialization"
                            placeholder="e.g. Residential, Commercial"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Domain color="action" />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name="yearsOfExperience"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            type="number"
                            label="Years of Experience"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccessTime color="action" />
                                </InputAdornment>
                              ),
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name="bio"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            multiline
                            rows={4}
                            label="Bio"
                            placeholder="Tell us a bit about yourself..."
                            InputProps={{
                              sx: { borderRadius: 2 },
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Box className="group mt-8 flex justify-end pt-1">
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      endIcon={
                        <Save className="transition-transform duration-300 group-hover:translate-x-1" />
                      }
                      className="rounded-full border-2 border-secondary-900 px-8 py-3 font-semibold text-secondary-900 transition-all duration-300 hover:bg-secondary-900 hover:text-white"
                      sx={{ textTransform: 'none' }}
                    >
                      {isUpdating ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </Box>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
