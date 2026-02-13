'use client';

import FloorPlans, { FloorPlan } from '@/app/(pages)/projects/[id]/FloorPlans';
import Loader from '@/components/common/Loader';
import PropertyInquiryForm from '@/components/forms/PropertyInquiryForm';
import AmenityCard from '@/components/property/AmenityCard';
import DynamicMap from '@/components/property/DynamicMap';
import NearbyLandmarks from '@/components/property/NearbyLandmarks';
import OverviewItem from '@/components/property/OverviewItem';
import ProjectGallary, {
  PropertyMedia,
} from '@/components/property/ProjectGallary';
import Faq from '@/components/sections/Faq';
import { formatCurrency } from '@/lib/utils/format';
import {
  ApiProjectDetail,
  ApiProjectObject,
  ConstructionStatus,
  Property,
} from '@/types';
import { ArrowBack, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  Grow,
  Paper,
  Slide,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  Zoom,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropertyCard from '../property/PropertyCard';

interface AmenityType {
  id: string;
  name: string;
  category: string;
}

interface PropertyDetailsTemplateProps {
  propertyData: ApiProjectDetail;
  loading?: boolean;
  similarProjects?: ApiProjectObject[];
  otherProjects?: ApiProjectObject[];
}

const mapConstructionStatusToPropertyStatus = (
  status: ConstructionStatus | string
): Property['status'] => {
  switch (status) {
    case 'new_launch':
      return 'New Launch';
    case 'under_construction':
      return 'Under Construction';
    case 'nearing_completion':
      return 'Under Construction';
    case 'ready_to_move':
      return 'Ready to Move';
    case 'sold_out':
      return 'sold';
    default:
      return 'Under Construction';
  }
};

// Mapper function to transform ApiProjectObject to Property
const mapApiProjectToProperty = (apiProject: ApiProjectObject): Property => {
  const builder = apiProject.builders?.[0];
  return {
    id: apiProject.id,
    title: apiProject.name,
    slug: apiProject.slug,
    description: apiProject.description,
    price: apiProject.priceStartingFrom || 0,
    pricePerSqFt: apiProject.pricePerSqFt || undefined,
    currency: apiProject.currency,
    propertyType: apiProject.propertyType,
    type: apiProject.residentialType || apiProject.propertyType,
    status: mapConstructionStatusToPropertyStatus(apiProject.status),
    bedrooms: apiProject.unitTypes?.[0]?.bedrooms,
    bathrooms: apiProject.unitTypes?.[0]?.bathrooms,
    area: apiProject.size
      ? `${apiProject.size} ${apiProject.areaUnit || 'sqft'}`
      : apiProject.area,
    size: apiProject.size || undefined,
    location: `${apiProject.area}, ${apiProject.city}`,
    areaUnit: (apiProject.areaUnit as 'sqft' | 'sqm') || 'sqft',
    images: apiProject.mainImageUrl
      ? [apiProject.mainImageUrl]
      : ['/images/house-icon.png'],
    isFeatured: apiProject.isFeatured,
    isNew: apiProject.status === 'new_launch',
    builder: builder?.name,
    builderId: builder?.id,
    builders: apiProject.builders || undefined,
    reraId: apiProject.reraNumber || undefined,
    ecoFriendly: apiProject.ecoFriendly,
    possessionDate: apiProject.possessionDate || undefined,
    completionTime: apiProject.completionTime || undefined,
    unitTypes: apiProject.unitTypes || undefined,
    amenities: apiProject.amenities || [],
    features:
      apiProject.keyFeatures?.map(feature => ({
        id: feature,
        name: feature,
        value: feature,
        icon: 'check',
      })) || undefined,
    views: apiProject.totalReviews,
    rating: apiProject.avgRating,
    reviews: apiProject.totalReviews,
  };
};

export default function PropertyDetailsTemplate({
  propertyData,
  loading = false,
  similarProjects = [],
  otherProjects = [],
}: PropertyDetailsTemplateProps) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [amenitiesVisible, setAmenitiesVisible] = useState(false);

  const {
    projectInfo,
    location,
    pricingAndInventory,
    amenities,
    media,
    towers,
    specifications,
    metadata,
  } = propertyData;

  // Memoize properties to avoid recalculation
  const overviewData = useMemo(
    () => [
      { label: 'Project Name', value: projectInfo?.name || '' },
      { label: 'Location', value: location?.addressLine2 || '' },
      {
        label: 'Configuration',
        value: pricingAndInventory?.configurations[0]?.label || '',
      },
      {
        label: 'Price Range',
        value: pricingAndInventory?.priceRange?.minPrice
          ? `${formatCurrency(pricingAndInventory.priceRange.minPrice)} - ${formatCurrency(pricingAndInventory.priceRange.maxPrice)}`
          : 'Price on Request',
      },
      {
        label: 'Developer',
        value:
          projectInfo?.developer
            ?.map(d => d.name)
            .filter(Boolean)
            .join(', ') || '',
      },
      { label: 'Possession', value: projectInfo?.possessionDate || '' },
      { label: 'RERA No', value: projectInfo?.reraId || '' },
    ],
    [projectInfo, location, pricingAndInventory]
  );

  // Flatten amenities for display
  const amenityList = useMemo(() => {
    return [
      ...(amenities?.leisure || []),
      ...(amenities?.safety || []),
      ...(amenities?.health || []),
      ...(amenities?.environment || []),
      ...(amenities?.convenience || []),
      ...(amenities?.sports || []),
      ...(amenities?.kids || []),
    ].map((item, index) => ({
      id: item.id || `amenity-${index}`,
      name: item.name,
      category: item.category || 'General',
    }));
  }, [amenities]);

  // Memoize BHK types to avoid recalculation on every render
  const bhkTypes = useMemo<number[]>(() => {
    if (!propertyData?.pricingAndInventory?.configurations) return [];
    const types = [
      ...new Set(
        propertyData.pricingAndInventory.configurations
          .map(config => config.bedrooms)
          .filter(
            (bedrooms): bedrooms is number =>
              bedrooms !== undefined && bedrooms !== null
          )
      ),
    ];
    return types.sort((a: number, b: number) => a - b);
  }, [propertyData?.pricingAndInventory?.configurations]);

  // Trigger amenities animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAmenitiesVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Set default tab to first available BHK type when data loads
  useEffect(() => {
    if (bhkTypes.length > 0 && value === '') {
      setValue(String(bhkTypes[0]));
    }
  }, [bhkTypes, value]);

  if (loading) return <Loader text="Fetching property details..." />;

  return (
    <Box bgcolor="#f9f9f9" minHeight="100vh" pb={8}>
      <Container maxWidth="xl" sx={{ pt: 2, px: { xs: 2, md: 4 } }}>
        {/* Headers Section */}
        <Box
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <Box>
            <Chip
              label={
                projectInfo?.status
                  ? projectInfo.status
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')
                  : 'New Launch'
              }
              color={
                projectInfo?.status === 'ready_to_move'
                  ? 'success'
                  : projectInfo?.status === 'under_construction' ||
                      projectInfo?.status === 'nearing_completion'
                    ? 'warning'
                    : projectInfo?.status === 'sold_out'
                      ? 'error'
                      : 'info'
              }
              size="small"
              sx={{ mb: 1, fontWeight: 600 }}
            />
            <Typography
              variant="h3"
              fontWeight={800}
              color="text.primary"
              gutterBottom
            >
              {projectInfo?.name}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              mb={0.5}
              color="text.secondary"
            >
              <LocationOnIcon fontSize="small" color="action" />
              <Typography variant="subtitle1">{location?.locality}</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color="text.secondary"
            >
              <BusinessIcon fontSize="small" color="action" />
              <Typography variant="subtitle1">
                By{' '}
                {projectInfo?.developer?.map((dev, idx) => (
                  <Link key={dev.id || idx} href={`/builders/${dev.id}`}>
                    <Box
                      component="span"
                      fontWeight={600}
                      color="primary.main"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {dev.name}
                      {idx < (projectInfo.developer?.length ?? 0) - 1 && ', '}
                    </Box>
                  </Link>
                ))}
              </Typography>
            </Box>
          </Box>
          <Box
            textAlign={{ xs: 'left', md: 'right' }}
            mt={{ xs: 2, md: 0 }}
            display="flex"
            flexDirection="column"
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            gap={2}
          >
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                size="large"
                startIcon={
                  <ArrowBack className="transition-transform duration-300 group-hover:-translate-x-1" />
                }
                className="group rounded-full border-2 border-secondary-900 px-4 py-1.5 font-semibold text-secondary-900 transition-all duration-300 hover:bg-secondary-900 hover:text-white"
                sx={{ textTransform: 'none' }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  Back
                </Box>
              </Button>
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={800} color="primary">
                {pricingAndInventory?.priceRange?.displayString
                  ? pricingAndInventory?.priceRange?.displayString
                  : 'Price on Request'}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Onwards
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Gallery */}
        <ProjectGallary media={media as PropertyMedia} />

        <Grid container spacing={4} mt={3}>
          {/* Left Column (Main Content) */}
          <Grid item xs={12} lg={8}>
            {/* Overview */}
            <Box mb={6}>
              <Typography variant="h5" fontWeight={700} mb={3}>
                About {projectInfo?.name}
              </Typography>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  bgcolor: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                }}
              >
                <Typography
                  variant="body1"
                  paragraph
                  lineHeight={1.7}
                  color="text.secondary"
                  dangerouslySetInnerHTML={{
                    __html: projectInfo?.description || '',
                  }}
                />
              </Paper>
            </Box>

            {/* Floor Plans */}
            <Box mb={6}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                mb={3}
              >
                <Typography variant="h5" fontWeight={700}>
                  Floor Plans
                </Typography>
                {bhkTypes.length > 0 && (
                  <Tabs
                    value={value || false}
                    onChange={(_, newValue) => setValue(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {bhkTypes.map((bhk: number) => (
                      <Tab
                        key={bhk}
                        label={`${bhk} BHK`}
                        value={bhk.toString()}
                        sx={{ fontWeight: 600 }}
                      />
                    ))}
                  </Tabs>
                )}
              </Box>
              {bhkTypes.map(
                (bhk: number) =>
                  value === bhk.toString() && (
                    <FloorPlans
                      key={bhk}
                      bhk={bhk.toString()}
                      floorPlan={(
                        pricingAndInventory?.configurations || []
                      ).map(
                        (config): FloorPlan => ({
                          floorPlanUrl: config.floorPlanUrl || '',
                          id: config.label || `config-${Math.random()}`,
                          type: config.viewType || 'standard',
                          label: config.label || `${bhk} BHK`,
                          bedrooms: config.bedrooms || 0,
                          bathrooms: config.bathrooms || 0,
                          balconies: config.balconies || 0,
                          carpetAreaSqft: Math.floor(
                            (config.superBuiltUpAreaSqft || 0) * 0.75
                          ),
                          builtUpAreaSqft: Math.floor(
                            (config.superBuiltUpAreaSqft || 0) * 0.85
                          ),
                          superBuiltUpAreaSqft:
                            config.superBuiltUpAreaSqft || 0,
                          terraceAvailable: false,
                          gardenAccess: false,
                          orientation: config.viewType || 'North',
                          price: Number(config.price) || 0,
                          currency: 'INR',
                          floor: null,
                          viewType: config.viewType || 'Standard',
                          parkingSpace: config.parkingSpace || 0,
                          maintenanceCharges: 0,
                          totalUnits: config.totalUnits || 0,
                          availableUnits: config.availableUnits || 0,
                          roomDetails: {
                            kitchen: {
                              width: config.roomDetails?.kitchen?.width || 0,
                              length: config.roomDetails?.kitchen?.length || 0,
                            },
                            bedroom_2: config.roomDetails?.bedroom_2
                              ? {
                                  width:
                                    config.roomDetails.bedroom_2.width || 0,
                                  length:
                                    config.roomDetails.bedroom_2.length || 0,
                                }
                              : null,
                            bedroom_3: config.roomDetails?.bedroom_3
                              ? {
                                  width:
                                    config.roomDetails.bedroom_3.width || 0,
                                  length:
                                    config.roomDetails.bedroom_3.length || 0,
                                }
                              : null,
                            living_room: {
                              width:
                                config.roomDetails?.living_room?.width || 0,
                              length:
                                config.roomDetails?.living_room?.length || 0,
                            },
                            master_bedroom: {
                              width:
                                config.roomDetails?.master_bedroom?.width || 0,
                              length:
                                config.roomDetails?.master_bedroom?.length || 0,
                            },
                          },
                        })
                      )}
                    />
                  )
              )}
            </Box>

            <Divider sx={{ mb: 5 }} />

            {/* Amenities */}
            {amenityList.length > 0 && (
              <Box mb={6}>
                <Slide direction="up" in={amenitiesVisible} timeout={300}>
                  <Typography variant="h5" fontWeight={700} mb={3}>
                    Amenities
                  </Typography>
                </Slide>
                <Zoom in={amenitiesVisible} timeout={400}>
                  <Grid container spacing={3}>
                    {(showAllAmenities
                      ? amenityList
                      : amenityList.slice(0, 12)
                    ).map((amenity: AmenityType, index: number) => (
                      <Grow
                        in={amenitiesVisible}
                        timeout={200 + index * 30}
                        key={amenity.id || index}
                      >
                        <Grid item xs={6} sm={4} md={2}>
                          <Box
                            sx={{
                              transform: 'translateY(20px)',
                              opacity: 0,
                              animation: `slideInUp 0.4s ease ${0.1 + index * 0.03}s forwards`,
                              '@keyframes slideInUp': {
                                from: {
                                  transform: 'translateY(30px)',
                                  opacity: 0,
                                },
                                to: {
                                  transform: 'translateY(0)',
                                  opacity: 1,
                                },
                              },
                            }}
                          >
                            <AmenityCard title={amenity.name} />
                          </Box>
                        </Grid>
                      </Grow>
                    ))}
                  </Grid>
                </Zoom>
                {amenityList.length > 12 && (
                  <Slide direction="up" in={amenitiesVisible} timeout={500}>
                    <Box className="group mt-8 flex justify-center">
                      <Button
                        variant="outlined"
                        onClick={() => setShowAllAmenities(!showAllAmenities)}
                        size="large"
                        endIcon={
                          showAllAmenities ? <ArrowUpward /> : <ArrowDownward />
                        }
                        className="rounded-full border-2 border-secondary-900 px-6 py-2 font-semibold text-secondary-900 transition-all duration-300 hover:bg-secondary-900 hover:text-white"
                        sx={{ textTransform: 'none' }}
                      >
                        {showAllAmenities ? (
                          <Box display="flex" alignItems="center" gap={1}>
                            Show Less
                          </Box>
                        ) : (
                          <Box display="flex" alignItems="center" gap={1}>
                            View More
                          </Box>
                        )}
                      </Button>
                    </Box>
                  </Slide>
                )}
              </Box>
            )}

            <Divider sx={{ mb: 5 }} />

            {/* Property Video */}
            {media?.videos?.length ? (
              <Box mb={6}>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Property Video
                </Typography>
                <Box
                  sx={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    height: 400,
                    bgcolor: '#000',
                  }}
                >
                  <video
                    width="100%"
                    height="100%"
                    controls
                    src={media.videos[0].url}
                    style={{ objectFit: 'cover' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </Box>
            ) : null}

            {/* Landmarks */}
            {location?.landmarks && location.landmarks.length > 0 && (
              <Box mb={6}>
                <NearbyLandmarks
                  landmarks={location.landmarks.map(landmark => ({
                    id: landmark.id || landmark.name || '',
                    type: landmark.type || '',
                    name: landmark.name || '',
                    distanceKm: landmark.distanceKm || 0,
                    travelTimeMin: landmark.travelTimeMin || 0,
                  }))}
                />
              </Box>
            )}

            {/* Similar Projects */}
            {similarProjects.length > 0 && (
              <Box mb={6}>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Similar Projects
                </Typography>
                <Swiper
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 2.5 },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination, Autoplay]}
                  style={{ paddingBottom: '40px' }}
                >
                  {similarProjects.map((project, index) => (
                    <SwiperSlide key={project.id || index}>
                      <PropertyCard
                        property={mapApiProjectToProperty(project)}
                        variant="default"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <Box mb={6}>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Other Projects By{' '}
                  {projectInfo?.developer?.map((dev, idx) => (
                    <Box
                      component="span"
                      key={dev.id || idx}
                      color="primary.main"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      onClick={() => router.push(`/builders/${dev.id}`)}
                    >
                      {dev.name}
                      {idx < (projectInfo?.developer?.length ?? 0) - 1 && ', '}
                    </Box>
                  ))}
                </Typography>
                <Swiper
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 2.5 },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination, Autoplay]}
                  style={{ paddingBottom: '40px' }}
                >
                  {otherProjects.map((project, index) => (
                    <SwiperSlide key={project.id || index}>
                      <PropertyCard
                        property={mapApiProjectToProperty(project)}
                        variant="default"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}

            {/* Specifications (Faq) */}
            {specifications && (
              <Box mb={6}>
                <Faq specifications={specifications} />
              </Box>
            )}
          </Grid>

          {/* Right Column (Sidebar) */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <PropertyInquiryForm />

              {/* Project Location Map */}
              <Box mb={4} mt={4}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Location
                </Typography>

                <DynamicMap
                  latitude={location?.coordinates?.latitude || 23.0225}
                  longitude={location?.coordinates?.longitude || 72.5714}
                  address={(location?.addressLine1 || '').concat(
                    ', ',
                    location?.addressLine2 || ''
                  )}
                  locality={location?.locality || location?.sector}
                  city={location?.city}
                />
              </Box>

              {/* Overview Card */}
              <Box mb={4}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Overview
                </Typography>
                <Grid container spacing={2}>
                  {overviewData.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <OverviewItem label={item.label} value={item.value} />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Tower Overview */}
              {towers && towers.length > 0 && (
                <Box mb={4}>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Tower Details
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}
                  >
                    <Table aria-label="tower details table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Tower
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Units on Floor
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Lift
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Storey
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {towers.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {/* Tower Name aur Label saath mein */}
                              {row.blockName} ({row.towerLabel})
                            </TableCell>
                            <TableCell>{row.unitsPerFloor}</TableCell>
                            <TableCell>{row.lift}</TableCell>
                            {/* Storey ko G+x format mein */}
                            <TableCell>G+{row.storey}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Key Features */}
              {metadata?.keyFeatures && metadata.keyFeatures.length > 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    Key Highlights
                  </Typography>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Box p={3}>
                      {metadata.keyFeatures.map(
                        (feature: string, idx: number) => (
                          <Box
                            key={idx}
                            display="flex"
                            gap={2}
                            mb={1.5}
                            alignItems="flex-start"
                          >
                            <Typography
                              variant="body2"
                              lineHeight={1.6}
                              color="text.secondary"
                            >
                              <CheckCircleIcon
                                sx={{
                                  color: 'success.main',
                                  mr: 1,
                                  fontSize: 20,
                                  verticalAlign: 'middle',
                                }}
                              />
                              {feature}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </Card>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
