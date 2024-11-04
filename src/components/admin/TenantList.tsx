import React from 'react';
import { MoreVertical, CheckCircle, AlertCircle } from 'lucide-react';

const tenants = [
  {
    id: 1,
    name: 'Acme Corp',
    plan: 'Enterprise',
    users: 45,
    status: 'active',
    lastActive: '2 minutes ago',
  },
  {
    id: 2,
    name: 'TechWorks Inc',
    plan: 'Professional',
    users: 23,
    status: 'active',
    lastActive: '15 minutes ago',
  },
  {
    id: 3,
    name: 'Global Manufacturing',
    plan: 'Enterprise',
    users: 89,
    status: 'warning',
    lastActive: '1 hour ago',
  },
];

export function TenantList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Active Tenants</h2>
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {tenant.status === 'active' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {tenant.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tenant.plan} • {tenant.users} users
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{tenant.lastActive}</span>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}