import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export default function TopBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex flex-1">
            <div className="flex w-full md:ml-0">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block h-full w-full border-transparent py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
              <Bell className="h-6 w-6" />
            </button>
            <button className="ml-3 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
              <Settings className="h-6 w-6" />
            </button>
            <div className="ml-3 flex items-center">
              <div className="relative">
                <div className="flex items-center">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {user?.name.charAt(0)}
                    </span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}