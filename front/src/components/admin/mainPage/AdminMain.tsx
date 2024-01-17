import React, { useEffect } from 'react';
import Image from 'next/image';
import { selectAdminMain, selectAdminMainHits } from '@/features/adminMain/adminMainSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchAdminMain, fetchAdminMainHit } from '@/features/adminMain/adminMainThunk';
import { apiUrl } from '@/constants';
import cls from '../../../styles/_adminMainPage.module.scss';

const AdminMain = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectAdminMain);
  const hits = useAppSelector(selectAdminMainHits);

  useEffect(() => {
    dispatch(fetchAdminMain());
    dispatch(fetchAdminMainHit());
  }, [dispatch]);

  return (
    <div className={cls.main}>
      <h3 className={cls.main_title}>Главная панель</h3>
      <ul className={cls.list}>
        <li className={cls.user}>
          <span className={cls.list_number}>{info.usersAmount}</span>
          <span className={cls.list_description}>пользователей</span>
        </li>
        <li className={cls.product}>
          <span className={cls.list_number}>{info.productAmount}</span>
          <span className={cls.list_description}>продуктов</span>
        </li>
        <li className={cls.category}>
          <span className={cls.list_number}>{info.categoriesAmount}</span>
          <span className={cls.list_description}>категорий</span>
        </li>
        <li className={cls.order}>
          <span className={cls.list_number}>{info.transactionsAmount}</span>
          <span className={cls.list_description}>заказов</span>
        </li>
        <li className={cls.sum}>
          <span className={cls.list_number}>{info.sumAmount}</span>
          <span className={cls.list_description}>общая сумма</span>
        </li>
      </ul>
      <div className={cls.hit}>
        <h3 className={cls.hit_title}>Список лучших продуктов</h3>
        <table className={cls.table}>
          <thead>
            <tr className={cls.lineHead}>
              <th>Фотография</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Продано товара</th>
              <th>Общая сумма</th>
            </tr>
          </thead>
          <tbody>
            {hits.map((hit) => (
              <tr key={hit.product._id} className={cls.lineBody}>
                <td>
                  <div className={cls.imgWrap}>
                    <Image
                      width={100}
                      height={80}
                      priority
                      quality={80}
                      className={cls.cardImg}
                      src={apiUrl + '/' + hit.product.image}
                      alt="imgProd"
                    />
                  </div>
                </td>
                <td>{hit.product.translations?.ru.title}</td>
                <td>{hit.product.category.translations?.ru.title}</td>
                <td>{hit.product.actualPrice}</td>
                <td>{hit.amount}</td>
                <td>{hit.sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMain;
