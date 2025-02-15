import { Toaster } from '@/components/Toaster';
import React from 'react';
import { Outlet } from 'react-router';

const DefaultLayout: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default DefaultLayout;
