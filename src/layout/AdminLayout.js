import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../components/admin/SideNavbar';
import TopNavbar from '../components/admin/TopNavbar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex flex-col flex-grow ml-64">
        <TopNavbar />
        <main className="flex-grow p-4 mt-16 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
