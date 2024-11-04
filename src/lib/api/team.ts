import api from '../api';
import { User, CreateUserInput, UpdateUserInput } from '../../types';

export const teamApi = {
  getAll: async () => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (input: CreateUserInput) => {
    const { data } = await api.post<User>('/users', input);
    return data;
  },

  update: async (id: string, input: UpdateUserInput) => {
    const { data } = await api.patch<User>(`/users/${id}`, input);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },

  invite: async (email: string, role: string) => {
    const { data } = await api.post('/users/invite', { email, role });
    return data;
  },
};