import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { RootState } from '@/store/store';
import { IFullOrder, IOrder } from '@/types';

export const fetchOrder = createAsyncThunk<
  IOrder,
  undefined,
  {
    state: RootState;
  }
>('order/fetchOne', async (_, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const order = thunkAPI.getState().order;
    const dateTime = order.dateOrder;
    const token = userState.user?.token;
    const orderResponse = await axiosApi.get<IOrder>(`/transactions/user/${dateTime}`, {
      headers: { ...axiosApi.defaults.headers.common, Authorization: token },
    });
    return orderResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});

export const createOrder = createAsyncThunk<
  IOrder,
  IFullOrder,
  {
    state: RootState;
  }
>('order/create', async (fullOrder, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;
    const orderResponse = await axiosApi.post('/transactions', fullOrder, {
      headers: { ...axiosApi.defaults.headers.common, Authorization: token },
    });
    return orderResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});

export const fetchOrdersAll = createAsyncThunk<
  IOrder[],
  string,
  {
    state: RootState;
  }
>('order/fetchAll', async (lang, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;
    const ordersAllResponse = await axiosApi.get<IOrder[]>(`/transactions/new/history`, {
      headers: { 'Accept-Language': lang, Authorization: token },
    });
    return ordersAllResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});
