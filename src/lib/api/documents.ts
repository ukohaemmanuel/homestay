import api from './index';
import { Document, CreateDocumentInput, UpdateDocumentInput } from '../../types';

export const documentsApi = {
  getAll: async () => {
    const { data } = await api.get<Document[]>('/documents');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Document>(`/documents/${id}`);
    return data;
  },

  create: async (input: CreateDocumentInput) => {
    const formData = new FormData();
    formData.append('file', input.file);
    formData.append('name', input.name);
    formData.append('type', input.type);

    const { data } = await api.post<Document>('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  update: async (id: string, input: UpdateDocumentInput) => {
    const { data } = await api.patch<Document>(`/documents/${id}`, input);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/documents/${id}`);
  },

  download: async (id: string) => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};