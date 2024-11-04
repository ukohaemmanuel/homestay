import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { subscriptionApi } from '../../lib/api/subscription';
import { useAuthStore } from '../../store/auth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function SubscriptionPlans() {
  const { user } = useAuthStore();
  const { data: plans, isLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: subscriptionApi.getPlans,
  });

  const handleSubscribe = async (priceId: string) => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { clientSecret } = await subscriptionApi.createSubscription(priceId);
      
      const { error } = await stripe.confirmCardPayment(clientSecret);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  if (isLoading) {
    return <div>Loading plans...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {plans?.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-500">/{plan.billingPeriod}</span>
            </p>
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="ml-3 text-gray-500">{feature.name}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              className="mt-8 w-full btn"
            >
              Subscribe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}