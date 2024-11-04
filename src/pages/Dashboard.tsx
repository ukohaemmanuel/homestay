import React from 'react';
import { BarChart3, Users, Wrench, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { TaskList } from '../components/dashboard/TaskList';
import { EquipmentStatus } from '../components/dashboard/EquipmentStatus';
import { TeamActivity } from '../components/dashboard/TeamActivity';

export default function Dashboard() {
  const stats = [
    { title: 'Active Tasks', value: '24', icon: Clock, trend: '+5%' },
    { title: 'Team Members', value: '12', icon: Users, trend: '0%' },
    { title: 'Equipment', value: '45', icon: Wrench, trend: '+2%' },
    { title: 'Completed Tasks', value: '156', icon: CheckCircle2, trend: '+12%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
            New Task
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TaskList />
        <EquipmentStatus />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TeamActivity />
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Performance Overview
            </h3>
            {/* Chart will be implemented here */}
          </div>
        </div>
      </div>
    </div>
  );
}