import React from 'react';
import { Outlet } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Outlet />
      <BottomNav />
    </div>
  );
};
