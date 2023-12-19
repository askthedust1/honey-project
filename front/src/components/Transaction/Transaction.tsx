import React, { useEffect } from 'react';
import cls from '@/styles/transaction.module.scss';
import Link from 'next/link';
import TransactionItem from '@/components/Order/TransactionItem';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectOrder, selectOrderLoading } from '@/features/order/orderSlice';
import { selectUser } from '@/features/users/usersSlice';
import { fetchOrder } from '@/features/order/orderThunk';
import { useRouter } from 'next/router';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';

const Transaction = () => {
  const { t } = useTranslation('transaction');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const transaction = useAppSelector(selectOrder);
  const loading = useAppSelector(selectOrderLoading);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !user && !transaction) {
      router.push('/');
    } else if (!loading && user && transaction && transaction.user._id !== user._id) {
      router.push('/');
    }
  }, [loading, router, transaction, user]);

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
      {user && transaction && transaction.user && transaction.user._id === user._id ? (
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
              <ButtonUi btn={cls.historyBtn} text={t('purchaseHistory')} link={'/orders/history'} />
            </div>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Transaction;
