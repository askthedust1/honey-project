import React, { ChangeEvent } from 'react';
import cls from '@/styles/_adminNav.module.scss';
import plusIcon from '@/assets/images/plusIcon.png';
import { IAdminCategory } from '@/types';
import { useAppDispatch } from '@/store/hook';
import {
  fetchOrdersAdminAll,
  fetchOrdersAdminByStatus,
} from '@/features/orderAdmin/ordersAdminThunk';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';

interface Props {
  navProducts: boolean;
  navBestsellers: boolean;
  navCategories: boolean;
  navOrders: boolean;
  categories?: IAdminCategory[];
  getCategorySelectId?: (e: string) => void;
  getName?: (e: string) => void;
  getStatus?: (e: string) => void;
  orderPage?: number;
}

const AdminNav: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    if (props.getCategorySelectId) {
      props.getCategorySelectId(categoryId);
    }
    console.log(categoryId);
  };

  const setSearchItem = async (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target.value;
    if (props.getName) {
      props.getName(item);
    }
  };

  const handleStatusChangeForOrders = async (event: ChangeEvent<HTMLSelectElement>) => {
    const statusId = event.target.value;

    if (props.getStatus && props.orderPage !== undefined && props.orderPage !== null) {
      props.getStatus(statusId);
      const currentPage = props.orderPage.toString();

      if (statusId !== '') {
        console.log({ id: statusId, page: currentPage });
        await dispatch(fetchOrdersAdminByStatus({ id: statusId, page: currentPage }));
      } else {
        await dispatch(fetchOrdersAdminAll(currentPage));
      }
    } else {
      console.error('currentPageState is undefined or null');
    }
  };

  const navForProducts = (
    <>
      <select onChange={handleCategoryChange}>
        <option value="">Отфильтровать по категории</option>
        {props.categories
          ? props.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.translations.ru.title}
              </option>
            ))
          : ''}
      </select>
      <input
        type="text"
        name="findProduct"
        id="findProduct"
        placeholder="Найти по названию"
        onChange={setSearchItem}
      />
      <div className={cls.adminNavPagination}>
        <a className={cls.arrowToLeft} href="#"></a>
        <p>
          Страница: <span>1</span> из <span>12</span>
        </p>
        <a className={cls.arrowToRight} href="#"></a>
      </div>
      <button className={cls.addAdminNavBtn}>
        <img src={plusIcon.src} alt="plusIcon" />
        <ButtonUi text={'Добавить продукт'} link={'/admin/addProduct'} />
      </button>
    </>
  );

  const navForBestsellers = (
    <>
      <h3 className={cls.bestseller_title} style={{ margin: '0 37px 0 -15px' }}>
        Все товары
      </h3>
      <select style={{ minWidth: '250px', margin: '0 30px 0 0' }} onChange={handleCategoryChange}>
        <option value="">Отфильтровать по категории</option>
        {props.categories
          ? props.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.translations.ru.title}
              </option>
            ))
          : ''}
      </select>
      <input
        style={{ width: '250px', margin: '0 67px 0 0' }}
        type="text"
        name="findProduct"
        id="findProduct"
        placeholder="Найти по названию"
        onChange={setSearchItem}
      />
      <div className={cls.adminNavPagination}>
        <a className={cls.arrowToLeft} href="#"></a>
        <p>
          Страница: <span>1</span> из <span>12</span>
        </p>
        <a className={cls.arrowToRight} href="#"></a>
      </div>
    </>
  );

  const navForOrders = (
    <>
      <input
        style={{ minWidth: '250px', margin: '0 22px 0 0' }}
        type="text"
        name="findOrderName"
        id="findOrderName"
        placeholder="Найти по имени"
      />
      <input
        style={{ margin: '0 22px 0 0' }}
        type="text"
        name="findOrderPhone"
        id="findOrderPhone"
        placeholder="Найти по номеру"
      />

      <select
        style={{ width: '250px', margin: '0 19px 0 0' }}
        onChange={handleStatusChangeForOrders}
      >
        <option value="">Отфильтровать по статусу</option>
        <option value={'true'}>Подтвержден</option>
        <option value={'false'}>Не подтвержден</option>
      </select>
      <div className={cls.adminNavPagination}>
        <a className={cls.arrowToLeft} href="#"></a>
        <p>
          Страница: <span>1</span> из <span>12</span>
        </p>
        <a className={cls.arrowToRight} href="#"></a>
      </div>
    </>
  );

  const navForCategories = (
    <>
      <input type="text" name="findProduct" id="findProduct" placeholder="Найти по названию" />
      <button className={cls.addAdminNavBtn}>
        <img src={plusIcon.src} alt="plusIcon" />
        <ButtonUi text={'Добавить категорию'} link={'/admin/createCategories'} />
      </button>
    </>
  );

  return (
    <div
      className={cls.adminNav}
      style={{
        margin: props.navCategories ? '20px 0 16px' : '20px 15px 16px',
        maxWidth: props.navCategories ? '589px' : '',
        boxShadow: props.navBestsellers ? 'none' : 'rgba(90, 55, 51, 0.25)',
        background: props.navBestsellers ? 'none' : '#fff',
      }}
    >
      {props.navProducts ? navForProducts : ''}
      {props.navBestsellers ? navForBestsellers : ''}
      {props.navCategories ? navForCategories : ''}
      {props.navOrders ? navForOrders : ''}
    </div>
  );
};

export default AdminNav;
