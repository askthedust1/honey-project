import React, { useEffect, useState } from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import cls from '@/styles/_adminBestsellers.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { apiUrl } from '@/constants';
import { fetchAdminCategories } from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import {
  selectAllBestsellers,
  selectAllBestsellersForAdmin,
} from '@/features/adminBestsellers/adminBestsellersSlice';
import plusIcon from '@/assets/images/plusIcon.png';
import {
  fetchBestsellers,
  fetchBestsellersProducts,
  patchHitProduct,
} from '@/features/adminBestsellers/adminBestsellersThunk';
import AdminNav from '@/components/admin/adminNav/AdminNav';
import Head from 'next/head';

const BestsellerAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllBestsellersForAdmin);
  const bestsellers = useAppSelector(selectAllBestsellers);
  const categories = useAppSelector(selectAdminCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAdminCategories(''));
    dispatch(fetchBestsellers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBestsellersProducts({ id: selectedCategory, search }));
  }, [dispatch, search, selectedCategory]);

  const deleteHit = async (id: string) => {
    await dispatch(patchHitProduct(id));
    await dispatch(fetchBestsellers());
    await dispatch(fetchBestsellersProducts({ id: selectedCategory, search }));
  };

  const addHit = async (id: string) => {
    if (bestsellers.length > 5) {
      alert('В хиты можно добавлять только 6 товаров!');
      return;
    }

    await dispatch(patchHitProduct(id));
    await dispatch(fetchBestsellers());
    await dispatch(fetchBestsellersProducts({ id: selectedCategory, search }));
  };

  return (
    <ProtectedRoute>
      <div className={cls.container}>
        <Head>
          <title>Хиты</title>
        </Head>
        <div className={cls.bestseller}>
          <h1 className={cls.bestseller_mainTitle}>Хиты</h1>
          <div className={cls.bestseller_activeBest}>
            {!bestsellers.length ? (
              <span className={cls.bestseller_hit_title}>
                В данном разделе пока нет хитов! Вы можете добавить, нажав на плюсик.
              </span>
            ) : (
              bestsellers.map((i) => (
                <div className={cls.bestseller_hit} key={i._id}>
                  <span className={cls.bestseller_hit_title}>{i.title}</span>
                  <button
                    onClick={() => deleteHit(i._id)}
                    className={cls.bestseller_hit_btn}
                  ></button>
                </div>
              ))
            )}
          </div>

          <AdminNav
            navProducts={false}
            navBestsellers={true}
            navCategories={false}
            navOrders={false}
            categories={categories}
            getCategorySelectId={(e: string): void => setSelectedCategory(e)}
            getName={(e: string): void => setSearch(e)}
          />

          <div className={cls.adminBestsellersTable}>
            <table>
              <thead>
                <tr>
                  <th>Фотография</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody className={cls.adminBestsellersTable_body}>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className={cls.imageTd}>
                      <img src={apiUrl + '/' + product.image} alt="image" />
                    </td>
                    <td className={cls.adminBestsellersTable_body_title}>{product.title}</td>
                    <td>{product.category.title}</td>
                    <td>{product.actualPrice}</td>
                    <td>
                      <button
                        className={cls.adminBestsellersTable_addBtn}
                        onClick={() => addHit(product._id)}
                      >
                        <img src={plusIcon.src} alt="Plus Icon" />
                      </button>
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

BestsellerAdminPage.Layout = 'Admin';
export default BestsellerAdminPage;
