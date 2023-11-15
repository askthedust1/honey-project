'use static';
import React from 'react';
import Link from 'next/link';
import cls from './header.module.scss';
import logo from '@/assets/images/logo.svg';
import LanguageSwitcher from '@/components/UI/langSwitcher/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hook';
import {selectUser} from "@/features/users/usersSlice";
import UserNav from "@/components/UI/header/UserNav";
import AnonymousNav from "@/components/UI/header/AnonymousNav";

const Header = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation('header');
  return (
    <header className={cls.header}>
      <Link href={'/'}>
        <img src={logo.src} alt={'Aman Kyrgyz Honey logo'} className={cls.logo} />
      </Link>
      <div className={cls.rightSection}>
        <nav>
          <ul className={cls.menu}>
            <li className={cls.menu_item}>
              <Link href={'/'}>{t('home')}</Link>
            </li>
            <li className={cls.menu_item}>
              <Link href={'/products'}>{t('products')}</Link>
            </li>
            <li className={cls.menu_item}>
              <Link href={'/about'}>{t('about')}</Link>
            </li>
            <li className={cls.menu_item}>
              <Link href={'/delivery'}>{t('delivery')}</Link>
            </li>
            <li className={cls.menu_item}>
              <Link href={'/contacts'}>{t('contacts')}</Link>
            </li>
            {
              user ? <UserNav/> : <AnonymousNav/>
            }
          </ul>
        </nav>
        <LanguageSwitcher />
        <div className={cls.contact}>
          <a href="tel:+99655555555">+996 555 55 55 55</a>
        </div>
        <Link href={'/basket'} className={cls.basket}>
          <span className={cls.basket_item}>0</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
