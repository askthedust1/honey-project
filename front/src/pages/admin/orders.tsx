import React, { useEffect, useState } from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import cls from '@/styles/_adminOrders.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchOrdersAdminAll, patchActiveOrders } from '@/features/orderAdmin/ordersAdminThunk';
import {
  selectCurrentPage,
  selectCurrentStatus,
  selectOrdersAdminAll,
} from '@/features/orderAdmin/ordersAdminSlice';
import AdminNav from '@/components/admin/adminNav/AdminNav';
import Head from 'next/head';
import Link from 'next/link';

const Orders: MyPage = () => {
  const dispatch = useAppDispatch();
  const ordersAllState = useAppSelector(selectOrdersAdminAll);
  const currentPageState = useAppSelector(selectCurrentPage);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setSearch] = useState<string>('');
  const [searchPhone, setSearchPhone] = useState<string>('');
  const statusStore = useAppSelector(selectCurrentStatus);

  useEffect(() => {
    const currentPage = currentPageState?.toString();

    if (statusStore != null && !search.length && !searchPhone.length) {
      dispatch(fetchOrdersAdminAll({ page: currentPage, id: statusStore }));
    } else if (search.length > 0 && !statusStore) {
      dispatch(fetchOrdersAdminAll({ page: currentPage, name: search }));
    } else if (search.length > 0 && statusStore != null) {
      dispatch(fetchOrdersAdminAll({ page: currentPage, name: search, id: statusStore }));
    } else if (searchPhone.length > 0 && !statusStore) {
      dispatch(fetchOrdersAdminAll({ page: currentPage, phone: searchPhone }));
    } else if (searchPhone.length > 0 && statusStore != null) {
      dispatch(fetchOrdersAdminAll({ page: currentPage, phone: searchPhone, id: statusStore }));
    } else {
      dispatch(fetchOrdersAdminAll({ page: currentPage }));
    }
  }, [dispatch, currentPageState, search, searchPhone, statusStore]);

  const onStatusActive = async (id: string) => {
    if (currentPageState !== undefined && currentPageState !== null) {
      const currentPage = currentPageState.toString();
      await dispatch(patchActiveOrders(id));

      if (selectedStatus) {
        dispatch(fetchOrdersAdminAll({ id: selectedStatus, page: currentPage }));
      } else if (search.length > 0) {
        dispatch(fetchOrdersAdminAll({ page: currentPage, name: search }));
      } else {
        dispatch(fetchOrdersAdminAll({ page: currentPage }));
      }
    } else {
      // console.error('currentPageState is undefined or null');
    }
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Заказы</title>
      </Head>
      <div className={cls.container}>
        <div className={cls.ordersBlock}>
          <h1 className={cls.adminOrdersMainTitle}>Заказы</h1>

          <AdminNav
            navProducts={false}
            navBestsellers={false}
            navCategories={false}
            navOrders={true}
            getStatus={(e: string): void => setSelectedStatus(e)}
            orderPage={currentPageState}
            getDisplayName={(e: string): void => setSearch(e)}
            getPhone={(e: string): void => setSearchPhone(e)}
          />

          <div className={cls.adminOrdersTable}>
            <table>
              <thead>
                <tr>
                  <th>Номер заказа</th>
                  <th>Пользователь</th>
                  <th>Телефон</th>
                  <th>Адрес</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody className={cls.tableBodyBlock}>
                {ordersAllState?.map((item) => (
                  <tr key={item._id}>
                    <td>{item.indexNumber}</td>
                    <td>{item.user.displayName}</td>
                    <td>
                      <span className={cls.innerPhoneLeft}>{item.user.phone.slice(0, 4)}</span>
                      <span>{item.user.phone.slice(4)}</span>
                    </td>
                    <td>{item.address}</td>
                    <td>{item.totalPrice}</td>
                    <td>
                      {item.status ? (
                        <button className={cls.btnActive} onClick={() => onStatusActive(item._id)}>
                          Подтвержден
                        </button>
                      ) : (
                        <button
                          className={cls.btnInactive}
                          onClick={() => onStatusActive(item._id)}
                        >
                          Не подтвержден
                        </button>
                      )}
                    </td>

                    <td>
                      <Link href={`/admin/orders/` + item._id}>
                        <button className={cls.viewMoreBtn}></button>
                      </Link>
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

Orders.Layout = 'Admin';

export default Orders;
