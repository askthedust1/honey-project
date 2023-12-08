import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IOrder, IOrderAdminFullResponse } from '@/types';
import { RootState } from '@/store/store';

export const fetchOrdersAdminAll = createAsyncThunk<
  IOrderAdminFullResponse,
  string,
  {
    state: RootState;
  }
>('orderAdmin/fetchAll', async (page, thunkAPI) => {
  try {
    const userState = thunkAPI.getState().users;
    const token = userState.user?.token;
    const ordersAllResponse = await axiosApi.get<IOrderAdminFullResponse>(
      `/transactions/?orderPage=${page}`,
      {
        headers: { Authorization: token },
      },
    );
    return ordersAllResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});

export const patchActiveOrders = createAsyncThunk<void, string>(
  'orderAdmin/patchStatus',
  async (id, thunkAPI) => {
    try {
      await axiosApi.patch<IOrder>(`/transactions/${id}/toggleStatus`);
    } catch (e) {
      //nothing
      throw e;
    }
  },
);

export const fetchOrdersAdminByStatus = createAsyncThunk<
  IOrderAdminFullResponse,
  { id: string; page: string }
>('orderAdmin/fetchByStatus', async (dataInfo) => {
  try {
    const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
      `/transactions/?statusId=${dataInfo.id}&statusPage=${dataInfo.page}`,
    );
    return ordersResponse.data;
  } catch (e) {
    //nothing
    throw e;
  }
});
