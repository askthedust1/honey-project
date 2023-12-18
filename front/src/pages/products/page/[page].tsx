import React from 'react';
import ProductsAll from '@/features/products/ProductsAll';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunk';
import Pagination from '@/components/UI/pagination/Pagination';
import { useAppSelector } from '@/store/hook';
import { selectTotalPages } from '@/features/products/productsSlice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { MyPage } from '@/components/common/types';
import axiosApi from '@/axiosApi';

const ProductPage: MyPage = () => {
  const totalPagesState = useAppSelector(selectTotalPages);

  return (
    <>
      <ProductsAll />
      {totalPagesState > 0 ? <Pagination productsActive={true} categoriesActive={false} /> : <></>}
    </>
  );
};

ProductPage.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const currentPage = context.params?.page;

  const { locale } = context;
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;
  await store.dispatch(fetchCategories(lang));

  await store.dispatch(fetchProducts({ query: currentPage as string, locale: lang }));
  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});

export default ProductPage;
