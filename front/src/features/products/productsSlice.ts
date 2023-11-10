import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunk';
import { IProduct, IProductView } from '@/types';
import { getProduct } from '@/features/products/productsThunk';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';

interface ProductsState {
  items: IProduct[];
  fetchLoading: boolean;
  oneProduct: IProductView | null;
  fetchOneLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  oneProduct: null,
  fetchLoading: false,
  fetchOneLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
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

    builder.addCase(getProduct.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload: product }) => {
      state.fetchOneLoading = false;
      state.oneProduct = product;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  },
});

export const selectAllProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectAllProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectFetchOneLoad = (state: RootState) => state.products.fetchOneLoading;
