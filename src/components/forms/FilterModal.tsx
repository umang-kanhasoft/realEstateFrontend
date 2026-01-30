'use client';
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
}

const buttonGroupStyles = {
  '& .MuiToggleButton-root': {
    border: '1px solid #e5e7eb',
    color: '#374151',
    fontWeight: 500,
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: '#f3f4f6',
      color: '#111827',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#e5e7eb',
      },
    },
  },
};

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose }) => {
  // States for filters within the modal
  const [city, setCity] = React.useState('ahmedabad');
  const [propertyType, setPropertyType] = React.useState<string[]>(['flat']);
  const [bhk, setBhk] = React.useState<string[]>(['+1 BHK']);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 480, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">Filters</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 2, mr: -2 }}>
          {/* Search City */}
          <Typography fontWeight="medium" sx={{ mb: 1.5 }}>Search City</Typography>
          <ToggleButtonGroup
            value={city}
            exclusive
            onChange={(e, newCity) => newCity && setCity(newCity)}
            fullWidth
          >
            <ToggleButton value="ahmedabad">Ahmedabad</ToggleButton>
            <ToggleButton value="gandhinagar">Gandhinagar</ToggleButton>
          </ToggleButtonGroup>

          {/* Search Locality */}
          <Typography fontWeight="medium" sx={{ mt: 3, mb: 1.5 }}>Search Locality / Project / Builder</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Locality / Project / Builder"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: '#f9fafb' }}
          />
          
          <Divider sx={{ my: 3 }} />

          {/* Property Type */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography fontWeight="medium">Property Type</Typography>
            <Button size="small" variant="text" sx={{ textTransform: 'none' }}>Clear All</Button>
          </Box>
          <ToggleButtonGroup sx={buttonGroupStyles} value={propertyType} onChange={(e, types) => setPropertyType(types)}>
            <ToggleButton value="flat">Flat</ToggleButton>
            <ToggleButton value="duplex">Duplex</ToggleButton>
            <ToggleButton value="penthouse">Penthouse</ToggleButton>
          </ToggleButtonGroup>

          {/* BHK */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 1.5 }}>
            <Typography fontWeight="medium">BHK</Typography>
            <Button size="small" variant="text" sx={{ textTransform: 'none' }}>Clear All</Button>
          </Box>
          <ToggleButtonGroup size="small" sx={buttonGroupStyles} value={bhk} onChange={(e, newBhk) => setBhk(newBhk)}>
            <ToggleButton value="+1 BHK">+ 1 BHK</ToggleButton>
            <ToggleButton value="+2 BHK">+ 2 BHK</ToggleButton>
            <ToggleButton value="+3 BHK">+ 3 BHK</ToggleButton>
            <ToggleButton value="+4 BHK">+ 4 BHK</ToggleButton>
            <ToggleButton value="+5 BHK">+ 5 BHK</ToggleButton>
          </ToggleButtonGroup>
          
          {/* Budget */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 1.5 }}>
            <Typography fontWeight="medium">Budget</Typography>
            <Button size="small" variant="text" sx={{ textTransform: 'none' }}>Clear All</Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <FormControl fullWidth>
              <Select defaultValue="min" displayEmpty>
                <MenuItem value="min">Min</MenuItem>
                <MenuItem value="20">₹ 20 Lac</MenuItem>
                <MenuItem value="30">₹ 30 Lac</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select defaultValue="max" displayEmpty>
                <MenuItem value="max">Max</MenuItem>
                <MenuItem value="80">₹ 80 Lac</MenuItem>
                <MenuItem value="1cr">₹ 1 Cr</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Possession */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 1.5 }}>
            <Typography fontWeight="medium">Possession</Typography>
            <Button size="small" variant="text" sx={{ textTransform: 'none' }}>Clear All</Button>
          </Box>
          <ToggleButtonGroup size="small" sx={buttonGroupStyles} exclusive>
            <ToggleButton value="ready">+ Ready to Move</ToggleButton>
            <ToggleButton value="1year">+ Upto 1 Year</ToggleButton>
            <ToggleButton value="2years">+ Upto 2 Years</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="secondary" fullWidth sx={{ py: 1.5 }}>Clear All</Button>
          <Button variant="contained" color="secondary" fullWidth sx={{ py: 1.5 }}>Apply</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterModal;