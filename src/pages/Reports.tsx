import React from 'react';
import { BarChart, Download, Filter, Calendar } from 'lucide-react';

const reports = [
  {
    id: 1,
    name: 'Monthly Task Completion Report',
    description: 'Overview of completed tasks and performance metrics',
    type: 'Performance',
    lastGenerated: '2024-03-15',
  },
  {
    id: 2,
    name: 'Equipment Maintenance Log',
    description: 'Detailed maintenance history and upcoming schedules',
    type: 'Maintenance',
    lastGenerated: '2024-03-14',
  },
  {
    id: 3,
    name: 'Team Productivity Analysis',
    description: 'Individual and team performance statistics',
    type: 'Analytics',
    lastGenerated: '2024-03-13',
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and view workshop performance reports
          </p>
        </div>
        <button className="btn">
          <BarChart className="h-5 w-5 mr-2" />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                {report.type}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{report.description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Last generated: {report.lastGenerated}
            </div>
            <div className="mt-4 flex space-x-3">
              <button className="btn flex-1">
                <BarChart className="h-4 w-4 mr-2" />
                Generate
              </button>
              <button className="btn-secondary flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}