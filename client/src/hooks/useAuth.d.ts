export declare const useAuth: () => {
    accessToken: string | null;
    user: import("../types/auth").AuthUser | null;
    status: "loading" | "idle" | "authenticated";
    isAuthenticated: boolean;
    hasRole: (role: import("../types/auth").UserRole) => boolean;
};
