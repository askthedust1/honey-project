import React, { ChangeEvent, useEffect, useState } from 'react';
import cls from '../../../src/styles/_adminProducts.module.scss';
import plusIcon from '@/assets/images/plusIcon.png';
import {
  fetchAllProductsForAdmin,
  fetchAllProductsForAdminByCategory,
} from '@/features/productAdmin/productsAdminThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectAllProductsForAdmin } from '@/features/productAdmin/productsAdminSlice';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { selectCategories } from '@/features/categories/categoriesSlice';
import { wrapper } from '@/store/store';
import axiosApi from '@/axiosApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProductsAdminPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProductsForAdmin);
  const categories = useAppSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchAllProductsForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchAllProductsForAdminByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);
  console.log(products);
  console.log(categories);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  };

  return (
    <div className={cls.container}>
      <div className={cls.sidebar}></div>
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
          <input type="text" name="findProduct" id="findProduct" placeholder="Найти по названию" />
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
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';
  await store.dispatch(fetchCategories());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'home', 'header', 'footer'])),
    },
  };
});

export default ProductsAdminPage;
