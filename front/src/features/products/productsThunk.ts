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

export const getProduct = createAsyncThunk<IProductView, { id: string; locale: string }>(
  'products/getOne',
  async (query) => {
    const response = await axiosApi<IProductView>(`/products/${query.id}`);
    return useProductTranslation(response.data, query.locale);
  },
);
