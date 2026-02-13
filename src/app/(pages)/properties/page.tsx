'use client';

import PropertyCard from '@/components/property/PropertyCard';
import { useChat } from '@/context/ChatContext';
import { useProperty } from '@/hooks/useProperty';
import { useUI } from '@/hooks/useUI';
import { PropertyFilter } from '@/types';
import { filterProperties, sortProperties } from '@/utils/helpers';
import {
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Search as SearchIcon,
  SmartToyRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Components, Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import styled from 'styled-components';

// Styled components for VirtuosoGrid
const ItemContainer = styled.div`
  padding: 10px;
  width: 33.33%;
  display: block; // Changed from flex to block to avoid layout issues
  box-sizing: border-box;

  @media (max-width: 1536px) {
    width: 33.33%;
  }

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 900px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { state: propertyState, resetFilters, fetchProperties } = useProperty();
  const {
    state: uiState,
    toggleFilterDrawer,
    hideFooter,
    showFooter,
  } = useUI();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [localFilters, setLocalFilters] = useState<PropertyFilter>({
    ...propertyState.filters,
  });

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

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

  // Hide footer on mount, show on unmount
  useEffect(() => {
    hideFooter();
    return () => {
      showFooter();
    };
  }, [hideFooter, showFooter]);

  // Lock body scroll when mobile chat (filter drawer) is open
  useEffect(() => {
    if (uiState.isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [uiState.isFilterDrawerOpen]);

  const { messages, updateLastMessage } = useChat();

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(propertyState.properties, localFilters);
    return sortProperties(filtered, localFilters.sortBy);
  }, [propertyState.properties, localFilters]);

  // Sync Search Results to Chat
  useEffect(() => {
    // Only update if we have properties and the last message is from AI (expecting a confirmation)
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg?.sender === 'ai' &&
      !lastMsg.searchResult &&
      (localFilters.searchQuery ||
        Object.keys(localFilters).some(
          k => localFilters[k as keyof PropertyFilter] !== 'all'
        ))
    ) {
      // Debounce slightly or just update
      updateLastMessage({
        searchResult: {
          count: filteredProperties.length,
          filters: localFilters as unknown as Record<string, unknown>,
          properties: filteredProperties.slice(0, 5),
        },
      });
    }
  }, [filteredProperties, localFilters, messages, updateLastMessage]);

  const handleResetFilters = (): void => {
    resetFilters();
    setLocalFilters(propertyState.filters);
  };

  const loadMore = useCallback(() => {
    // Check if we can load more
    const { hasNextPage, currentPage } = propertyState.pagination;
    if (!propertyState.isLoading && hasNextPage) {
      fetchProperties(currentPage + 1, true);
    }
  }, [propertyState.isLoading, propertyState.pagination, fetchProperties]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (localFilters.propertyType !== 'all') count++;
    if (localFilters.listingType !== 'all') count++;
    if (localFilters.city) count++;
    if (localFilters.searchQuery) count++;
    return count;
  }, [localFilters]);

  return (
    <Container maxWidth={false} className="max-w-[1600px] px-4 py-4 md:px-8">
      {/* Toolbar */}
      <Box className="sticky top-0 z-10 mb-8 flex w-full flex-wrap items-center justify-between gap-4 border border-gray-100 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all">
        <Box className="flex items-center gap-3">
          <Typography variant="h6" className="font-bold text-gray-900">
            {propertyState.pagination.totalCount} Properties
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} active val`}
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

          {/* Mobile Chat Button */}
          <Button
            variant="contained"
            startIcon={<SmartToyRounded />}
            onClick={toggleFilterDrawer}
            className="rounded-full bg-black font-semibold text-white shadow-lg transition-all hover:bg-gray-800 lg:hidden"
            sx={{ textTransform: 'none' }}
          >
            Ask AI
            {activeFiltersCount > 0 && (
              <Chip
                label={activeFiltersCount}
                size="small"
                className="ml-2 h-5 w-5 bg-white text-black"
              />
            )}
          </Button>
        </Box>
      </Box>

      {/* Properties Grid with Virtuoso */}
      {filteredProperties.length > 0 ? (
        <Box className="h-[calc(100vh-140px)] w-full">
          {viewMode === 'grid' ? (
            <VirtuosoGrid
              useWindowScroll={false}
              style={{ height: '100%', width: '100%' }}
              data={filteredProperties}
              endReached={loadMore}
              components={{
                List: ListContainer as Components['List'],
                Item: ItemContainer,
                Footer: () =>
                  propertyState.isLoading ? (
                    <Box
                      py={2}
                      display="flex"
                      width="100%"
                      justifyContent="center"
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : null,
              }}
              itemContent={(_index, property) => (
                <PropertyCard property={property} variant="default" />
              )}
            />
          ) : (
            <Virtuoso
              useWindowScroll={false}
              style={{ height: '100%', width: '100%' }}
              data={filteredProperties}
              endReached={loadMore}
              components={{
                Footer: () =>
                  propertyState.isLoading ? (
                    <Box py={2} display="flex" justifyContent="center">
                      <CircularProgress size={24} />
                    </Box>
                  ) : null,
              }}
              itemContent={(index, property) => (
                <Box className="mb-4 pr-2">
                  <PropertyCard property={property} variant="horizontal" />
                </Box>
              )}
            />
          )}
        </Box>
      ) : (
        <Box className="rounded-2xl border-2 border-dashed border-gray-100 bg-white py-24 text-center">
          <Box className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
            <SearchIcon className="text-4xl text-gray-300" />
          </Box>
          <Typography variant="h5" className="mb-2 font-bold text-gray-900">
            No Properties Found
          </Typography>
          <Typography className="mx-auto mb-8 max-w-md text-gray-500">
            We couldn&apos;t find any properties matching your current criteria.
            Try removing some filters.
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
    </Container>
  );
}
