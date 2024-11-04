import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-brand-100 rounded-lg">
            <Icon className="h-6 w-6 text-brand-600" />
          </div>
          <h3 className="ml-3 text-sm font-medium text-gray-900">{title}</h3>
        </div>
        <span
          className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend}
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}