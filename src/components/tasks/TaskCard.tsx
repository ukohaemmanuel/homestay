import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { format } from 'date-fns';
import { useUpdateTask } from '../../lib/queries/tasks';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const updateTask = useUpdateTask();

  const getStatusIcon = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case TaskStatus.IN_PROGRESS:
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case TaskPriority.HIGH:
        return 'bg-red-100 text-red-800';
      case TaskPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800';
      case TaskPriority.LOW:
        return 'bg-green-100 text-green-800';
    }
  };

  const handleStatusChange = async (status: TaskStatus) => {
    await updateTask.mutateAsync({
      id: task.id,
      status,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-900">{task.title}</span>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor()}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Due Date</span>
          <span className="text-gray-900">
            {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            className="text-sm border-none p-0 pr-6 bg-transparent font-medium text-gray-900 focus:ring-0"
          >
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}