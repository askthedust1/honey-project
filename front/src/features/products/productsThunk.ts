import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IProduct, IProductsOfPage, IProductView, IQueryObjectCategory } from '@/types';
import { useProductsTranslation, useProductTranslation } from '@/features/products/productHook';

export const fetchProducts = createAsyncThunk<IProductsOfPage, { query: string; locale: string }>(
  'products/fetchAll',
  async (query) => {
    const productsResponse = await axiosApi.get<IProductsOfPage>(`/products?page=${query.query}`);
    const { productsOfPage, totalPages, currentPage } = productsResponse.data;
    return {
      productsOfPage: useProductsTranslation(productsOfPage, query.locale),
      totalPages,
      currentPage,
    };
  },
);

export const fetchProductsByCategory = createAsyncThunk<
  IProductsOfPage,
  {
    query: IQueryObjectCategory;
    locale: string;
  }
>('products/fetchByCategory', async (query) => {
  const productsResponse = await axiosApi.get<IProductsOfPage>(
    `/products?categoryId=${query.query.categoryId}&categoryPage=${query.query.categoryPage}`,
  );
  const { productsOfPage, totalPages, currentPage } = productsResponse.data;
  return {
    productsOfPage: useProductsTranslation(productsOfPage, query.locale),
    totalPages,
    currentPage,
  };
});

export const fetchBestsellers = createAsyncThunk<IProduct[], { type: string; locale: string }>(
  'products/fetchByFilter',
  async (query) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/products?filterBy=${query.type}`);
    return useProductsTranslation(productsResponse.data, query.locale);
  },
);

export const getProduct = createAsyncThunk(
  'products/getOne',
  async (query: { id: string; locale: string }) => {
    const [productResponse, relatedProductsResponse] = await Promise.all([
      axiosApi<IProductView>(`/products/${query.id}`),
      axiosApi<IProduct[]>(`/products/${query.id}/relatedProducts`),
    ]);

    const product = useProductTranslation(productResponse.data, query.locale);
    const relatedProductsOne = useProductsTranslation(relatedProductsResponse.data, query.locale);

    return { oneProduct: product, relatedProducts: relatedProductsOne };
  },
);
