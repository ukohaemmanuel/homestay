import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/auth';

export function useWebSocket(onMessage: (data: any) => void) {
  const ws = useRef<WebSocket | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;

    const wsUrl = `${import.meta.env.VITE_WS_URL}?token=${token}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [token, onMessage]);

  return ws.current;
}