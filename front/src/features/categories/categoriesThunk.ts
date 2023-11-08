import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory } from '@/types';

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return response.data;
  },
);
