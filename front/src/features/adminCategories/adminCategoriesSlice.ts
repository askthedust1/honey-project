import { createSlice } from '@reduxjs/toolkit';
import { IAdminCategory, ValidationError } from '@/types';
import { RootState } from '@/store/store';
import { createCategory, fetchAdminCategories } from './adminCategoriesThunk';
import { HYDRATE } from 'next-redux-wrapper';

interface AdminCategoriesState {
  items: IAdminCategory[];
  loading: boolean;
  createLoading: boolean;
  error: ValidationError | null;
}

const initialState: AdminCategoriesState = {
  items: [],
  loading: false,
  createLoading: false,
  error: null,
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

    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.error = error || null;
    });
  },
});

export const adminCategoriesReducer = adminCategoriesSlice.reducer;
export const selectAdminCategories = (state: RootState) => state.adminCategories.items;

export const selectAdminCategoriesLoading = (state: RootState) => state.adminCategories.loading;

export const selectErrorsCategoriesAdmin = (state: RootState) => state.adminCategories.error;
