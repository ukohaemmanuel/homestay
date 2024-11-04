import api from './index';

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Login failed. Please check your credentials and try again.'
      };
    }
  },

  createSuperAdmin: async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/setup', userData);
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create super admin account. Please try again.'
      };
    }
  },

  register: async (userData: {
    companyName: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/register', userData);
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to process forgot password request. Please try again.'
      };
    }
  },

  resetPassword: async (token: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/reset-password', { token, password });
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to reset password. Please try again.'
      };
    }
  },

  verifyEmail: async (token: string): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/verify-email', { token });
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to verify email. Please try again.'
      };
    }
  },

  refreshToken: async (): Promise<AuthResponse> => {
    try {
      const { data } = await api.post('/auth/refresh-token');
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to refresh token. Please login again.'
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};