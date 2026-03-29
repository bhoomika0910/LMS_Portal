import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5000';
const SocketContext = createContext({ socket: null, isConnected: false });
export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const socketInstance = io(SOCKET_URL, {
            transports: ['websocket'],
            withCredentials: true,
        });
        socketRef.current = socketInstance;
        socketInstance.on('connect', () => setIsConnected(true));
        socketInstance.on('disconnect', () => setIsConnected(false));
        return () => {
            socketInstance.disconnect();
        };
    }, []);
    return (_jsx(SocketContext.Provider, { value: { socket: socketRef.current, isConnected }, children: children }));
};
export const useSocket = () => useContext(SocketContext);
