import React from 'react';
import ProductsAll from '@/features/products/ProductsAll';
import { wrapper } from '@/store/store';
import { fetchProductsByCategory } from '@/features/products/productsThunk';
import { useAppSelector } from '@/store/hook';
import { selectTotalPages } from '@/features/products/productsSlice';
import { IQueryObjectCategory } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Pagination from '@/components/UI/pagination/Pagination';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import axiosApi from '@/axiosApi';
import { selectCategories } from '@/features/categories/categoriesSlice';

const ProductByCategoryPage = () => {
  const router = useRouter();
  const categories = useAppSelector(selectCategories);
  const category = categories.find((obj) => obj._id === router.query.cId);

  const totalPagesState = useAppSelector(selectTotalPages);

  return (
    <>
      <ProductsAll pageName={category?.title} />
      {totalPagesState > 0 ? (
        <Pagination
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, query }) => {
      axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';

      await store.dispatch(fetchCategories());

      const idOfCategory = query.cId as string;
      const pageNumber = query.cPage as string;

      if (idOfCategory && pageNumber) {
        const iQueryObjectCategory: IQueryObjectCategory = {
          categoryId: idOfCategory,
          categoryPage: pageNumber,
        };

        await store.dispatch(fetchProductsByCategory(iQueryObjectCategory));
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
