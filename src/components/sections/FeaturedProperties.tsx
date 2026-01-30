'use client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { CheckCircle } from '@mui/icons-material';
import { useState } from 'react';

// Sample featured properties with real images
const featuredProperties = [
  {
    id: '1',
    title: 'Luxury Sea View Apartment',
    location: 'Worli, Mumbai',
    price: 85000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Modern Villa with Pool',
    location: 'Whitefield, Bangalore',
    price: 125000000,
    bedrooms: 5,
    bathrooms: 6,
    area: 5500,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Premium Penthouse',
    location: 'Gurgaon, Delhi NCR',
    price: 95000000,
    bedrooms: 4,
    bathrooms: 5,
    area: 4200,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Elegant Family Home',
    location: 'Koregaon Park, Pune',
    price: 45000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Contemporary Apartment',
    location: 'Banjara Hills, Hyderabad',
    price: 65000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'rent',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Spacious Garden Villa',
    location: 'Jubilee Hills, Hyderabad',
    price: 180000000,
    bedrooms: 6,
    bathrooms: 7,
    area: 8000,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'sale',
    isNew: false,
    isFeatured: true,
  },
];
const TRENDING_PROJECTS = [
  {
    title: "Aristo Anantam",
    builder: "Aristo Lifespace",
    config: "3, 4 BHK Flat, Duplex",
    price: "₹1.06 Cr - ₹1.52 Cr",
    location: "Chharodi Ahmedabad",
  },
  {
    title: "Aarohi Avinya",
    builder: "Siddhi Infralink",
    config: "3 BHK Flat",
    price: "₹1.71 Cr - ₹1.79 Cr",
    location: "Satellite Ahmedabad",
  },
  {
    title: "Nivaasa",
    builder: "Rashmi Group",
    config: "3 BHK Flat, Penthouse",
    price: "₹78.00 L",
    location: "Shela Ahmedabad",
  },
  {
    title: "Ivory Orchards",
    builder: "Addor Group",
    config: "3 BHK Flat",
    price: "₹89.76 L",
    location: "Shilaj Ahmedabad",
  },
  {
    title: "Times 40",
    builder: "Times Square Arcade",
    config: "5 BHK Flat",
    price: "Price on Request",
    location: "Bodakdev Ahmedabad",
  },
  {
    title: "Harmony Harikesh",
    builder: "Harmony Group",
    config: "3, 4 BHK Flat",
    price: "₹1.82 Cr - ₹2.56 Cr",
    location: "Science City Ahmedabad",
  },
];
const FeaturedProperties = (): JSX.Element => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(TRENDING_PROJECTS);

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Typography variant="h5" fontWeight={700}>
            {" "}
            Trending Projects in Ahmedabad{" "}
          </Typography>
          <Button color="inherit" sx={{ textTransform: "none" }}>
            {" "}
            See All{" "}
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {featuredProperties.map((proj: any, idx: any) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                sx={{
                  display: "flex",
                  padding: "10px",
                  border: "1px solid #eee",
                  boxShadow: "none",
                  height: "136px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 160,
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  image={proj?.image}
                />
                <CardContent sx={{ padding: 0, marginLeft: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {" "}
                      {proj.title}{" "}
                    </Typography>
                    <CheckCircle sx={{ color: "#4da9ff", fontSize: 16 }} />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {" "}
                    {proj.builder}{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    display="block"
                  >
                    {" "}
                    {proj.config}{" "}
                  </Typography>
                  <Typography variant="caption"> {proj.location} </Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ mt: 1 }}>
                    {" "}
                    {proj.price}{" "}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Box
          sx={{
            bgcolor: "#a7e1ff",
            borderRadius: "40px",
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight={800} color="#0d2e5e">
            {" "}
            Your Dream Property just a click away{" "}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default FeaturedProperties;
