import React from 'react';
import { User, Clock } from 'lucide-react';
import { format } from 'date-fns';

const activities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'completed',
    task: 'Equipment Maintenance',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'started',
    task: 'Safety Inspection',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'updated',
    task: 'Inventory Check',
    time: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
];

export function TeamActivity() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Team Activity</h2>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, idx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {idx !== activities.length - 1 && (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center ring-8 ring-white">
                        <User className="h-5 w-5 text-brand-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">
                            {activity.user}
                          </span>{' '}
                          <span className="text-gray-500">{activity.action}</span>{' '}
                          <span className="font-medium text-gray-900">
                            {activity.task}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(activity.time, 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}