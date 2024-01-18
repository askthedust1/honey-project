import React, { useEffect, useCallback } from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import cls from '@/styles/_adminOrders.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Head from 'next/head';
import Link from 'next/link';
import { fetchOrdersAdminAll, patchActiveOrders } from '@/features/orderAdmin/ordersAdminThunk';
import {
  selectCurrentPage,
  selectCurrentStatus,
  selectDataLoaded,
  selectNameValue,
  selectOrdersAdminAll,
  selectPhoneValue,
} from '@/features/orderAdmin/ordersAdminSlice';
import AdminNav from '@/components/admin/adminNav/AdminNav';
import Preloader from '@/components/UI/preloader/preloader';

interface IRequestData {
  page: string;
  id?: string | null;
  name?: string;
  phone?: string;
}

const Orders: MyPage = () => {
  const dispatch = useAppDispatch();
  const ordersAllState = useAppSelector(selectOrdersAdminAll);
  const currentPageState = useAppSelector(selectCurrentPage);
  const statusStore = useAppSelector(selectCurrentStatus);
  const dataLoadedValue = useAppSelector(selectDataLoaded);
  const nameValueState = useAppSelector(selectNameValue);
  const phoneValueState = useAppSelector(selectPhoneValue);

  const fetchData = useCallback(async () => {
    try {
      const currentPage = currentPageState?.toString();

      if (!ordersAllState && !phoneValueState && !nameValueState) {
        await dispatch(fetchOrdersAdminAll({ page: currentPage }));
      }
    } catch (error) {
      //nothing
    }
  }, [dispatch, ordersAllState]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData();
      } catch (error) {
        // nothing
      }
    };

    void fetchDataAsync();
  }, [fetchData]);

  const onStatusActive = async (id: string) => {
    if (currentPageState !== undefined && currentPageState !== null) {
      const currentPage = currentPageState.toString();
      await dispatch(patchActiveOrders(id));

      try {
        const requestData: IRequestData = {
          page: currentPage || '',
          id: statusStore || '',
          name: nameValueState || '',
          phone: phoneValueState || '',
        };

        dispatch(fetchOrdersAdminAll(requestData));
      } catch (error) {
        // nothing
      }
    } else {
      // nothing
    }
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Заказы</title>
      </Head>

      <div className={cls.container}>
        <div className={cls.ordersBlock}>
          <div>
            <h1 className={cls.adminOrdersMainTitle}>Заказы</h1>
            <div className={cls.preloaderTitle}>{dataLoadedValue ? <Preloader /> : <></>}</div>
          </div>

          <AdminNav
            navProducts={false}
            navBestsellers={false}
            navCategories={false}
            navOrders={true}
            orderPage={currentPageState}
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
                  <th>Оплата</th>
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
                    <td>{item.payment}</td>
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
