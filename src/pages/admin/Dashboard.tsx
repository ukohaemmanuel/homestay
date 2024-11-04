import React from 'react';
import { Building2, Users, Activity, AlertTriangle } from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { TenantList } from '../../components/admin/TenantList';
import { SystemMetrics } from '../../components/admin/SystemMetrics';
import { AlertsList } from '../../components/admin/AlertsList';

export default function AdminDashboard() {
  const stats = [
    { title: 'Active Tenants', value: '24', icon: Building2, trend: '+5%' },
    { title: 'Total Users', value: '156', icon: Users, trend: '+12%' },
    { title: 'System Load', value: '65%', icon: Activity, trend: '-2%' },
    { title: 'Active Alerts', value: '3', icon: AlertTriangle, trend: '-1' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage tenants and monitor system performance
          </p>
        </div>
        <button className="btn">
          Add New Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TenantList />
        <SystemMetrics />
      </div>

      <AlertsList />
    </div>
  );
}