import api from '../api';
import { Task, CreateTaskInput, UpdateTaskInput } from '../../types';

export const tasksApi = {
  getAll: async () => {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  create: async (input: CreateTaskInput) => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (key === 'documents' && value) {
        Array.from(value).forEach((file) => {
          formData.append('documents', file);
        });
      } else {
        formData.append(key, value as string);
      }
    });
    
    const { data } = await api.post<Task>('/tasks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  update: async (id: string, input: UpdateTaskInput) => {
    const { data } = await api.patch<Task>(`/tasks/${id}`, input);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },

  addComment: async (id: string, comment: string) => {
    const { data } = await api.post<Task>(`/tasks/${id}/comments`, { comment });
    return data;
  },

  uploadDocument: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('document', file);
    const { data } = await api.post<Task>(`/tasks/${id}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};