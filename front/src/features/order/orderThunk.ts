import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IFullOrder, IOrder } from '@/types';
import { RootState } from '@/store/store';

export const fetchOrder = createAsyncThunk<
  IOrder,
  string,
  {
    state: RootState;
  }
>('order/fetchOne', async (dateTime, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;
    const orderResponse = await axiosApi.get<IOrder>(`/transactions/user/${dateTime}`, {
      headers: { Authorization: token },
    });
    return orderResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});

export const createOrder = createAsyncThunk<
  void,
  IFullOrder,
  {
    state: RootState;
  }
>('order/create', async (fullOrder, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;
    await axiosApi.post('/transactions', fullOrder, {
      headers: { Authorization: token },
    });
  } catch (e) {
    //nothing
    throw e;
  }
});

export const fetchOrdersAll = createAsyncThunk<
  IOrder[],
  void,
  {
    state: RootState;
  }
>('order/fetchAll', async (_, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;
    const ordersAllResponse = await axiosApi.get<IOrder[]>(`/transactions`, {
      headers: { Authorization: token },
    });
    return ordersAllResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});
