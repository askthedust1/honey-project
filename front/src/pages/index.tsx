import HomePage from '@/components/home/HomePage';
import CategoriesList from '@/components/UI/categories/CategoriesList';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import BenefitsOfHoney from '@/components/home/benefitsOfHoney/BenefitsOfHoney';
import Bestseller from '@/components/home/bestseller/Bestseller';
import React, { useEffect } from 'react';
import { fetchBanners } from '@/features/banners/bannersThunk';
import axiosApi from '@/axiosApi';
import { fetchBestsellers } from '@/features/products/productsThunk';
import { MyPage } from '@/components/common/types';
import Mission from '@/components/home/mission/Mission';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const Home: MyPage = () => {
  const { t } = useTranslation('header');
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    return () => {
      firstScriptTag.parentNode?.removeChild(tag);
    };
  }, []);

  return (
    <>
      <main>
        <Head>
          <title>{t('home')}</title>
          <meta name="description" content="Описание страницы" />
          <meta name="keywords" content="мёд, мед бишкек, Мед купить" />
        </Head>
        <HomePage />
        <Mission />
        <Bestseller />
        <CategoriesList />
        <BenefitsOfHoney />
      </main>
    </>
  );
};

Home.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  await store.dispatch(fetchBanners());
  await store.dispatch(
    fetchBestsellers({
      locale: lang,
      type: 'hit',
    }),
  );

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', [
        'common',
        'home',
        'header',
        'footer',
        'mission',
      ])),
    },
  };
});

export default Home;
