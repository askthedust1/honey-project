import { IProduct } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  fetchAllProductsForAdmin,
  fetchAllProductsForAdminByCategory,
  fetchOneProductForAdmin,
  patchActiveProducts,
  patchHitProducts,
} from '@/features/productAdmin/productsAdminThunk';
import { RootState } from '@/store/store';

interface ProductsState {
  items: IProduct[];
  item: IProduct | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  patchActiveLoading: boolean;
  patchHitLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  patchActiveLoading: false,
  patchHitLoading: false,
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

    builder.addCase(fetchOneProductForAdmin.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneProductForAdmin.fulfilled, (state, { payload: product }) => {
      state.fetchOneLoading = false;
      state.item = product;
    });
    builder.addCase(fetchOneProductForAdmin.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(patchActiveProducts.pending, (state) => {
      state.patchActiveLoading = true;
    });
    builder.addCase(patchActiveProducts.fulfilled, (state) => {
      state.patchActiveLoading = false;
    });
    builder.addCase(patchActiveProducts.rejected, (state) => {
      state.patchActiveLoading = false;
    });

    builder.addCase(patchHitProducts.pending, (state) => {
      state.patchHitLoading = true;
    });
    builder.addCase(patchHitProducts.fulfilled, (state) => {
      state.patchHitLoading = false;
    });
    builder.addCase(patchHitProducts.rejected, (state) => {
      state.patchHitLoading = false;
    });
  },
});
export const selectAllProductsForAdmin = (state: RootState) => state.productsAdmin.items;
export const selectOneProductForAdmin = (state: RootState) => state.productsAdmin.item;
export const selectAllProductsLoading = (state: RootState) => state.productsAdmin.fetchLoading;
export const selectOneProductsLoading = (state: RootState) => state.productsAdmin.fetchOneLoading;
export const selectActiveStatusLoading = (state: RootState) =>
  state.productsAdmin.patchActiveLoading;
export const selectActiveHitLoading = (state: RootState) => state.productsAdmin.patchHitLoading;
