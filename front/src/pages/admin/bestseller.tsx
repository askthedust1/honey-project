import React from 'react';
import isAuth from '@/components/UI/protectedRoute/ProtectedRoute';

const BestsellerAdminPage = () => {
  return <div>Bestseller</div>;
};

export default isAuth(BestsellerAdminPage);
