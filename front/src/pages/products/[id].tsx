import React from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useAppSelector } from '@/store/hook';
import { wrapper } from '@/store/store';
import { getProduct } from '@/features/products/productsThunk';
import { selectOneProduct } from '@/features/products/productsSlice';

const Product: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const product = useAppSelector(selectOneProduct);
  return product ? <div>{product.title}</div> : <div>One product</div>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const id = params?.id;
  if (!id || Array.isArray(id)) {
    throw new Error('Param id must be a string');
  }

  await store.dispatch(getProduct(id));
  return { props: {} };
});

export default Product;
