import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Equipment Maintenance - Machine A',
    priority: 'High',
    status: 'In Progress',
    assignee: 'John Doe',
    dueDate: '2024-03-20',
  },
  {
    id: 2,
    title: 'Safety Inspection',
    priority: 'Medium',
    status: 'Pending',
    assignee: 'Jane Smith',
    dueDate: '2024-03-22',
  },
  {
    id: 3,
    title: 'Inventory Check',
    priority: 'Low',
    status: 'Completed',
    assignee: 'Mike Johnson',
    dueDate: '2024-03-19',
  },
];

export function TaskList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
          <button className="text-sm text-brand-600 hover:text-brand-700">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {task.status === 'Completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : task.status === 'In Progress' ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Assigned to {task.assignee}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      task.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                >
                  {task.priority}
                </span>
                <span className="text-sm text-gray-500">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}