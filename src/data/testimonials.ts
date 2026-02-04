import { StatItem, Testimonial } from '@/types';

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    company: 'Kumar Enterprises',
    avatar: '/images/testimonials/testimonial-1.jpg',
    content:
      'Real Estate made our property search incredibly smooth. Their team understood exactly what we were looking for and found us the perfect office space within our budget. Highly professional and dedicated!',
    rating: 5,
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Anita Desai',
    role: 'IT Professional',
    company: 'Tech Solutions Ltd',
    avatar: '/images/testimonials/testimonial-2.jpg',
    content:
      "I was looking for my first home and was quite nervous about the process. The team at Real Estate guided me through every step, from property selection to loan assistance. Couldn't be happier with my new apartment!",
    rating: 5,
    date: '2024-01-20',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    role: 'Investor',
    company: 'Singh Investments',
    avatar: '/images/testimonials/testimonial-3.jpg',
    content:
      "As a real estate investor, I've worked with many agencies. Real Estate stands out for their market knowledge and transparency. They've helped me build a profitable portfolio over the years.",
    rating: 5,
    date: '2024-02-01',
  },
  {
    id: '4',
    name: 'Priya Mehta',
    role: 'Doctor',
    company: 'City Hospital',
    avatar: '/images/testimonials/testimonial-4.jpg',
    content:
      'The rental service at Real Estate is exceptional. They found quality tenants for my property and handle all management aspects professionally. I can focus on my work while they take care of everything.',
    rating: 4,
    date: '2024-02-05',
  },
  {
    id: '5',
    name: 'Arjun Nair',
    role: 'Entrepreneur',
    company: 'Startup Hub',
    avatar: '/images/testimonials/testimonial-5.jpg',
    content:
      'Real Estate helped us find the perfect co-working space for our startup. Their understanding of commercial properties and quick response time made the whole process effortless.',
    rating: 5,
    date: '2024-02-10',
  },
];

export const statsData: StatItem[] = [
  {
    id: '1',
    value: 500,
    suffix: '+',
    label: 'Properties Sold',
    icon: 'Home',
  },
  {
    id: '2',
    value: 1000,
    suffix: '+',
    label: 'Happy Clients',
    icon: 'People',
  },
  {
    id: '3',
    value: 50,
    suffix: '+',
    label: 'Expert Agents',
    icon: 'Support',
  },
  {
    id: '4',
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    icon: 'Timer',
  },
];
