import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import { RootState } from '@/store/store';
import { resetCart } from '@/features/cart/cartSlice';
import {
  GlobalError,
  ICheck,
  IUser,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '@/types';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError | GlobalError }
>('users/accounts', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<IUser, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  dispatch(resetCart());
  await axiosApi.delete('/users/sessions');
  dispatch(unsetUser());
});

export const roleCheck = createAsyncThunk<ICheck, undefined, { state: RootState }>(
  'users/fetchRole',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().users.user;

    const token = user && user.token ? user.token : 'nouser';

    const headers = {
      Authorization: token,
    };

    const response = await axiosApi.get<ICheck>('/users/roleCheck', { headers });
    return response.data;
  },
);
