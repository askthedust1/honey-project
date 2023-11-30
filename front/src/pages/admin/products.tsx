import React, { ChangeEvent, useEffect, useState } from 'react';
import cls from '../../../src/styles/_adminProducts.module.scss';
import plusIcon from '@/assets/images/plusIcon.png';
import {
  fetchAllProductsForAdmin,
  fetchAllProductsForAdminByCategory,
  patchActiveProducts,
  patchHitProducts,
} from '@/features/productAdmin/productsAdminThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectAllProductsForAdmin } from '@/features/productAdmin/productsAdminSlice';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { selectCategories } from '@/features/categories/categoriesSlice';
import { wrapper } from '@/store/store';
import axiosApi from '@/axiosApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';

const ProductsAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProductsForAdmin);
  const categories = useAppSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchAllProductsForAdmin());
  }, [dispatch]);

  const onStatusActive = async (id: string) => {
    await dispatch(patchActiveProducts(id));
    await dispatch(fetchAllProductsForAdmin());
    if (selectedCategory) {
      dispatch(fetchAllProductsForAdminByCategory(selectedCategory));
    }
  };

  const onHitActivate = async (id: string) => {
    await dispatch(patchHitProducts(id));
    await dispatch(fetchAllProductsForAdmin());
    if (selectedCategory) {
      dispatch(fetchAllProductsForAdminByCategory(selectedCategory));
    }
  };

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    if (categoryId !== '') {
      await dispatch(fetchAllProductsForAdminByCategory(categoryId));
    } else {
      await dispatch(fetchAllProductsForAdmin());
    }
  };

  return (
    <ProtectedRoute>
      <div className={cls.container}>
        <div className={cls.productsBlock}>
          <h1 className={cls.adminProductsMainTitle}>Продукты</h1>
          <div className={cls.adminProductsNav}>
            <select onChange={handleCategoryChange}>
              <option value="">Отфильтровать по категории</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="findProduct"
              id="findProduct"
              placeholder="Найти по названию"
            />
            <div className={cls.adminProductsPagination}>
              <a className={cls.arrowToLeft} href="#"></a>
              <p>
                Страница: <span>1</span> из <span>12</span>
              </p>
              <a className={cls.arrowToRight} href="#"></a>
            </div>
            <button className={cls.addNewProductBtn}>
              <img src={plusIcon.src} alt="plusIcon" />
              Добавить продукт
            </button>
          </div>
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
                      <img src={apiUrl + '/' + product.image} alt="image" />
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
                        <button
                          className={cls.btnActive}
                          onClick={() => onHitActivate(product._id)}
                        >
                          Активен
                        </button>
                      ) : (
                        <button
                          className={cls.btnInactive}
                          onClick={() => onHitActivate(product._id)}
                        >
                          Неактивен
                        </button>
                      )}
                    </td>
                    <td>{new Date(product.datetime).toLocaleDateString()}</td>
                    <td>
                      <button className={cls.viewMoreBtn}></button>
                      <button className={cls.editBtn}></button>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';
  await store.dispatch(fetchCategories(''));

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'home', 'header', 'footer'])),
    },
  };
});

export default ProductsAdminPage;
