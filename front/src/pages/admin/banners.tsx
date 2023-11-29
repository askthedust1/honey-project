import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';

const BannersAdminPage: MyPage = () => {
  return (
    <ProtectedRoute>
      <div>Banners</div>
    </ProtectedRoute>
  );
};

BannersAdminPage.Layout = 'Admin';

export default BannersAdminPage;
