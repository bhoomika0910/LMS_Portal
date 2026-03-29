import { api } from './api';
import type { AuthUser } from '../types/auth';

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export const authService = {
  register: (payload: Record<string, unknown>) => api.post<AuthResponse>('/auth/register', payload),
  login: (payload: Record<string, unknown>) => api.post<AuthResponse>('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  me: () => api.get<AuthUser>('/auth/me'),
};
