'use client';

import {
  Article,
  FavoriteBorder,
  GridView,
  Home,
  Phone,
  Search,
} from '@mui/icons-material';
import { Box, Tooltip, Zoom } from '@mui/material';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType, useRef } from 'react';

// Dock Item Component
function DockItem({
  icon: Icon,
  href,
  label,
  mouseX,
}: {
  icon: ElementType;
  href: string;
  label: string;
  mouseX: MotionValue;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === href;

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

  return (
    <Tooltip title={label} placement="top" TransitionComponent={Zoom} arrow>
      <Link href={href} passHref prefetch={true}>
        <motion.div
          ref={ref}
          style={{ width }}
          className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-full ${
            isActive
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'border border-gray-200/50 bg-white/10 text-gray-600 hover:bg-white/20 hover:text-blue-600'
          } backdrop-blur-md transition-colors duration-200`}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className={isActive ? 'text-[24px]' : 'text-[20px]'} />
          {isActive && (
            <motion.div
              layoutId="activeDot"
              className="absolute -bottom-2 h-1 w-1 rounded-full bg-blue-600"
            />
          )}
        </motion.div>
      </Link>
    </Tooltip>
  );
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Properties', href: '/properties' },
    { icon: GridView, label: 'Projects', href: '/projects' },
    { icon: FavoriteBorder, label: 'Favorites', href: '/favorites' },
    { icon: Article, label: 'Blogs', href: '/blogs' },
    { icon: Phone, label: 'Contact', href: '/contact' },
  ];

  return (
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
      </motion.div>
    </Box>
  );
}
