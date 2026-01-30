'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  BedOutlined as BedIcon,
  BathtubOutlined as BathtubIcon,
  SquareFoot as AreaIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  CalendarMonth as CalendarIcon,
  Check as CheckIcon,
  Pool as PoolIcon,
  FitnessCenter as GymIcon,
  LocalParking as ParkingIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Property } from '@/types';
import { useProperty } from '@/hooks/useProperty';
import { formatPrice, formatArea, getPropertyTypeLabel, formatDate } from '@/utils/helpers';
import ContactForm from '@/components/forms/ContactForm';
import Loader from '@/components/common/Loader';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps): JSX.Element | null => {
  if (value !== index) return null;
  return <Box className="py-6">{children}</Box>;
};

export default function PropertyDetailPage(): JSX.Element {
  const params = useParams();
  const { fetchPropertyById, state, addToFavorites, removeFromFavorites } = useProperty();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const isFavorite = property ? state.favorites.includes(property.id) : false;

  useEffect(() => {
    const loadProperty = async (): Promise<void> => {
      setLoading(true);
      const id = params.id as string;
      const data = await fetchPropertyById(id);
      setProperty(data);
      setLoading(false);
    };

    loadProperty();
  }, [params.id, fetchPropertyById]);

  if (loading) {
    return <Loader fullScreen text="Loading property details..." />;
  }

  if (!property) {
    notFound();
  }

  const handleFavoriteClick = (): void => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const handleShare = (): void => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.shortDescription,
        url: window.location.href,
      });
    }
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'Swimming Pool': <PoolIcon />,
    Gym: <GymIcon />,
    Parking: <ParkingIcon />,
    '24/7 Security': <SecurityIcon />,
  };

  return (
    <Box className="bg-secondary-50 pb-16">
      {/* Image Gallery */}
      <Box className="relative h-[60vh] min-h-[400px] bg-secondary-900">
        <Image
          src={property.images[selectedImage]?.url || '/images/placeholder-property.jpg'}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <Box className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Thumbnails */}
        <Box className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
          {property.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? 'border-white opacity-100'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </Box>

        {/* Badges */}
        <Box className="absolute left-4 top-4 flex gap-2">
          <Chip
            label={property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
            className={`font-semibold ${
              property.listingType === 'sale'
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          />
          {property.isNew && (
            <Chip
              label="New Listing"
              className="bg-orange-500 font-semibold text-white"
            />
          )}
        </Box>

        {/* Action Buttons */}
        <Box className="absolute right-4 top-4 flex gap-2">
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              onClick={handleFavoriteClick}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              {isFavorite ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton
              onClick={() => window.print()}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Container maxWidth="xl" className="-mt-20 relative z-10">
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white p-6 shadow-card md:p-8"
            >
              {/* Header */}
              <Box className="mb-6">
                <Typography
                  variant="caption"
                  className="mb-2 font-medium uppercase tracking-wider text-primary-600"
                >
                  {getPropertyTypeLabel(property.propertyType)}
                </Typography>
                <Typography
                  variant="h3"
                  className="mb-2 font-heading font-bold text-secondary-900"
                >
                  {property.title}
                </Typography>
                <Box className="flex items-center gap-1 text-secondary-600">
                  <LocationIcon fontSize="small" />
                  <Typography>{property.address.fullAddress}</Typography>
                </Box>
              </Box>

              {/* Price & Features */}
              <Box className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary-50 p-4">
                <Box>
                  <Typography
                    variant="h4"
                    className="font-bold text-primary-600"
                  >
                    {formatPrice(property.price)}
                    {property.listingType === 'rent' && (
                      <span className="text-lg font-normal text-secondary-600">
                        /month
                      </span>
                    )}
                  </Typography>
                  {property.pricePerSqFt > 0 && (
                    <Typography className="text-secondary-600">
                      ₹{property.pricePerSqFt.toLocaleString()} per sqft
                    </Typography>
                  )}
                </Box>
                <Box className="flex gap-6">
                  <Box className="text-center">
                    <Box className="flex items-center justify-center gap-1 text-secondary-600">
                      <BedIcon />
                      <Typography variant="h6" className="font-semibold">
                        {property.bedrooms}
                      </Typography>
                    </Box>
                    <Typography variant="caption" className="text-secondary-500">
                      Bedrooms
                    </Typography>
                  </Box>
                  <Box className="text-center">
                    <Box className="flex items-center justify-center gap-1 text-secondary-600">
                      <BathtubIcon />
                      <Typography variant="h6" className="font-semibold">
                        {property.bathrooms}
                      </Typography>
                    </Box>
                    <Typography variant="caption" className="text-secondary-500">
                      Bathrooms
                    </Typography>
                  </Box>
                  <Box className="text-center">
                    <Box className="flex items-center justify-center gap-1 text-secondary-600">
                      <AreaIcon />
                      <Typography variant="h6" className="font-semibold">
                        {property.area.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="caption" className="text-secondary-500">
                      Sqft
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Tabs */}
              <Box className="border-b border-secondary-200">
                <Tabs
                  value={activeTab}
                  onChange={(_, value) => setActiveTab(value)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Overview" />
                  <Tab label="Amenities" />
                  <Tab label="Location" />
                </Tabs>
              </Box>

              {/* Overview Tab */}
              <TabPanel value={activeTab} index={0}>
                <Typography
                  variant="h6"
                  className="mb-4 font-semibold text-secondary-900"
                >
                  Description
                </Typography>
                <Typography className="mb-6 whitespace-pre-line text-secondary-600">
                  {property.description}
                </Typography>

                <Typography
                  variant="h6"
                  className="mb-4 font-semibold text-secondary-900"
                >
                  Property Details
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: 'Property Type', value: getPropertyTypeLabel(property.propertyType) },
                    { label: 'Year Built', value: property.yearBuilt },
                    { label: 'Parking Spaces', value: property.parkingSpaces },
                    { label: 'Area', value: formatArea(property.area, property.areaUnit) },
                  ].map((detail) => (
                    <Grid item xs={6} md={3} key={detail.label}>
                      <Box className="rounded-lg bg-secondary-50 p-3">
                        <Typography variant="caption" className="text-secondary-500">
                          {detail.label}
                        </Typography>
                        <Typography className="font-semibold text-secondary-900">
                          {detail.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Amenities Tab */}
              <TabPanel value={activeTab} index={1}>
                <Typography
                  variant="h6"
                  className="mb-4 font-semibold text-secondary-900"
                >
                  Amenities & Features
                </Typography>
                <Grid container spacing={2}>
                  {property.amenities.map((amenity) => (
                    <Grid item xs={6} sm={4} key={amenity.id}>
                      <Box className="flex items-center gap-3 rounded-lg bg-secondary-50 p-3">
                        <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          {amenityIcons[amenity.name] || <CheckIcon />}
                        </Box>
                        <Typography className="font-medium text-secondary-700">
                          {amenity.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Location Tab */}
              <TabPanel value={activeTab} index={2}>
                <Typography
                  variant="h6"
                  className="mb-4 font-semibold text-secondary-900"
                >
                  Location
                </Typography>
                <Box className="mb-4">
                  <Typography className="text-secondary-600">
                    {property.address.fullAddress}
                  </Typography>
                </Box>
                <Box className="aspect-video overflow-hidden rounded-xl bg-secondary-200">
                  {/* Map placeholder - you can integrate Google Maps or similar */}
                  <Box className="flex h-full items-center justify-center text-secondary-500">
                    <Typography>Map will be displayed here</Typography>
                  </Box>
                </Box>
              </TabPanel>
            </motion.div>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box className="space-y-6">
              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-card"
              >
                <Typography
                  variant="h6"
                  className="mb-4 font-semibold text-secondary-900"
                >
                  Listed By
                </Typography>
                <Box className="mb-4 flex items-center gap-4">
                  <Avatar
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    sx={{ width: 64, height: 64 }}
                  />
                  <Box>
                    <Typography className="font-semibold text-secondary-900">
                      {property.agent.name}
                    </Typography>
                    <Typography variant="body2" className="text-secondary-600">
                      {property.agent.role}
                    </Typography>
                  </Box>
                </Box>
                <Divider className="my-4" />
                <Box className="space-y-3">
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PhoneIcon />}
                    href={`tel:${property.agent.phone}`}
                    sx={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    }}
                  >
                    Call Agent
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<WhatsAppIcon />}
                    href={`https://wa.me/${property.agent.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EmailIcon />}
                    href={`mailto:${property.agent.email}`}
                  >
                    Email Agent
                  </Button>
                </Box>
              </motion.div>

              {/* Schedule Visit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-white p-6 shadow-card"
              >
                <Typography
                  variant="h6"
                  className="mb-4 font-semibold text-secondary-900"
                >
                  Schedule a Visit
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CalendarIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  }}
                >
                  Book Appointment
                </Button>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ContactForm />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}