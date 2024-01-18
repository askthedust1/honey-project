import React from 'react';
import Head from 'next/head';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import NewTransactionsAdmin from '@/components/admin/newTransactions/NewTransactionsAdmin';

const NewOrders: MyPage = () => {
  return (
    <ProtectedRoute>
      <Head>
        <title>Новые заказы</title>
      </Head>
      <NewTransactionsAdmin />
    </ProtectedRoute>
  );
};

NewOrders.Layout = 'Admin';

export default NewOrders;
