import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '@/types';
import axiosApi from '@/axiosApi';

export const fetchAllProductsForAdmin = createAsyncThunk<IProduct[]>(
  'adminProducts/fetchAdmin',
  async () => {
    const productsResponse = await axiosApi.get<IProduct[]>('/admin');
    return productsResponse.data;
  },
);

export const fetchAllProductsForAdminByCategory = createAsyncThunk<IProduct[], string>(
  'adminProducts/fetchByCategoryAdmin',
  async (id) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/admin?category=${id}`);
    return productsResponse.data;
  },
);

export const fetchOneProductForAdmin = createAsyncThunk<IProduct, string>(
  'adminProducts/fetchOneByAdmin',
  async (id) => {
    const productsResponse = await axiosApi.get<IProduct>(`/admin/${id}`);
    return productsResponse.data;
  },
);

export const patchActiveProducts = createAsyncThunk<void, string>(
  'adminProducts/patchProducts',
  async (id) => {
    await axiosApi.patch(`/admin/${id}`);
  },
);

export const patchHitProducts = createAsyncThunk<void, string>(
  'adminProducts/patchHitProducts',
  async (id) => {
    await axiosApi.patch(`/admin/${id}/hit`);
  },
);
