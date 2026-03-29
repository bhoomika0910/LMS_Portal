import { ReactNode } from 'react';
type PageWrapperProps = {
    children: ReactNode;
    variant?: 'client' | 'admin' | 'instructor';
};
export declare const PageWrapper: ({ children, variant }: PageWrapperProps) => import("react/jsx-runtime").JSX.Element;
export {};
