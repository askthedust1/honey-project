import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '@/types';
import axiosApi from '@/axiosApi';

export const fetchAllProductsForAdmin = createAsyncThunk<IProduct[]>(
  'products/fetchAdmin',
  async () => {
    const productsResponse = await axiosApi.get<IProduct[]>('/admin');
    return productsResponse.data;
  },
);

export const fetchAllProductsForAdminByCategory = createAsyncThunk<IProduct[], string>(
  'products/fetchByCategoryAdmin',
  async (id) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/admin?category=${id}`);
    return productsResponse.data;
  },
);
