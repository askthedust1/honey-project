import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import { fetchAdminMain, fetchAdminMainHit } from '@/features/adminMain/adminMainThunk';
import { IAdminMainHit, IAdminMainInfo } from '@/types';

interface AdminMainState {
  items: IAdminMainInfo;
  hits: IAdminMainHit[];
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
  hits: [],
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
    builder.addCase(fetchAdminMainHit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAdminMainHit.fulfilled, (state, { payload: hits }) => {
      state.hits = hits;
      state.loading = false;
    });
    builder.addCase(fetchAdminMainHit.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectAdminMain = (state: RootState) => state.adminMain.items;
export const selectAdminMainHits = (state: RootState) => state.adminMain.hits;
