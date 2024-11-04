import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Wrench,
  Users,
  BarChart,
  FileText,
  Calendar,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/auth';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Equipment', href: '/equipment', icon: Wrench },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Support', href: '/support', icon: HelpCircle },
];

export default function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex w-64 flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Wrench className="h-8 w-8 text-brand-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Workshop
              </span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive
                          ? 'text-brand-600'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <button
              onClick={logout}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}