import React from 'react';
import isAuth from '@/components/UI/protectedRoute/ProtectedRoute';

const CategoriesAdminPage = () => {
  return <div>Categories</div>;
};

export default isAuth(CategoriesAdminPage);
