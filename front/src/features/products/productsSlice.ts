import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBestsellers,
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByCategoryFiler,
  fetchProductsFilter,
  fetchProductsPromotion,
  fetchProductsSearch,
} from './productsThunk';
import { getProduct } from '@/features/products/productsThunk';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { IProduct, IProductView } from '@/types';

interface ProductsState {
  items: IProduct[];
  totalPages: number;
  currentPage: number;
  fetchLoading: boolean;
  oneProduct: IProductView | null;
  relatedProducts: IProduct[];
  fetchOneLoading: boolean;
  bestsellers: IProduct[];
  fetchBestsellersLoading: boolean;
  activeBestseller: string;
}

const initialState: ProductsState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
  oneProduct: null,
  relatedProducts: [],
  fetchLoading: false,
  fetchOneLoading: false,
  bestsellers: [],
  fetchBestsellersLoading: false,
  activeBestseller: 'hit',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setActiveBestseller: (state, action) => {
      state.activeBestseller = action.payload;
    },
  },
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

    builder.addCase(fetchProductsFilter.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsFilter.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products.productsOfPage;
      state.totalPages = products.totalPages;
      state.currentPage = products.currentPage;
    });
    builder.addCase(fetchProductsFilter.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchProductsSearch.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsSearch.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products.productsOfPage;
      state.totalPages = products.totalPages;
      state.currentPage = products.currentPage;
    });
    builder.addCase(fetchProductsSearch.rejected, (state) => {
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

    builder.addCase(fetchProductsByCategoryFiler.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsByCategoryFiler.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products.productsOfPage;
      state.totalPages = products.totalPages;
      state.currentPage = products.currentPage;
    });
    builder.addCase(fetchProductsByCategoryFiler.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload: product }) => {
      state.fetchOneLoading = false;
      state.oneProduct = product.oneProduct;
      state.relatedProducts = product.relatedProducts;
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
    builder.addCase(fetchProductsPromotion.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProductsPromotion.fulfilled, (state, { payload: products }) => {
      state.fetchLoading = false;
      state.items = products.productsOfPage;
      state.totalPages = products.totalPages;
      state.currentPage = products.currentPage;
    });
    builder.addCase(fetchProductsPromotion.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const selectAllProducts = (state: RootState) => state.products.items;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectRelatedProducts = (state: RootState) => state.products.relatedProducts;
export const selectBestsellers = (state: RootState) => state.products.bestsellers;
export const selectActiveBestsellers = (state: RootState) => state.products.activeBestseller;
export const { setActiveBestseller } = productsSlice.actions;
