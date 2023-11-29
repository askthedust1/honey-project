import React from 'react';
import isAuth from '@/components/UI/protectedRoute/ProtectedRoute';

const Orders = () => {
  return <div>Orders</div>;
};

export default isAuth(Orders);
