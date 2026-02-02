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

export default function ProjectPage() {
    const { city, locality, projectSlug } = useParams();

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
                </Grid>
                <Grid item xs={12} md={4}>
                </Grid>
            </Grid>
        </>
    );
}
