'use static';
import React, { useState } from 'react';
import Link from 'next/link';
import cls from '../../../styles/_header.module.scss';
import logo from '@/assets/images/logo.svg';
import LanguageSwitcher from '@/components/UI/langSwitcher/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/users/usersSlice';
import UserNav from '@/components/UI/header/UserNav';
import AnonymousNav from '@/components/UI/header/AnonymousNav';
import Cart from '@/components/CartItem/Cart';
import { selectCart } from '@/features/cart/cartSlice';

const Header = () => {
  const user = useAppSelector(selectUser);
  const [isShowNav, setIsShowNav] = useState<boolean>(false);
  const { t } = useTranslation('header');
  const cart = useAppSelector(selectCart);
  const toggleNav = () => setIsShowNav(!isShowNav);

  return (
    <header style={{ position: 'sticky', top: '0', zIndex: '100' }}>
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
          <Link href={'/cart'} className={cls.basket}>
            <span className={cls.basket_item}>{<Cart />}</span>
            {/*<Cart />*/}
          </Link>
        </div>
      </div>
      <div className={`${cls.hamburger_menu} ${isShowNav ? cls.hamburger_menu_show : ''}`}>
        <button onClick={toggleNav} type={'button'} className={cls.menu__btn}>
          <span></span>
        </button>
        <ul className={cls.menu__box}>
          <li>
            <Link onClick={toggleNav} className={cls.menu__item} href={'/'}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link onClick={toggleNav} className={cls.menu__item} href={'/products/page/1'}>
              {t('products')}
            </Link>
          </li>
          <li>
            <Link onClick={toggleNav} className={cls.menu__item} href={'/about'}>
              {t('about')}
            </Link>
          </li>
          <li>
            <Link onClick={toggleNav} className={cls.menu__item} href={'/delivery'}>
              {t('delivery')}
            </Link>
          </li>
          <li>
            <Link onClick={toggleNav} className={cls.menu__item} href={'/contacts'}>
              {t('contacts')}
            </Link>
          </li>
          {user ? <UserNav /> : <AnonymousNav />}
          <li className={cls.multilingualTwo}>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
