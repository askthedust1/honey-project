import React from 'react';
import ProductsAll from '@/features/products/ProductsAll';
import { wrapper } from '@/store/store';
import {fetchProducts, fetchProductsPromotion} from '@/features/products/productsThunk';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { MyPage } from '@/components/common/types';
import axiosApi from '@/axiosApi';
import Pagination from '@/components/UI/pagination/Pagination';
import { useAppSelector } from '@/store/hook';
import { selectTotalPages } from '@/features/products/productsSlice';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const ProductPage: MyPage = () => {
  const totalPagesState = useAppSelector(selectTotalPages);
  const { t } = useTranslation('common');
  return (
    <>
      <div>
        <Head>
          <title>{t('products')}</title>
          <meta name="description" content="Вся продукция" />
          <meta name="keywords" content="мед, сухофрукты, лечебные травы и сборы" />
        </Head>
      </div>
      <ProductsAll />
      {totalPagesState > 0 ? <Pagination productsActive={true} categoriesActive={false} /> : <></>}
    </>
  );
};

ProductPage.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  const currentPage = query.page as string;
  const promotion = query.promotion as string;

  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;
  await store.dispatch(fetchCategories(lang));
  !promotion ? await store.dispatch(fetchProducts({ query: currentPage as string, locale: lang }))
      :
      await store.dispatch(fetchProductsPromotion({ query: currentPage as string, locale: lang }));
  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});

export default ProductPage;
