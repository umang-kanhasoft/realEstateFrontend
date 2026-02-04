'use client';

import { NAV_ITEMS, SITE_CONFIG } from '@/utils/constants';
import { classNames } from '@/utils/helpers';
import {
  Close as CloseIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps): JSX.Element => {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
        },
      }}
    >
      <Box className="flex h-full flex-col">
        {/* Header */}
        <Box className="flex items-center justify-between border-b border-secondary-100 p-4">
          <Typography
            variant="h6"
            className="font-heading font-bold text-secondary-900"
          >
            Menu
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation Links */}
        <Box className="flex-1 overflow-auto py-4">
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
                    <ListItemButton
                      component={Link}
                      href={item.href}
                      className={classNames(
                        'py-3',
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-secondary-700 hover:bg-secondary-50'
                      )}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          className: 'font-medium text-lg',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Box>

        {/* Contact Info */}
        <Box className="border-t border-secondary-100 bg-secondary-50 p-4">
          <Typography
            variant="subtitle2"
            className="mb-3 font-semibold text-secondary-900"
          >
            Contact Us
          </Typography>
          <Box className="space-y-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-3 text-sm text-secondary-600 hover:text-primary-600"
            >
              <PhoneIcon fontSize="small" className="text-primary-600" />
              {SITE_CONFIG.phone}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 text-sm text-secondary-600 hover:text-primary-600"
            >
              <EmailIcon fontSize="small" className="text-primary-600" />
              {SITE_CONFIG.email}
            </a>
            <div className="flex items-start gap-3 text-sm text-secondary-600">
              <LocationIcon
                fontSize="small"
                className="mt-0.5 text-primary-600"
              />
              <span>{SITE_CONFIG.address}</span>
            </div>
          </Box>
        </Box>

        {/* CTA Button */}
        <Box className="p-4">
          <Link
            href="/contact"
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary-700 to-primary-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            onClick={onClose}
          >
            Get in Touch
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
