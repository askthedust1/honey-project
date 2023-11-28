import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory } from '@/types';
import { useTranslation } from '@/store/hook';

interface LangPayload {
  lang: string | undefined;
}

interface CategoriesPayload extends LangPayload {}

export const fetchCategories = createAsyncThunk<ICategory[], CategoriesPayload>(
  'categories/fetchCategories',
  async (payload) => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return useTranslation(response.data, payload.lang);
  },
);
