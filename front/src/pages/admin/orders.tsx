import React from 'react';
import isAuth from '@/components/UI/protectedRoute/protectedRoute';

const Orders = () => {
  return <div>Orders</div>;
};

export default isAuth(Orders);
