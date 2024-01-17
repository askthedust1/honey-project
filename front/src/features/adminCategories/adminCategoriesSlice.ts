import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import {
  createCategory,
  fetchAdminCategories,
  fetchOneCategoryForAdmin,
} from './adminCategoriesThunk';
import { HYDRATE } from 'next-redux-wrapper';
import { IAdminCategory, ValidationError } from '@/types';

interface AdminCategoriesState {
  items: IAdminCategory[];
  loading: boolean;
  createLoading: boolean;
  error: ValidationError | null;
  itemInfo: IAdminCategory | null;
  infoLoading: boolean;
}

const initialState: AdminCategoriesState = {
  items: [],
  loading: false,
  createLoading: false,
  error: null,
  itemInfo: null,
  infoLoading: false,
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

    builder.addCase(fetchOneCategoryForAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOneCategoryForAdmin.fulfilled, (state, { payload: categoryInfo }) => {
      state.itemInfo = categoryInfo;
      state.infoLoading = false;
    });
    builder.addCase(fetchOneCategoryForAdmin.rejected, (state) => {
      state.infoLoading = false;
    });
  },
});

export const selectAdminCategories = (state: RootState) => state.adminCategories.items;
export const selectAdminCategoryInfo = (state: RootState) => state.adminCategories.itemInfo;
export const selectCreateCategoriesLoading = (state: RootState) =>
  state.adminCategories.createLoading;
export const selectErrorsCategoriesAdmin = (state: RootState) => state.adminCategories.error;
