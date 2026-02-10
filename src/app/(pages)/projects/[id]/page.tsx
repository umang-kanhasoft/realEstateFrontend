'use client';

import AmenityCard from '@/components/property/AmenityCard';
import DynamicMap from '@/components/property/DynamicMap';
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
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FloorPlans from './FloorPlans';

const projectDetail = {
  title: 'The Empiirean',
  detail: '4, 5 BHK Flat for sale in Chharodi, Ahmedabad',
  developer: 'Pravish Group',
  address: 'Chharodi, Ahmedabad, Gujarat',
  rera: 'PR/GJ/AHMEDABAD/123/2024',
};

interface AmenityType {
  id: string;
  name: string;
  category: string;
}

export default function ProjectPage() {
  const { id } = useParams();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(''); // Will be set when data loads
  const [similarProjectData, setSimilarProjectData] = useState<Project[]>([]);
  const [otherProjectData, setOtherProjectData] = useState<Project[]>([]);

  // Extract unique BHK types from configurations for dynamic tabs
  const getUniqueBhkTypes = (): number[] => {
    if (!projectData?.pricingAndInventory?.configurations) return [];
    const bhkTypes = [
      ...new Set(
        projectData.pricingAndInventory.configurations.map(
          (config: Configuration) => config.bedrooms
        )
      ),
    ];
    return bhkTypes.sort((a: number, b: number) => a - b);
  };

  const bhkTypes = getUniqueBhkTypes();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const project = await ProjectsService.getProjectById(id as string);
        setProjectData(project.project);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    if (!projectData) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);

        const [similarProjectsRes, otherProjectsRes] = await Promise.all([
          ProjectsService.getProjects({
            priceMin:
              Number(projectData?.pricingAndInventory?.priceRange?.minPrice) ||
              0,
            priceMax:
              Number(projectData?.pricingAndInventory?.priceRange?.maxPrice) ||
              0,
            area: projectData?.location?.locality || undefined,
          }),

          ProjectsService.getProjects({
            builder: projectData?.projectInfo?.developer?.id || undefined,
          }),
        ]);

        setSimilarProjectData(similarProjectsRes.projects);
        setOtherProjectData(otherProjectsRes.projects);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectData]);

  // Set default tab to first available BHK type when data loads
  useEffect(() => {
    if (bhkTypes.length > 0 && value === '') {
      setValue(String(bhkTypes[0]));
    }
  }, [bhkTypes, value]);

  // if (loading) return <Loader />;
  if (!projectData || loading) return <Loader />;
  const {
    projectInfo,
    location,
    pricingAndInventory,
    amenities,
    media,
    metadata,
    towers,
  } = projectData;

  console.log(location, 'check location');

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
            <Typography variant="h4" fontWeight={800} color="primary">
              Price on Request
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {pricingAndInventory?.priceRange?.displayString}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, px: 4, borderRadius: '8px', fontWeight: 'bold' }}
            >
              Contact Builder
            </Button>
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
                        {item.price}
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
                <Tabs
                  value={value}
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
                        ), // Estimate
                        builtUpAreaSqft: Math.floor(
                          (config.superBuiltUpAreaSqft || 0) * 0.85
                        ), // Estimate
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
            <Box mb={6}>
              <Typography variant="h5" fontWeight={700} mb={3}>
                Amenities
              </Typography>
              <Grid container spacing={3}>
                {Object.values(amenities as Amenities)?.flatMap(item =>
                  item.map((amenity: AmenityType, index: number) => {
                    return (
                      <Grid item xs={6} sm={4} md={2} key={index}>
                        <AmenityCard title={amenity.name} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </Box>

            <Divider sx={{ mb: 5 }} />

            {/* About Project */}
            <Box mb={6}>
              <Typography variant="h5" fontWeight={700} mb={3}>
                About {projectDetail.title}
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
                {media?.videos?.length ? (
                  <video
                    width="100%"
                    height="100%"
                    controls
                    src={media.videos[0].url}
                    style={{ objectFit: 'cover' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </Box>
            </Box>

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
                {similarProjectData?.map((project, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      sx={{
                        borderRadius: '16px',
                        height: '100%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Box sx={{ height: 200, overflow: 'hidden' }}>
                        {project?.mainImageUrl && (
                          <Image
                            src={project.mainImageUrl}
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

            {/* Other Projects */}
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
                {otherProjectData?.map((project, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      sx={{
                        borderRadius: '16px',
                        height: '100%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Box sx={{ height: 200, overflow: 'hidden' }}>
                        {project?.mainImageUrl && (
                          <Image
                            src={project.mainImageUrl}
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

            <Faq />
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
                  {towers?.map((tower, index: number) => (
                    <Box key={tower.id || index} p={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="primary"
                        gutterBottom
                      >
                        {tower.blockName} ({tower.towerLabel})
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          Total Floors
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {tower.storey}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={1}>
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
                        <Divider sx={{ mt: 2, mb: 1 }} />
                      )}
                    </Box>
                  ))}
                </Card>
              </Box>

              {/* Key Features */}
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
                    {metadata?.keyFeatures?.map(
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
