import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EquipmentStatus, CreateEquipmentInput } from '../../types';
import { useCreateEquipment } from '../../lib/queries/equipment';

const createEquipmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  model: z.string().min(1, 'Model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  status: z.nativeEnum(EquipmentStatus),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
});

interface CreateEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEquipmentModal({
  isOpen,
  onClose,
}: CreateEquipmentModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateEquipmentInput>();
  const createEquipment = useCreateEquipment();

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: CreateEquipmentInput) => {
    await createEquipment.mutateAsync(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Add New Equipment</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">Name</label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="input"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="model" className="label">Model</label>
              <input
                type="text"
                id="model"
                {...register('model')}
                className="input"
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="serialNumber" className="label">Serial Number</label>
              <input
                type="text"
                id="serialNumber"
                {...register('serialNumber')}
                className="input"
              />
              {errors.serialNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.serialNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="label">Status</label>
              <select
                id="status"
                {...register('status')}
                className="input"
              >
                {Object.values(EquipmentStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="purchaseDate" className="label">Purchase Date</label>
              <input
                type="date"
                id="purchaseDate"
                {...register('purchaseDate')}
                className="input"
              />
              {errors.purchaseDate && (
                <p className="mt-1 text-sm text-red-600">{errors.purchaseDate.message}</p>
              )}
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
                disabled={createEquipment.isPending}
              >
                {createEquipment.isPending ? 'Adding...' : 'Add Equipment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}