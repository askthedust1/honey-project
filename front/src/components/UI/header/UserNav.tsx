import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/features/users/usersThunk';
import cls from '../../../styles/_header.module.scss';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const UserNav = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };
  const { t } = useTranslation('header');

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <li
        id={'user-drop'}
        className={cls.menu_item}
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <span className={cls.user_icon}></span>
        {showDropdown && (
          <div id={'dropdown'} className={cls.dropdown}>
            <ul className={cls.dropdown_content}>
              <li id={'user-logout'} onClick={handleLogout}>
                {t('logout')}
              </li>
              <li>
                <Link href="/orders/history">{t('orderHistory')}</Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </>
  );
};

export default UserNav;
