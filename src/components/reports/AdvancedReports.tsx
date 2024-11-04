import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Download, Filter } from 'lucide-react';

interface AdvancedReportsProps {
  data: any;
  filters: {
    dateRange: [Date, Date];
    categories: string[];
    metrics: string[];
  };
  onFilterChange: (filters: any) => void;
  onExport: (format: 'pdf' | 'csv' | 'excel') => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdvancedReports({
  data,
  filters,
  onFilterChange,
  onExport,
}: AdvancedReportsProps) {
  const { t } = useTranslation();
  const [activeChart, setActiveChart] = React.useState<'bar' | 'line' | 'pie'>('bar');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">{t('reports.advanced')}</h2>
          <p className="text-sm text-gray-500">{t('reports.advancedDescription')}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onExport('pdf')}
            className="btn-secondary"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>
          <button
            onClick={() => onExport('csv')}
            className="btn-secondary"
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </button>
          <button
            onClick={() => onExport('excel')}
            className="btn-secondary"
          >
            <Download className="h-4 w-4 mr-2" />
            Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex space-x-4">
            <select
              value={activeChart}
              onChange={(e) => setActiveChart(e.target.value as any)}
              className="input"
            >
              <option value="bar">{t('reports.barChart')}</option>
              <option value="line">{t('reports.lineChart')}</option>
              <option value="pie">{t('reports.pieChart')}</option>
            </select>
            {/* Add more filters as needed */}
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            ) : activeChart === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#0088FE" />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}