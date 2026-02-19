'use client';

import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, IconButton, Slide, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
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
    <Slide direction="left" in={show} mountOnEnter unmountOnExit>
      <Box className="fixed right-4 top-4 z-[9999] flex max-w-[340px] items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/95 p-3 shadow-[0_10px_20px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
        <Box className="flex items-center gap-3">
          <Box className="flex items-center justify-center rounded-lg bg-primary-50 p-2 text-primary-600">
            <DownloadIcon fontSize="small" />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              className="font-bold leading-tight text-gray-900"
            >
              Install App
            </Typography>
            <Typography variant="caption" className="font-medium text-gray-500">
              Add to home screen
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center gap-1">
          <Button
            variant="contained"
            onClick={handleInstall}
            size="small"
            disableElevation
            className="min-w-0 rounded-full bg-primary-600 px-4 py-1 text-xs font-bold normal-case text-white hover:bg-primary-700"
          >
            Get
          </Button>
          <IconButton
            size="small"
            onClick={() => setShow(false)}
            className="h-6 w-6 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
    </Slide>
  );
}
