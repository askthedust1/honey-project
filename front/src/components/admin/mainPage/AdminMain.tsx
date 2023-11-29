import React from 'react';
import cls from '../../../styles/_adminMainPage.module.scss';

const AdminMain = () => {
    return (
        <div className={cls.main}>
            <h3 className={cls.main_title}>Главная панель</h3>
            <ul className={cls.list}>
                <li className={cls.user}>
                    <span className={cls.list_number}>0</span>
                    <span className={cls.list_description}>пользователей</span>
                </li>
                <li className={cls.product}>
                    <span className={cls.list_number}>0</span>
                    <span className={cls.list_description}>продуктов</span>
                </li>
                <li className={cls.category}>
                    <span className={cls.list_number}>0</span>
                    <span className={cls.list_description}>категорий</span>
                </li>
                <li className={cls.order}>
                    <span className={cls.list_number}>0</span>
                    <span className={cls.list_description}>заказов</span>
                </li>
                <li className={cls.sum}>
                    <span className={cls.list_number}>0</span>
                    <span className={cls.list_description}>общая сумма</span>
                </li>
            </ul>
        </div>
    );
};

export default AdminMain;
