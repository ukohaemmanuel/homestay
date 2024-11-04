import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp } from 'lucide-react';
import { aiApi } from '../../lib/api/ai';

export default function WorkloadPrediction() {
  const { data: predictions } = useQuery({
    queryKey: ['workload-predictions'],
    queryFn: aiApi.getWorkloadPredictions,
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-purple-500 mr-2" />
          <h3 className="text-lg font-medium">Workload Forecast</h3>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <TrendingUp className="h-4 w-4 mr-1" />
          {predictions?.accuracy}% accuracy
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictions?.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#0284C7" 
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#7C3AED" 
              strokeDasharray="5 5" 
              name="Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {predictions?.insights.map((insight) => (
          <div 
            key={insight.id}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium text-gray-900">{insight.title}</h4>
            <p className="mt-1 text-sm text-gray-500">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}