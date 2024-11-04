import api from './index';
import { Subscription, PlanDetails } from '../../types/subscription';

export const subscriptionApi = {
  getCurrentSubscription: async () => {
    const { data } = await api.get<Subscription>('/subscription');
    return data;
  },

  getPlans: async () => {
    const { data } = await api.get<PlanDetails[]>('/subscription/plans');
    return data;
  },

  createSubscription: async (priceId: string) => {
    const { data } = await api.post<{ clientSecret: string }>('/subscription', {
      priceId,
    });
    return data;
  },

  cancelSubscription: async () => {
    await api.delete('/subscription');
  },

  updateSubscription: async (priceId: string) => {
    const { data } = await api.patch<Subscription>('/subscription', {
      priceId,
    });
    return data;
  },
};