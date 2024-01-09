import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderAdminView } from '@/types';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchOrderOneAdmin, fetchOrdersAdminAll } from '@/features/orderAdmin/ordersAdminThunk';

interface OrderAdminState {
  ordersAdminAll: IOrderAdminView[] | null;
  orderAdminOne: IOrderAdminView | null;
  dataLoaded: boolean;
  currentPage: number;
  totalPages: number | null;
  currentStatus: string | null;
}

const initialState: OrderAdminState = {
  ordersAdminAll: null,
  orderAdminOne: null,
  dataLoaded: false,
  currentPage: 1,
  totalPages: null,
  currentStatus: null,
};

export const orderAdminSlice = createSlice({
  name: 'orderAdmin',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderAdminOne = null;
    },
    counterPlus: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    counterMinus: (state) => {
      state.currentPage = state.currentPage - 1;
    },
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    changeStatus: (state, action) => {
      state.currentStatus = action.payload;
    },
    resetTotalPages: (state) => {
      state.totalPages = null;
    },
    resetCurrentStatus: (state) => {
      state.currentStatus = null;
    },
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

    builder.addCase(fetchOrderOneAdmin.pending, (state) => {
      state.dataLoaded = true;
    });
    builder.addCase(fetchOrderOneAdmin.fulfilled, (state, { payload: order }) => {
      state.dataLoaded = false;
      state.orderAdminOne = order;
    });
    builder.addCase(fetchOrderOneAdmin.rejected, (state) => {
      state.dataLoaded = false;
    });
  },
});

export const selectOrderOneAdmin = (state: RootState) => state.orderAdmin.orderAdminOne;
export const selectOrdersAdminAll = (state: RootState) => state.orderAdmin.ordersAdminAll;
export const selectCurrentPage = (state: RootState) => state.orderAdmin.currentPage;
export const selectTotalOrderPages = (state: RootState) => state.orderAdmin.totalPages;
export const selectCurrentStatus = (state: RootState) => state.orderAdmin.currentStatus;

export const {
  counterPlus,
  counterMinus,
  changeStatus,
  changeCurrentPage,
  resetTotalPages,
  resetCurrentStatus,
} = orderAdminSlice.actions;
