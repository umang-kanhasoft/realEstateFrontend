'use client';

import BuilderAwards from '@/components/builders/BuilderAwards';
import BuilderCertificates from '@/components/builders/BuilderCertificates';
import { BuilderAward, BuilderCertificate } from '@/types/builder.types';
import { EmojiEvents, WorkspacePremium } from '@mui/icons-material';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface BuilderAccoladesProps {
  awards: BuilderAward[];
  certificates: BuilderCertificate[];
}

export default function BuilderAccolades({
  awards,
  certificates,
}: BuilderAccoladesProps) {
  const [tabValue, setTabValue] = useState(0);

  const hasAwards = awards && awards.length > 0;
  const hasCertificates = certificates && certificates.length > 0;

  if (!hasAwards && !hasCertificates) return null;

  // Determine initial tab based on data availability
  // If only one exists, simplified view? Or just use tabs.
  // Tab change handler
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ mb: 6, textAlign: 'left' }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            color: '#0f172a',
            mb: 1,
            letterSpacing: '-0.5px',
          }}
        >
          Recognition & Excellence
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#64748b', fontSize: '1.1rem' }}
        >
          Our commitment to quality acknowledged by the industry
        </Typography>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 4,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 48,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 3,
              backgroundColor: '#0f172a',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#64748b',
              minHeight: 48,
              px: 3,
              '&.Mui-selected': {
                color: '#0f172a',
              },
            },
          }}
        >
          {hasAwards && (
            <Tab
              icon={<EmojiEvents sx={{ mb: 0.5 }} />}
              iconPosition="start"
              label={`Awards (${awards.length})`}
            />
          )}
          {hasCertificates && (
            <Tab
              icon={<WorkspacePremium sx={{ mb: 0.5 }} />}
              iconPosition="start"
              label={`Certificates (${certificates.length})`}
            />
          )}
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ minHeight: 200 }}>
        <AnimatePresence mode="wait">
          {tabValue === 0 && hasAwards && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <BuilderAwards awards={awards} />
            </motion.div>
          )}

          {/* Adjust logic: if tabValue is 1, OR if tabValue is 0 but NO awards exist (so certificates is first tab) */}
          {((tabValue === 1 && hasCertificates) ||
            (tabValue === 0 && !hasAwards && hasCertificates)) && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <BuilderCertificates certificates={certificates} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Container>
  );
}
