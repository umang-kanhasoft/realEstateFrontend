'use client';

import { classNames } from '@/utils/helpers';
import { Paper, PaperProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

interface CardProps extends Omit<PaperProps, 'elevation'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  variant?: 'elevated' | 'outlined' | 'filled';
}

const paddingStyles = {
  none: '',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      hover = true,
      padding = 'medium',
      variant = 'elevated',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl overflow-hidden';

    const hoverStyles = hover
      ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover'
      : '';

    const variantStyles = {
      elevated: 'bg-white shadow-card',
      outlined: 'bg-white border border-secondary-200',
      filled: 'bg-secondary-50',
    };

    return (
      <Paper
        ref={ref}
        elevation={0}
        className={classNames(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </Paper>
    );
  }
);

Card.displayName = 'Card';

export default Card;
