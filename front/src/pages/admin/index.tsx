import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import AdminMain from "@/components/admin/mainPage/AdminMain";

const AdminMainPage: MyPage = () => {
  return (
    <ProtectedRoute>
        <AdminMain/>
    </ProtectedRoute>
  );
};

AdminMainPage.Layout = 'Admin';

export default AdminMainPage;
