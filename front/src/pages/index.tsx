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
import { fetchBestsellers } from '@/features/products/productsThunk';
import { MyPage } from '@/components/common/types';

const Home: MyPage = () => {
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

Home.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';

  await store.dispatch(fetchCategories());
  await store.dispatch(fetchBanners());
  await store.dispatch(fetchBestsellers('hit'));

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'home', 'header', 'footer'])),
    },
  };
});

export default Home;
