import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import cls from '../../../styles/_header.module.scss';

interface AnonymousNavProps {
  toggleNav?: () => void;
}

const AnonymousNav: React.FC<AnonymousNavProps> = ({ toggleNav }) => {
  const { t } = useTranslation('header');
  return (
    <li id={'accLog'} className={cls.menu_item}>
      <span className={cls.user_icon}></span>
      <Link onClick={toggleNav} href={'/accounts'}>
        {t('login')}
      </Link>
    </li>
  );
};

export default AnonymousNav;
