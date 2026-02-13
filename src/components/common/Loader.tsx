'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  small: 24,
  medium: 40,
  large: 60,
};

const Loader = ({
  size = 'medium',
  text,
  fullScreen = false,
}: LoaderProps): JSX.Element => {
  // Define the sleek modern design
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center rounded-3xl border border-white/20 bg-white/60 p-8 backdrop-blur-md"
    >
      <CircularProgress
        size={sizeMap[size]}
        thickness={5}
        // Custom color using theme or direct hex
        className="text-primary-600"
      />
      {text && (
        <Typography
          variant="subtitle2"
          className="mt-5 font-semibold tracking-wide text-slate-700"
        >
          {text}
        </Typography>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <Box className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-sm">
        {content}
      </Box>
    );
  }

  return (
    <Box className="flex items-center justify-center py-12">{content}</Box>
  );
};

export default Loader;
