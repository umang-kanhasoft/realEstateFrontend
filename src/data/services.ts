import { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: '1',
    title: 'Property Sales',
    description:
      'Expert guidance through every step of buying or selling your property. Our experienced agents ensure you get the best value for your investment.',
    icon: 'HomeWork',
    features: [
      'Market Analysis & Valuation',
      'Professional Photography',
      'Virtual Tours',
      'Negotiation Support',
      'Legal Assistance',
    ],
    image: '/images/services/property-sales.jpg',
    href: '/services/property-sales',
  },
  {
    id: '2',
    title: 'Property Rentals',
    description:
      'Find your perfect rental property or let us manage your rental portfolio. We connect landlords with quality tenants.',
    icon: 'Key',
    features: [
      'Tenant Screening',
      'Rent Collection',
      'Property Maintenance',
      'Lease Management',
      '24/7 Support',
    ],
    image: '/images/services/property-rentals.jpg',
    href: '/services/property-rentals',
  },
  {
    id: '3',
    title: 'Property Management',
    description:
      'Comprehensive property management services for hassle-free ownership. We handle everything from maintenance to tenant relations.',
    icon: 'Business',
    features: [
      'Regular Inspections',
      'Maintenance Coordination',
      'Financial Reporting',
      'Vendor Management',
      'Emergency Services',
    ],
    image: '/images/services/property-management.jpg',
    href: '/services/property-management',
  },
  {
    id: '4',
    title: 'Investment Advisory',
    description:
      'Strategic investment advice to maximize your real estate portfolio returns. Our experts help you make informed investment decisions.',
    icon: 'TrendingUp',
    features: [
      'Market Research',
      'Investment Analysis',
      'Portfolio Diversification',
      'ROI Optimization',
      'Tax Planning',
    ],
    image: '/images/services/investment-advisory.jpg',
    href: '/services/investment-advisory',
  },
  {
    id: '5',
    title: 'Interior Design',
    description:
      'Transform your space with our expert interior design services. From concept to execution, we bring your vision to life.',
    icon: 'Palette',
    features: [
      'Space Planning',
      'Custom Furniture',
      'Color Consultation',
      '3D Visualization',
      'Project Management',
    ],
    image: '/images/services/interior-design.jpg',
    href: '/services/interior-design',
  },
  {
    id: '6',
    title: 'Legal Services',
    description:
      'Complete legal support for all your real estate transactions. Our legal team ensures smooth and secure property dealings.',
    icon: 'Gavel',
    features: [
      'Title Verification',
      'Document Preparation',
      'Registration Support',
      'Dispute Resolution',
      'Contract Review',
    ],
    image: '/images/services/legal-services.jpg',
    href: '/services/legal-services',
  },
];
