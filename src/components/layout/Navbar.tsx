'use client';

import { useApp, useIsMobile, useThemeContext } from '@/hooks/useUI';
import { COMPANY_INFO, NAV_ITEMS } from '@/utils/constants';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { state, actions } = useApp();
  const { state: themeState, toggleMode } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          color="inherit"
          elevation={isScrolled ? 2 : 0}
          sx={{
            bgcolor: isScrolled ? 'background.paper' : 'transparent',
            transition: 'all 0.3s ease',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1 }}>
              {/* Logo */}
              <Link href="/" passHref style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
                >
                  <Box
                    component="span"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 700,
                      color: 'primary.main',
                    }}
                  >
                    Vital
                    <Box component="span" sx={{ color: 'text.primary' }}>
                      Space
                    </Box>
                  </Box>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    ml: 'auto',
                    mr: 2,
                  }}
                >
                  {NAV_ITEMS.map(item => (
                    <Link
                      key={item.id}
                      href={item.href}
                      passHref
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        sx={{
                          color: isActiveLink(item.href)
                            ? 'primary.main'
                            : 'text.primary',
                          fontWeight: isActiveLink(item.href) ? 600 : 500,
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: isActiveLink(item.href) ? '60%' : '0%',
                            height: '2px',
                            bgcolor: 'primary.main',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '60%',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </Box>
              )}

              {/* Right Actions */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  ml: isMobile ? 'auto' : 0,
                }}
              >
                <IconButton
                  onClick={toggleMode}
                  color="inherit"
                  aria-label="toggle theme"
                >
                  {themeState.mode === 'dark' ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>

                {!isMobile && (
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    href={`tel:${COMPANY_INFO.phone}`}
                  >
                    Contact Us
                  </Button>
                )}

                {isMobile && (
                  <IconButton
                    onClick={actions.toggleMobileMenu}
                    color="inherit"
                    aria-label="menu"
                  >
                    {state.isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={state.isMobileMenuOpen}
        onClose={actions.closeMobileMenu}
        PaperProps={{
          sx: { width: '80%', maxWidth: 300 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box
              component="span"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              VitalSpace
            </Box>
            <IconButton onClick={actions.closeMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <List>
            <AnimatePresence>
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem disablePadding>
                    <Link
                      href={item.href}
                      passHref
                      style={{ textDecoration: 'none', width: '100%' }}
                      onClick={actions.closeMobileMenu}
                    >
                      <ListItemButton
                        selected={isActiveLink(item.href)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontWeight: isActiveLink(item.href) ? 600 : 400,
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            fullWidth
            startIcon={<PhoneIcon />}
            href={`tel:${COMPANY_INFO.phone}`}
          >
            Contact Us
          </Button>
        </Box>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};
