import type { AuthUser, UserRole } from '../types/auth';
type AuthState = {
    accessToken: string | null;
    user: AuthUser | null;
    status: 'idle' | 'loading' | 'authenticated';
};
type AuthActions = {
    setSession: (payload: {
        token: string;
        user: AuthUser;
    }) => void;
    clearSession: () => void;
    setStatus: (status: AuthState['status']) => void;
    hasRole: (role: UserRole) => boolean;
};
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthState & AuthActions>, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(partial: (AuthState & AuthActions) | Partial<AuthState & AuthActions> | ((state: AuthState & AuthActions) => (AuthState & AuthActions) | Partial<AuthState & AuthActions>), replace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
