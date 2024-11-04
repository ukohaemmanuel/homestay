import React from 'react';
import { Wrench, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  technician: string;
  notes: string;
}

interface MaintenanceHistoryProps {
  records: MaintenanceRecord[];
}

export default function MaintenanceHistory({ records }: MaintenanceHistoryProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Maintenance History
        </h3>

        <div className="flow-root">
          <ul className="-mb-8">
            {records.map((record, recordIdx) => (
              <li key={record.id}>
                <div className="relative pb-8">
                  {recordIdx !== records.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center ring-8 ring-white">
                        <Wrench className="h-5 w-5 text-brand-600" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {record.type} by{' '}
                          <span className="font-medium text-gray-900">
                            {record.technician}
                          </span>
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {record.notes}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(record.date), 'MMM d, yyyy')}
                        </div>
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