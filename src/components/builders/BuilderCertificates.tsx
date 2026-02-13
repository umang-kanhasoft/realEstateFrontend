'use client';

import { BuilderCertificate } from '@/types/builder.types';
import { Download, VerifiedUser, WorkspacePremium } from '@mui/icons-material';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface BuilderCertificatesProps {
  certificates: BuilderCertificate[];
}

export default function BuilderCertificates({
  certificates,
}: BuilderCertificatesProps) {
  if (!certificates || certificates.length === 0) {
    return null;
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <Grid container spacing={3}>
      {certificates.map((cert, index) => (
        <Grid item xs={12} md={6} key={cert.id || index}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <WorkspacePremium sx={{ fontSize: 24 }} />
              </Box>

              {/* Info */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  noWrap
                  sx={{ color: '#0f172a', lineHeight: 1.2, mb: 0.5 }}
                >
                  {cert.title}
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ color: '#64748b', fontSize: '0.85rem' }}
                >
                  Issued by {cert.issuer}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{ mt: 0.5 }}
                >
                  <VerifiedUser sx={{ fontSize: 14, color: '#10b981' }} />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Valid until {fmtDate(cert.expiryDate)}
                  </Typography>
                </Stack>
              </Box>

              {/* Action */}
              <Button
                variant="outlined"
                size="small"
                href={cert.fileUrl}
                target="_blank"
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  p: 0,
                  borderColor: '#cbd5e1',
                  color: '#64748b',
                  flexShrink: 0,
                  '&:hover': {
                    borderColor: '#0f172a',
                    color: '#0f172a',
                    bgcolor: 'transparent',
                  },
                }}
              >
                <Download sx={{ fontSize: 20 }} />
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
