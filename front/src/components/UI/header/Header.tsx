'use static';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hook';
import Link from 'next/link';
import Image from 'next/image';
import { selectUser } from '@/features/users/usersSlice';
import { selectCart } from '@/features/cart/cartSlice';
import { selectCategories } from '@/features/categories/categoriesSlice';
import UserNav from '@/components/UI/header/UserNav';
import LanguageSwitcher from '@/components/UI/langSwitcher/LanguageSwitcher';
import AnonymousNav from '@/components/UI/header/AnonymousNav';
import logo from '@/assets/images/logo.svg';
import cls from '../../../styles/_header.module.scss';

const Header = () => {
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const [isShowNav, setIsShowNav] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { t } = useTranslation('header');
  const cart = useAppSelector(selectCart);
  const [isClient, setIsClient] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleNav = () => setIsShowNav(!isShowNav);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header style={{ position: 'sticky', top: '-1px', zIndex: '100' }}>
      <div className={cls.header}>
        <Link href={'/'}>
          <Image
            src={logo.src}
            alt={'Aman Kyrgyz Honey logo'}
            priority
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
              <li
                className={cls.menu_item}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <Link href={'/products/page/1'}>{t('products')}</Link>
                {showDropdown && (
                  <div className={cls.dropdown}>
                    <ul className={cls.dropdown_content}>
                      {categories.map((item) => (
                        <li key={item._id}>
                          <Link
                            href={{
                              pathname: '/category/page/path',
                              query: { cId: item._id, cPage: '1' },
                            }}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
            <a href="tel:+996705888001">+996 705 888 001</a>
          </div>
        </div>
      </div>
      <div className={`${cls.hamburger_menu} ${isShowNav ? cls.hamburger_menu_show : ''}`}>
        <button onClick={toggleNav} type={'button'} className={cls.menu__btn}>
          <span></span>
        </button>
        <ul className={cls.menu__box}>
          <li className={cls.multilingualTwo}>
            <LanguageSwitcher toggleNav={toggleNav} />
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
          {user ? <UserNav toggleNav={toggleNav} /> : <AnonymousNav toggleNav={toggleNav} />}
        </ul>
      </div>
    </header>
  );
};

export default Header;
