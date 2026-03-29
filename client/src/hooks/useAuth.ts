import { useMemo } from 'react';
import { useAuthStore } from '../store';

export const useAuth = () => {
  const { accessToken, user, status, hasRole } = useAuthStore();

  const isAuthenticated = Boolean(accessToken && user);

  return useMemo(
    () => ({
      accessToken,
      user,
      status,
      isAuthenticated,
      hasRole,
    }),
    [accessToken, user, status, hasRole],
  );
};
