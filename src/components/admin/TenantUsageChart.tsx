import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { adminApi } from '../../lib/api/admin';

export function TenantUsageChart() {
  const { data: usageData } = useQuery({
    queryKey: ['tenant-usage'],
    queryFn: adminApi.getTenantUsage,
  });

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={usageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="storage" name="Storage (GB)" fill="#0284C7" />
          <Bar dataKey="users" name="Active Users" fill="#22C55E" />
          <Bar dataKey="tasks" name="Tasks" fill="#EAB308" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}