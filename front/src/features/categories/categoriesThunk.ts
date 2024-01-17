import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { useCategoryTranslation } from '@/features/categories/categoriesHook';
import { ICategory } from '@/types';

export const fetchCategories = createAsyncThunk<ICategory[], string>(
  'categories/fetchCategories',
  async (locale) => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return useCategoryTranslation(response.data, locale);
  },
);
