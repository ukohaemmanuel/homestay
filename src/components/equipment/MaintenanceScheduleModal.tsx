import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEquipmentItem, useUpdateEquipment } from '../../lib/queries/equipment';

interface MaintenanceScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId: string | null;
}

interface MaintenanceFormData {
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
}

export default function MaintenanceScheduleModal({
  isOpen,
  onClose,
  equipmentId,
}: MaintenanceScheduleModalProps) {
  const { data: equipment } = useEquipmentItem(equipmentId || '');
  const updateEquipment = useUpdateEquipment();
  const { register, handleSubmit, reset } = useForm<MaintenanceFormData>();

  React.useEffect(() => {
    if (equipment) {
      reset({
        lastMaintenanceDate: equipment.lastMaintenanceDate,
        nextMaintenanceDate: equipment.nextMaintenanceDate,
      });
    }
  }, [equipment, reset]);

  if (!isOpen || !equipment) return null;

  const onSubmit = async (data: MaintenanceFormData) => {
    await updateEquipment.mutateAsync({
      id: equipment.id,
      ...data,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Schedule Maintenance - {equipment.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="lastMaintenanceDate" className="label">
                Last Maintenance Date
              </label>
              <input
                type="date"
                id="lastMaintenanceDate"
                {...register('lastMaintenanceDate')}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="nextMaintenanceDate" className="label">
                Next Maintenance Date
              </label>
              <input
                type="date"
                id="nextMaintenanceDate"
                {...register('nextMaintenanceDate')}
                className="input"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                disabled={updateEquipment.isPending}
              >
                {updateEquipment.isPending ? 'Updating...' : 'Update Schedule'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}