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
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'white',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
