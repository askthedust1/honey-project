import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import axiosApi from '@/axiosApi';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { selectUserOrders } from '@/features/order/orderSlice';
import { fetchOrdersAll } from '@/features/order/orderThunk';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { MyPage } from '@/components/common/types';
import cls from '@/styles/_userOrdersHistory.module.scss';

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
        <meta name="description" content="История заказов" />
      </Head>
      <h1 className={cls.history_mainTitle}>{t('title')}</h1>
      {!orders.length ? (
        <div className={cls.history_noOrders}>
          <h2 className={cls.history_title}>{t('noOrders')}</h2>
          <div className={cls.history_return}>
            <Link href={'/products/page/1'}>{t('orderBtn')}</Link>
          </div>
        </div>
      ) : (
        <>
          <div className={cls.historyTable}>
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
              <tbody className={cls.historyTable_body}>
                {orders
                  .map((order) => (
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
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
          <div className={cls.ordersCards}>
            {orders
              .map((order) => (
                <div className={cls.ordersCards_card} key={order.indexNumber}>
                  <p>
                    <span className={cls.ordersCards_card_marker}>{t('numberOrder')}:</span>{' '}
                    {order.indexNumber}
                  </p>
                  <p>
                    <span className={cls.ordersCards_card_marker}>{t('address')}:</span>{' '}
                    {order.address}
                  </p>
                  <p>
                    <span className={cls.ordersCards_card_marker}>{t('date')}:</span>{' '}
                    {new Date(order.dateTime).toLocaleString('en-US', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                      timeZone: 'UTC',
                    })}
                  </p>
                  <p>
                    <span className={cls.ordersCards_card_marker}>{t('total')}:</span>{' '}
                    {order.totalPrice} {t('som')}
                  </p>
                  <p>
                    <span className={cls.ordersCards_card_marker}>{t('status')}:</span>{' '}
                    {order.status ? t('statusYes') : t('statusNo')}
                  </p>
                  <div className={cls.ordersCards_card_order}>
                    <span className={cls.ordersCards_card_marker}>{t('orderList')}:</span>
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
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </>
      )}
    </div>
  );
};

History.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'ordersHistory', 'footer'])),
    },
  };
});

export default History;
