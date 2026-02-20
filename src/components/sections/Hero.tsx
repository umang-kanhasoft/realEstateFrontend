'use client';
import { ExpandMore, LocationOn, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const POPULAR_LOCALITIES = [
  'Ambli',
  'Bopal',
  'SG Highway',
  'Gota',
  'Shela',
  'Sindhu Bhavan Road',
];

// Reliable High-Quality Image (Modern Blue/Glass Facade)
const HERO_IMAGE = '/images/banner1.webp';

const Hero: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Ahmedabad');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    menuName: string
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuName);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  return (
    <>
      <Box className="relative flex h-screen min-h-[700px] items-center overflow-hidden">
        {/* Background Image */}
        <Box className="absolute inset-0 -z-20">
          <Image
            src={HERO_IMAGE}
            alt="Modern luxury building in the city"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center"
          />
        </Box>

        {/* Dark Overlay for Text Readability */}
        <Box className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[1px]" />

        <Container maxWidth="xl" className="relative z-10">
          <Stack spacing={6} alignItems="center" textAlign="center">
            {/* Main Headlines */}
            <Box className="animate-fade-in-up">
              <Typography
                variant="h1"
                className="mb-6 text-4xl font-[800] leading-[1.1] tracking-tight text-white drop-shadow-2xl md:text-[5rem] lg:text-[6rem]"
              >
                Find Your <br />
                <span className="text-sky-400">Dream Property</span>
              </Typography>
              <Typography
                variant="h5"
                className="mx-auto max-w-[800px] text-base font-normal leading-relaxed text-white/90 drop-shadow-lg md:text-xl"
              >
                Search thousands of verified properties, from modern apartments
                to luxury villas, in the city&apos;s most premium locations.
              </Typography>
            </Box>

            {/* Main Search Bar - The "Core" Feature */}
            <Paper
              elevation={24}
              className="animate-fade-in-up flex w-full max-w-[900px] flex-col items-center gap-4 rounded-2xl border border-white/50 bg-white/95 p-3 backdrop-blur-xl delay-200 md:flex-row md:gap-0 md:rounded-[50px]"
            >
              {/* Location Selector */}
              <Button
                onClick={e => handleOpenMenu(e, 'city')}
                startIcon={<LocationOn className="text-secondary-900" />}
                endIcon={
                  <ExpandMore className="text-secondary-400 transition-transform duration-300 group-hover:rotate-180" />
                }
                className="group min-w-[200px] justify-between rounded-full bg-secondary-50 px-6 py-3 text-lg font-bold capitalize text-secondary-900 hover:bg-secondary-100 md:rounded-full"
                sx={{ textTransform: 'none' }}
              >
                {selectedCity}
              </Button>

              <Divider
                orientation="vertical"
                flexItem
                className="mx-2 hidden h-7 self-center md:block"
              />

              {/* Search Input */}
              <InputBase
                placeholder="Search '3 BHK in Bodakdev'..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const params = new URLSearchParams();
                    if (searchQuery) params.set('chat_query', searchQuery);
                    if (selectedCity) params.set('city', selectedCity);
                    router.push(`/properties?${params.toString()}`);
                  }
                }}
                className="w-full flex-1 px-4 text-center text-base md:w-auto md:text-left"
              />

              <Divider
                orientation="vertical"
                flexItem
                className="mx-2 hidden h-7 self-center md:block"
              />

              {/* Search Button */}
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  const params = new URLSearchParams();
                  if (searchQuery) params.set('chat_query', searchQuery);
                  if (selectedCity) params.set('city', selectedCity);
                  router.push(`/properties?${params.toString()}`);
                }}
                startIcon={
                  <Search className="transition-transform duration-300 group-hover:scale-110" />
                }
                className="group min-w-full rounded-full bg-secondary-900 px-10 py-3 text-base font-bold capitalize shadow-lg transition-all duration-300 hover:-translate-y-px hover:shadow-xl md:min-w-0 md:rounded-full"
              >
                Search
              </Button>
            </Paper>

            {/* Quick Chips */}
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
              useFlexGap
              className="animate-fade-in-up max-w-[800px] opacity-90 delay-300"
            >
              <Typography
                variant="body2"
                className="mr-4 self-center font-medium text-white"
              >
                Popular:
              </Typography>
              {POPULAR_LOCALITIES.map(loc => (
                <Chip
                  key={loc}
                  label={loc}
                  component={Link}
                  href={`/projects?area=${loc}`}
                  clickable
                  className="border border-white/20 bg-white/15 text-white backdrop-blur-sm hover:bg-white/80 hover:text-black"
                />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Menus logic ... */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          className: 'mt-2 min-w-[200px] rounded-xl shadow-xl',
        }}
      >
        {activeMenu === 'city' &&
          ['Ahmedabad', 'Gandhinagar'].map(city => (
            <MenuItem
              key={city}
              onClick={() => {
                setSelectedCity(city);
                handleCloseMenu();
              }}
              className="font-medium"
            >
              {city}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default Hero;
