import React from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Calendar, History } from 'lucide-react';
import { Equipment, EquipmentStatus } from '../../types';
import { format } from 'date-fns';
import { useUpdateEquipment } from '../../lib/queries/equipment';

interface EquipmentCardProps {
  equipment: Equipment;
  onScheduleMaintenance: () => void;
}

export default function EquipmentCard({ equipment, onScheduleMaintenance }: EquipmentCardProps) {
  const updateEquipment = useUpdateEquipment();

  const getStatusIcon = () => {
    switch (equipment.status) {
      case EquipmentStatus.OPERATIONAL:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case EquipmentStatus.MAINTENANCE:
        return <Wrench className="h-5 w-5 text-yellow-500" />;
      case EquipmentStatus.OUT_OF_SERVICE:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <History className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (equipment.status) {
      case EquipmentStatus.OPERATIONAL:
        return 'bg-green-100 text-green-800';
      case EquipmentStatus.MAINTENANCE:
        return 'bg-yellow-100 text-yellow-800';
      case EquipmentStatus.OUT_OF_SERVICE:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleStatusChange = async (status: EquipmentStatus) => {
    await updateEquipment.mutateAsync({
      id: equipment.id,
      status,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-900">{equipment.name}</span>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
        >
          {equipment.status.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Model</span>
          <span className="text-gray-900">{equipment.model}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Serial Number</span>
          <span className="text-gray-900">{equipment.serialNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Last Maintenance</span>
          <span className="text-gray-900">
            {format(new Date(equipment.lastMaintenanceDate), 'MMM d, yyyy')}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Next Maintenance</span>
          <span className="text-gray-900">
            {format(new Date(equipment.nextMaintenanceDate), 'MMM d, yyyy')}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <select
            value={equipment.status}
            onChange={(e) => handleStatusChange(e.target.value as EquipmentStatus)}
            className="text-sm border-none p-0 pr-6 bg-transparent font-medium text-gray-900 focus:ring-0"
          >
            {Object.values(EquipmentStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={onScheduleMaintenance}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-600 bg-brand-50 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </button>
      </div>
    </div>
  );
}