import React, { ReactNode } from 'react';
import SidebarAdmin from '@/components/UI/sidebarAdmin/SidebarAdmin';
import cls from '../../../styles/_adminProducts.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={cls.mainAdminLayout}>
      <SidebarAdmin />
      <div className={cls.mainAdminLayoutContainer}>{children}</div>
    </div>
  );
};
export default AdminLayout;
