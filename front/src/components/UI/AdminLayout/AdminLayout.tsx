import React, { ReactNode } from 'react';
import SidebarAdmin from '@/pages/admin/components/sidebarAdmin/SidebarAdmin';
import cls from '../../../styles/_adminProducts.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={cls.mainAdminLayout}>
      <SidebarAdmin />
      {children}
    </div>
  );
};
export default AdminLayout;
