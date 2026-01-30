'use client';

import { useProperty } from '@/hooks/useProperty';
import {
  PropertyFilter as PropertyFilterType,
  PropertyListingType,
  PropertyType,
} from '@/types';
import {
  AMENITIES_LIST,
  BEDROOM_OPTIONS,
  CITIES,
  LISTING_TYPES,
  PROPERTY_TYPES,
} from '@/utils/constants';
import { classNames, formatPrice } from '@/utils/helpers';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';

interface PropertyFilterProps {
  variant?: 'sidebar' | 'horizontal' | 'compact';
  showSearch?: boolean;
  showAmenities?: boolean;
  onFilterChange?: (filters: Partial<PropertyFilterType>) => void;
  onReset?: () => void;
  className?: string;
}

interface PriceRange {
  min: number;
  max: number;
}

const DEFAULT_PRICE_RANGE: PriceRange = {
  min: 0,
  max: 100000000,
};

const DEFAULT_AREA_RANGE = {
  min: 0,
  max: 10000,
};

const PropertyFilter = ({
  variant = 'sidebar',
  showSearch = true,
  showAmenities = true,
  onFilterChange,
  onReset,
  className,
}: PropertyFilterProps): JSX.Element => {
  const { state, setFilters, resetFilters } = useProperty();
  const [expandedSection, setExpandedSection] = useState<string | false>(
    'property-type'
  );
  const [priceRange, setPriceRange] = useState<number[]>([
    DEFAULT_PRICE_RANGE.min,
    DEFAULT_PRICE_RANGE.max,
  ]);
  const [areaRange, setAreaRange] = useState<number[]>([
    DEFAULT_AREA_RANGE.min,
    DEFAULT_AREA_RANGE.max,
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (state.filters.searchQuery) count++;
    if (state.filters.propertyType !== 'all') count++;
    if (state.filters.listingType !== 'all') count++;
    if (state.filters.city) count++;
    if (state.filters.minBedrooms > 0) count++;
    if (state.filters.minPrice > 0) count++;
    if (state.filters.maxPrice < Infinity) count++;
    if (state.filters.amenities.length > 0)
      count += state.filters.amenities.length;
    return count;
  }, [state.filters]);

  // Handle section expansion
  const handleSectionChange =
    (section: string) =>
    (_event: React.SyntheticEvent, isExpanded: boolean): void => {
      setExpandedSection(isExpanded ? section : false);
    };

  // Handle search input
  const handleSearchChange = useCallback(
    (value: string): void => {
      setFilters({ searchQuery: value });
      onFilterChange?.({ searchQuery: value });
    },
    [setFilters, onFilterChange]
  );

  // Handle property type change
  const handlePropertyTypeChange = useCallback(
    (type: PropertyType | 'all'): void => {
      setFilters({ propertyType: type });
      onFilterChange?.({ propertyType: type });
    },
    [setFilters, onFilterChange]
  );

  // Handle listing type change
  const handleListingTypeChange = useCallback(
    (type: PropertyListingType | 'all'): void => {
      setFilters({ listingType: type });
      onFilterChange?.({ listingType: type });
    },
    [setFilters, onFilterChange]
  );

  // Handle city change
  const handleCityChange = useCallback(
    (city: string): void => {
      setFilters({ city });
      onFilterChange?.({ city });
    },
    [setFilters, onFilterChange]
  );

  // Handle bedrooms change
  const handleBedroomsChange = useCallback(
    (bedrooms: number): void => {
      setFilters({ minBedrooms: bedrooms });
      onFilterChange?.({ minBedrooms: bedrooms });
    },
    [setFilters, onFilterChange]
  );

  // Handle price range change
  const handlePriceRangeChange = useCallback(
    (_event: Event, newValue: number | number[]): void => {
      const [min, max] = newValue as number[];
      setPriceRange([min, max]);
    },
    []
  );

  // Handle price range commit
  const handlePriceRangeCommit = useCallback(
    (
      _event: React.SyntheticEvent | Event,
      newValue: number | number[]
    ): void => {
      const [min, max] = newValue as number[];
      setFilters({ minPrice: min, maxPrice: max });
      onFilterChange?.({ minPrice: min, maxPrice: max });
    },
    [setFilters, onFilterChange]
  );

  // Handle area range change
  const handleAreaRangeChange = useCallback(
    (_event: Event, newValue: number | number[]): void => {
      const [min, max] = newValue as number[];
      setAreaRange([min, max]);
    },
    []
  );

  // Handle area range commit
  const handleAreaRangeCommit = useCallback(
    (
      _event: React.SyntheticEvent | Event,
      newValue: number | number[]
    ): void => {
      const [min, max] = newValue as number[];
      setFilters({ minArea: min, maxArea: max });
      onFilterChange?.({ minArea: min, maxArea: max });
    },
    [setFilters, onFilterChange]
  );

  // Handle amenity toggle
  const handleAmenityToggle = useCallback(
    (amenityId: string): void => {
      const newAmenities = selectedAmenities.includes(amenityId)
        ? selectedAmenities.filter(id => id !== amenityId)
        : [...selectedAmenities, amenityId];

      setSelectedAmenities(newAmenities);
      setFilters({ amenities: newAmenities });
      onFilterChange?.({ amenities: newAmenities });
    },
    [selectedAmenities, setFilters, onFilterChange]
  );

  // Handle reset filters
  const handleResetFilters = useCallback((): void => {
    resetFilters();
    setPriceRange([DEFAULT_PRICE_RANGE.min, DEFAULT_PRICE_RANGE.max]);
    setAreaRange([DEFAULT_AREA_RANGE.min, DEFAULT_AREA_RANGE.max]);
    setSelectedAmenities([]);
    onReset?.();
  }, [resetFilters, onReset]);

  // Remove single filter
  const handleRemoveFilter = useCallback(
    (filterKey: keyof PropertyFilterType, value?: string): void => {
      switch (filterKey) {
        case 'searchQuery':
          setFilters({ searchQuery: '' });
          break;
        case 'propertyType':
          setFilters({ propertyType: 'all' });
          break;
        case 'listingType':
          setFilters({ listingType: 'all' });
          break;
        case 'city':
          setFilters({ city: '' });
          break;
        case 'minBedrooms':
          setFilters({ minBedrooms: 0 });
          break;
        case 'minPrice':
        case 'maxPrice':
          setFilters({ minPrice: 0, maxPrice: Infinity });
          setPriceRange([DEFAULT_PRICE_RANGE.min, DEFAULT_PRICE_RANGE.max]);
          break;
        case 'amenities':
          if (value) {
            const newAmenities = selectedAmenities.filter(id => id !== value);
            setSelectedAmenities(newAmenities);
            setFilters({ amenities: newAmenities });
          }
          break;
        default:
          break;
      }
    },
    [setFilters, selectedAmenities]
  );

  // Format price for slider
  const formatPriceLabel = (value: number): string => {
    return formatPrice(value, 'INR');
  };

  // Render active filters chips
  const renderActiveFilters = (): JSX.Element | null => {
    if (activeFiltersCount === 0) return null;

    return (
      <Box className="mb-4">
        <Box className="flex flex-wrap gap-2">
          <AnimatePresence>
            {state.filters.searchQuery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Chip
                  label={`Search: ${state.filters.searchQuery}`}
                  onDelete={() => handleRemoveFilter('searchQuery')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </motion.div>
            )}

            {state.filters.propertyType !== 'all' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Chip
                  label={`Type: ${state.filters.propertyType}`}
                  onDelete={() => handleRemoveFilter('propertyType')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </motion.div>
            )}

            {state.filters.listingType !== 'all' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Chip
                  label={`${state.filters.listingType === 'sale' ? 'For Sale' : 'For Rent'}`}
                  onDelete={() => handleRemoveFilter('listingType')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </motion.div>
            )}

            {state.filters.city && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Chip
                  label={`City: ${state.filters.city}`}
                  onDelete={() => handleRemoveFilter('city')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </motion.div>
            )}

            {state.filters.minBedrooms > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Chip
                  label={`${state.filters.minBedrooms}+ Beds`}
                  onDelete={() => handleRemoveFilter('minBedrooms')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </motion.div>
            )}

            {(state.filters.minPrice > 0 ||
              state.filters.maxPrice < Infinity) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Chip
                  label={`Price: ${formatPrice(state.filters.minPrice)} - ${formatPrice(state.filters.maxPrice)}`}
                  onDelete={() => handleRemoveFilter('minPrice')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </motion.div>
            )}

            {selectedAmenities.map(amenityId => {
              const amenity = AMENITIES_LIST.find(a => a.id === amenityId);
              return amenity ? (
                <motion.div
                  key={amenityId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Chip
                    label={amenity.name}
                    onDelete={() => handleRemoveFilter('amenities', amenityId)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </Box>

        {activeFiltersCount > 1 && (
          <Button
            size="small"
            onClick={handleResetFilters}
            startIcon={<ClearIcon />}
            className="mt-2"
            sx={{ textTransform: 'none' }}
          >
            Clear all filters
          </Button>
        )}
      </Box>
    );
  };

  // Render sidebar variant
  const renderSidebarFilter = (): JSX.Element => (
    <Box className={classNames('filter-container', className)}>
      {/* Header */}
      <Box className="mb-6 flex items-center justify-between">
        <Box className="flex items-center gap-2">
          <FilterListIcon className="text-primary-600" />
          <Typography variant="h6" className="font-semibold">
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              color="primary"
              sx={{ height: 24, minWidth: 24 }}
            />
          )}
        </Box>
        {activeFiltersCount > 0 && (
          <Button
            size="small"
            onClick={handleResetFilters}
            sx={{ textTransform: 'none' }}
          >
            Reset
          </Button>
        )}
      </Box>

      {/* Active Filters */}
      {renderActiveFilters()}

      {/* Search */}
      {showSearch && (
        <Box className="mb-6">
          <TextField
            fullWidth
            placeholder="Search properties..."
            value={state.filters.searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-secondary-400" />
                </InputAdornment>
              ),
              endAdornment: state.filters.searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleSearchChange('')}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
        </Box>
      )}

      {/* Listing Type */}
      <Accordion
        expanded={expandedSection === 'listing-type'}
        onChange={handleSectionChange('listing-type')}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-medium">Listing Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-wrap gap-2">
            {LISTING_TYPES.map(type => (
              <Chip
                key={type.value}
                label={type.label}
                onClick={() =>
                  handleListingTypeChange(
                    type.value as PropertyListingType | 'all'
                  )
                }
                color={
                  state.filters.listingType === type.value
                    ? 'primary'
                    : 'default'
                }
                variant={
                  state.filters.listingType === type.value
                    ? 'filled'
                    : 'outlined'
                }
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Property Type */}
      <Accordion
        expanded={expandedSection === 'property-type'}
        onChange={handleSectionChange('property-type')}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className="flex items-center gap-2">
            <HomeIcon fontSize="small" className="text-primary-600" />
            <Typography className="font-medium">Property Type</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {PROPERTY_TYPES.map(type => (
              <FormControlLabel
                key={type.value}
                control={
                  <Checkbox
                    checked={state.filters.propertyType === type.value}
                    onChange={() =>
                      handlePropertyTypeChange(
                        type.value as PropertyType | 'all'
                      )
                    }
                    size="small"
                  />
                }
                label={type.label}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                  },
                }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Location */}
      <Accordion
        expanded={expandedSection === 'location'}
        onChange={handleSectionChange('location')}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className="flex items-center gap-2">
            <LocationOnIcon fontSize="small" className="text-primary-600" />
            <Typography className="font-medium">Location</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            select
            fullWidth
            size="small"
            value={state.filters.city}
            onChange={e => handleCityChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          >
            {CITIES.map(city => (
              <MenuItem key={city.value} value={city.value}>
                {city.label}
              </MenuItem>
            ))}
          </TextField>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Bedrooms */}
      <Accordion
        expanded={expandedSection === 'bedrooms'}
        onChange={handleSectionChange('bedrooms')}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className="flex items-center gap-2">
            <BedIcon fontSize="small" className="text-primary-600" />
            <Typography className="font-medium">Bedrooms</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-wrap gap-2">
            {BEDROOM_OPTIONS.map(option => (
              <Chip
                key={option.value}
                label={option.label}
                onClick={() =>
                  handleBedroomsChange(
                    option.value === 'any' ? 0 : parseInt(option.value)
                  )
                }
                color={
                  state.filters.minBedrooms ===
                  (option.value === 'any' ? 0 : parseInt(option.value))
                    ? 'primary'
                    : 'default'
                }
                variant={
                  state.filters.minBedrooms ===
                  (option.value === 'any' ? 0 : parseInt(option.value))
                    ? 'filled'
                    : 'outlined'
                }
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Price Range */}
      <Accordion
        expanded={expandedSection === 'price'}
        onChange={handleSectionChange('price')}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className="flex items-center gap-2">
            <AttachMoneyIcon fontSize="small" className="text-primary-600" />
            <Typography className="font-medium">Price Range</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="px-2">
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              onChangeCommitted={handlePriceRangeCommit}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPriceLabel}
              min={DEFAULT_PRICE_RANGE.min}
              max={DEFAULT_PRICE_RANGE.max}
              step={500000}
              sx={{
                '& .MuiSlider-valueLabel': {
                  fontSize: '0.75rem',
                },
              }}
            />
            <Box className="mt-2 flex justify-between">
              <Typography variant="caption" className="text-secondary-500">
                {formatPrice(priceRange[0])}
              </Typography>
              <Typography variant="caption" className="text-secondary-500">
                {formatPrice(priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Area Range */}
      <Accordion
        expanded={expandedSection === 'area'}
        onChange={handleSectionChange('area')}
        elevation={0}
        sx={{
          '&:before': { display: 'none' },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className="flex items-center gap-2">
            <SquareFootIcon fontSize="small" className="text-primary-600" />
            <Typography className="font-medium">Area (sqft)</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="px-2">
            <Slider
              value={areaRange}
              onChange={handleAreaRangeChange}
              onChangeCommitted={handleAreaRangeCommit}
              valueLabelDisplay="auto"
              min={DEFAULT_AREA_RANGE.min}
              max={DEFAULT_AREA_RANGE.max}
              step={100}
            />
            <Box className="mt-2 flex justify-between">
              <Typography variant="caption" className="text-secondary-500">
                {areaRange[0].toLocaleString()} sqft
              </Typography>
              <Typography variant="caption" className="text-secondary-500">
                {areaRange[1].toLocaleString()} sqft
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Amenities */}
      {showAmenities && (
        <>
          <Divider />
          <Accordion
            expanded={expandedSection === 'amenities'}
            onChange={handleSectionChange('amenities')}
            elevation={0}
            sx={{
              '&:before': { display: 'none' },
              backgroundColor: 'transparent',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="font-medium">Amenities</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {AMENITIES_LIST.map(amenity => (
                  <FormControlLabel
                    key={amenity.id}
                    control={
                      <Checkbox
                        checked={selectedAmenities.includes(amenity.id)}
                        onChange={() => handleAmenityToggle(amenity.id)}
                        size="small"
                      />
                    }
                    label={amenity.name}
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        </>
      )}

      {/* Apply Button */}
      <Box className="mt-6 space-y-3">
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          }}
        >
          Apply Filters
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          onClick={handleResetFilters}
          disabled={activeFiltersCount === 0}
          sx={{
            borderRadius: 3,
            py: 1.5,
          }}
        >
          Reset All
        </Button>
      </Box>
    </Box>
  );

  // Render horizontal variant
  const renderHorizontalFilter = (): JSX.Element => (
    <Box
      className={classNames('rounded-2xl bg-white p-4 shadow-card', className)}
    >
      <Box className="flex flex-wrap items-center gap-4">
        {/* Search */}
        {showSearch && (
          <TextField
            placeholder="Search..."
            value={state.filters.searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            size="small"
            sx={{
              minWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-secondary-400" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* Property Type */}
        <TextField
          select
          size="small"
          value={state.filters.propertyType}
          onChange={e =>
            handlePropertyTypeChange(e.target.value as PropertyType | 'all')
          }
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          {PROPERTY_TYPES.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Listing Type */}
        <TextField
          select
          size="small"
          value={state.filters.listingType}
          onChange={e =>
            handleListingTypeChange(
              e.target.value as PropertyListingType | 'all'
            )
          }
          sx={{
            minWidth: 130,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          {LISTING_TYPES.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>

        {/* City */}
        <TextField
          select
          size="small"
          value={state.filters.city}
          onChange={e => handleCityChange(e.target.value)}
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          {CITIES.map(city => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Advanced Toggle */}
        <Button
          variant="text"
          onClick={() => setShowAdvanced(!showAdvanced)}
          endIcon={
            <ExpandMoreIcon className={showAdvanced ? 'rotate-180' : ''} />
          }
          sx={{ textTransform: 'none' }}
        >
          More Filters
        </Button>

        {/* Reset */}
        {activeFiltersCount > 0 && (
          <Button
            variant="text"
            onClick={handleResetFilters}
            startIcon={<ClearIcon />}
            sx={{ textTransform: 'none' }}
          >
            Clear
          </Button>
        )}
      </Box>

      {/* Advanced Filters */}
      <Collapse in={showAdvanced}>
        <Box className="border-secondary-200 mt-4 border-t pt-4">
          <Box className="flex flex-wrap items-center gap-4">
            {/* Bedrooms */}
            <Box className="flex items-center gap-2">
              <Typography variant="body2" className="text-secondary-600">
                Beds:
              </Typography>
              <Box className="flex gap-1">
                {BEDROOM_OPTIONS.slice(0, 5).map(option => (
                  <Chip
                    key={option.value}
                    label={option.value === 'any' ? 'Any' : option.value}
                    size="small"
                    onClick={() =>
                      handleBedroomsChange(
                        option.value === 'any' ? 0 : parseInt(option.value)
                      )
                    }
                    color={
                      state.filters.minBedrooms ===
                      (option.value === 'any' ? 0 : parseInt(option.value))
                        ? 'primary'
                        : 'default'
                    }
                    variant={
                      state.filters.minBedrooms ===
                      (option.value === 'any' ? 0 : parseInt(option.value))
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                ))}
              </Box>
            </Box>

            {/* Price Range */}
            <Box className="flex items-center gap-2" sx={{ minWidth: 250 }}>
              <Typography variant="body2" className="text-secondary-600">
                Price:
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                onChangeCommitted={handlePriceRangeCommit}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPriceLabel}
                min={DEFAULT_PRICE_RANGE.min}
                max={DEFAULT_PRICE_RANGE.max}
                step={500000}
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Box className="border-secondary-200 mt-4 border-t pt-4">
          {renderActiveFilters()}
        </Box>
      )}
    </Box>
  );

  // Render compact variant
  const renderCompactFilter = (): JSX.Element => (
    <Box className={classNames('flex flex-wrap items-center gap-2', className)}>
      {LISTING_TYPES.map(type => (
        <Chip
          key={type.value}
          label={type.label}
          onClick={() =>
            handleListingTypeChange(type.value as PropertyListingType | 'all')
          }
          color={
            state.filters.listingType === type.value ? 'primary' : 'default'
          }
          variant={
            state.filters.listingType === type.value ? 'filled' : 'outlined'
          }
        />
      ))}
      <Divider orientation="vertical" flexItem />
      {PROPERTY_TYPES.slice(1).map(type => (
        <Chip
          key={type.value}
          label={type.label}
          onClick={() =>
            handlePropertyTypeChange(type.value as PropertyType | 'all')
          }
          color={
            state.filters.propertyType === type.value ? 'primary' : 'default'
          }
          variant={
            state.filters.propertyType === type.value ? 'filled' : 'outlined'
          }
        />
      ))}
    </Box>
  );

  // Return based on variant
  switch (variant) {
    case 'horizontal':
      return renderHorizontalFilter();
    case 'compact':
      return renderCompactFilter();
    default:
      return renderSidebarFilter();
  }
};

export default PropertyFilter;
