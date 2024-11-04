import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Tool } from 'lucide-react';
import { customerApi } from '../../lib/api/customer';
import { format } from 'date-fns';

export function MaintenanceSchedule() {
  const { data: schedule } = useQuery({
    queryKey: ['maintenance-schedule'],
    queryFn: customerApi.getMaintenanceSchedule,
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Upcoming Maintenance
          </h2>
          <button className="text-sm text-brand-600 hover:text-brand-700">
            Schedule
          </button>
        </div>

        <div className="space-y-4">
          {schedule?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Tool className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.equipment}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.maintenanceType}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {format(new Date(item.scheduledDate), 'MMM d, yyyy')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}