export type UserRole = 'student' | 'instructor' | 'admin';
export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
};
