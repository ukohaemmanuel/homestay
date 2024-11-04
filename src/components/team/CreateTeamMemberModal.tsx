import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserRole, CreateUserInput } from '../../types';
import { useCreateTeamMember } from '../../lib/queries/team';

const createTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.nativeEnum(UserRole),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface CreateTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTeamMemberModal({
  isOpen,
  onClose,
}: CreateTeamMemberModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUserInput>();
  const createMember = useCreateTeamMember();

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: CreateUserInput) => {
    await createMember.mutateAsync(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Add Team Member</h3>
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
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="input"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="label">Role</label>
              <select
                id="role"
                {...register('role')}
                className="input"
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="input"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
                disabled={createMember.isPending}
              >
                {createMember.isPending ? 'Adding...' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}