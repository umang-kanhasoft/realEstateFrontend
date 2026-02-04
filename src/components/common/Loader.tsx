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
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center"
    >
      <CircularProgress
        size={sizeMap[size]}
        thickness={4}
        className="text-primary-600"
      />
      {text && (
        <Typography
          variant="body2"
          className="mt-4 font-medium text-secondary-600"
        >
          {text}
        </Typography>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <Box className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </Box>
    );
  }

  return (
    <Box className="flex items-center justify-center py-12">{content}</Box>
  );
};

export default Loader;
