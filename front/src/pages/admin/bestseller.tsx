import React from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import cls from '@/styles/hit.module.scss';
import { useAppSelector } from '@/store/hook';
import { selectAllProducts } from '@/features/products/productsSlice';

const BestsellerAdminPage: MyPage = () => {
  const products = useAppSelector(selectAllProducts);
  return (
    <ProtectedRoute>
      <div className={cls.hits}>
        <h1 className={cls.hits_title}>Хиты</h1>
        <div className={cls.hits_current}>тут будут хиты</div>
        <h2 className={cls.hits_title}>Все товары</h2>
        <div className={cls.products_body}>
          <table className={cls.products_tbl}>
            <thead>
              <tr>
                <th>Фотография</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Статус</th>
                <th>Действие</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((i) => (
                <tr>
                  <td></td>
                  <td>
                    <span className="product-title">Ковролин Balta Wellington 4957 80</span>
                  </td>
                  <td></td>
                  <td>
                    <span className="product-price">2 092 руб/м²</span>
                  </td>
                  <td>
                    <span className="product-amount">257 316 руб</span>
                  </td>
                  <td>
                    <span className="product-amount">257 316 руб</span>
                  </td>
                  <td>
                    <button type="button" className="btn-action">
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

BestsellerAdminPage.Layout = 'Admin';

export default BestsellerAdminPage;
