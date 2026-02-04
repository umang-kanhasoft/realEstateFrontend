'use client';

import SideContactForm from '@/components/forms/SideContactForm';
import ListingBanner from '@/components/projects/ListingBanner';
import ProjectCard, {
  ProjectCardProps,
} from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  ProjectFiltersProvider,
  useProjectFilters,
} from '@/contexts/ProjectFiltersContext';
import { formatCurrency } from '@/lib/utils/format';
import { ProjectsService, type Project } from '@/services/projects.service';
import { budgetToNumber } from '@/utils/helpers';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, Suspense, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';

// Map backend Project to ProjectCard props
function mapProjectToCard(project: Project): ProjectCardProps['project'] {
  const primaryBuilder =
    project.builders.find(b => b.ProjectBuilder?.isPrimary) ||
    project.builders[0];
  const location = [
    project?.addressLine1,
    project?.addressLine2,
    project?.area,
    project?.city,
  ]
    .filter(Boolean)
    .join(', ');

  let minP = Infinity;
  let maxP = -Infinity;
  let minA = Infinity;
  let maxA = -Infinity;

  const configurations = project.unitTypes.map(unit => {
    minP = Math.min(minP, unit.price || Infinity);
    maxP = Math.max(maxP, unit.price || -Infinity);
    minA = Math.min(minA, unit.carpetAreaSqft || Infinity);
    maxA = Math.max(maxA, unit.carpetAreaSqft || -Infinity);
    return {
      bhk: unit.label,
      area: `${unit.carpetAreaSqft || unit.builtUpAreaSqft || 0} Sq-ft`,
      price: unit.price
        ? new Intl.NumberFormat('en-IN', {
            style: 'currency',
            notation: 'compact',
            currency: 'INR',
          }).format(unit.price)
        : 'Price on Request',
      type: project.possessionDate ? 'Under Construction' : 'Ready to Move',
    };
  });

  const priceRange = `${formatCurrency(minP)} - ${formatCurrency(maxP).replace('₹ ', '')}`;
  const areaRange = `${minA} - ${maxA} Sq.ft`;

  return {
    id: project.id,
    name: project.name,
    builderName: primaryBuilder?.name || 'Unknown Builder',
    location: location,
    priceRange,
    areaRange,
    configurations,
    usp: [
      'Zero Brokerage',
      project.possessionDate
        ? `Possession ${new Date(project.possessionDate).getFullYear()}`
        : 'Ready to Move',
      ...project.amenities.slice(0, 1).map(a => a.name),
    ],
    reraId: project.reraNumber || 'RERA Pending',
    badges: [
      project.reraNumber ? 'ECO_FRIENDLY' : '',
      project.isFeatured ? 'FEATURED' : '',
    ].filter(Boolean),
    image:
      project.thumbnail ||
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    landmarks: (project.landmarks || []).map(l => ({
      type: l.type,
      name: l.name,
      distanceKm:
        typeof l.distanceKm === 'string'
          ? parseFloat(l.distanceKm)
          : l.distanceKm,
      travelTimeMin: l.travelTimeMin
        ? typeof l.travelTimeMin === 'string'
          ? parseFloat(l.travelTimeMin)
          : l.travelTimeMin
        : undefined,
    })),
  };
}

interface PageData {
  projects: Project[];
  totalCount: number;
}

interface ProjectsListProps {
  data: import('@tanstack/react-query').InfiniteData<PageData> | undefined;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const ProjectsList = memo(
  ({
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: ProjectsListProps) => {
    const allProjects: Project[] = useMemo(
      () => data?.pages.flatMap(page => page.projects) || [],
      [data]
    );

    const Footer = () => {
      return (
        <div className="mb-20 mt-12 flex h-24 w-full items-center justify-center">
          {isFetchingNextPage ? (
            <div className="flex scale-100 flex-col items-center gap-3 rounded-full border border-gray-100 bg-white px-6 py-3 opacity-100 shadow-lg">
              <CircularProgress
                size={24}
                thickness={5}
                className="text-black"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Loading More
              </span>
            </div>
          ) : hasNextPage ? (
            <span className="opacity-0">Scroll to load</span>
          ) : (
            <div className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-gray-400">
              You have reached the end
            </div>
          )}
        </div>
      );
    };

    if (isLoading && allProjects.length === 0) {
      return (
        <Box className="flex flex-col items-center justify-center space-y-4 py-32">
          <CircularProgress size={50} thickness={4} className="text-black" />
          <Typography className="animate-pulse font-medium text-gray-500">
            Curating the best properties for you...
          </Typography>
        </Box>
      );
    }

    if (allProjects.length === 0 && !isError) {
      return (
        <Box className="rounded-3xl border border-dashed border-gray-300 bg-white py-32 text-center">
          <Typography variant="h6" className="mb-2 text-gray-400">
            No matching projects found.
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Try adjusting your filters or search criteria.
          </Typography>
          <Button
            variant="outlined"
            className="mt-6 rounded-full border-gray-300 px-8 text-gray-600 hover:border-black hover:text-black"
            onClick={() => window.location.reload()}
          >
            Clear Filters
          </Button>
        </Box>
      );
    }

    return (
      <>
        <Virtuoso
          useWindowScroll
          data={allProjects}
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          overscan={400}
          itemContent={(index, project) => (
            <div className="mb-0 pb-8">
              <ProjectCard project={mapProjectToCard(project)} />

              {index === 2 && (
                <div className="mb-8 mt-8">
                  <ListingBanner variant="sapno-ka-bhk" />
                </div>
              )}
              {index === 6 && (
                <div className="mb-8 mt-8">
                  <ListingBanner variant="luxury-spaces" />
                </div>
              )}
            </div>
          )}
          components={{
            Footer: Footer,
          }}
        />
      </>
    );
  }
);

ProjectsList.displayName = 'ProjectsList';

function ProjectsContent() {
  const { filters } = useProjectFilters();
  const itemsPerPage = 10;

  // Map sort option to backend format
  const sortMapping: Record<
    string,
    {
      sortBy:
        | 'price'
        | 'rating'
        | 'featured'
        | 'possession'
        | 'newest'
        | 'featured';
      sortOrder: 'asc' | 'desc';
    }
  > = {
    Featured: { sortBy: 'featured', sortOrder: 'desc' },
    'New Launch': { sortBy: 'newest', sortOrder: 'desc' },
    'Price: low to high': { sortBy: 'price', sortOrder: 'asc' },
    'Price: high to low': { sortBy: 'price', sortOrder: 'desc' },
    'Near possession': { sortBy: 'possession', sortOrder: 'asc' },
  };

  // Property Type Mapping (Same as ProjectFilters)
  const propertyTypeMap: Record<string, string> = {
    Flat: 'apartment',
    Villa: 'villa',
    Plot: 'plot',
    Penthouse: 'penthouse',
    Bungalow: 'bungalow',
    Commercial: 'commercial',
    Office: 'commercial',
    Shop: 'commercial',
  };

  const fetchProjects = async ({ pageParam = 0 }) => {
    const sort = sortMapping[filters.selectedSort] || sortMapping['Featured'];
    const response = await ProjectsService.getProjects({
      limit: itemsPerPage,
      offset: pageParam,
      ...sort,
      search: filters.searchQuery || undefined,
      city: filters.selectedCity || undefined,
      area:
        filters.selectedLocalities.length > 0
          ? filters.selectedLocalities.join(',')
          : undefined,
      propertyType:
        filters.selectedPropType.length > 0
          ? filters.selectedPropType.map(pt => propertyTypeMap[pt] || pt)
          : undefined,
      priceMin: budgetToNumber(filters.minBudget),
      priceMax: budgetToNumber(filters.maxBudget),
      status: filters.selectedPossession.includes('Ready to Move')
        ? 'ready_to_move'
        : undefined,
    });
    return response;
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['projects', filters],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap(p => p.projects).length;
      return totalFetched < lastPage.totalCount ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });

  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
      <div className="sticky top-0 z-30 border-b border-gray-200/50 bg-white/50 shadow-sm backdrop-blur-lg transition-all duration-300">
        <ProjectFilters />
      </div>

      <Container
        maxWidth={false}
        className="mx-auto max-w-[1600px] px-4 py-8 md:px-8"
      >
        <Typography
          variant="h6"
          className="mb-6 flex items-center gap-2 font-semibold text-gray-600"
        >
          Showing results in{' '}
          <span className="font-bold text-gray-900">
            {filters.selectedCity}
          </span>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-normal text-gray-500">
            {totalCount} Projects Found
          </span>
        </Typography>

        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-10 text-center"
            >
              <Alert
                severity="error"
                className="mb-6 inline-flex rounded-xl shadow-sm"
              >
                Failed to load projects. Please try again.
              </Alert>
              <br />
              <Button
                onClick={() => refetch()}
                variant="outlined"
                className="mt-2 border-red-200 text-red-600 hover:bg-red-50"
              >
                Retry
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Grid container spacing={4}>
          {/* Main Content: Project List */}
          <Grid item xs={12} lg={9}>
            <ProjectsList
              data={data}
              isLoading={isLoading}
              isError={isError}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </Grid>

          {/* Sidebar: Contact Form */}
          <Grid item xs={12} lg={3} className="relative hidden lg:block">
            <div className="sticky top-32 transition-all duration-300 ease-in-out">
              <SideContactForm />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <ProjectFiltersProvider>
      <Suspense
        fallback={<div className="p-10 text-center">Loading Projects...</div>}
      >
        <ProjectsContent />
      </Suspense>
    </ProjectFiltersProvider>
  );
}
