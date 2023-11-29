import { IProduct } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  fetchAllProductsForAdmin,
  fetchAllProductsForAdminByCategory,
} from '@/features/productAdmin/productsAdminThunk';
import { RootState } from '@/store/store';

interface ProductsState {
  items: IProduct[];
  fetchLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  fetchLoading: false,
};

export const productsAdminSlice = createSlice({
  name: 'productsAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
      return action.payload.productsAdmin;
    });
    builder.addCase(fetchAllProductsForAdmin.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllProductsForAdmin.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchAllProductsForAdmin.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchAllProductsForAdminByCategory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchAllProductsForAdminByCategory.fulfilled,
      (state, { payload: products }) => {
        state.fetchLoading = false;
        state.items = products;
      },
    );
    builder.addCase(fetchAllProductsForAdminByCategory.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});
export const selectAllProductsForAdmin = (state: RootState) => state.productsAdmin.items;
