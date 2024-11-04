import axios from 'axios';
import { useAuthStore } from '../../store/auth';
import { useNotifications } from '../../hooks/useNotifications';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { addNotification } = useNotifications.getState();

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      addNotification({
        title: 'Session Expired',
        message: 'Please log in again to continue.',
        type: 'error',
      });
    } else if (error.response?.status === 403) {
      addNotification({
        title: 'Access Denied',
        message: 'You do not have permission to perform this action.',
        type: 'error',
      });
    } else if (error.response?.status === 500) {
      addNotification({
        title: 'Server Error',
        message: 'An unexpected error occurred. Please try again later.',
        type: 'error',
      });
    }

    return Promise.reject(error);
  }
);

export default api;