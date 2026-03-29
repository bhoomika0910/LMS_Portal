import type { UserRole } from '../types/auth';
type ProtectedRouteProps = {
    role?: UserRole;
    redirectTo?: string;
};
export declare const ProtectedRoute: ({ role, redirectTo }: ProtectedRouteProps) => import("react/jsx-runtime").JSX.Element;
export {};
