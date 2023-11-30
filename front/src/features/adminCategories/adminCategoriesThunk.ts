import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { ICategory } from '@/types';
import { RootState } from '@/store/store';

export const fetchAdminCategories = createAsyncThunk<ICategory[]>(
  'adminCategories/fetchAdminCategories',
  async () => {
    const response = await axiosApi.get<ICategory[]>('/categories');
    return response.data;
  },
);

export const patchCategory = createAsyncThunk<void, string, { state: RootState }>(
  'adminCategories/patchCategory',
  async (id, thunkApi) => {
    const usersState = thunkApi.getState().users;
    const token = usersState.user?.token;
    await axiosApi.patch(
      `/categories/${id}`,
      { headers: { Authorization: token } },
      { headers: { Authorization: token } },
    );
  },
);
