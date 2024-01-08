import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { IOrder, IOrderAdminFullResponse, IOrderAdminView } from '@/types';
import { RootState } from '@/store/store';

// export const fetchOrdersAdminAll = createAsyncThunk<
//   IOrderAdminFullResponse,
//   string,
//   {
//     state: RootState;
//   }
// >('orderAdmin/fetchAll', async (page, thunkAPI) => {
//   try {
//     const userState = thunkAPI.getState().users;
//     const token = userState.user?.token;
//     const ordersAllResponse = await axiosApi.get<IOrderAdminFullResponse>(
//       `/transactions/?orderPage=${page}`,
//       {
//         headers: { Authorization: token },
//       },
//     );
//     return ordersAllResponse.data;
//   } catch (e) {
//     //nothing
//     throw e;
//   }
// });

// export const fetchOrdersAdminAll = createAsyncThunk<
//   IOrderAdminFullResponse,
//   { page: string; id?: string; name?: string }
// >('orderAdmin/fetchByStatus', async (dataInfo) => {
//   try {
//     // if (dataInfo.id && dataInfo.){}
//     const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
//       `/adminOrder/?camePage=${dataInfo.page}statusId=${dataInfo.id || ''}&search=${
//         dataInfo.name || ''
//       }`,
//     );
//     return ordersResponse.data;
//   } catch (e) {
//     //nothing
//     throw e;
//   }
// });

export const fetchOrdersAdminAll = createAsyncThunk<
  IOrderAdminFullResponse,
  { page: string; id?: string; name?: string; phone?: string }
>('orderAdmin/fetchByStatus', async (dataInfo) => {
  try {
    const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
      `/adminOrder/?camePage=${dataInfo.page}${dataInfo.id ? `&statusId=${dataInfo.id}` : ''}${
        dataInfo.name ? `&search=${dataInfo.name}` : ''
      }${dataInfo.phone ? `&searchNum=${dataInfo.phone}` : ''}`,
    );
    return ordersResponse.data;
  } catch (e) {
    // Обработка ошибок
    throw e;
  }
});

// export const fetchOrdersAdminAll = createAsyncThunk<
//   IOrderAdminFullResponse,
//   { page: string; id?: string; name?: string }
// >('orderAdmin/fetchByStatus', async (dataInfo) => {
//   try {
//     if (dataInfo.id && dataInfo.page && dataInfo.name) {
//       const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
//         `/adminOrder/?camePage=${dataInfo.page}statusId=${dataInfo.id}&search=${dataInfo.name}`,
//       );
//       return ordersResponse.data;
//     }
//     if (dataInfo.id && dataInfo.page && !dataInfo.name) {
//       const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
//         `/adminOrder/?camePage=${dataInfo.page}statusId=${dataInfo.id}`,
//       );
//       return ordersResponse.data;
//     }
//     1;
//     if (dataInfo.page && !dataInfo.page && !dataInfo.name) {
//       const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
//         `/adminOrder/?camePage=${dataInfo.page}statusId=${dataInfo.id}&search=${dataInfo.name}`,
//       );
//       return ordersResponse.data;
//     }
//   } catch (e) {
//     //nothing
//     throw e;
//   }
// });

// export const fetchOrdersAdminByStatus = createAsyncThunk<
//   IOrderAdminFullResponse,
//   { id: string; page: string }
// >('orderAdmin/fetchByStatus', async (dataInfo) => {
//   try {
//     const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
//       `/transactions/?statusId=${dataInfo.id}&statusPage=${dataInfo.page}`,
//     );
//     return ordersResponse.data;
//   } catch (e) {
//     //nothing
//     throw e;
//   }
// });
//
// export const fetchOrdersAdminByNameStatus = createAsyncThunk<
//   IOrderAdminFullResponse,
//   { id: string; page: string; name: string }
// >('orderAdmin/fetchByNameStatus', async (dataInfo) => {
//   try {
//     const ordersResponse = await axiosApi.get<IOrderAdminFullResponse>(
//       `/transactions/?statusId=${dataInfo.id}&statusPage=${dataInfo.page}&search=${dataInfo.name}`,
//     );
//     return ordersResponse.data;
//   } catch (e) {
//     //nothing
//     throw e;
//   }
// });
//
export const fetchOrderOneAdmin = createAsyncThunk<IOrderAdminView, string>(
  'orderAdmin/fetchOneAdmin',
  async (id) => {
    try {
      const orderOneResponse = await axiosApi.get<IOrderAdminView>(`/transactions/${id}`);
      return orderOneResponse.data;
    } catch (e) {
      //nothing
      throw e;
    }
  },
);

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
