import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectCart } from '@/features/cart/cartSlice';
import cls from './../styles/cart.module.scss';
import { ICart } from '@/types';
import CartItem from '@/components/CartItem/CartItem';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MyPage } from '@/components/common/types';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

  return (
    <>
      {isClient ? (
        <div className={cls.container}>
          <section className={cls.titleContainer}>
            <h3>Корзина</h3>
            <div className={cls.return}>
              <Link href={'/products/page/1'}>Вернуться в магазин</Link>
            </div>
          </section>
          <section className={cls.contentContainer}>
            {cart.length ? (
              <div className={cls.table}>
                <table>
                  <thead>
                    <tr>
                      <th className={cls.productHead}>Товар</th>
                      <th>Количество</th>
                      <th>Цена</th>
                      <th>Сумма</th>
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
                <span>Тут пусто</span>
              </div>
            )}

            <div className={cls.orderInfo}>
              <h4>Сумма заказа</h4>
              <div className={cls.item}>
                <span>Цена</span>
                <span>{getTotalPrice()} сом</span>
              </div>
              <div className={cls.item}>
                <span>Скидка</span>
                <span>0</span>
              </div>
              <div className={cls.item}>
                <span>Доставка</span>
                <span className={cls.free}>бесплатно</span>
              </div>
              <div className={cls.total}>
                <span>итого</span>
                <span className={cls.total_price}>{getTotalPrice()} сом</span>
              </div>
              <div>
                {cart.length ? (
                  <button onClick={handlePageChange} className={cls.orderConfirm}>
                    Оформить заказ
                  </button>
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
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer'])),
    },
  };
});

export default Cart;
