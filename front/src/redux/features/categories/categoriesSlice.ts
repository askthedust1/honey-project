import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '@/types';
import {RootState} from "../../app/store";
import {fetchCategories} from "./categoriesThunk";

interface CategoriesState {
  items: ICategory[];
  loading: boolean;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.items = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.items;

export const selectCategoriesLoading = (state: RootState) => state.categories.loading;