import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TenantPlan, CreateTenantInput } from '../../types/admin';
import { useCreateTenant } from '../../lib/queries/admin';

const createTenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  plan: z.nativeEnum(TenantPlan),
  adminEmail: z.string().email('Invalid email address'),
  adminPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

interface CreateTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTenantModal({
  isOpen,
  onClose,
}: CreateTenantModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateTenantInput>();
  const createTenant = useCreateTenant();

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: CreateTenantInput) => {
    await createTenant.mutateAsync(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Add New Tenant</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">Company Name</label>
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
              <label htmlFor="plan" className="label">Plan</label>
              <select
                id="plan"
                {...register('plan')}
                className="input"
              >
                {Object.values(TenantPlan).map((plan) => (
                  <option key={plan} value={plan}>
                    {plan.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="adminEmail" className="label">Admin Email</label>
              <input
                type="email"
                id="adminEmail"
                {...register('adminEmail')}
                className="input"
              />
              {errors.adminEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.adminEmail.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="adminPassword" className="label">Admin Password</label>
              <input
                type="password"
                id="adminPassword"
                {...register('adminPassword')}
                className="input"
              />
              {errors.adminPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.adminPassword.message}</p>
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
                disabled={createTenant.isPending}
              >
                {createTenant.isPending ? 'Creating...' : 'Create Tenant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}