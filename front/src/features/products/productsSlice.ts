import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunk';
import {IProduct} from "@/types";
import {RootState} from "@/store/store";

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
        builder.addCase(fetchProducts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
            state.fetchLoading = false;
            state.items = products;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.fetchLoading = false;
        });

    }
});

export const productsReducer = productsSlice.reducer;
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectAllProductsLoading = (state: RootState) => state.products.fetchLoading;