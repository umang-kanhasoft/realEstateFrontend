'use client';

import { apiClient } from '@/lib/api/client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'USER' | 'AGENT' | 'ADMIN';
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth_user');
      const savedToken = localStorage.getItem('auth_token');
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setAccessToken(savedToken);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      else localStorage.removeItem('auth_user');

      if (accessToken) localStorage.setItem('auth_token', accessToken);
      else localStorage.removeItem('auth_token');
    }
  }, [user, accessToken]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<{
        user: User;
        tokens: { accessToken: string };
      }>('/auth/login', { email, password });
      const { user: userData, tokens } = response.data;
      setUser(userData);
      setAccessToken(tokens.accessToken);
      setAccessToken(tokens.accessToken);
    } catch (err: unknown) {
      const message = (err as Error).message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<{
        user: User;
        tokens: { accessToken: string };
      }>('/auth/register', data);
      const { user: userData, tokens } = response.data;
      setUser(userData);
      setAccessToken(tokens.accessToken);
      setAccessToken(tokens.accessToken);
    } catch (err: unknown) {
      const message = (err as Error).message || 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore errors
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await apiClient.post<{ accessToken: string }>(
        '/auth/refresh'
      );
      setAccessToken(response.data.accessToken);
    } catch {
      setUser(null);
      setAccessToken(null);
      throw new Error('Session expired');
    }
  };

  const checkAuth = async () => {
    if (!accessToken) return;
    try {
      const response = await apiClient.get<{ user: User }>('/auth/me');
      setUser(response.data.user);
    } catch {
      // Try refresh
      try {
        await refreshToken();
      } catch {
        // handled in refreshToken
      }
    }
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...data } : null));
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isLoading,
        error,
        login,
        register,
        logout,
        checkAuth,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
