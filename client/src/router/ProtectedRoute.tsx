import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types/auth';

 type ProtectedRouteProps = {
  role?: UserRole;
  redirectTo?: string;
};

export const ProtectedRoute = ({ role, redirectTo = '/login' }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (role && user?.role !== role) {
    const fallback = role === 'admin' ? '/admin/login' : role === 'instructor' ? '/instructor/login' : '/login';
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};
