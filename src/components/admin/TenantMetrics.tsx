import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';
import { adminApi } from '../../lib/api/admin';

export function TenantMetrics() {
  const { data: metrics } = useQuery({
    queryKey: ['tenant-health'],
    queryFn: adminApi.getTenantHealth,
  });

  const getStatusColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-green-500';
    if (value >= threshold * 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      {metrics?.map((metric) => (
        <div key={metric.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">
              {metric.name}
            </span>
            <span className={`text-sm font-medium ${getStatusColor(metric.value, metric.threshold)}`}>
              {metric.value}%
            </span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
              <div
                style={{ width: `${metric.value}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  getStatusColor(metric.value, metric.threshold).replace('text', 'bg')
                }`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}