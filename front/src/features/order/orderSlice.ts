import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { createOrder, fetchOrder, fetchOrdersAll } from '@/features/order/orderThunk';
import { IOrder } from '@/types';

interface OrderState {
  transaction: IOrder | null;
  userOrders: IOrder[];
  userOrdersLoading: boolean;
  dateOrder: string | null;
  orderLoading: boolean;
  dataLoaded: boolean;
}

const initialState: OrderState = {
  transaction: null,
  userOrders: [],
  userOrdersLoading: false,
  dateOrder: null,
  dataLoaded: false,
  orderLoading: true,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.transaction = null;
    },
    changeDate: (state, action) => {
      state.dateOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.order }),
    );
    builder.addCase(fetchOrder.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(fetchOrder.fulfilled, (state, { payload: order }) => {
      state.orderLoading = false;
      state.transaction = order;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.orderLoading = false;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.dataLoaded = true;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload: order }) => {
      state.transaction = order;
      state.dataLoaded = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.dataLoaded = false;
    });

    builder.addCase(fetchOrdersAll.pending, (state) => {
      state.userOrdersLoading = true;
    });
    builder.addCase(fetchOrdersAll.fulfilled, (state, { payload: orders }) => {
      state.userOrdersLoading = false;
      state.userOrders = orders;
    });
    builder.addCase(fetchOrdersAll.rejected, (state) => {
      state.userOrdersLoading = false;
    });
  },
});

export const selectOrder = (state: RootState) => state.order.transaction;
export const selectUserOrders = (state: RootState) => state.order.userOrders;
export const { changeDate } = orderSlice.actions;
export const selectOrderLoading = (state: RootState) => state.order.orderLoading;
