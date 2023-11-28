import React from 'react';
import isAuth from '@/components/UI/protectedRoute/protectedRoute';

const ProductsAdminPage = () => {
  return <div>Admin Prod</div>;
};

export default isAuth(ProductsAdminPage);
