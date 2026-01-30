'use client';

import { classNames } from '@/utils/helpers';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
  subtitleClassName?: string;
  badge?: string;
  children?: ReactNode;
}

const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  titleClassName,
  subtitleClassName,
  badge,
  children,
}: SectionTitleProps): JSX.Element => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <Box className={classNames('mb-12', alignmentClasses[align])}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {badge && (
          <span className="bg-primary-100 text-primary-700 mb-4 inline-block rounded-full px-4 py-1 text-sm font-semibold">
            {badge}
          </span>
        )}
        <Typography
          variant="h2"
          component="h2"
          className={classNames(
            'text-secondary-900 font-heading font-bold',
            titleClassName
          )}
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            className={classNames(
              'text-secondary-600 mt-4 max-w-2xl text-lg',
              align === 'center' && 'mx-auto',
              subtitleClassName
            )}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </motion.div>
    </Box>
  );
};

export default SectionTitle;
