import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  fetchBestsellers,
  fetchBestsellersProducts,
  patchHitProduct,
} from '@/features/adminBestsellers/adminBestsellersThunk';
import { IProductView } from '@/types';

interface BestsellersState {
  products: IProductView[];
  bestsellersAdmin: IProductView[];
  fetchLoading: boolean;
  fetchHitsLoading: boolean;
  patchHitLoading: boolean;
}

const initialState: BestsellersState = {
  products: [],
  bestsellersAdmin: [],
  fetchLoading: false,
  fetchHitsLoading: false,
  patchHitLoading: false,
};

export const bestsellersSlice = createSlice({
  name: 'bestsellersAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
      return action.payload.bestsellersAdmin;
    });
    builder.addCase(fetchBestsellersProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchBestsellersProducts.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.products = products;
    });
    builder.addCase(fetchBestsellersProducts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchBestsellers.pending, (state) => {
      state.fetchHitsLoading = true;
    });
    builder.addCase(fetchBestsellers.fulfilled, (state, { payload: hits }) => {
      state.fetchHitsLoading = false;
      state.bestsellersAdmin = hits;
    });
    builder.addCase(fetchBestsellers.rejected, (state) => {
      state.fetchHitsLoading = false;
    });

    builder.addCase(patchHitProduct.pending, (state) => {
      state.patchHitLoading = true;
    });
    builder.addCase(patchHitProduct.fulfilled, (state) => {
      state.patchHitLoading = false;
    });
    builder.addCase(patchHitProduct.rejected, (state) => {
      state.patchHitLoading = false;
    });
  },
});

export const selectAllBestsellersForAdmin = (state: RootState) => state.bestsellersAdmin.products;
export const selectAllBestsellers = (state: RootState) => state.bestsellersAdmin.bestsellersAdmin;
