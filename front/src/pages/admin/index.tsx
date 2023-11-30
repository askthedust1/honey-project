import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';

const AdminMainPage: MyPage = () => {
  return (
    <ProtectedRoute>
      <h1>Admin main Page</h1>
    </ProtectedRoute>
  );
};

AdminMainPage.Layout = 'Admin';

export default AdminMainPage;
