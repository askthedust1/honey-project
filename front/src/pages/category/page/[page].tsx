import React from 'react';
import ProductsAll from "@/features/products/ProductsAll";
import {wrapper} from "@/store/store";
import {fetchProductsByCategory} from "@/features/products/productsThunk";
import {useAppSelector} from "@/store/hook";
import {selectTotalPages} from "@/features/products/productsSlice";
import {IQueryObjectCategory} from "@/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const ProductByCategoryPage = () => {
  return (
    <>
      <ProductsAll/>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const idOfCategory = context.query.id as string;
  const pageNumber = context.query.page as string;

  const { locale } = context;

  if (idOfCategory && pageNumber) {
    const iQueryObjectCategory: IQueryObjectCategory = {
      categoryId: idOfCategory,
      categoryPage: pageNumber,
    }

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