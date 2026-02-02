"use client";

import React, { useState } from "react";
import { Box, Card, CardMedia, Grid, ImageList, ImageListItem, Modal, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useParams } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function ProjectPage() {
    const { city, locality, projectSlug } = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const DummyImage = [
        {
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            title: "dummy1",
        },
        {
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            title: "dummy2",
        },
        {
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            title: "dummy3",
        },
        {
            image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
            title: "dummy4",
        },
        {
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
            title: "dummy5",
        },
        {
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
            title: "dummy6",
        },
    ];

    const video = "https://media.istockphoto.com/id/1453963806/video/time-lapse-low-angle-of-tall-corporate-buildings-skyscraper-with-reflection-of-clouds-among.mp4?s=mp4-640x640-is&k=20&c=RIpYsVqpNXm-KOaMcpsMY80maM3p2SyEbjTTMxTqzz8=";

    const [openImageModal, setOpenImageModal] = useState(false);
    return (
        <>
            <Grid container spacing={4} px={20} mt={4}>
                <Grid item xs={12} md={8}>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={24}
                        navigation
                        slidesPerView={1}
                        loop
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        speed={600}
                    >
                        {DummyImage.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <Card
                                    sx={{
                                        p: 1,
                                        border: "1px solid #eee",
                                        boxShadow: "none",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        onClick={() => setOpenImageModal(true)}
                                        image={img?.image}
                                        sx={{
                                            height: 600,
                                            borderRadius: "12px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box>
                        <Card
                            sx={{
                                borderRadius: "16px",
                                overflow: "hidden",
                                height: 200,
                                boxShadow: "none",
                                border: "1px solid #eee",
                                mb: 2,
                            }}
                        >
                            <video
                                src={`${video}`}
                                controls
                                autoPlay
                                muted
                                loop
                                style={{
                                    width: "100%",
                                    height: "600px",
                                    objectFit: "cover",
                                }}
                            />
                        </Card>
                    </Box>
                    <Box display={"flex"} gap={2}>
                        {DummyImage.slice(0, 2).map((img, idx) => (
                            <Grid item xs={6} key={idx} display={"flex"}>
                                <Card
                                    sx={{
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: "none",
                                        border: "1px solid #eee",
                                        height: 400,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={img?.image}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Card>
                            </Grid>))}
                    </Box>
                </Grid>
            </Grid>

            <Modal
                open={openImageModal}
                onClose={() => setOpenImageModal(false)}
                aria-labelledby="project-gallery"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "95%", md: "80%" },
                        maxHeight: "90vh",
                        bgcolor: "#fff",
                        borderRadius: "12px",
                        boxShadow: 24,
                        p: 2,
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Project Gallery
                    </Typography>

                    <ImageList
                        cols={3}
                        gap={12}
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        {DummyImage.map((item, index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </Modal>

        </>
    );
}
