import React from 'react';
import { Filter, Search } from 'lucide-react';
import { TaskStatus, TaskPriority } from '../../types';

interface TaskFilterProps {
  onFilterChange: (filters: TaskFilters) => void;
}

export interface TaskFilters {
  status: TaskStatus | 'ALL';
  priority: TaskPriority | 'ALL';
  search: string;
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [filters, setFilters] = React.useState<TaskFilters>({
    status: 'ALL',
    priority: 'ALL',
    search: '',
  });

  const handleChange = (key: keyof TaskFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex space-x-4 items-center">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="pl-10 input"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="input !py-1.5"
        >
          <option value="ALL">All Status</option>
          {Object.values(TaskStatus).map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="input !py-1.5"
        >
          <option value="ALL">All Priority</option>
          {Object.values(TaskPriority).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}