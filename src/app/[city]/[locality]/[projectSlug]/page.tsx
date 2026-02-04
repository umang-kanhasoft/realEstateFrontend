"use client";

import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Tabs,
    Tab,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { useParams } from "next/navigation";
import ProjectGallary from "@/components/property/ProjectGallary";
import FloorPlans from "./FloorPlans";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Faq from "@/components/sections/Faq";

const projectDetail = {
    title: "The Empiirean",
    detail: "4, 5 BHK Flat for sale in Chharodi, Ahmedabad",
    developer: "Pravish Group",
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
        title: "Jogging Track",
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
    {
        title: "Harmony Homes",
        image: "https://images.unsplash.com/photo-1660592869496-026699ec3581?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Greenfield, Seattle",
        price: "$540,000",
        area: "1500 sqft",
        type: "2 BHK",
    },
    {
        title: "Oceanview Condos",
        image: "https://plus.unsplash.com/premium_photo-1713829603075-100971ad39f8?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Beachside, Miami",
        price: "$880,000",
        area: "1900 sqft",
        type: "3 BHK",
    },
];


export default function ProjectPage() {
    const { city, locality, projectSlug } = useParams();
    const [value, setValue] = useState("3");

    return (
        <>
            <ProjectGallary />

            <Grid container spacing={4} px={{ xs: 20, md: 10 }} mt={4} mb={6}>
                {/* Project Header */}
                <Grid item xs={12} md={8}>
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Box>
                            <Typography variant="h4" fontWeight={600}>
                                {projectDetail.title}
                            </Typography>
                            <Typography color="text.secondary">
                                {projectDetail.detail}
                            </Typography>
                            <Typography color="text.secondary">
                                {projectDetail.developer}
                            </Typography>
                        </Box>

                        <Typography variant="h5" fontWeight={600}>
                            Price on Request
                        </Typography>
                    </Box>
                </Grid>

                {/* Config Cards */}
                <Grid item xs={12} md={8}>
                    <Box display="flex" gap={2} flexWrap="wrap" mt={4}>
                        {projectDescription.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    minWidth: 220,
                                    flex: "1 1 220px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#f5f5f5",
                                        p: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography fontWeight={600}>
                                        {item.title}
                                    </Typography>
                                </Box>

                                <Box p={2} textAlign="center">
                                    <Typography color="text.secondary">
                                        {item.building_area}
                                    </Typography>
                                    <Typography fontWeight={600}>
                                        {item.price}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            border: "1px solid #747474ff",
                            borderRadius: "16px",
                            p: 3,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Typography variant="h5" fontWeight={600} mb={2}>
                            Tower Overview
                        </Typography>

                        {towerdetail.map((item, index) => (
                            <Box key={index}>
                                {/* Tower Title */}
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    mb={2}
                                    color="primary"
                                >
                                    {item.tower}
                                </Typography>

                                {/* Details */}
                                <Box display="flex" justifyContent="space-between" mb={1.5}>
                                    <Typography color="text.secondary">Lifts</Typography>
                                    <Typography fontWeight={600}>{item.lift}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={1.5}>
                                    <Typography color="text.secondary">Total Units</Typography>
                                    <Typography fontWeight={600}>{item.total_units}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between">
                                    <Typography color="text.secondary">Total Floors</Typography>
                                    <Typography fontWeight={600}>{item.total_floors}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                {/* Floor Plans */}
                <Grid item xs={12} md={8} mb={2}>
                    <Typography variant="h4" fontWeight={600} mb={2}>
                        The Empiirean Floor Plan
                    </Typography>

                    <Tabs
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        sx={{ mb: 3 }}
                    >
                        <Tab label="2 BHK" value="2" />
                        <Tab label="3 BHK" value="3" />
                        <Tab label="4 BHK" value="4" />
                    </Tabs>

                    {value === "2" && <FloorPlans bhk="2" />}
                    {value === "3" && <FloorPlans bhk="3" />}
                    {value === "4" && <FloorPlans bhk="4" />}
                </Grid>

                {/* Overview Section */}
                <Grid item xs={12} md={4} mb={2}>
                    <Typography variant="h4" fontWeight={600} mb={2}>
                        Overview
                    </Typography>

                    <Grid container spacing={2}>
                        {overviewData.map((item, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Box
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "12px",
                                        p: 2,
                                    }}
                                >
                                    <Typography color="text.secondary">
                                        {item.label}
                                    </Typography>
                                    <Typography fontWeight={600}>
                                        {item.value}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight={600} mb={2}>
                        About The Empiirean Floor
                    </Typography>

                    <Typography variant="body2" mb={2}>
                        The Empiirean Floor is a premium residential project located in the heart of the city. It offers a unique blend of modern architecture, state-of-the-art facilities, and a prime location in the bustling commercial district.
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Vrundavan Elysia is a thoughtfully designed residential project that blends modern architecture with everyday comfort. Located in the rapidly developing area of Raysan, Gandhinagar, the project offers spacious and well-ventilated homes crafted for contemporary living.
                        esidents can enjoy a peaceful living environment along with excellent connectivity to schools, IT hubs, hospitals, shopping centers, and major road networks. With a focus on quality, safety, and lifestyle, Vrundavan Elysia is an ideal choice for families looking for a perfect balance between luxury and convenience
                    </Typography>
                    <Typography variant="body2" mb={2}>
                        Vrundavan Elysia is a thoughtfully designed residential project that blends modern architecture with everyday comfort. Located in the rapidly developing area of Raysan, Gandhinagar, the project offers spacious and well-ventilated homes crafted for contemporary living.
                        esidents can enjoy a peaceful living environment along with excellent connectivity to schools, IT hubs, hospitals, shopping centers, and major road networks. With a focus on quality, safety, and lifestyle, Vrundavan Elysia is an ideal choice for families looking for a perfect balance between luxury and convenience
                    </Typography>

                    <Typography variant="body2" mb={2}>
                        The Empiirean Floor is a premium residential project located in the heart of the city. It offers a unique blend of modern architecture, state-of-the-art facilities, and a prime location in the bustling commercial district.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" fontWeight={600} mb={2}>
                        Key Features
                    </Typography>
                    <Box>
                        {keyFeatures.map((item, index) => (
                            <Box key={index}>
                                <Typography variant="body2" mb={2}>
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight={600} mb={3}>
                        Amenities
                    </Typography>

                    <Grid container spacing={2}>
                        {amenitiesData.map((item, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "14px",
                                        overflow: "hidden",
                                        backgroundColor: "#fff",
                                        transition: "0.3s",
                                        "&:hover": {
                                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                            transform: "translateY(-4px)",
                                        },
                                    }}
                                >
                                    {/* Image */}
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.title}
                                        sx={{
                                            width: "100%",
                                            height: 110,
                                            objectFit: "cover",
                                        }}
                                    />

                                    {/* Title */}
                                    <Box p={1} textAlign="center">
                                        <Typography variant="body2" fontWeight={600}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Property Video
                    </Typography>
                    <video
                        width="100%"
                        height="auto"
                        controls
                        src="https://media.istockphoto.com/id/180617385/video/shaking-hands-after-selling-the-house.mp4?s=mp4-640x640-is&k=20&c=CHc2QVIFVYigtYmTHKHwsc6mc4fYD00Ne3SeAGIVJZk="
                    >
                        Your browser does not support the video tag.
                    </video>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Similar Projects
                    </Typography>

                    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, mb: 6 }}> {/* Added bottom margin */}
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                600: { slidesPerView: 2 },
                                900: { slidesPerView: 3 },
                            }}
                            modules={[Navigation, Autoplay]}
                        >
                            {similarProjectsData.map((project, index) => (
                                <SwiperSlide key={index}>
                                    <Card
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: 3,
                                            height: "100%",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                                            },
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {/* Image */}
                                        <Box
                                            sx={{
                                                height: 180,
                                                width: "100%",
                                                overflow: "hidden",
                                                borderTopLeftRadius: 12,
                                                borderTopRightRadius: 12,
                                            }}
                                        >
                                            <img
                                                src={project.image || "/placeholder.png"}
                                                alt={project.title || "Project Image"}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />
                                        </Box>

                                        {/* Card Content */}
                                        <CardContent sx={{ flexGrow: 1, px: 2, py: 1 }}>
                                            <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                                                {project.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {project.location}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {project.area} | {project.type}
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={600}
                                                color="primary"
                                                mt={1}
                                            >
                                                {project.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                </Grid>
                <Faq />
            </Grid >
        </>
    );
}
