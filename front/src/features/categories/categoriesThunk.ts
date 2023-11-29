import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory } from '@/types';
import { useCategoryTranslation } from '@/features/categories/categoriesHook';

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return useCategoryTranslation(response.data, 'kg');
  },
);
