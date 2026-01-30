'use client';

import Card from '@/components/common/Card';
import { useProperty } from '@/hooks/useProperty';
import { Property } from '@/types';
import {
  classNames,
  formatPrice,
  formatRelativeTime,
  getPropertyTypeLabel,
  getStatusLabel,
} from '@/utils/helpers';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DirectionsIcon from '@mui/icons-material/Directions';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface PropertyDetailsProps {
  property: Property;
  variant?: 'full' | 'compact' | 'card';
  showAgent?: boolean;
  showActions?: boolean;
  showAmenities?: boolean;
  showDescription?: boolean;
  className?: string;
}

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps): JSX.Element => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`property-tabpanel-${index}`}
    aria-labelledby={`property-tab-${index}`}
  >
    {value === index && <Box className="py-6">{children}</Box>}
  </Box>
);

const PropertyDetails = ({
  property,
  variant = 'full',
  showAgent = true,
  showActions = true,
  showAmenities = true,
  showDescription = true,
  className,
}: PropertyDetailsProps): JSX.Element => {
  const {
    state,
    addToFavorites,
    removeFromFavorites,
    addToCompare,
    removeFromCompare,
  } = useProperty();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [descriptionExpanded, setDescriptionExpanded] =
    useState<boolean>(false);

  const isFavorite = state.favorites.includes(property.id);
  const isInCompare = state.compareList.includes(property.id);

  // Memoized values
  const priceDisplay = useMemo(
    () => formatPrice(property.price, property.currency),
    [property.price, property.currency]
  );

  const pricePerSqftDisplay = useMemo(
    () => `₹${property.pricePerSqFt.toLocaleString()}/sqft`,
    [property.pricePerSqFt]
  );

  const statusColor = useMemo(() => {
    switch (property.status) {
      case 'for-sale':
        return 'success';
      case 'for-rent':
        return 'info';
      case 'sold':
        return 'error';
      case 'rented':
        return 'warning';
      default:
        return 'default';
    }
  }, [property.status]);

  // Handle favorite toggle
  const handleFavoriteToggle = (): void => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  // Handle compare toggle
  const handleCompareToggle = (): void => {
    if (isInCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  // Handle share
  const handleShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  // Handle print
  const handlePrint = (): void => {
    window.print();
  };

  // Render key features
  const renderKeyFeatures = (): JSX.Element => (
    <Grid container spacing={3} className="mt-6">
      <Grid item xs={6} sm={3}>
        <Box className="bg-secondary-50 flex flex-col items-center rounded-xl p-4 text-center">
          <Box className="bg-primary-100 text-primary-600 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
            <BedIcon />
          </Box>
          <Typography variant="h5" className="font-bold">
            {property.bedrooms}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            Bedrooms
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box className="bg-secondary-50 flex flex-col items-center rounded-xl p-4 text-center">
          <Box className="bg-primary-100 text-primary-600 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
            <BathtubIcon />
          </Box>
          <Typography variant="h5" className="font-bold">
            {property.bathrooms}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            Bathrooms
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box className="bg-secondary-50 flex flex-col items-center rounded-xl p-4 text-center">
          <Box className="bg-primary-100 text-primary-600 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
            <SquareFootIcon />
          </Box>
          <Typography variant="h5" className="font-bold">
            {property.area.toLocaleString()}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            Sq.Ft.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box className="bg-secondary-50 flex flex-col items-center rounded-xl p-4 text-center">
          <Box className="bg-primary-100 text-primary-600 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
            <LocalParkingIcon />
          </Box>
          <Typography variant="h5" className="font-bold">
            {property.parkingSpaces}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            Parking
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  // Render property highlights
  const renderHighlights = (): JSX.Element => (
    <Box className="mt-6">
      <Typography variant="h6" className="mb-4 font-semibold">
        Property Highlights
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Box className="text-secondary-600 flex items-center gap-2">
            <HomeIcon fontSize="small" className="text-primary-600" />
            <Typography variant="body2">
              Type: {getPropertyTypeLabel(property.propertyType)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box className="text-secondary-600 flex items-center gap-2">
            <CalendarTodayIcon fontSize="small" className="text-primary-600" />
            <Typography variant="body2">
              Built in {property.yearBuilt}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box className="text-secondary-600 flex items-center gap-2">
            <VisibilityIcon fontSize="small" className="text-primary-600" />
            <Typography variant="body2">
              {property.views.toLocaleString()} views
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box className="text-secondary-600 flex items-center gap-2">
            <UpdateIcon fontSize="small" className="text-primary-600" />
            <Typography variant="body2">
              Updated {formatRelativeTime(property.updatedAt)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  // Render description
  const renderDescription = (): JSX.Element => {
    const description = property.description;
    const isLong = description.length > 500;
    const displayText =
      isLong && !descriptionExpanded
        ? description.substring(0, 500) + '...'
        : description;

    return (
      <Box>
        <Typography variant="h6" className="mb-4 font-semibold">
          Description
        </Typography>
        <Typography
          variant="body1"
          className="text-secondary-600 whitespace-pre-line leading-relaxed"
        >
          {displayText}
        </Typography>
        {isLong && (
          <Button
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
            endIcon={
              descriptionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
            sx={{ mt: 2, textTransform: 'none' }}
          >
            {descriptionExpanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
      </Box>
    );
  };

  // Render amenities
  const renderAmenities = (): JSX.Element => (
    <Box>
      <Typography variant="h6" className="mb-4 font-semibold">
        Amenities & Features
      </Typography>
      <Grid container spacing={2}>
        {property.amenities.map(amenity => (
          <Grid item xs={6} sm={4} md={3} key={amenity.id}>
            <Box className="bg-secondary-50 flex items-center gap-3 rounded-xl p-3">
              <Box className="bg-primary-100 text-primary-600 flex h-10 w-10 items-center justify-center rounded-full">
                <CheckCircleIcon fontSize="small" />
              </Box>
              <Typography variant="body2" className="font-medium">
                {amenity.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Render location
  const renderLocation = (): JSX.Element => (
    <Box>
      <Typography variant="h6" className="mb-4 font-semibold">
        Location
      </Typography>
      <Box className="mb-4 flex items-start gap-2">
        <LocationOnIcon className="text-primary-600 mt-0.5" />
        <Box>
          <Typography variant="body1" className="font-medium">
            {property.address.fullAddress}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            {property.address.city}, {property.address.state} -{' '}
            {property.address.zipCode}
          </Typography>
        </Box>
      </Box>

      {/* Map Placeholder */}
      <Box className="bg-secondary-100 relative h-64 overflow-hidden rounded-xl">
        <Box className="absolute inset-0 flex items-center justify-center">
          <Box className="text-center">
            <LocationOnIcon
              sx={{ fontSize: 48 }}
              className="text-secondary-400 mb-2"
            />
            <Typography variant="body2" className="text-secondary-500">
              Map View
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        variant="outlined"
        startIcon={<DirectionsIcon />}
        href={`https://www.google.com/maps/dir/?api=1&destination=${property.address.coordinates.lat},${property.address.coordinates.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4"
        sx={{ textTransform: 'none' }}
      >
        Get Directions
      </Button>
    </Box>
  );

  // Render agent card
  const renderAgentCard = (): JSX.Element => (
    <Paper className="rounded-2xl p-6" elevation={2}>
      <Typography variant="h6" className="mb-4 font-semibold">
        Listed By
      </Typography>
      <Box className="mb-4 flex items-center gap-4">
        <Avatar
          src={property.agent.avatar}
          alt={property.agent.name}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="subtitle1" className="font-semibold">
            {property.agent.name}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            {property.agent.role}
          </Typography>
          <Box className="mt-1 flex items-center gap-1">
            <Typography variant="caption" className="text-secondary-500">
              ⭐ {property.agent.rating} • {property.agent.propertiesSold}{' '}
              properties sold
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider className="my-4" />

      <Box className="space-y-3">
        <Button
          fullWidth
          variant="contained"
          startIcon={<PhoneIcon />}
          href={`tel:${property.agent.phone}`}
          sx={{
            borderRadius: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          }}
        >
          Call Now
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<WhatsAppIcon />}
          href={`https://wa.me/${property.agent.phone.replace(/\D/g, '')}`}
          target="_blank"
          sx={{ borderRadius: 3, py: 1.5 }}
        >
          WhatsApp
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<EmailIcon />}
          href={`mailto:${property.agent.email}`}
          sx={{ borderRadius: 3, py: 1.5 }}
        >
          Email
        </Button>
      </Box>
    </Paper>
  );

  // Render full variant
  const renderFullDetails = (): JSX.Element => (
    <Box className={classNames('space-y-6', className)}>
      {/* Header Section */}
      <Paper className="rounded-2xl p-6 md:p-8" elevation={2}>
        {/* Badges */}
        <Box className="mb-4 flex flex-wrap gap-2">
          <Chip
            label={getStatusLabel(property.status)}
            color={
              statusColor as
                | 'success'
                | 'info'
                | 'error'
                | 'warning'
                | 'default'
            }
            size="small"
          />
          <Chip
            label={getPropertyTypeLabel(property.propertyType)}
            variant="outlined"
            size="small"
          />
          {property.isFeatured && (
            <Chip label="Featured" color="secondary" size="small" />
          )}
          {property.isNew && (
            <Chip label="New Listing" color="warning" size="small" />
          )}
        </Box>

        {/* Title and Location */}
        <Typography variant="h4" className="mb-2 font-heading font-bold">
          {property.title}
        </Typography>
        <Box className="text-secondary-600 mb-4 flex items-center gap-1">
          <LocationOnIcon fontSize="small" />
          <Typography variant="body1">
            {property.address.fullAddress}
          </Typography>
        </Box>

        {/* Price */}
        <Box className="mb-6 flex flex-wrap items-baseline gap-4">
          <Typography variant="h3" className="text-primary-600 font-bold">
            {priceDisplay}
            {property.listingType === 'rent' && (
              <Typography
                component="span"
                variant="h6"
                className="text-secondary-500 ml-1 font-normal"
              >
                /month
              </Typography>
            )}
          </Typography>
          <Typography variant="body2" className="text-secondary-500">
            {pricePerSqftDisplay}
          </Typography>
        </Box>

        {/* Key Features */}
        {renderKeyFeatures()}

        {/* Action Buttons */}
        {showActions && (
          <Box className="border-secondary-200 mt-6 flex flex-wrap gap-3 border-t pt-6">
            <Tooltip
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Button
                variant={isFavorite ? 'contained' : 'outlined'}
                startIcon={
                  isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
                onClick={handleFavoriteToggle}
                color={isFavorite ? 'error' : 'primary'}
                sx={{ borderRadius: 2 }}
              >
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            </Tooltip>
            <Tooltip title="Share property">
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShare}
                sx={{ borderRadius: 2 }}
              >
                Share
              </Button>
            </Tooltip>
            <Tooltip
              title={isInCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <Button
                variant={isInCompare ? 'contained' : 'outlined'}
                startIcon={<CompareArrowsIcon />}
                onClick={handleCompareToggle}
                sx={{ borderRadius: 2 }}
              >
                Compare
              </Button>
            </Tooltip>
            <Tooltip title="Print property details">
              <IconButton onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Paper>

      {/* Tabs Section */}
      <Paper className="overflow-hidden rounded-2xl" elevation={2}>
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tab label="Overview" />
          <Tab label="Amenities" />
          <Tab label="Location" />
        </Tabs>

        <Box className="p-6 md:p-8">
          <TabPanel value={activeTab} index={0}>
            {showDescription && renderDescription()}
            {renderHighlights()}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {showAmenities && renderAmenities()}
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            {renderLocation()}
          </TabPanel>
        </Box>
      </Paper>

      {/* Agent Card */}
      {showAgent && renderAgentCard()}
    </Box>
  );

  // Render compact variant
  const renderCompactDetails = (): JSX.Element => (
    <Card className={classNames('p-6', className)}>
      {/* Badges */}
      <Box className="mb-3 flex gap-2">
        <Chip
          label={getStatusLabel(property.status)}
          color={
            statusColor as 'success' | 'info' | 'error' | 'warning' | 'default'
          }
          size="small"
        />
        {property.isNew && <Chip label="New" color="warning" size="small" />}
      </Box>

      {/* Title */}
      <Typography variant="h6" className="mb-2 line-clamp-2 font-semibold">
        {property.title}
      </Typography>

      {/* Location */}
      <Box className="text-secondary-500 mb-3 flex items-center gap-1">
        <LocationOnIcon fontSize="small" />
        <Typography variant="body2" className="line-clamp-1">
          {property.address.city}, {property.address.state}
        </Typography>
      </Box>

      {/* Price */}
      <Typography variant="h5" className="text-primary-600 mb-4 font-bold">
        {priceDisplay}
        {property.listingType === 'rent' && (
          <span className="text-secondary-500 text-sm font-normal">/mo</span>
        )}
      </Typography>

      {/* Features */}
      <Box className="border-secondary-100 flex items-center justify-between border-t py-3">
        <Box className="text-secondary-600 flex items-center gap-1">
          <BedIcon fontSize="small" />
          <Typography variant="body2">{property.bedrooms}</Typography>
        </Box>
        <Box className="text-secondary-600 flex items-center gap-1">
          <BathtubIcon fontSize="small" />
          <Typography variant="body2">{property.bathrooms}</Typography>
        </Box>
        <Box className="text-secondary-600 flex items-center gap-1">
          <SquareFootIcon fontSize="small" />
          <Typography variant="body2">{property.area}</Typography>
        </Box>
      </Box>

      {/* Actions */}
      {showActions && (
        <Box className="mt-4 flex gap-2">
          <IconButton
            size="small"
            onClick={handleFavoriteToggle}
            color={isFavorite ? 'error' : 'default'}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton size="small" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <Button
            fullWidth
            variant="contained"
            size="small"
            component={Link}
            href={`/properties/${property.slug}`}
            sx={{ borderRadius: 2 }}
          >
            View Details
          </Button>
        </Box>
      )}
    </Card>
  );

  // Return based on variant
  switch (variant) {
    case 'compact':
      return renderCompactDetails();
    case 'card':
      return renderCompactDetails();
    default:
      return renderFullDetails();
  }
};

export default PropertyDetails;
