import { ReactNode } from 'react';
type ThemeVariant = 'client' | 'admin' | 'instructor';
type ThemeContextValue = {
    theme: ThemeVariant;
    setTheme: (theme: ThemeVariant) => void;
};
export declare const ThemeProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeContextValue;
export {};
