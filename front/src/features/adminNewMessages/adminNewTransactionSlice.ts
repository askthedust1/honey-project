import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";
import {fetchAdminHewTransaction} from "@/features/adminNewMessages/adminNewTransactionThunk";
import {IOrder} from "@/types";

interface AdminMainState {
    newTransactions: IOrder[];
    loading: boolean;
}

const initialState: AdminMainState = {
    newTransactions: [],
    loading: false,
};

export const adminNewTransactionsSlice = createSlice({
    name: 'adminNewTransactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            // @ts-expect-error
            return action.payload.adminMain;
        });
        builder.addCase(fetchAdminHewTransaction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAdminHewTransaction.fulfilled, (state, { payload: transactions }) => {
            state.newTransactions = transactions;
            state.loading = false;
        });
        builder.addCase(fetchAdminHewTransaction.rejected, (state) => {
            state.loading = false;
        });

    },
});

export const adminMainReducer = adminNewTransactionsSlice.reducer;
export const selectAdminNewTransactions = (state: RootState) => state.adminNewTransactions.newTransactions;

export const selectAdminNewTransactionsLoading = (state: RootState) => state.adminNewTransactions.loading;
