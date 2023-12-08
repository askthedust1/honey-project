import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, IOrderAdminView } from '@/types';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import {
  fetchOrdersAdminAll,
  fetchOrdersAdminByStatus,
} from '@/features/orderAdmin/ordersAdminThunk';

interface OrderAdminState {
  ordersAdminAll: IOrderAdminView[] | null;
  orderAdminOne: IOrderAdminView | null;
  dataLoaded: boolean;
  currentPage: number;
  totalPages: number | null;
}

const initialState: OrderAdminState = {
  ordersAdminAll: null,
  orderAdminOne: null,
  dataLoaded: false,
  currentPage: 1,
  totalPages: null,
};

export const orderAdminSlice = createSlice({
  name: 'orderAdmin',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderAdminOne = null;
    },
    // changeDate: (state, action) => {
    //   state.dateOrder = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.order };
      },
    );

    builder.addCase(fetchOrdersAdminAll.pending, (state) => {
      state.dataLoaded = true;
    });
    builder.addCase(fetchOrdersAdminAll.fulfilled, (state, { payload: orders }) => {
      state.dataLoaded = false;
      state.ordersAdminAll = orders.ordersOfPage;
      state.currentPage = orders.currentPage;
      state.totalPages = orders.totalPages;
    });
    builder.addCase(fetchOrdersAdminAll.rejected, (state) => {
      state.dataLoaded = false;
    });

    builder.addCase(fetchOrdersAdminByStatus.pending, (state) => {
      state.dataLoaded = true;
    });
    builder.addCase(fetchOrdersAdminByStatus.fulfilled, (state, { payload: orders }) => {
      state.dataLoaded = false;
      state.ordersAdminAll = orders.ordersOfPage;
      state.currentPage = orders.currentPage;
      state.totalPages = orders.totalPages;
    });
    builder.addCase(fetchOrdersAdminByStatus.rejected, (state) => {
      state.dataLoaded = false;
    });
  },
});

export const selectOrder = (state: RootState) => state.orderAdmin.orderAdminOne;
export const selectOrdersAdminAll = (state: RootState) => state.orderAdmin.ordersAdminAll;
export const selectCurrentPage = (state: RootState) => state.orderAdmin.currentPage;
export const selectTotalPages = (state: RootState) => state.orderAdmin.totalPages;
export const { resetOrder } = orderAdminSlice.actions;
