import { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
type ButtonProps = HTMLMotionProps<'button'> & {
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    icon?: ReactNode;
};
export declare const Button: ({ children, className, variant, loading, icon, ...rest }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
