import React, { ReactNode } from 'react';
import SidebarAdmin from '@/components/UI/sidebarAdmin/SidebarAdmin';

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{display: 'flex'}}>
      <SidebarAdmin />
        <div style={{flexGrow: '1', padding: '30px 35px'}}>
            {children}
        </div>
    </div>
  );
};
export default AdminLayout;
