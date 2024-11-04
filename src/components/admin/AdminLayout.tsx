import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import TopBar from '../TopBar';

export default function AdminLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}