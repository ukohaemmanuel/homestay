import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { adminApi } from '../../lib/api/admin';

export function TenantAlertsList() {
  const { data: alerts } = useQuery({
    queryKey: ['tenant-alerts'],
    queryFn: adminApi.getTenantAlerts,
  });

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          System Alerts
        </h2>
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${
                alert.severity === 'high'
                  ? 'bg-red-50'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-50'
                  : 'bg-green-50'
              }`}
            >
              <div className="flex items-start">
                {getAlertIcon(alert.severity)}
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {alert.message}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}