import React from 'react';
import Head from 'next/head';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import AdminMain from '@/components/admin/mainPage/AdminMain';
import { MyPage } from '@/components/common/types';

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
