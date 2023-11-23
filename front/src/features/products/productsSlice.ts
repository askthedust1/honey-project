import { createSlice } from '@reduxjs/toolkit';
import { fetchBestsellers, fetchProducts, fetchProductsByCategory } from './productsThunk';
import { IProduct, IProductView } from '@/types';
import { getProduct } from '@/features/products/productsThunk';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';

interface ProductsState {
  items: IProduct[];
  totalPages: number;
  currentPage: number;
  fetchLoading: boolean;
  oneProduct: IProductView | null;
  fetchOneLoading: boolean;
  bestsellers: IProduct[];
  fetchBestsellersLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
  oneProduct: null,
  fetchLoading: false,
  fetchOneLoading: false,
  bestsellers: [],
  fetchBestsellersLoading: false,
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
      state.items = products.productsOfPage;
      state.totalPages = products.totalPages;
      state.currentPage = products.currentPage;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products.productsOfPage;
      state.totalPages = products.totalPages;
      state.currentPage = products.currentPage;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state) => {
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

    builder.addCase(fetchBestsellers.pending, (state) => {
      state.fetchBestsellersLoading = true;
    });
    builder.addCase(fetchBestsellers.fulfilled, (state, { payload: products }) => {
      state.fetchBestsellersLoading = false;
      state.bestsellers = products;
    });
    builder.addCase(fetchBestsellers.rejected, (state) => {
      state.fetchBestsellersLoading = false;
    });
  },
});

export const selectAllProducts = (state: RootState) => state.products.items;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectBestsellers = (state: RootState) => state.products.bestsellers;
export const selectAllProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectFetchOneLoad = (state: RootState) => state.products.fetchOneLoading;
export const selectFetchOBestLoad = (state: RootState) => state.products.fetchBestsellersLoading;
