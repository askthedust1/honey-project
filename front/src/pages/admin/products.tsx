import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
  fetchProductsForAdmin,
  patchActiveProducts,
} from '@/features/productAdmin/productsAdminThunk';
import { selectAllProductsForAdmin } from '@/features/productAdmin/productsAdminSlice';
import { fetchAdminCategories } from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import AdminNav from '@/components/admin/adminNav/AdminNav';
import { apiUrl } from '@/constants';
import cls from '../../styles/_adminProducts.module.scss';

const ProductsAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProductsForAdmin);
  const categories = useAppSelector(selectAdminCategories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAdminCategories(''));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsForAdmin({ id: selectedCategory, search }));
  }, [dispatch, search, selectedCategory]);

  const onStatusActive = async (id: string) => {
    await dispatch(patchActiveProducts(id));
    await dispatch(fetchProductsForAdmin({ id: selectedCategory, search }));
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Продукты</title>
      </Head>
      <div className={cls.container}>
        <div className={cls.productsBlock}>
          <h1 className={cls.adminProductsMainTitle}>Продукты</h1>

          <AdminNav
            navProducts={true}
            navBestsellers={false}
            navCategories={false}
            navOrders={false}
            categories={categories}
            getCategorySelectId={(e: string): void => setSelectedCategory(e)}
            getName={(e: string): void => setSearch(e)}
          />

          <div className={cls.adminProductsTable}>
            <table>
              <thead>
                <tr>
                  <th>Фотография</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Старая цена</th>
                  <th>Новая цена</th>
                  <th>Количество</th>
                  <th>Статус</th>
                  <th>Хит</th>
                  <th>Дата создания</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody className={cls.tableBodyBlock}>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className={cls.imageTd}>
                      <Image
                        width={69}
                        height={69}
                        src={apiUrl + '/' + product.image}
                        alt="image"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category.title}</td>
                    <td>{product.oldPrice}</td>
                    <td>{product.actualPrice}</td>
                    <td>{product.amount}</td>
                    <td>
                      {product.isActive ? (
                        <button
                          className={cls.btnActive}
                          onClick={() => onStatusActive(product._id)}
                        >
                          Активен
                        </button>
                      ) : (
                        <button
                          className={cls.btnInactive}
                          onClick={() => onStatusActive(product._id)}
                        >
                          Неактивен
                        </button>
                      )}
                    </td>
                    <td>
                      {product.isHit ? (
                        <span className={cls.hitActive}>Активен</span>
                      ) : (
                        <span className={cls.hitInactive}>Неактивен</span>
                      )}
                    </td>
                    <td>{new Date(product.datetime).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/admin/products/` + product._id} data-product-id={product._id}>
                        <button className={cls.viewMoreBtn}></button>
                      </Link>
                      <Link href={`/admin/editProduct/` + product._id}>
                        <button className={cls.editBtn}></button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
ProductsAdminPage.Layout = 'Admin';

export default ProductsAdminPage;
