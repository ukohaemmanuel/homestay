import api from './index';

export const stripeApi = {
  createSubscription: async (priceId: string) => {
    const { data } = await api.post('/stripe/create-subscription', { priceId });
    return data;
  },

  createPaymentIntent: async (amount: number) => {
    const { data } = await api.post('/stripe/create-payment-intent', { amount });
    return data;
  },

  getSubscriptionPlans: async () => {
    const { data } = await api.get('/stripe/plans');
    return data;
  },

  cancelSubscription: async () => {
    await api.post('/stripe/cancel-subscription');
  },

  updateSubscription: async (priceId: string) => {
    const { data } = await api.post('/stripe/update-subscription', { priceId });
    return data;
  },
};