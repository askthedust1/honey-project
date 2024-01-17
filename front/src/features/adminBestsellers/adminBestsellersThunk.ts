import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IProductView } from '@/types';

export const fetchBestsellersProducts = createAsyncThunk<
  IProductView[],
  { id?: string; search?: string }
>('adminBestsellers/fetchProducts', async ({ search, id }) => {
  const searchQuery = search ? `search=${search}&` : '';
  const categoryQuery = id ? `category=${id}&` : '';
  const productsResponse = await axiosApi.get<IProductView[]>(
    `/admin/?${categoryQuery}${searchQuery}`,
  );
  return productsResponse.data.filter(
    (i) => i.isHit === false && i.isActive === true && i.amount > 0,
  );
});

export const fetchBestsellers = createAsyncThunk<IProductView[]>(
  'adminBestsellers/fetchBestsellers',
  async () => {
    const productsResponse = await axiosApi.get<IProductView[]>(`/admin`);
    return productsResponse.data.filter(
      (i) => i.isHit === true && i.isActive === true && i.amount > 0,
    );
  },
);

export const patchHitProduct = createAsyncThunk<void, string>(
  'adminBestsellers/patchHitProduct',
  async (id) => {
    await axiosApi.patch(`/admin/${id}/hit`);
  },
);
