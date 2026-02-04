"use client";

import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Container,
    Chip,
    Divider,
    Button,
    Paper,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useParams } from "next/navigation";
import ProjectGallary from "@/components/property/ProjectGallary";
import FloorPlans from "./FloorPlans";
import AmenityCard from "@/components/property/AmenityCard";
import OverviewItem from "@/components/property/OverviewItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Faq from "@/components/sections/Faq";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';

const projectDetail = {
    title: "The Empiirean",
    detail: "4, 5 BHK Flat for sale in Chharodi, Ahmedabad",
    developer: "Pravish Group",
    address: "Chharodi, Ahmedabad, Gujarat",
    rera: "PR/GJ/AHMEDABAD/123/2024"
};

const projectDescription = [
    {
        title: "4 BHK Flat",
        detail: "429 Sq-yrd",
        building_area: "Super Built-up Area",
        price: "Price On Request",
    },
    {
        title: "5 BHK Flat",
        detail: "429 Sq-yrd",
        building_area: "Super Built-up Area",
        price: "Sold Out",
    },
];

const overviewData = [
    { label: "Project Name", value: "Vrundavan Elysia" },
    { label: "Location", value: "Raysan, Gandhinagar" },
    { label: "Configuration", value: "3 BHK Flats" },
    { label: "Price Range", value: "₹1.22 Cr – ₹1.37 Cr" },
    { label: "Super Built-up Area", value: "271 – 305 Sq-yrd" },
    { label: "Developer", value: "SKR Madhav Developers" },
    { label: "Possession", value: "Dec 2026" },
    { label: "RERA No", value: "PR/GJ/GANDHINAGAR/123/2024" },
];

const towerdetail = [
    {
        tower: "Tower A",
        lift: "5",
        total_units: "100",
        total_floors: "10",

    }
];
const keyFeatures = [
    "✔️ Spacious 3 BHK apartments with modern layout",
    "🏗️ Premium quality construction and fittings",
    "🛗 High-speed elevators in every tower",
    "🔒 24x7 security with CCTV surveillance",
    "🌞 Well-ventilated homes with natural light",
    "🌿 Landscaped gardens and green spaces",
    "🚗 Dedicated parking for residents & visitors",
    "👶 Children’s play area & jogging track",
    "⚡ Power backup for common areas",
    "📍 Excellent connectivity to key locations",
];

const amenitiesData = [
    {
        title: "Swimming Pool",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Gymnasium",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Children's Play Area",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Landscaped Garden",
        image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Club House",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Indoor Games",
        image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "24x7 Security",
        image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
];

export const similarProjectsData = [
    {
        title: "Sunshine Apartments",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Downtown, New York",
        price: "$450,000",
        area: "1200 sqft",
        type: "2 BHK",
    },
    {
        title: "Greenwood Villas",
        image: "https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        location: "Suburb, Los Angeles",
        price: "$750,000",
        area: "2500 sqft",
        type: "4 BHK",
    },
    {
        title: "Lakeside Residency",
        image: "https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "$620,000",
        location: "London south harrow",
        area: "1800 sqft",
        type: "3 BHK",
    },
    {
        title: "Skyline Towers",
        image: "https://images.unsplash.com/photo-1632398535774-b95738ddff68?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "City Center, San Francisco",
        price: "$980,000",
        area: "2000 sqft",
        type: "3 BHK",
    },
];


export default function ProjectPage() {
    const { city, locality, projectSlug } = useParams();
    const [value, setValue] = useState("3");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box bgcolor="#f9f9f9" minHeight="100vh" pb={8}>
            <Container maxWidth="xl" sx={{ pt: 2, px: { xs: 2, md: 4 } }}>

                {/* Headers Section */}
                <Box mb={3} display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                    <Box>
                        <Chip label="RERA Registered" color="success" size="small" sx={{ mb: 1, fontWeight: 600 }} />
                        <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
                            {projectDetail.title}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5} color="text.secondary">
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="subtitle1">
                                {projectDetail.address}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} color="text.secondary">
                            <BusinessIcon fontSize="small" color="action" />
                            <Typography variant="subtitle1">
                                By <Box component="span" fontWeight={600} color="primary.main">{projectDetail.developer}</Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box textAlign={{ xs: "left", md: "right" }} mt={{ xs: 2, md: 0 }}>
                        <Typography variant="h4" fontWeight={800} color="primary">
                            Price on Request
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            EMI starts at ₹45k
                        </Typography>
                        <Button variant="contained" size="large" sx={{ mt: 2, px: 4, borderRadius: "8px", fontWeight: "bold" }}>
                            Contact Builder
                        </Button>
                    </Box>
                </Box>

                {/* Gallery */}
                <ProjectGallary />

                <Grid container spacing={4} mt={3}>
                    {/* Left Column (Main Content) */}
                    <Grid item xs={12} lg={8}>

                        {/* Config Cards */}
                        <Typography variant="h5" fontWeight={700} mb={2}>Configuration</Typography>
                        <Box display="flex" gap={2} flexWrap="wrap" mb={5}>
                            {projectDescription.map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        border: "1px solid #eee",
                                        borderRadius: "16px",
                                        minWidth: 240,
                                        flex: "1 1 auto",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                                        "&:hover": { borderColor: "primary.main", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }
                                    }}
                                >
                                    <Box bgcolor="#f4f6f8" p={1.5} textAlign="center">
                                        <Typography variant="subtitle1" fontWeight={700}>{item.title}</Typography>
                                    </Box>
                                    <Box p={2.5} textAlign="center">
                                        <Typography variant="body2" color="text.secondary" gutterBottom>{item.building_area}</Typography>
                                        <Typography variant="h6" fontWeight={700} color="primary.main">{item.price}</Typography>
                                    </Box>
                                </Card>
                            ))}
                        </Box>

                        <Divider sx={{ mb: 5 }} />

                        {/* Floor Plans */}
                        <Box mb={6}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3}>
                                <Typography variant="h5" fontWeight={700}>Floor Plans</Typography>
                                <Tabs
                                    value={value}
                                    onChange={(_, newValue) => setValue(newValue)}
                                    textColor="primary"
                                    indicatorColor="primary"
                                    variant="scrollable"
                                    scrollButtons="auto"
                                >
                                    <Tab label="2 BHK" value="2" sx={{ fontWeight: 600 }} />
                                    <Tab label="3 BHK" value="3" sx={{ fontWeight: 600 }} />
                                    <Tab label="4 BHK" value="4" sx={{ fontWeight: 600 }} />
                                </Tabs>
                            </Box>
                            {value === "2" && <FloorPlans bhk="2" />}
                            {value === "3" && <FloorPlans bhk="3" />}
                            {value === "4" && <FloorPlans bhk="4" />}
                        </Box>

                        <Divider sx={{ mb: 5 }} />

                        {/* Amenities */}
                        <Box mb={6}>
                            <Typography variant="h5" fontWeight={700} mb={3}>Amenities</Typography>
                            <Grid container spacing={3}>
                                {amenitiesData.map((item, index) => (
                                    <Grid item xs={6} sm={4} md={3} key={index}>
                                        <AmenityCard title={item.title} image={item.image} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Divider sx={{ mb: 5 }} />

                        {/* About Project */}
                        <Box mb={6}>
                            <Typography variant="h5" fontWeight={700} mb={3}>About {projectDetail.title}</Typography>
                            <Paper sx={{ p: 4, borderRadius: "16px", bgcolor: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
                                <Typography variant="body1" paragraph lineHeight={1.7} color="text.secondary">
                                    The Empiirean Floor is a premium residential project located in the heart of the city. It offers a unique blend of modern architecture, state-of-the-art facilities, and a prime location in the bustling commercial district.
                                </Typography>
                                <Typography variant="body1" paragraph lineHeight={1.7} color="text.secondary">
                                    Vrundavan Elysia is a thoughtfully designed residential project that blends modern architecture with everyday comfort. Located in the rapidly developing area of Raysan, Gandhinagar, the project offers spacious and well-ventilated homes crafted for contemporary living.
                                </Typography>
                                <Typography variant="body1" paragraph lineHeight={1.7} color="text.secondary">
                                    Residents can enjoy a peaceful living environment along with excellent connectivity to schools, IT hubs, hospitals, shopping centers, and major road networks. With a focus on quality, safety, and lifestyle, Vrundavan Elysia is an ideal choice for families looking for a perfect balance between luxury and convenience.
                                </Typography>
                            </Paper>
                        </Box>

                        {/* Property Video */}
                        <Box mb={6}>
                            <Typography variant="h5" fontWeight={700} mb={3}>Property Video</Typography>
                            <Box sx={{ borderRadius: "16px", overflow: "hidden", height: 400, bgcolor: "#000" }}>
                                <video
                                    width="100%"
                                    height="100%"
                                    controls
                                    src="https://media.istockphoto.com/id/180617385/video/shaking-hands-after-selling-the-house.mp4?s=mp4-640x640-is&k=20&c=CHc2QVIFVYigtYmTHKHwsc6mc4fYD00Ne3SeAGIVJZk="
                                    style={{ objectFit: 'cover' }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        </Box>

                        {/* Similar Projects */}
                        <Box mb={6}>
                            <Typography variant="h5" fontWeight={700} mb={3}>Similar Projects</Typography>
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
                                {similarProjectsData.map((project, index) => (
                                    <SwiperSlide key={index}>
                                        <Card sx={{ borderRadius: "16px", height: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                                            <Box sx={{ height: 200, overflow: "hidden" }}>
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </Box>
                                            <CardContent>
                                                <Typography variant="h6" fontWeight={700} noWrap>{project.title}</Typography>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>{project.location}</Typography>
                                                <Typography variant="subtitle1" color="primary.main" fontWeight={700} mt={1}>{project.price}</Typography>
                                                <Typography variant="caption" display="block" color="text.secondary">{project.area} • {project.type}</Typography>
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
                        <Box sx={{ position: "sticky", top: 100 }}>

                            {/* Overview Card */}
                            <Box mb={4}>
                                <Typography variant="h6" fontWeight={700} mb={2}>Overview</Typography>
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
                                <Typography variant="h6" fontWeight={700} mb={2}>Tower Details</Typography>
                                <Card sx={{ borderRadius: "16px", p: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                                    {towerdetail.map((item, index) => (
                                        <Box key={index} p={3}>
                                            <Typography variant="subtitle1" fontWeight={700} color="primary" gutterBottom>{item.tower}</Typography>
                                            <Divider sx={{ my: 1.5 }} />
                                            <Box display="flex" justifyContent="space-between" mb={1}>
                                                <Typography variant="body2" color="text.secondary">Total Floors</Typography>
                                                <Typography variant="body2" fontWeight={600}>{item.total_floors}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between" mb={1}>
                                                <Typography variant="body2" color="text.secondary">Total Units</Typography>
                                                <Typography variant="body2" fontWeight={600}>{item.total_units}</Typography>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body2" color="text.secondary">Lifts per Tower</Typography>
                                                <Typography variant="body2" fontWeight={600}>{item.lift}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Card>
                            </Box>

                            {/* Key Features */}
                            <Box>
                                <Typography variant="h6" fontWeight={700} mb={2}>Key Highlights</Typography>
                                <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                                    <Box p={3}>
                                        {keyFeatures.map((feature, idx) => (
                                            <Box key={idx} display="flex" gap={2} mb={1.5} alignItems="flex-start">
                                                <Typography variant="body2" lineHeight={1.6} color="text.secondary">
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        ))}
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
