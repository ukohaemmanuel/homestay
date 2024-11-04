import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Switch, Settings, AlertTriangle } from 'lucide-react';
import { adminApi } from '../../lib/api/admin';

interface TenantFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'core' | 'premium' | 'enterprise';
  requiresConfiguration: boolean;
}

interface Tenant {
  id: string;
  name: string;
  features: string[];
  subscription: {
    plan: string;
    status: string;
  };
}

export default function TenantFeatures() {
  const queryClient = useQueryClient();
  const [selectedTenant, setSelectedTenant] = React.useState<string>('');

  const { data: tenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: adminApi.getTenants,
  });

  const { data: features } = useQuery({
    queryKey: ['tenant-features'],
    queryFn: adminApi.getTenantFeatures,
  });

  const updateFeature = useMutation({
    mutationFn: (params: { tenantId: string; featureId: string; enabled: boolean }) =>
      adminApi.updateTenantFeature(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });

  const selectedTenantData = tenants?.find(t => t.id === selectedTenant);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Feature Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enable or disable features for each tenant
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Select Tenant</label>
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
          >
            <option value="">Select a tenant</option>
            {tenants?.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </div>

        {selectedTenantData && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedTenantData.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Subscription: {selectedTenantData.subscription.plan}
                  </p>
                </div>
                {selectedTenantData.subscription.status !== 'active' && (
                  <div className="flex items-center text-yellow-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span className="text-sm">Subscription {selectedTenantData.subscription.status}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {features?.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{feature.name}</h4>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      feature.category === 'enterprise' 
                        ? 'bg-purple-100 text-purple-800'
                        : feature.category === 'premium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {feature.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {feature.requiresConfiguration && (
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Settings className="h-5 w-5" />
                      </button>
                    )}
                    <Switch
                      checked={selectedTenantData.features.includes(feature.id)}
                      onChange={() => {
                        updateFeature.mutate({
                          tenantId: selectedTenant,
                          featureId: feature.id,
                          enabled: !selectedTenantData.features.includes(feature.id),
                        });
                      }}
                      className={`${
                        selectedTenantData.features.includes(feature.id) ? 'bg-brand-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          selectedTenantData.features.includes(feature.id) ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      >
                        <span
                          className={`${
                            selectedTenantData.features.includes(feature.id)
                              ? 'opacity-0 duration-100 ease-out'
                              : 'opacity-100 duration-200 ease-in'
                          } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                          aria-hidden="true"
                        >
                          <svg
                            className="h-3 w-3 text-gray-400"
                            fill="none"
                            viewBox="0 0 12 12"
                          >
                            <path
                              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className={`${
                            selectedTenantData.features.includes(feature.id)
                              ? 'opacity-100 duration-200 ease-in'
                              : 'opacity-0 duration-100 ease-out'
                          } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                          aria-hidden="true"
                        >
                          <svg
                            className="h-3 w-3 text-brand-600"
                            fill="currentColor"
                            viewBox="0 0 12 12"
                          >
                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                          </svg>
                        </span>
                      </span>
                    </Switch>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}