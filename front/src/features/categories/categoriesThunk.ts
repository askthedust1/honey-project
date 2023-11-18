import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory, ICategoryPost } from '@/types';

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return response.data;
  },
);

// export const createCategory = createAsyncThunk(
//   'categories/create',
//   async (mutationCategory: ICategoryPost) => {
//     const formData = new FormData();
//     const keys = Object.keys(mutationCategory) as (keyof ICategoryPost)[];
//
//     keys.forEach((key) => {
//       const value = mutationCategory[key];
//
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });
//     await axiosApi.post('/categories', formData);
//   },
// );
