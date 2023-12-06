import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProductView } from '@/types';
import axiosApi from '@/axiosApi';
import { useProductsAdminTranslation } from '@/features/products/productHook';

export const fetchBestsellersProducts = createAsyncThunk<IProductView[], string | null>(
  'adminBestsellers/fetchProducts',
  async (id) => {
    const query = id ? `?category=${id}` : '';
    const productsResponse = await axiosApi.get<IProductView[]>(`/admin/${query}`);
    return useProductsAdminTranslation(
      productsResponse.data.filter((i) => i.isHit === false),
      'ru',
    );
  },
);

export const fetchBestsellers = createAsyncThunk<IProductView[]>(
  'adminBestsellers/fetchBestsellers',
  async () => {
    // const query = id ? `?category=${id}` : '';
    const productsResponse = await axiosApi.get<IProductView[]>(`/admin`);
    return useProductsAdminTranslation(
      productsResponse.data.filter((i) => i.isHit === true).slice(0, 4),
      'ru',
    );
  },
);

export const patchHitProduct = createAsyncThunk<void, string>(
  'adminBestsellers/patchHitProduct',
  async (id) => {
    await axiosApi.patch(`/admin/${id}/hit`);
  },
);
