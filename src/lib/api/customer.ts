import api from './index';

export const customerApi = {
  getDashboardData: async () => {
    const { data } = await api.get('/customer/dashboard');
    return data;
  },

  getWorkOrders: async () => {
    const { data } = await api.get('/customer/work-orders');
    return data;
  },

  getMaintenanceSchedule: async () => {
    const { data } = await api.get('/customer/maintenance-schedule');
    return data;
  },

  createServiceRequest: async (request: any) => {
    const { data } = await api.post('/customer/service-requests', request);
    return data;
  },

  getEquipment: async () => {
    const { data } = await api.get('/customer/equipment');
    return data;
  },

  getDocuments: async () => {
    const { data } = await api.get('/customer/documents');
    return data;
  },

  getInvoices: async () => {
    const { data } = await api.get('/customer/invoices');
    return data;
  },

  makePayment: async (paymentData: any) => {
    const { data } = await api.post('/customer/payments', paymentData);
    return data;
  },
};