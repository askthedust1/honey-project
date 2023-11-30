import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';

const BestsellerAdminPage: MyPage = () => {
  return (
    <ProtectedRoute>
      <div>Bestseller</div>
    </ProtectedRoute>
  );
};

BestsellerAdminPage.Layout = 'Admin';

export default BestsellerAdminPage;
