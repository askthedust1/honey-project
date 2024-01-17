import React from 'react';
import { useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import axiosApi from '@/axiosApi';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import {
  fetchProductsByCategory,
  fetchProductsByCategoryFiler,
} from '@/features/products/productsThunk';
import { selectTotalPages } from '@/features/products/productsSlice';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import Pagination from '@/components/UI/pagination/Pagination';
import { selectCategories } from '@/features/categories/categoriesSlice';
import ProductsAll from '@/components/ProductsAll/ProductsAll';
import { MyPage } from '@/components/common/types';
import { IQueryObjectCategory, IQueryObjectCategoryFilter } from '@/types';

const ProductByCategoryPage: MyPage = () => {
  const router = useRouter();
  const categories = useAppSelector(selectCategories);
  const category = categories.find((obj) => obj._id === router.query.cId);

  const totalPagesState = useAppSelector(selectTotalPages);
  const sort = router.query.sort as string;

  return (
    <>
      <div>
        <Head>
          <title>{category?.title}</title>
          <meta name="keywords" content={category?.title} />
        </Head>
      </div>
      <ProductsAll pageName={category?.title} id={category?._id} />
      {totalPagesState > 0 ? (
        <Pagination
          sort={sort}
          productsActive={false}
          categoriesActive={true}
          idCategory={String(router.query.cId)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

ProductByCategoryPage.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, query }) => {
      const lang = locale ?? 'ru';
      axiosApi.defaults.headers.common['Accept-Language'] = lang;

      await store.dispatch(fetchCategories(lang));

      const idOfCategory = query.cId as string;
      const pageNumber = query.cPage as string;
      const sort = query.sort as string;

      console.log('categ' + ' ' + sort);

      if (idOfCategory && pageNumber) {
        const iQueryObjectCategory: IQueryObjectCategory = {
          categoryId: idOfCategory,
          categoryPage: pageNumber,
        };
        await store.dispatch(
          fetchProductsByCategory({ query: iQueryObjectCategory, locale: lang }),
        );
      }

      if (idOfCategory && pageNumber && sort) {
        const iQueryObjectCategory: IQueryObjectCategoryFilter = {
          categoryId: idOfCategory,
          categoryPage: pageNumber,
          sort: sort,
        };
        await store.dispatch(
          fetchProductsByCategoryFiler({ query: iQueryObjectCategory, locale: lang }),
        );
      }

      return {
        props: {
          name: 'Products',
          ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
        },
      };
    },
);

export default ProductByCategoryPage;
