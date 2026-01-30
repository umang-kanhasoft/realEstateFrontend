'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; import { classNames } from '@/utils/helpers';
import { AppBar, Box, Button, Container, Grid, IconButton, Menu, Stack, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  ExpandMore,
  FavoriteBorder,
  Menu as MenuIcon,
} from "@mui/icons-material";

const navLinks = [
  { name: 'Buy', href: '#' },
  { name: 'Sell', href: '#' },
  { name: 'Explore', href: '#' },
  { name: 'New Project', href: '#' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [headerMenuAnchor, setHeaderMenuAnchor] = useState(null);
  const [headerActiveTab, setHeaderActiveTab] = useState(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuName);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  // For Header Buttons (Buy, Sell, etc.)
  const handleOpenHeaderMenu = (event: any, tabName: any) => {
    setHeaderMenuAnchor(event.currentTarget);
    setHeaderActiveTab(tabName);
  };

  const handleCloseAll = () => {
    setAnchorEl(null);
    setActiveMenu(null);
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
  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ bgcolor: "white", borderBottom: "1px solid #eee" }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton onClick={(e) => handleOpenMenu(e, "mainMenu")}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: "#007bb5" }}
              >
                VITAL <span style={{ color: "#52b2e7" }}> space </span>
              </Typography>

              <Stack
                direction="row"
                sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}
              >
                {["Buy", "Sell", "Explore", "New Project"].map((m) => (
                  <Button
                    key={m}
                    endIcon={<ExpandMore />}
                    onClick={(e) => handleOpenHeaderMenu(e, m)}
                    sx={{
                      color: "#333",
                      textTransform: "none",
                      fontWeight: 500,
                      mx: 1,
                    }}
                  >
                    {m}
                  </Button>
                ))}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                {" "}
                New Launch{" "}
              </Typography>
              <FavoriteBorder />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={headerMenuAnchor}
        open={Boolean(headerMenuAnchor)}
        onClose={handleCloseAll}
        PaperProps={{ sx: { width: 500, mt: 1.5, p: 2, borderRadius: "12px" } }}
      >
        <Grid container spacing={2}>
          {headerActiveTab &&
            MENU_DATA[headerActiveTab].map((section, idx) => (
              <Grid item xs={6} key={idx}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="#007bb5"
                  gutterBottom
                >
                  {section.title}
                </Typography>
                {section.items.map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{
                      py: 0.5,
                      cursor: "pointer",
                      "&:hover": { color: "#52b2e7" },
                    }}
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