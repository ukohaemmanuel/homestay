import api from './index';
import { Report, GenerateReportInput } from '../../types';

export const reportsApi = {
  generate: async (input: GenerateReportInput) => {
    const { data } = await api.post<Report>('/reports/generate', input);
    return data;
  },

  getAll: async () => {
    const { data } = await api.get<Report[]>('/reports');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Report>(`/reports/${id}`);
    return data;
  },

  download: async (id: string) => {
    const response = await api.get(`/reports/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  scheduleGeneration: async (input: GenerateReportInput & { schedule: string }) => {
    const { data } = await api.post('/reports/schedule', input);
    return data;
  },
};