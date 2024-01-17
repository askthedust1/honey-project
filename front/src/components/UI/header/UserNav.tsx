import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hook';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logout } from '@/features/users/usersThunk';
import cls from '../../../styles/_header.module.scss';

interface UserNavProps {
  toggleNav?: () => void;
}

const UserNav: React.FC<UserNavProps> = ({ toggleNav }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    if (toggleNav) {
      toggleNav();
    }
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
                <Link onClick={toggleNav} href="/orders/history">
                  {t('orderHistory')}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </>
  );
};

export default UserNav;
