import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBanner} from "@/types";
import axiosApi from "@/axiosApi";

export const fetchBanners = createAsyncThunk<IBanner[]>(
    'banner/fetchBanners',
    async () => {
        const response = await axiosApi.get<IBanner[]>('/banners');
        return response.data;
    },
);