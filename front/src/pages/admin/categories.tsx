import React from 'react';
import isAuth from '@/components/UI/protectedRoute/protectedRoute';

const CategoriesAdminPage = () => {
  return <div>Categories</div>;
};

export default isAuth(CategoriesAdminPage);
