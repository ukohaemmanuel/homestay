import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Tool,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { customerApi } from '../../lib/api/customer';
import { StatCard } from '../../components/dashboard/StatCard';
import { WorkOrderList } from '../../components/customer/WorkOrderList';
import { MaintenanceSchedule } from '../../components/customer/MaintenanceSchedule';
import { NotificationsList } from '../../components/customer/NotificationsList';

export default function CustomerDashboard() {
  const { data: dashboardData } = useQuery({
    queryKey: ['customer-dashboard'],
    queryFn: customerApi.getDashboardData,
  });

  const stats = [
    {
      title: 'Active Work Orders',
      value: dashboardData?.activeWorkOrders || '0',
      icon: Clock,
      trend: dashboardData?.workOrderTrend || '0%',
    },
    {
      title: 'Pending Approvals',
      value: dashboardData?.pendingApprovals || '0',
      icon: AlertTriangle,
      trend: '',
    },
    {
      title: 'Equipment Status',
      value: `${dashboardData?.operationalEquipment || '0'}/${
        dashboardData?.totalEquipment || '0'
      }`,
      icon: Tool,
      trend: '',
    },
    {
      title: 'This Month Spending',
      value: `$${dashboardData?.monthlySpending || '0'}`,
      icon: DollarSign,
      trend: dashboardData?.spendingTrend || '0%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your workshop activities
          </p>
        </div>
        <button className="btn">
          New Service Request
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WorkOrderList />
        <MaintenanceSchedule />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h2>
            {/* Activity timeline will go here */}
          </div>
        </div>
        <NotificationsList />
      </div>
    </div>
  );
}