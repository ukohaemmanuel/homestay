import React from 'react';
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

const equipment = [
  {
    id: 1,
    name: 'CNC Machine',
    status: 'Operational',
    lastMaintenance: '2024-03-15',
    nextMaintenance: '2024-04-15',
  },
  {
    id: 2,
    name: 'Welding Station',
    status: 'Maintenance Required',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-03-20',
  },
  {
    id: 3,
    name: 'Assembly Line',
    status: 'Operational',
    lastMaintenance: '2024-03-10',
    nextMaintenance: '2024-04-10',
  },
];

export function EquipmentStatus() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Equipment Status</h3>
          <button className="text-sm text-brand-600 hover:text-brand-700">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Wrench className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Next maintenance: {item.nextMaintenance}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.status === 'Operational' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    item.status === 'Operational'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}