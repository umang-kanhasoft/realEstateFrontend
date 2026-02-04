export const LOCATIONS = [
  'Satellite',
  'Bopal',
  'Ambli',
  'Prahlad Nagar',
  'Thaltej',
  'SG Highway',
  'Gota',
  'Bodakdev',
] as const;

export const PROPERTY_TYPES = [
  'Apartment',
  'Bungalow',
  'Villa',
  'Penthouse',
] as const;

export const PROPERTY_STATUS = [
  'Ready to Move',
  'Under Construction',
  'New Launch',
] as const;

export const BUILDERS = [
  'Adani Realty',
  'Goyal & Co',
  'Shivalik Group',
  'Sun Builders',
  'Suryam Builders',
] as const;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'size-low', label: 'Size: Small to Large' },
  { value: 'size-high', label: 'Size: Large to Small' },
  { value: 'rating', label: 'Highest Rated' },
] as const;

export const PRICE_RANGES = [
  { value: '0-10000000', label: 'Under ₹1 Cr' },
  { value: '10000000-15000000', label: '₹1 Cr - ₹1.5 Cr' },
  { value: '15000000-20000000', label: '₹1.5 Cr - ₹2 Cr' },
  { value: '20000000-999999999', label: 'Above ₹2 Cr' },
] as const;

export const AMENITIES = [
  'Swimming Pool',
  'Gym',
  'Clubhouse',
  'Garden',
  'Parking',
  'Security',
  'Power Backup',
  'Lift',
  'Play Area',
  'Sports Facility',
] as const;

export const QUERY_KEYS = {
  PROPERTIES: 'properties',
  PROPERTY: 'property',
  BUILDERS: 'builders',
  BUILDER: 'builder',
  BLOGS: 'blogs',
  BLOG: 'blog',
  AREAS: 'areas',
  DASHBOARD_STATS: 'dashboard-stats',
  PROPERTY_TYPE_DISTRIBUTION: 'property-type-distribution',
} as const;
