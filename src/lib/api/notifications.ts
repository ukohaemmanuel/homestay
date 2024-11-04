import api from './index';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WS_URL, {
  autoConnect: false,
});

export const notificationsApi = {
  getAll: async () => {
    const { data } = await api.get('/notifications');
    return data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.post(`/notifications/${id}/read`);
    return data;
  },

  markAllAsRead: async () => {
    const { data } = await api.post('/notifications/read-all');
    return data;
  },

  subscribeToNotifications: (userId: string, callback: (notification: any) => void) => {
    socket.auth = { userId };
    socket.connect();
    socket.on('notification', callback);

    return () => {
      socket.off('notification', callback);
      socket.disconnect();
    };
  },

  sendEmail: async (options: {
    to: string | string[];
    subject: string;
    template: string;
    data: Record<string, any>;
  }) => {
    const { data } = await api.post('/notifications/email', options);
    return data;
  },
};