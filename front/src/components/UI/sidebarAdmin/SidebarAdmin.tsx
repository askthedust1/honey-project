import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
import { logout } from '@/features/users/usersThunk';
import { selectRole } from '@/features/users/usersSlice';
import { fetchAdminHewTransaction } from '@/features/adminNewMessages/adminNewTransactionThunk';
import { selectAdminNewTransactions } from '@/features/adminNewMessages/adminNewTransactionSlice';
import {
  changeCurrentPage,
  changeName,
  changePhone,
  resetCurrentStatus,
  resetTotalPages,
} from '@/features/orderAdmin/ordersAdminSlice';
import logo from '@/assets/images/logo.svg';
import cls from '../../../styles/_sideBarAdmin.module.scss';

const SidebarAdmin = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push('/');
    } catch {
      // nothing
    }
  };
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
  const newTransaction = useAppSelector(selectAdminNewTransactions);
  useEffect(() => {
    dispatch(fetchAdminHewTransaction());
  }, [dispatch]);
  useEffect(() => {
    setInterval(() => {
      dispatch(fetchAdminHewTransaction());
    }, 15000);
  }, [dispatch]);

  const onClick = async () => {
    console.log('click exit');
    dispatch(changeCurrentPage(1));
    dispatch(resetTotalPages());
    dispatch(resetCurrentStatus());
    dispatch(changeName(null));
    dispatch(changePhone(null));
  };

  return (
    <div style={{ display: role && role.userCheck ? 'block' : 'none' }} className={cls.sidebar}>
      <header className={cls.sidebar_header}>
        <Link className={cls.logo} href={'/'}>
          <Image src={logo.src} alt={'logo'} width={140} height={56} />
        </Link>
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
            <Link className={cls.list_link} href={'/admin'}>
              Главная панель
            </Link>
          </li>
          <li className={`${cls.product} ${isShowProduct ? cls.open : ''}`} onClick={toggleProduct}>
            <span className={cls.list_link}>Управление продуктами</span>
          </li>
          <li className={`${cls.detail} ${isShowProduct ? cls.detail_show : ''}`}>
            <Link href={'/admin/products'} className={cls.list_link}>
              Все продукты
            </Link>
          </li>
          <li className={`${cls.detail} ${isShowProduct ? cls.detail_show : ''}`}>
            <Link href={'/admin/addProduct'} className={cls.list_link}>
              Новый продукт
            </Link>
          </li>
          <li
            className={`${cls.category} ${isShowCategory ? cls.open : ''}`}
            onClick={toggleCategory}
          >
            <span className={cls.list_link}>Управление категориями</span>
          </li>
          <li className={`${cls.detail} ${isShowCategory ? cls.detail_show : ''}`}>
            <Link href={'/admin/categories'} className={cls.list_link}>
              Все категории
            </Link>
          </li>
          <li className={`${cls.detail} ${isShowCategory ? cls.detail_show : ''}`}>
            <Link href={'/admin/createCategories'} className={cls.list_link}>
              Новая категория
            </Link>
          </li>
          <li className={cls.banner}>
            <Link className={cls.list_link} href={'/admin/banners'}>
              Управление баннером
            </Link>
          </li>
          <li className={cls.hit}>
            <Link className={cls.list_link} href={'/admin/bestseller'}>
              Управление хитами
            </Link>
          </li>
          <li className={cls.order}>
            <Link className={cls.list_link} href={'/admin/orders'} onClick={onClick}>
              Заказы
            </Link>
          </li>
          <li className={cls.analytics}>
            <Link className={cls.list_link} href={'/admin/analytics'}>
              Аналитика
            </Link>
          </li>
          <li className={cls.newOrder}>
            <Link className={cls.list_link} href={'/admin/newOrders'}>
              Новые заказы
              <span className={newTransaction && !newTransaction.length ? cls.empty : ''}>
                {newTransaction ? (newTransaction.length < 100 ? newTransaction.length : 99) : 0}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
