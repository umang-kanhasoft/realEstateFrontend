import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface Landmark {
  id: string;
  type: string;
  name: string;
  distanceKm: number;
  travelTimeMin: number;
}

interface NearbyLandmarksProps {
  landmarks: Landmark[];
}

export default function NearbyLandmarks({ landmarks }: NearbyLandmarksProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        What&apos;s Nearby
      </Typography>

      <Box display="flex" gap={3} overflow="auto" pb={2}>
        {landmarks.map(landmark => (
          <Box
            key={landmark.id}
            sx={{
              minWidth: 200,
              flexShrink: 0,
            }}
          >
            <Card
              sx={{
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box key={landmark.id}>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="text.primary"
                      gutterBottom
                      sx={{ lineHeight: 1.3 }}
                    >
                      {landmark.name}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      color="text.secondary"
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {landmark.distanceKm} km
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
