import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import axiosApi from '@/axiosApi';
import { wrapper } from '@/store/store';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { fetchBanners } from '@/features/banners/bannersThunk';
import { fetchBestsellers } from '@/features/products/productsThunk';
import HomePage from '@/components/home/HomePage';
import CategoriesList from '@/components/UI/categories/CategoriesList';
import BenefitsOfHoney from '@/components/home/benefitsOfHoney/BenefitsOfHoney';
import Bestseller from '@/components/home/bestseller/Bestseller';
import { MyPage } from '@/components/common/types';
import Mission from '@/components/home/mission/Mission';

const Home: MyPage = () => {
  const { t } = useTranslation('header');

  return (
    <>
      <main>
        <Head>
          <title>{t('home')}</title>
          <meta name="description" content="УНИКАЛЬНЫЙ МЕД ИЗ ВЫСОКОГОРНОГО КЫРГЫЗСТАНА" />
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
