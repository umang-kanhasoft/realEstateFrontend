'use client';

import { apiClient } from '@/lib/api/client';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string[];
  bio?: string | null;
  specialization?: string | null;
  yearsOfExperience?: number | null;
  subscriptionType?: string | null;
  subscriptionStatus?: string | null;
  profileImageUrl?: string | null;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  [key: string]: unknown;
}

interface LoginTokens {
  accessToken: { token: string; expires: string };
  refreshToken: { token: string; expires: string };
}

interface LoginResponse {
  tokens?: LoginTokens;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: (token?: string) => Promise<void>;
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

  const checkAuth = useCallback(
    async (token?: string) => {
      const currentToken =
        token || accessToken || localStorage.getItem('auth_token');
      if (!currentToken) return;

      try {
        // Assuming there is an endpoint to get current user.
        const response = await apiClient.get<User>('/me', {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });

        // Handle potential response structure variations
        // The API returns { user: { ... } }
        const responseData = response as unknown as {
          data?: { user?: User } | User;
          user?: User;
        };
        const data = responseData.data || responseData;
        const userData = (data as { user?: User }).user || (data as User);

        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
      } catch (authError) {
        // If 401, try to refresh or logout
        console.error('Check Auth Error', authError);
        // only logout if explicitly unauthorized or malformed token, prevent loop if network error
        // logout();
      }
    },
    [accessToken]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.post<LoginResponse>('/login', {
          email,
          password,
        });

        const data = response.data || response;
        if (!data.tokens) {
          throw new Error('Invalid response structure: Tokens missing');
        }
        const { accessToken, refreshToken } = data.tokens;

        if (!accessToken?.token || !refreshToken?.token) {
          throw new Error('Invalid response structure: Tokens missing');
        }

        setAccessToken(accessToken.token);
        localStorage.setItem('auth_token', accessToken.token);
        localStorage.setItem('refresh_token', refreshToken.token);

        await checkAuth(accessToken.token);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuth]
  );

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.post('/register', data);
      // Registration successful, do nothing else (UI will handle toast/redirection)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Optional: Call logout endpoint if exists
      // await apiClient.post('/logout');
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...data } : null));
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
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
    }),
    [
      accessToken,
      checkAuth,
      clearError,
      error,
      isLoading,
      login,
      logout,
      register,
      updateUser,
      user,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
