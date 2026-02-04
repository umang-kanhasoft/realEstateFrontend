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
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Box className="fixed bottom-6 left-6 right-6 z-[9999] mx-auto flex max-w-[500px] items-center justify-between gap-4 rounded-3xl border border-white/50 bg-white/95 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
        <Box className="flex items-center gap-4">
          <Box className="flex items-center justify-center rounded-xl bg-primary-50 p-3 text-primary-600">
            <DownloadIcon />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              className="font-bold leading-tight text-gray-900"
            >
              Install Real Estate
            </Typography>
            <Typography
              variant="body2"
              className="text-sm font-medium text-gray-500"
            >
              Add to home screen for the best experience
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center gap-2">
          <Button
            variant="contained"
            onClick={handleInstall}
            size="small"
            disableElevation
            className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold normal-case text-white hover:bg-primary-700"
          >
            Install
          </Button>
          <IconButton
            size="small"
            onClick={() => setShow(false)}
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Slide>
  );
}
