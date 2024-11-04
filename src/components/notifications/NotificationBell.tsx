import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

export function NotificationBell() {
  const { unreadCount } = useNotifications();

  return (
    <div className="relative">
      <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
        <Bell className="h-6 w-6" />
      </button>
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
          {unreadCount}
        </span>
      )}
    </div>
  );
}