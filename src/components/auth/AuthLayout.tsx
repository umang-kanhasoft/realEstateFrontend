'use client';

import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  backgroundImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Corporate/Building image
}) => {
  return (
    <Box
      className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />

      {/* Main Card/Dialog */}
      <Paper
        elevation={24}
        component={motion.div}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg overflow-hidden bg-white/95 text-gray-900"
        sx={{
          borderRadius: 4,
          m: 2,
          p: { xs: 4, sm: 6 },
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <Typography
            variant="h6"
            sx={{
              color: '#7C3AED',
              fontWeight: 700,
              mb: 2,
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontSize: '0.875rem',
            }}
          >
            Real Estate AI
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#111827',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280' }}>
            {subtitle}
          </Typography>
        </div>

        {/* Content */}
        {children}

        {/* Footer/Copyright */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Real Estate AI. All rights
            reserved.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout;
