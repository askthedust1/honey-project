import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductNew, IProductView } from '@/types';
import axiosApi from '@/axiosApi';
import { useProductsAdminTranslation } from '@/features/products/productHook';

export const fetchBestsellersProducts = createAsyncThunk<IProductView[], string | null>(
  'adminBestsellers/fetchBestsellers',
  async (id) => {
    const query = id ? `?category=${id}` : '';
    const productsResponse = await axiosApi.get<IProductView[]>(`/adminBestsellers/${query}`);
    return useProductsAdminTranslation(productsResponse.data, 'ru');
  },
);

export const fetchOneHit = createAsyncThunk<IProductNew, string>(
  'adminBestsellers/getHit',
  async (id) => {
    const productResponse = await axiosApi.get<IProductNew>(`/adminBestsellers/${id}`);
    return productResponse.data;
  },
);
