import { NavItem, SelectOption } from '@/types';

export const SITE_CONFIG = {
  name: 'Real Estate',
  tagline: 'Premium Real Estate Solutions',
  description:
    'Find your dream property with Real Estate - Your trusted partner in real estate.',
  url: 'https://realestate.in',
  email: 'info@realestate.in',
  phone: '+91 98765 43210',
  address: '123 Business District, Mumbai, Maharashtra 400001, India',
  socialLinks: {
    facebook: 'https://facebook.com/realestate',
    twitter: 'https://twitter.com/realestate',
    instagram: 'https://instagram.com/realestate',
    linkedin: 'https://linkedin.com/company/realestate',
    youtube: 'https://youtube.com/realestate',
  },
  workingHours: {
    weekdays: '9:00 AM - 7:00 PM',
    saturday: '10:00 AM - 5:00 PM',
    sunday: 'Closed',
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'properties', label: 'Properties', href: '/properties' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const PROPERTY_TYPES: SelectOption[] = [
  { value: 'all', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'plot', label: 'Plot' },
  { value: 'commercial', label: 'Commercial' },
];

export const LISTING_TYPES: SelectOption[] = [
  { value: 'all', label: 'Buy & Rent' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

export const BEDROOM_OPTIONS: SelectOption[] = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1 Bedroom' },
  { value: '2', label: '2 Bedrooms' },
  { value: '3', label: '3 Bedrooms' },
  { value: '4', label: '4 Bedrooms' },
  { value: '5+', label: '5+ Bedrooms' },
];

export const PRICE_RANGES: SelectOption[] = [
  { value: 'any', label: 'Any Price' },
  { value: '0-5000000', label: 'Under ₹50 Lakhs' },
  { value: '5000000-10000000', label: '₹50 Lakhs - ₹1 Crore' },
  { value: '10000000-25000000', label: '₹1 Crore - ₹2.5 Crore' },
  { value: '25000000-50000000', label: '₹2.5 Crore - ₹5 Crore' },
  { value: '50000000+', label: 'Above ₹5 Crore' },
];

export const SORT_OPTIONS: SelectOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'area-low-high', label: 'Area: Low to High' },
  { value: 'area-high-low', label: 'Area: High to Low' },
];

export const CITIES: SelectOption[] = [
  { value: '', label: 'All Cities' },
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'pune', label: 'Pune' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
];

export const AMENITIES_LIST = [
  { id: 'swimming-pool', name: 'Swimming Pool', icon: 'Pool' },
  { id: 'gym', name: 'Gym', icon: 'FitnessCenter' },
  { id: 'parking', name: 'Parking', icon: 'LocalParking' },
  { id: 'security', name: '24/7 Security', icon: 'Security' },
  { id: 'garden', name: 'Garden', icon: 'Park' },
  { id: 'clubhouse', name: 'Clubhouse', icon: 'House' },
  { id: 'playground', name: 'Playground', icon: 'SportsBasketball' },
  { id: 'power-backup', name: 'Power Backup', icon: 'BatteryChargingFull' },
  { id: 'elevator', name: 'Elevator', icon: 'Elevator' },
  { id: 'cctv', name: 'CCTV', icon: 'Videocam' },
] as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const DEFAULT_FILTER = {
  searchQuery: '',
  propertyType: 'all' as const,
  listingType: 'all' as const,
  minPrice: 0,
  maxPrice: Infinity,
  minBedrooms: 0,
  maxBedrooms: Infinity,
  minBathrooms: 0,
  maxBathrooms: Infinity,
  minArea: 0,
  maxArea: Infinity,
  city: '',
  amenities: [],
  sortBy: 'newest' as const,
};
