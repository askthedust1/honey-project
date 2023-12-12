import React, { useEffect } from 'react';
import { MyPage } from '@/components/common/types';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUserOrders } from '@/features/order/orderSlice';
import { fetchOrdersAll } from '@/features/order/orderThunk';
import cls from '@/styles/_userOrdersHistory.module.scss';
import Link from 'next/link';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const History: MyPage = () => {
  const orders = useAppSelector(selectUserOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAll());
  }, [dispatch]);

  return (
    <div className={cls.container}>
      <div className={cls.history}>
        <h1 className={cls.history_mainTitle}>История покупок</h1>
        {!orders.length ? (
          <div>
            <h2 className={cls.history_title}>Заказов еще нет</h2>
            <div className={cls.history_return}>
              <Link href={'/products/page/1'}>Заказать</Link>
            </div>
          </div>
        ) : (
          <div className={cls.adminBestsellersTable}>
            <table>
              <thead>
                <tr>
                  <th>Номер заказа</th>
                  <th>Адрес</th>
                  <th>Дата</th>
                  <th>Заказ</th>
                  <th>Общая сумма</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody className={cls.adminBestsellersTable_body}>
                {orders.map((order) => (
                  <tr key={order.indexNumber}>
                    <td>{order.indexNumber}</td>
                    <td>{order.address}</td>
                    <td>
                      {new Date(order.dateTime).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        timeZone: 'UTC',
                      })}
                    </td>
                    <td>
                      {order.kits.map((i) => (
                        <ul key={i.product._id} className={cls.list}>
                          <li>
                            {i.product.translations.ru.title} - <span>{i.amount} шт.</span>
                          </li>
                        </ul>
                      ))}
                    </td>
                    <td>{order.totalPrice} сом</td>
                    <td>{order.status ? 'Оплачено' : 'Не подтвержден'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

History.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
  // const lang = locale ?? 'ru';
  // axiosApi.defaults.headers.common['Accept-Language'] = lang;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer'])),
    },
  };
});

export default History;
