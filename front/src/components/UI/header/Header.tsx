'use static';
import React from 'react';
import Link from 'next/link';
import cls from '../../../styles/_header.module.scss';
import logo from '@/assets/images/logo.svg';
import LanguageSwitcher from '@/components/UI/langSwitcher/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/users/usersSlice';
import UserNav from '@/components/UI/header/UserNav';
import AnonymousNav from '@/components/UI/header/AnonymousNav';

const Header = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation('header');
  return (
    <header>
      <div className={cls.header}>
        <Link href={'/'}>
          <img src={logo.src} alt={'Aman Kyrgyz Honey logo'} className={cls.logo} />
        </Link>
        <div className={cls.rightSection}>
          <nav className={cls.nav}>
            <ul className={cls.menu}>
              <li className={cls.menu_item}>
                <Link href={'/'}>{t('home')}</Link>
              </li>
              <li className={cls.menu_item}>
                <Link href={'/products/page/1'}>{t('products')}</Link>
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
              {user ? <UserNav /> : <AnonymousNav />}
            </ul>
          </nav>
          <div className={cls.multilingualOne}>
            <LanguageSwitcher />
          </div>
          <div className={cls.contact}>
            <a href="tel:+99655555555">+996 555 55 55 55</a>
          </div>
          <Link href={'/basket'} className={cls.basket}>
            <span className={cls.basket_item}>0</span>
          </Link>
        </div>
      </div>
      <div className={cls.hamburger_menu}>
        <input id={cls.menu__toggle} type="checkbox" />
        <label className={cls.menu__btn} htmlFor={cls.menu__toggle}>
          <span></span>
        </label>
        <ul className={cls.menu__box}>
          <li>
            <Link className={cls.menu__item} href={'/'}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link className={cls.menu__item} href={'/products/page/1'}>
              {t('products')}
            </Link>
          </li>
          <li>
            <Link className={cls.menu__item} href={'/about'}>
              {t('about')}
            </Link>
          </li>
          <li>
            <Link className={cls.menu__item} href={'/delivery'}>
              {t('delivery')}
            </Link>
          </li>
          <li>
            <Link className={cls.menu__item} href={'/contacts'}>
              {t('contacts')}
            </Link>
          </li>
          {/*<li className={cls.menu__item}>{user ? <UserNav /> : <AnonymousNav />}</li>*/}
          <li className={cls.multilingualTwo}>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
