import React, { ReactNode } from 'react';
import SidebarAdmin from '@/pages/admin/components/sidebarAdmin/SidebarAdmin';

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SidebarAdmin />
      {children}
    </div>
  );
};
export default AdminLayout;
