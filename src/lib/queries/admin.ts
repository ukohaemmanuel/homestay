import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Tenant, CreateTenantInput, UpdateTenantInput, SystemMetrics } from '../../types/admin';

export const useTenants = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const { data } = await api.get<Tenant[]>('/admin/tenants');
      return data;
    },
  });
};

export const useTenant = (id: string) => {
  return useQuery({
    queryKey: ['tenants', id],
    queryFn: async () => {
      const { data } = await api.get<Tenant>(`/admin/tenants/${id}`);
      return data;
    },
  });
};

export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTenantInput) => {
      const { data } = await api.post<Tenant>('/admin/tenants', input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTenantInput & { id: string }) => {
      const { data } = await api.patch<Tenant>(`/admin/tenants/${id}`, input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      queryClient.invalidateQueries({ queryKey: ['tenants', data.id] });
    },
  });
};

export const useSystemMetrics = () => {
  return useQuery({
    queryKey: ['system-metrics'],
    queryFn: async () => {
      const { data } = await api.get<SystemMetrics>('/admin/metrics');
      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};