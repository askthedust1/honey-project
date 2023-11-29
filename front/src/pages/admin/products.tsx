import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';

const ProductsAdminPage: MyPage = () => {
  return (
    <ProtectedRoute>
      <div>Products</div>
    </ProtectedRoute>
  );
};

ProductsAdminPage.Layout = 'Admin';

export default ProductsAdminPage;
