import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Image from 'next/image';
import { selectAllProductsForAdmin } from '@/features/productAdmin/productsAdminSlice';
import { fetchProductsAnalyticsAdmin } from '@/features/productAdmin/productsAdminThunk';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';
import cls from '@/styles/_adminAnalytics.module.scss';

const Analytics: MyPage = () => {
  const products = useAppSelector(selectAllProductsForAdmin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAnalyticsAdmin());
  }, [dispatch]);
  return (
    <ProtectedRoute>
      <div className={cls.analytic}>
        <h2>Аналитика</h2>
        <div className={cls.analyticBlock}>
          <h3 className={cls.analytic_title}>Статистика пользовательских кликов на Продукты</h3>
          <table className={cls.table}>
            <thead>
              <tr>
                <th>Фотография</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Кол-во кликов</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div>
                      <Image
                        width={100}
                        height={100}
                        src={apiUrl + '/' + product.image}
                        alt={product.title}
                      />
                    </div>
                  </td>
                  <td className={cls.productTitle}>{product.title}</td>
                  <td>{product.category.title}</td>
                  <td>{product.actualPrice}</td>
                  <td className={cls.productClick}>{product.click}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};
Analytics.Layout = 'Admin';
export default Analytics;
