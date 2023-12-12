import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/users/usersSlice';
import cls from '@/styles/transaction.module.scss';
import { fetchOrder } from '@/features/order/orderThunk';
import { selectDateOrder, selectOrder } from '@/features/order/orderSlice';
import TransactionItem from '@/components/Order/TransactionItem';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MyPage } from '@/components/common/types';

const Transaction: MyPage = () => {
  const { t } = useTranslation('transaction');
  const [isClient, setIsClient] = useState(false);
  // const router = useRouter();
  const dispatch = useAppDispatch();
  const orderDate = useAppSelector(selectDateOrder);
  const user = useAppSelector(selectUser);
  const transaction = useAppSelector(selectOrder);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log(Cookies.get('orderDateCookie'));

  if (!Cookies.get('orderDateCookie') && orderDate) {
    console.log(orderDate);
    Cookies.set('orderDateCookie', orderDate, { expires: 1 / 1140 });
  } else if (Cookies.get('orderDateCookie') && orderDate) {
    Cookies.set('orderDateCookie', orderDate, { expires: 1 / 1140 });
  }

  useEffect(() => {
    const orderDateCookie = Cookies.get('orderDateCookie');
    console.log(orderDateCookie);
    console.log(typeof orderDateCookie);

    if (user && orderDate) {
      console.log('Yes orderDate');
      console.log(orderDate);
      dispatch(fetchOrder(orderDate));
    } else if (orderDateCookie) {
      console.log('NO orderDate');
      dispatch(fetchOrder(orderDateCookie));
    }
  }, [dispatch]);
  let formattedStr = 'sometime';
  if (transaction) {
    const dateObj = new Date(transaction.dateTime);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    formattedStr = `${day}. ${month}. ${year}`;
  }

  return (
    <>
      {isClient && user && transaction ? (
        <div className={cls.container}>
          <section className={cls.title}>
            <h3>{t('basket')}</h3>
            <div className={cls.return}>
              <Link href={'/cart'}>{t('returnToStore')}</Link>
            </div>
          </section>
          <section className={cls.content}>
            <div className={cls.content_item}>
              <h3 className={cls.contentTitle}>{t('thanksForOrder')} 🎉</h3>
              <h4 className={cls.subtitle}>{t('orderPlaced')}</h4>
              <p className={cls.text}>{t('managerContact')}</p>
              <div className={cls.products}>
                {transaction?.kits.map((prod) => (
                  <TransactionItem item={prod} key={prod.product._id} />
                ))}
              </div>
              <div>
                <div className={cls.clientInfo}>
                  <span className={cls.name}>{t('client')}:</span>
                  <span>{formattedStr}</span>
                </div>
                <div className={cls.clientInfo}>
                  <span className={cls.name}>{t('orderTotal')}:</span>
                  <span>{transaction?.totalPrice} сом</span>
                </div>
                <div className={cls.clientInfo}>
                  <span className={cls.name}>{t('paymentMethod')}:</span>
                  <span>{t('cashPayment')}</span>
                </div>
              </div>
              <button className={cls.historyBtn}>{t('purchaseHistory')}</button>
            </div>
          </section>
        </div>
      ) : (
        <div>Null</div>
      )}
    </>
  );
};
export default Transaction;
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer', 'transaction'])),
    },
  };
});
Transaction.Layout = 'Main';
