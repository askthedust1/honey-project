import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import axiosApi from '@/axiosApi';
import { wrapper } from '@/store/store';
import { resetCart, selectCart } from '@/features/cart/cartSlice';
import { selectUser } from '@/features/users/usersSlice';
import { createOrder } from '@/features/order/orderThunk';
import { changeDate } from '@/features/order/orderSlice';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import OrderItem from '@/components/Order/OrderItem';
import { MyPage } from '@/components/common/types';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import Loading from '@/components/UI/loading/loading';
import { ICart } from '@/types';
import cls from '@/styles/_order.module.scss';

const Order: MyPage = () => {
  const router = useRouter();
  const { t } = useTranslation('order');
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useState({
    address: '',
    payment: 'Картой',
  });
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setLoading(false);
    if ((!user && !loading) || (!cart.length && !loading)) {
      router.push('/').then((r) => console.log(r));
    }
  }, [loading, router, user, cart.length]);

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

    if (value.trim().length === 0 && value.length > 0) {
      setError(true);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (state.address.length) {
      try {
        const fullOrder = {
          kits: fullOrderArr,
          address: state.address ? state.address : 'defaultAddress',
          dateTime: new Date().toISOString(),
          payment: state.payment,
        };
        dispatch(changeDate(fullOrder.dateTime));
        await dispatch(createOrder(fullOrder));
        await router.push(`/transaction`);
        dispatch(resetCart());
      } catch (e) {
        console.log(e);
      }
    }
  };
  const [choice, setChoice] = useState<boolean>(false);
  const changeSelection = (paymentMethod: string) => {
    setChoice(!choice);
    setState((prevState) => ({
      ...prevState,
      payment: paymentMethod,
    }));
  };

  if (cart.length === 0) {
    return <Loading />;
  }

  return (
    <>
      {isClient && user && !loading ? (
        <div className={cls.container}>
          <div>
            <Head>
              <title>{t('basket')}</title>
              <meta name="description" content="Корзина с товарами" />
            </Head>
          </div>

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
                <input
                  onChange={inputChangeHandler}
                  required={true}
                  type="text"
                  name="address"
                  placeholder={t('yourAddress')}
                />
                {error && <div className={cls.requiredAddress}>{t('requiredAddress')}</div>}
              </div>
              <div className={cls.order_leftBlock_item}>
                <h4>{t('selectPaymentMethod')}:</h4>
                <div className={cls.choice}>
                  <strong
                    className={choice ? cls.selected : cls.notSelected}
                    onClick={() => changeSelection('Наличными')}
                  >
                    {t('cashPayment')}
                  </strong>
                  <span>{t('payment')}</span>
                  <strong
                    className={!choice ? cls.selected : cls.notSelected}
                    onClick={() => changeSelection('Картой')}
                  >
                    {t('cardPayment')}
                  </strong>
                  <span>{t('paymentOptions')}</span>
                </div>
              </div>
              <div className={`${cls.order_leftBlock_item} ${cls.client}`}>
                <div>
                  <h4>{t('contactInformation')}</h4>
                  <div className={cls.clientInfo}>
                    <span className={cls.name}>{t('clientNameLabel')}:</span>
                    <span>{user.displayName}</span>
                  </div>
                  <div className={cls.clientInfo}>
                    <span className={cls.name}>{t('phoneNumberLabel')}:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className={cls.clientInfo}>
                    <span className={cls.name}>{t('emailLabel')}:</span>
                    <span>{user.email}</span>
                  </div>
                </div>
                <ButtonUi text={t('buy')} type={'submit'} btn={cls.btnBuy} />
              </div>
            </form>

            <div className={cls.order_info}>
              <h4>{t('orderTitle')}</h4>
              <ul>
                {cart.map((prod: ICart) => (
                  <OrderItem item={prod} key={prod.product._id} />
                ))}
              </ul>
              <div className={cls.item}>
                <span>{t('priceLabel')}</span>
                <span>{getTotalPrice()} сом</span>
              </div>
              <div className={cls.item}>
                <span>{t('deliveryLabel')}</span>
                <span className={cls.free}>{t('deliveryValue')}</span>
              </div>
              <div className={cls.total}>
                <span>{t('totalLabel')}</span>
                <span className={cls.total_price}>{getTotalPrice()} сом</span>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Order;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer', 'order'])),
    },
  };
});

Order.Layout = 'Main';
