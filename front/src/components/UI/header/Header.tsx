import React from 'react';
import Link from 'next/link';
import cls from './header.module.scss';
import logo from '@/assets/images/logo.svg';

const Header = () => {
    return (
        <header className={cls.header}>
            <Link href={'/'}>
                <img src={logo.src} alt={'Aman Kyrgyz Honey logo'} className={cls.logo}/>
            </Link>
            <div className={cls.rightSection}>
                <nav>
                    <ul className={cls.menu}>
                        <li className={cls.menu_item}>
                            <Link href={'/'}>Главная</Link>
                        </li>
                        <li className={cls.menu_item}>
                            <Link href={'/products'}>Продукты</Link>
                        </li>
                        <li className={cls.menu_item}>
                            <Link href={'/about'}>О нас</Link>
                        </li>
                        <li className={cls.menu_item}>
                            <Link href={'/delivery'}>Доставка</Link>
                        </li>
                        <li className={cls.menu_item}>
                            <Link href={'/contacts'}>Контакты</Link>
                        </li>

                    </ul>
                </nav>
                <div className={cls.contact}>
                    <a href="tel:+99655555555">+996 555 55 55 55</a>
                </div>
                <Link href={'/basket'} className={cls.basket}><span className={cls.basket_item}>0</span></Link>
            </div>

        </header>
    );
};

export default Header;



