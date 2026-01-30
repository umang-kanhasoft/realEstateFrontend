'use client';

import Card from '@/components/common/Card';
import { useProperty } from '@/hooks/useProperty';
import { Property } from '@/types';
import { formatArea, formatPrice, getPropertyTypeLabel } from '@/utils/helpers';
import {
  SquareFoot as AreaIcon,
  BathtubOutlined as BathtubIcon,
  BedOutlined as BedIcon,
  Compare as CompareIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'horizontal';
}

const PropertyCard = ({
  property,
  variant = 'default',
}: PropertyCardProps): JSX.Element => {
  const {
    state: { favorites, compareList },
    addToFavorites,
    removeFromFavorites,
    addToCompare,
    removeFromCompare,
  } = useProperty();

  const isFavorite = favorites.includes(property.id);
  const isInCompare = compareList.includes(property.id);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleFavoriteClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const handleCompareClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property.id);
    }
  };

  const primaryImage =
    property.images.find(img => img.isPrimary) || property.images[0];

  return (
    <Link href={`/properties/${property.slug}`}>
      <Card
        padding="none"
        className="group h-full cursor-pointer overflow-hidden"
      >
        {/* Image Container */}
        <Box className="relative h-64 w-full overflow-hidden">
          <Image
            src={primaryImage?.url || '/images/placeholder-property.jpg'}
            alt={property.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading Skeleton */}
          {!isImageLoaded && (
            <Box className="bg-secondary-200 absolute inset-0 animate-pulse" />
          )}

          {/* Overlay */}
          <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <Box className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Chip
              label={property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
              size="small"
              className={`font-semibold ${
                property.listingType === 'sale'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            />
            {property.isNew && (
              <Chip
                label="New"
                size="small"
                className="bg-orange-500 font-semibold text-white"
              />
            )}
            {property.isFeatured && (
              <Chip
                label="Featured"
                size="small"
                className="bg-yellow-500 font-semibold text-white"
              />
            )}
          </Box>

          {/* Action Buttons */}
          <Box className="absolute right-4 top-4 flex flex-col gap-2">
            <Tooltip
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <IconButton
                size="small"
                onClick={handleFavoriteClick}
                className="bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
              >
                {isFavorite ? (
                  <FavoriteIcon className="text-red-500" fontSize="small" />
                ) : (
                  <FavoriteBorderIcon
                    className="text-secondary-600"
                    fontSize="small"
                  />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              title={isInCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <IconButton
                size="small"
                onClick={handleCompareClick}
                className={`shadow-md backdrop-blur-sm ${
                  isInCompare
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-white/90 hover:bg-white'
                }`}
              >
                <CompareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Price */}
          <Box className="absolute bottom-4 left-4">
            <Typography
              variant="h5"
              className="font-bold text-white drop-shadow-lg"
            >
              {formatPrice(property.price)}
              {property.listingType === 'rent' && (
                <span className="text-sm font-normal">/month</span>
              )}
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box className="p-5">
          {/* Property Type */}
          <Typography
            variant="caption"
            className="text-primary-600 mb-1 font-medium uppercase tracking-wider"
          >
            {getPropertyTypeLabel(property.propertyType)}
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            className="text-secondary-900 group-hover:text-primary-600 mb-2 line-clamp-1 font-semibold transition-colors"
          >
            {property.title}
          </Typography>

          {/* Location */}
          <Box className="text-secondary-500 mb-4 flex items-center gap-1">
            <LocationIcon fontSize="small" />
            <Typography variant="body2" className="line-clamp-1">
              {property.address.city}, {property.address.state}
            </Typography>
          </Box>

          {/* Features */}
          <Box className="border-secondary-100 flex items-center justify-between border-t pt-4">
            <Box className="text-secondary-600 flex items-center gap-1">
              <BedIcon fontSize="small" />
              <Typography variant="body2">{property.bedrooms} Beds</Typography>
            </Box>
            <Box className="text-secondary-600 flex items-center gap-1">
              <BathtubIcon fontSize="small" />
              <Typography variant="body2">
                {property.bathrooms} Baths
              </Typography>
            </Box>
            <Box className="text-secondary-600 flex items-center gap-1">
              <AreaIcon fontSize="small" />
              <Typography variant="body2">
                {formatArea(property.area, property.areaUnit)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export default PropertyCard;
