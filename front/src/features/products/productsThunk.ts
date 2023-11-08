import {createAsyncThunk} from "@reduxjs/toolkit";
import {IProduct} from "@/types";
import axiosApi from "@/axiosApi";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    'products/fetchAll',
    async() => {
        const productsResponse = await axiosApi.get<IProduct[]>('/products');
        return productsResponse.data;
    }
);