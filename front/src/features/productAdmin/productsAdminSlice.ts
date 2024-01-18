import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IProductOneView, IProductView, ValidationError } from '@/types';
import {
  createProduct,
  fetchOneProductForAdmin,
  fetchProductsAnalyticsAdmin,
  fetchProductsForAdmin,
  patchActiveProducts,
  patchHitProducts,
} from '@/features/productAdmin/productsAdminThunk';
import { RootState } from '@/store/store';

interface ProductsState {
  items: IProductView[];
  item: IProductOneView | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  patchActiveLoading: boolean;
  patchHitLoading: boolean;
  createLoading: boolean;
  error: ValidationError | null;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  patchActiveLoading: false,
  patchHitLoading: false,
  createLoading: false,
  error: null,
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
    builder.addCase(fetchProductsForAdmin.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsForAdmin.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProductsForAdmin.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchProductsAnalyticsAdmin.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsAnalyticsAdmin.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProductsAnalyticsAdmin.rejected, (state) => {
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

    builder.addCase(createProduct.pending, (state) => {
      state.createLoading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProduct.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.error = error || null;
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
export const selectErrorProduct = (state: RootState) => state.productsAdmin.error;
export const selectCreateProductsLoading = (state: RootState) => state.productsAdmin.createLoading;
