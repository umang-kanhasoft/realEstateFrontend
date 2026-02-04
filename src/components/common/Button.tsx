import { ButtonProps } from '@/types';
import { CircularProgress, Button as MuiButton } from '@mui/material';
import Link from 'next/link';
import { forwardRef, MouseEvent } from 'react';

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
      className = '',
      ...props
    },
    ref
  ) => {
    // Map custom variants to Tailwind classes
    let variantClasses = '';

    switch (variant) {
      case 'primary':
        variantClasses =
          'bg-primary-600 text-white hover:bg-primary-700 shadow-sm';
        break;
      case 'secondary':
        variantClasses =
          'bg-secondary-100 text-secondary-700 hover:bg-secondary-200';
        break;
      case 'outline':
        variantClasses =
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50';
        break;
      case 'ghost':
        variantClasses =
          'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900';
        break;
      case 'link':
        variantClasses =
          'text-primary-600 hover:underline px-0 min-w-0 bg-transparent hover:bg-transparent shadow-none';
        break;
    }

    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-5 py-2.5 text-base',
      large: 'px-6 py-3.5 text-lg',
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (loading || disabled) return;
      onClick?.(event);
    };

    const buttonContent = (
      <MuiButton
        ref={ref}
        type={type} // Only valid for button element
        onClick={!href ? handleClick : undefined}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : startIcon
        }
        endIcon={!loading && endIcon}
        className={`rounded-lg font-semibold normal-case transition-all duration-200 ${variantClasses} ${sizeClasses[size === 'small' ? 'small' : size === 'medium' ? 'medium' : 'large']} ${disabled ? 'cursor-not-allowed !border-gray-200 !bg-gray-100 !text-gray-400 !shadow-none' : ''} ${className} `}
        // Resetting default MUI styles that conflict or aren't needed
        sx={{
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }}
        {...(!href ? props : {})}
      >
        {children}
      </MuiButton>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className="inline-block w-full no-underline">
          {/* When wrapping in Link, we might not want MuiButton to handle 'type' attribute or non-visual props heavily */}
          {/* But MuiButton component="div" or similar is sometimes better to avoid hydration issues if Link contains button */}
          {/* Correct approach: Link wraps the MuiButton, but MuiButton should be a span or div if inside a Link 
                to avoid button > a > button scenario if not careful. 
                However, Next.js Link > button is valid HTML5.
            */}
          {buttonContent}
        </Link>
      );
    }

    return buttonContent;
  }
);

Button.displayName = 'Button';

export default Button;
