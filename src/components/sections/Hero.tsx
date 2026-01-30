import React from 'react';
import Image from 'next/image';
import SearchForm from '@/components/forms/SearchForm';
import { Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-hero-bg-light pt-12 pb-24 overflow-hidden">
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-white/50 rounded-full" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sky-200/30 rounded-full" />
      
      <Container maxWidth="xl" className="relative z-10">
        
        <SearchForm />

        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <p className="font-semibold text-brand-dark text-lg">Popular Localities</p>
          <ArrowForwardIcon className="text-brand-dark" />
          <Button 
            variant="outlined" 
            style={{ borderRadius: '9999px', textTransform: 'none', borderColor: '#d1d5db', color: '#4b5563', padding: '6px 16px' }}
            className="hover:bg-gray-100 hover:border-gray-400"
          >
            Adani Shantigram
          </Button>
        </div>
      </Container>
      
      {/* <div className="absolute bottom-0 right-0 h-full w-[30%] max-w-[450px] hidden lg:block">
        <Image
          src="/images/hero-person.png" // Assumes you have this image
          alt="Real estate expert"
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
        />
      </div> */}
    </div>
  );
};

export default Hero;