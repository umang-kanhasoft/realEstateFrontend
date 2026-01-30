import About from '@/components/sections/About';
import CTASection from '@/components/sections/CTASection';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import Hero from '@/components/sections/Hero';
import Newsletter from '@/components/sections/Newsletter';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'VitalSpace - Premium Real Estate Solutions | Find Your Dream Property',
  description:
    'Discover premium properties with VitalSpace. From luxury villas to modern apartments, find your dream home with our expert real estate services in India.',
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
      <About />
      <Services />
      <Stats />
      <Testimonials />
      <CTASection />
      <Newsletter />
    </>
  );
}
