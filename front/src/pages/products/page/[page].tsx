import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hook';
import Head from 'next/head';
import axiosApi from '@/axiosApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import {
  fetchProducts,
  fetchProductsFilter,
  fetchProductsPromotion,
  fetchProductsSearch,
} from '@/features/products/productsThunk';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { selectTotalPages } from '@/features/products/productsSlice';
import { MyPage } from '@/components/common/types';
import Pagination from '@/components/UI/pagination/Pagination';
import ProductsAll from '@/components/ProductsAll/ProductsAll';

const ProductPage: MyPage = () => {
  const router = useRouter();
  const totalPagesState = useAppSelector(selectTotalPages);
  const { t } = useTranslation('common');
  const sort = router.query.sort as string;
  const promotion = router.query.promotion as string;
  const search = router.query.q as string;

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
      {totalPagesState > 0 ? (
        <Pagination
          promotion={promotion}
          sort={sort}
          search={search}
          productsActive={true}
          categoriesActive={false}
        />
      ) : (
        <></>
      )}
    </>
  );
};

ProductPage.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, query }) => {
      const currentPage = query.page as string;
      const promotion = query.promotion as string;
      const sort = query.sort as string;
      const search = query.q as string;

      const lang = locale ?? 'ru';
      axiosApi.defaults.headers.common['Accept-Language'] = lang;
      await store.dispatch(fetchCategories(lang));

      if (!promotion && !sort) {
        await store.dispatch(fetchProducts({ query: currentPage as string, locale: lang }));
      }

      if (promotion) {
        await store.dispatch(
          fetchProductsPromotion({ query: currentPage as string, locale: lang }),
        );
      }

      if (sort) {
        const iQueryObject: { sort: string; page: string } = {
          sort: sort,
          page: currentPage,
        };
        await store.dispatch(fetchProductsFilter({ query: iQueryObject, locale: lang }));
      }

      if (search) {
        const iQueryObject: { q: string; page: string } = {
          q: search,
          page: currentPage,
        };
        await store.dispatch(fetchProductsSearch({ query: iQueryObject, locale: lang }));
      }

      return {
        props: {
          name: 'Products',
          ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
        },
      };
    },
);

export default ProductPage;
