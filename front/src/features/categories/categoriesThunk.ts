import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory } from '@/types';
import { useCategoryTranslation } from '@/features/categories/categoriesHook';

export const fetchCategories = createAsyncThunk<ICategory[], string>(
  'categories/fetchCategories',
  async (locale) => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return useCategoryTranslation(response.data, locale);
  },
);
