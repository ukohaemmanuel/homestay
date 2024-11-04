import React from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { useTasks, useCreateTask } from '../lib/queries/tasks';
import { TaskStatus, TaskPriority } from '../types';
import TaskCard from '../components/tasks/TaskCard';
import CreateTaskModal from '../components/tasks/CreateTaskModal';

export default function Tasks() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<TaskStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();

  const filteredTasks = React.useMemo(() => {
    if (!tasks) return [];
    return tasks
      .filter((task) => 
        filterStatus === 'ALL' || task.status === filterStatus)
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [tasks, filterStatus, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 input"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'ALL')}
            className="input !py-1.5"
          >
            <option value="ALL">All Status</option>
            {Object.values(TaskStatus).map((status) => (
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
          <p className="mt-4 text-gray-500">Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No tasks found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (data) => {
          await createTask.mutateAsync(data);
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}