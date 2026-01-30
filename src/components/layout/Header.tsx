'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';import { classNames } from '@/utils/helpers';
import { Box, Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const navLinks = [
  { name: 'Buy', href: '#' },
  { name: 'Sell', href: '#' },
  { name: 'Explore', href: '#' },
  { name: 'New Project', href: '#' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
    useEffect(() => {
      const handleScroll = (): void => {
        setIsScrolled(window.scrollY > 50);
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container maxWidth="xl" className="py-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Box className="flex items-center">
                              <Box
                                className={classNames(
                                  'font-heading text-2xl font-bold transition-colors duration-300',
                                  isScrolled ? 'text-primary-700' : 'text-white'
                                )}
                              >
                                Vital<span className="text-accent-gold">Space</span>
                              </Box>
                            </Box>
                          </motion.div>
                        </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-brand-dark hover:text-brand-teal transition-colors duration-300 font-medium text-[15px]"
                >
                  {link.name} <KeyboardArrowDownIcon fontSize="small" className="ml-0.5" />
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="hidden sm:block text-brand-dark hover:text-brand-teal transition-colors duration-300 font-medium text-[15px]"
            >
              New Launch
            </Link>
            <FavoriteBorderIcon className="text-brand-gray cursor-pointer hover:text-red-500" />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;