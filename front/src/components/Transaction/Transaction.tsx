import React, { useEffect } from 'react';
import cls from '@/styles/transaction.module.scss';
import Link from 'next/link';
import TransactionItem from '@/components/Order/TransactionItem';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectOrder, selectProductsDataLoaded } from '@/features/order/orderSlice';
import { selectUser } from '@/features/users/usersSlice';
import { fetchOrder } from '@/features/order/orderThunk';
import NotFound404 from '@/components/UI/notFound404/NotFound404';

const Transaction = () => {
  const { t } = useTranslation('transaction');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const transaction = useAppSelector(selectOrder);
  const loading = useAppSelector(selectProductsDataLoaded);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  let formattedStr = 'sometime';
  if (transaction) {
    const dateObj = new Date(transaction.dateTime);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    formattedStr = `${day}. ${month}. ${year}`;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {user && transaction && transaction?.user._id === user._id ? (
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
              <Link className={cls.historyBtn} href={'/orders/history'}>{t('purchaseHistory')}</Link>
            </div>
          </section>
        </div>
      ) : (
        <NotFound404 />
      )}
    </>
  );
};

export default Transaction;
