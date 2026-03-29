import { ReactNode } from 'react';
import { Socket } from 'socket.io-client';
type SocketContextValue = {
    socket: Socket | null;
    isConnected: boolean;
};
export declare const SocketProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useSocket: () => SocketContextValue;
export {};
