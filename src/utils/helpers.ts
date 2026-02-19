import { Property, PropertyAmenity, PropertyFilter } from '@/types';

export const formatPrice = (
  price: number,
  currency: string = 'INR'
): string => {
  if (currency === 'INR') {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatArea = (
  area: number | string,
  unit: 'sqft' | 'sqm' = 'sqft'
): string => {
  const value =
    typeof area === 'string' ? parseFloat(area.replace(/,/g, '')) : area;
  return `${value.toLocaleString()} ${unit}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

export const getPropertyTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    penthouse: 'Penthouse',
    plot: 'Plot',
    commercial: 'Commercial',
  };
  return labels[type] || type;
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'for-sale': 'For Sale',
    'for-rent': 'For Rent',
    sold: 'Sold',
    rented: 'Rented',
  };
  return labels[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'for-sale': 'success',
    'for-rent': 'info',
    sold: 'error',
    rented: 'warning',
  };
  return colors[status] || 'default';
};

export const filterProperties = (
  properties: Property[],
  filters: PropertyFilter
): Property[] => {
  return properties.filter(property => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(query) ||
        property.description?.toLowerCase().includes(query) ||
        property.address?.city.toLowerCase().includes(query) ||
        property.address?.fullAddress.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Property type filter
    if (
      filters.propertyType !== 'all' &&
      property.propertyType !== filters.propertyType
    ) {
      return false;
    }

    // Listing type filter
    if (
      filters.listingType !== 'all' &&
      property.listingType !== filters.listingType
    ) {
      return false;
    }

    // Price filter
    if (
      property.price < filters.minPrice ||
      property.price > filters.maxPrice
    ) {
      return false;
    }

    // Bedrooms filter
    if (property.bedrooms !== undefined) {
      const bedroomStr = String(property.bedrooms);
      const bedroomValues = bedroomStr
        .split('-')
        .map(Number)
        .filter(n => !isNaN(n));
      const minBed = Math.min(...bedroomValues);
      const maxBed = Math.max(...bedroomValues);
      if (maxBed < filters.minBedrooms || minBed > filters.maxBedrooms) {
        return false;
      }
    }

    // Bathrooms filter
    if (property.bathrooms !== undefined) {
      const bathroomStr = String(property.bathrooms);
      const bathroomValues = bathroomStr
        .split('-')
        .map(Number)
        .filter(n => !isNaN(n));
      const minBath = Math.min(...bathroomValues);
      const maxBath = Math.max(...bathroomValues);
      if (maxBath < filters.minBathrooms || minBath > filters.maxBathrooms) {
        return false;
      }
    }

    // Area filter
    const areaNum =
      typeof property.area === 'string'
        ? parseFloat(property.area)
        : property.area;
    if (areaNum < filters.minArea || areaNum > filters.maxArea) {
      return false;
    }

    // City filter
    if (
      filters.city &&
      property.address?.city.toLowerCase() !== filters.city.toLowerCase()
    ) {
      return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const propertyAmenityIds =
        property.amenities.length > 0 &&
        typeof property.amenities[0] === 'string'
          ? (property.amenities as string[])
          : (property.amenities as PropertyAmenity[]).map(a => a.id);
      const hasAllAmenities = filters.amenities.every(amenityId =>
        propertyAmenityIds.includes(amenityId)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });
};

export const sortProperties = (
  properties: Property[],
  sortBy: PropertyFilter['sortBy']
): Property[] => {
  const sorted = [...properties];

  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    case 'oldest':
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
      );
    case 'price-low-high':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sorted.sort((a, b) => b.price - a.price);
    case 'area-low-high':
      return sorted.sort((a, b) => {
        const aNum = typeof a.area === 'string' ? parseFloat(a.area) : a.area;
        const bNum = typeof b.area === 'string' ? parseFloat(b.area) : b.area;
        return aNum - bNum;
      });
    case 'area-high-low':
      return sorted.sort((a, b) => {
        const aNum = typeof a.area === 'string' ? parseFloat(a.area) : a.area;
        const bNum = typeof b.area === 'string' ? parseFloat(b.area) : b.area;
        return bNum - aNum;
      });
    default:
      return sorted;
  }
};

export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

export const classNames = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

export const generateUniqueId = (): string => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const budgetToNumber = (budget: string): number | undefined => {
  if (!budget) return undefined;
  const clean = budget
    .toLowerCase()
    .replace(/₹|rs\.?|,/gi, '')
    .trim();
  if (clean.includes('cr')) {
    return parseFloat(clean) * 10000000; // Crore
  } else if (clean.includes('l')) {
    return parseFloat(clean) * 100000; // Lakh
  }
  return parseFloat(clean);
};

export const mapChatProjectToProperty = (
  // TODO: fix any to ai response property types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: Record<string, any>
): Property => {
  // Parse fields that might be JSON strings
  let keyFeatures: string[] = [];
  try {
    keyFeatures = JSON.parse(item.key_features || '[]');
  } catch {
    keyFeatures = [item.key_features].filter(Boolean);
  }

  return {
    id: item.id,
    title: item.name,
    slug: item.slug,
    description: item.description || '',
    price: item.priceStartingFrom || 0, // Fallback if not present in list
    status: (item.status === 'new_launch'
      ? 'New Launch'
      : item.status === 'ready_to_move'
        ? 'Ready to Move'
        : 'Under Construction') as Property['status'],
    location: item.city || '',
    images: item.mainImageUrl ? [item.mainImageUrl] : [],
    amenities: item.amenities || [],
    type: item.propertyType,
    bedrooms: item.totalUnits ? undefined : undefined, // Mapping logic for bedrooms if available in data
    bathrooms: undefined, // Not available in list object usually
    area: item.totalArea?.toString() || '', // Use total_area or size
    size: item.totalArea || 0,
    isFeatured: item.isFeatured,
    ecoFriendly: item.ecoFriendly,
    possessionDate: item.possessionDate,
    completionTime: item.completionTime,
    reraId: item.reraNumber,
    rating: 0, // Not in list response
    reviews: 0,
    builders: [], // Not in list response
    unitTypes: [], // Not in list response
    features: keyFeatures.map((f, i) => ({
      id: i.toString(),
      name: f,
      value: '',
      icon: '',
    })),
  };
};
