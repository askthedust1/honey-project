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
        <div style={{flexGrow: '1', padding: '30px 35px'}}>
            {children}
        </div>
    </div>
  );
};
export default AdminLayout;
