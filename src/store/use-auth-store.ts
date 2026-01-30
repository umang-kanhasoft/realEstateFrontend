import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { apiClient } from '@/lib/api/client';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'USER' | 'AGENT' | 'ADMIN';
}

interface AuthSuccessResponse {
  user: User;
  tokens: {
    accessToken: string;
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post<AuthSuccessResponse>(
            '/auth/login',
            {
              email,
              password,
            }
          );
          const { user, tokens } = response.data;
          set({
            user,
            accessToken: tokens.accessToken,
            isLoading: false,
          });
        } catch (error: any) {
          const message = error.message || 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      register: async data => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post<AuthSuccessResponse>(
            '/auth/register',
            data
          );
          const { user, tokens } = response.data;
          set({
            user,
            accessToken: tokens.accessToken,
            isLoading: false,
          });
        } catch (error: any) {
          const message = error.message || 'Registration failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/auth/logout');
        } catch {
          // Ignore errors during logout
        } finally {
          set({ user: null, accessToken: null });
        }
      },

      checkAuth: async () => {
        const { accessToken } = get();
        if (!accessToken) return;

        try {
          const response = await apiClient.get<{ user: User }>('/auth/me');
          set({ user: response.data.user }); // adjust structure if needed
        } catch {
          // Token might be expired, try to refresh
          try {
            await get().refreshToken();
          } catch {
            set({ user: null, accessToken: null });
          }
        }
      },

      refreshToken: async () => {
        try {
          const response = await apiClient.post<{ accessToken: string }>(
            '/auth/refresh'
          );
          const { accessToken } = response.data;
          set({ accessToken });
        } catch {
          set({ user: null, accessToken: null });
          throw new Error('Session expired');
        }
      },

      updateUser: data => {
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
