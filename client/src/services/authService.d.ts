import type { AuthUser } from '../types/auth';
export type AuthResponse = {
    accessToken: string;
    user: AuthUser;
};
export declare const authService: {
    register: (payload: Record<string, unknown>) => Promise<import("axios").AxiosResponse<AuthResponse, any, {}>>;
    login: (payload: Record<string, unknown>) => Promise<import("axios").AxiosResponse<AuthResponse, any, {}>>;
    logout: () => Promise<import("axios").AxiosResponse<any, any, {}>>;
    me: () => Promise<import("axios").AxiosResponse<AuthUser, any, {}>>;
};
