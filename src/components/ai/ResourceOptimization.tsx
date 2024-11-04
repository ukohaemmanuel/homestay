import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Brain, Users, Tool, Clock } from 'lucide-react';
import { aiApi } from '../../lib/api/ai';

export default function ResourceOptimization() {
  const { data: optimization } = useQuery({
    queryKey: ['resource-optimization'],
    queryFn: aiApi.getResourceOptimization,
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Brain className="h-6 w-6 text-purple-500 mr-2" />
        <h3 className="text-lg font-medium">AI Resource Optimization</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Team Allocation */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <h4 className="font-medium">Team Allocation</h4>
          </div>
          {optimization?.teamAllocation.map((item) => (
            <div 
              key={item.id}
              className="mt-2 flex justify-between items-center"
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium">{item.optimizedLoad}%</span>
            </div>
          ))}
        </div>

        {/* Equipment Usage */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Tool className="h-5 w-5 text-green-500 mr-2" />
            <h4 className="font-medium">Equipment Utilization</h4>
          </div>
          {optimization?.equipmentUsage.map((item) => (
            <div 
              key={item.id}
              className="mt-2 flex justify-between items-center"
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium">{item.optimizedUsage}%</span>
            </div>
          ))}
        </div>

        {/* Time Management */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="font-medium">Time Optimization</h4>
          </div>
          {optimization?.timeManagement.map((item) => (
            <div 
              key={item.id}
              className="mt-2 flex justify-between items-center"
            >
              <span className="text-sm text-gray-600">{item.task}</span>
              <span className="text-sm font-medium">{item.optimizedDuration}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-3">Recommendations</h4>
        <div className="space-y-2">
          {optimization?.recommendations.map((rec) => (
            <div 
              key={rec.id}
              className="p-3 bg-brand-50 rounded-lg"
            >
              <p className="text-sm text-brand-700">{rec.suggestion}</p>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-brand-600">Impact: {rec.impact}</span>
                <span className="text-brand-600">Effort: {rec.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}