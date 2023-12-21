import React, { useEffect } from 'react';
import { MyPage } from '@/components/common/types';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUserOrders } from '@/features/order/orderSlice';
import { fetchOrdersAll } from '@/features/order/orderThunk';
import cls from '@/styles/_userOrdersHistory.module.scss';
import Link from 'next/link';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

const History: MyPage = () => {
  const { t, i18n } = useTranslation('ordersHistory');
  const currentLang = i18n.language || 'ru';
  const orders = useAppSelector(selectUserOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAll(currentLang));
  }, [currentLang, dispatch]);

  return (
    <div className={cls.history}>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content="История покупок" />
      </Head>
      <h1 className={cls.history_mainTitle}>{t('title')}</h1>
      {!orders.length ? (
        <div>
          <h2 className={cls.history_title}>{t('noOrders')}</h2>
          <div className={cls.history_return}>
            <Link href={'/products/page/1'}>{t('orderBtn')}</Link>
          </div>
        </div>
      ) : (
        <div className={cls.adminBestsellersTable}>
          <table>
            <thead>
              <tr>
                <th>{t('numberOrder')}</th>
                <th>{t('address')}</th>
                <th>{t('date')}</th>
                <th>{t('orderList')}</th>
                <th>{t('total')}</th>
                <th>{t('status')}</th>
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
                  <td className={cls.prod}>
                    {order.kits.map((i) => (
                      <ul key={i.product._id} className={cls.list}>
                        <li>
                          {i.product.title} -{' '}
                          <span>
                            {i.amount} {t('piece')}
                          </span>
                        </li>
                      </ul>
                    ))}
                  </td>
                  <td>
                    {order.totalPrice} {t('som')}
                  </td>
                  <td>{order.status ? t('statusYes') : t('statusNo')}</td>
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

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'ordersHistory', 'footer'])),
    },
  };
});

export default History;
