'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SearchForm from '@/components/forms/SearchForm';
import { Box, Button, Chip, Container, Divider, Grid, IconButton, InputBase, Menu, MenuItem, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowForward, Close, ExpandMore, Search, Tune } from '@mui/icons-material';

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
const BUDGET_OPTIONS = ['₹ 20 Lac', '₹ 25 Lac', '₹ 30 Lac', '₹ 35 Lac', '₹ 40 Lac', '₹ 45 Lac', '₹ 50 Lac', '₹ 60 Lac', '₹ 70 Lac', '₹ 75 Lac', '₹ 80 Lac', '₹ 85 Lac', '₹ 90 Lac', '₹ 95 Lac', '₹ 1 Lac'];

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
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
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
        selectedBHK.length === 0 ||
        selectedBHK.some(bhk =>
          project.config.toLowerCase().includes(bhk.toLowerCase())
        );


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
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };
  return (
    <>
      <Container maxWidth={false} sx={{ mt: 3 }}>
        <Box
          sx={{
            backgroundImage: "url(/images/banner1.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "40px",
            pt: { xs: 10, md: 20 },
            pb: { xs: 8, md: 10 },
            px: { xs: 2, md: 6 },
            textAlign: "center",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
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
                  {selectedBHK.length > 0 ? selectedBHK.join(', ') : 'BHK'}
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
            sx={{ mt: 5, flexWrap: "wrap", gap: 3 }}
          >
            <Typography sx={{ alignSelf: "center", fontWeight: 700 }}>
              {" "}
              Popular Localities <ArrowForward fontSize="small" sx={{ cursor: "pointer" }} />{" "}
            </Typography>
            {POPULAR_LOCALITIES.map((loc) => (
              <Chip
                key={loc}
                label={loc}
                sx={{
                  color: "black",
                  border: "1px solid black",
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
      <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: { xs: '95%', md: 600 }, bgcolor: 'white', borderRadius: '15px', p: 3,
          maxHeight: '90vh', overflowY: 'auto'
        }}>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              <IconButton onClick={() => setFilterModalOpen(false)} sx={{ mr: 1 }}>
                <Close />
              </IconButton> Filters</Typography>
          </Stack>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>Search City</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Ahmedabad" sx={{ bgcolor: '#e0f3ff', color: '#007bb5', border: '1px solid #007bb5' }} />
              <Chip label="Gandhinagar" variant="outlined" />
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>Search Locality / Project / Builder</Typography>
            <TextField fullWidth placeholder="Search Locality / Project / Builder" size="small" InputProps={{ startAdornment: <Search sx={{ color: 'gray', mr: 1 }} /> }} />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>Property Type</Typography>
            <Stack direction="row" spacing={1}>
              {['+ Flat', '+ Duplex', '+ Penthouse'].map(t => <Chip key={t} label={t} variant="outlined" clickable />)}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>BHK</Typography>
            <Grid container spacing={1}>
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK', '7 BHK'].map(b => (
                <Grid item key={b}><Chip label={`+ ${b}`} variant="outlined" clickable /></Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>Possession</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'].map(p => <Chip key={p} label={`+ ${p}`} variant="outlined" clickable />)}
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} mt={4}>
            <Button fullWidth variant="outlined" sx={{ borderRadius: '8px', color: 'black', borderColor: '#ddd' }}>Clear All</Button>
            <Button fullWidth variant="contained" sx={{ bgcolor: 'black', color: 'white', borderRadius: '8px', '&:hover': { bgcolor: '#333' } }}>Apply</Button>
          </Stack>
        </Box>
      </Modal>
      <Menu
        anchorEl={anchorEl}
        open={activeMenu === 'city' || activeMenu === 'bhk'}
        onClose={handleCloseMenu}
      >
        {activeMenu === 'city' && (
          <Box sx={{ p: 1, width: 250 }}>
            <TextField
              autoFocus
              fullWidth
              size="small"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 1 }}
            />
            {['Ahmedabad', 'Gandhinagar', 'Rajkot', 'Surat', 'Vadodara']
              .filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(c => (
                <MenuItem
                  key={c}
                  onClick={() => {
                    setSelectedCity(c);
                    setSearchQuery("");
                    handleCloseMenu();
                    handleSearch(); // Trigger search when city is selected
                  }}
                  selected={selectedCity === c}
                >
                  {c}
                </MenuItem>
              ))}
          </Box>
        )}
        {activeMenu === 'bhk' && (
          <Box sx={{ p: 2, width: 300 }}>
            <Grid container spacing={1}>
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK'].map(b => {
                const isSelected = selectedBHK.includes(b);
                return (
                  <Grid item key={b}>
                    <Chip
                      label={b}
                      variant={isSelected ? "filled" : "outlined"}
                      color={isSelected ? "primary" : "default"}
                      clickable
                      onClick={() => {
                        setSelectedBHK(prev =>
                          prev.includes(b)
                            ? prev.filter(item => item !== b) // remove
                            : [...prev, b]                     // add
                        );
                      }}
                    />
                  </Grid>
                )
              })}
              <Grid item xs={12} sx={{ mt: 1, textAlign: 'right' }}>
                <Button
                  size="small"
                  onClick={() => {
                    setSelectedBHK([]);
                    handleCloseMenu();
                    handleSearch();
                  }}
                  disabled={selectedBHK.length === 0}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Menu>

      {/* FOOTER & FAQ (Same as your file) */}
      {/* ... keeping the rest of your original sections ... */}

      {/* BUDGET DROPDOWN WINDOW (Image 8 & 9) */}
      <Menu
        anchorEl={anchorEl}
        open={activeMenu === 'budget'}
        onClose={handleCloseMenu}
        PaperProps={{ sx: { width: 350, p: 2, borderRadius: '12px', mt: 1 } }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            select fullWidth size="small" value={minBudget} label="Min"
            onChange={(e) => setMinBudget(e.target.value)} // Connect to State
          >
            <MenuItem value="Min">Min</MenuItem>
            {BUDGET_OPTIONS.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>

          <TextField
            select fullWidth size="small" value={maxBudget} label="Max"
            onChange={(e) => setMaxBudget(e.target.value)} // Connect to State
          >
            <MenuItem value="Max">Max</MenuItem>
            {BUDGET_OPTIONS.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>
        </Stack>
      </Menu>
    </>
  );
};

export default Hero;
