'use client';
import { wrapper } from '@/store/store';
import {
  fetchAdminCategories,
  patchCategory,
} from '@/features/adminCategories/adminCategoriesThunk';
import axiosApi from '@/axiosApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import cls from '../../styles/_categories.module.scss';
import { apiUrl } from '@/constants';
import { useRouter } from 'next/navigation';

const CategoriesAdminPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categories = useAppSelector(selectAdminCategories);

  const categoryPatch = async (id: string) => {
    await dispatch(patchCategory(id));
    router.push('/admin/categories');
  };

  return (
    <div className={cls.categories_page}>
      {/*side-bar component*/}
      <div>
        <h2>Категории</h2>
        {/*верхняя панель с поиском и пагинацией*/}
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
                    <img src={apiUrl + '/' + item.image} alt="image" />
                  </td>
                  <td>
                    <p>{item.title}</p>
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
                    <span></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';
  await store.dispatch(fetchAdminCategories());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'home', 'header', 'footer'])),
    },
  };
});

export default CategoriesAdminPage;
