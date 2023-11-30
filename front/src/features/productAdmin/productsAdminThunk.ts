import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductView } from '@/types';
import axiosApi from '@/axiosApi';
import {
  useProductsAdminTranslation,
  useProductsTranslation,
  useProductTranslation,
} from '@/features/products/productHook';

export const fetchAllProductsForAdmin = createAsyncThunk<IProductView[]>(
  'adminProducts/fetchAdmin',
  async () => {
    const productsResponse = await axiosApi.get<IProductView[]>('/admin');
    return useProductsAdminTranslation(productsResponse.data, 'ru');
  },
);

export const fetchAllProductsForAdminByCategory = createAsyncThunk<IProductView[], string>(
  'adminProducts/fetchByCategoryAdmin',
  async (id) => {
    const productsResponse = await axiosApi.get<IProductView[]>(`/admin?category=${id}`);
    return useProductsAdminTranslation(productsResponse.data, 'ru');
  },
);

export const fetchOneProductForAdmin = createAsyncThunk<IProductView, string>(
  'adminProducts/fetchOneByAdmin',
  async (id) => {
    const productResponse = await axiosApi.get<IProductView>(`/admin/${id}`);
    return useProductTranslation(productResponse.data, 'ru');
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
