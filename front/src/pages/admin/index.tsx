import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import AdminMain from '@/components/admin/mainPage/AdminMain';
import Head from 'next/head';

const AdminMainPage: MyPage = () => {
  return (
    <ProtectedRoute>
      <Head>
        <title>Главная</title>
      </Head>
      <AdminMain />
    </ProtectedRoute>
  );
};

AdminMainPage.Layout = 'Admin';

export default AdminMainPage;
