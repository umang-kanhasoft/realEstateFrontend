'use client';

import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { Logout, Person } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const TopUserMenu: React.FC = () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const { user, logout } = useAuth();
  const { openLogin } = useAuthModal();
  // User Menu Handlers
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1300,
      }}
    >
      {user ? (
        <>
          <Tooltip title="Account Settings">
            <IconButton
              onClick={handleOpenUserMenu}
              size="small"
              sx={{
                ml: 2,
                boxShadow: 3,
                bgcolor: 'white',
                '&:hover': { bgcolor: 'grey.100' },
              }}
              aria-controls={userMenuAnchor ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={userMenuAnchor ? 'true' : undefined}
            >
              <Avatar
                sx={{ width: 40, height: 40, bgcolor: '#7C3AED' }}
                alt={user.fullName}
                src={user.profileImageUrl || undefined}
              >
                {getInitials(user.fullName)}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* User Profile Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            id="account-menu"
            open={Boolean(userMenuAnchor)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                width: 220,
                borderRadius: 2,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {user?.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <Logout fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          onClick={openLogin}
          variant="contained"
          sx={{
            borderRadius: 20,
            textTransform: 'none',
            fontWeight: 600,
            backgroundImage: 'linear-gradient(to right, #7C3AED, #5B21B6)',
            boxShadow: 3,
          }}
        >
          Sign In
        </Button>
      )}
    </Box>
  );
};

export default TopUserMenu;
