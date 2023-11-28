import React from 'react';
import ProductsAll from '@/features/products/ProductsAll';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunk';
import Pagination from '@/components/UI/pagination/Pagination';
import { useAppSelector } from '@/store/hook';
import { selectTotalPages } from '@/features/products/productsSlice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { addToCartState, setProductsDataLoaded } from '@/features/cart/cartSlice';

const ProductPage = () => {
  const totalPagesState = useAppSelector(selectTotalPages);

  return (
    <>
      <ProductsAll />
      {totalPagesState > 0 ? <Pagination productsActive={true} categoriesActive={false} /> : <></>}
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const currentPage = context.params?.page;

  const cookies = context.req.headers.cookie;
  const { locale } = context;
  await store.dispatch(fetchCategories({ lang: locale }));
  const productsDataLoaded = store.getState().cart.dataLoaded;

  if (cookies && !productsDataLoaded) {
    const userId = cookies.split(';').find((cookie) => cookie.startsWith('userId'));
    if (userId) {
      console.log(`Наш userId раен: ${userId}`);
    }
    const cartDataCookie = cookies.split('; ').find((cookie) => cookie.startsWith('cart-'));

    if (cartDataCookie) {
      const cartData = cartDataCookie.split('=')[1];
      try {
        const decodedCartData = decodeURIComponent(cartData);
        const cartItems = JSON.parse(decodedCartData);
        console.log(`Наш cartData равен ${decodedCartData}`);
        console.log(`Наш cartItems равен ${cartItems}`);
        const parsedCart = JSON.parse(decodedCartData);

        if (parsedCart && parsedCart.length > 0) {
          for (let i = 0; i < parsedCart.length; i++) {
            store.dispatch(addToCartState(parsedCart[i]));
          }
        }
        store.dispatch(setProductsDataLoaded(true));
      } catch (error) {
        console.error('Ошибка при парсинге JSON из кук:', error);
      }
    }
  }

  await store.dispatch(fetchProducts(currentPage as string));
  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});

export default ProductPage;
