import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { fetchCategories } from './categoriesThunk';
import { HYDRATE } from 'next-redux-wrapper';
import { ICategory } from '@/types';

interface CategoriesState {
  items: ICategory[];
  loading: boolean;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
      return action.payload.categories;
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
      state.items = categories;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectCategories = (state: RootState) => state.categories.items;
