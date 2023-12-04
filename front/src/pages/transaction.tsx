import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/users/usersSlice';
import cls from '@/styles/cart.module.scss';
import { fetchOrder } from '@/features/order/orderThunk';
import { selectDateOrder, selectOrder } from '@/features/order/orderSlice';
import TransactionItem from '@/components/Order/TransactionItem';
import Cookies from 'js-cookie';

const Transaction = () => {
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
  console.log(transaction);

  return (
    <>
      {isClient && user && transaction ? (
        <div>
          <section></section>
          <div className={cls.container}>
            <h1>Данный заказ принят: </h1>
            <div>Покупатель: {user.email}</div>
            <div>Контакты: {user.phone}</div>
            <div>Адрес заказа: {transaction?.address}</div>
            <ul>
              {transaction?.kits.map((prod) => (
                <TransactionItem item={prod} key={prod.product._id} />
              ))}
            </ul>
            <div>Сумма заказа: {transaction?.totalPrice}</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Transaction;
Transaction.Layout = 'Main';
