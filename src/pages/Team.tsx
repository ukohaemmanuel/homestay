import React from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useTeamMembers } from '../lib/queries/team';
import { UserRole } from '../types';
import TeamMemberCard from '../components/team/TeamMemberCard';
import CreateTeamMemberModal from '../components/team/CreateTeamMemberModal';

export default function Team() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [filterRole, setFilterRole] = React.useState<UserRole | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: teamMembers, isLoading } = useTeamMembers();

  const filteredMembers = React.useMemo(() => {
    if (!teamMembers) return [];
    return teamMembers
      .filter((member) => 
        filterRole === 'ALL' || member.role === filterRole)
      .filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [teamMembers, filterRole, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your workshop team members and their roles
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Team Member
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 input"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | 'ALL')}
            className="input !py-1.5"
          >
            <option value="ALL">All Roles</option>
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading team members...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No team members found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}

      <CreateTeamMemberModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}