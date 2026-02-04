import { Property } from '@/types';
import { AmenityCategory, PropertyType } from '@/types/enums';

// Replaced with Unsplash Images
export const propertiesData: Property[] = [
  {
    id: '1',
    title: 'Luxury Waterfront Villa',
    slug: 'luxury-waterfront-villa',
    description:
      'Experience the epitome of luxury living in this stunning waterfront villa. This magnificent property offers breathtaking ocean views, world-class amenities, and unparalleled privacy. The villa features expansive living spaces, a private beach access, infinity pool, and a beautifully landscaped garden.',
    shortDescription:
      'Stunning waterfront villa with panoramic ocean views and private beach access.',
    price: 85000000,
    pricePerSqFt: 18500,
    currency: 'INR',
    propertyType: PropertyType.VILLA,
    status: 'for-sale',
    listingType: 'sale',
    bedrooms: 5,
    bathrooms: 6,
    area: '4600',
    areaUnit: 'sqft',
    yearBuilt: 2022,
    parkingSpaces: 4,
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80',
        alt: 'Villa exterior',
        isPrimary: true,
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
        alt: 'Living room',
        isPrimary: false,
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80',
        alt: 'Master bedroom',
        isPrimary: false,
      },
      {
        id: '1-4',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80',
        alt: 'Pool area',
        isPrimary: false,
      },
    ],
    address: {
      street: '123 Ocean Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India',
      fullAddress:
        '123 Ocean Drive, Worli Sea Face, Mumbai, Maharashtra 400001',
      coordinates: { lat: 19.0144, lng: 72.8166 },
    },
    features: [
      { id: 'f1', name: 'Bedrooms', value: 5, icon: 'Bedroom' },
      { id: 'f2', name: 'Bathrooms', value: 6, icon: 'Bathroom' },
      { id: 'f3', name: 'Area', value: '4,600 sqft', icon: 'SquareFoot' },
      { id: 'f4', name: 'Parking', value: 4, icon: 'Garage' },
    ],
    amenities: [
      {
        id: 'a1',
        name: 'Swimming Pool',
        icon: 'Pool',
        category: AmenityCategory.LEISURE,
      },
      {
        id: 'a2',
        name: 'Private Beach',
        icon: 'Beach',
        category: AmenityCategory.ENVIRONMENT,
      },
      {
        id: 'a3',
        name: 'Home Theater',
        icon: 'Theater',
        category: AmenityCategory.LEISURE,
      },
      {
        id: 'a4',
        name: '24/7 Security',
        icon: 'Security',
        category: AmenityCategory.SAFETY,
      },
      {
        id: 'a5',
        name: 'Smart Home',
        icon: 'SmartHome',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a6',
        name: 'Wine Cellar',
        icon: 'Wine',
        category: AmenityCategory.LEISURE,
      },
    ],
    isFeatured: true,
    isNew: true,
    views: 1250,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-10T15:30:00Z',
    agent: {
      id: 'agent-1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@realestate.in',
      phone: '+91 98765 43210',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
      role: 'Senior Property Consultant',
      experience: 12,
      propertiesSold: 150,
      rating: 4.9,
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/rahulsharma' },
        { platform: 'twitter', url: 'https://twitter.com/rahulsharma' },
      ],
    },
  },
  {
    id: '2',
    title: 'Modern Penthouse Suite',
    slug: 'modern-penthouse-suite',
    description:
      'Discover urban luxury at its finest in this spectacular penthouse suite. Located in the heart of the city, this modern masterpiece features floor-to-ceiling windows, premium finishes, and a private rooftop terrace with stunning skyline views.',
    shortDescription:
      'Ultra-modern penthouse with panoramic city views and private rooftop terrace.',
    price: 65000000,
    pricePerSqFt: 22000,
    currency: 'INR',
    propertyType: PropertyType.PENTHOUSE,
    status: 'for-sale',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    area: '3200',
    areaUnit: 'sqft',
    yearBuilt: 2023,
    parkingSpaces: 3,
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1512918760383-edce19830006?auto=format&fit=crop&q=80',
        alt: 'Penthouse exterior',
        isPrimary: true,
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80',
        alt: 'Living area',
        isPrimary: false,
      },
    ],
    address: {
      street: '456 Sky Tower',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
      fullAddress: '456 Sky Tower, Koramangala, Bangalore, Karnataka 560001',
      coordinates: { lat: 12.9352, lng: 77.6245 },
    },
    features: [
      { id: 'f1', name: 'Bedrooms', value: 4, icon: 'Bedroom' },
      { id: 'f2', name: 'Bathrooms', value: 4, icon: 'Bathroom' },
      { id: 'f3', name: 'Area', value: '3,200 sqft', icon: 'SquareFoot' },
      { id: 'f4', name: 'Parking', value: 3, icon: 'Garage' },
    ],
    amenities: [
      {
        id: 'a1',
        name: 'Rooftop Terrace',
        icon: 'Deck',
        category: AmenityCategory.ENVIRONMENT,
      },
      {
        id: 'a2',
        name: 'Private Elevator',
        icon: 'Elevator',
        category: AmenityCategory.CONVENIENCE,
      },
      { id: 'a3', name: 'Gym', icon: 'Gym', category: AmenityCategory.HEALTH },
      {
        id: 'a4',
        name: 'Concierge',
        icon: 'Concierge',
        category: AmenityCategory.SAFETY,
      },
    ],
    isFeatured: true,
    isNew: true,
    views: 980,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-02-08T12:00:00Z',
    agent: {
      id: 'agent-2',
      name: 'Priya Patel',
      email: 'priya.patel@realestate.in',
      phone: '+91 98765 43211',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
      role: 'Luxury Property Specialist',
      experience: 8,
      propertiesSold: 95,
      rating: 4.8,
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/priyapatel' },
      ],
    },
  },
  {
    id: '3',
    title: 'Elegant Family Home',
    slug: 'elegant-family-home',
    description:
      'Perfect family home in a prestigious neighborhood. This beautiful property features spacious rooms, a well-manicured garden, modern kitchen, and excellent connectivity to schools and amenities.',
    shortDescription:
      'Spacious family home with garden in prime residential area.',
    price: 35000000,
    pricePerSqFt: 12500,
    currency: 'INR',
    propertyType: PropertyType.BUNGALOW,
    status: 'for-sale',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    area: '2800',
    areaUnit: 'sqft',
    yearBuilt: 2020,
    parkingSpaces: 2,
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80',
        alt: 'House exterior',
        isPrimary: true,
      },
    ],
    address: {
      street: '789 Garden View',
      city: 'Pune',
      state: 'Maharashtra',
      zipCode: '411001',
      country: 'India',
      fullAddress: '789 Garden View, Koregaon Park, Pune, Maharashtra 411001',
      coordinates: { lat: 18.5362, lng: 73.8947 },
    },
    features: [
      { id: 'f1', name: 'Bedrooms', value: 4, icon: 'Bedroom' },
      { id: 'f2', name: 'Bathrooms', value: 3, icon: 'Bathroom' },
      { id: 'f3', name: 'Area', value: '2,800 sqft', icon: 'SquareFoot' },
      { id: 'f4', name: 'Parking', value: 2, icon: 'Garage' },
    ],
    amenities: [
      {
        id: 'a1',
        name: 'Garden',
        icon: 'Park',
        category: AmenityCategory.ENVIRONMENT,
      },
      {
        id: 'a2',
        name: 'Modular Kitchen',
        icon: 'Kitchen',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a3',
        name: 'Parking',
        icon: 'Parking',
        category: AmenityCategory.CONVENIENCE,
      },
    ],
    isFeatured: true,
    isNew: false,
    views: 720,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-05T09:00:00Z',
    agent: {
      id: 'agent-1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@realestate.in',
      phone: '+91 98765 43210',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
      role: 'Senior Property Consultant',
      experience: 12,
      propertiesSold: 150,
      rating: 4.9,
      socialLinks: [],
    },
  },
  {
    id: '4',
    title: 'Premium 3BHK Apartment',
    slug: 'premium-3bhk-apartment',
    description:
      'Luxurious 3BHK apartment in a gated community with world-class amenities. Features include modern interiors, clubhouse access, swimming pool, and 24/7 security.',
    shortDescription:
      'Modern 3BHK in premium gated community with all amenities.',
    price: 18500000,
    pricePerSqFt: 11500,
    currency: 'INR',
    propertyType: PropertyType.APARTMENT,
    status: 'for-sale',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    area: '1600',
    areaUnit: 'sqft',
    yearBuilt: 2021,
    parkingSpaces: 2,
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
        alt: 'Apartment exterior',
        isPrimary: true,
      },
    ],
    address: {
      street: '101 Green Heights',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500081',
      country: 'India',
      fullAddress: '101 Green Heights, Gachibowli, Hyderabad, Telangana 500081',
      coordinates: { lat: 17.4401, lng: 78.3489 },
    },
    features: [
      { id: 'f1', name: 'Bedrooms', value: 3, icon: 'Bedroom' },
      { id: 'f2', name: 'Bathrooms', value: 2, icon: 'Bathroom' },
      { id: 'f3', name: 'Area', value: '1,600 sqft', icon: 'SquareFoot' },
      { id: 'f4', name: 'Parking', value: 2, icon: 'Garage' },
    ],
    amenities: [
      {
        id: 'a1',
        name: 'Swimming Pool',
        icon: 'Pool',
        category: AmenityCategory.LEISURE,
      },
      { id: 'a2', name: 'Gym', icon: 'Gym', category: AmenityCategory.HEALTH },
      {
        id: 'a3',
        name: 'Clubhouse',
        icon: 'Club',
        category: AmenityCategory.LEISURE,
      },
      {
        id: 'a4',
        name: '24/7 Security',
        icon: 'Security',
        category: AmenityCategory.SAFETY,
      },
    ],
    isFeatured: true,
    isNew: false,
    views: 1100,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-02-01T14:00:00Z',
    agent: {
      id: 'agent-3',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@realestate.in',
      phone: '+91 98765 43212',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80',
      role: 'Property Consultant',
      experience: 6,
      propertiesSold: 75,
      rating: 4.7,
      socialLinks: [],
    },
  },
  {
    id: '5',
    title: 'Luxury 2BHK for Rent',
    slug: 'luxury-2bhk-for-rent',
    description:
      'Beautifully furnished 2BHK apartment available for rent. Prime location with easy access to IT parks, shopping malls, and public transport.',
    shortDescription: 'Furnished 2BHK in prime IT corridor location.',
    price: 45000,
    pricePerSqFt: 0,
    currency: 'INR',
    propertyType: PropertyType.APARTMENT,
    status: 'for-rent',
    listingType: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    area: '1200',
    areaUnit: 'sqft',
    yearBuilt: 2019,
    parkingSpaces: 1,
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
        alt: 'Apartment interior',
        isPrimary: true,
      },
    ],
    address: {
      street: '202 Tech Park Residency',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560066',
      country: 'India',
      fullAddress:
        '202 Tech Park Residency, Whitefield, Bangalore, Karnataka 560066',
      coordinates: { lat: 12.9698, lng: 77.75 },
    },
    features: [
      { id: 'f1', name: 'Bedrooms', value: 2, icon: 'Bedroom' },
      { id: 'f2', name: 'Bathrooms', value: 2, icon: 'Bathroom' },
      { id: 'f3', name: 'Area', value: '1,200 sqft', icon: 'SquareFoot' },
      { id: 'f4', name: 'Parking', value: 1, icon: 'Garage' },
    ],
    amenities: [
      {
        id: 'a1',
        name: 'Fully Furnished',
        icon: 'Furniture',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a2',
        name: 'AC',
        icon: 'AC',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a3',
        name: 'Power Backup',
        icon: 'Power',
        category: AmenityCategory.CONVENIENCE,
      },
    ],
    isFeatured: false,
    isNew: true,
    views: 450,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
    agent: {
      id: 'agent-2',
      name: 'Priya Patel',
      email: 'priya.patel@realestate.in',
      phone: '+91 98765 43211',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
      role: 'Luxury Property Specialist',
      experience: 8,
      propertiesSold: 95,
      rating: 4.8,
      socialLinks: [],
    },
  },
  {
    id: '6',
    title: 'Commercial Office Space',
    slug: 'commercial-office-space',
    description:
      'Prime commercial office space in the business district. Ideal for startups and established businesses. Features include high-speed internet, conference rooms, and parking facilities.',
    shortDescription:
      'Premium office space in business district with modern amenities.',
    price: 125000,
    pricePerSqFt: 0,
    currency: 'INR',
    propertyType: PropertyType.COMMERCIAL,
    status: 'for-rent',
    listingType: 'rent',
    bedrooms: 0,
    bathrooms: 2,
    area: '2500',
    areaUnit: 'sqft',
    yearBuilt: 2022,
    parkingSpaces: 5,
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
        alt: 'Office space',
        isPrimary: true,
      },
    ],
    address: {
      street: '303 Business Hub',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India',
      fullAddress: '303 Business Hub, Connaught Place, Delhi 110001',
      coordinates: { lat: 28.6315, lng: 77.2167 },
    },
    features: [
      { id: 'f1', name: 'Workstations', value: 50, icon: 'Desk' },
      { id: 'f2', name: 'Meeting Rooms', value: 3, icon: 'Meeting' },
      { id: 'f3', name: 'Area', value: '2,500 sqft', icon: 'SquareFoot' },
      { id: 'f4', name: 'Parking', value: 5, icon: 'Garage' },
    ],
    amenities: [
      {
        id: 'a1',
        name: 'High-Speed Internet',
        icon: 'Wifi',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a2',
        name: 'Conference Room',
        icon: 'Conference',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a3',
        name: 'Pantry',
        icon: 'Pantry',
        category: AmenityCategory.CONVENIENCE,
      },
      {
        id: 'a4',
        name: 'Reception',
        icon: 'Reception',
        category: AmenityCategory.CONVENIENCE,
      },
    ],
    isFeatured: false,
    isNew: false,
    views: 320,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z',
    agent: {
      id: 'agent-4',
      name: 'Amit Khanna',
      email: 'amit.khanna@realestate.in',
      phone: '+91 98765 43213',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      role: 'Commercial Property Expert',
      experience: 10,
      propertiesSold: 120,
      rating: 4.9,
      socialLinks: [],
    },
  },
];

export const getFeaturedProperties = (): Property[] => {
  return propertiesData.filter(property => property.isFeatured);
};

export const getPropertyById = (id: string): Property | undefined => {
  return propertiesData.find(property => property.id === id);
};

export const getPropertyBySlug = (slug: string): Property | undefined => {
  return propertiesData.find(property => property.slug === slug);
};

export const getPropertiesByType = (type: string): Property[] => {
  return propertiesData.filter(property => property.propertyType === type);
};

export const getPropertiesByCity = (city: string): Property[] => {
  return propertiesData.filter(
    property => property.address?.city.toLowerCase() === city.toLowerCase()
  );
};
