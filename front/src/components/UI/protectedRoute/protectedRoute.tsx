import { useEffect } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/users/usersSlice';
import { userRoles } from '@/constants';
import { useRouter } from 'next/router';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const user = useAppSelector(selectUser);
    let auth: boolean = user && user.role === userRoles.admin;

    useEffect(() => {
      if (!auth) {
        router.push('/accounts').catch((err) => {
          console.error('Error during redirection:', err);
        });
      }
    }, [auth, router]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
