import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { Task, CreateTaskInput, UpdateTaskInput } from '../../types';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await api.get<Task[]>('/tasks');
      return data;
    },
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => {
      const { data } = await api.get<Task>(`/tasks/${id}`);
      return data;
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      const { data } = await api.post<Task>('/tasks', input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTaskInput & { id: string }) => {
      const { data } = await api.patch<Task>(`/tasks/${id}`, input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', data.id] });
    },
  });
};