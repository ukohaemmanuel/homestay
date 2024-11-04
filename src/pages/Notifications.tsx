import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Equipment Maintenance Due',
    message: 'CNC Machine requires scheduled maintenance',
    type: 'warning',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Task Completed',
    message: 'Safety inspection has been completed by John Doe',
    type: 'success',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 3,
    title: 'New Team Member',
    message: 'Jane Smith has joined the workshop team',
    type: 'info',
    time: '1 day ago',
    read: true,
  },
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with workshop activities and alerts
          </p>
        </div>
        <button className="btn-secondary">
          Mark All as Read
        </button>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${
              notification.read ? 'bg-white' : 'bg-brand-50'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {notification.type === 'warning' && (
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                )}
                {notification.type === 'success' && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
                {notification.type === 'info' && (
                  <Info className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}