import { AxiosError } from 'axios';
import { useNotifications } from '../hooks/useNotifications';

export function handleApiError(error: unknown) {
  const { addNotification } = useNotifications.getState();

  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    addNotification({
      title: 'Error',
      message,
      type: 'error',
    });
  } else if (error instanceof Error) {
    addNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
    });
  } else {
    addNotification({
      title: 'Error',
      message: 'An unexpected error occurred',
      type: 'error',
    });
  }
}