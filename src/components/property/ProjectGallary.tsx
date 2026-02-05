import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
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

export default function ProjectGallary() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openImageModal, setOpenImageModal] = useState(false);

  const DummyImage = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Exterior View',
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      title: 'Living Room',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
      title: 'Master Bedroom',
    },
    {
      image: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
      title: 'Kitchen',
    },
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      title: 'Balcony',
    },
    {
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7',
      title: 'Swimming Pool',
    },
  ];

  const video =
    'https://media.istockphoto.com/id/1453963806/video/time-lapse-low-angle-of-tall-corporate-buildings-skyscraper-with-reflection-of-clouds-among.mp4?s=mp4-640x640-is&k=20&c=RIpYsVqpNXm-KOaMcpsMY80maM3p2SyEbjTTMxTqzz8=';

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
              {DummyImage.map((img, idx) => (
                <SwiperSlide key={idx} onClick={() => setOpenImageModal(true)}>
                  <Box
                    component="img"
                    src={img.image}
                    alt={img.title}
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
              <video
                src={video}
                autoPlay
                muted
                loop
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                  p: 1,
                }}
              >
                <PlayCircleOutlineIcon sx={{ fontSize: 48 }} />
              </Box>
            </Card>

            {/* Small Images Grid */}
            <Box
              display="flex"
              gap={2}
              height={{ xs: 'auto', md: 'calc(50% - 8px)' }}
            >
              <Card
                sx={{
                  flex: 1,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: { xs: 150, md: '100%' },
                }}
                onClick={() => setOpenImageModal(true)}
              >
                <Image
                  src={DummyImage[1].image}
                  className="h-full w-full object-cover"
                  alt="Small 1"
                />
              </Card>

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
                  src={DummyImage[2].image}
                  className="h-full w-full object-cover"
                  alt="Small 2"
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
                  +{DummyImage.length - 3} Photos
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
              {DummyImage.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{ borderRadius: '12px', overflow: 'hidden' }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`h-full w-full cursor-pointer rounded-xl object-cover ${isMobile ? 'h-200' : 'h-250'}`}
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
