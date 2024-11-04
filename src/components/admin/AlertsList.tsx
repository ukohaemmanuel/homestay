import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'High System Load',
    message: 'Server CPU usage exceeded 80% for more than 5 minutes',
    severity: 'high',
    time: '10 minutes ago',
  },
  {
    id: 2,
    title: 'Storage Warning',
    message: 'Storage capacity reaching 90% on primary database',
    severity: 'medium',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'Backup Completed',
    message: 'Daily system backup completed successfully',
    severity: 'info',
    time: '2 hours ago',
  },
];

export function AlertsList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
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
                {alert.severity === 'info' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      alert.severity === 'high'
                        ? 'text-red-400'
                        : 'text-yellow-400'
                    }`}
                  />
                )}
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {alert.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{alert.message}</p>
                </div>
                <span className="ml-3 text-sm text-gray-500">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}