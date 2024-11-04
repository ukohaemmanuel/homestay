import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Brain, AlertTriangle, Calendar } from 'lucide-react';
import { aiApi } from '../../lib/api/ai';

interface PredictiveMaintenanceProps {
  equipmentId: string;
}

export default function PredictiveMaintenance({ equipmentId }: PredictiveMaintenanceProps) {
  const { data: predictions } = useQuery({
    queryKey: ['predictive-maintenance', equipmentId],
    queryFn: () => aiApi.getPredictiveMaintenance(equipmentId),
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-purple-500 mr-2" />
          <h3 className="text-lg font-medium">AI Maintenance Predictions</h3>
        </div>
      </div>

      {predictions?.map((prediction) => (
        <div
          key={prediction.id}
          className="mt-4 p-4 border rounded-lg bg-gray-50"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{prediction.component}</h4>
              <p className="mt-1 text-sm text-gray-500">{prediction.analysis}</p>
            </div>
            <div className={`flex items-center ${
              prediction.urgency === 'high' 
                ? 'text-red-500' 
                : prediction.urgency === 'medium'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}>
              <AlertTriangle className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{prediction.urgency}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Recommended maintenance: {prediction.recommendedDate}
            </div>
            <span className="text-brand-600">
              {prediction.confidence}% confidence
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}