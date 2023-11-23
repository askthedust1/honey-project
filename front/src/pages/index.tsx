import HomePage from '@/components/home/HomePage';
import CategoriesList from '@/components/UI/categories/CategoriesList';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import BenefitsOfHoney from '@/components/home/benefitsOfHoney/BenefitsOfHoney';
import Bestseller from '@/components/home/bestseller/Bestseller';
import React from 'react';
import { fetchBanners } from '@/features/banners/bannersThunk';
import axiosApi from '@/axiosApi';

const Home = () => {
  return (
    <>
      <main>
        <HomePage />
        <CategoriesList />
        <Bestseller />
        <BenefitsOfHoney />
      </main>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';

  await store.dispatch(fetchCategories());
  await store.dispatch(fetchBanners());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'home', 'header', 'footer'])),
    },
  };
});

export default Home;
