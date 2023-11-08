import {createSlice} from '@reduxjs/toolkit';
import {IProduct} from '@/types';
import {getProduct} from "@/features/products/productsThunk";
import {RootState} from "@/store/store";
import {HYDRATE} from "next-redux-wrapper";

interface ProductsState {
    oneProduct: IProduct | null,
    fetchOneLoading: boolean;
}

const initialState: ProductsState = {
    oneProduct: null,
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
        })

        builder.addCase(getProduct.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, {payload: product}) => {
            state.fetchOneLoading = false;
            state.oneProduct = product;
        });
        builder.addCase(getProduct.rejected, (state) => {
            state.fetchOneLoading = false;
        });
    },
});

export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectFetchOneLoad = (state: RootState) => state.products.fetchOneLoading;