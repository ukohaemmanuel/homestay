import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Building2, 
  Users, 
  HardDrive, 
  AlertTriangle, 
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';
import { adminApi } from '../../lib/api/admin';
import { TenantMetrics } from '../../components/admin/TenantMetrics';
import { TenantUsageChart } from '../../components/admin/TenantUsageChart';
import { TenantAlertsList } from '../../components/admin/TenantAlertsList';
import { TenantList } from '../../components/admin/TenantList';

export default function TenantDashboard() {
  const { data: tenantMetrics } = useQuery({
    queryKey: ['tenant-metrics'],
    queryFn: adminApi.getTenantMetrics,
  });

  const stats = [
    {
      title: 'Active Tenants',
      value: tenantMetrics?.activeTenants || '0',
      icon: Building2,
      trend: tenantMetrics?.tenantGrowth || '0%',
    },
    {
      title: 'Total Users',
      value: tenantMetrics?.totalUsers || '0',
      icon: Users,
      trend: tenantMetrics?.userGrowth || '0%',
    },
    {
      title: 'Storage Used',
      value: `${tenantMetrics?.storageUsed || '0'} GB`,
      icon: HardDrive,
      trend: tenantMetrics?.storageGrowth || '0%',
    },
    {
      title: 'Monthly Revenue',
      value: `$${tenantMetrics?.monthlyRevenue || '0'}`,
      icon: DollarSign,
      trend: tenantMetrics?.revenueGrowth || '0%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage all tenant activities
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn">
            Add New Tenant
          </button>
          <button className="btn-secondary">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-brand-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-brand-600" />
                </div>
                <p className="ml-3 text-sm font-medium text-gray-900">{stat.title}</p>
              </div>
              <span className={`text-sm font-medium ${
                parseFloat(stat.trend) >= 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            System Health
          </h2>
          <TenantMetrics />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Resource Usage
          </h2>
          <TenantUsageChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TenantList />
        </div>
        <div>
          <TenantAlertsList />
        </div>
      </div>
    </div>
  );
}