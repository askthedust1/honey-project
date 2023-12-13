import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '@/types';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { createOrder, fetchOrder } from '@/features/order/orderThunk';

interface OrderState {
  transaction: IOrder | null;
  dateOrder: string | null;
  orderLoading: boolean;
  dataLoaded: boolean;
}

const initialState: OrderState = {
  transaction: null,
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
    builder.addCase(createOrder.fulfilled, (state) => {
      state.dataLoaded = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.dataLoaded = false;
    });
  },
});

export const selectOrder = (state: RootState) => state.order.transaction;

export const selectDateOrder = (state: RootState) => state.order.dateOrder;
export const { resetOrder, changeDate } = orderSlice.actions;
export const selectProductsDataLoaded = (state: RootState) => state.order.dataLoaded;
export const selectOrderLoading = (state: RootState) => state.order.orderLoading;
