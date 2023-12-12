import React, { useEffect } from 'react';
import { MyPage } from '@/components/common/types';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUserOrders } from '@/features/order/orderSlice';
import { fetchOrdersAll } from '@/features/order/orderThunk';
import cls from '@/styles/_adminBestsellers.module.scss';
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
    <div>
      <h1>User Orders</h1>
      {!orders.length ? (
        <div>
          <h2>Заказов еще нет</h2>
          <div className={cls.return}>
            <Link href={'/products/page/1'}>Вернуться в магазин</Link>
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
                <th>Цена</th>
              </tr>
            </thead>
            <tbody className={cls.adminBestsellersTable_body}>
              {orders.map((order) => (
                <tr key={order.indexNumber}>
                  <td>{order.indexNumber}</td>
                  <td>{order.address}</td>
                  <td>{new Date(order.dateTime).toLocaleString()}</td>
                  <td>
                    {order.kits.map((i) => (
                      <ul key={i.product._id} className={cls.list}>
                        <li>
                          {i.product.title} - <span>{i.amount}</span>
                        </li>
                      </ul>
                    ))}
                  </td>
                  <td>{order.totalPrice} сом</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

History.Layout = 'Main';

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
//   // const lang = locale ?? 'ru';
//   // axiosApi.defaults.headers.common['Accept-Language'] = lang;
//
//   await store.dispatch(fetchOrdersAll());
//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer'])),
//     },
//   };
// });

export default History;
