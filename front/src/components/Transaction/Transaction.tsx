import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { fetchOrder } from '@/features/order/orderThunk';
import { selectOrder, selectOrderLoading } from '@/features/order/orderSlice';
import { selectUser } from '@/features/users/usersSlice';
import TransactionItem from '@/components/Order/TransactionItem';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import Loading from '@/components/UI/loading/loading';
import cls from '@/styles/_transaction.module.scss';

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
    if (!loading) {
      if (!transaction) {
        void router.push('/');
      }
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {transaction && user && !loading ? (
        <div className={cls.container}>
          <Head>
            <title>{t('basket')}</title>
            <meta name="description" content="Описание страницы" />
          </Head>
          <section className={cls.title}>
            <h3>{t('basket')}</h3>
            <div className={cls.return}>
              <Link href={'/products/page/1'}>{t('returnToStore')}</Link>
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
                  <span>{transaction?.payment}</span>
                </div>
              </div>
              <ButtonUi btn={cls.historyBtn} text={t('purchaseHistory')} link={'/orders/history'} />
            </div>
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Transaction;
