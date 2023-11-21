import React from 'react';
import { useAppSelector } from '@/store/hook';
import { selectCart } from '@/features/cart/cartSlice';
import cls from './../styles/cart.module.scss';
import { ICart } from '@/types';
import CartItem from '@/components/CartItem/CartItem';

const Cart = () => {
  const cart = useAppSelector(selectCart);

  const getTotalPrice = () => {
    return cart.reduce((total: number, item: ICart) => {
      const { product, amount } = item;
      return total + product.price * amount;
    }, 0);
  };

  return (
    <div>
      <header className={cls.container}>
        <h1>Shopping Cart</h1>

        <ul className={cls.breadcrumb}>
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>
      </header>

      <section className={cls.container}>
        <ul className={cls.ul + ' ' + cls.products}>
          {cart.map((prod: ICart) => (
            <CartItem item={prod} key={prod.product._id} />
          ))}
        </ul>
      </section>

      <section className={cls.container}>
        <div className={cls.summary}>
          <ul className={cls.ul}>
            <li className={cls.total}>Total Price: {getTotalPrice()}</li>
          </ul>
        </div>

        <div className={cls.checkout}>
          <button className={cls.btn} type="button">
            Check Out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
