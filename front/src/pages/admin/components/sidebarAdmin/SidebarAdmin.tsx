import React, {useState} from 'react';
import Link from "next/link";
import logo from '@/assets/images/logo.svg';
import cls from '../../../../styles/_sideBarAdmin.module.scss';
import {useAppDispatch} from "@/store/hook";
import {logout} from "@/features/users/usersThunk";

const SidebarAdmin = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => dispatch(logout());
    const [isShowExit, setIsShowExit] = useState<boolean>(false);
    const [isShowProduct, setIsShowProduct] = useState<boolean>(false);
    const [isShowCategory, setIsShowCategory] = useState<boolean>(false);
    const toggleExit = () => setIsShowExit(!isShowExit);
    const toggleProduct = () => {
        setIsShowProduct(!isShowProduct);
        setIsShowCategory(false);
    };
    const toggleCategory = () => {
        setIsShowCategory(!isShowCategory);
        setIsShowProduct(false);
    };
    return (
        <div className={cls.sidebar}>

            <header className={cls.sidebar_header}>
                <Link className={cls.logo} href={'/'}><img src={logo.src} alt={'logo'}/></Link>
                <div className={cls.box}>
                    <span>Admin</span>
                    <button className={cls.exit} onClick={toggleExit}></button>
                    <div className={`${cls.confirm} ${isShowExit ? cls.confirm_show : ''}`}>
                        <button onClick={handleLogout}>Выйти</button>
                        <button onClick={toggleExit}>Остаться</button>
                    </div>
                </div>
            </header>
            <nav>
                <ul className={cls.list}>
                    <li className={cls.main}>
                        <Link className={cls.list_link} href={'/'}>Главная панель</Link>
                    </li>
                    <li className={`${cls.product} ${isShowProduct ? cls.open : ''}`} onClick={toggleProduct}>
                        <span className={cls.list_link}>Управление продуктами</span>
                    </li>
                    <li className={`${cls.detail} ${isShowProduct ? cls.detail_show : ''}`}>
                        <span className={cls.list_link}>Все продукты</span>
                    </li>
                    <li className={`${cls.detail} ${isShowProduct ? cls.detail_show : ''}`}>
                        <span className={cls.list_link}>Новый продукт</span>
                    </li>
                    <li className={`${cls.category} ${isShowCategory ? cls.open : ''}`} onClick={toggleCategory}>
                        <span className={cls.list_link}>Управление категориями</span>
                    </li>
                    <li className={`${cls.detail} ${isShowCategory ? cls.detail_show : ''}`}>
                        <span className={cls.list_link}>Все категории</span>
                    </li>
                    <li className={`${cls.detail} ${isShowCategory ? cls.detail_show : ''}`}>
                        <span className={cls.list_link}>Новая категорию</span>
                    </li>
                    <li className={cls.banner}>
                        <Link className={cls.list_link} href={'/'}>Управление банером</Link>
                    </li>
                    <li className={cls.hit}>
                        <Link className={cls.list_link} href={'/'}>Управление хитами</Link>
                    </li>
                    <li className={cls.order}>
                        <Link className={cls.list_link} href={'/'}>Заказы</Link>
                    </li>
                    <li className={cls.client}>
                        <Link className={cls.list_link} href={'/'}>Клиенты</Link>
                    </li>
                    <li className={cls.analytics}>
                        <Link className={cls.list_link} href={'/'}>Аналитика</Link>
                    </li>
                    <li className={cls.report}>
                        <Link className={cls.list_link} href={'/'}>Отчетность</Link>
                    </li>
                </ul>
            </nav>
            
        </div>
    );
};

export default SidebarAdmin;
