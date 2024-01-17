import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchBanners, fetchBannersAdmin, putBanners } from '@/features/banners/bannersThunk';
import { GlobalError, IBanner } from '@/types';

interface BannersState {
  items: IBanner[];
  itemsAdmin: IBanner[];
  loading: boolean;
  loadingPut: boolean;
  errorBanner: GlobalError | null;
}

const initialState: BannersState = {
  items: [],
  itemsAdmin: [],
  loading: false,
  loadingPut: false,
  errorBanner: null,
};

export const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // @ts-expect-error
      return action.payload.banners;
    });
    builder.addCase(fetchBanners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBanners.fulfilled, (state, { payload: banners }) => {
      state.items = banners;
      state.loading = false;
    });
    builder.addCase(fetchBanners.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchBannersAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBannersAdmin.fulfilled, (state, { payload: banners }) => {
      state.items = banners;
      state.loading = false;
    });
    builder.addCase(fetchBannersAdmin.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(putBanners.pending, (state) => {
      state.loadingPut = true;
      state.errorBanner = null;
    });
    builder.addCase(putBanners.fulfilled, (state) => {
      state.loadingPut = false;
    });
    builder.addCase(putBanners.rejected, (state, { payload: error }) => {
      state.loadingPut = false;
      state.errorBanner = error || null;
    });
  },
});

export const selectBanners = (state: RootState) => state.banners.items;
export const selectBannersPutLoading = (state: RootState) => state.banners.loadingPut;
export const selectBannerError = (state: RootState) => state.banners.errorBanner;
