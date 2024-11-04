import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Workshop Management System
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.name?.[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;