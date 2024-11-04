import React from 'react';
import { Building2, Users, HardDrive, Globe } from 'lucide-react';
import { Tenant, TenantStatus } from '../../types/admin';
import { useUpdateTenant } from '../../lib/queries/admin';

interface TenantDetailsProps {
  tenant: Tenant;
}

export default function TenantDetails({ tenant }: TenantDetailsProps) {
  const updateTenant = useUpdateTenant();

  const handleStatusChange = async (status: TenantStatus) => {
    await updateTenant.mutateAsync({
      id: tenant.id,
      status,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{tenant.name}</h3>
          <select
            value={tenant.status}
            onChange={(e) => handleStatusChange(e.target.value as TenantStatus)}
            className="input !py-1.5"
          >
            {Object.values(TenantStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <Building2 className="h-5 w-5 mr-2" />
              Plan
            </dt>
            <dd className="ml-2 text-sm text-gray-900">{tenant.plan}</dd>
          </div>

          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <Users className="h-5 w-5 mr-2" />
              Users
            </dt>
            <dd className="ml-2 text-sm text-gray-900">{tenant.userCount}</dd>
          </div>

          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <HardDrive className="h-5 w-5 mr-2" />
              Storage Used
            </dt>
            <dd className="ml-2 text-sm text-gray-900">
              {Math.round(tenant.storageUsed / 1024 / 1024)} MB / {Math.round(tenant.storageLimit / 1024 / 1024)} MB
            </dd>
          </div>

          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <Globe className="h-5 w-5 mr-2" />
              Domain
            </dt>
            <dd className="ml-2 text-sm text-gray-900">
              {tenant.customDomain || `${tenant.name.toLowerCase()}.workshop.com`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}