import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IProduct, IProductsOfPage, IProductView, IQueryObjectCategory } from '@/types';
import { useProductsTranslation, useProductTranslation } from '@/features/products/productHook';

export const fetchProducts = createAsyncThunk<IProductsOfPage, string>(
  'products/fetchAll',
  async (query) => {
    const productsResponse = await axiosApi.get<IProductsOfPage>(`/products?page=${query}`);
    const { productsOfPage, totalPages, currentPage } = productsResponse.data;
    return {
      productsOfPage: useProductsTranslation(productsOfPage, 'kg'),
      totalPages,
      currentPage,
    };
  },
);

export const fetchProductsByCategory = createAsyncThunk<IProductsOfPage, IQueryObjectCategory>(
  'products/fetchByCategory',
  async (query) => {
    const productsResponse = await axiosApi.get<IProductsOfPage>(
      `/products?categoryId=${query.categoryId}&categoryPage=${query.categoryPage}`,
    );
    const { productsOfPage, totalPages, currentPage } = productsResponse.data;
    return {
      productsOfPage: useProductsTranslation(productsOfPage, 'kg'),
      totalPages,
      currentPage,
    };
  },
);

export const fetchBestsellers = createAsyncThunk<IProduct[], string>(
  'products/fetchByFilter',
  async (query) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/products?filterBy=${query}`);
    return useProductsTranslation(productsResponse.data, 'kg');
  },
);

export const getProduct = createAsyncThunk<IProductView, string>(
  'products/getOne',
  async (id: string) => {
    const response = await axiosApi<IProductView>(`/products/${id}`);
    return useProductTranslation(response.data, 'ru');
  },
);
