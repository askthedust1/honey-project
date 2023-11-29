import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectRole, selectRoleLoading } from '@/features/users/usersSlice';
import NotFound404 from '../notFound404/NotFound404';
import { roleCheck } from '@/features/users/usersThunk';

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const loading = useAppSelector(selectRoleLoading);

  useEffect(() => {
    dispatch(roleCheck());
  }, [dispatch]);

  useEffect(() => {
    if (role && role.userCheck !== null && !loading) {
      if (!role.userCheck) {
        void router.push('/accounts');
      }
    }
  }, [loading, role, role?.userCheck, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role.userCheck) {
    return <NotFound404 />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
