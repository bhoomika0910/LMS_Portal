import { ReactNode } from 'react';
type ModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};
export declare const Modal: ({ open, onClose, title, children }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export {};
