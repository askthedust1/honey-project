import React from 'react';
import isAuth from '@/components/UI/protectedRoute/protectedRoute';

const BannersAdminPage = () => {
  return <div>Banners</div>;
};

export default isAuth(BannersAdminPage);
