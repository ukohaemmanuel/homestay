import { useNotifications } from './useNotifications';
import { adminApi } from '../lib/api/admin';

export function useEmailNotifications() {
  const { addNotification } = useNotifications();

  const sendEmail = async (options: {
    to: string | string[];
    subject: string;
    template: string;
    data: Record<string, any>;
  }) => {
    try {
      await adminApi.sendEmail(options);
      addNotification({
        title: 'Email Sent',
        message: 'Email notification sent successfully',
        type: 'success',
      });
    } catch (error) {
      addNotification({
        title: 'Email Error',
        message: 'Failed to send email notification',
        type: 'error',
      });
    }
  };

  return { sendEmail };
}