'use client';

import { useProjectFilters } from '@/contexts/ProjectFiltersContext';
import { areaService } from '@/services/area.service';
import {
  Check,
  Close,
  FilterList,
  KeyboardArrowDown,
  LocationOn,
  Search,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Drawer,
  Fade,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Constants
const BHK_OPTIONS = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  '5 BHK',
  'Duplex',
  'Penthouse',
];
// Mapped Property Types - synced with backend PropertyType enum
const PROPERTY_TYPES_MAP: Record<string, string> = {
  Apartment: 'apartment',
  Bungalow: 'bungalow',
  Villa: 'villa',
  Plot: 'plot',
  Commercial: 'commercial',
  'Mixed Use': 'mixed_use',
  Penthouse: 'penthouse',
};
const PROPERTY_TYPES = Object.keys(PROPERTY_TYPES_MAP);

const POSSESSION_OPTIONS = [
  'Ready to Move',
  'Upto 1 Year',
  'Upto 2 Years',
  '2+ Years',
];
const BUDGET_OPTIONS = [
  '20 Lac',
  '25 Lac',
  '30 Lac',
  '35 Lac',
  '40 Lac',
  '45 Lac',
  '50 Lac',
  '60 Lac',
  '70 Lac',
  '80 Lac',
  '90 Lac',
  '1 Cr',
  '1.5 Cr',
  '2 Cr',
  '5 Cr',
];
const SORT_OPTIONS = [
  'Featured',
  'New Launch',
  'Price: low to high',
  'Price: high to low',
  'Near possession',
];

interface FilterPopoverProps {
  label: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  hasSelection?: boolean;
}

const FilterButton = ({
  label,
  active,
  onClick,
  value,
  hasSelection,
}: FilterPopoverProps) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Button
      onClick={onClick}
      variant={active || hasSelection ? 'contained' : 'outlined'}
      endIcon={
        <KeyboardArrowDown
          className={`transition-transform duration-300 ease-out ${active ? 'rotate-180' : ''}`}
        />
      }
      className={`rounded-full border px-6 text-sm font-semibold normal-case shadow-sm transition-all duration-300 ${
        active || hasSelection
          ? 'border-black bg-black text-white hover:bg-gray-800'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      } `}
      sx={{ minHeight: '40px', textTransform: 'none' }}
    >
      {value || label}
    </Button>
  </motion.div>
);

export default function ProjectFilters() {
  const { filters, updateFilters } = useProjectFilters();
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localities, setLocalities] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>(['Ahmedabad']); // Default fallback
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const lastSentSearch = useRef(filters.searchQuery);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery !== filters.searchQuery) {
        lastSentSearch.current = searchQuery;
        updateFilters({ searchQuery });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery, updateFilters, filters.searchQuery]);

  // Sync local state if filters change externally (e.g. URL update, clear filters)
  useEffect(() => {
    if (filters.searchQuery === lastSentSearch.current) {
      return;
    }

    if (filters.searchQuery !== searchQuery) {
      setSearchQuery(filters.searchQuery);
      lastSentSearch.current = filters.searchQuery;
    }
  }, [filters.searchQuery, searchQuery]);

  useEffect(() => {
    const fetchLocalitiesAndCities = async () => {
      try {
        const data = await areaService.getAreas({ limit: 100 });
        if (data && data.data.areas) {
          const areas = data.data.areas;
          const areaNames = areas.map(area => area.name).sort();
          const uniqueCities = Array.from(
            new Set(areas.map(area => area.city))
          ).sort() as string[];

          setLocalities(areaNames);
          if (uniqueCities.length > 0) setCities(uniqueCities);
        }
      } catch (error) {
        console.error('Failed to fetch localities/cities:', error);
      }
    };

    fetchLocalitiesAndCities();
  }, []);

  const handlePopoverOpen = (
    key: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl({ ...anchorEl, [key]: event.currentTarget });
  };

  const handlePopoverClose = (key: string) => {
    setAnchorEl({ ...anchorEl, [key]: null });
  };

  const toggleArrayFilter = (
    item: string,
    key:
      | 'selectedLocalities'
      | 'selectedBHK'
      | 'selectedPossession'
      | 'selectedPropType'
  ) => {
    const current = filters[key];
    updateFilters({
      [key]: current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item],
    });
  };

  // --- Renderers ---

  const renderLocalitiesContent = () => (
    <Box className="w-[400px] max-w-[90vw] p-4">
      <div className="mb-3 flex items-center justify-between">
        <Typography variant="subtitle2" className="font-semibold text-gray-700">
          Popular Localities
        </Typography>
        {filters.selectedLocalities.length > 0 && (
          <Button
            size="small"
            onClick={() => updateFilters({ selectedLocalities: [] })}
            className="text-xs text-blue-600 hover:bg-blue-50"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="custom-scrollbar flex max-h-[300px] flex-wrap gap-2 overflow-y-auto p-1">
        {localities.map(loc => {
          const isSelected = filters.selectedLocalities.includes(loc);
          return (
            <Chip
              key={loc}
              label={loc}
              onClick={() => toggleArrayFilter(loc, 'selectedLocalities')}
              deleteIcon={
                isSelected ? (
                  <Check className="text-base text-white" />
                ) : undefined
              }
              onDelete={
                isSelected
                  ? () => toggleArrayFilter(loc, 'selectedLocalities')
                  : undefined
              }
              variant={isSelected ? 'filled' : 'outlined'}
              className={`cursor-pointer border px-1 py-1 ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 bg-white text-gray-700'}`}
              size="small"
              avatar={
                !isSelected ? (
                  <span className="m-0 pl-2 text-lg leading-none text-gray-400">
                    +
                  </span>
                ) : undefined
              }
              sx={{
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  whiteSpace: 'nowrap',
                },
                '& .MuiChip-avatar': { margin: 0, color: 'inherit' },
              }}
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-end border-t border-gray-100 pt-3">
        <Button
          variant="contained"
          size="small"
          onClick={() => handlePopoverClose('locality')}
          className="rounded-full bg-black px-6 font-bold normal-case text-white hover:bg-gray-800"
          sx={{ textTransform: 'none' }}
        >
          Done
        </Button>
      </div>
    </Box>
  );

  const renderBHKContent = () => (
    <Box className="w-[200px] p-4">
      <div className="mb-2 flex items-center justify-between">
        <Typography variant="subtitle2" className="font-semibold text-gray-700">
          Bedrooms
        </Typography>
        {filters.selectedBHK.length > 0 && (
          <Button
            size="small"
            onClick={() => updateFilters({ selectedBHK: [] })}
            className="min-w-0 p-0 text-xs text-blue-600"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {BHK_OPTIONS.map(opt => (
          <FormControlLabel
            key={opt}
            control={
              <Checkbox
                checked={filters.selectedBHK.includes(opt)}
                onChange={() => toggleArrayFilter(opt, 'selectedBHK')}
                size="small"
              />
            }
            label={<Typography variant="body2">{opt}</Typography>}
            className="m-0"
          />
        ))}
      </div>
    </Box>
  );

  const renderBudgetContent = () => (
    <Box className="w-[320px] p-4">
      <div className="mb-4 flex items-center justify-between">
        <Typography variant="subtitle2" className="font-semibold text-gray-700">
          Budget Range
        </Typography>
        <Button
          size="small"
          onClick={() => updateFilters({ minBudget: '', maxBudget: '' })}
          className="text-xs text-blue-600 hover:bg-blue-50"
        >
          Clear All
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <FormControl fullWidth size="small">
          <InputLabel>Min</InputLabel>
          <Select
            value={filters.minBudget}
            label="Min"
            onChange={e => updateFilters({ minBudget: e.target.value })}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          >
            {BUDGET_OPTIONS.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span className="text-gray-400">-</span>
        <FormControl fullWidth size="small">
          <InputLabel>Max</InputLabel>
          <Select
            value={filters.maxBudget}
            label="Max"
            onChange={e => updateFilters({ maxBudget: e.target.value })}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          >
            {BUDGET_OPTIONS.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          variant="contained"
          size="small"
          onClick={() => handlePopoverClose('budget')}
          className="rounded-full bg-black px-6 font-bold normal-case text-white hover:bg-gray-800"
          sx={{ textTransform: 'none' }}
        >
          Done
        </Button>
      </div>
    </Box>
  );

  const renderChipsContent = (
    options: string[],
    filterKey: 'selectedPossession' | 'selectedPropType',
    title?: string
  ) => (
    <Box className="w-[350px] p-4">
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <Typography
            variant="subtitle2"
            className="font-semibold text-gray-700"
          >
            {title}
          </Typography>
          {filters[filterKey].length > 0 && (
            <Button
              size="small"
              onClick={() => updateFilters({ [filterKey]: [] })}
              className="text-xs text-blue-600 hover:bg-blue-50"
            >
              Clear All
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const isSelected = filters[filterKey].includes(opt);
          return (
            <Chip
              key={opt}
              label={opt}
              onClick={() => toggleArrayFilter(opt, filterKey)}
              deleteIcon={
                isSelected ? (
                  <Check className="text-base text-blue-600" />
                ) : undefined
              }
              onDelete={
                isSelected ? () => toggleArrayFilter(opt, filterKey) : undefined
              }
              variant={isSelected ? 'filled' : 'outlined'}
              className={`h-auto cursor-pointer border px-1 py-1 text-sm ${isSelected ? 'border-blue-600 bg-white font-medium text-blue-600' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
              avatar={
                !isSelected ? (
                  <span className="m-0 pl-2 text-lg leading-none text-gray-400">
                    +
                  </span>
                ) : undefined
              }
              sx={{
                borderRadius: '9999px',
                '&.MuiChip-filled': {
                  backgroundColor: 'white',
                  color: '#2563eb',
                  borderColor: '#2563eb',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                },
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  whiteSpace: 'nowrap',
                },
                '& .MuiChip-avatar': { margin: 0 },
              }}
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-end border-t border-gray-100 pt-3">
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            handlePopoverClose(
              title === 'Property Type' ? 'propType' : 'possession'
            )
          }
          className="rounded-full bg-black px-6 font-bold normal-case text-white hover:bg-gray-800"
          sx={{ textTransform: 'none' }}
        >
          Done
        </Button>
      </div>
    </Box>
  );

  const renderSortContent = () => (
    <Box className="w-[220px] p-2">
      {SORT_OPTIONS.map(opt => (
        <MenuItem
          key={opt}
          onClick={() => {
            updateFilters({ selectedSort: opt });
            handlePopoverClose('sort');
          }}
          selected={filters.selectedSort === opt}
          className={`mx-1 my-0.5 justify-between rounded-lg text-sm ${filters.selectedSort === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
        >
          {opt}
          {filters.selectedSort === opt && (
            <Check className="h-4 w-4 text-blue-600" />
          )}
        </MenuItem>
      ))}
    </Box>
  );

  const renderMobileDrawer = () => (
    <Box className="h-full w-[300px] bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h6" className="font-bold">
          Filters
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)}>
          <Close />
        </IconButton>
      </div>

      <div className="no-scrollbar flex h-[calc(100vh-100px)] flex-col gap-6 overflow-y-auto pb-20">
        {/* Localities Section */}
        <div>
          <Typography
            variant="subtitle2"
            className="mb-2 font-semibold text-gray-700"
          >
            Localities
          </Typography>
          <div className="flex flex-wrap gap-2">
            {filters.selectedLocalities.map(loc => (
              <Chip
                key={loc}
                label={loc}
                onDelete={() => toggleArrayFilter(loc, 'selectedLocalities')}
                size="small"
                className="bg-blue-50 text-blue-600"
              />
            ))}
            <Button
              size="small"
              onClick={e => handlePopoverOpen('locality', e)}
              className="text-xs normal-case text-blue-600"
            >
              + Add Locality
            </Button>
          </div>
        </div>

        {/* BHK Section */}
        <div>
          <Typography
            variant="subtitle2"
            className="mb-2 font-semibold text-gray-700"
          >
            Bedrooms
          </Typography>
          <div className="flex flex-wrap gap-2">
            {BHK_OPTIONS.map(opt => (
              <Chip
                key={opt}
                label={opt}
                onClick={() => toggleArrayFilter(opt, 'selectedBHK')}
                variant={
                  filters.selectedBHK.includes(opt) ? 'filled' : 'outlined'
                }
                className={`cursor-pointer ${filters.selectedBHK.includes(opt) ? 'bg-black text-white' : 'border-gray-200 text-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Budget Section */}
        <div>
          <Typography
            variant="subtitle2"
            className="mb-2 font-semibold text-gray-700"
          >
            Budget
          </Typography>
          <div className="flex items-center gap-2">
            <FormControl fullWidth size="small">
              <InputLabel>Min</InputLabel>
              <Select
                value={filters.minBudget}
                label="Min"
                onChange={e => updateFilters({ minBudget: e.target.value })}
              >
                {BUDGET_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <span className="text-gray-400">-</span>
            <FormControl fullWidth size="small">
              <InputLabel>Max</InputLabel>
              <Select
                value={filters.maxBudget}
                label="Max"
                onChange={e => updateFilters({ maxBudget: e.target.value })}
              >
                {BUDGET_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Possession Section */}
        <div>
          <Typography
            variant="subtitle2"
            className="mb-2 font-semibold text-gray-700"
          >
            Possession Status
          </Typography>
          <div className="flex flex-wrap gap-2">
            {POSSESSION_OPTIONS.map(opt => (
              <Chip
                key={opt}
                label={opt}
                onClick={() => toggleArrayFilter(opt, 'selectedPossession')}
                variant={
                  filters.selectedPossession.includes(opt)
                    ? 'filled'
                    : 'outlined'
                }
                className={`cursor-pointer ${filters.selectedPossession.includes(opt) ? 'bg-blue-600 text-white' : 'border-gray-200 text-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Property Type Section */}
        <div>
          <Typography
            variant="subtitle2"
            className="mb-2 font-semibold text-gray-700"
          >
            Property Type
          </Typography>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map(opt => (
              <Chip
                key={opt}
                label={opt}
                onClick={() => toggleArrayFilter(opt, 'selectedPropType')}
                variant={
                  filters.selectedPropType.includes(opt) ? 'filled' : 'outlined'
                }
                className={`cursor-pointer ${filters.selectedPropType.includes(opt) ? 'bg-blue-600 text-white' : 'border-gray-200 text-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Sort Section */}
        <div>
          <Typography
            variant="subtitle2"
            className="mb-2 font-semibold text-gray-700"
          >
            Sort By
          </Typography>
          <Select
            fullWidth
            size="small"
            value={filters.selectedSort}
            onChange={e => updateFilters({ selectedSort: e.target.value })}
          >
            {SORT_OPTIONS.map(opt => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white p-4">
        <Button
          fullWidth
          variant="contained"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg bg-black py-3 font-bold normal-case text-white hover:bg-gray-800"
        >
          View Properties
        </Button>
      </div>
    </Box>
  );

  return (
    <Box className="w-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 lg:flex-row">
        {/* Left: City & Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-[52px] w-full items-center rounded-full border border-gray-200 bg-gray-200/50 p-1 transition-all duration-300 focus-within:border-black focus-within:bg-gray-200 focus-within:ring-1 focus-within:ring-black/5 hover:bg-gray-200 lg:w-auto lg:min-w-[420px]"
        >
          {/* Mobile Filter Trigger */}
          <div className="lg:hidden">
            <IconButton onClick={() => setMobileOpen(true)}>
              <FilterList />
            </IconButton>
          </div>

          <Button
            onClick={e => handlePopoverOpen('city', e)}
            startIcon={
              <LocationOn className="text-gray-700" fontSize="small" />
            }
            className="flex h-full min-w-[140px] justify-between rounded-full px-4 font-bold text-gray-900 transition-colors duration-200 hover:bg-gray-100"
            endIcon={
              <KeyboardArrowDown className="text-gray-400 transition-transform duration-200" />
            }
            sx={{ textTransform: 'none' }}
          >
            {filters.selectedCity}
          </Button>
          <div className="mx-2 h-6 w-[1px] bg-gray-300"></div>
          <div className="flex flex-1 items-center px-2">
            <Input
              type="text"
              placeholder="Search Location, Builder..."
              disableUnderline
              className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-500 outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="cursor-pointer pr-4 text-gray-400 transition-colors group-hover:text-black">
            <Search fontSize="small" />
          </div>
        </motion.div>

        {/* Scrollable Filters */}
        <div className="no-scrollbar hidden w-full flex-1 overflow-x-auto scroll-smooth lg:block">
          <div className="flex min-w-max items-center gap-3 p-1">
            <FilterButton
              label="Popular Localities"
              active={Boolean(anchorEl['locality'])}
              hasSelection={filters.selectedLocalities.length > 0}
              value={
                filters.selectedLocalities.length > 0
                  ? `${filters.selectedLocalities.length} Localities`
                  : undefined
              }
              onClick={e => handlePopoverOpen('locality', e)}
            />
            <FilterButton
              label="BHK"
              active={Boolean(anchorEl['bhk'])}
              hasSelection={filters.selectedBHK.length > 0}
              value={
                filters.selectedBHK.length > 0
                  ? filters.selectedBHK.join(', ')
                  : undefined
              }
              onClick={e => handlePopoverOpen('bhk', e)}
            />
            <FilterButton
              label="Budget"
              active={Boolean(anchorEl['budget'])}
              hasSelection={!!filters.minBudget || !!filters.maxBudget}
              value={
                filters.minBudget || filters.maxBudget
                  ? `${filters.minBudget || '0'} - ${filters.maxBudget || 'Any'}`
                  : undefined
              }
              onClick={e => handlePopoverOpen('budget', e)}
            />
            <FilterButton
              label="Possession"
              active={Boolean(anchorEl['possession'])}
              hasSelection={filters.selectedPossession.length > 0}
              onClick={e => handlePopoverOpen('possession', e)}
            />
            <FilterButton
              label="Property Type"
              active={Boolean(anchorEl['propType'])}
              hasSelection={filters.selectedPropType.length > 0}
              onClick={e => handlePopoverOpen('propType', e)}
            />
          </div>
        </div>

        {/* Right: Sort */}
        <div className="hidden shrink-0 lg:block">
          <Button
            onClick={e => handlePopoverOpen('sort', e)}
            variant="text"
            className="rounded-full bg-transparent px-5 py-3 font-medium text-gray-500 hover:bg-gray-100 hover:text-black"
            sx={{ textTransform: 'none' }}
            endIcon={<KeyboardArrowDown fontSize="small" />}
          >
            Sort By:{' '}
            <span className="ml-1 text-black">{filters.selectedSort}</span>
          </Button>
        </div>
      </div>

      {/* Popover Instances */}
      {[
        { key: 'locality', content: renderLocalitiesContent },
        { key: 'bhk', content: renderBHKContent },
        { key: 'budget', content: renderBudgetContent },
        {
          key: 'possession',
          content: () =>
            renderChipsContent(POSSESSION_OPTIONS, 'selectedPossession'),
        },
        {
          key: 'propType',
          content: () => renderChipsContent(PROPERTY_TYPES, 'selectedPropType'),
        },
        { key: 'sort', content: renderSortContent },
        {
          key: 'city',
          content: () => (
            <Box className="w-[180px] p-2">
              {cities.map(city => (
                <MenuItem
                  key={city}
                  onClick={() => {
                    updateFilters({ selectedCity: city });
                    handlePopoverClose('city');
                  }}
                  selected={filters.selectedCity === city}
                  className="rounded-lg text-sm"
                >
                  {city}
                </MenuItem>
              ))}
            </Box>
          ),
        },
      ].map(({ key, content: Content }) => (
        <Popover
          key={key}
          open={Boolean(anchorEl[key])}
          anchorEl={anchorEl[key]}
          onClose={() => handlePopoverClose(key)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            className:
              'mt-3 rounded-2xl shadow-xl border border-gray-100 overflow-hidden',
            sx: {
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
            },
          }}
          TransitionComponent={Fade}
        >
          <Content />
        </Popover>
      ))}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >
        {renderMobileDrawer()}
      </Drawer>
    </Box>
  );
}
