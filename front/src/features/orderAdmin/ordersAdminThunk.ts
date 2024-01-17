import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IOrder, IOrderAdminFullResponse, IOrderAdminView } from '@/types';

interface IRequestData {
  page: string;
  id?: string | null | undefined;
  name?: string;
  phone?: string;
}

export const fetchOrdersAdminAll = createAsyncThunk<IOrderAdminFullResponse, IRequestData>(
  'orderAdmin/fetchByStatus',
  async (dataInfo) => {
    try {
      const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
        `/adminOrder/?camePage=${dataInfo.page}${dataInfo.id ? `&statusId=${dataInfo.id}` : ''}${
          dataInfo.name ? `&search=${dataInfo.name}` : ''
        }${dataInfo.phone ? `&searchNum=${dataInfo.phone}` : ''}`,
      );
      return ordersResponse.data;
    } catch (e) {
      // nothing
      throw e;
    }
  },
);

export const fetchOrderOneAdmin = createAsyncThunk<IOrderAdminView, string>(
  'orderAdmin/fetchOneAdmin',
  async (id) => {
    try {
      const orderOneResponse = await axiosApi.get<IOrderAdminView>(`/transactions/${id}`);
      return orderOneResponse.data;
    } catch (e) {
      throw e;
    }
  },
);

export const patchActiveOrders = createAsyncThunk<void, string>(
  'orderAdmin/patchStatus',
  async (id) => {
    try {
      await axiosApi.patch<IOrder>(`/transactions/${id}/toggleStatus`);
    } catch (e) {
      throw e;
    }
  },
);
