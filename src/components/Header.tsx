import React from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Workshop Management</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.role}</span>
              </div>
              
              <button 
                onClick={() => logout()}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}