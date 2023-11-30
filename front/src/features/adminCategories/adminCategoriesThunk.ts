import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IAdminCategory } from '@/types';
import { RootState } from '@/store/store';

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
