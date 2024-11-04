import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { adminApi } from '../../lib/api/admin';

interface Insight {
  id: string;
  type: 'performance' | 'anomaly' | 'recommendation' | 'trend';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  metrics?: {
    label: string;
    value: number;
    change: number;
  }[];
}

export default function AIInsights() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: adminApi.getAIInsights,
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <TrendingUp className="h-6 w-6 text-blue-500" />;
      case 'anomaly':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'recommendation':
        return <Brain className="h-6 w-6 text-purple-500" />;
      case 'trend':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered analysis and recommendations for your workshop system
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-500">Analyzing system data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {insights?.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getInsightIcon(insight.type)}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {insight.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                    insight.severity
                  )}`}
                >
                  {insight.severity}
                </span>
              </div>

              {insight.metrics && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {insight.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <div className="mt-1 flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </p>
                        <p
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            metric.change > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {metric.change > 0 ? '+' : ''}
                          {metric.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 text-right">
                <span className="text-sm text-gray-500">
                  {new Date(insight.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}