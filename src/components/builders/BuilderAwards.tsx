'use client';

import { BuilderAward } from '@/types/builder.types';
import { Business, EmojiEvents, WorkspacePremium } from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

interface BuilderAwardsProps {
  awards: BuilderAward[];
}

export default function BuilderAwards({ awards }: BuilderAwardsProps) {
  if (!awards || awards.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <WorkspacePremium sx={{ fontSize: 64, color: '#e2e8f0', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#64748b' }}>
            No awards listed yet.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Grid container spacing={3}>
      {awards.map((award: BuilderAward, index: number) => (
        <Grid item xs={12} md={6} key={award.id || index}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 1,
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#fff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg,#fef3c7,#fde68a)',
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EmojiEvents sx={{ fontSize: 24 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ mb: 1 }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    noWrap
                    sx={{ color: '#0f172a', lineHeight: 1.2, mb: 0.5 }}
                  >
                    {award.title}
                  </Typography>
                  <Chip
                    label={award.awardYear}
                    size="small"
                    sx={{
                      bgcolor: '#0f172a',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 0.5 }}
                >
                  <Business sx={{ fontSize: 16, color: '#94a3b8' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                    noWrap
                  >
                    {award.awardOrg}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: '#475569', lineHeight: 1.7 }}
                >
                  {award.description}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
