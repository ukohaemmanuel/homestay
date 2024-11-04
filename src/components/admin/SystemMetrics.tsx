import React from 'react';
import { Activity } from 'lucide-react';

export function SystemMetrics() {
  const metrics = [
    { name: 'CPU Usage', value: '65%', trend: 'up' },
    { name: 'Memory Usage', value: '48%', trend: 'down' },
    { name: 'Storage', value: '72%', trend: 'up' },
    { name: 'Network', value: '89%', trend: 'stable' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">System Metrics</h2>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  {metric.name}
                </span>
                <span className="text-sm text-gray-500">{metric.value}</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                  <div
                    style={{ width: metric.value }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}