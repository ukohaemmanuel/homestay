export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  TASKS: {
    BASE: '/tasks',
    DOCUMENTS: (id: string) => `/tasks/${id}/documents`,
    COMMENTS: (id: string) => `/tasks/${id}/comments`,
  },
  EQUIPMENT: {
    BASE: '/equipment',
    MAINTENANCE: (id: string) => `/equipment/${id}/maintenance`,
  },
  TEAM: {
    BASE: '/users',
    INVITE: '/users/invite',
  },
  ADMIN: {
    TENANTS: '/admin/tenants',
    METRICS: '/admin/metrics',
  },
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};