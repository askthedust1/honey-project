import React, { ChangeEvent, useState } from 'react';
import cls from '@/styles/_adminNav.module.scss';
import plusIcon from '@/assets/images/plusIcon.png';
import { IAdminCategory } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import Image from 'next/image';
import {
  changeCurrentPage,
  changeStatus,
  counterMinus,
  counterPlus,
  selectCurrentPage,
  selectTotalOrderPages,
} from '@/features/orderAdmin/ordersAdminSlice';

interface Props {
  navProducts: boolean;
  navBestsellers: boolean;
  navCategories: boolean;
  navOrders: boolean;
  categories?: IAdminCategory[];
  getCategorySelectId?: (e: string) => void;
  getName?: (e: string) => void;
  getDisplayName?: (e: string) => void;
  getPhone?: (e: string) => void;
  getStatus?: (e: string) => void;
  orderPage?: number;
}

const AdminNav: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const [searchName, setSearchNameState] = useState<string>('');
  const [searchPhone, setSearchPhoneState] = useState<string>('');

  const currentPageSate = useAppSelector(selectCurrentPage);
  const totalPagesState = useAppSelector(selectTotalOrderPages);

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    if (props.getCategorySelectId) {
      props.getCategorySelectId(categoryId);
    }
    // console.log(categoryId);
  };

  const setSearchItem = async (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target.value;
    if (props.getName) {
      props.getName(item);
    }
  };

  const setSearchName = async (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target.value;
    const verifiedItem = item.replace(/\s+/g, ' ');
    const regex = /^[\p{L} ]*$/u;

    setSearchNameState(item);

    if (regex.test(verifiedItem) || verifiedItem === '') {
      if (verifiedItem.length > 0) {
        setSearchPhoneState('');
      }
      if (props.getDisplayName) {
        props.getDisplayName(verifiedItem);
      }
    }
  };

  const setSearchPhone = async (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target.value;
    const numberValue = item.replace(/[^\d]/g, '');
    setSearchPhoneState(numberValue);
    if (numberValue.length > 0) {
      setSearchNameState('');
    }
    if (props.getPhone) {
      props.getPhone(numberValue);
    }
  };

  const isInputPhoneDisabled = searchName.length > 0;
  const isInputNameDisabled = searchPhone.length > 0;

  const handleStatusChangeForOrders = async (event: ChangeEvent<HTMLSelectElement>) => {
    const statusId = event.target.value;

    if (props.getStatus && props.orderPage !== undefined && props.orderPage !== null) {
      props.getStatus(statusId);
      const currentPage = props.orderPage.toString();

      if (statusId !== '') {
        dispatch(changeStatus(statusId));
      } else {
        dispatch(changeStatus(null));
        dispatch(changeCurrentPage(1));
      }
    } else {
      console.error('currentPageState is undefined or null');
    }
  };

  const getPlus = async () => {
    if (currentPageSate && totalPagesState && currentPageSate < totalPagesState) {
      await dispatch(counterPlus());
    }
  };

  const getMinus = async () => {
    if (currentPageSate && currentPageSate > 1) {
      await dispatch(counterMinus());
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
      <button className={cls.addAdminNavBtn}>
        <Image src={plusIcon.src} alt="plusIcon" width={14} height={14} />
        <ButtonUi text={'Добавить продукт'} link={'/admin/addProduct'} />
      </button>
    </>
  );

  const navForBestsellers = (
    <>
      <h3 className={cls.bestseller_title} style={{ margin: '0 37px 0 -15px' }}>
        Все товары
      </h3>
      <select
        style={{ minWidth: '250px', margin: '0 30px 0 auto' }}
        onChange={handleCategoryChange}
      >
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
        style={{ width: '250px', margin: '0' }}
        type="text"
        name="findProduct"
        id="findProduct"
        placeholder="Найти по названию"
        onChange={setSearchItem}
      />
    </>
  );

  const navForOrders = (
    <>
      <input
        style={{
          minWidth: '250px',
          margin: '0 22px 0 0',
          opacity: searchPhone.length > 0 ? '0.4' : '1',
        }}
        type="text"
        name="findOrderName"
        id="findOrderName"
        placeholder="Найти по имени"
        onChange={setSearchName}
        disabled={isInputNameDisabled}
      />
      <input
        style={{
          margin: '0 22px 0 0',
          opacity: searchName.length > 0 ? '0.4' : '1',
        }}
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        name="findOrderPhone"
        id="findOrderPhone"
        placeholder="Найти по номеру"
        onChange={setSearchPhone}
        disabled={isInputPhoneDisabled}
      />

      <select
        style={{
          width: '250px',
          margin: '0 19px 0 0',
        }}
        onChange={handleStatusChangeForOrders}
      >
        <option value="">Отфильтровать по статусу</option>
        <option value="">Все заказы</option>
        <option value={'true'}>Подтвержден</option>
        <option value={'false'}>Не подтвержден</option>
      </select>
      <div className={cls.adminNavPagination}>
        <button onClick={getMinus} className={cls.arrowToLeft}></button>
        <p>
          Страница: <span>{currentPageSate}</span> из <span>{totalPagesState}</span>
        </p>

        <button onClick={getPlus} className={cls.arrowToRight}></button>
      </div>
    </>
  );

  const navForCategories = (
    <>
      <input
        type="text"
        name="findCategory"
        id="findCategory"
        placeholder="Найти по названию"
        onChange={setSearchItem}
      />
      <button className={cls.addAdminNavBtn}>
        <Image src={plusIcon.src} alt="plusIcon" width={14} height={14} />
        <ButtonUi text={'Добавить категорию'} link={'/admin/createCategories'} />
      </button>
    </>
  );

  return (
    <div
      className={cls.adminNav}
      style={{
        margin: props.navCategories ? '20px 0 16px' : '20px 15px 16px',
        maxWidth: props.navCategories ? '700px' : '',
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
