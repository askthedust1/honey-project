import React from 'react';
import cls from '../../../styles/_header.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const AnonymousNav = () => {
  const { t } = useTranslation('header');
  return (
    <li className={cls.menu_item}>
      <span className={cls.user_icon}></span>
      <Link href={'/accounts'}>{t('login')}</Link>
    </li>
  );
};

export default AnonymousNav;
