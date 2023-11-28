import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '@/types';
import { RootState } from '@/store/store';
import { fetchAdminCategories } from './adminCategoriesThunk';
import { HYDRATE } from 'next-redux-wrapper';

interface AdminCategoriesState {
  items: ICategory[];
  loading: boolean;
}

const initialState: AdminCategoriesState = {
  items: [],
  loading: false,
};

export const adminCategoriesSlice = createSlice({
  name: 'adminCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
      return action.payload.adminCategories;
    });
    builder.addCase(fetchAdminCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAdminCategories.fulfilled, (state, { payload: categories }) => {
      state.items = categories;
      state.loading = false;
    });
    builder.addCase(fetchAdminCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const adminCategoriesReducer = adminCategoriesSlice.reducer;
export const selectAdminCategories = (state: RootState) => state.adminCategories.items;

export const selectAdminCategoriesLoading = (state: RootState) => state.adminCategories.loading;
