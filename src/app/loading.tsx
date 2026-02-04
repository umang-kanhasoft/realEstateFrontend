import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading(): JSX.Element {
  return (
    <Box
      className="flex min-h-screen flex-col items-center justify-center"
      sx={{ bgcolor: 'background.default' }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography
        variant="h6"
        className="mt-4 animate-pulse text-secondary-600"
      >
        Loading...
      </Typography>
    </Box>
  );
}
