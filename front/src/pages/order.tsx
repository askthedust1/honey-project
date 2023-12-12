import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { resetCart, selectCart } from '@/features/cart/cartSlice';
import { ICart } from '@/types';
import cls from '@/styles/order.module.scss';
import OrderItem from '@/components/Order/OrderItem';
import { selectUser } from '@/features/users/usersSlice';
import { createOrder } from '@/features/order/orderThunk';
import NotFound404 from '@/components/UI/notFound404/NotFound404';
import { changeDate } from '@/features/order/orderSlice';
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {wrapper} from "@/store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {MyPage} from "@/components/common/types";

const Order: MyPage = () => {
  const {t} = useTranslation('order');
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
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total: number, item: ICart) => {
      const {product, amount} = item;
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
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const fullOrder = {
        kits: fullOrderArr,
        address: state.address ? state.address : 'defaultAddress',
        dateTime: new Date().toISOString(),
      };
      dispatch(changeDate(fullOrder.dateTime));
      await dispatch(createOrder(fullOrder));
      dispatch(resetCart());
      await router.push(`/transaction`);
    } catch (e) {
      console.log(e);
    }
  };
  const [choice, setChoice] = useState<boolean>(false);
  const changeSelection = () => {
    setChoice(!choice);
  };

  if (cart.length === 0) {
    return <NotFound404 />;
  }

  return (
      <>
        {isClient && user ? (
            <div className={cls.container}>
              <section className={cls.title}>
                <h3>{t('basket')}</h3>
                <div className={cls.return}>
                  <Link href={'/cart'}>{t('returnToStore')}</Link>
                </div>
              </section>
              <section className={cls.order}>
                <form onSubmit={submitFormHandler} className={cls.order_leftBlock}>
                  <div className={cls.order_leftBlock_item}>
                    <h4>{t('deliveryAddress')}:</h4>
                    <span className={cls.addressTitle}>{t('addressDetails')}</span>
                    <input onChange={inputChangeHandler} type="text" name="address" placeholder={t('yourAddress')}/>
                  </div>
                  <div className={cls.order_leftBlock_item}>
                    <h4>{t('selectPaymentMethod')}:</h4>
                    <div className={cls.choice}>
                      <strong
                          className={choice ? cls.selected : cls.notSelected}
                          onClick={changeSelection}
                      >{t('cashPayment')}</strong>
                      <span>{t('paymentOptions')}</span>
                      <strong
                          className={!choice ? cls.selected : cls.notSelected}
                          onClick={changeSelection}
                      >{t('cardPayment')}</strong>
                      <span>{t('paymentOptions')}</span>
                    </div>
                  </div>
                  <div className={`${cls.order_leftBlock_item} ${cls.client}`}
                  >
                    <div>
                      <h4>{t('contactInformation')}</h4>
                      <div className={cls.clientInfo}>
                        <span className={cls.name}>{t('clientNameLabel')}:</span><span>{user.displayName}</span>
                      </div>
                      <div className={cls.clientInfo}>
                        <span className={cls.name}>{t('phoneNumberLabel')}:</span><span>{user.phone}</span>
                      </div>
                      <div className={cls.clientInfo}>
                        <span className={cls.name}>{t('emailLabel')}:</span><span>{user.email}</span>
                      </div>
                    </div>
                    <button type={"submit"} className={cls.btnBuy}>{t('buy')}</button>
                  </div>
                </form>

                <div className={cls.order_info}>
                  <h4>{t('orderTitle')}</h4>
                  <ul>
                    {cart.map((prod: ICart) => (
                        <OrderItem item={prod} key={prod.product._id}/>
                    ))}
                  </ul>
                  <div className={cls.item}>
                    <span>{t('priceLabel')}</span><span>{getTotalPrice()} сом</span>
                  </div>
                  <div className={cls.item}>
                    <span>{t('discountLabel')}</span><span>0</span>
                  </div>
                  <div className={cls.item}>
                    <span>{t('deliveryLabel')}</span><span className={cls.free}>{t('deliveryValue')}</span>
                  </div>
                  <div className={cls.total}>
                    <span>{t('totalLabel')}</span><span className={cls.total_price}>{getTotalPrice()} сом</span>
                  </div>
                </div>
              </section>
            </div>
        ) : (
            <NotFound404 />
        )}
      </>
  );
};

export default Order;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer', 'order'])),
    },
  };
});

Order.Layout = 'Main';
