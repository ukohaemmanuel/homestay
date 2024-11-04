import api from './index';

export const adminApi = {
  // ... existing methods ...

  getTenantMetrics: async () => {
    const { data } = await api.get('/admin/tenant-metrics');
    return data;
  },

  getTenantHealth: async () => {
    const { data } = await api.get('/admin/tenant-health');
    return data;
  },

  getTenantUsage: async () => {
    const { data } = await api.get('/admin/tenant-usage');
    return data;
  },

  getTenantAlerts: async () => {
    const { data } = await api.get('/admin/tenant-alerts');
    return data;
  },

  suspendTenant: async (tenantId: string) => {
    const { data } = await api.post(`/admin/tenants/${tenantId}/suspend`);
    return data;
  },

  activateTenant: async (tenantId: string) => {
    const { data } = await api.post(`/admin/tenants/${tenantId}/activate`);
    return data;
  },

  updateTenantLimits: async (tenantId: string, limits: {
    maxUsers?: number;
    maxStorage?: number;
    maxProjects?: number;
  }) => {
    const { data } = await api.patch(`/admin/tenants/${tenantId}/limits`, limits);
    return data;
  },

  getTenantAuditLogs: async (tenantId: string) => {
    const { data } = await api.get(`/admin/tenants/${tenantId}/audit-logs`);
    return data;
  },
};