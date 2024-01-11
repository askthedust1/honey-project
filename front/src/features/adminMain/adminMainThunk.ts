import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAdminMainHit, IAdminMainInfo } from '@/types';
import { RootState } from '@/store/store';
import axiosApi from '@/axiosApi';

export const fetchAdminMain = createAsyncThunk<
  IAdminMainInfo,
  void,
  {
    state: RootState;
  }
>('adminMain/fetchAdminMain', async (_, thunkApi) => {
  const userState = thunkApi.getState().users;
  const token = userState.user?.token;
  const response = await axiosApi.get('/adminMain', { headers: { Authorization: token } });
  return response.data;
});

export const fetchAdminMainHit = createAsyncThunk<
  IAdminMainHit[],
  void,
  {
    state: RootState;
  }
>('adminMain/fetchAdminMainHit', async (_, thunkApi) => {
  const userState = thunkApi.getState().users;
  const token = userState.user?.token;
  const response = await axiosApi.get('/adminMain/hit', { headers: { Authorization: token } });
  return response.data;
});
