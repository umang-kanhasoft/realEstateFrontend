'use client';

import AmenityCard from '@/components/property/AmenityCard';
import NearbyLandmarks from '@/components/property/NearbyLandmarks';
import OverviewItem from '@/components/property/OverviewItem';
import ProjectGallary, {
  PropertyMedia,
} from '@/components/property/ProjectGallary';
import Faq from '@/components/sections/Faq';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Loader from '@/components/common/Loader';
import PropertyInquiryForm from '@/components/forms/PropertyInquiryForm';
import DynamicMap from '@/components/property/DynamicMap';
import { formatCurrency } from '@/lib/utils/format';
import {
  Amenities,
  Configuration,
  Project,
  ProjectData,
  ProjectsService,
} from '@/services/projects.service';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FloorPlans from './FloorPlans';

interface AmenityType {
  id: string;
  name: string;
  category: string;
}

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [similarProjectData, setSimilarProjectData] = useState<Project[]>([]);
  const [otherProjectData, setOtherProjectData] = useState<Project[]>([]);

  // Memoize BHK types to avoid recalculation on every render
  const bhkTypes = useMemo<number[]>(() => {
    if (!projectData?.pricingAndInventory?.configurations) return [];
    const types = [
      ...new Set(
        projectData.pricingAndInventory.configurations.map(
          (config: Configuration) => config.bedrooms
        )
      ),
    ];
    return types.sort((a: number, b: number) => a - b);
  }, [projectData?.pricingAndInventory?.configurations]);

  // Fetch primary project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const project = await ProjectsService.getProjectById(id as string);
        setProjectData(project.project);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  // Fetch similar/related projects — uses separate loading state
  // and depends on stable values, not the entire projectData object
  const fetchRelatedProjects = useCallback(async (data: ProjectData) => {
    try {
      const [similarProjectsRes, otherProjectsRes] = await Promise.all([
        ProjectsService.getProjects({
          priceMin: Number(data.pricingAndInventory?.priceRange?.minPrice) || 0,
          priceMax: Number(data.pricingAndInventory?.priceRange?.maxPrice) || 0,
          area: data.location?.locality || undefined,
        }),
        ProjectsService.getProjects({
          builder: data.projectInfo?.developer?.id || undefined,
        }),
      ]);

      setSimilarProjectData(similarProjectsRes.projects);
      setOtherProjectData(otherProjectsRes.projects);
    } catch (error) {
      console.error('Failed to fetch related projects:', error);
    }
  }, []);

  useEffect(() => {
    if (projectData) {
      fetchRelatedProjects(projectData);
    }
  }, [projectData, fetchRelatedProjects]);

  // Set default tab to first available BHK type when data loads
  useEffect(() => {
    if (bhkTypes.length > 0 && value === '') {
      setValue(String(bhkTypes[0]));
    }
  }, [bhkTypes, value]);

  if (loading || !projectData) return <Loader />;

  const {
    projectInfo,
    location,
    pricingAndInventory,
    amenities,
    media,
    metadata,
    towers,
    specifications,
  } = projectData;

  const overviewData = [
    { label: 'Project Name', value: projectInfo?.name || '' },
    { label: 'Location', value: location?.addressLine1 || '' },
    {
      label: 'Configuration',
      value: pricingAndInventory?.configurations[0]?.bedrooms
        ? `${pricingAndInventory.configurations[0].bedrooms} BHK`
        : '',
    },
    {
      label: 'Price Range',
      value: pricingAndInventory?.priceRange?.minPrice
        ? `${formatCurrency(Number(pricingAndInventory.priceRange.minPrice))} - ${formatCurrency(Number(pricingAndInventory.priceRange.maxPrice))}`
        : '',
    },
    {
      label: 'Super Built-up Area',
      value: pricingAndInventory?.configurations[0]?.superBuiltUpAreaSqft
        ? `${pricingAndInventory.configurations[0].superBuiltUpAreaSqft} Sq-yrd`
        : '',
    },
    { label: 'Developer', value: projectInfo?.developer?.name || '' },
    { label: 'Possession', value: projectInfo?.possessionDate || '' },
    { label: 'RERA No', value: projectInfo?.reraId || '' },
  ];

  // Safely extract amenities list
  const amenityList: AmenityType[] = amenities
    ? Object.values(amenities as Amenities).flat()
    : [];

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
              label="RERA Registered"
              color="success"
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
                <Box component="span" fontWeight={600} color="primary.main">
                  {projectInfo?.developer?.name}
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box textAlign={{ xs: 'left', md: 'right' }} mt={{ xs: 2, md: 0 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, px: 4, borderRadius: '8px', fontWeight: 'bold' }}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Typography variant="h4" fontWeight={800} color="primary">
              Price on Request
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {pricingAndInventory?.priceRange?.displayString}
            </Typography>
            {/* <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, px: 4, borderRadius: '8px', fontWeight: 'bold' }}
            >
              Contact Builder
            </Button> */}
          </Box>
        </Box>

        {/* Gallery */}
        <ProjectGallary media={media as PropertyMedia} />

        <Grid container spacing={4} mt={3}>
          {/* Left Column (Main Content) */}
          <Grid item xs={12} lg={8}>
            {/* Config Cards */}
            <Typography variant="h5" fontWeight={700} mb={2}>
              Configuration
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mb={5}>
              {pricingAndInventory?.configurations.map(
                (item, index: number) => (
                  <Card
                    key={index}
                    sx={{
                      border: '1px solid #eee',
                      borderRadius: '16px',
                      minWidth: 240,
                      flex: '1 1 auto',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    <Box bgcolor="#f4f6f8" p={1.5} textAlign="center">
                      <Typography variant="subtitle1" fontWeight={700}>
                        {item?.label}
                      </Typography>
                    </Box>
                    <Box p={2.5} textAlign="center">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {item?.viewType}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="primary.main"
                      >
                        {formatCurrency(Number(item.price))}
                      </Typography>
                    </Box>
                  </Card>
                )
              )}
            </Box>

            <Divider sx={{ mb: 5 }} />

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
                      ).map((config, index) => ({
                        floorPlanUrl: config.floorPlanUrl || '',
                        id: config.label || `config-${index}`,
                        type: config.viewType || 'standard',
                        label: config.label || `${bhk} BHK`,
                        bedrooms: config.bedrooms,
                        bathrooms: config.bathrooms || 0,
                        balconies: config.balconies || 0,
                        carpetAreaSqft: Math.floor(
                          (config.superBuiltUpAreaSqft || 0) * 0.75
                        ),
                        builtUpAreaSqft: Math.floor(
                          (config.superBuiltUpAreaSqft || 0) * 0.85
                        ),
                        superBuiltUpAreaSqft: config.superBuiltUpAreaSqft || 0,
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
                                width: config.roomDetails.bedroom_2.width || 0,
                                length:
                                  config.roomDetails.bedroom_2.length || 0,
                              }
                            : null,
                          bedroom_3: config.roomDetails?.bedroom_3
                            ? {
                                width: config.roomDetails.bedroom_3.width || 0,
                                length:
                                  config.roomDetails.bedroom_3.length || 0,
                              }
                            : null,
                          living_room: {
                            width: config.roomDetails?.living_room?.width || 0,
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
                      }))}
                    />
                  )
              )}
            </Box>

            <Divider sx={{ mb: 5 }} />

            {/* Amenities */}
            {amenityList.length > 0 && (
              <Box mb={6}>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Amenities
                </Typography>
                <Grid container spacing={3}>
                  {amenityList.map((amenity: AmenityType, index: number) => (
                    <Grid item xs={6} sm={4} md={2} key={amenity.id || index}>
                      <AmenityCard title={amenity.name} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ mb: 5 }} />

            {/* About Project */}
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
                >
                  {projectInfo?.description}
                </Typography>
              </Paper>
            </Box>

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

            {/* What's Nearby */}
            <Box mb={6}>
              <NearbyLandmarks
                landmarks={
                  location?.landmarks?.map(landmark => ({
                    id: landmark.id || landmark.name || '',
                    type: landmark.type || '',
                    name: landmark.name || '',
                    distanceKm: landmark.distanceKm || 0,
                    travelTimeMin: landmark.travelTimeMin || 0,
                  })) || []
                }
              />
            </Box>

            {/* Similar Projects */}
            {similarProjectData.length > 0 && (
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
                  {similarProjectData.map((project, index) => (
                    <SwiperSlide key={project.id || index}>
                      <Card
                        sx={{
                          borderRadius: '16px',
                          height: '100%',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          cursor: 'pointer',
                        }}
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        <Box sx={{ height: 200, overflow: 'hidden' }}>
                          {project?.mainImageUrl && (
                            <Image
                              src={
                                project.mainImageUrl || '/images/house-icon.png'
                              }
                              alt={project.name}
                              className="!static w-full object-cover"
                              fill
                            />
                          )}
                        </Box>
                        <CardContent>
                          <Typography variant="h6" fontWeight={700} noWrap>
                            {project?.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {project?.area}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="primary.main"
                            fontWeight={700}
                            mt={1}
                          >
                            {formatCurrency(Number(project?.priceStartingFrom))}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {project?.area} • {project?.propertyType}
                          </Typography>
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}

            {/* Other Projects */}
            {otherProjectData.length > 0 && (
              <Box mb={6}>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Other Projects By {projectData?.projectInfo?.developer?.name}
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
                  {otherProjectData.map((project, index) => (
                    <SwiperSlide key={project.id || index}>
                      <Card
                        sx={{
                          borderRadius: '16px',
                          height: '100%',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          cursor: 'pointer',
                        }}
                        onClick={() => router.push(`/projects/${project.id}`)}
                      >
                        <Box sx={{ height: 200, overflow: 'hidden' }}>
                          {project?.mainImageUrl && (
                            <Image
                              src={
                                project.mainImageUrl || '/images/house-icon.png'
                              }
                              alt={project.name}
                              className="!static w-full object-cover"
                              fill
                            />
                          )}
                        </Box>
                        <CardContent>
                          <Typography variant="h6" fontWeight={700} noWrap>
                            {project?.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {project?.area}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="primary.main"
                            fontWeight={700}
                            mt={1}
                          >
                            {formatCurrency(Number(project?.priceStartingFrom))}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {project?.area} • {project?.propertyType}
                          </Typography>
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}

            <Faq specifications={specifications} />
          </Grid>

          {/* Right Column (Sidebar) */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <PropertyInquiryForm />

              {/* Project Location Map */}
              <Box mb={4} mt={4}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Project Location
                </Typography>
                <DynamicMap
                  latitude={location?.coordinates?.latitude}
                  longitude={location?.coordinates?.longitude}
                  address={location?.addressLine1}
                  locality={location?.locality}
                  city={location?.city}
                />
              </Box>

              {/* Overview Card */}
              <Box mb={4} mt={4}>
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
                  <Card
                    sx={{
                      borderRadius: '16px',
                      p: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    {towers.map((tower, index: number) => (
                      <Box key={tower.id || index} p={3}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          color="primary"
                          gutterBottom
                        >
                          {tower.blockName} ({tower.towerLabel})
                        </Typography>
                        <Divider />
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Total Floors
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {tower.storey}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={1}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Units per Floor
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {tower.unitsPerFloor}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Lifts per Tower
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {tower.lift}
                          </Typography>
                        </Box>
                        {index < towers.length - 1 && (
                          <Divider sx={{ mt: 1 }} />
                        )}
                      </Box>
                    ))}
                  </Card>
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
                                sx={{ color: 'success.main', mr: 1 }}
                              />{' '}
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
