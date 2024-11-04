import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { User, CreateUserInput, UpdateUserInput } from '../../types';

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await api.get<User[]>('/users');
      return data;
    },
  });
};

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: async () => {
      const { data } = await api.get<User>(`/users/${id}`);
      return data;
    },
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateUserInput) => {
      const { data } = await api.post<User>('/users', input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateUserInput & { id: string }) => {
      const { data } = await api.patch<User>(`/users/${id}`, input);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['team', data.id] });
    },
  });
};