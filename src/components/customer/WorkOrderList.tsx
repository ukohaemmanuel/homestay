import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { customerApi } from '../../lib/api/customer';
import { format } from 'date-fns';

export function WorkOrderList() {
  const { data: workOrders } = useQuery({
    queryKey: ['work-orders'],
    queryFn: customerApi.getWorkOrders,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Work Orders</h2>
          <button className="text-sm text-brand-600 hover:text-brand-700">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {workOrders?.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    #{order.id} • {order.technician}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">
                  {format(new Date(order.dueDate), 'MMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}