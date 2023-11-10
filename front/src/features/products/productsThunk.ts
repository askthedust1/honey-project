import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IProduct, IProductView } from '@/types';

export const fetchProducts = createAsyncThunk<IProduct[]>('products/fetchAll', async () => {
  const productsResponse = await axiosApi.get<IProduct[]>('/products');
  return productsResponse.data;
});

export const getProduct = createAsyncThunk<IProductView, string>(
  'products/getOne',
  async (id: string) => {
    const response = await axiosApi(`/products/${id}`);
    return response.data;
  },
);
