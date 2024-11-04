import React from 'react';
import { Plus, Filter, Search, AlertTriangle } from 'lucide-react';
import { useEquipment } from '../lib/queries/equipment';
import { EquipmentStatus } from '../types';
import EquipmentCard from '../components/equipment/EquipmentCard';
import CreateEquipmentModal from '../components/equipment/CreateEquipmentModal';
import MaintenanceScheduleModal from '../components/equipment/MaintenanceScheduleModal';

export default function Equipment() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [maintenanceModalEquipment, setMaintenanceModalEquipment] = React.useState<string | null>(null);
  const [filterStatus, setFilterStatus] = React.useState<EquipmentStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: equipment, isLoading } = useEquipment();

  const filteredEquipment = React.useMemo(() => {
    if (!equipment) return [];
    return equipment
      .filter((item) => 
        filterStatus === 'ALL' || item.status === filterStatus)
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [equipment, filterStatus, searchQuery]);

  const maintenanceRequiredCount = React.useMemo(() => {
    if (!equipment) return 0;
    return equipment.filter((item) => item.status === EquipmentStatus.MAINTENANCE).length;
  }, [equipment]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipment</h1>
          {maintenanceRequiredCount > 0 && (
            <div className="mt-2 flex items-center text-yellow-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="text-sm">
                {maintenanceRequiredCount} {maintenanceRequiredCount === 1 ? 'item requires' : 'items require'} maintenance
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Equipment
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 input"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as EquipmentStatus | 'ALL')}
            className="input !py-1.5"
          >
            <option value="ALL">All Status</option>
            {Object.values(EquipmentStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading equipment...</p>
        </div>
      ) : filteredEquipment.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No equipment found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map((item) => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onScheduleMaintenance={() => setMaintenanceModalEquipment(item.id)}
            />
          ))}
        </div>
      )}

      <CreateEquipmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <MaintenanceScheduleModal
        isOpen={!!maintenanceModalEquipment}
        onClose={() => setMaintenanceModalEquipment(null)}
        equipmentId={maintenanceModalEquipment}
      />
    </div>
  );
}