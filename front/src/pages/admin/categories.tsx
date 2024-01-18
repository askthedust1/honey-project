import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Head from 'next/head';
import Image from 'next/image';
import {
  fetchAdminCategories,
  fetchOneCategoryForAdmin,
  patchCategory,
} from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import AdminNav from '@/components/admin/adminNav/AdminNav';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import ModalEditCategories from '@/components/UI/modalEditCategories/ModalEditCategories';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';
import cls from '../../styles/_categories.module.scss';

const CategoriesAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAdminCategories);

  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAdminCategories(search));
  }, [search, dispatch]);

  const categoryPatch = async (id: string) => {
    await dispatch(patchCategory(id));
    await dispatch(fetchAdminCategories(search));
  };

  const getInfoAndIsOpen = (isOpen: boolean, id: string) => {
    dispatch(fetchOneCategoryForAdmin(id));
    setOpen(isOpen);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className={cls.categories_page}>
        <Head>
          <title>Категории</title>
        </Head>
        <div>
          <h2>Категории</h2>
          <AdminNav
            navProducts={false}
            navBestsellers={false}
            navCategories={true}
            navOrders={false}
            categories={categories}
            getName={(e: string): void => setSearch(e)}
          />

          <div className={cls.categories_page_inner}>
            <table className={cls.categories_page_inner_table}>
              <thead>
                <tr>
                  <th>
                    <p>Фотография</p>
                  </th>
                  <th>
                    <p>Название</p>
                  </th>
                  <th>
                    <p>Статус</p>
                  </th>
                  <th>
                    <p>Действие</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Image
                        src={apiUrl + '/' + item.image}
                        alt={item.translations.ru.title}
                        width={209}
                        height={132}
                      />
                    </td>
                    <td>
                      <p>{item.translations.ru.title}</p>
                    </td>
                    <td>
                      <button
                        onClick={() => categoryPatch(item._id)}
                        style={{
                          backgroundColor: item.isActive
                            ? 'rgba(39, 174, 96, 0.20)'
                            : 'rgba(174, 39, 39, 0.20)',
                          color: item.isActive ? '#27AE60' : '#AE2727',
                        }}
                      >
                        {item.isActive ? 'Активен' : 'Не активен'}
                      </button>
                    </td>
                    <td>
                      <span onClick={() => getInfoAndIsOpen(true, item._id)}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalEditCategories
        isOpen={isOpen}
        closeModalButton={closeModal}
        closeModalAfterPut={(e) => setOpen(e)}
      />
    </ProtectedRoute>
  );
};

CategoriesAdminPage.Layout = 'Admin';

export default CategoriesAdminPage;
