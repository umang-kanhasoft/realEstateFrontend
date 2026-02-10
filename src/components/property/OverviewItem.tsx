import { Box, Tooltip, Typography } from '@mui/material';

interface OverviewItemProps {
  label: string;
  value: string;
}

export default function OverviewItem({ label, value }: OverviewItemProps) {
  const shouldTruncate = value.length > 15;
  const displayValue = shouldTruncate ? `${value.slice(0, 15)}...` : value;

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
      <Tooltip title={shouldTruncate ? value : ''} arrow placement="top">
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="text.primary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayValue}
        </Typography>
      </Tooltip>
    </Box>
  );
}
