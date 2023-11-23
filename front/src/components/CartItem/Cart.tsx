import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { generateUserId } from '@/helpers';
import Cookies from 'js-cookie';
import {
  addToCartState,
  selectCartItems,
  selectProductsDataLoaded,
  setProductsDataLoaded,
} from '@/features/cart/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const userId = Cookies.get('userId') || generateUserId();
  const cartCookieKey = `cart-${userId}`;
  const productsDataLoaded = useAppSelector(selectProductsDataLoaded);

  if (!Cookies.get('userId')) {
    Cookies.set('userId', userId, { expires: 7 });
  }

  const cartItems = useAppSelector(selectCartItems);
  const cartItemsString = JSON.stringify(cartItems);

  useEffect(() => {
    // Запуск эффекта только на клиенте
    if (typeof window !== 'undefined' && !productsDataLoaded) {
      const cartFromCookies = Cookies.get(cartCookieKey);

      if (cartFromCookies) {
        const parsedCart = JSON.parse(cartFromCookies);

        if (parsedCart && parsedCart.length > 0) {
          for (let i = 0; i < parsedCart.length; i++) {
            dispatch(addToCartState(parsedCart[i]));
          }
        }
      }
      dispatch(setProductsDataLoaded(true));
    }
  }, [dispatch, productsDataLoaded]);

  useEffect(() => {
    // Сохранить данные корзины в куки при каждом изменении cartItems
    try {
      Cookies.remove(cartCookieKey);
      Cookies.set(cartCookieKey, JSON.stringify(cartItems), { expires: 7 });
    } catch (error) {
      console.error('Ошибка при сохранении данных в cookies:', error);
    }
  }, [cartItems, cartCookieKey]);

  return <span>{cartItems.length}</span>;
};

export default Cart;
