import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import axiosApi from '@/axiosApi';
import { IOrderMutation } from '@/types';

export const fetchAdminHewTransaction = createAsyncThunk<
  IOrderMutation[],
  void,
  {
    state: RootState;
  }
>('adminNewMessages/fetchNewTransaction', async (_, thunkApi) => {
  const userState = thunkApi.getState().users;
  const token = userState.user?.token;
  const response = await axiosApi.get(`/transactions/new/orders`, {
    headers: { Authorization: token },
  });
  return response.data;
});

export const confirmOrderAdmin = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
  }
>('adminNewMessages/fetchNewTransaction', async (id, thunkApi) => {
  const userState = thunkApi.getState().users;
  const token = userState.user?.token;
  const response = await axiosApi.patch(`/transactions/${id}/toggleStatus`, {
    headers: { Authorization: token },
  });
  return response.data;
});
