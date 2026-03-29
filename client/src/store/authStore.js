import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const useAuthStore = create()(devtools((set, get) => ({
    accessToken: null,
    user: null,
    status: 'idle',
    setSession: ({ token, user }) => set({ accessToken: token, user, status: 'authenticated' }),
    clearSession: () => set({ accessToken: null, user: null, status: 'idle' }),
    setStatus: (status) => set({ status }),
    hasRole: (role) => get().user?.role === role,
})));
