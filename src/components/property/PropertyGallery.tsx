'use client';

import { PropertyImage } from '@/types';
import { classNames } from '@/utils/helpers';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import GridViewIcon from '@mui/icons-material/GridView';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import {
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Keyboard, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title?: string;
  variant?: 'default' | 'grid' | 'slider';
  showThumbnails?: boolean;
  showFullscreen?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

const PropertyGallery = ({
  images,
  title = 'Property Gallery',
  variant = 'default',
  showThumbnails = true,
  showFullscreen = true,
  autoplay = false,
  autoplayDelay = 5000,
  className,
}: PropertyGalleryProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const galleryRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            mainSwiper?.slidePrev();
            break;
          case 'ArrowRight':
            mainSwiper?.slideNext();
            break;
          case 'Escape':
            setIsFullscreen(false);
            break;
          case ' ':
            e.preventDefault();
            setIsPlaying(prev => !prev);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, mainSwiper]);

  // Handle autoplay
  useEffect(() => {
    if (mainSwiper) {
      if (isPlaying) {
        mainSwiper.autoplay?.start();
      } else {
        mainSwiper.autoplay?.stop();
      }
    }
  }, [isPlaying, mainSwiper]);

  // Handle image load
  const handleImageLoad = useCallback((index: number): void => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  // Handle slide change
  const handleSlideChange = useCallback((swiper: SwiperType): void => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback(
    (index: number): void => {
      mainSwiper?.slideTo(index);
      setActiveIndex(index);
    },
    [mainSwiper]
  );

  // Handle fullscreen toggle
  const handleFullscreenToggle = useCallback((): void => {
    setIsFullscreen(prev => !prev);
    setShowGrid(false);
  }, []);

  // Handle zoom toggle
  const handleZoomToggle = useCallback((): void => {
    if (mainSwiper) {
      if (isZoomed) {
        mainSwiper.zoom?.out();
      } else {
        mainSwiper.zoom?.in();
      }
      setIsZoomed(prev => !prev);
    }
  }, [mainSwiper, isZoomed]);

  // Render thumbnail strip
  const renderThumbnails = (): JSX.Element => (
    <Box className="mt-4">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView="auto"
        watchSlidesProgress
        className="!overflow-visible"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className="!h-16 !w-20 cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={classNames(
                'relative h-full w-full overflow-hidden rounded-lg border-2 transition-all duration-200',
                activeIndex === index
                  ? 'border-primary-500 shadow-md'
                  : 'hover:border-secondary-300 border-transparent'
              )}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
              {activeIndex === index && (
                <Box className="bg-primary-500/20 absolute inset-0" />
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );

  // Render grid view
  const renderGridView = (): JSX.Element => (
    <Box className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
          onClick={() => {
            setActiveIndex(index);
            setShowGrid(false);
          }}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <Box className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
            <ZoomInIcon className="text-4xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Box>
        </motion.div>
      ))}
    </Box>
  );

  // Render main gallery
  const renderMainGallery = (): JSX.Element => (
    <Box ref={galleryRef} className={classNames('relative', className)}>
      {/* Main Image */}
      <Box className="bg-secondary-100 relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Swiper
          onSwiper={setMainSwiper}
          onSlideChange={handleSlideChange}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs, Zoom, Autoplay, Keyboard]}
          navigation={{
            prevEl: '.gallery-prev',
            nextEl: '.gallery-next',
          }}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
          }}
          autoplay={
            autoplay
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
          keyboard={{
            enabled: true,
          }}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <div className="swiper-zoom-container h-full">
                {/* Loading Skeleton */}
                {!imageLoaded[index] && (
                  <Box className="animate-shimmer bg-secondary-200 absolute inset-0" />
                )}

                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className={classNames(
                    'object-cover transition-opacity duration-300',
                    imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                  )}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={index === 0}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <IconButton
          className="gallery-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white"
          sx={{
            '&.swiper-button-disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          className="gallery-next absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white"
          sx={{
            '&.swiper-button-disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Image Counter */}
        <Box className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
          {activeIndex + 1} / {images.length}
        </Box>

        {/* Action Buttons */}
        <Box className="absolute bottom-4 right-4 z-10 flex gap-2">
          {autoplay && (
            <IconButton
              onClick={() => setIsPlaying(prev => !prev)}
              className="bg-black/60 text-white hover:bg-black/80"
              size="small"
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          )}
          <IconButton
            onClick={() => setShowGrid(prev => !prev)}
            className="bg-black/60 text-white hover:bg-black/80"
            size="small"
          >
            <GridViewIcon />
          </IconButton>
          {showFullscreen && (
            <IconButton
              onClick={handleFullscreenToggle}
              className="bg-black/60 text-white hover:bg-black/80"
              size="small"
            >
              <FullscreenIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Thumbnails */}
      {showThumbnails && !isMobile && renderThumbnails()}

      {/* Grid View Modal */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-auto bg-white p-6"
          >
            <Box className="mx-auto max-w-6xl">
              <Box className="mb-6 flex items-center justify-between">
                <Typography variant="h5" className="font-semibold">
                  {title} ({images.length} photos)
                </Typography>
                <IconButton onClick={() => setShowGrid(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {renderGridView()}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );

  // Render fullscreen modal
  const renderFullscreenModal = (): JSX.Element => (
    <Modal
      open={isFullscreen}
      onClose={handleFullscreenToggle}
      closeAfterTransition
    >
      <Fade in={isFullscreen}>
        <Box className="fixed inset-0 flex flex-col bg-black">
          {/* Header */}
          <Box className="flex items-center justify-between p-4 text-white">
            <Typography variant="h6">{title}</Typography>
            <Box className="flex items-center gap-2">
              <Typography variant="body2" className="mr-4">
                {activeIndex + 1} / {images.length}
              </Typography>
              {autoplay && (
                <IconButton
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="text-white"
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              )}
              <IconButton onClick={handleZoomToggle} className="text-white">
                {isZoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
              </IconButton>
              <IconButton
                onClick={() => setShowGrid(true)}
                className="text-white"
              >
                <GridViewIcon />
              </IconButton>
              <IconButton
                onClick={handleFullscreenToggle}
                className="text-white"
              >
                <FullscreenExitIcon />
              </IconButton>
              <IconButton
                onClick={handleFullscreenToggle}
                className="text-white"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Main Content */}
          <Box className="relative flex-1">
            <Swiper
              onSwiper={setMainSwiper}
              onSlideChange={handleSlideChange}
              initialSlide={activeIndex}
              modules={[Navigation, Zoom, Autoplay, Keyboard]}
              navigation
              zoom={{
                maxRatio: 4,
                minRatio: 1,
              }}
              autoplay={
                isPlaying
                  ? {
                      delay: autoplayDelay,
                      disableOnInteraction: false,
                    }
                  : false
              }
              keyboard={{
                enabled: true,
              }}
              className="h-full"
            >
              {images.map(image => (
                <SwiperSlide key={image.id}>
                  <div className="swiper-zoom-container flex h-full items-center justify-center">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* Thumbnail Strip */}
          <Box className="bg-black/80 p-4">
            <Box className="flex justify-center gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  whileHover={{ scale: 1.1 }}
                  className={classNames(
                    'relative h-12 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all',
                    activeIndex === index
                      ? 'border-white'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );

  // Return based on variant
  if (variant === 'grid') {
    return <Box className={className}>{renderGridView()}</Box>;
  }

  return (
    <>
      {renderMainGallery()}
      {renderFullscreenModal()}
    </>
  );
};

export default PropertyGallery;
