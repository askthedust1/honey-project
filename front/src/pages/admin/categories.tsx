import {
  fetchAdminCategories,
  fetchOneCategoryForAdmin,
  patchCategory,
} from '@/features/adminCategories/adminCategoriesThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import cls from '../../styles/_categories.module.scss';
import { apiUrl } from '@/constants';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { useEffect, useState } from 'react';
import { MyPage } from '@/components/common/types';
import ModalEditCategories from '@/components/UI/modalEditCategories/ModalEditCategories';

const CategoriesAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAdminCategories);

  const [oneItem, setOneItem] = useState({
    titleRU: '',
    titleEN: '',
    titleKG: '',
    image: '',
  });

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const categoryPatch = async (id: string) => {
    await dispatch(patchCategory(id));
    await dispatch(fetchAdminCategories());
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
      <ModalEditCategories isOpen={isOpen} closeModalButton={closeModal} closeModalAfterPut={(e) => setOpen(e)} />
    </ProtectedRoute>
  );
};

CategoriesAdminPage.Layout = 'Admin';

export default CategoriesAdminPage;
