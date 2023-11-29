import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';

const CategoriesAdminPage: MyPage = () => {
  return (
    <ProtectedRoute>
      <div>Categories</div>
    </ProtectedRoute>
  );
};

CategoriesAdminPage.Layout = 'Admin';

export default CategoriesAdminPage;
