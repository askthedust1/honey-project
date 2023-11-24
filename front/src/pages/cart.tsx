import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectCart } from '@/features/cart/cartSlice';
import cls from './../styles/cart.module.scss';
import { ICart } from '@/types';
import CartItem from '@/components/CartItem/CartItem';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Cart = () => {
  const [isClient, setIsClient] = useState(false);

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

  return (
    <>
      {isClient ? (
        <div>
          <section></section>
          <div className={cls.container}>
            <div className={cls.head}>
              <div className={cls.headTd}></div>
              <p className={cls.headProd}>Товар</p>
              <p className={cls.headAmount}>Количество</p>
              <p className={cls.headTotal}>Сумма</p>
            </div>

            <section className={cls.container1}>
              <ul className={cls.ul + ' ' + cls.products}>
                {cart.map((prod: ICart) => (
                  <CartItem item={prod} key={prod.product._id} />
                ))}
              </ul>
            </section>

            <section className={cls.container2}>
              <div className={cls.summary}>
                <div className={cls.total}>Итого: {getTotalPrice()}</div>
              </div>

              <div className={cls.checkout}>
                <button className={cls.btn} type="button">
                  Оформить заказ
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer'])),
    },
  };
});

export default Cart;
