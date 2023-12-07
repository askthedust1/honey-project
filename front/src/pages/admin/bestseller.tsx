import React, { ChangeEvent, useEffect, useState } from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import cls from '@/styles/adminBestsellers.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { apiUrl } from '@/constants';
import { selectCategories } from '@/features/categories/categoriesSlice';
import {
  selectAllBestsellers,
  selectAllBestsellersForAdmin,
} from '@/features/adminBestsellers/adminBestsellersSlice';
import plusIcon from '@/assets/images/plusIcon.png';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import {
  fetchBestsellers,
  fetchBestsellersProducts,
  patchHitProduct,
} from '@/features/adminBestsellers/adminBestsellersThunk';

const BestsellerAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllBestsellersForAdmin);
  const bestsellers = useAppSelector(selectAllBestsellers);
  const categories = useAppSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCategories(''));
    dispatch(fetchBestsellers());
    dispatch(fetchBestsellersProducts(''));
  }, [dispatch]);

  const categoryChangeHandle = async (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category !== '') {
      await dispatch(fetchBestsellersProducts(category));
    } else {
      await dispatch(fetchBestsellersProducts(''));
    }
  };

  const deleteHit = async (id: string) => {
    await dispatch(patchHitProduct(id));
    await dispatch(fetchBestsellers());
    await dispatch(fetchBestsellersProducts(selectedCategory));
  };

  const addHit = async (id: string) => {
    if (bestsellers.length > 5) {
      alert('В хиты можно добавлять только 6 товаров!');
      return;
    }

    await dispatch(patchHitProduct(id));
    await dispatch(fetchBestsellers());
    await dispatch(fetchBestsellersProducts(selectedCategory));
  };

  return (
    <ProtectedRoute>
      <div className={cls.container}>
        <div className={cls.bestseller}>
          <h1 className={cls.bestseller_main_title}>Хиты</h1>
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
          <div className={cls.adminProductsNav}>
            <h3 className={cls.bestseller_title}>Все товары</h3>
            <select onChange={categoryChangeHandle}>
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
          </div>
          <div className={cls.adminBestsellersTable}>
            <table>
              <thead>
                <tr>
                  <th>Фотография</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  {/*<th>Статус</th>*/}
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
                    {/*<td>*/}
                    {/*  <span*/}
                    {/*    className={*/}
                    {/*      product.isActive*/}
                    {/*        ? cls.adminBestsellersTable_active*/}
                    {/*        : cls.adminBestsellersTable_inactive*/}
                    {/*    }*/}
                    {/*  >*/}
                    {/*    {product.isActive ? 'Активен' : 'Не активен'}*/}
                    {/*  </span>*/}
                    {/*</td>*/}
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
