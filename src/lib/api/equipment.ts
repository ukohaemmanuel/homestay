import api from '../api';
import { Equipment, CreateEquipmentInput, UpdateEquipmentInput } from '../../types';

export const equipmentApi = {
  getAll: async () => {
    const { data } = await api.get<Equipment[]>('/equipment');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Equipment>(`/equipment/${id}`);
    return data;
  },

  create: async (input: CreateEquipmentInput) => {
    const { data } = await api.post<Equipment>('/equipment', input);
    return data;
  },

  update: async (id: string, input: UpdateEquipmentInput) => {
    const { data } = await api.patch<Equipment>(`/equipment/${id}`, input);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/equipment/${id}`);
  },

  scheduleMaintenance: async (id: string, date: string) => {
    const { data } = await api.post<Equipment>(`/equipment/${id}/maintenance`, { date });
    return data;
  },
};