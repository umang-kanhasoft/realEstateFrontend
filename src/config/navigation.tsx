import {
  BookOpen,
  Compass,
  Heart,
  Home,
  LayoutDashboard,
  Scale,
  Search,
  TrendingUp,
  User,
} from 'lucide-react';
import React from 'react';

export interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const navLinks: NavLink[] = [
  {
    name: 'Buy',
    href: '/properties',
    icon: <Search className="h-4 w-4" />,
  },
  {
    name: 'Invest',
    href: '/invest',
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    name: 'Compare',
    href: '/compare',
    icon: <Scale className="h-4 w-4" />,
  },
  {
    name: 'Insights',
    href: '/insights',
    icon: <TrendingUp className="h-4 w-4" />,
  },
];

export const mobileNavLinks: NavLink[] = [
  {
    name: 'Home',
    href: '/',
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: 'Browse',
    href: '/properties',
    icon: <Compass className="h-5 w-5" />,
  },
  {
    name: 'Saved',
    href: '/favorites',
    icon: <Heart className="h-5 w-5" />,
  },
  {
    name: 'Admin',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <User className="h-5 w-5" />,
  },
];
