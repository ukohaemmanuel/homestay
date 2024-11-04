import React from 'react';
import { Mail, Phone, Calendar, UserCog } from 'lucide-react';
import { User, UserRole } from '../../types';
import { format } from 'date-fns';
import { useUpdateTeamMember } from '../../lib/queries/team';

interface TeamMemberCardProps {
  member: User;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const updateMember = useUpdateTeamMember();

  const getRoleColor = () => {
    switch (member.role) {
      case UserRole.SYSTEM_ADMIN:
        return 'bg-purple-100 text-purple-800';
      case UserRole.ORGANIZATION_OWNER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.WORKSHOP_MANAGER:
        return 'bg-green-100 text-green-800';
      case UserRole.TECHNICIAN:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRoleChange = async (role: UserRole) => {
    await updateMember.mutateAsync({
      id: member.id,
      role,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
            <span className="text-lg font-medium text-brand-600">
              {member.name[0]}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor()}`}
            >
              {member.role.replace('_', ' ')}
            </span>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-500">
          <UserCog className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">{member.email}</span>
        </div>

        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">
            Joined {format(new Date(member.createdAt), 'MMM d, yyyy')}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={member.role}
            onChange={(e) => handleRoleChange(e.target.value as UserRole)}
            className="input text-sm"
          >
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}