import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IFullOrder, IOrder } from '@/types';
import { RootState } from '@/store/store';

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
      headers: { Authorization: token },
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
      headers: { Authorization: token },
    });
    return orderResponse.data;
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
    const ordersAllResponse = await axiosApi.get<IOrder[]>(`/transactions/history`, {
      headers: { Authorization: token },
    });
    return ordersAllResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});
