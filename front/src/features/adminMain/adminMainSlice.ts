import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";
import {IAdminMainInfo} from "@/types";
import {fetchAdminMain} from "@/features/adminMain/adminMainThunk";

interface AdminMainState {
    items: IAdminMainInfo;
    loading: boolean;
}

const initialState: AdminMainState = {
    items: {
        productAmount: 0,
        categoriesAmount: 0,
        usersAmount: 0,
        transactionsAmount: 0,
        sumAmount: 0,
    },
    loading: false,
};

export const adminMainSlice = createSlice({
    name: 'adminMain',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            // @ts-expect-error
            return action.payload.adminMain;
        });
        builder.addCase(fetchAdminMain.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAdminMain.fulfilled, (state, { payload: info }) => {
            state.items = info;
            state.loading = false;
        });
        builder.addCase(fetchAdminMain.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const adminMainReducer = adminMainSlice.reducer;
export const selectAdminMain = (state: RootState) => state.adminMain.items;

export const selectAdminMainLoading = (state: RootState) => state.adminMain.loading;
