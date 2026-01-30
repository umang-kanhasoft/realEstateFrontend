import Chatbot from '@/components/common/Chatbot';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AppProvider } from '@/context/AppContext';
import { PropertyProvider } from '@/context/PropertyContext';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';
import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'VitalSpace - Premium Real Estate Solutions',
    template: '%s | VitalSpace',
  },
  description:
    'Find your dream property with VitalSpace. We offer premium real estate solutions including property sales, rentals, and investment advisory services.',
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
  authors: [{ name: 'VitalSpace' }],
  creator: 'VitalSpace',
  publisher: 'VitalSpace',
  metadataBase: new URL('https://vitalspace.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vitalspace.in',
    siteName: 'VitalSpace',
    title: 'VitalSpace - Premium Real Estate Solutions',
    description:
      'Find your dream property with VitalSpace. Premium real estate solutions in India.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VitalSpace - Premium Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VitalSpace - Premium Real Estate Solutions',
    description:
      'Find your dream property with VitalSpace. Premium real estate solutions in India.',
    images: ['/images/twitter-image.jpg'],
    creator: '@vitalspace',
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

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white antialiased" id="__next">
        <AppProvider>
          <ThemeContextProvider>
            <PropertyProvider>
              <UIProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Chatbot />
                </div>
              </UIProvider>
            </PropertyProvider>
          </ThemeContextProvider>
        </AppProvider>
      </body>
    </html>
  );
}
