import api from '../api';
import { Tenant, CreateTenantInput, UpdateTenantInput } from '../../types/admin';

export const tenantsApi = {
  getAll: async () => {
    const { data } = await api.get<Tenant[]>('/tenants');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Tenant>(`/tenants/${id}`);
    return data;
  },

  create: async (input: CreateTenantInput) => {
    const { data } = await api.post<Tenant>('/tenants', input);
    return data;
  },

  update: async (id: string, input: UpdateTenantInput) => {
    const { data } = await api.patch<Tenant>(`/tenants/${id}`, input);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/tenants/${id}`);
  },
};