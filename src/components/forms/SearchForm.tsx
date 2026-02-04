'use client';
import {
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const SearchForm: React.FC = () => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [searchParams, setSearchParams] = useState({
    city: 'ahmedabad',
    searchQuery: '',
    bhk: '',
    budget: '',
  });

  const [filterParams, setFilterParams] = useState({
    minBudget: '',
    maxBudget: '',
    propertyType: [] as string[],
    bhkTypes: [] as string[],
    possession: [] as string[],
  });

  const handleClickOpen = () => setOpenFilterDialog(true);
  const handleClose = () => setOpenFilterDialog(false);

  const handleSearchChange = (field: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterParamChange = (field: string, value: string | string[]) => {
    setFilterParams(prev => ({ ...prev, [field]: value }));
  };

  const createToggleHandler =
    (field: keyof typeof filterParams) => (value: string) => {
      const currentValues = filterParams[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      handleFilterParamChange(field, newValues);
    };

  const handlePropertyTypeToggle = createToggleHandler('propertyType');
  const handleBhkToggle = createToggleHandler('bhkTypes');
  const handlePossessionToggle = createToggleHandler('possession');

  const clearAllFilters = () => {
    setFilterParams({
      minBudget: '',
      maxBudget: '',
      propertyType: [],
      bhkTypes: [],
      possession: [],
    });
  };

  const popularLocalities = [
    'Adani Shantigram',
    'Ambli',
    'Bodakdev',
    'Chharodi',
    'Gota',
  ];
  const budgetOptions = [
    { value: '20', label: '₹ 20 Lac' },
    { value: '25', label: '₹ 25 Lac' },
    { value: '30', label: '₹ 30 Lac' },
    { value: '35', label: '₹ 35 Lac' },
    { value: '40', label: '₹ 40 Lac' },
    { value: '45', label: '₹ 45 Lac' },
    { value: '50', label: '₹ 50 Lac' },
  ];

  return (
    <Box className="relative flex w-full items-center justify-center bg-gray-100 py-16">
      {/* Background Banner Image */}
      {/* Content Overlay */}
      <Box className="relative z-10 w-full max-w-6xl px-4">
        <Typography
          // variant="h3"
          className="mb-8 text-center text-2xl font-bold text-gray-800 md:text-3xl"
        >
          Explore 1000+ Verified Properties
        </Typography>

        {/* Main Search Bar */}
        <Box className="rounded-xl bg-white p-4 shadow-lg">
          <Box className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1.5fr,2.5fr,1fr,1.5fr,auto]">
            <FormControl fullWidth size="small">
              <InputLabel>Select City</InputLabel>
              <Select
                value={searchParams.city}
                label="Select City"
                onChange={e => handleSearchChange('city', e.target.value)}
              >
                <MenuItem value="ahmedabad">Ahmedabad</MenuItem>
                <MenuItem value="gandhinagar">Gandhinagar</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              placeholder="Search By Area/project/builder"
              variant="outlined"
              size="small"
              value={searchParams.searchQuery}
              onChange={e => handleSearchChange('searchQuery', e.target.value)}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Select BHK</InputLabel>
              <Select
                value={searchParams.bhk}
                label="Select BHK"
                onChange={e => handleSearchChange('bhk', e.target.value)}
              >
                <MenuItem value="1">1 BHK</MenuItem>
                <MenuItem value="2">2 BHK</MenuItem>
                <MenuItem value="3">3 BHK</MenuItem>
                <MenuItem value="4">4+ BHK</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Select Budget</InputLabel>
              <Select
                value={searchParams.budget}
                label="Select Budget"
                onChange={e => handleSearchChange('budget', e.target.value)}
              >
                <MenuItem value="50L">Under 50L</MenuItem>
                <MenuItem value="1Cr">Under 1Cr</MenuItem>
                <MenuItem value="2Cr">Under 2Cr</MenuItem>
              </Select>
            </FormControl>

            <Box className="flex items-center gap-2">
              <Button
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={handleClickOpen}
                sx={{
                  height: '40px',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                className="bg-black text-white hover:bg-gray-800"
                sx={{ height: '40px', boxShadow: 'none' }}
              >
                Search
              </Button>
            </Box>
          </Box>

          <Box className="mt-4 flex flex-wrap items-center gap-4">
            <Typography
              variant="body2"
              className="flex items-center font-medium"
            >
              Popular Localities
              <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </Typography>
            {popularLocalities.map(locality => (
              <Chip
                key={locality}
                label={locality}
                variant="outlined"
                onClick={() => handleSearchChange('searchQuery', locality)}
                sx={{ borderRadius: '6px', height: '28px' }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Filter Dialog */}
      <Dialog
        open={openFilterDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ className: 'rounded-xl' }}
      >
        <DialogTitle className="flex items-center justify-between pb-2">
          <Typography variant="h6" className="font-bold">
            Filters
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent className="space-y-6 p-6">
          {/* City & Search */}
          <Box>
            <Typography variant="subtitle2" className="mb-2 font-medium">
              Search City
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {['Ahmedabad', 'Gandhinagar'].map(city => (
                <Chip
                  key={city}
                  label={city}
                  variant={
                    searchParams.city === city.toLowerCase()
                      ? 'filled'
                      : 'outlined'
                  }
                  onClick={() => handleSearchChange('city', city.toLowerCase())}
                  className="h-9"
                />
              ))}
            </Box>
          </Box>
          <TextField
            fullWidth
            label="Search Locality / Project / Builder"
            variant="outlined"
            size="small"
            value={searchParams.searchQuery}
            onChange={e => handleSearchChange('searchQuery', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Property Type */}
          <Box>
            <Box className="mb-2 flex items-center justify-between">
              <Typography variant="subtitle2" className="font-medium">
                Property Type
              </Typography>
              <Button
                size="small"
                className="normal-case text-gray-500"
                onClick={() => handleFilterParamChange('propertyType', [])}
              >
                Clear All
              </Button>
            </Box>
            <Box className="flex flex-wrap gap-2">
              {['Flat', 'Duplex', 'Penthouse'].map(type => (
                <Chip
                  key={type}
                  label={type}
                  variant={
                    filterParams.propertyType.includes(type)
                      ? 'filled'
                      : 'outlined'
                  }
                  onClick={() => handlePropertyTypeToggle(type)}
                  className="h-9"
                />
              ))}
            </Box>
          </Box>

          {/* BHK */}
          <Box>
            <Box className="mb-2 flex items-center justify-between">
              <Typography variant="subtitle2" className="font-medium">
                BHK
              </Typography>
              <Button
                size="small"
                className="normal-case text-gray-500"
                onClick={() => handleFilterParamChange('bhkTypes', [])}
              >
                Clear All
              </Button>
            </Box>
            <Box className="flex flex-wrap gap-2">
              {[
                '+ 1 BHK',
                '+ 2 BHK',
                '+ 3 BHK',
                '+ 4 BHK',
                '+ 5 BHK',
                '+ 6 BHK',
                '+ 7 BHK',
              ].map(bhk => (
                <Chip
                  key={bhk}
                  label={bhk}
                  variant={
                    filterParams.bhkTypes.includes(bhk) ? 'filled' : 'outlined'
                  }
                  onClick={() => handleBhkToggle(bhk)}
                  className="h-9"
                />
              ))}
            </Box>
          </Box>

          {/* Budget Range */}
          <Box>
            <Typography variant="subtitle2" className="mb-2 font-medium">
              Budget
            </Typography>
            <Box className="grid grid-cols-2 gap-4">
              <FormControl fullWidth size="small">
                <InputLabel>Min</InputLabel>
                <Select
                  value={filterParams.minBudget}
                  label="Min"
                  onChange={e =>
                    handleFilterParamChange('minBudget', e.target.value)
                  }
                >
                  {budgetOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Max</InputLabel>
                <Select
                  value={filterParams.maxBudget}
                  label="Max"
                  onChange={e =>
                    handleFilterParamChange('maxBudget', e.target.value)
                  }
                >
                  {budgetOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Possession */}
          <Box>
            <Box className="mb-2 flex items-center justify-between">
              <Typography variant="subtitle2" className="font-medium">
                Possession
              </Typography>
              <Button
                size="small"
                className="normal-case text-gray-500"
                onClick={() => handleFilterParamChange('possession', [])}
              >
                Clear All
              </Button>
            </Box>
            <Box className="flex flex-wrap gap-2">
              {[
                '+ Ready to Move',
                '+ Upto 1 Year',
                '+ Upto 2 Years',
                '+ 2+ Years',
              ].map(status => (
                <Chip
                  key={status}
                  label={status}
                  variant={
                    filterParams.possession.includes(status)
                      ? 'filled'
                      : 'outlined'
                  }
                  onClick={() => handlePossessionToggle(status)}
                  className="h-9"
                />
              ))}
            </Box>
          </Box>

          {/* Dialog Actions */}
          <Box className="flex justify-end gap-2 pt-4">
            <Button
              variant="outlined"
              onClick={clearAllFilters}
              sx={{ height: 44, px: 3 }}
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              className="bg-black text-white hover:bg-gray-800"
              onClick={handleClose}
              sx={{ height: 44, px: 3, boxShadow: 'none' }}
            >
              Apply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SearchForm;
