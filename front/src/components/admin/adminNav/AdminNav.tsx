import React, { ChangeEvent, useEffect, useState } from 'react';
import cls from '@/styles/_adminNav.module.scss';
import plusIcon from '@/assets/images/plusIcon.png';
import { IAdminCategory } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import Image from 'next/image';
import {
  changeCurrentPage,
  changeName,
  changePhone,
  changeStatus,
  selectCurrentPage,
  selectCurrentStatus,
  selectNameValue,
  selectPhoneValue,
  selectTotalOrderPages,
} from '@/features/orderAdmin/ordersAdminSlice';
import { fetchOrdersAdminAll } from '@/features/orderAdmin/ordersAdminThunk';

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

interface IRequestData {
  page: string;
  id?: string | null;
  name?: string;
  phone?: string;
}

const AdminNav: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const [searchName, setSearchNameState] = useState<string>('');
  const [searchPhone, setSearchPhoneState] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const currentPageState = useAppSelector(selectCurrentPage);
  const totalPagesState = useAppSelector(selectTotalOrderPages);
  const nameValueState = useAppSelector(selectNameValue);
  const phoneValueState = useAppSelector(selectPhoneValue);
  const statusValueState = useAppSelector(selectCurrentStatus);

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    if (props.getCategorySelectId) {
      props.getCategorySelectId(categoryId);
    }
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
      dispatch(changeName(verifiedItem));
      dispatch(changeCurrentPage(1));
      if (verifiedItem.length > 0) {
        setSearchPhoneState('');
        dispatch(changePhone(''));
      }
    }
  };

  const setSearchPhone = async (event: ChangeEvent<HTMLInputElement>) => {
    const item = event.target.value;
    const numberValue = item.replace(/[^\d]/g, '');

    setSearchPhoneState(numberValue);
    dispatch(changePhone(numberValue));
    dispatch(changeCurrentPage(1));
    if (numberValue.length > 0) {
      setSearchNameState('');
      dispatch(changeName(''));
    }
  };

  const isInputPhoneDisabled = searchName.length > 0;
  const isInputNameDisabled = searchPhone.length > 0;

  const handleStatusChangeForOrders = async (event: ChangeEvent<HTMLSelectElement>) => {
    const statusId = event.target.value;
    dispatch(changeCurrentPage(1));

    if (currentPageState !== undefined && props.orderPage !== null) {
      setSelectedStatus(statusId);

      if (statusId !== '') {
        dispatch(changeStatus(statusId));
      } else {
        dispatch(changeStatus(null));
        dispatch(changeCurrentPage(1));
      }
    } else {
      //nothing
    }
  };

  const handleNextClick = () => {
    if (currentPageState && totalPagesState && currentPageState < totalPagesState) {
      dispatch(
        fetchOrdersAdminAll({
          page: (currentPageState + 1).toString(),
          id: selectedStatus || '',
          name: searchName,
          phone: searchPhone,
        }),
      );
    }
  };

  const handlePrevClick = () => {
    if (currentPageState && currentPageState > 1) {
      dispatch(
        fetchOrdersAdminAll({
          page: (currentPageState - 1).toString(),
          id: selectedStatus || '',
          name: searchName,
          phone: searchPhone,
        }),
      );
    }
  };

  useEffect(() => {
    const currentPage = currentPageState?.toString();

    try {
      const requestData: IRequestData = {
        page: currentPage || '',
        id: selectedStatus || '',
        name: searchName || '',
        phone: searchPhone || '',
      };
      dispatch(fetchOrdersAdminAll(requestData));
    } catch (error) {
      // nothing
    }
  }, [dispatch, nameValueState, phoneValueState, statusValueState]);

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
        value={searchName}
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
        value={searchPhone}
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
        <button onClick={handlePrevClick} className={cls.arrowToLeft}></button>
        <p>
          Страница: <span>{currentPageState}</span> из <span>{totalPagesState}</span>
        </p>
        <button onClick={handleNextClick} className={cls.arrowToRight}></button>
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
