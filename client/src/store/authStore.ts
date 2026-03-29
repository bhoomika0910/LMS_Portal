import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthUser, UserRole } from '../types/auth';

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'authenticated';
};

type AuthActions = {
  setSession: (payload: { token: string; user: AuthUser }) => void;
  clearSession: () => void;
  setStatus: (status: AuthState['status']) => void;
  hasRole: (role: UserRole) => boolean;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools((set, get) => ({
    accessToken: null,
    user: null,
    status: 'idle',
    setSession: ({ token, user }) => set({ accessToken: token, user, status: 'authenticated' }),
    clearSession: () => set({ accessToken: null, user: null, status: 'idle' }),
    setStatus: (status) => set({ status }),
    hasRole: (role) => get().user?.role === role,
  })),
);
