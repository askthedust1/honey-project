import React from 'react';
import isAuth from '@/components/UI/protectedRoute/protectedRoute';

const BestsellerAdminPage = () => {
  return <div>Bestseller</div>;
};

export default isAuth(BestsellerAdminPage);
