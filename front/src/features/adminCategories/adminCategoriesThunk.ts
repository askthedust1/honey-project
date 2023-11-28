import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory } from '@/types';

export const fetchAdminCategories = createAsyncThunk<ICategory[]>(
  'adminCategories/fetchAdminCategories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return response.data;
  },
);

export const patchCategory = createAsyncThunk<void, string>(
  'adminCategories/patchCategory',
  async (id) => {
    await axiosApi.patch(`/categories/${id}`);
  },
);
