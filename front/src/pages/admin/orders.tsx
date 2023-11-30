import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';

const Orders: MyPage = () => {
  return (
    <ProtectedRoute>
      <div>Orders</div>
    </ProtectedRoute>
  );
};

Orders.Layout = 'Admin';

export default Orders;
