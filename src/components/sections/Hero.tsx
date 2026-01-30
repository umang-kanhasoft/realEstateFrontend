'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SearchForm from '@/components/forms/SearchForm';
import { Box, Button, Chip, Container, Divider, InputBase, Paper, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowForward, ExpandMore, Tune } from '@mui/icons-material';

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

const POPULAR_LOCALITIES = [
  "Adani Shantigram",
  "Ambli",
  "Bodakdev",
  "Chharodi",
  "Gota",
  "Jagatpur",
];

const Hero: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");
  const [minBudget, setMinBudget] = useState("Min");
  const [maxBudget, setMaxBudget] = useState("Max");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(TRENDING_PROJECTS);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuName);
  };
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === "Price on Request" || priceStr === "Min" || priceStr === "Max") return null;

    // Handle different price formats
    const price = priceStr.trim();
    const isRange = price.includes('-');
    let numericValue;

    if (isRange) {
      // For price ranges, take the lower value
      const [minPrice] = price.split('-').map(p => p.trim());
      numericValue = parseFloat(minPrice.replace(/[^0-9.]/g, ''));
    } else {
      numericValue = parseFloat(price.replace(/[^0-9.]/g, ''));
    }

    // Convert to Lakhs for consistent comparison
    if (price.toLowerCase().includes('cr')) {
      numericValue *= 100; // Convert Cr to Lakhs
    } else if (price.toLowerCase().includes('lac') || price.toLowerCase().includes('lakh')) {
      // Already in Lakhs
    } else if (price.includes('₹')) {
      // Assuming default is in Lakhs if no unit specified but has ₹ symbol
      // numericValue remains as is
    }

    return numericValue;
  };
  const handleSearch = () => {
    const filtered = TRENDING_PROJECTS.filter((project) => {
      // 1. Search Query (Title, Builder, Location, Config)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        [project.title, project.builder, project.location, project.config].some(
          (field) => field.toLowerCase().includes(searchLower)
        );

      // 2. City Filter - Case insensitive and partial match
      const matchesCity =
        selectedCity === "" ||
        project.location.toLowerCase().includes(selectedCity.toLowerCase());

      // 3. BHK Filter - Match any BHK in the config
      const matchesBHK =
        selectedBHK === "" ||
        project.config.toLowerCase().includes(selectedBHK.toLowerCase());

      // 4. Budget Filter
      const projectPrice = parsePrice(project.price);
      const min = parsePrice(minBudget);
      const max = parsePrice(maxBudget);

      let matchesBudget = true;
      if (projectPrice !== null) {
        if (min !== null && projectPrice < min) matchesBudget = false;
        if (max !== null && projectPrice > max) matchesBudget = false;
      } else if (min !== null || max !== null) {
        // If project price is not available but filters are set, exclude it
        matchesBudget = false;
      }

      return matchesSearch && matchesCity && matchesBHK && matchesBudget;
    });

    setFilteredProjects(filtered);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box
        sx={{
          bgcolor: "#52b2e7",
          borderRadius: "40px",
          pt: 8,
          pb: 12,
          px: 4,
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 6,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Explore 1000 + Verified Properties
        </Typography>

        {/* COMPLEX SEARCH BAR */}
        <Paper
          elevation={0}
          sx={{
            p: 0.5,
            display: "flex",
            alignItems: "center",
            borderRadius: "15px",
            maxWidth: "1000px",
            mx: "auto",
            bgcolor: "white",
          }}
        >
          <Box
            sx={{
              px: 2,
              textAlign: "left",
              minWidth: "120px",
              cursor: "pointer",
            }}
            onClick={(e) => handleOpenMenu(e, "city")}
          >
            <Typography variant="caption" color="text.secondary">
              {" "}
              Select City{" "}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* static "Ahmedabad" ki jagah selectedCity use karein */}
              <Typography variant="body2" fontWeight={600} color="black">
                {" "}
                {selectedCity}{" "}
              </Typography>
              <ExpandMore fontSize="small" sx={{ color: "black" }} />
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

          <Box sx={{ px: 2, flexGrow: 1, textAlign: "left" }}>
            <Typography variant="caption" color="text.secondary">
              {" "}
              Search By{" "}
            </Typography>
            <InputBase
              placeholder="Area/project/builder"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </Box>
          <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

          <Box
            sx={{ px: 2, minWidth: "100px", cursor: "pointer" }}
            onClick={(e) => handleOpenMenu(e, "bhk")}
          >
            <Typography variant="caption" color="text.secondary">
              {" "}
              Select BHK{" "}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* "BHK" ki jagah selectedBHK state aur fallback text */}
              <Typography variant="body2" fontWeight={600} color="black">
                {" "}
                {selectedBHK || "BHK"}
              </Typography>
              <ExpandMore fontSize="small" sx={{ color: "black" }} />
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

          <Box
            sx={{ px: 2, minWidth: "120px", cursor: "pointer" }}
            onClick={(e) => handleOpenMenu(e, "budget")}
          >
            <Typography variant="caption" color="text.secondary">
              {" "}
              Select Budget{" "}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Display selected range */}
              <Typography variant="body2" fontWeight={600} color="black">
                {minBudget !== "Min" || maxBudget !== "Max"
                  ? `${minBudget}-${maxBudget}`
                  : "Budget"}
              </Typography>
              <ExpandMore fontSize="small" sx={{ color: "black" }} />
            </Stack>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

          <Button
            startIcon={<Tune />}
            onClick={() => setFilterModalOpen(true)}
            sx={{ color: "#333", textTransform: "none", mx: 1 }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            onClick={handleSearch} // Click event add kiya
            sx={{ bgcolor: "#1c1c1c", borderRadius: "10px", px: 4, py: 1.5 }}
          >
            SEARCH
          </Button>
        </Paper>

        {/* LOCALITIES CHIPS */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 5, flexWrap: "wrap", gap: 1.5 }}
        >
          <Typography sx={{ alignSelf: "center", fontWeight: 600 }}>
            {" "}
            Popular Localities <ArrowForward fontSize="small" />{" "}
          </Typography>
          {POPULAR_LOCALITIES.map((loc) => (
            <Chip
              key={loc}
              label={loc}
              sx={{
                color: "white",
                border: "1px solid white",
                bgcolor: "rgba(255,255,255,0.1)",
              }}
              variant="outlined"
            />
          ))}
        </Stack>

        <Box
          sx={{
            position: "absolute",
            right: 20,
            bottom: 0,
            display: { xs: "none", lg: "block" },
          }}
        >
          <img src="/man-image.png" alt="" style={{ height: "350px" }} />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
