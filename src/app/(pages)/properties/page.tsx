'use client';

import PropertyChatbot from '@/components/common/PropertyChatbot';
import PropertyCard from '@/components/property/PropertyCard';
import { useProperty } from '@/hooks/useProperty';
import { useUI } from '@/hooks/useUI';
import { PropertyFilter } from '@/types';
import {
  BEDROOM_OPTIONS,
  CITIES,
  LISTING_TYPES,
  PROPERTY_TYPES,
  SORT_OPTIONS,
} from '@/utils/constants';
import { filterProperties, sortProperties } from '@/utils/helpers';
import {
  Close as CloseIcon,
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 9;

export default function PropertiesPage(): JSX.Element {
  const searchParams = useSearchParams();
  const { state: propertyState, setFilters, resetFilters } = useProperty();
  const { state: uiState, closeFilterDrawer } = useUI();

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

    setLocalFilters(prev => ({
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
    setLocalFilters(prev => ({ ...prev, [field]: value }));
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

  // Staggered Animation Logic
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const FilterContent = (): JSX.Element => (
    <Box className="space-y-6">
      {/* Search */}
      <Box>
        <Typography
          variant="subtitle2"
          className="mb-2 ml-1 font-bold text-gray-700"
        >
          Search
        </Typography>
        <TextField
          placeholder="Search properties..."
          value={localFilters.searchQuery}
          onChange={e => handleFilterChange('searchQuery', e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          className="bg-gray-50/50"
          InputProps={{
            endAdornment: <SearchIcon className="text-gray-400" />,
            classes: { root: 'rounded-xl' },
          }}
        />
      </Box>

      {/* Property Type */}
      <Box>
        <Typography
          variant="subtitle2"
          className="mb-2 ml-1 font-bold text-gray-700"
        >
          Property Type
        </Typography>
        <TextField
          select
          value={localFilters.propertyType}
          onChange={e => handleFilterChange('propertyType', e.target.value)}
          fullWidth
          size="small"
          InputProps={{ classes: { root: 'rounded-xl bg-gray-50/50' } }}
        >
          {PROPERTY_TYPES.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Listing Type */}
      <Box>
        <Typography
          variant="subtitle2"
          className="mb-2 ml-1 font-bold text-gray-700"
        >
          Listing Type
        </Typography>
        <TextField
          select
          value={localFilters.listingType}
          onChange={e => handleFilterChange('listingType', e.target.value)}
          fullWidth
          size="small"
          InputProps={{ classes: { root: 'rounded-xl bg-gray-50/50' } }}
        >
          {LISTING_TYPES.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* City */}
      <Box>
        <Typography
          variant="subtitle2"
          className="mb-2 ml-1 font-bold text-gray-700"
        >
          Location
        </Typography>
        <TextField
          select
          value={localFilters.city}
          onChange={e => handleFilterChange('city', e.target.value)}
          fullWidth
          size="small"
          InputProps={{ classes: { root: 'rounded-xl bg-gray-50/50' } }}
        >
          {CITIES.map(city => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Bedrooms */}
      <Box>
        <Typography
          variant="subtitle2"
          className="mb-2 ml-1 font-bold text-gray-700"
        >
          Bedrooms
        </Typography>
        <TextField
          select
          value={localFilters.minBedrooms.toString()}
          onChange={e =>
            handleFilterChange('minBedrooms', parseInt(e.target.value) || 0)
          }
          fullWidth
          size="small"
          InputProps={{ classes: { root: 'rounded-xl bg-gray-50/50' } }}
        >
          {BEDROOM_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Sort By */}
      <Box>
        <Typography
          variant="subtitle2"
          className="mb-2 ml-1 font-bold text-gray-700"
        >
          Sort By
        </Typography>
        <TextField
          select
          value={localFilters.sortBy}
          onChange={e => handleFilterChange('sortBy', e.target.value)}
          fullWidth
          size="small"
          InputProps={{ classes: { root: 'rounded-xl bg-gray-50/50' } }}
        >
          {SORT_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Action Buttons */}
      <Box className="flex flex-col gap-3 border-t border-gray-100 pt-4">
        <Button
          variant="contained"
          fullWidth
          onClick={handleApplyFilters}
          className="rounded-full bg-black py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-gray-800"
          sx={{ textTransform: 'none' }}
        >
          Apply Filters
        </Button>
        <Button
          variant="text"
          fullWidth
          onClick={handleResetFilters}
          className="rounded-full font-semibold text-gray-500 hover:bg-gray-50 hover:text-black"
          sx={{ textTransform: 'none' }}
        >
          Reset All
        </Button>
      </Box>
    </Box>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
      {/* Properties Section */}
      <Container
        maxWidth={false}
        className="mx-auto max-w-[1600px] px-4 py-12 md:px-8"
      >
        <Grid container spacing={5}>
          {/* Desktop Filters Sidebar - Sticky & Glassmorphic */}
          <Grid
            item
            xs={12}
            lg={3}
            className="relative sticky top-16 hidden p-2 lg:block xl:block"
          >
            {/* <div className="sticky top-28"> */}
            {/* <Box className="rounded-2xl border border-gray-100/80 bg-white p-6 shadow-xl shadow-gray-200/50 backdrop-blur-xl">
                <Box className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <FilterIcon className="text-gray-900" />
                  <Typography variant="h6" className="font-bold text-gray-900">
                    Filters
                  </Typography>
                </Box>
                <FilterContent />
              </Box> */}
            {/* <h1>Chatbot</h1> */}
            {/* <Chatbot /> */}
            <PropertyChatbot />
            {/* </div> */}
          </Grid>

          {/* Properties Grid */}
          <Grid item xs={12} lg={9}>
            {/* Toolbar */}
            <Box className="sticky top-0 z-10 mb-8 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all">
              <Box className="flex items-center gap-3">
                <Typography variant="h6" className="font-bold text-gray-900">
                  {filteredProperties.length} Properties
                </Typography>
                {activeFiltersCount > 0 && (
                  <Chip
                    label={`${activeFiltersCount} active fitlers`}
                    size="small"
                    onDelete={handleResetFilters}
                    className="h-7 bg-black font-medium text-white"
                  />
                )}
              </Box>

              <Box className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <Box className="hidden rounded-xl border border-gray-200 bg-white p-1 shadow-sm md:flex">
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gray-100 text-black shadow-inner' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <GridViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setViewMode('list')}
                    className={`rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-100 text-black shadow-inner' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <ListViewIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Mobile Filter Button */}
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  // onClick={toggleFilterDrawer}
                  className="rounded-full border-gray-200 bg-white font-semibold text-gray-700 hover:bg-gray-50 lg:hidden"
                  sx={{ textTransform: 'none' }}
                >
                  Filters
                  {activeFiltersCount > 0 && (
                    <Chip
                      label={activeFiltersCount}
                      size="small"
                      className="ml-2 h-5 w-5 bg-black text-white"
                    />
                  )}
                </Button>
              </Box>
            </Box>
            {paginatedProperties.length > 0 ? (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Grid container spacing={3}>
                    {paginatedProperties.map(property => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={viewMode === 'grid' ? 4 : 12}
                        key={property.id}
                      >
                        <motion.div variants={itemVariants}>
                          <PropertyCard
                            property={property}
                            variant={
                              viewMode === 'list' ? 'horizontal' : 'default'
                            }
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box className="mt-16 flex justify-center">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      shape="rounded"
                      className="rounded-2xl border border-gray-100 bg-white p-3 shadow-lg"
                      renderItem={item => (
                        <PaginationItem
                          {...item}
                          sx={{
                            '& .Mui-selected': {
                              backgroundColor: 'black !important',
                              color: 'white',
                              fontWeight: 'bold',
                            },
                          }}
                        />
                      )}
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box className="rounded-2xl border-2 border-dashed border-gray-100 bg-white py-24 text-center">
                <Box className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                  <SearchIcon className="text-4xl text-gray-300" />
                </Box>
                <Typography
                  variant="h5"
                  className="mb-2 font-bold text-gray-900"
                >
                  No Properties Found
                </Typography>
                <Typography className="mx-auto mb-8 max-w-md text-gray-500">
                  We couldn&apos;t find any properties matching your current
                  criteria. Try removing some filters.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleResetFilters}
                  className="rounded-full border-gray-300 px-8 py-3 text-gray-700 transition-all hover:border-black hover:bg-black hover:text-white"
                >
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={uiState.isFilterDrawerOpen}
        onClose={closeFilterDrawer}
        PaperProps={{
          className: 'w-full max-w-[350px] p-0 rounded-l-2xl',
        }}
        BackdropProps={{
          className: 'backdrop-blur-sm bg-black/20',
        }}
      >
        <Box className="flex items-center justify-between border-b border-gray-100 p-6">
          <Typography variant="h6" className="font-bold text-gray-900">
            Filter Properties
          </Typography>
          <IconButton
            onClick={closeFilterDrawer}
            className="bg-gray-50 hover:bg-gray-100"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="h-full overflow-y-auto p-6">
          <FilterContent />
        </Box>
      </Drawer>
    </div>
  );
}
