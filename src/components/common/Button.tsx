'use client';

import { ButtonProps } from '@/types';
import { classNames } from '@/utils/helpers';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { forwardRef, MouseEvent } from 'react';

const variantStyles = {
  primary:
    'bg-gradient-to-r from-primary-700 to-primary-500 text-white hover:from-primary-800 hover:to-primary-600',
  secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  ghost: 'text-secondary-600 hover:bg-secondary-100',
  link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
};

const sizeStyles = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      loading = false,
      startIcon,
      endIcon,
      onClick,
      type = 'button',
      href,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const buttonClasses = classNames(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (loading || disabled) return;
      onClick?.(event);
    };

    const content = (
      <>
        {loading && (
          <CircularProgress size={20} className="mr-2" color="inherit" />
        )}
        {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
      </>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className={buttonClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
