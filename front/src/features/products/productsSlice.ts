import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunk';
import { IProduct } from '@/types';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';

interface ProductsState {
  items: IProduct[];
  fetchLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  fetchLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      //@ts-expect-error
      return action.payload.products;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const selectAllProducts = (state: RootState) => state.products.items;
export const selectAllProductsLoading = (state: RootState) => state.products.fetchLoading;
