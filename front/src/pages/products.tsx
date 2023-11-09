import React from 'react';
import ProductsAll from '@/features/products/ProductsAll';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunk';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/UI/header/Header';
import Footer from '@/components/UI/footer/Footer';

const Products = () => {
  return (
    <>
      <Header />
      <ProductsAll />
      <Footer />
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  await store.dispatch(fetchProducts());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});
export default Products;
