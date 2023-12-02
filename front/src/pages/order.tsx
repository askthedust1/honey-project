import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { resetCart, selectCart } from '@/features/cart/cartSlice';
import { ICart } from '@/types';
import cls from '@/styles/cart.module.scss';
import OrderItem from '@/components/Order/OrderItem';
import { selectUser } from '@/features/users/usersSlice';
import { createOrder } from '@/features/order/orderThunk';
import { changeDate } from '@/features/order/orderSlice';
import acc from '@/components/reg&logForms/form.module.scss';

const Order = () => {
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useState({
    address: '',
  });

  const router = useRouter();
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsClient(true);
    // if (!cart) {
    //   router.push(`/products/page/1`);
    // }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total: number, item: ICart) => {
      const { product, amount } = item;
      return total + product.actualPrice * amount;
    }, 0);
  };

  const fullOrderArr = cart.map((item) => {
    return {
      product: item.product._id,
      amount: item.amount,
    };
  });
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // console.log(state);
      const fullOrder = {
        kits: fullOrderArr,
        address: state.address ? state.address : 'defaultAddress',
        dateTime: new Date().toISOString(),
      };
      dispatch(changeDate(fullOrder.dateTime));
      await dispatch(createOrder(fullOrder));
      dispatch(resetCart());
      router.push(`/transaction`);
    } catch (e) {
      // nothing
      // throw e;
      console.log(e);
    }
  };

  return (
    <>
      {isClient && user ? (
        <div>
          <section></section>
          <div className={cls.container}>
            <h1>Данные заказа </h1>
            <div>Покупатель: {user.email}</div>
            <div>Контакты: {user.phone}</div>
            <div>Адрес покупателя: {user.address}</div>
            <ul>
              {cart.map((prod: ICart) => (
                <OrderItem item={prod} key={prod.product._id} />
              ))}
            </ul>
            <div>Итого: {getTotalPrice()} KGS</div>
            <form className={acc.form} onSubmit={submitFormHandler}>
              <div>
                <label htmlFor="address">Адрес*</label>
                <input
                  onChange={inputChangeHandler}
                  type="text"
                  name="address"
                  placeholder="Address"
                />
              </div>

              <div className={acc.footer}>
                <button type="submit" className={acc.btn}>
                  Отправить заказ
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>FREE</div>
      )}
    </>
  );
};

export default Order;

Order.Layout = 'Main';
