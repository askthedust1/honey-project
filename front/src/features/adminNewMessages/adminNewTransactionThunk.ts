import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";
import axiosApi from "@/axiosApi";

export const fetchAdminHewTransaction = createAsyncThunk<
    any[],
    void,
    {
        state: RootState;
    }
>('adminNewMessages/fetchNewTransaction', async (_, thunkApi) => {
    const userState = thunkApi.getState().users;
    const token = userState.user?.token;
    const response = await axiosApi.get(`/transactions/new`, { headers: { Authorization: token } });
    return response.data;
});
