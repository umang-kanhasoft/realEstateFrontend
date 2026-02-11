import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface PropertyMedia {
  thumbnail: string;
  images: MediaImage[];
  videos: MediaVideo[];
  documents: MediaDocument[];
  brochureUrl: string;
  virtualTourUrl: string;
  masterPlanUrl: string;
}

export interface MediaImage {
  id: string;
  url: string;
  order: number;
}

export interface MediaVideo {
  id: string;
  url: string;
  order: number;
}

export interface MediaDocument {
  id: string;
  url: string;
  order: number;
}

export default function ProjectGallary({ media }: { media: PropertyMedia }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openImageModal, setOpenImageModal] = useState(false);

  return (
    <>
      <Grid container spacing={2} px={{ xs: 2, sm: 4, md: 6, lg: 10 }} mt={2}>
        {/* Main Large Image (Slider) */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              position: 'relative',
              height: { xs: 300, md: 500 },
            }}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={!isMobile}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={800}
              style={{ height: '100%', width: '100%' }}
            >
              {media?.images.map((img, idx: number) => (
                <SwiperSlide key={idx} onClick={() => setOpenImageModal(true)}>
                  <Box
                    component="img"
                    src={img.url}
                    alt={img.url}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
        </Grid>

        {/* Right Side Grid (Video + Small Images) */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={2} height="100%">
            {/* Video Card */}
            {media?.videos.length > 0 && (
              <Card
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: { xs: 200, md: 'calc(50% - 8px)' },
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {media?.videos.map((video, idx: number) => (
                  <SwiperSlide
                    key={idx}
                    onClick={() => setOpenImageModal(true)}
                  >
                    <video
                      src={video?.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Card>
            )}
            {/* Small Images Grid */}
            <Box
              // display="flex"
              gap={2}
              height={{ xs: 'auto', md: 'calc(50% - 8px)' }}
            >
              {media?.videos.length == 0 && (
                <Card
                  sx={{
                    flex: 1,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    height: { xs: 150, md: '100%' },
                  }}
                  onClick={() => setOpenImageModal(true)}
                >
                  <Image
                    src={media?.images[2]?.url}
                    className="h-full w-full object-cover"
                    alt="Small 2"
                    fill
                  />
                </Card>
              )}
              <Card
                sx={{
                  flex: 1,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  marginTop: '10px',
                  height: { xs: 150, md: '100%' },
                }}
                onClick={() => setOpenImageModal(true)}
              >
                <Image
                  src={media?.images[2]?.url}
                  className="h-full w-full object-cover"
                  alt="Small 2"
                  fill
                />
                {/* View All Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    transition: '0.3s',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  +{media?.images?.length - 3} Photos
                </Box>
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Full Screen Gallery Modal */}
      <Modal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        aria-labelledby="project-gallery-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95vw', md: '85vw' },
            height: '90vh',
            bgcolor: '#fff',
            borderRadius: '16px',
            boxShadow: 24,
            p: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #eee"
          >
            <Typography variant="h6" fontWeight={700}>
              Project Gallery
            </Typography>
            <IconButton onClick={() => setOpenImageModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ overflowY: 'auto', p: 3, flexGrow: 1 }}>
            <ImageList cols={isMobile ? 1 : 3} gap={16}>
              {media?.images.map(img => (
                <ImageListItem key={img.url}>
                  <Image
                    src={img.url}
                    alt={img.url}
                    fill
                    loading="lazy"
                    className="!relative cursor-pointer rounded-xl object-cover"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
