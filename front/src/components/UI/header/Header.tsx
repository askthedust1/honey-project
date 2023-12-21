'use static';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cls from '../../../styles/_header.module.scss';
import logo from '@/assets/images/logo.svg';
import LanguageSwitcher from '@/components/UI/langSwitcher/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/users/usersSlice';
import UserNav from '@/components/UI/header/UserNav';
import AnonymousNav from '@/components/UI/header/AnonymousNav';
import { selectCart } from '@/features/cart/cartSlice';
import Image from 'next/image';

const Header = () => {
  const user = useAppSelector(selectUser);
  const [isShowNav, setIsShowNav] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { t } = useTranslation('header');
  const cart = useAppSelector(selectCart);
  const [isClient, setIsClient] = useState(false);

  const toggleNav = () => setIsShowNav(!isShowNav);

  return (
    <header style={{ position: 'sticky', top: '-1px', zIndex: '100' }}>
      <div className={cls.header}>
        <Link href={'/'}>
          <Image
            src={logo.src}
            alt={'Aman Kyrgyz Honey logo'}
            width={124}
            height={46}
            className={cls.logo}
          />
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
              {user ? <UserNav /> : <AnonymousNav />}
              <li className={cls.menu_item}>
                <Link href={'/cart'} className={cls.basket}>
                  {t('cart')}
                  {typeof window !== 'undefined' && cart && isClient ? (
                    <span className={cls.basket_item}>
                      {cart.reduce((total, item) => total + item.amount, 0)}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
          <div className={cls.cartBlock}>
            <div className={cls.menu_item}>
              <Link href={'/cart'} className={cls.basket}>
                {typeof window !== 'undefined' && cart && isClient ? (
                  <span className={cls.basket_item}>
                    {cart.reduce((total, item) => total + item.amount, 0)}
                  </span>
                ) : (
                  <span></span>
                )}
              </Link>
            </div>
          </div>
          <div className={cls.multilingualOne}>
            <LanguageSwitcher />
          </div>
          <div className={cls.contact}>
            <a href="tel:+99655555555">+996 555 555 555</a>
          </div>
        </div>
      </div>
      <div className={`${cls.hamburger_menu} ${isShowNav ? cls.hamburger_menu_show : ''}`}>
        <button onClick={toggleNav} type={'button'} className={cls.menu__btn}>
          <span></span>
        </button>
        <ul className={cls.menu__box}>
          <li className={cls.multilingualTwo}>
            <LanguageSwitcher />
          </li>
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
