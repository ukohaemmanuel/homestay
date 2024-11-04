import api from './index';

export const aiApi = {
  // Predictive Maintenance
  getPredictiveMaintenance: async (equipmentId: string) => {
    const { data } = await api.get(`/ai/maintenance/predict/${equipmentId}`);
    return data;
  },

  // Workload Analysis
  getWorkloadPredictions: async () => {
    const { data } = await api.get('/ai/workload/predict');
    return data;
  },

  // Resource Optimization
  getResourceOptimization: async () => {
    const { data } = await api.get('/ai/resources/optimize');
    return data;
  },

  // Performance Analytics
  getPerformanceInsights: async () => {
    const { data } = await api.get('/ai/performance/insights');
    return data;
  },

  // Anomaly Detection
  getAnomalyDetection: async () => {
    const { data } = await api.get('/ai/anomalies/detect');
    return data;
  },

  // Cost Optimization
  getCostOptimization: async () => {
    const { data } = await api.get('/ai/costs/optimize');
    return data;
  },
};