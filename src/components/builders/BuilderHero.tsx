'use client';

import { Box } from '@mui/material';

export default function BuilderHero() {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#0f172a',
        overflow: 'hidden',
        height: { xs: 300, md: 400 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, #0f172a 100%)',
        }}
      />
    </Box>
  );
}
