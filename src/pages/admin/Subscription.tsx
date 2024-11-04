import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Check, X } from 'lucide-react';
import { subscriptionApi } from '../../lib/api/subscription';
import { PlanDetails, SubscriptionPlan } from '../../types/subscription';
import { useAuthStore } from '../../store/auth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Subscription() {
  const { data: currentSubscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: subscriptionApi.getCurrentSubscription,
  });

  const { data: plans } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: subscriptionApi.getPlans,
  });

  const handleSubscribe = async (plan: PlanDetails) => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { clientSecret } = await subscriptionApi.createSubscription(plan.id);
      
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('card')!,
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      });
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose the plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {plans?.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              currentSubscription?.plan === plan.id
                ? 'ring-2 ring-brand-500'
                : ''
            }`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-500">/{plan.billingPeriod}</span>
              </p>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 shrink-0" />
                    )}
                    <span className="ml-3 text-sm text-gray-500">
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={currentSubscription?.plan === plan.id}
                  className={`w-full btn ${
                    currentSubscription?.plan === plan.id
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {currentSubscription?.plan === plan.id
                    ? 'Current Plan'
                    : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}