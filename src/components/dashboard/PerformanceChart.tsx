import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', completed: 12, inProgress: 8, pending: 4 },
  { name: 'Week 2', completed: 15, inProgress: 6, pending: 3 },
  { name: 'Week 3', completed: 18, inProgress: 7, pending: 5 },
  { name: 'Week 4', completed: 14, inProgress: 9, pending: 2 },
];

export function PerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" />
          <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" name="In Progress" />
          <Bar dataKey="pending" stackId="a" fill="#EF4444" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}