import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IProduct, IProductsOfPage, IProductView, IQueryObjectCategory } from '@/types';

export const fetchProducts = createAsyncThunk<IProductsOfPage, string>(
  'products/fetchAll',
  async (query) => {
    const productsResponse = await axiosApi.get<IProductsOfPage>(`/products?page=${query}`);
    return productsResponse.data;
  },
);

export const fetchProductsByCategory = createAsyncThunk<IProductsOfPage, IQueryObjectCategory>(
  'products/fetchByCategory',
  async (query) => {
    const productsResponse = await axiosApi.get<IProductsOfPage>(
      `/products?categoryId=${query.categoryId}&categoryPage=${query.categoryPage}`,
    );

    return productsResponse.data;
  },
);

export const fetchBestsellers = createAsyncThunk<IProduct[], string>(
  'products/fetchByFilter',
  async (query) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/products?filterBy=${query}`);
    return productsResponse.data;
  },
);

export const getProduct = createAsyncThunk<IProductView, string>(
  'products/getOne',
  async (id: string) => {
    const response = await axiosApi(`/products/${id}`);
    return response.data;
  },
);
