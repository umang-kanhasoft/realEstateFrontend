'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  Drawer,
  IconButton,
  Chip,
  Pagination,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Close as CloseIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/property/PropertyCard';
import SectionTitle from '@/components/common/SectionTitle';
import { useProperty } from '@/hooks/useProperty';
import { useUI } from '@/hooks/useUI';
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  CITIES,
  BEDROOM_OPTIONS,
  PRICE_RANGES,
  SORT_OPTIONS,
} from '@/utils/constants';
import { filterProperties, sortProperties } from '@/utils/helpers';
import { PropertyFilter } from '@/types';

const ITEMS_PER_PAGE = 9;

export default function PropertiesPage(): JSX.Element {
  const searchParams = useSearchParams();
  const { state: propertyState, setFilters, resetFilters } = useProperty();
  const { state: uiState, toggleFilterDrawer, closeFilterDrawer } = useUI();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [localFilters, setLocalFilters] = useState<PropertyFilter>({
    ...propertyState.filters,
  });

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams.get('type') || 'all';
    const listing = searchParams.get('listing') || 'all';
    const location = searchParams.get('location') || '';
    const query = searchParams.get('q') || '';

    setLocalFilters((prev) => ({
      ...prev,
      propertyType: type as PropertyFilter['propertyType'],
      listingType: listing as PropertyFilter['listingType'],
      city: location,
      searchQuery: query,
    }));
  }, [searchParams]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(propertyState.properties, localFilters);
    return sortProperties(filtered, localFilters.sortBy);
  }, [propertyState.properties, localFilters]);

  // Paginate properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const handleFilterChange = (
    field: keyof PropertyFilter,
    value: string | number | string[]
  ): void => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleApplyFilters = (): void => {
    setFilters(localFilters);
    closeFilterDrawer();
  };

  const handleResetFilters = (): void => {
    resetFilters();
    setLocalFilters(propertyState.filters);
    setCurrentPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (localFilters.propertyType !== 'all') count++;
    if (localFilters.listingType !== 'all') count++;
    if (localFilters.city) count++;
    if (localFilters.searchQuery) count++;
    return count;
  }, [localFilters]);

  const FilterContent = (): JSX.Element => (
    <Box className="space-y-6 p-4">
      {/* Search */}
      <TextField
        label="Search"
        placeholder="Search properties..."
        value={localFilters.searchQuery}
        onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: <SearchIcon className="text-secondary-400" />,
        }}
      />

      {/* Property Type */}
      <TextField
        select
        label="Property Type"
        value={localFilters.propertyType}
        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
        fullWidth
      >
        {PROPERTY_TYPES.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Listing Type */}
      <TextField
        select
        label="Buy or Rent"
        value={localFilters.listingType}
        onChange={(e) => handleFilterChange('listingType', e.target.value)}
        fullWidth
      >
        {LISTING_TYPES.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </TextField>

      {/* City */}
      <TextField
        select
        label="City"
        value={localFilters.city}
        onChange={(e) => handleFilterChange('city', e.target.value)}
        fullWidth
      >
        {CITIES.map((city) => (
          <MenuItem key={city.value} value={city.value}>
            {city.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Bedrooms */}
      <TextField
        select
        label="Bedrooms"
        value={localFilters.minBedrooms.toString()}
        onChange={(e) =>
          handleFilterChange('minBedrooms', parseInt(e.target.value) || 0)
        }
        fullWidth
      >
        {BEDROOM_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Sort By */}
      <TextField
        select
        label="Sort By"
        value={localFilters.sortBy}
        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        fullWidth
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Action Buttons */}
      <Box className="flex gap-3">
        <Button
          variant="outlined"
          fullWidth
          onClick={handleResetFilters}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleApplyFilters}
          sx={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Hero Section */}
      <Box
        className="relative bg-cover bg-center py-24"
        sx={{
          backgroundImage: 'url(/images/properties-hero.jpg)',
        }}
      >
        <Box className="absolute inset-0 bg-primary-900/80" />
        <Container maxWidth="xl" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Typography
              variant="h2"
              className="mb-4 font-heading font-bold text-white"
            >
              Explore Our Properties
            </Typography>
            <Typography className="mx-auto max-w-2xl text-lg text-white/80">
              Browse through our extensive collection of premium properties
              and find your perfect home.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Properties Section */}
      <Box className="bg-secondary-50 py-16">
        <Container maxWidth="xl">
          {/* Toolbar */}
          <Box className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Box className="flex items-center gap-2">
              <Typography variant="h6" className="text-secondary-900">
                {filteredProperties.length} Properties Found
              </Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  label={`${activeFiltersCount} filters`}
                  size="small"
                  onDelete={handleResetFilters}
                  className="bg-primary-100 text-primary-700"
                />
              )}
            </Box>

            <Box className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <Box className="hidden rounded-lg border border-secondary-200 p-1 md:flex">
                <IconButton
                  size="small"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : ''}
                >
                  <GridViewIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary-100 text-primary-600' : ''}
                >
                  <ListViewIcon />
                </IconButton>
              </Box>

              {/* Mobile Filter Button */}
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={toggleFilterDrawer}
                className="lg:hidden"
              >
                Filters
                {activeFiltersCount > 0 && (
                  <Chip
                    label={activeFiltersCount}
                    size="small"
                    className="ml-2 h-5 w-5 bg-primary-600 text-white"
                  />
                )}
              </Button>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Desktop Filters Sidebar */}
            <Grid item xs={12} lg={3} className="hidden lg:block">
              <Box className="sticky top-32 rounded-2xl bg-white p-6 shadow-card">
                <Typography variant="h6" className="mb-4 font-semibold">
                  Filter Properties
                </Typography>
                <FilterContent />
              </Box>
            </Grid>

            {/* Properties Grid */}
            <Grid item xs={12} lg={9}>
              {paginatedProperties.length > 0 ? (
                <>
                  <Grid container spacing={3}>
                    {paginatedProperties.map((property, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={viewMode === 'grid' ? 4 : 12}
                        key={property.id}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <PropertyCard
                            property={property}
                            variant={viewMode === 'list' ? 'horizontal' : 'default'}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box className="mt-12 flex justify-center">
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                      />
                    </Box>
                  )}
                </>
              ) : (
                <Box className="rounded-2xl bg-white py-16 text-center shadow-card">
                  <Typography variant="h5" className="mb-2 text-secondary-900">
                    No Properties Found
                  </Typography>
                  <Typography className="mb-4 text-secondary-600">
                    Try adjusting your filters to find more properties.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={uiState.isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        PaperProps={{
          sx: { width: '100%', maxWidth: '400px' },
        }}
      >
        <Box className="flex items-center justify-between border-b border-secondary-100 p-4">
          <Typography variant="h6" className="font-semibold">
            Filter Properties
          </Typography>
          <IconButton onClick={closeFilterDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FilterContent />
      </Drawer>
    </>
  );
}