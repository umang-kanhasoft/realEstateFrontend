'use client';

import { AuthProvider } from '@/context/AuthContext';
import { AuthModalProvider, useAuthModal } from '@/context/AuthModalContext';
import { ChatProvider } from '@/context/ChatContext';
import { CompareProvider } from '@/context/CompareContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { PropertyProvider } from '@/context/PropertyContext';
import { SearchProvider } from '@/context/SearchContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';
import QueryProvider from '@/providers/QueryProvider';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const FloatingDock = dynamic(() => import('@/components/layout/FloatingDock'), {
  ssr: false,
});
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: false,
});
const Chatbot = dynamic(() => import('@/components/common/Chatbot'), {
  ssr: false,
});
const AuthModal = dynamic(() => import('@/components/auth/AuthModal'), {
  ssr: false,
});

interface AppClientRootProps {
  children: React.ReactNode;
}

function GlobalChrome() {
  const [isChromeReady, setIsChromeReady] = useState(false);
  const [isChatbotReady, setIsChatbotReady] = useState(false);
  const { isOpen } = useAuthModal();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsChromeReady(true);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const enableChatbot = () => {
      setIsChatbotReady(true);
    };

    const fallbackTimer = window.setTimeout(enableChatbot, 3000);

    window.addEventListener('pointerdown', enableChatbot, {
      once: true,
      passive: true,
    });
    window.addEventListener('keydown', enableChatbot, { once: true });

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('pointerdown', enableChatbot);
      window.removeEventListener('keydown', enableChatbot);
    };
  }, []);

  return (
    <>
      {isChromeReady ? <FloatingDock /> : null}
      {isChromeReady ? <Footer /> : null}
      {isChromeReady && isChatbotReady ? <Chatbot /> : null}
      {isOpen ? <AuthModal /> : null}
    </>
  );
}

export default function AppClientRoot({ children }: AppClientRootProps) {
  return (
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
                            <GlobalChrome />
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
  );
}
