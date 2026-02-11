'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { useProperty } from '@/hooks/useProperty';
import { formatCurrency } from '@/lib/utils/format';
import { Property, PropertyImage } from '@/types';
import { formatArea } from '@/utils/helpers';
import {
  SquareFoot as AreaIcon,
  BathtubOutlined as BathtubIcon,
  BedOutlined as BedIcon,
  Compare as CompareIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Phone,
  WhatsApp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
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
    state: { compareList },
    addToCompare,
    removeFromCompare,
  } = useProperty();

  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite(property.id);
  const isInCompare = compareList.includes(property.id);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const handleFavoriteClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
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
    typeof property.images[0] === 'string'
      ? property.images[0]
      : (property.images as PropertyImage[])[0]?.url ||
        '/images/placeholder-property.jpg';

  // --- Horizontal Variant (List View - Compact & Minimal) ---
  if (variant === 'horizontal') {
    return (
      <Card className="group mb-4 flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-black/5 hover:shadow-lg md:h-[180px] md:flex-row">
        {/* Image Section - Compact Fixed Width */}
        <Box className="relative h-48 w-full shrink-0 overflow-hidden bg-gray-100 md:h-full md:w-[260px] lg:w-[280px]">
          <Link
            href={`/properties/${property.slug}`}
            className="block h-full w-full"
          >
            <Image
              src={primaryImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />

            {/* Badges: Featured / Eco-Friendly only */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
              {property.isFeatured && (
                <span className="w-fit rounded bg-yellow-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black shadow-sm">
                  Featured
                </span>
              )}
              {property.ecoFriendly && (
                <span className="w-fit rounded bg-green-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Eco
                </span>
              )}
            </div>
            {/* Favorite Button on Image (Minimal style) */}
            <IconButton
              className="absolute right-2 top-2 z-10 bg-black/20 text-white backdrop-blur-[2px] hover:bg-white hover:text-red-500"
              size="small"
              onClick={handleFavoriteClick}
              sx={{ padding: '4px' }}
            >
              {isFav ? (
                <FavoriteIcon sx={{ fontSize: 16 }} className="text-red-500" />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </Link>
        </Box>

        {/* Content Section - Compact Layout */}
        <Box className="flex flex-1 flex-col justify-between px-4 py-3 md:px-5">
          {/* Top Row: Title, Location & Price */}
          <div className="flex flex-col justify-between gap-1 md:flex-row md:items-start">
            <div className="min-w-0 flex-1 pr-2">
              <Link href={`/properties/${property.slug}`}>
                <Typography
                  variant="h6"
                  className="truncate text-base font-bold text-gray-900 hover:text-primary-600 md:text-lg"
                >
                  {property.title}
                </Typography>
              </Link>
              <div className="flex items-center gap-1 text-gray-500">
                <LocationIcon className="text-gray-400" sx={{ fontSize: 14 }} />
                <Typography variant="body2" className="truncate text-xs">
                  {property.location ||
                    (property.address?.city
                      ? `${property.address.city}, ${property.address.state}`
                      : 'Location not available')}
                </Typography>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-row items-baseline gap-1 md:flex-col md:items-end md:gap-0">
              <Typography
                variant="h6"
                className="text-lg font-bold text-primary-600 md:text-xl"
              >
                {formatCurrency(property.price)}
              </Typography>
              {property.listingType === 'rent' && (
                <Typography
                  variant="caption"
                  className="text-[10px] text-gray-500"
                >
                  /month
                </Typography>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600 md:mt-0">
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <BedIcon sx={{ fontSize: 16 }} className="text-gray-400" />
                <span className="font-semibold">{property.bedrooms}</span> Beds
              </div>
            )}
            <div className="hidden h-3 w-px bg-gray-300 sm:block"></div>
            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <BathtubIcon sx={{ fontSize: 16 }} className="text-gray-400" />
                <span className="font-semibold">{property.bathrooms}</span>{' '}
                Baths
              </div>
            )}
            <div className="hidden h-3 w-px bg-gray-300 sm:block"></div>
            <div className="flex items-center gap-1.5">
              <AreaIcon sx={{ fontSize: 16 }} className="text-gray-400" />
              <span className="font-semibold">
                {property.area
                  ? property.area.replace(/(sqft|Sq-ft)/i, '').trim()
                  : property.size || 0}
              </span>
              Sq. Ft.
            </div>

            {/* Status Pill */}
            <span
              className={`ml-auto hidden rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide md:inline-flex ${
                property.status === 'Ready to Move'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              {property.status}
            </span>
          </div>

          {/* Bottom Row: Builder & Actions */}
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 md:mt-2 md:pt-2">
            <div className="flex items-center gap-1.5">
              <Typography variant="caption" className="text-xs text-gray-500">
                By
              </Typography>
              <Typography
                variant="caption"
                className="max-w-[200px] truncate text-xs text-gray-900"
              >
                {property.builders && property.builders.length > 0 ? (
                  property.builders.map((builder, index) => (
                    <span key={builder.id}>
                      <Link
                        href={`/builders/${builder.id}`}
                        className="font-bold hover:text-primary-600 hover:underline"
                        onClick={e => e.stopPropagation()}
                      >
                        {builder.name}
                      </Link>
                      {index < property.builders!.length - 1 && ', '}
                    </span>
                  ))
                ) : (
                  <span className="font-bold">
                    {property.builder || 'Builder'}
                  </span>
                )}
              </Typography>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip title="Compare">
                <IconButton
                  size="small"
                  onClick={handleCompareClick}
                  className={`h-7 w-7 ${isInCompare ? 'text-primary-600' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  <CompareIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="WhatsApp">
                <IconButton
                  size="small"
                  className="h-7 w-7 text-green-600 hover:bg-green-50"
                >
                  <WhatsApp sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Call">
                <IconButton
                  size="small"
                  className="h-7 w-7 text-blue-600 hover:bg-blue-50"
                >
                  <Phone sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>

              <Link href={`/properties/${property.slug}`} className="ml-1">
                <Button
                  variant="outlined"
                  size="small"
                  className="min-w-[80px] rounded-full border-gray-300 px-3 py-1 text-xs font-bold text-black hover:border-black hover:bg-black hover:text-white"
                  sx={{ textTransform: 'none', height: '28px' }}
                >
                  Details
                </Button>
              </Link>
            </div>
          </div>
        </Box>
      </Card>
    );
  }

  // --- Default Variant (Grid View) ---
  return (
    <Card className="group h-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
      {/* Image Container */}
      <Box className="relative h-64 w-full overflow-hidden">
        <Link
          href={`/properties/${property.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={primaryImage}
            alt={property.title}
            fill
            className={`object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading Skeleton */}
          {!isImageLoaded && (
            <Box className="absolute inset-0 animate-pulse bg-secondary-200" />
          )}

          {/* Gradient Overlay */}
          <Box className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges: Featured / Eco-Friendly only */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
            {property.isFeatured && (
              <span className="w-fit rounded-lg bg-yellow-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg backdrop-blur-sm">
                Featured
              </span>
            )}
            {property.ecoFriendly && (
              <span className="w-fit rounded-lg bg-green-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                Eco Friendly
              </span>
            )}
          </div>

          {/* Price */}
          <Box className="absolute bottom-3 left-3">
            <Typography
              variant="h5"
              className="text-xl font-bold text-white drop-shadow-lg"
            >
              {formatCurrency(property.price)}
              {property.listingType === 'rent' && (
                <span className="text-sm font-normal">/month</span>
              )}
            </Typography>
          </Box>
        </Link>
        {/* Action Buttons */}
        <Box className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <Tooltip
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            arrow
          >
            <IconButton
              size="small"
              onClick={handleFavoriteClick}
              className={`shadow-lg transition-all duration-300 hover:scale-110 ${
                isFav
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-secondary-600 hover:bg-white'
              }`}
            >
              {isFav ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={isInCompare ? 'Remove from compare' : 'Add to compare'}
            arrow
          >
            <IconButton
              size="small"
              onClick={handleCompareClick}
              className={`shadow-lg transition-all duration-300 hover:scale-110 ${
                isInCompare
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-white/90 text-secondary-600 hover:bg-white'
              }`}
            >
              <CompareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Content */}
      <Box className="p-5">
        {/* Title */}
        <Link href={`/properties/${property.slug}`}>
          <Typography
            variant="h6"
            className="mb-2 truncate text-lg font-semibold text-secondary-900 transition-colors group-hover:text-primary-600"
          >
            {property.title}
          </Typography>
        </Link>

        {/* Location */}
        <Box className="mb-4 flex items-center gap-1 text-secondary-500">
          <LocationIcon className="text-primary-500" fontSize="small" />
          <Typography variant="body2" className="truncate">
            {property.location ||
              (property.address?.city
                ? `${property.address.city}, ${property.address.state}`
                : 'Location not available')}
          </Typography>
        </Box>

        {/* Features / Specs Chips */}
        <Box className="flex flex-wrap items-center gap-2 border-t border-secondary-100 pt-4">
          {property.bedrooms !== undefined && (
            <Box className="flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1.5 text-xs font-semibold text-secondary-700 transition-colors group-hover:bg-primary-50 group-hover:text-primary-700">
              <BedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" className="font-bold">
                {property.bedrooms} Beds
              </Typography>
            </Box>
          )}

          {property.bathrooms !== undefined && (
            <Box className="flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1.5 text-xs font-semibold text-secondary-700 transition-colors group-hover:bg-primary-50 group-hover:text-primary-700">
              <BathtubIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" className="font-bold">
                {property.bathrooms} Baths
              </Typography>
            </Box>
          )}

          <Box className="flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1.5 text-xs font-semibold text-secondary-700 transition-colors group-hover:bg-primary-50 group-hover:text-primary-700">
            <AreaIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" className="font-bold">
              {property.area
                ? property.area
                : property.size
                  ? `${property.size} ${property.areaUnit || 'sqft'}`
                  : formatArea(
                      property.area || '0',
                      property.areaUnit || 'sqft'
                    )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PropertyCard;
