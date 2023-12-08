import React, { ChangeEvent, useEffect, useState } from 'react';
import cls from '../../styles/_adminProducts.module.scss';
import plusIcon from '@/assets/images/plusIcon.png';
import {
  fetchProductsForAdmin,
  patchActiveProducts,
} from '@/features/productAdmin/productsAdminThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectAllProductsForAdmin } from '@/features/productAdmin/productsAdminSlice';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';
import Link from 'next/link';
import { fetchAdminCategories } from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';

const ProductsAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProductsForAdmin);
  const categories = useAppSelector(selectAdminCategories);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProductsForAdmin(selectedCategory));
    dispatch(fetchAdminCategories());
  }, [dispatch, selectedCategory]);

  const onStatusActive = async (id: string) => {
    await dispatch(patchActiveProducts(id));
    await dispatch(fetchProductsForAdmin(selectedCategory));
  };

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
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
                  {category.translations.ru.title}
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
              <Link href={'/admin/addProduct'}> Добавить продукт</Link>
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
                        <button className={cls.btnActive}>Активен</button>
                      ) : (
                        <button className={cls.btnInactive}>Неактивен</button>
                      )}
                    </td>
                    <td>{new Date(product.datetime).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/admin/products/` + product._id}>
                        <button className={cls.viewMoreBtn}></button>
                      </Link>
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

export default ProductsAdminPage;
