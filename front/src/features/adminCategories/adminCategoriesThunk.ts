import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IAdminCategory, ICategoryMutation, ValidationError } from '@/types';
import { RootState } from '@/store/store';
import { isAxiosError } from 'axios';

export const fetchAdminCategories = createAsyncThunk<
  IAdminCategory[],
  void,
  {
    state: RootState;
  }
>('adminCategories/fetchAdminCategories', async (_, thunkApi) => {
  const userState = thunkApi.getState().users;
  const token = userState.user?.token;
  const response = await axiosApi.get('/adminCategories', { headers: { Authorization: token } });
  return response.data;
});

export const patchCategory = createAsyncThunk<void, string, { state: RootState }>(
  'adminCategories/patchCategory',
  async (id, thunkApi) => {
    const usersState = thunkApi.getState().users;
    const token = usersState.user?.token;
    await axiosApi.patch(
      `/adminCategories/${id}`,
      { headers: { Authorization: token } },
      { headers: { Authorization: token } },
    );
  },
);

export const createCategory = createAsyncThunk<
  void,
  ICategoryMutation,
  { rejectValue: ValidationError }
>('adminCategories/createCategory', async (categoryMutation, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('translations', JSON.stringify(categoryMutation.translations));

  if (categoryMutation.image) {
    formData.append('image', categoryMutation.image);
  }

  try {
    await axiosApi.post('/adminCategories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
