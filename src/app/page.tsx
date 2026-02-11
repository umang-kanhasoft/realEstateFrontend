import InstallPrompt from '@/components/common/InstallPrompt';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import Hero from '@/components/sections/Hero';
import NewProjects from '@/components/sections/NewProjects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Real Estate - Premium Real Estate Solutions | Find Your Dream Property',
  description:
    'Discover premium properties with Real Estate. From luxury villas to modern apartments, find your dream home with our expert real estate services in India.',
  keywords: [
    'real estate',
    'properties for sale',
    'homes in India',
    'luxury apartments',
    'buy property',
    'rent property',
  ],
};

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <NewProjects />
      {/* <Faq /> */}
      <InstallPrompt />
    </>
  );
}
