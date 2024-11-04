import React from 'react';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { User as UserType, UserRole } from '../../types';
import { format } from 'date-fns';
import { useUpdateTeamMember } from '../../lib/queries/team';

interface TeamMemberDetailsProps {
  member: UserType;
}

export default function TeamMemberDetails({ member }: TeamMemberDetailsProps) {
  const updateMember = useUpdateTeamMember();

  const handleRoleChange = async (role: UserRole) => {
    await updateMember.mutateAsync({
      id: member.id,
      role,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center">
            <User className="h-6 w-6 text-brand-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <Mail className="h-5 w-5 mr-2" />
              Email
            </dt>
            <dd className="ml-2 text-sm text-gray-900">{member.email}</dd>
          </div>

          <div className="flex items-center">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <Calendar className="h-5 w-5 mr-2" />
              Joined
            </dt>
            <dd className="ml-2 text-sm text-gray-900">
              {format(new Date(member.createdAt), 'MMM d, yyyy')}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <Shield className="h-5 w-5 mr-2" />
              Role
            </dt>
            <dd className="mt-1">
              <select
                value={member.role}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="input"
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}