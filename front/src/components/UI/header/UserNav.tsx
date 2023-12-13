import React from 'react';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/features/users/usersThunk';
import cls from '../../../styles/_header.module.scss';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const UserNav = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };
  const { t } = useTranslation('header');

  return (
    <li onClick={handleLogout} className={cls.menu_item}>
      {t('logout')}
    </li>
  );
};

export default UserNav;
