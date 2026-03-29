import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export const ProtectedRoute = ({ role, redirectTo = '/login' }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: redirectTo, replace: true });
    }
    if (role && user?.role !== role) {
        const fallback = role === 'admin' ? '/admin/login' : role === 'instructor' ? '/instructor/login' : '/login';
        return _jsx(Navigate, { to: fallback, replace: true });
    }
    return _jsx(Outlet, {});
};
