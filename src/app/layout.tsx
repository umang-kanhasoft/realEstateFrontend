import FloatingDock from '@/components/layout/FloatingDock';
import Footer from '@/components/layout/Footer';
import { PropertyProvider } from '@/context/PropertyContext';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/common/Chatbot'), {
  ssr: false,
});
// Google Fonts removed to prevent build timeouts in restricted environments
// Using system fonts instead
const inter = { variable: 'font-sans' };
const poppins = { variable: 'font-heading' };

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Real Estate - Premium Real Estate Solutions',
    template: '%s | Real Estate',
  },
  description:
    'Find your dream property with Real Estate. We offer premium real estate solutions including property sales, rentals, and investment advisory services.',
  keywords: [
    'real estate',
    'property',
    'homes for sale',
    'apartments for rent',
    'luxury villas',
    'commercial property',
    'real estate india',
    'property investment',
  ],
  authors: [{ name: 'Real Estate' }],
  creator: 'Real Estate',
  publisher: 'Real Estate',
  metadataBase: new URL('https://realestate.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://realestate.in',
    siteName: 'Real Estate',
    title: 'Real Estate - Premium Real Estate Solutions',
    description:
      'Find your dream property with Real Estate. Premium real estate solutions in India.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Real Estate - Premium Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate - Premium Real Estate Solutions',
    description:
      'Find your dream property with Real Estate. Premium real estate solutions in India.',
    images: ['/images/twitter-image.jpg'],
    creator: '@realestate',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon-16x16.png',
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

import AuthModal from '@/components/auth/AuthModal'; // Import AuthModal
import { AuthProvider } from '@/context/AuthContext';
import { AuthModalProvider } from '@/context/AuthModalContext'; // Import AuthModalProvider
import { ChatProvider } from '@/context/ChatContext';
import { CompareProvider } from '@/context/CompareContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SearchProvider } from '@/context/SearchContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import QueryProvider from '@/providers/QueryProvider';

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body
        className="min-h-screen bg-white antialiased"
        id="__next"
        style={{ backgroundColor: '#fff' }}
      >
        <QueryProvider>
          <ThemeContextProvider>
            <SnackbarProvider>
              <AuthProvider>
                <AuthModalProvider>
                  <PropertyProvider>
                    <SearchProvider>
                      <CompareProvider>
                        <FavoritesProvider>
                          <UIProvider>
                            <ChatProvider>
                              <div className="relative flex min-h-screen flex-col">
                                <main className="flex-1">{children}</main>
                                <FloatingDock />
                                <Footer />
                                <Chatbot />
                                <AuthModal />
                              </div>
                            </ChatProvider>
                          </UIProvider>
                        </FavoritesProvider>
                      </CompareProvider>
                    </SearchProvider>
                  </PropertyProvider>
                </AuthModalProvider>
              </AuthProvider>
            </SnackbarProvider>
          </ThemeContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
