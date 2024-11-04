import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Equipment, CreateEquipmentInput, UpdateEquipmentInput } from '../../types';

export const useEquipment = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data } = await api.get<Equipment[]>('/equipment');
      return data;
    },
  });
};

export const useEquipmentItem = (id: string) => {
  return useQuery({
    queryKey: ['equipment', id],
    queryFn: async () => {
      const { data } = await api.get<Equipment>(`/equipment/${id}`);
      return data;
    },
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateEquipmentInput) => {
      const { data } = await api.post<Equipment>('/equipment', input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
    },
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: UpdateEquipmentInput & { id: string }) => {
      const { data } = await api.patch<Equipment>(`/equipment/${id}`, input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      queryClient.invalidateQueries({ queryKey: ['equipment', data.id] });
    },
  });
};