import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectCart } from '@/features/cart/cartSlice';
import cls from '../styles/_cart.module.scss';
import { ICart } from '@/types';
import CartItem from '@/components/CartItem/CartItem';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MyPage } from '@/components/common/types';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import Head from 'next/head';
import axiosApi from '@/axiosApi';
import { fetchCategories } from '@/features/categories/categoriesThunk';

const Cart: MyPage = () => {
  const [isClient, setIsClient] = useState(false);
  const userState = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cart = useAppSelector(selectCart);

  const getTotalPrice = () => {
    return cart.reduce((total: number, item: ICart) => {
      const { product, amount } = item;
      return total + product.actualPrice * amount;
    }, 0);
  };

  const handlePageChange = () => {
    if (cart.length) userState ? router.push('/order') : router.push('/accounts');
  };
  const { t } = useTranslation('cart');
  return (
    <>
      {isClient ? (
        <div className={cls.container}>
          <div>
            <Head>
              <title>{t('basket')}</title>
            </Head>
          </div>
          <section className={cls.titleContainer}>
            <h3>{t('basket')}</h3>
            <div className={cls.return}>
              <Link href={'/products/page/1'}>{t('returnToStore')}</Link>
            </div>
          </section>
          <section className={cls.contentContainer}>
            {cart.length ? (
              <div className={cls.table}>
                <table>
                  <thead>
                    <tr>
                      <th className={cls.productHead}>{t('product')}</th>
                      <th>{t('quantity')}</th>
                      <th className={cls.priceHead}>{t('price')}</th>
                      <th>{t('total')}</th>
                      <th className={cls.deleteMobileContainer}></th>
                    </tr>
                  </thead>
                  <tbody className={cls.tableBodyBlock}>
                    {cart.map((prod: ICart) => (
                      <CartItem item={prod} key={prod.product._id} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={cls.nullOrder}>
                <span>{t('empty')}</span>
              </div>
            )}

            <div className={cls.orderInfo}>
              <h4>{t('orderTotal')}</h4>
              <div className={cls.item}>
                <span>{t('price')}</span>
                <span>{getTotalPrice()} сом</span>
              </div>
              <div className={cls.item}>
                <span>{t('delivery')}</span>
                <span className={cls.free}>{t('free')}</span>
              </div>
              <div className={cls.total}>
                <span>{t('totalAmount')}</span>
                <span className={cls.total_price}>
                  {getTotalPrice()} {t('som')}
                </span>
              </div>
              <div>
                {cart.length ? (
                  <ButtonUi
                    event={() => handlePageChange()}
                    text={t('checkout')}
                    type="button"
                    btn={cls.orderConfirm}
                  />
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

Cart.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer', 'cart'])),
    },
  };
});

export default Cart;
