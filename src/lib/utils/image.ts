// Image mapping for local/fallback images
const imageMap: Record<string, string> = {
  'property-luxury': '/images/properties/luxury-apartment.jpg',
  'property-modern': '/images/properties/modern-villa.jpg',
  'ahmedabad-cityscape': '/images/ahmedabad-cityscape.jpg',
  'city-development': '/images/city-development.jpg',
  'default-property': '/images/properties/default.jpg',
};

export const getImageUrl = (imageKey: string): string => {
  // If it's already a full URL, return as is
  if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) {
    return imageKey;
  }

  // If it's a path starting with /, return as is
  if (imageKey.startsWith('/')) {
    return imageKey;
  }

  // Look up in image map
  return imageMap[imageKey] || imageMap['default-property'];
};

export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  quality?: number
): string => {
  // For Cloudinary URLs, add transformation parameters
  if (url.includes('cloudinary.com')) {
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (quality) transformations.push(`q_${quality}`);

    if (transformations.length > 0) {
      return url.replace('/upload/', `/upload/${transformations.join(',')}/`);
    }
  }

  return url;
};
