import React from 'react';
import isAuth from '@/components/UI/protectedRoute/protectedRoute';

const AdminMainPage = () => {
  return (
    <div>
      <h1>Admin main Page</h1>
    </div>
  );
};

export default isAuth(AdminMainPage);
