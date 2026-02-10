import { getAmenityIcon } from '@/utils/amenityIcons';
import { Box, Typography } from '@mui/material';

interface AmenityCardProps {
  title: string;
  image?: string; // Made optional since we're using icons now
}

export default function AmenityCard({ title }: AmenityCardProps) {
  const IconComponent = getAmenityIcon(title);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Icon */}
      <Box sx={{ textAlign: 'center' }}>
        <IconComponent
          sx={{
            fontSize: 28,
            color: '#757575',
            transition: 'transform 0.3s ease',
          }}
        />
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
