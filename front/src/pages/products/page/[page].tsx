import React from 'react';
import ProductsAll from '@/features/products/ProductsAll';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunk';
import Pagination from '@/components/UI/pagination/Pagination';
import { useAppSelector } from '@/store/hook';
import { selectTotalPages } from '@/features/products/productsSlice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {fetchCategories} from "@/features/categories/categoriesThunk";

const ProductPage = () => {
  const totalPagesState = useAppSelector(selectTotalPages);

  return (
    <>
      <ProductsAll />
      {totalPagesState > 0 ? <Pagination productsActive={true} categoriesActive={false}/> : <></>}
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(fetchCategories());

  const currentPage = context.params?.page;
  const { locale } = context;

  await store.dispatch(fetchProducts(currentPage as string));
  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});

export default ProductPage;
