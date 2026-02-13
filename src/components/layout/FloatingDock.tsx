'use client';

import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import {
  Article,
  FavoriteBorder,
  GridView,
  Home,
  Login,
  Logout,
  Person,
  Phone,
  Search,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ElementType, ReactNode, useRef, useState } from 'react';

// Dock Item Component
function DockItem({
  icon: Icon,
  href,
  label,
  mouseX,
  onClick,
  customIcon,
}: {
  icon?: ElementType;
  href?: string; // Made optional
  label: string;
  mouseX: MotionValue;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void; // Added onClick
  customIcon?: ReactNode; // Allow custom icon (like Avatar)
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-full ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          : 'border border-gray-200/50 bg-white/10 text-gray-600 hover:bg-white/20 hover:text-blue-600'
      } backdrop-blur-md transition-colors duration-200`}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {customIcon ? (
        customIcon
      ) : Icon ? (
        <Icon className={isActive ? 'text-[24px]' : 'text-[20px]'} />
      ) : null}
      {isActive && (
        <motion.div
          layoutId="activeDot"
          className="absolute -bottom-2 h-1 w-1 rounded-full bg-blue-600"
        />
      )}
    </motion.div>
  );

  return (
    <Tooltip title={label} placement="top" TransitionComponent={Zoom} arrow>
      {href ? (
        <Link href={href} passHref prefetch={true}>
          {content}
        </Link>
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div onClick={onClick}>{content}</div>
      )}
    </Tooltip>
  );
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const { user, logout } = useAuth();
  const { openLogin } = useAuthModal();
  const router = useRouter();

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );

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

  const handleProfileClick = () => {
    handleCloseUserMenu();
    router.push('/profile');
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

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Properties', href: '/properties' },
    { icon: GridView, label: 'Projects', href: '/projects' },
    { icon: FavoriteBorder, label: 'Favorites', href: '/favorites' },
    { icon: Article, label: 'Blogs', href: '/blogs' },
    { icon: Phone, label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <Box
        className="pointer-events-auto fixed bottom-8 left-1/2 z-[1300] -translate-x-1/2"
        onMouseMove={e => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex items-end gap-3 rounded-full border border-white/20 bg-white/50 px-4 py-3 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
        >
          {navItems.map(item => (
            <DockItem key={item.href} {...item} mouseX={mouseX} />
          ))}

          {/* Auth Item */}
          {user ? (
            <DockItem
              label={user.fullName}
              mouseX={mouseX}
              onClick={handleOpenUserMenu}
              customIcon={
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: '#7C3AED' }} // Adjusted size for dock
                  alt={user.fullName}
                  src={user.profileImageUrl || undefined}
                >
                  <span className="text-xs">{getInitials(user.fullName)}</span>
                </Avatar>
              }
            />
          ) : (
            <DockItem
              icon={Login}
              label="Login"
              mouseX={mouseX}
              onClick={openLogin}
            />
          )}
        </motion.div>
      </Box>

      {/* User Menu Popover */}
      <Menu
        anchorEl={userMenuAnchor}
        id="dock-account-menu"
        open={Boolean(userMenuAnchor)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: -1.5,
            mb: 1.5,
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
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
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
        <MenuItem onClick={handleProfileClick}>
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
  );
}
