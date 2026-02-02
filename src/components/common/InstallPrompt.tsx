'use client';

import { useState, useEffect } from 'react';
import { Button, Box, Typography, Slide, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  if (!show) return null;

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          right: 20,
          zIndex: 9999,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 500,
          mx: 'auto',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, color: 'primary.main' }}>
                <DownloadIcon />
            </Box>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    Install VitalSpace
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Add to your home screen for the best experience
                </Typography>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
                variant="contained" 
                onClick={handleInstall}
                size="small"
                sx={{ borderRadius: 5, textTransform: 'none' }}
            >
            Install
            </Button>
            <IconButton size="small" onClick={() => setShow(false)}>
            <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
      </Box>
    </Slide>
  );
}
