// "use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  TextField,
  MenuItem,
  Paper,
  Stack,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputBase,
  Divider,
  Menu,
  Modal,
} from "@mui/material";
import {
  ExpandMore,
  Search,
  Tune,
  CheckCircle,
  FavoriteBorder,
  Menu as MenuIcon,
  Facebook,
  Instagram,
  LinkedIn,
  X,
  YouTube,
  Close,
  ArrowForward,
} from "@mui/icons-material";

import homeImage from "../assets/images/IMG-20250711-WA0007_20250711105119.webp";

// --- DATA CONSTANTS (Directly from your screenshots) ---
const POPULAR_LOCALITIES = [
  "Adani Shantigram",
  "Ambli",
  "Bodakdev",
  "Chharodi",
  "Gota",
  "Jagatpur",
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

const BUDGET_OPTIONS = [
  "₹ 20 Lac",
  "₹ 25 Lac",
  "₹ 30 Lac",
  "₹ 35 Lac",
  "₹ 40 Lac",
  "₹ 45 Lac",
  "₹ 50 Lac",
  "₹ 60 Lac",
  "₹ 70 Lac",
  "₹ 75 Lac",
  "₹ 80 Lac",
  "₹ 85 Lac",
  "₹ 90 Lac",
  "₹ 95 Lac",
  "₹ 1 Lac",
];

// --- DATA FOR HEADER MENUS (From your new screenshots) ---
const MENU_DATA = {
  Buy: [
    {
      title: "Residential",
      items: [
        "Flats in Ahmedabad",
        "House for Sale",
        "Villas in Ahmedabad",
        "Penthouse",
      ],
    },
    {
      title: "Commercial",
      items: ["Office Space", "Shops/Showrooms", "Commercial Land"],
    },
    {
      title: "Budget",
      items: ["Under 50 Lacs", "50 Lacs - 1 Cr", "1 Cr - 2 Cr", "Above 2 Cr"],
    },
  ],
  Sell: [
    {
      title: "Post Property",
      items: ["Sell Residential", "Sell Commercial", "Rent/Lease"],
    },
    {
      title: "Services",
      items: ["Property Valuation", "Legal Services", "Marketing"],
    },
  ],
  Explore: [
    {
      title: "Insights",
      items: ["Real Estate Trends", "Localities Guide", "Price Trends"],
    },
    {
      title: "Lifestyle",
      items: ["Luxury Living", "Green Projects", "Smart Homes"],
    },
  ],
  "New Project": [
    {
      title: "Hot Projects",
      items: ["Aarohi Avinya", "Aristo Anantam", "Nivaasa"],
    },
    {
      title: "Coming Soon",
      items: ["The Regal", "Satatya Syrii-2", "Venus Pashmina"],
    },
  ],
};

export default function VitalSpaceFullPage() {
  // State for Dropdowns & Modals
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [headerMenuAnchor, setHeaderMenuAnchor] = useState(null);
  const [headerActiveTab, setHeaderActiveTab] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const [filteredProjects, setFilteredProjects] = useState(TRENDING_PROJECTS);

  // Search aur Filter inputs ke liye states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  // const [selectedBHK, setSelectedBHK] = useState([]);
  const [selectedBHK, setSelectedBHK] = useState("");

  // Data state
  // const [filteredProjects, setFilteredProjects] = useState(TRENDING_PROJECTS);

  // // Filter values states
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  // const [selectedBHK, setSelectedBHK] = useState(""); // Single select for now
  const [minBudget, setMinBudget] = useState("Min");
  const [maxBudget, setMaxBudget] = useState("Max");

  const parsePrice = (priceStr) => {
    if (
      !priceStr ||
      priceStr === "Price on Request" ||
      priceStr === "Min" ||
      priceStr === "Max"
    )
      return null;

    // Handle different price formats
    const price = priceStr.trim();
    const isRange = price.includes("-");
    let numericValue;

    if (isRange) {
      // For price ranges, take the lower value
      const [minPrice] = price.split("-").map((p) => p.trim());
      numericValue = parseFloat(minPrice.replace(/[^0-9.]/g, ""));
    } else {
      numericValue = parseFloat(price.replace(/[^0-9.]/g, ""));
    }

    // Convert to Lakhs for consistent comparison
    if (price.toLowerCase().includes("cr")) {
      numericValue *= 100; // Convert Cr to Lakhs
    } else if (
      price.toLowerCase().includes("lac") ||
      price.toLowerCase().includes("lakh")
    ) {
      // Already in Lakhs
    } else if (price.includes("₹")) {
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

  const handleOpenMenu = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuName);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  // For Header Buttons (Buy, Sell, etc.)
  const handleOpenHeaderMenu = (event, tabName) => {
    setHeaderMenuAnchor(event.currentTarget);
    setHeaderActiveTab(tabName);
  };

  const handleCloseAll = () => {
    setAnchorEl(null);
    setActiveMenu(null);
    setHeaderMenuAnchor(null);
    setHeaderActiveTab(null);
  };

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      {/* HEADER (Image 1 top) */}
  

      {/* HERO SECTION */}
     

      {/* TRENDING PROJECTS */}
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
          {filteredProjects.map((proj, idx) => (
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
                  image={homeImage}
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

      {/* BANNER (Image 2 middle) */}
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

      {/* LOCALITIES GRID (Image 2 bottom & 3) */}
      

      {/* FAQ SECTION (Image 4) */}
      <Container maxWidth="xl" sx={{ my: 8 }}>
        <Typography variant="h5" fontWeight={700} mb={4}>
          {" "}
          Frequently asked question{" "}
        </Typography>
        {[
          "Why choose Vitalspace as your real estate consultant in Ahmedabad & Gandhinagar?",
          "What services does a property consultant in Ahmedabad & Gandhinagar provide?",
          "How do real estate advisors differ from property specialists in Gandhinagar?",
        ].map((q, i) => (
          <Accordion
            key={i}
            elevation={0}
            sx={{
              border: "1px solid #eee",
              mb: 2,
              borderRadius: "12px !important",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{q}</Typography>{" "}
            </AccordionSummary>
            <AccordionDetails>
              {" "}
              <Typography variant="body2" color="text.secondary">
                {" "}
                Detailed answer for the question...
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* FOOTER (Image 5) */}
      <Box sx={{ borderTop: "1px solid #eee", pt: 8, pb: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: "#007bb5", mb: 2 }}
              >
                {" "}
                VITAL space{" "}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: "300px" }}
              >
                A trustworthy one stop solution for all your property needs.We
                ensure you buy / rent property that meets all your requirements.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography fontWeight={700} mb={2}>
                {" "}
                Quick Link{" "}
              </Typography>
              {["Home", "About Us", "Career", "Blogs", "FAQs"].map((l) => (
                <Typography
                  key={l}
                  variant="body2"
                  sx={{ mb: 1, color: "#555" }}
                >
                  {" "}
                  {l}{" "}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography fontWeight={700} mb={2}>
                {" "}
                Trending Projects{" "}
              </Typography>
              {["The Regal", "Satatya Syrii-2", "The Gold By Samor"].map(
                (l) => (
                  <Typography
                    key={l}
                    variant="body2"
                    sx={{ mb: 1, color: "#555" }}
                  >
                    {" "}
                    {l}{" "}
                  </Typography>
                )
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight={700} mb={2}>
                {" "}
                Connect with Us{" "}
              </Typography>
              <Typography variant="body2"> +91 99984 70000 </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {" "}
                info@vitalspace.in
              </Typography>
              <Stack direction="row" spacing={2}>
                <Facebook /> <Instagram /> <LinkedIn /> <X /> <YouTube />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* DROPDOWN MENUS (For City, BHK, Budget) */}
      <Menu
        anchorEl={anchorEl}
        open={activeMenu === "city" || activeMenu === "bhk"}
        onClose={handleCloseMenu}
      >
        {activeMenu === "city" && (
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
            {["Ahmedabad", "Gandhinagar", "Rajkot", "Surat", "Vadodara"]
              .filter((city) =>
                city.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((c) => (
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
        {activeMenu === "bhk" && (
          <Box sx={{ p: 2, width: 300 }}>
            <Grid container spacing={1}>
              {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "5+ BHK"].map(
                (b) => (
                  <Grid item key={b}>
                    <Chip
                      label={b}
                      variant={selectedBHK === b ? "filled" : "outlined"}
                      color={selectedBHK === b ? "primary" : "default"}
                      onClick={() => {
                        const newBHK = selectedBHK === b ? "" : b;
                        setSelectedBHK(newBHK);
                        handleCloseMenu();
                        // Trigger search after a small delay to allow state to update
                        setTimeout(handleSearch, 100);
                      }}
                      clickable
                    />
                  </Grid>
                )
              )}
              <Grid item xs={12} sx={{ mt: 1, textAlign: "right" }}>
                <Button
                  size="small"
                  onClick={() => {
                    setSelectedBHK("");
                    handleCloseMenu();
                    handleSearch();
                  }}
                  disabled={!selectedBHK}
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
        open={activeMenu === "budget"}
        onClose={handleCloseMenu}
        PaperProps={{ sx: { width: 350, p: 2, borderRadius: "12px", mt: 1 } }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            select
            fullWidth
            size="small"
            value={minBudget}
            label="Min"
            onChange={(e) => setMinBudget(e.target.value)} // Connect to State
          >
            <MenuItem value="Min"> Min </MenuItem>
            {BUDGET_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {" "}
                {opt}{" "}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            size="small"
            value={maxBudget}
            label="Max"
            onChange={(e) => setMaxBudget(e.target.value)} // Connect to State
          >
            <MenuItem value="Max"> Max </MenuItem>
            {BUDGET_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {" "}
                {opt}{" "}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Menu>

      {/* FILTER MODAL (Image 10) */}
      <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: 600 },
            bgcolor: "white",
            borderRadius: "15px",
            p: 3,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              {" "}
              <IconButton
                onClick={() => setFilterModalOpen(false)}
                sx={{ mr: 1 }}
              >
                {" "}
                <Close />
              </IconButton>{" "}
              Filters{" "}
            </Typography>
          </Stack>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              {" "}
              Search City{" "}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label="Ahmedabad"
                sx={{
                  bgcolor: "#e0f3ff",
                  color: "#007bb5",
                  border: "1px solid #007bb5",
                }}
              />
              <Chip label="Gandhinagar" variant="outlined" />
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              {" "}
              Search Locality / Project / Builder{" "}
            </Typography>
            <TextField
              fullWidth
              placeholder="Search Locality / Project / Builder"
              size="small"
              InputProps={{
                startAdornment: <Search sx={{ color: "gray", mr: 1 }} />,
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              {" "}
              Property Type{" "}
            </Typography>
            <Stack direction="row" spacing={1}>
              {["+ Flat", "+ Duplex", "+ Penthouse"].map((t) => (
                <Chip key={t} label={t} variant="outlined" clickable />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              {" "}
              BHK{" "}
            </Typography>
            <Grid container spacing={1}>
              {[
                "1 BHK",
                "2 BHK",
                "3 BHK",
                "4 BHK",
                "5 BHK",
                "6 BHK",
                "7 BHK",
              ].map((b) => (
                <Grid item key={b}>
                  {" "}
                  <Chip label={`+ ${b}`} variant="outlined" clickable />{" "}
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={1}>
              {" "}
              Possession{" "}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {["Ready to Move", "Upto 1 Year", "Upto 2 Years", "2+ Years"].map(
                (p) => (
                  <Chip key={p} label={`+ ${p}`} variant="outlined" clickable />
                )
              )}
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: "8px", color: "black", borderColor: "#ddd" }}
            >
              {" "}
              Clear All{" "}
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              {" "}
              Apply{" "}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
