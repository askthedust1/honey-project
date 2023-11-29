import React from 'react';
import isAuth from '@/components/UI/protectedRoute/ProtectedRoute';

const ProductsAdminPage = () => {
  return <div>Admin Prod</div>;
};

export default isAuth(ProductsAdminPage);
