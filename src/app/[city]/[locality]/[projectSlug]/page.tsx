"use client";

import React, { useState } from "react";
import { Box, Card, CardMedia, Grid, ImageList, ImageListItem, Modal, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import ProjectGallary from "@/components/property/ProjectGallary";
const projectDetail = {
    "title": "The Empiirean",
    "detail": "4, 5 BHK Flat for sale in&nbsp;Chharodi, Ahmedabad",
    "devloper": "Pravish Group"
}
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FloorPlans from "./FloorPlans";

const projectDescription = [
    {
        "title": "4 BHK Flat",
        "detail": "429 Sq-yrd",
        "building_area": "Super Builtup Area",
        "price": "Price On Request"
    }, {
        "title": "5 BHK Flat",
        "detail": "429 Sq-yrd",
        "building_area": "Super Builtup Area",
        "price": "Sold Out"
    }
]
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

export default function ProjectPage() {
    const { city, locality, projectSlug } = useParams();
    const [value, setValue] = useState("3");

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    return (
        <>
            <ProjectGallary />
            <Grid container spacing={4} px={20} mt={4}>
                <Grid item xs={12} md={8}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Box>
                            <Typography variant="h4" fontWeight={600}>
                                {projectDetail?.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {projectDetail?.detail}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {projectDetail?.devloper}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight={600}>
                                Price on Request
                            </Typography>
                        </Box>
                    </Box>
                    <Box display={"flex"} gap={2} flexWrap={"wrap"} mt={4}>
                        {projectDescription.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    minWidth: 200,
                                    flex: "1 1 200px", // makes it responsive
                                    backgroundColor: "#fff",
                                }}
                            >
                                {/* Top section with title */}
                                <Box
                                    sx={{
                                        backgroundColor: "#f5f5f5",
                                        p: 2,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {item?.title}
                                    </Typography>
                                </Box>

                                {/* Bottom section with details */}
                                <Box sx={{ p: 2, textAlign: "center" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {item?.building_area}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                        {item?.price}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box mt={4} mb={4}>
                        <Typography variant="h4" fontWeight={600}>
                            The Empiirean Floor Plan
                        </Typography>
                    </Box>
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            indicatorColor="primary"
                            sx={{
                                mb: 3,
                                "& .MuiTab-root": {
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "16px",
                                },
                                "& .MuiTabs-indicator": {
                                    height: "3px",
                                    borderRadius: "4px",
                                },
                            }}
                        >
                            <Tab label="2 BHK" value="2" />
                            <Tab label="3 BHK" value="3" />
                            <Tab label="4 BHK" value="4" />
                        </Tabs>
                        {value === "2" && <FloorPlans bhk="2" />}
                        {value === "3" && <FloorPlans bhk="3" />}
                        {value === "4" && <FloorPlans bhk="4" />}
                    </Box>

                    <Box sx={{ mt: 4, mb: 4 }}>
                        <Typography variant="h4" fontWeight={600}>
                            Overview
                        </Typography>
                        <Grid container spacing={2} mt={2}>
                            {overviewData.map((item, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Box
                                        sx={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "12px",
                                            p: 2,
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            {item?.label}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {item?.value}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                </Grid>
            </Grid>
        </>
    );
}
