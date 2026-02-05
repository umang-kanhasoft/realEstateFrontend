'use client';
import {
  ExpandMore,
  FavoriteBorder,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const MENU_DATA: Record<string, { title: string; items: string[] }[]> = {
  Buy: [
    {
      title: 'Residential',
      items: [
        'Flats in Ahmedabad',
        'House for Sale',
        'Villas in Ahmedabad',
        'Penthouse',
      ],
    },
    {
      title: 'Commercial',
      items: ['Office Space', 'Shops/Showrooms', 'Commercial Land'],
    },
    {
      title: 'Budget',
      items: ['Under 50 Lacs', '50 Lacs - 1 Cr', '1 Cr - 2 Cr', 'Above 2 Cr'],
    },
  ],
  Sell: [
    {
      title: 'Post Property',
      items: ['Sell Residential', 'Sell Commercial', 'Rent/Lease'],
    },
    {
      title: 'Services',
      items: ['Property Valuation', 'Legal Services', 'Marketing'],
    },
  ],
  Explore: [
    {
      title: 'Insights',
      items: ['Real Estate Trends', 'Localities Guide', 'Price Trends'],
    },
    {
      title: 'Lifestyle',
      items: ['Luxury Living', 'Green Projects', 'Smart Homes'],
    },
  ],
  'New Project': [
    {
      title: 'Hot Projects',
      items: ['Aarohi Avinya', 'Aristo Anantam', 'Nivaasa'],
    },
    {
      title: 'Coming Soon',
      items: ['The Regal', 'Satatya Syrii-2', 'Venus Pashmina'],
    },
  ],
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [headerMenuAnchor, setHeaderMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [headerActiveTab, setHeaderActiveTab] = useState<string | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // For Header Buttons (Buy, Sell, etc.)
  const handleOpenHeaderMenu = (
    event: React.MouseEvent<HTMLElement>,
    tabName: string
  ) => {
    setHeaderMenuAnchor(event.currentTarget);
    setHeaderActiveTab(tabName);
  };

  const handleCloseAll = () => {
    setAnchorEl(null);
    setHeaderMenuAnchor(null);
    setHeaderActiveTab(null);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={isScrolled ? 4 : 0}
        className={`border-b border-gray-100 bg-white transition-shadow ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <Container maxWidth="xl">
          <Toolbar className="justify-between px-0">
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton onClick={e => handleOpenMenu(e)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" className="font-black text-primary-600">
                Real <span className="text-primary-400"> Estate </span>
              </Typography>

              <Stack direction="row" className="ml-4 hidden md:flex">
                {['Buy', 'Sell', 'Explore', 'New Project'].map(m => (
                  <Button
                    key={m}
                    endIcon={<ExpandMore />}
                    onClick={e => handleOpenHeaderMenu(e, m)}
                    className="mx-1 rounded-full border border-transparent px-4 py-1.5 font-semibold text-secondary-700 transition-all duration-300 hover:border-secondary-900 hover:bg-secondary-900 hover:text-white"
                    sx={{ textTransform: 'none' }}
                  >
                    {m}
                  </Button>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography className="text-sm font-semibold">
                New Launch
              </Typography>
              <FavoriteBorder />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main/Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {Object.keys(MENU_DATA).map(item => (
          <Button
            key={item}
            fullWidth
            className="justify-start text-left text-gray-700"
            onClick={e => {
              handleCloseMenu();
              handleOpenHeaderMenu(e, item);
            }}
          >
            {item}
          </Button>
        ))}
      </Menu>

      <Menu
        anchorEl={headerMenuAnchor}
        open={Boolean(headerMenuAnchor)}
        onClose={handleCloseAll}
        PaperProps={{
          className: 'w-[500px] mt-1.5 p-4 rounded-xl',
          elevation: 4,
        }}
      >
        <Grid container spacing={2}>
          {headerActiveTab &&
            MENU_DATA[headerActiveTab] &&
            MENU_DATA[headerActiveTab].map((section, idx) => (
              <Grid item xs={6} key={idx}>
                <Typography
                  variant="subtitle2"
                  className="mb-2 font-bold text-primary-700"
                >
                  {section.title}
                </Typography>
                {section.items.map(item => (
                  <Typography
                    key={item}
                    variant="body2"
                    className="cursor-pointer py-1 text-secondary-600 transition-colors hover:text-primary-500"
                    onClick={handleCloseAll}
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
        </Grid>
      </Menu>
    </>
  );
};

export default Header;
