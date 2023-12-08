import React, { ChangeEvent, useEffect, useState } from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import cls from '@/styles/_adminOrders.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import {
  fetchOrdersAdminAll,
  fetchOrdersAdminByStatus,
  patchActiveOrders,
} from '@/features/orderAdmin/ordersAdminThunk';
import { selectCurrentPage, selectOrdersAdminAll } from '@/features/orderAdmin/ordersAdminSlice';

const Orders: MyPage = () => {
  const dispatch = useAppDispatch();
  const ordersAllState = useAppSelector(selectOrdersAdminAll);
  const currentPageState = useAppSelector(selectCurrentPage);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const currentPage = currentPageState?.toString();
    dispatch(fetchOrdersAdminAll(currentPage));
  }, [dispatch]);

  const onStatusActive = async (id: string) => {
    if (currentPageState !== undefined && currentPageState !== null) {
      const currentPage = currentPageState.toString();
      await dispatch(patchActiveOrders(id));

      if (selectedStatus) {
        dispatch(fetchOrdersAdminByStatus({ id: selectedStatus, page: currentPage }));
      } else {
        await dispatch(fetchOrdersAdminAll(currentPage));
      }
    } else {
      console.error('currentPageState is undefined or null');
    }
  };

  const handleStatusChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const statusId = event.target.value;
    setSelectedStatus(statusId);
    if (currentPageState !== undefined && currentPageState !== null) {
      const currentPage = currentPageState.toString();

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

  return (
    <ProtectedRoute>
      <div className={cls.container}>
        <div className={cls.ordersBlock}>
          <h1 className={cls.adminOrdersMainTitle}>Заказы</h1>
          <div className={cls.adminOrdersNav}>
            <input
              type="text"
              name="findOrderName"
              id="findOrderName"
              placeholder="Найти по имени"
            />
            <input
              type="text"
              name="findOrderPhone"
              id="findOrderPhone"
              placeholder="Найти по номеру"
            />

            <select onChange={handleStatusChange}>
              <option value="">Отфильтровать по статусу</option>
              <option value={'true'}>Подтвержден</option>
              <option value={'false'}>Не подтвержден</option>
            </select>
            <div className={cls.adminOrdersPagination}>
              <a className={cls.arrowToLeft} href="#"></a>
              <p>
                Страница: <span>1</span> из <span>12</span>
              </p>
              <a className={cls.arrowToRight} href="#"></a>
            </div>
          </div>
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
                    <td>{item.user.phone}</td>
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
                      <button className={cls.viewMoreBtn}></button>
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

Orders.Layout = 'Admin';

export default Orders;
