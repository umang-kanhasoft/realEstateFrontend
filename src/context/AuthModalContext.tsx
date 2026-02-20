'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type AuthView = 'login' | 'register' | 'forgot-password';

interface AuthModalContextType {
  isOpen: boolean;
  view: AuthView;
  openLogin: () => void;
  openRegister: () => void;
  openForgotPassword: () => void;
  closeModal: () => void;
  toggleView: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');

  const openLogin = useCallback(() => {
    setView('login');
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setView('register');
    setIsOpen(true);
  }, []);

  const openForgotPassword = useCallback(() => {
    setView('forgot-password');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleView = useCallback(() => {
    setView(prev => (prev === 'login' ? 'register' : 'login'));
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      view,
      openLogin,
      openRegister,
      openForgotPassword,
      closeModal,
      toggleView,
    }),
    [
      closeModal,
      isOpen,
      openForgotPassword,
      openLogin,
      openRegister,
      toggleView,
      view,
    ]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
