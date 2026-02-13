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

  const images = media?.images ?? [];
  const videos = media?.videos ?? [];
  const imageCount = images.length;
  const hasVideos = videos.length > 0;
  const isSingleImage = imageCount <= 1;

  const sidebarVisibleCount = hasVideos ? 1 : Math.min(imageCount - 1, 2);
  const remainingPhotos = Math.max(imageCount - 1 - sidebarVisibleCount, 0);

  const renderImageCard = (
    imgSrc: string | undefined,
    alt: string,
    height: Record<string, string | number>,
    overlay?: React.ReactNode,
    mt?: string | number
  ) => {
    if (!imgSrc) return null;
    return (
      <Card
        sx={{
          flex: 1,
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          height,
          ...(mt != null && { mt }),
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
        onClick={() => setOpenImageModal(true)}
      >
        <Image
          src={imgSrc}
          className="h-full w-full object-cover"
          alt={alt}
          fill
        />
        {overlay}
      </Card>
    );
  };

  const viewAllOverlay = remainingPhotos > 0 && (
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
      +{remainingPhotos} Photos
    </Box>
  );

  return (
    <>
      <Grid container spacing={2} px={{ xs: 2, sm: 4, md: 6, lg: 10 }} mt={2}>
        {/* Main Large Image / Slider — takes full width when only 1 image & no video */}
        <Grid item xs={12} md={isSingleImage && !hasVideos ? 12 : 8}>
          <Card
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              position: 'relative',
              height: { xs: 300, md: 500 },
            }}
          >
            {imageCount > 1 ? (
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={!isMobile}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                speed={800}
                style={{ height: '100%', width: '100%' }}
              >
                {images.map((img, idx) => (
                  <SwiperSlide
                    key={img.id || idx}
                    onClick={() => setOpenImageModal(true)}
                  >
                    <Box
                      component="img"
                      src={img.url}
                      alt={`Project image ${idx + 1}`}
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
            ) : (
              /* Single image — no slider needed */
              <Box
                component="img"
                src={images[0]?.url}
                alt="Project image"
                onClick={() => setOpenImageModal(true)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            )}
          </Card>
        </Grid>

        {/* Right Side Grid — hidden when only 1 image & no video */}
        {!(isSingleImage && !hasVideos) && (
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2} height="100%">
              {/* Top slot: Video if available, otherwise 2nd image */}
              {hasVideos ? (
                <Card
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: { xs: 200, md: 'calc(50% - 8px)' },
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenImageModal(true)}
                >
                  <video
                    src={videos[0]?.url}
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
                </Card>
              ) : (
                /* No video — show 2nd image in the top slot */
                renderImageCard(images[1]?.url, 'Project image 2', {
                  xs: 150,
                  md: 'calc(50% - 8px)',
                })
              )}

              {/* Bottom slot: next available image with "+N Photos" overlay */}
              {(() => {
                // Pick the next image that isn't already shown in the top slot
                const bottomImage = hasVideos ? images[1] : images[2];
                if (!bottomImage) return null;

                return renderImageCard(
                  bottomImage.url,
                  'View all photos',
                  { xs: 150, md: 'calc(50% - 8px)' },
                  viewAllOverlay
                );
              })()}
            </Box>
          </Grid>
        )}
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
              {images.map(img => (
                <ImageListItem key={img.id || img.url}>
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
