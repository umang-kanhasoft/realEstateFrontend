import { formatCurrency } from '@/lib/utils/format';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, Dialog, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export interface RoomDimensions {
  width: number;
  length: number;
}

export interface RoomDetails {
  kitchen: RoomDimensions;
  bedroom_2: RoomDimensions | null;
  bedroom_3: RoomDimensions | null;
  living_room: RoomDimensions;
  master_bedroom: RoomDimensions;
}

export interface FloorPlan {
  id: string;
  type: string;
  label: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetAreaSqft: number;
  builtUpAreaSqft: number;
  superBuiltUpAreaSqft: number;
  terraceAvailable: boolean;
  gardenAccess: boolean;
  orientation: string;
  price: number;
  currency: string;
  floor: null;
  viewType: string;
  parkingSpace: number;
  maintenanceCharges: number;
  totalUnits: number;
  availableUnits: number;
  floorPlanUrl: string;
  roomDetails: RoomDetails;
}

function FloorPlans({
  bhk,
  floorPlan,
}: {
  bhk: string;
  floorPlan: FloorPlan[];
}) {
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filter configurations by BHK type
  const filteredPlans = floorPlan.filter((item: FloorPlan) => {
    const bedrooms = item.bedrooms;
    return bedrooms.toString() === bhk;
  });

  const { mdGrid, smGrid } = pathname?.startsWith('/properties')
    ? { mdGrid: 6, smGrid: 6 }
    : { mdGrid: 4, smGrid: 6 };

  return (
    <>
      <Grid container spacing={3}>
        {filteredPlans.map((item: FloorPlan, index: number) => (
          <Grid item xs={12} sm={smGrid} md={mdGrid} key={item.id || index}>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #e0e0e0',
                p: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  transform: 'translateY(-5px)',
                  borderColor: 'primary.main',
                },
              }}
            >
              {/* Floor Plan Image */}
              <Box
                sx={{
                  height: 180,
                  backgroundColor: '#f5f7fa',
                  borderRadius: '12px',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed #d0d0d0',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {item.floorPlanUrl ? (
                  <Image
                    src={item.floorPlanUrl || '/images/house-icon.png'}
                    alt={`${item.label} Floor Plan`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{
                      objectFit: 'contain',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedImage(item.floorPlanUrl)}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Floor Plan Not Available
                  </Typography>
                )}
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                mb={1}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Price
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {formatCurrency(item.price)}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={item.label}
                  color="default"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" mb={1}>
                {item.carpetAreaSqft} Sqft Carpet Area
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={3}>
                <Box component="span" fontWeight={500} color="text.primary">
                  Super Built-up Area: {item.superBuiltUpAreaSqft} Sqft
                </Box>
              </Typography>

              {/* Additional Details */}
              <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                <Chip
                  size="small"
                  label={`${item.bedrooms} Bed`}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={`${item.bathrooms} Bath`}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={`${item.balconies} Balcony`}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={`${item.parkingSpace} Parking`}
                  variant="outlined"
                />
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={2}
              >
                {item.availableUnits} of {item.totalUnits} Units Available
              </Typography>

              {/* <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                Enquire Now
              </Button> */}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Full Size Image Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
          },
        }}
      >
        <Box sx={{ position: 'relative', p: 2 }}>
          <IconButton
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Floor Plan Full Size"
              width={1200}
              height={800}
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
}
export default FloorPlans;
