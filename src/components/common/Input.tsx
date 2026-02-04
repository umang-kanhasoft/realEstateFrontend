'use client';

import { InputProps } from '@/types';
import { classNames } from '@/utils/helpers';
import { InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      placeholder,
      type = 'text',
      value,
      onChange,
      error,
      helperText,
      disabled = false,
      required = false,
      fullWidth = true,
      startAdornment,
      endAdornment,
      className,
    },
    ref
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      onChange(event.target.value);
    };

    return (
      <TextField
        ref={ref}
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        error={Boolean(error)}
        helperText={error || helperText}
        disabled={disabled}
        required={required}
        fullWidth={fullWidth}
        variant="outlined"
        className={classNames('mb-4', className)}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
          // Applying Tailwind classes to the input root
          className: 'bg-white rounded-xl hover:border-primary-500',
        }}
        // Using sx only for specific internal targeting where className might struggle with specificity override on MuiOutlinedInput structure
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'white',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              // borderColor: 'var(--color-primary-600)', // Could be handled by TW, but MUI specific
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
              // borderColor: 'var(--color-primary-600)',
            },
          },
          // Tailwind equivalent for focused state coloring would be handled via standard MUI theme or global css overrides usually.
          // But here we keep minimal sx to ensure 'white' background persists.
        }}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
