import { Box, Typography } from '@mui/material';

interface OverviewItemProps {
  label: string;
  value: string;
}

export default function OverviewItem({ label, value }: OverviewItemProps) {
  return (
    <Box
      sx={{
        p: 2.5,
        border: '1px solid #ececec',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: '#fefefe',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        },
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary">
        {value}
      </Typography>
    </Box>
  );
}
