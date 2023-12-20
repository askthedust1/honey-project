import React, { useState } from 'react';
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

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <li className={cls.menu_item} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
        <span className={cls.user_icon}></span>
        {showDropdown && (
          <div className={cls.dropdown}>
            <ul className={cls.dropdown_content}>
              <li onClick={handleLogout}>{t('logout')}</li>
              <li>
                <a href="/order-history">{t('orderHistory')}</a>
              </li>
            </ul>
          </div>
        )}
      </li>
    </>
  );
};

export default UserNav;
