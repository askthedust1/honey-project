import {IProductNew, IProductView} from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {fetchBestsellersProducts, fetchOneHit} from '@/features/adminBestsellers/adminBestsellersThunk';

interface BestsellersState {
  products: IProductView[];
  bestsellers: IProductNew[];
  fetchLoading: boolean;
}

const initialState: BestsellersState = {
  products: [],
  bestsellers: [],
  fetchLoading: false,
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

    builder.addCase(fetchOneHit.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOneHit.fulfilled, (state, { payload: product }) => {
      state.fetchLoading = false;
      state.bestsellers.push(product);
    });
    builder.addCase(fetchOneHit.rejected, (state) => {
      state.fetchLoading = false;
    });

    //
    // builder.addCase(patchHitProducts.pending, (state) => {
    //   state.patchHitLoading = true;
    // });
    // builder.addCase(patchHitProducts.fulfilled, (state) => {
    //   state.patchHitLoading = false;
    // });
    // builder.addCase(patchHitProducts.rejected, (state) => {
    //   state.patchHitLoading = false;
    // });
  },
});

export const BestsellersReducer = bestsellersSlice.reducer;
export const selectAllBestsellersForAdmin = (state: RootState) => state.bestsellersAdmin.products;
export const selectAllBestsellers = (state: RootState) => state.bestsellersAdmin.bestsellers;
// export const selectOneProductForAdmin = (state: RootState) => state.productsAdmin.item;
// export const selectAllProductsLoading = (state: RootState) => state.productsAdmin.fetchLoading;
// export const selectOneProductsLoading = (state: RootState) => state.productsAdmin.fetchOneLoading;
// export const selectActiveStatusLoading = (state: RootState) =>
//   state.productsAdmin.patchActiveLoading;
// export const selectActiveHitLoading = (state: RootState) => state.productsAdmin.patchHitLoading;
