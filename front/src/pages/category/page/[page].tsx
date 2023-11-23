import React from 'react';
import ProductsAll from "@/features/products/ProductsAll";
import {wrapper} from "@/store/store";
import {fetchProductsByCategory} from "@/features/products/productsThunk";
import {useAppSelector} from "@/store/hook";
import {selectTotalPages} from "@/features/products/productsSlice";
import {IQueryObjectCategory} from "@/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import Pagination from "@/components/UI/pagination/Pagination";
import {fetchCategories} from "@/features/categories/categoriesThunk";


const ProductByCategoryPage = () => {
  const router = useRouter();

  const totalPagesState = useAppSelector(selectTotalPages);

  return (
    <>
      <ProductsAll />
      {totalPagesState > 0 ? <Pagination productsActive={false} categoriesActive={true} idCategory={String(router.query.cId)}/> : <></>}

    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  await store.dispatch(fetchCategories());

  const idOfCategory = context.query.cId as string;
  const pageNumber = context.query.cPage as string;

  const { locale } = context;

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
});

export default ProductByCategoryPage;
