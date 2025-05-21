import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';

export const useSocketPing = (intervalMs = 5000) => {

    const socket = useSocket();

    const [ping, setPing] = useState(null);

    const measurePing = useCallback(async () => {
        if (!socket?.connected || !socket?.request) return;

        const start = performance.now();
        try {
            await socket.request('check connection');
             // This should be handled by your server
            const latency = performance.now() - start;

            setPing(Math.round(latency));

        } catch (err) {

            console.error('Ping failed:', err);
            setPing(null);

        }

    }, [socket]);

    useEffect(() => {
        measurePing();
        const id = setInterval(measurePing, intervalMs);
        return () => clearInterval(id);
    }, [measurePing, intervalMs]);

    return ping;
};
